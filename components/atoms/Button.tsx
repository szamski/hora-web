import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary:
    "relative overflow-hidden bg-linear-to-br from-accent to-accent-glow text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_10px_24px_-8px_rgba(255,56,60,0.55)] transition-shadow hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_14px_32px_-8px_rgba(255,56,60,0.7)] focus-visible:ring-accent " +
    "before:pointer-events-none before:absolute before:inset-y-0 before:-left-1/4 before:w-1/4 before:bg-linear-to-r before:from-transparent before:via-white/20 before:to-transparent before:opacity-0 before:content-[''] hover:before:opacity-100 hover:before:animate-[shimmer-slide_1.8s_ease-out_infinite] motion-reduce:before:hidden " +
    "[&>*]:relative [&>*]:z-10",
  outline:
    "border border-border text-text hover:border-accent hover:text-accent focus-visible:ring-accent",
  ghost: "text-muted hover:text-text focus-visible:ring-accent",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-opacity disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string;
    external?: boolean;
  };

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(baseClasses, variantClasses[variant], sizeClasses[size], className);

  if ("href" in props && props.href !== undefined) {
    const { href, external, ...rest } = props;
    const isExternal = external ?? /^https?:/.test(href);
    if (isExternal) {
      return (
        <a
          {...rest}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {children}
        </a>
      );
    }
    return (
      <Link {...rest} href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const { ...buttonRest } = props;
  return (
    <button {...buttonRest} className={classes}>
      {children}
    </button>
  );
}
