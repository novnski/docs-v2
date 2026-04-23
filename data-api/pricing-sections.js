export const pricingSections = {
  universalApiComputeUnits: {
    tokenDiscoveryAnalytics: [
      {
        label: "searchTokens",
        href: "/data-api/universal/token/search/token-search",
        operation: "/openapi-files/data-api/api.json GET /tokens/search",
      },
      {
        label: "getTokenScore",
        href: "/data-api/universal/token/score/token-score",
        operation: "/openapi-files/data-api/api.json GET /tokens/{tokenAddress}/score",
      },
      {
        label: "getHistoricalTokenScore",
        href: "/data-api/universal/token/score/token-score-timeseries",
        operation: "/openapi-files/data-api/api.json GET /tokens/{tokenAddress}/score/historical",
      },
      {
        label: "getTokenAnalytics",
        href: "/data-api/universal/token/analytics/token-analytics",
        operation: "/openapi-files/data-api/api.json GET /tokens/{tokenAddress}/analytics",
      },
      {
        label: "getMultipleTokenAnalytics",
        href: "/data-api/universal/token/analytics/token-analytics-multi",
        operation: "/openapi-files/data-api/api.json POST /tokens/analytics",
      },
      {
        label: "getTimeSeriesTokenAnalytics",
        href: "/data-api/universal/token/analytics/token-analytics-timeseries",
        operation: "/openapi-files/data-api/api.json POST /tokens/analytics/timeseries",
      },
      {
        label: "getFilteredTokens",
        href: "/data-api/universal/token/filtered-tokens",
        operation: "/openapi-files/data-api/api.json POST /discovery/tokens",
      },
      {
        label: "getTopGainersTokens",
        href: "/data-api/universal/token/top-gainers",
        operation: "/openapi-files/data-api/api.json GET /discovery/tokens/top-gainers",
      },
      {
        label: "getTopLosersTokens",
        href: "/data-api/universal/token/top-losers",
        operation: "/openapi-files/data-api/api.json GET /discovery/tokens/top-losers",
      },
      {
        label: "getTrendingTokens",
        href: "/data-api/universal/token/trending-tokens",
        operation: "/openapi-files/data-api/api.json GET /tokens/trending",
      },
    ],
    entityApi: [
      {
        label: "searchEntities",
        href: "/data-api/universal/entity/endpoints/entity-search",
        operation: "/openapi-files/data-api/api.json GET /entities/search",
      },
      {
        label: "getEntity",
        href: "/data-api/universal/entity/endpoints/entity-by-id",
        operation: "/openapi-files/data-api/api.json GET /entities/{entityId}",
      },
      {
        label: "getEntitiesByCategory",
        href: "/data-api/universal/entity/endpoints/entity-by-category",
        operation: "/openapi-files/data-api/api.json GET /entities/categories/{categoryId}",
      },
      {
        label: "getEntityCategories",
        href: "/data-api/universal/entity/endpoints/entity-categories",
        operation: "/openapi-files/data-api/api.json GET /entities/categories",
      },
    ],
    volumeMarketData: [
      {
        label: "getVolumeStatsByChain",
        href: "/data-api/universal/global/endpoints/trading-stats",
        operation: "/openapi-files/data-api/api.json GET /volume/chains",
      },
      {
        label: "getVolumeStatsByCategory",
        href: "/data-api/universal/global/endpoints/trading-stats-category",
        operation: "/openapi-files/data-api/api.json GET /volume/categories",
      },
      {
        label: "getTimeSeriesVolume",
        href: "/data-api/universal/global/endpoints/trading-stats-timeseries",
        operation: "/openapi-files/data-api/api.json GET /volume/timeseries",
      },
      {
        label: "getTimeSeriesVolumeByCategory",
        href: "/data-api/universal/global/endpoints/trading-stats-category-timeseries",
        operation: "/openapi-files/data-api/api.json GET /volume/timeseries/{categoryId}",
      },
    ],
  },
  evmApiComputeUnits: {
    walletApi: [
      {
        label: "getWalletHistory",
        href: "/data-api/evm/wallet/wallet-history",
        operation: "/openapi-files/data-api/api.json GET /wallets/{address}/history",
      },
      {
        label: "getWalletStats",
        href: "/data-api/evm/wallet/wallet-stats",
        operation: "/openapi-files/data-api/api.json GET /wallets/{address}/stats",
      },
      {
        label: "getWalletActiveChains",
        href: "/data-api/evm/wallet/chain-activity",
        operation: "/openapi-files/data-api/api.json GET /wallets/{address}/chains",
      },
      {
        label: "getWalletTokenBalancesPrice",
        href: "/data-api/evm/wallet/token-balances",
        operation: "/openapi-files/data-api/api.json GET /wallets/{address}/tokens",
      },
      {
        label: "getWalletTokenBalances",
        href: "/data-api/evm/wallet/token-balances-legacy",
        operation: "/openapi-files/data-api/api.json GET /{address}/erc20",
      },
      {
        label: "getNativeBalance",
        href: "/data-api/evm/wallet/native-balance",
        operation: "/openapi-files/data-api/api.json GET /{address}/balance",
      },
      {
        label: "getNativeBalancesForAddresses",
        href: "/data-api/evm/wallet/native-balances-batch",
        operation: "/openapi-files/data-api/api.json GET /wallets/balances",
      },
      {
        label: "getWalletNFTs",
        href: "/data-api/evm/wallet/nft-balances",
        operation: "/openapi-files/data-api/api.json GET /{address}/nft",
      },
      {
        label: "getWalletNFTCollections",
        href: "/data-api/evm/wallet/nft-collections",
        operation: "/openapi-files/data-api/api.json GET /{address}/nft/collections",
      },
      {
        label: "getWalletNFTTransfers",
        href: "/data-api/evm/wallet/nft-transfers",
        operation: "/openapi-files/data-api/api.json GET /{address}/nft/transfers",
      },
      {
        label: "getNFTTradesByWallet",
        href: "/data-api/evm/wallet/nft-trades-by-wallet",
        operation: "/openapi-files/data-api/api.json GET /wallets/{address}/nfts/trades",
      },
      {
        label: "getWalletTokenTransfers",
        href: "/data-api/evm/wallet/token-transfers",
        operation: "/openapi-files/data-api/api.json GET /{address}/erc20/transfers",
      },
      {
        label: "getWalletTransactions",
        href: "/data-api/evm/wallet/wallet-transactions",
        operation: "/openapi-files/data-api/api.json GET /{address}",
      },
      {
        label: "getWalletTransactionsVerbose",
        href: "/data-api/evm/wallet/decoded-transactions",
        operation: "/openapi-files/data-api/api.json GET /{address}/verbose",
      },
      {
        label: "getWalletApprovals",
        href: "/data-api/evm/wallet/approvals",
        operation: "/openapi-files/data-api/api.json GET /wallets/{address}/approvals",
      },
      {
        label: "getWalletNetWorth",
        href: "/data-api/evm/wallet/net-worth",
        operation: "/openapi-files/data-api/api.json GET /wallets/{address}/net-worth",
      },
      {
        label: "getWalletProfitability",
        href: "/data-api/evm/wallet/wallet-pnl",
        operation: "/openapi-files/data-api/api.json GET /wallets/{address}/profitability",
      },
      {
        label: "getWalletProfitabilitySummary",
        href: "/data-api/evm/wallet/wallet-pnl-summary",
        operation: "/openapi-files/data-api/api.json GET /wallets/{address}/profitability/summary",
      },
      {
        label: "getDefiSummary",
        href: "/data-api/evm/wallet/wallet-protocols",
        operation: "/openapi-files/data-api/api.json GET /wallets/{address}/defi/summary",
      },
      {
        label: "getDefiPositionsSummary",
        href: "/data-api/evm/wallet/wallet-positions",
        operation: "/openapi-files/data-api/api.json GET /wallets/{address}/defi/positions",
      },
      {
        label: "getDefiPositionsByProtocol",
        href: "/data-api/evm/wallet/detailed-positions",
        operation: "/openapi-files/data-api/api.json GET /wallets/{address}/defi/{protocol}/positions",
      },
      {
        label: "getSwapsByWalletAddress",
        href: "/data-api/evm/wallet/wallet-swaps",
        operation: "/openapi-files/data-api/api.json GET /wallets/{address}/swaps",
      },
      {
        label: "resolveENSDomain",
        href: "/data-api/evm/wallet/ens-lookup",
        operation: "/openapi-files/data-api/api.json GET /resolve/{address}/reverse",
      },
      {
        label: "resolveAddress",
        href: "/data-api/evm/wallet/resolve-address",
        operation: "/openapi-files/data-api/api.json GET /resolve/ens/{domain}",
      },
      {
        label: "getWalletInsight",
        href: "/data-api/evm/wallet/wallet-insights",
        operation: "/openapi-files/data-api/api.json GET /wallets/{address}/insight",
      },
    ],
    tokenApi: [
      {
        label: "getTokenMetadata",
        href: "/data-api/evm/token/metadata/token-metadata",
        operation: "/openapi-files/data-api/api.json GET /erc20/metadata",
      },
      {
        label: "getTokenPrice",
        href: "/data-api/evm/token/prices/token-price",
        operation: "/openapi-files/data-api/api.json GET /erc20/{address}/price",
      },
      {
        label: "getMultipleTokenPrices",
        href: "/data-api/evm/token/prices/token-prices-batch",
        operation: "/openapi-files/data-api/api.json POST /erc20/prices",
      },
      {
        label: "getPairCandlesticks",
        href: "/data-api/evm/token/prices/ohlc",
        operation: "/openapi-files/data-api/api.json GET /pairs/{address}/ohlcv",
      },
      {
        label: "getTokenScore",
        href: "/data-api/evm/token/metadata/token-score",
        operation: "/openapi-files/data-api/api.json GET /tokens/{tokenAddress}/score",
      },
      {
        label: "getHistoricalTokenScore",
        href: "/data-api/evm/token/metadata/token-score-timeseries",
        operation: "/openapi-files/data-api/api.json GET /tokens/{tokenAddress}/score/historical",
      },
      {
        label: "getTokenHolders",
        href: "/data-api/evm/token/holders/token-holders",
        operation: "/openapi-files/data-api/api.json GET /erc20/{token_address}/owners",
      },
      {
        label: "getHistoricalTokenHolders",
        href: "/data-api/evm/token/holders/historical-token-holders",
        operation: "/openapi-files/data-api/api.json GET /erc20/{tokenAddress}/holders/historical",
      },
      {
        label: "getTokenStats",
        href: "/data-api/evm/token/holders/token-holder-stats",
        operation: "/openapi-files/data-api/api.json GET /erc20/{tokenAddress}/holders",
      },
      {
        label: "getTokenTransfers",
        href: "/data-api/evm/token/transfers/token-transfers",
        operation: "/openapi-files/data-api/api.json GET /erc20/{address}/transfers",
      },
      {
        label: "getTokenPairs",
        href: "/data-api/evm/token/swaps/token-pairs",
        operation: "/openapi-files/data-api/api.json GET /erc20/{token_address}/pairs",
      },
      {
        label: "getSwapsByTokenAddress",
        href: "/data-api/evm/token/swaps/token-swaps",
        operation: "/openapi-files/data-api/api.json GET /erc20/{address}/swaps",
      },
      {
        label: "getSwapsByPairAddress",
        href: "/data-api/evm/token/swaps/pair-swaps",
        operation: "/openapi-files/data-api/api.json GET /pairs/{address}/swaps",
      },
      {
        label: "getPairStats",
        href: "/data-api/evm/token/swaps/pair-stats",
        operation: "/openapi-files/data-api/api.json GET /pairs/{address}/stats",
      },
      {
        label: "getSnipersByPairAddress",
        href: "/data-api/evm/token/signals/snipers",
        operation: "/openapi-files/data-api/api.json GET /pairs/{address}/snipers",
      },
      {
        label: "getTopProfitableWalletPerToken",
        href: "/data-api/evm/token/signals/top-traders",
        operation: "/openapi-files/data-api/api.json GET /erc20/{address}/top-gainers",
      },
      {
        label: "getTokenCategories",
        href: "/data-api/evm/token/discovery/token-categories",
        operation: "/openapi-files/data-api/api.json GET /tokens/categories",
      },
      {
        label: "getFilteredTokens",
        href: "/data-api/evm/token/discovery/filtered-tokens",
        operation: "/openapi-files/data-api/api.json POST /discovery/tokens",
      },
      {
        label: "getTopGainersTokens",
        href: "/data-api/evm/token/discovery/top-gainers",
        operation: "/openapi-files/data-api/api.json GET /discovery/tokens/top-gainers",
      },
      {
        label: "getTopLosersTokens",
        href: "/data-api/evm/token/discovery/top-losers",
        operation: "/openapi-files/data-api/api.json GET /discovery/tokens/top-losers",
      },
    ],
    nftApi: [
      {
        label: "getNFTMetadata",
        href: "/data-api/evm/nft/metadata/nft-metadata",
        operation: "/openapi-files/data-api/api.json GET /nft/{address}/{token_id}",
      },
      {
        label: "getMultipleNFTs",
        href: "/data-api/evm/nft/metadata/nft-metadata-batch",
        operation: "/openapi-files/data-api/api.json POST /nft/getMultipleNFTs",
      },
      {
        label: "getNFTContractMetadata",
        href: "/data-api/evm/nft/metadata/collection-metadata",
        operation: "/openapi-files/data-api/api.json GET /nft/{address}/metadata",
      },
      {
        label: "getNFTBulkContractMetadata",
        href: "/data-api/evm/nft/metadata/collection-metadata-batch",
        operation: "/openapi-files/data-api/api.json POST /nft/metadata",
      },
      {
        label: "getNFTCollectionStats",
        href: "/data-api/evm/nft/metadata/collection-stats",
        operation: "/openapi-files/data-api/api.json GET /nft/{address}/stats",
      },
      {
        label: "getContractNFTs",
        href: "/data-api/evm/nft/collections/nfts-by-collection",
        operation: "/openapi-files/data-api/api.json GET /nft/{address}",
      },
      {
        label: "getNFTFloorPriceByToken",
        href: "/data-api/evm/nft/prices/floor",
        operation: "/openapi-files/data-api/api.json GET /nft/{address}/{token_id}/floor-price",
      },
      {
        label: "getNFTFloorPriceByContract",
        href: "/data-api/evm/nft/prices/collection-floor-price",
        operation: "/openapi-files/data-api/api.json GET /nft/{address}/floor-price",
      },
      {
        label: "getNFTHistoricalFloorPriceByContract",
        href: "/data-api/evm/nft/prices/historical-floor-price",
        operation: "/openapi-files/data-api/api.json GET /nft/{address}/floor-price/historical",
      },
      {
        label: "getNFTSalePrices",
        href: "/data-api/evm/nft/prices/sale-price-by-token-id",
        operation: "/openapi-files/data-api/api.json GET /nft/{address}/{token_id}/price",
      },
      {
        label: "getNFTContractSalePrices",
        href: "/data-api/evm/nft/prices/sale-price-by-contract",
        operation: "/openapi-files/data-api/api.json GET /nft/{address}/price",
      },
      {
        label: "getNFTTrades",
        href: "/data-api/evm/nft/trades/collection-trades",
        operation: "/openapi-files/data-api/api.json GET /nft/{address}/trades",
      },
      {
        label: "getNFTTradesByToken",
        href: "/data-api/evm/nft/trades/trades-by-token-id",
        operation: "/openapi-files/data-api/api.json GET /nft/{address}/{token_id}/trades",
      },
      {
        label: "getNFTOwners",
        href: "/data-api/evm/nft/ownership/owners-by-contract",
        operation: "/openapi-files/data-api/api.json GET /nft/{address}/unique-owners",
      },
      {
        label: "getNFTTokenIdOwners",
        href: "/data-api/evm/nft/ownership/owners-by-token-id",
        operation: "/openapi-files/data-api/api.json GET /nft/{address}/{token_id}/owners",
      },
      {
        label: "getNFTContractTransfers",
        href: "/data-api/evm/nft/transfers/collection-transfers",
        operation: "/openapi-files/data-api/api.json GET /nft/{address}/transfers",
      },
      {
        label: "getNFTTransfers",
        href: "/data-api/evm/nft/transfers/token-id-transfers",
        operation: "/openapi-files/data-api/api.json GET /nft/{address}/{token_id}/transfers",
      },
      {
        label: "getNFTTraitsByCollection",
        href: "/data-api/evm/nft/traits/traits-by-collection",
        operation: "/openapi-files/data-api/api.json GET /nft/{address}/traits",
      },
      {
        label: "getNFTTraitsByCollectionPaginate",
        href: "/data-api/evm/nft/traits/traits-by-collection-paginated",
        operation: "/openapi-files/data-api/api.json GET /nft/{address}/traits/paginate",
      },
      {
        label: "getNFTByContractTraits",
        href: "/data-api/evm/nft/traits/nfts-by-traits",
        operation: "/openapi-files/data-api/api.json POST /nft/{address}/nfts-by-traits",
      },
      {
        label: "getTopNFTCollectionsByMarketCap",
        href: "/data-api/evm/nft/discovery/nfts-by-market-cap",
        operation: "/openapi-files/data-api/api.json GET /market-data/nfts/top-collections",
      },
      {
        label: "getHottestNFTCollectionsByTradingVolume",
        href: "/data-api/evm/nft/discovery/nfts-by-volume",
        operation: "/openapi-files/data-api/api.json GET /market-data/nfts/hottest-collections",
      },
      {
        label: "reSyncMetadata",
        href: "/data-api/evm/nft/utilities/resync-nft-metadata",
        operation: "/openapi-files/data-api/api.json GET /nft/{address}/{token_id}/metadata/resync",
      },
      {
        label: "resyncNFTRarity",
        href: "/data-api/evm/nft/utilities/resync-nft-traits",
        operation: "/openapi-files/data-api/api.json GET /nft/{address}/traits/resync",
      },
    ],
    priceApi: [
      {
        label: "getTokenPrice",
        href: "/data-api/evm/price/token-price",
        operation: "/openapi-files/data-api/api.json GET /erc20/{address}/price",
      },
      {
        label: "getMultipleTokenPrices",
        href: "/data-api/evm/price/token-prices-batch",
        operation: "/openapi-files/data-api/api.json POST /erc20/prices",
      },
      {
        label: "getPairCandlesticks",
        href: "/data-api/evm/price/ohlc",
        operation: "/openapi-files/data-api/api.json GET /pairs/{address}/ohlcv",
      },
      {
        label: "getNFTFloorPriceByToken",
        href: "/data-api/evm/price/token-id-floor-price",
        operation: "/openapi-files/data-api/api.json GET /nft/{address}/{token_id}/floor-price",
      },
      {
        label: "getNFTFloorPriceByContract",
        href: "/data-api/evm/price/collection-floor-price",
        operation: "/openapi-files/data-api/api.json GET /nft/{address}/floor-price",
      },
      {
        label: "getNFTHistoricalFloorPriceByContract",
        href: "/data-api/evm/price/timeseries-floor-price",
        operation: "/openapi-files/data-api/api.json GET /nft/{address}/floor-price/historical",
      },
      {
        label: "getNFTSalePrices",
        href: "/data-api/evm/price/sale-price-by-token-id",
        operation: "/openapi-files/data-api/api.json GET /nft/{address}/{token_id}/price",
      },
      {
        label: "getNFTContractSalePrices",
        href: "/data-api/evm/price/sale-prices-by-collection",
        operation: "/openapi-files/data-api/api.json GET /nft/{address}/price",
      },
    ],
    defiApi: [
      {
        label: "getDefiSummary",
        href: "/data-api/evm/defi/wallet-protocols",
        operation: "/openapi-files/data-api/api.json GET /wallets/{address}/defi/summary",
      },
      {
        label: "getDefiPositionsSummary",
        href: "/data-api/evm/defi/wallet-positions",
        operation: "/openapi-files/data-api/api.json GET /wallets/{address}/defi/positions",
      },
      {
        label: "getDefiPositionsByProtocol",
        href: "/data-api/evm/defi/wallet-positions-detailed",
        operation: "/openapi-files/data-api/api.json GET /wallets/{address}/defi/{protocol}/positions",
      },
    ],
    blockchainApi: [
      {
        label: "getWalletTransactions",
        href: "/data-api/evm/blockchain/address-transactions",
        operation: "/openapi-files/data-api/api.json GET /{address}",
      },
      {
        label: "getWalletTransactionsVerbose",
        href: "/data-api/evm/blockchain/address-transactions-decoded",
        operation: "/openapi-files/data-api/api.json GET /{address}/verbose",
      },
      {
        label: "getDateToBlock",
        href: "/data-api/evm/blockchain/block-by-date",
        operation: "/openapi-files/data-api/api.json GET /dateToBlock",
      },
      {
        label: "getBlock",
        href: "/data-api/evm/blockchain/block-by-hash",
        operation: "/openapi-files/data-api/api.json GET /block/{block_number_or_hash}",
      },
      {
        label: "getLatestBlockNumber",
        href: "/data-api/evm/blockchain/latest-block",
        operation: "/openapi-files/data-api/api.json GET /latestBlockNumber/{chain}",
      },
      {
        label: "getTransaction",
        href: "/data-api/evm/blockchain/transaction-by-hash",
        operation: "/openapi-files/data-api/api.json GET /transaction/{transaction_hash}",
      },
      {
        label: "getTransactionVerbose",
        href: "/data-api/evm/blockchain/transaction-by-hash-decoded",
        operation: "/openapi-files/data-api/api.json GET /transaction/{transaction_hash}/verbose",
      },
    ],
  },
  solanaApiComputeUnits: {
    walletApi: [
      {
        label: "balance",
        href: "/data-api/solana/wallet/native-balance",
        operation: "/openapi-files/data-api/solana-api.json GET /account/{network}/{address}/balance",
      },
      {
        label: "getSPL",
        href: "/data-api/solana/wallet/token-balances",
        operation: "/openapi-files/data-api/solana-api.json GET /account/{network}/{address}/tokens",
      },
      {
        label: "getNFTs",
        href: "/data-api/solana/wallet/nft-balances",
        operation: "/openapi-files/data-api/solana-api.json GET /account/{network}/{address}/nft",
      },
      {
        label: "getPortfolio",
        href: "/data-api/solana/wallet/portfolio",
        operation: "/openapi-files/data-api/solana-api.json GET /account/{network}/{address}/portfolio",
      },
      {
        label: "getSwapsByWalletAddress",
        href: "/data-api/solana/wallet/wallet-swaps",
        operation: "/openapi-files/data-api/solana-api.json GET /account/{network}/{address}/swaps",
      },
    ],
    tokenApi: [
      {
        label: "getTokenMetadata",
        href: "/data-api/solana/token/token-metadata",
        operation: "/openapi-files/data-api/solana-api.json GET /token/{network}/{address}/metadata",
      },
      {
        label: "getMultipleTokenMetadata",
        href: "/data-api/solana/token/token-metadata-batch",
        operation: "/openapi-files/data-api/solana-api.json POST /token/{network}/metadata",
      },
      {
        label: "getTokenScore",
        href: "/data-api/solana/token/token-score",
        operation: "/openapi-files/data-api/api.json GET /tokens/{tokenAddress}/score",
      },
      {
        label: "getHistoricalTokenScore",
        href: "/data-api/solana/token/token-score-timeseries",
        operation: "/openapi-files/data-api/api.json GET /tokens/{tokenAddress}/score/historical",
      },
      {
        label: "getTokenPrice",
        href: "/data-api/solana/token/prices/token-price",
        operation: "/openapi-files/data-api/solana-api.json GET /token/{network}/{address}/price",
      },
      {
        label: "getMultipleTokenPrices",
        href: "/data-api/solana/token/prices/token-prices-batch",
        operation: "/openapi-files/data-api/solana-api.json POST /token/{network}/prices",
      },
      {
        label: "getCandleSticks",
        href: "/data-api/solana/token/prices/ohlc",
        operation: "/openapi-files/data-api/solana-api.json GET /token/{network}/pairs/{address}/ohlcv",
      },
      {
        label: "getTopHolders",
        href: "/data-api/solana/token/holders/top-holders",
        operation: "/openapi-files/data-api/solana-api.json GET /token/{network}/{address}/top-holders",
      },
      {
        label: "getHistoricalTokenHolders",
        href: "/data-api/solana/token/holders/historical-holders",
        operation: "/openapi-files/data-api/solana-api.json GET /token/{network}/holders/{address}/historical",
      },
      {
        label: "getTokenHolders",
        href: "/data-api/solana/token/holders/holder-metrics",
        operation: "/openapi-files/data-api/solana-api.json GET /token/{network}/holders/{address}",
      },
      {
        label: "getTokenPairs",
        href: "/data-api/solana/token/pairs/token-pairs",
        operation: "/openapi-files/data-api/solana-api.json GET /token/{network}/{address}/pairs",
      },
      {
        label: "getSwapsByTokenAddress",
        href: "/data-api/solana/token/swaps/token-swaps",
        operation: "/openapi-files/data-api/solana-api.json GET /token/{network}/{address}/swaps",
      },
      {
        label: "getSwapsByPairAddress",
        href: "/data-api/solana/token/pairs/pair-swaps",
        operation: "/openapi-files/data-api/solana-api.json GET /token/{network}/pairs/{pairAddress}/swaps",
      },
      {
        label: "getPairStats",
        href: "/data-api/solana/token/pairs/pair-stats",
        operation: "/openapi-files/data-api/solana-api.json GET /token/{network}/pairs/{pairAddress}/stats",
      },
      {
        label: "getAggregatedTokenPairStats",
        href: "/data-api/solana/token/market-metrics/token-analytics",
        operation: "/openapi-files/data-api/api.json GET /tokens/{tokenAddress}/analytics",
      },
      {
        label: "getSnipersByPairAddress",
        href: "/data-api/solana/token/advanced-signals/snipers",
        operation: "/openapi-files/data-api/solana-api.json GET /token/{network}/pairs/{pairAddress}/snipers",
      },
      {
        label: "getNewTokensByExchange",
        href: "/data-api/solana/token/search-and-discovery/pump-fun-new-tokens",
        operation: "/openapi-files/data-api/solana-api.json GET /token/{network}/exchange/{exchange}/new",
      },
      {
        label: "getGraduatedTokensByExchange",
        href: "/data-api/solana/token/search-and-discovery/pump-fun-graduated-tokens",
        operation: "/openapi-files/data-api/solana-api.json GET /token/{network}/exchange/{exchange}/graduated",
      },
      {
        label: "getBondingTokensByExchange",
        href: "/data-api/solana/token/search-and-discovery/pump-fun-bonding-tokens",
        operation: "/openapi-files/data-api/solana-api.json GET /token/{network}/exchange/{exchange}/bonding",
      },
      {
        label: "getTokenBondingStatus",
        href: "/data-api/solana/token/search-and-discovery/pump-fun-bonding-status",
        operation: "/openapi-files/data-api/solana-api.json GET /token/{network}/{address}/bonding-status",
      },
    ],
    nftApi: [
      {
        label: "getNFTMetadata",
        href: "/data-api/solana/nft/nft-metadata",
        operation: "/openapi-files/data-api/solana-api.json GET /nft/{network}/{address}/metadata",
      },
    ],
    priceApi: [
      {
        label: "getTokenPrice",
        href: "/data-api/solana/price/token-price",
        operation: "/openapi-files/data-api/solana-api.json GET /token/{network}/{address}/price",
      },
      {
        label: "getMultipleTokenPrices",
        href: "/data-api/solana/price/token-prices-batch",
        operation: "/openapi-files/data-api/solana-api.json POST /token/{network}/prices",
      },
      {
        label: "getCandleSticks",
        href: "/data-api/solana/price/ohlc",
        operation: "/openapi-files/data-api/solana-api.json GET /token/{network}/pairs/{address}/ohlcv",
      },
    ],
  },
};
