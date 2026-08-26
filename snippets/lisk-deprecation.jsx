const LISK_REMOVAL_DATE = "September 25, 2026";

const LiskCallout = ({ children }) => (
  <div
    className="lisk-deprecation"
    style={{
      border: "1px solid var(--ld-border, #f0d9a8)",
      borderRadius: "8px",
      padding: "12px 14px",
      marginBottom: "16px",
      fontSize: "14px",
      lineHeight: "1.6",
      maxWidth: "100%",
      backgroundColor: "var(--ld-bg, #fdf6e7)",
      display: "flex",
      alignItems: "baseline",
      gap: "8px",
    }}
  >
    <style
      dangerouslySetInnerHTML={{
        __html: `
          .lisk-deprecation {
            --ld-border: #f0d9a8;
            --ld-bg: #fdf6e7;
            --ld-text: #1f2937;
          }
          .lisk-deprecation a {
            color: #b45309 !important;
            text-decoration: underline;
            font-weight: 600;
          }
          .lisk-deprecation code {
            word-break: break-all;
          }
          @media (prefers-color-scheme: dark) {
            .lisk-deprecation {
              --ld-border: #5a4318 !important;
              --ld-bg: #2b2109 !important;
              --ld-text: #e5e7eb !important;
            }
            .lisk-deprecation a {
              color: #fbbf24 !important;
            }
          }
          html.dark .lisk-deprecation,
          [data-theme="dark"] .lisk-deprecation {
            --ld-border: #5a4318 !important;
            --ld-bg: #2b2109 !important;
            --ld-text: #e5e7eb !important;
          }
          html.dark .lisk-deprecation a,
          [data-theme="dark"] .lisk-deprecation a {
            color: #fbbf24 !important;
          }
        `,
      }}
    />
    <span style={{ flexShrink: 0 }}>{"⚠️"}</span>
    <span style={{ color: "var(--ld-text, #1f2937)", wordBreak: "break-word" }}>
      {children}
    </span>
  </div>
);

export const LiskDeprecation = () => (
  <LiskCallout>
    <strong>Deprecated.</strong> Moralis support for Lisk (<code>0x46f</code>) is
    removed on <strong>{LISK_REMOVAL_DATE}</strong>, ahead of the Lisk Chain
    wind-down. Export any history you still need before that date, and point
    your integration at Ethereum (<code>eth</code>) or Base (<code>base</code>),
    or at the <code>https://site1.moralis-nodes.com/eth/</code> and{" "}
    <code>https://site1.moralis-nodes.com/base/</code> RPC paths. See the{" "}
    <a href="/changelog#moonbeam-moonriver-and-lisk-removed-on-september-25-2026">
      deprecation notice
    </a>{" "}
    for the full timeline.
  </LiskCallout>
);

export const LiskChainsNote = () => (
  <LiskCallout>
    <strong>Lisk is deprecated.</strong> Moralis support for Lisk (
    <code>0x46f</code>) is removed on <strong>{LISK_REMOVAL_DATE}</strong>,
    ahead of the Lisk Chain wind-down. Migrate to the <code>eth</code> or{" "}
    <code>base</code> chain parameter and export any history you still need
    before that date. See the{" "}
    <a href="/changelog#moonbeam-moonriver-and-lisk-removed-on-september-25-2026">
      deprecation notice
    </a>{" "}
    for the full timeline.
  </LiskCallout>
);
