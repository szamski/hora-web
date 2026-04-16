import { cn } from "@/lib/cn";
import { GradientText } from "./GradientText";

type HeadingCopy =
  | string
  | {
      prefix: string;
      suffixGradient: string;
      after?: string;
    };

export function SectionHeading({
  heading,
  subtitle,
  align = "center",
  className,
  as: Tag = "h2",
}: {
  heading: HeadingCopy;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  const sizeClass =
    Tag === "h1"
      ? "text-4xl md:text-5xl"
      : Tag === "h2"
        ? "text-3xl md:text-4xl"
        : "text-2xl md:text-3xl";

  return (
    <div
      className={cn(
        "space-y-3",
        align === "center" ? "text-center" : "text-left",
        className,
      )}
    >
      <Tag
        className={cn(
          "font-brand font-normal tracking-tight leading-tight",
          sizeClass,
        )}
      >
        {typeof heading === "string" ? (
          heading
        ) : (
          <>
            {heading.prefix} <GradientText>{heading.suffixGradient}</GradientText>
            {heading.after ? ` ${heading.after}` : null}
          </>
        )}
      </Tag>
      {subtitle ? (
        <p className="mx-auto max-w-xl text-muted">{subtitle}</p>
      ) : null}
    </div>
  );
}
