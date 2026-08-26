export const SupportedChainsTable = () => {
  const products = [
    { key: "all", label: "All Products" },
    { key: "dataApi", label: "Data API" },
    { key: "streams", label: "Streams" },
    { key: "datashare", label: "Datashare" },
    { key: "rpc", label: "RPC Nodes" },
    { key: "auth", label: "Auth API" },
  ];

  // s = [dataApi, streams, datashare, rpc, auth]
  const mk = (dataApi, streams, datashare, rpc, auth) => ({
    dataApi,
    streams,
    datashare,
    rpc,
    auth,
  });

  const chains = [
    { name: "Ethereum Mainnet", type: "Mainnet", chainId: "0x1 (1)", s: mk(true, true, true, true, true) },
    { name: "Ethereum Sepolia", type: "Testnet", chainId: "0xaa36a7 (11155111)", s: mk(true, true, true, true, true) },
    { name: "Polygon Mainnet", type: "Mainnet", chainId: "0x89 (137)", s: mk(true, true, true, true, true) },
    { name: "Polygon Amoy", type: "Testnet", chainId: "0x13882 (80002)", s: mk(true, true, true, true, true) },
    { name: "Binance Smart Chain Mainnet", type: "Mainnet", chainId: "0x38 (56)", s: mk(true, true, true, true, true) },
    { name: "Binance Smart Chain Testnet", type: "Testnet", chainId: "0x61 (97)", s: mk(true, true, true, true, true) },
    { name: "Arbitrum", type: "Mainnet", chainId: "0xa4b1 (42161)", s: mk(true, true, true, true, true) },
    { name: "Base", type: "Mainnet", chainId: "0x2105 (8453)", s: mk(true, true, true, true, true) },
    { name: "Base Sepolia", type: "Testnet", chainId: "0x14a34 (84532)", s: mk(true, true, true, true, true) },
    { name: "Optimism", type: "Mainnet", chainId: "0xa (10)", s: mk(true, true, true, true, true) },
    { name: "Linea", type: "Mainnet", chainId: "0xe708 (59144)", s: mk(true, true, true, true, true) },
    { name: "Avalanche", type: "Mainnet", chainId: "0xa86a (43114)", s: mk(true, true, true, true, true) },
    { name: "Cronos Mainnet", type: "Mainnet", chainId: "0x19 (25)", s: mk(true, true, true, false, true) },
    { name: "Gnosis", type: "Mainnet", chainId: "0x64 (100)", s: mk(true, true, true, true, true) },
    { name: "Chiliz Mainnet", type: "Mainnet", chainId: "0x15b38 (88888)", s: mk(true, true, true, false, true) },
    { name: "Moonbeam", type: "Mainnet", chainId: "0x504 (1284)", deprecated: true, depNote: "Support removed on September 25, 2026. Migrate to Base.", depHref: "/changelog#moonbeam-moonriver-and-lisk-removed-on-september-25-2026", s: mk(true, true, true, true, true) },
    { name: "Moonriver", type: "Testnet", chainId: "0x505 (1285)", deprecated: true, depNote: "Support removed on September 25, 2026. Migrate to Base.", depHref: "/changelog#moonbeam-moonriver-and-lisk-removed-on-september-25-2026", s: mk(true, true, true, true, true) },
    { name: "Flow", type: "Mainnet", chainId: "0x2eb (747)", s: mk(true, true, true, true, false) },
    { name: "Flow Testnet", type: "Testnet", chainId: "0x221 (545)", s: mk(true, true, true, true, false) },
    { name: "Ronin", type: "Mainnet", chainId: "0x7e4 (2020)", s: mk(true, true, true, true, false) },
    { name: "Ronin Saigon Testnet", type: "Testnet", chainId: "0x7e5 (2021)", s: mk(true, true, true, true, false) },
    { name: "Lisk", type: "Mainnet", chainId: "0x46f (1135)", deprecated: true, depNote: "Support removed on September 25, 2026. Migrate to Ethereum or Base.", depHref: "/changelog#moonbeam-moonriver-and-lisk-removed-on-september-25-2026", s: mk(true, true, true, true, false) },
    { name: "Pulsechain", type: "Mainnet", chainId: "0x171 (369)", s: mk(true, true, true, true, false) },
    { name: "Sei", type: "Mainnet", chainId: "0x531 (1329)", s: mk(true, true, true, false, false) },
    { name: "Sei Testnet", type: "Testnet", chainId: "0x530 (1328)", s: mk(true, true, true, false, false) },
    { name: "Monad", type: "Mainnet", chainId: "0x8f (143)", s: mk(true, true, true, false, true) },
    { name: "Blast", type: "Mainnet", chainId: "0x13e31 (81457)", s: mk(false, false, false, true, false) },
    { name: "Blast Sepolia", type: "Testnet", chainId: "0xa0c71fd (168587773)", s: mk(false, false, false, true, false) },
    { name: "zkSync", type: "Mainnet", chainId: "0x144 (324)", s: mk(false, false, false, true, false) },
    { name: "zkSync Sepolia", type: "Testnet", chainId: "0x12c (300)", s: mk(false, false, false, true, false) },
    { name: "Mantle", type: "Mainnet", chainId: "0x1388 (5000)", s: mk(false, false, false, true, false) },
    { name: "Mantle Sepolia", type: "Testnet", chainId: "0x138b (5003)", s: mk(false, false, false, true, false) },
    { name: "opBNB", type: "Mainnet", chainId: "0xcc (204)", s: mk(false, false, false, true, false) },
    { name: "Polygon zkEVM", type: "Mainnet", chainId: "0x44d (1101)", s: mk(false, false, false, true, false) },
    { name: "Polygon zkEVM Cardona", type: "Testnet", chainId: "0x98a (2442)", s: mk(false, false, false, true, false) },
    { name: "Solana Mainnet", type: "Mainnet", chainId: "mainnet", s: mk(true, false, true, false, false) },
    { name: "Bitcoin Mainnet", type: "Mainnet", chainId: "mainnet", s: mk(true, true, false, false, false) },
  ];

  const [selected, setSelected] = useState("all");

  const visible =
    selected === "all" ? chains : chains.filter((c) => c.s[selected]);

  const Cell = ({ on }) => (
    <td style={{ textAlign: "center" }}>
      <span style={{ color: on ? "#16a34a" : "rgba(128,128,128,0.5)" }}>
        {on ? "✓" : "✗"}
      </span>
    </td>
  );

  const DeprecatedBadge = ({ note, href }) => (
    <a
      href={href || "/changelog"}
      title={note || "Support removed on September 25, 2026."}
      style={{
        marginLeft: "6px",
        padding: "1px 6px",
        borderRadius: "9999px",
        fontSize: "11px",
        fontWeight: 600,
        whiteSpace: "nowrap",
        color: "#b45309",
        backgroundColor: "rgba(180,83,9,0.12)",
        border: "1px solid rgba(180,83,9,0.35)",
        textDecoration: "none",
      }}
    >
      Deprecated Sep 25, 2026
    </a>
  );

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          marginBottom: "16px",
        }}
      >
        {products.map((p) => {
          const active = selected === p.key;
          return (
            <button
              key={p.key}
              type="button"
              onClick={() => setSelected(p.key)}
              style={{
                padding: "6px 14px",
                fontSize: "14px",
                fontWeight: active ? 600 : 500,
                borderRadius: "9999px",
                cursor: "pointer",
                border: "1px solid",
                borderColor: active ? "#0f7fff" : "rgba(128,128,128,0.4)",
                backgroundColor: active ? "#0f7fff" : "transparent",
                color: active ? "#ffffff" : "inherit",
              }}
            >
              {p.label}
            </button>
          );
        })}
      </div>

      <p style={{ fontSize: "14px", marginBottom: "12px", opacity: 0.7 }}>
        Showing <strong>{visible.length}</strong> chain
        {visible.length !== 1 && "s"}
        {selected !== "all" &&
          ` supported on ${products.find((p) => p.key === selected).label}`}
        .
      </p>

      <table>
        <thead>
          <tr>
            <th>Chain Name</th>
            <th>Type</th>
            <th>Chain ID</th>
            <th style={{ textAlign: "center" }}>Data API</th>
            <th style={{ textAlign: "center" }}>Streams</th>
            <th style={{ textAlign: "center" }}>Datashare</th>
            <th style={{ textAlign: "center" }}>RPC Nodes</th>
            <th style={{ textAlign: "center" }}>Auth API</th>
          </tr>
        </thead>
        <tbody>
          {visible.map((c) => (
            <tr key={c.name}>
              <td>
                {c.name}
                {c.deprecated && <DeprecatedBadge note={c.depNote} href={c.depHref} />}
              </td>
              <td>{c.type}</td>
              <td>{c.chainId}</td>
              <Cell on={c.s.dataApi} />
              <Cell on={c.s.streams} />
              <Cell on={c.s.datashare} />
              <Cell on={c.s.rpc} />
              <Cell on={c.s.auth} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
