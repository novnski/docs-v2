export const SupportedChains = ({ chains }) => {
  const chainData = {
    ethereum: { name: "Ethereum", chainId: "0x1", alias: "eth" },
    polygon: { name: "Polygon", chainId: "0x89", alias: "polygon" },
    binance: { name: "BNB Chain", chainId: "0x38", alias: "bsc" },
    avalanche: { name: "Avalanche", chainId: "0xa86a", alias: "avalanche" },
    base: { name: "Base", chainId: "0x2105", alias: "base" },
    optimism: { name: "Optimism", chainId: "0xa", alias: "optimism" },
    arbitrum: { name: "Arbitrum", chainId: "0xa4b1", alias: "arbitrum" },
    fantom: { name: "Fantom", chainId: "0xfa", alias: "fantom" },
    cronos: { name: "Cronos", chainId: "0x19", alias: "cronos" },
    gnosis: { name: "Gnosis", chainId: "0x64", alias: "gnosis" },
    chiliz: { name: "Chiliz", chainId: "0x15b38", alias: "chiliz" },
    moonbeam: { name: "Moonbeam", chainId: "0x504", alias: "moonbeam" },
    moonriver: { name: "Moonriver", chainId: "0x505", alias: "moonriver" },
    moonbase: { name: "Moonbase", chainId: "0x507", alias: "moonbase" },
    flow: { name: "Flow", chainId: "0x2eb", alias: "flow" },
    ronin: { name: "Ronin", chainId: "0x7e4", alias: "ronin" },
    lisk: { name: "Lisk", chainId: "0x46f", alias: "lisk" },
    linea: { name: "Linea", chainId: "0xe708", alias: "linea" },
    pulse: { name: "PulseChain", chainId: "0x171", alias: "pulse" },
    sei: { name: "Sei", chainId: "0x531", alias: "sei" },
    monad: { name: "Monad", chainId: "0x8f", alias: "monad" },
    solana: { name: "Solana", chainId: "mainnet", alias: "solana" },
  };

  const resolved = chains.map((c) => {
    const key = c.toLowerCase().trim();
    return chainData[key] || { name: c, chainId: "—", alias: "—" };
  });

  return (
    <Accordion title="Supported Chains (Beta)">
      <p style={{ marginBottom: "12px", fontSize: "14px" }}>
        This endpoint currently supports <strong>{resolved.length}</strong>{" "}
        chain{resolved.length !== 1 && "s"}:
      </p>
      <table>
        <thead>
          <tr>
            <th>Chain</th>
            <th>Query Params</th>
          </tr>
        </thead>
        <tbody>
          {resolved.map((chain) => (
            <tr key={chain.chainId}>
              <td>{chain.name}</td>
              <td>
                <code>{chain.alias}</code> · <code>{chain.chainId}</code>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Accordion>
  );
};
