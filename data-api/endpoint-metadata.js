export const endpointMetadata = {
  "/openapi-files/data-api/api.json GET /block/{block_number_or_hash}": {
    "cus": 100
  },
  "/openapi-files/data-api/api.json GET /dateToBlock": {
    "cus": 1
  },
  "/openapi-files/data-api/api.json GET /discovery/tokens/top-gainers": {
    "cus": 250,
    "mainnetOnly": true
  },
  "/openapi-files/data-api/api.json GET /discovery/tokens/top-losers": {
    "cus": 250,
    "mainnetOnly": true
  },
  "/openapi-files/data-api/api.json GET /entities/categories": {
    "cus": 10
  },
  "/openapi-files/data-api/api.json GET /entities/categories/{categoryId}": {
    "cus": 50
  },
  "/openapi-files/data-api/api.json GET /entities/search": {
    "cus": 50
  },
  "/openapi-files/data-api/api.json GET /entities/{entityId}": {
    "cus": 50
  },
  "/openapi-files/data-api/api.json GET /erc20/metadata": {
    "cus": 10
  },
  "/openapi-files/data-api/api.json GET /erc20/{address}/price": {
    "cus": 50,
    "mainnetOnly": true
  },
  "/openapi-files/data-api/api.json GET /erc20/{address}/swaps": {
    "cus": 50,
    "mainnetOnly": true
  },
  "/openapi-files/data-api/api.json GET /erc20/{address}/top-gainers": {
    "cus": 50,
    "mainnetOnly": true
  },
  "/openapi-files/data-api/api.json GET /erc20/{address}/transfers": {
    "cus": 50
  },
  "/openapi-files/data-api/api.json GET /erc20/{tokenAddress}/holders": {
    "cus": 50,
    "mainnetOnly": true
  },
  "/openapi-files/data-api/api.json GET /erc20/{tokenAddress}/holders/historical": {
    "cus": 50
  },
  "/openapi-files/data-api/api.json GET /erc20/{token_address}/owners": {
    "cus": 50
  },
  "/openapi-files/data-api/api.json GET /erc20/{token_address}/pairs": {
    "cus": 50,
    "mainnetOnly": true
  },
  "/openapi-files/data-api/api.json GET /latestBlockNumber/{chain}": {
    "cus": 10
  },
  "/openapi-files/data-api/api.json GET /market-data/nfts/hottest-collections": {
    "cus": 200
  },
  "/openapi-files/data-api/api.json GET /market-data/nfts/top-collections": {
    "cus": 200
  },
  "/openapi-files/data-api/api.json GET /nft/{address}": {
    "cus": 50
  },
  "/openapi-files/data-api/api.json GET /nft/{address}/floor-price": {
    "cus": 30,
    "mainnetOnly": true
  },
  "/openapi-files/data-api/api.json GET /nft/{address}/floor-price/historical": {
    "cus": 50,
    "mainnetOnly": true
  },
  "/openapi-files/data-api/api.json GET /nft/{address}/metadata": {
    "cus": 50
  },
  "/openapi-files/data-api/api.json GET /nft/{address}/price": {
    "cus": 1,
    "mainnetOnly": true
  },
  "/openapi-files/data-api/api.json GET /nft/{address}/stats": {
    "cus": 50
  },
  "/openapi-files/data-api/api.json GET /nft/{address}/trades": {
    "cus": 40,
    "mainnetOnly": true
  },
  "/openapi-files/data-api/api.json GET /nft/{address}/traits": {
    "cus": 50
  },
  "/openapi-files/data-api/api.json GET /nft/{address}/traits/paginate": {
    "cus": 10
  },
  "/openapi-files/data-api/api.json GET /nft/{address}/traits/resync": {
    "cus": 10
  },
  "/openapi-files/data-api/api.json GET /nft/{address}/transfers": {
    "cus": 50
  },
  "/openapi-files/data-api/api.json GET /nft/{address}/unique-owners": {
    "cus": 50
  },
  "/openapi-files/data-api/api.json GET /nft/{address}/{token_id}": {
    "cus": 20,
    "mainnetOnly": true
  },
  "/openapi-files/data-api/api.json GET /nft/{address}/{token_id}/floor-price": {
    "cus": 30,
    "mainnetOnly": true
  },
  "/openapi-files/data-api/api.json GET /nft/{address}/{token_id}/metadata/resync": {
    "cus": 50
  },
  "/openapi-files/data-api/api.json GET /nft/{address}/{token_id}/owners": {
    "cus": 50
  },
  "/openapi-files/data-api/api.json GET /nft/{address}/{token_id}/price": {
    "cus": 30,
    "mainnetOnly": true
  },
  "/openapi-files/data-api/api.json GET /nft/{address}/{token_id}/trades": {
    "cus": 40,
    "mainnetOnly": true
  },
  "/openapi-files/data-api/api.json GET /nft/{address}/{token_id}/transfers": {
    "cus": 20
  },
  "/openapi-files/data-api/api.json GET /pairs/{address}/ohlcv": {
    "cus": 150,
    "mainnetOnly": true
  },
  "/openapi-files/data-api/api.json GET /pairs/{address}/snipers": {
    "cus": 50,
    "mainnetOnly": true
  },
  "/openapi-files/data-api/api.json GET /pairs/{address}/stats": {
    "cus": 100,
    "mainnetOnly": true
  },
  "/openapi-files/data-api/api.json GET /pairs/{address}/swaps": {
    "cus": 50,
    "mainnetOnly": true
  },
  "/openapi-files/data-api/api.json GET /resolve/ens/{domain}": {
    "cus": 10
  },
  "/openapi-files/data-api/api.json GET /resolve/{address}/reverse": {
    "cus": 10
  },
  "/openapi-files/data-api/api.json GET /tokens/categories": {
    "cus": 10
  },
  "/openapi-files/data-api/api.json GET /tokens/search": {
    "cus": 150,
    "mainnetOnly": true,
    "premium": true
  },
  "/openapi-files/data-api/api.json GET /tokens/trending": {
    "cus": 150,
    "premium": true
  },
  "/openapi-files/data-api/api.json GET /tokens/{tokenAddress}/analytics": {
    "cus": 80,
    "mainnetOnly": true
  },
  "/openapi-files/data-api/api.json GET /tokens/{tokenAddress}/score": {
    "cus": 100,
    "mainnetOnly": true,
    "premium": true
  },
  "/openapi-files/data-api/api.json GET /tokens/{tokenAddress}/score/historical": {
    "cus": 150,
    "mainnetOnly": true,
    "premium": true
  },
  "/openapi-files/data-api/api.json GET /transaction/{transaction_hash}": {
    "cus": 10
  },
  "/openapi-files/data-api/api.json GET /transaction/{transaction_hash}/verbose": {
    "cus": 20
  },
  "/openapi-files/data-api/api.json GET /volume/categories": {
    "cus": 150,
    "premium": true
  },
  "/openapi-files/data-api/api.json GET /volume/chains": {
    "cus": 150,
    "premium": true
  },
  "/openapi-files/data-api/api.json GET /volume/timeseries": {
    "cus": 150,
    "premium": true
  },
  "/openapi-files/data-api/api.json GET /volume/timeseries/{categoryId}": {
    "cus": 150,
    "premium": true
  },
  "/openapi-files/data-api/api.json GET /wallets/balances": {
    "cus": 10,
    "cusUnit": "wallet"
  },
  "/openapi-files/data-api/api.json GET /wallets/{address}/approvals": {
    "cus": 100
  },
  "/openapi-files/data-api/api.json GET /wallets/{address}/chains": {
    "cus": 50,
    "cusUnit": "chain"
  },
  "/openapi-files/data-api/api.json GET /wallets/{address}/defi/positions": {
    "cus": 50,
    "mainnetOnly": true
  },
  "/openapi-files/data-api/api.json GET /wallets/{address}/defi/summary": {
    "cus": 50,
    "mainnetOnly": true
  },
  "/openapi-files/data-api/api.json GET /wallets/{address}/defi/{protocol}/positions": {
    "cus": 15,
    "mainnetOnly": true
  },
  "/openapi-files/data-api/api.json GET /wallets/{address}/history": {
    "cus": 150,
    "mainnetOnly": true
  },
  "/openapi-files/data-api/api.json GET /wallets/{address}/insight": {
    "cus": 100,
    "cusUnit": "chain",
    "mainnetOnly": true
  },
  "/openapi-files/data-api/api.json GET /wallets/{address}/net-worth": {
    "cus": 250,
    "cusUnit": "chain",
    "mainnetOnly": true
  },
  "/openapi-files/data-api/api.json GET /wallets/{address}/nfts/trades": {
    "cus": 40,
    "mainnetOnly": true
  },
  "/openapi-files/data-api/api.json GET /wallets/{address}/profitability": {
    "cus": 50,
    "mainnetOnly": true
  },
  "/openapi-files/data-api/api.json GET /wallets/{address}/profitability/summary": {
    "cus": 30,
    "mainnetOnly": true
  },
  "/openapi-files/data-api/api.json GET /wallets/{address}/stats": {
    "cus": 50,
    "mainnetOnly": true
  },
  "/openapi-files/data-api/api.json GET /wallets/{address}/swaps": {
    "cus": 50,
    "mainnetOnly": true
  },
  "/openapi-files/data-api/api.json GET /wallets/{address}/tokens": {
    "cus": 100
  },
  "/openapi-files/data-api/api.json GET /{address}": {
    "cus": 30
  },
  "/openapi-files/data-api/api.json GET /{address}/balance": {
    "cus": 10
  },
  "/openapi-files/data-api/api.json GET /{address}/erc20": {
    "cus": 100
  },
  "/openapi-files/data-api/api.json GET /{address}/erc20/transfers": {
    "cus": 50
  },
  "/openapi-files/data-api/api.json GET /{address}/nft": {
    "cus": 50
  },
  "/openapi-files/data-api/api.json GET /{address}/nft/collections": {
    "cus": 50
  },
  "/openapi-files/data-api/api.json GET /{address}/nft/transfers": {
    "cus": 50
  },
  "/openapi-files/data-api/api.json GET /{address}/verbose": {
    "cus": 50
  },
  "/openapi-files/data-api/api.json POST /discovery/tokens": {
    "cus": 250,
    "mainnetOnly": true
  },
  "/openapi-files/data-api/api.json POST /erc20/prices": {
    "cus": 100,
    "mainnetOnly": true
  },
  "/openapi-files/data-api/api.json POST /nft/getMultipleNFTs": {
    "cus": 150
  },
  "/openapi-files/data-api/api.json POST /nft/metadata": {
    "cus": 5
  },
  "/openapi-files/data-api/api.json POST /nft/{address}/nfts-by-traits": {
    "cus": 50
  },
  "/openapi-files/data-api/api.json POST /tokens/analytics": {
    "cus": 150,
    "mainnetOnly": true,
    "premium": true
  },
  "/openapi-files/data-api/api.json POST /tokens/analytics/timeseries": {
    "cus": 200,
    "mainnetOnly": true,
    "premium": true
  },
  "/openapi-files/data-api/solana-api.json GET /account/{network}/{address}/balance": {
    "cus": 10
  },
  "/openapi-files/data-api/solana-api.json GET /account/{network}/{address}/nft": {
    "cus": 10
  },
  "/openapi-files/data-api/solana-api.json GET /account/{network}/{address}/portfolio": {
    "cus": 10
  },
  "/openapi-files/data-api/solana-api.json GET /account/{network}/{address}/swaps": {
    "cus": 50
  },
  "/openapi-files/data-api/solana-api.json GET /account/{network}/{address}/tokens": {
    "cus": 10
  },
  "/openapi-files/data-api/solana-api.json GET /nft/{network}/{address}/metadata": {
    "cus": 10
  },
  "/openapi-files/data-api/solana-api.json GET /token/{network}/exchange/{exchange}/bonding": {
    "cus": 50
  },
  "/openapi-files/data-api/solana-api.json GET /token/{network}/exchange/{exchange}/graduated": {
    "cus": 50
  },
  "/openapi-files/data-api/solana-api.json GET /token/{network}/exchange/{exchange}/new": {
    "cus": 50
  },
  "/openapi-files/data-api/solana-api.json GET /token/{network}/holders/{address}": {
    "cus": 50
  },
  "/openapi-files/data-api/solana-api.json GET /token/{network}/holders/{address}/historical": {
    "cus": 50
  },
  "/openapi-files/data-api/solana-api.json GET /token/{network}/pairs/{address}/ohlcv": {
    "cus": 150
  },
  "/openapi-files/data-api/solana-api.json GET /token/{network}/pairs/{pairAddress}/snipers": {
    "cus": 50
  },
  "/openapi-files/data-api/solana-api.json GET /token/{network}/pairs/{pairAddress}/stats": {
    "cus": 100
  },
  "/openapi-files/data-api/solana-api.json GET /token/{network}/pairs/{pairAddress}/swaps": {
    "cus": 50
  },
  "/openapi-files/data-api/solana-api.json GET /token/{network}/{address}/bonding-status": {
    "cus": 20
  },
  "/openapi-files/data-api/solana-api.json GET /token/{network}/{address}/metadata": {
    "cus": 10
  },
  "/openapi-files/data-api/solana-api.json GET /token/{network}/{address}/pairs": {
    "cus": 50
  },
  "/openapi-files/data-api/solana-api.json GET /token/{network}/{address}/price": {
    "cus": 10
  },
  "/openapi-files/data-api/solana-api.json GET /token/{network}/{address}/swaps": {
    "cus": 50
  },
  "/openapi-files/data-api/solana-api.json GET /token/{network}/{address}/top-holders": {
    "cus": 50
  },
  "/openapi-files/data-api/solana-api.json POST /token/{network}/metadata": {
    "cus": 100
  },
  "/openapi-files/data-api/solana-api.json POST /token/{network}/prices": {
    "cus": 100
  }
};
