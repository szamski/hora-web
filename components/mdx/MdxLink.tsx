import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";

export function MdxLink({
  href,
  children,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (!href) return <a {...rest}>{children}</a>;
  const isExternal = /^https?:\/\//.test(href);
  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
}
