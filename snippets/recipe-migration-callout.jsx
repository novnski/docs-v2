export const RecipeMigrationCallout = ({ items = [] }) => {
  if (!items.length) return null;

  const join = (nodes) =>
    nodes.map((node, idx) => (
      <span key={idx}>
        {idx > 0 && (idx === nodes.length - 1 ? " or " : ", ")}
        {node}
      </span>
    ));

  const paths = join(
    items.map((it) => <code key={it.guide}>{it.path}</code>)
  );

  const links = join(
    items.map((it) => (
      <a key={it.guide} href={`/data-feeds/migration/${it.guide}`}>
        {it.label}
      </a>
    ))
  );

  return (
    <div
      className="migration-callout"
      style={{
        border: "1px solid var(--mc-border, #c7e9d6)",
        borderRadius: "8px",
        padding: "12px 14px",
        marginBottom: "16px",
        fontSize: "14px",
        lineHeight: "1.6",
        maxWidth: "100%",
        backgroundColor: "var(--mc-bg, #f0faf4)",
        display: "flex",
        alignItems: "baseline",
        gap: "8px",
      }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .migration-callout {
              --mc-border: #c7e9d6;
              --mc-bg: #f0faf4;
              --mc-text: #1f2937;
            }
            .migration-callout a {
              color: #0e7f4f !important;
              text-decoration: underline;
              font-weight: 600;
            }
            @media (prefers-color-scheme: dark) {
              .migration-callout {
                --mc-border: #1f5138 !important;
                --mc-bg: #102a1d !important;
                --mc-text: #e5e7eb !important;
              }
              .migration-callout a {
                color: #34d399 !important;
              }
            }
            html.dark .migration-callout,
            [data-theme="dark"] .migration-callout {
              --mc-border: #1f5138 !important;
              --mc-bg: #102a1d !important;
              --mc-text: #e5e7eb !important;
            }
            html.dark .migration-callout a,
            [data-theme="dark"] .migration-callout a {
              color: #34d399 !important;
            }
          `,
        }}
      />
      <span style={{ flexShrink: 0 }}>{"🔄"}</span>
      <span style={{ color: "var(--mc-text, #1f2937)", wordBreak: "break-word" }}>
        <strong>Coming from the Moralis REST API?</strong> If you call {paths}{" "}
        today, the migration guide maps your response field by field: {links}.
      </span>
    </div>
  );
};
