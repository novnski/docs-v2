const MOONBEAM_REMOVAL_DATE = "September 25, 2026";

const MoonbeamCallout = ({ children }) => (
  <div
    className="moonbeam-deprecation"
    style={{
      border: "1px solid var(--md-border, #f0d9a8)",
      borderRadius: "8px",
      padding: "12px 14px",
      marginBottom: "16px",
      fontSize: "14px",
      lineHeight: "1.6",
      maxWidth: "100%",
      backgroundColor: "var(--md-bg, #fdf6e7)",
      display: "flex",
      alignItems: "baseline",
      gap: "8px",
    }}
  >
    <style
      dangerouslySetInnerHTML={{
        __html: `
          .moonbeam-deprecation {
            --md-border: #f0d9a8;
            --md-bg: #fdf6e7;
            --md-text: #1f2937;
          }
          .moonbeam-deprecation a {
            color: #b45309 !important;
            text-decoration: underline;
            font-weight: 600;
          }
          .moonbeam-deprecation code {
            word-break: break-all;
          }
          @media (prefers-color-scheme: dark) {
            .moonbeam-deprecation {
              --md-border: #5a4318 !important;
              --md-bg: #2b2109 !important;
              --md-text: #e5e7eb !important;
            }
            .moonbeam-deprecation a {
              color: #fbbf24 !important;
            }
          }
          html.dark .moonbeam-deprecation,
          [data-theme="dark"] .moonbeam-deprecation {
            --md-border: #5a4318 !important;
            --md-bg: #2b2109 !important;
            --md-text: #e5e7eb !important;
          }
          html.dark .moonbeam-deprecation a,
          [data-theme="dark"] .moonbeam-deprecation a {
            color: #fbbf24 !important;
          }
        `,
      }}
    />
    <span style={{ flexShrink: 0 }}>{"⚠️"}</span>
    <span style={{ color: "var(--md-text, #1f2937)", wordBreak: "break-word" }}>
      {children}
    </span>
  </div>
);

export const MoonbeamDeprecation = () => (
  <MoonbeamCallout>
    <strong>Deprecated. Migrate to Base.</strong> Moonbeam (<code>0x504</code>)
    and Moonriver (<code>0x505</code>) stopped producing new blocks on August 1,
    2026, and Moralis support is removed on{" "}
    <strong>{MOONBEAM_REMOVAL_DATE}</strong>. Following Moonbeam's network
    relaunch on Base, GLMR (
    <code>0xb3846fd356c2149ee8d30b0449088dc74e265459</code>) and MOVR (
    <code>0x43fEB74608334DDa8c1a6500D185cFC3Ea962B83</code>) are now ERC-20
    tokens on Base. Point your integration at Base by using the{" "}
    <code>base</code> chain parameter, or the{" "}
    <code>https://site1.moralis-nodes.com/base/</code> RPC path. See the{" "}
    <a href="/changelog#moonbeam-and-moonriver-historical-data-removal-september-25-2026">deprecation notice</a> for details.
  </MoonbeamCallout>
);

export const MoonbeamChainsNote = () => (
  <MoonbeamCallout>
    <strong>Moonbeam and Moonriver are deprecated.</strong> Both chains stopped
    producing new blocks on August 1, 2026, and Moralis support is removed on{" "}
    <strong>{MOONBEAM_REMOVAL_DATE}</strong>, following Moonbeam's network
    relaunch on Base. GLMR and MOVR are now ERC-20 tokens on Base, so migrate to
    the <code>base</code> chain parameter and export any history you still need
    before that date. See the{" "}
    <a href="/changelog#moonbeam-and-moonriver-historical-data-removal-september-25-2026">deprecation notice</a> for contract addresses and
    details.
  </MoonbeamCallout>
);
