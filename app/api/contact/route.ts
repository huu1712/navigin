import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

import {
  BUDGET_OPTIONS,
  SERVICE_OPTIONS,
  SOURCE_OPTIONS,
  TIMELINE_OPTIONS,
} from "@/lib/schemas";

const ServerSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().max(40).optional().or(z.literal("")),
  service: z.enum(SERVICE_OPTIONS),
  budget: z.enum(BUDGET_OPTIONS),
  description: z.string().trim().min(50).max(5000),
  timeline: z.enum(TIMELINE_OPTIONS),
  source: z.enum(SOURCE_OPTIONS),
  website: z.string().max(0).optional().or(z.literal("")),
  locale: z.string().max(8).optional(),
});

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = ServerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const data = parsed.data;

  if (data.website && data.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? "hello@navigin.dev";
  const from = process.env.RESEND_FROM_EMAIL ?? "Navigin <onboarding@resend.dev>";

  const subject = `New project request — ${data.name} (${data.service})`;
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px;">
      <h2 style="color: #0f0f0f; margin: 0 0 16px;">New project inquiry</h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr><td style="padding: 6px 0; color: #777; width: 140px;">Name</td><td style="padding: 6px 0;">${escapeHtml(data.name)}</td></tr>
        <tr><td style="padding: 6px 0; color: #777;">Email</td><td style="padding: 6px 0;"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
        ${data.phone ? `<tr><td style="padding: 6px 0; color: #777;">Phone</td><td style="padding: 6px 0;">${escapeHtml(data.phone)}</td></tr>` : ""}
        <tr><td style="padding: 6px 0; color: #777;">Service</td><td style="padding: 6px 0;"><strong>${escapeHtml(data.service)}</strong></td></tr>
        <tr><td style="padding: 6px 0; color: #777;">Budget</td><td style="padding: 6px 0;">${escapeHtml(data.budget)}</td></tr>
        <tr><td style="padding: 6px 0; color: #777;">Timeline</td><td style="padding: 6px 0;">${escapeHtml(data.timeline)}</td></tr>
        <tr><td style="padding: 6px 0; color: #777;">Source</td><td style="padding: 6px 0;">${escapeHtml(data.source)}</td></tr>
        ${data.locale ? `<tr><td style="padding: 6px 0; color: #777;">Locale</td><td style="padding: 6px 0;">${escapeHtml(data.locale)}</td></tr>` : ""}
      </table>
      <h3 style="margin: 24px 0 8px; font-size: 14px;">Description</h3>
      <p style="white-space: pre-wrap; line-height: 1.55; background: #fafaf8; padding: 16px; border-radius: 12px; border: 1px solid #e5e5e5;">${escapeHtml(data.description)}</p>
    </div>
  `;

  if (!apiKey) {
    console.warn("[contact] RESEND_API_KEY not configured. Logging form payload instead.");
    console.info("[contact] payload:", JSON.stringify(data, null, 2));
    return NextResponse.json({ ok: true, dev: true });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject,
      html,
    });
    if (error) {
      console.error("[contact] resend error:", error);
      return NextResponse.json({ error: "Send failed" }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] unexpected error:", err);
    return NextResponse.json({ error: "Send failed" }, { status: 500 });
  }
}
