export const RequestAccessButton = ({
  href = "https://continuum.moralis.com/solutions/blockchain/#contact",
  title = "Request an early-access account",
}) => {
  return (
    <a
      href={href}
      className="request-access-button"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "12px 24px",
        borderRadius: "8px",
        background: "linear-gradient(135deg, #0f7fff 0%, #0a5fd9 100%)",
        color: "#fff",
        fontSize: "15px",
        fontWeight: 600,
        textDecoration: "none",
        border: "none",
        boxShadow: "0 2px 8px rgba(15, 127, 255, 0.35)",
        transition: "box-shadow 0.15s ease, transform 0.15s ease",
        width: "fit-content",
      }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .request-access-button,
            .request-access-button:hover {
              color: #fff !important;
              text-decoration: none !important;
            }
            .request-access-button:hover {
              box-shadow: 0 4px 14px rgba(15, 127, 255, 0.5);
              transform: translateY(-1px);
            }
          `,
        }}
      />
      <span>{title}</span>
      <span aria-hidden="true">{"→"}</span>
    </a>
  );
};
