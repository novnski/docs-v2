export const EndpointMeta = ({ premium, cus, cusUnit, mainnetOnly }) => {
  const items = [];

  const planName = typeof premium === "string" ? premium : "Pro";

  if (premium) {
    items.push({
      icon: "\u26a0\ufe0f",
      label: "Premium endpoint",
      text: (
        <>
          Requires the <strong>{planName} plan</strong> or above.{" "}
          <a href="/data-api/introduction/resources/premium-endpoints">
            View all
          </a>
          .
        </>
      ),
    });
  }

  if (cus) {
    const isDynamic = !!cusUnit;
    items.push({
      icon: "\u26a1",
      label: isDynamic ? "Dynamic cost" : "Endpoint cost",
      text: isDynamic ? (
        <>
          {cus} CUs per {cusUnit}.{" "}
          <a href="/get-started/pricing#dynamic-endpoints">Learn more</a>.
        </>
      ) : (
        <>
          {cus} CUs.{" "}
          <a href="/get-started/pricing">Learn more</a>.
        </>
      ),
    });
  }

  if (mainnetOnly) {
    items.push({
      icon: "\ud83d\udd17",
      label: "Mainnet only",
      text: <>Testnet chains are not supported.</>,
    });
  }

  if (items.length === 0) return null;

  return (
    <div
      className="endpoint-meta"
      style={{
        border: "1px solid var(--endpoint-meta-border, #e2e8f0)",
        borderRadius: "8px",
        overflow: "hidden",
        marginBottom: "16px",
        fontSize: "14px",
        lineHeight: "1.6",
        maxWidth: "100%",
        color: "var(--endpoint-meta-text, #4b5563)",
      }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .endpoint-meta {
              --endpoint-meta-border: #e2e8f0;
              --endpoint-meta-row-bg: #f8fafc;
              --endpoint-meta-text: #4b5563;
              --endpoint-meta-label: #111827;
              --endpoint-meta-link: #0f7fff;
              --endpoint-meta-link-hover: #0969da;
            }

            .endpoint-meta a {
              color: var(--endpoint-meta-link);
              font-weight: 500;
              text-underline-offset: 2px;
            }

            .endpoint-meta a:hover {
              color: var(--endpoint-meta-link-hover);
            }

            /* Mintlify toggles dark mode with an html class. Avoid OS-level
               color media queries so explicit light mode always wins. */
            html.dark .endpoint-meta,
            [data-theme="dark"] .endpoint-meta {
              --endpoint-meta-border: #374151;
              --endpoint-meta-row-bg: #1e293b;
              --endpoint-meta-text: #d1d5db;
              --endpoint-meta-label: #f3f4f6;
              --endpoint-meta-link: #60a5fa;
              --endpoint-meta-link-hover: #93c5fd;
            }
          `,
        }}
      />
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "8px",
            padding: "10px 14px",
            borderBottom:
              i < items.length - 1
                ? "1px solid var(--endpoint-meta-border, #e2e8f0)"
                : "none",
            backgroundColor: "var(--endpoint-meta-row-bg, #f8fafc)",
          }}
        >
          <span style={{ flexShrink: 0 }}>{item.icon}</span>
          <span style={{ wordBreak: "break-word" }}>
            <strong style={{ color: "var(--endpoint-meta-label, #111827)" }}>
              {item.label}:
            </strong>{" "}
            {item.text}
          </span>
        </div>
      ))}
    </div>
  );
};
