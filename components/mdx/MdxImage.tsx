import Image from "next/image";
import { cn } from "@/lib/cn";

export function MdxImage({
  src,
  alt = "",
  className,
  ...rest
}: React.ImgHTMLAttributes<HTMLImageElement>) {
  if (typeof src !== "string") return null;
  if (src.startsWith("/")) {
    return (
      <Image
        src={src}
        alt={alt}
        width={1600}
        height={900}
        sizes="(min-width: 768px) 720px, 100vw"
        className={cn("my-6 h-auto w-full rounded-xl border border-border", className)}
      />
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={cn("my-6 h-auto w-full rounded-xl border border-border", className)}
      {...rest}
    />
  );
}
