import { cn } from "@/lib/cn";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  as?: React.ElementType;
  size?: "default" | "tight" | "wide";
};

export function Container({
  className,
  as: Tag = "div",
  size = "default",
  ...rest
}: Props) {
  const maxWidth =
    size === "tight"
      ? "max-w-5xl"
      : size === "wide"
        ? "max-w-7xl"
        : "max-w-6xl";
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-5 sm:px-6 lg:px-8",
        maxWidth,
        className,
      )}
      {...rest}
    />
  );
}
