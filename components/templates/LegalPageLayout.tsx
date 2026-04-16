import { Prose } from "@/components/atoms/Prose";

export function LegalPageLayout({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}) {
  return (
    <article className="mx-auto max-w-[var(--container-prose)] px-6 py-16 md:py-24">
      <header className="mb-10">
        <h1 className="font-brand text-4xl font-normal tracking-tight md:text-5xl">
          {title}
        </h1>
        <p className="mt-2 text-sm text-muted">Last updated: {lastUpdated}</p>
      </header>
      <Prose>{children}</Prose>
    </article>
  );
}
