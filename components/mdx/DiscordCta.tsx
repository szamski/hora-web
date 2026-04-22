export function DiscordCta({
  href = "https://discord.gg/8JFz4FfBGQ",
  label = "Join the Discord",
  handle = "discord.gg/8JFz4FfBGQ",
}: {
  href?: string;
  label?: string;
  handle?: string;
}) {
  return (
    <div className="not-prose my-12">
      <div
        className="relative overflow-hidden rounded-3xl px-6 py-12 text-center sm:px-10 sm:py-14"
        style={{
          border: "1px solid rgba(255,56,60,0.24)",
          background:
            "radial-gradient(ellipse 600px 300px at 50% 0%, rgba(255,56,60,0.22), rgba(255,56,60,0.04) 70%), #140a0a",
        }}
      >
        <p
          className="m-0 mb-3 text-[11px] font-bold uppercase"
          style={{ color: "#ff736e", letterSpacing: "1.6px" }}
        >
          <span aria-hidden>●</span> Join the beta community
        </p>
        <h3
          className="m-0 mb-3 text-2xl font-bold tracking-tight text-white sm:text-3xl"
          style={{ lineHeight: 1.15 }}
        >
          Daily builds. Direct line to me.
          <br />
          Other early testers.
        </h3>
        <p
          className="mx-auto mb-7 max-w-md text-[15px]"
          style={{ color: "#c9c9c9", lineHeight: 1.65 }}
        >
          Discord is where feedback turns into fixes. That's where I'll be every
          day for the next few weeks.
        </p>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block font-bold text-white no-underline transition hover:brightness-110"
          style={{
            background:
              "linear-gradient(135deg, #ff383c 0%, #ff6b3d 55%, #ff8f4d 100%)",
            padding: "18px 44px",
            borderRadius: "999px",
            fontSize: "17px",
            letterSpacing: "0.3px",
            boxShadow:
              "0 20px 42px rgba(255,56,60,0.45), 0 2px 0 rgba(255,255,255,0.28) inset",
            border: "1px solid rgba(255,86,47,0.9)",
          }}
        >
          {label}&nbsp;&nbsp;→
        </a>
        <p
          className="mt-5 text-[13px]"
          style={{ color: "#888", letterSpacing: "0.2px" }}
        >
          {handle}
        </p>
      </div>
    </div>
  );
}
