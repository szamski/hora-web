import { cn } from "@/lib/cn";

export function AutoVideo({
  src,
  poster,
  className,
}: {
  src: string;
  poster?: string;
  className?: string;
}) {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      poster={poster}
      className={cn(
        "my-6 h-auto w-full rounded-xl border border-border",
        className,
      )}
    >
      <source src={src} type="video/webm" />
    </video>
  );
}
