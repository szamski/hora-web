import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

const BASE = "https://horacal.app";
const UTM = "utm_source=email&utm_medium=welcome&utm_campaign=waitlist";

const brand = {
  bg: "#ffffff",
  text: "#333333",
  heading: "#111111",
  muted: "#666666",
  divider: "#e0e0e0",
  surface: "#f5f5f5",
  accent: "#ff383c",
  accentGlow: "#ff6b3d",
};

const fontStack =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

export function WelcomeEmail({
  unsubscribeUrl,
}: {
  unsubscribeUrl: string;
}) {
  return (
    <Html lang="en">
      <Head>
        <style>{`
          @font-face {
            font-family: 'Bumbbled';
            src: url('${BASE}/assets/Bumbbled.otf') format('opentype');
            font-weight: 400;
            font-style: normal;
          }
        `}</style>
      </Head>
      <Preview>A native macOS calendar, built for speed. Here&apos;s what&apos;s coming.</Preview>
      <Body
        style={{
          margin: 0,
          padding: 0,
          background: brand.bg,
          fontFamily: fontStack,
          WebkitFontSmoothing: "antialiased",
        }}
      >
        <Container style={{ maxWidth: 520, padding: "40px 20px" }}>
          <Section style={{ textAlign: "center", paddingBottom: 40 }}>
            <table cellPadding={0} cellSpacing={0} style={{ margin: "0 auto" }}>
              <tbody>
                <tr>
                  <td style={{ verticalAlign: "middle", paddingRight: 10 }}>
                    <Img
                      src={`${BASE}/assets/hora-icon.png`}
                      width={40}
                      height={40}
                      alt="hora"
                      style={{ borderRadius: 10, display: "block" }}
                    />
                  </td>
                  <td style={{ verticalAlign: "middle" }}>
                    <span
                      style={{
                        fontFamily: `'Bumbbled', ${fontStack}`,
                        fontSize: 22,
                        color: brand.heading,
                        letterSpacing: "0.5px",
                      }}
                    >
                      Calendar
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </Section>

          <Section style={{ color: brand.text, fontSize: 15, lineHeight: 1.7 }}>
            <Text
              style={{
                margin: "0 0 20px",
                color: brand.heading,
                fontSize: 17,
                fontWeight: 600,
              }}
            >
              Hey there 👋,
            </Text>
            <Text style={{ margin: "0 0 20px" }}>
              Thanks for signing up for the hora Calendar waitlist. It means
              more than you think.
            </Text>
            <Text style={{ margin: "0 0 20px" }}>
              I&apos;m Maciej — I&apos;m building hora solo as an indie
              developer. It&apos;s a native macOS Google Calendar client, built
              with Swift and SwiftUI. No Electron, no web views, no bloat. Just
              a fast calendar that talks directly to Google&apos;s API.
            </Text>
            <Text style={{ margin: "0 0 20px" }}>
              The app is already functional — I use it as my daily driver — but
              there&apos;s a lot of work left before it&apos;s ready for
              everyone. I&apos;m shipping updates every day and writing about
              the entire process publicly: the wins, the bugs, the walls I hit.
            </Text>

            <Text
              style={{
                margin: "0 0 8px",
                color: brand.heading,
                fontWeight: 600,
              }}
            >
              If you want to follow along:
            </Text>

            <table cellPadding={0} cellSpacing={0} style={{ margin: "0 0 24px" }}>
              <tbody>
                <FollowRow
                  href={`${BASE}/blog/?${UTM}`}
                  label="horacal.app/blog"
                  description="dev logs and technical deep dives"
                />
                <FollowRow
                  href={`https://x.com/moto_szama?${UTM}`}
                  label="@moto_szama on X"
                  description="daily build-in-public updates"
                />
                <FollowRow
                  href={`https://www.linkedin.com/in/maciej-szamowski/?${UTM}`}
                  label="LinkedIn"
                  description="longer posts about the journey"
                />
              </tbody>
            </table>
          </Section>

          <Section
            style={{
              padding: 24,
              background: brand.surface,
              border: `1px solid ${brand.divider}`,
              borderRadius: 12,
            }}
          >
            <Text
              style={{
                margin: "0 0 12px",
                fontFamily: `'Bumbbled', ${fontStack}`,
                fontSize: 20,
                fontWeight: 400,
                color: brand.accent,
              }}
            >
              One thing that would really help
            </Text>
            <Text
              style={{
                margin: "0 0 16px",
                color: brand.text,
                fontSize: 14,
                lineHeight: 1.6,
              }}
            >
              As a solo dev, building the app is the easy part. Getting the
              word out is where I need help. If you know someone who spends
              their day in Google Calendar — a coworker, a friend, anyone
              who&apos;d appreciate a faster native experience — I&apos;d be
              grateful if you shared hora with them. One forwarded message or a
              quick mention goes a long way.
            </Text>
            <table width="100%" cellPadding={0} cellSpacing={0}>
              <tbody>
                <tr>
                  <td align="center" style={{ paddingTop: 4 }}>
                    <Button
                      href={`${BASE}?${UTM}_share`}
                      style={{
                        display: "inline-block",
                        background: `linear-gradient(135deg, ${brand.accent}, ${brand.accentGlow})`,
                        color: "#ffffff",
                        textDecoration: "none",
                        padding: "11px 28px",
                        borderRadius: 999,
                        fontSize: 14,
                        fontWeight: 500,
                      }}
                    >
                      Share horacal.app with a friend
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </Section>

          <Hr
            style={{
              borderColor: brand.divider,
              margin: "40px 0 24px",
            }}
          />

          <Section>
            <Text
              style={{
                color: "#888888",
                fontSize: 12,
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              <Link
                href={`https://szamowski.dev?${UTM}`}
                style={{ color: "#888888", textDecoration: "none" }}
              >
                szamowski.dev
              </Link>
              {" · "}
              <Link
                href={`${BASE}?${UTM}`}
                style={{ color: "#888888", textDecoration: "none" }}
              >
                horacal.app
              </Link>
              {" · Warsaw, Poland · "}
              <Link
                href={unsubscribeUrl}
                style={{ color: "#888888", textDecoration: "none" }}
              >
                Unsubscribe
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

function FollowRow({
  href,
  label,
  description,
}: {
  href: string;
  label: string;
  description: string;
}) {
  return (
    <tr>
      <td style={{ padding: "4px 0" }}>
        <span style={{ color: "#999999", marginRight: 8 }}>→</span>{" "}
        <Link
          href={href}
          style={{ color: brand.accent, textDecoration: "none" }}
        >
          {label}
        </Link>{" "}
        <span style={{ color: brand.muted, fontSize: 13 }}>— {description}</span>
      </td>
    </tr>
  );
}

WelcomeEmail.PreviewProps = {
  unsubscribeUrl: "https://horacal.app/unsubscribe?token=PREVIEW",
} satisfies Parameters<typeof WelcomeEmail>[0];

export default WelcomeEmail;
