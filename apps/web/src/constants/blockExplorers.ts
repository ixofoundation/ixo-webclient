const activeExplorer = process.env.REACT_APP_BLOCK_EXPLORER || "mintscan";

const blockExplorersAccounts = {
  mintscan: "https://www.mintscan.io/ixo/account/",
  atomscan: "https://atomscan.com/ixo/accounts/",
  pingpub: "https://ping.pub/ixo/account/",
} as const;

const blockExplorersTransactions = {
  mintscan: "https://www.mintscan.io/ixo/tx/",
  atomscan: "https://atomscan.com/ixo/transactions/",
  pingpub: "https://ping.pub/ixo/tx/",
} as const;

function getBlockExplorerAccountEndpoint(explorer: keyof typeof blockExplorersAccounts): string {
  const endpoint = blockExplorersAccounts[explorer];
  if (!endpoint) {
    throw new Error(`No account endpoint defined for explorer: ${explorer}`);
  }
  return endpoint;
}

function getBlockExplorerTransactionEndpoint(explorer: keyof typeof blockExplorersTransactions): string {
  const endpoint = blockExplorersTransactions[explorer];
  if (!endpoint) {
    throw new Error(`No transaction endpoint defined for explorer: ${explorer}`);
  }
  return endpoint;
}

export const blockExplorerAccountEndpoint = getBlockExplorerAccountEndpoint(activeExplorer as keyof typeof blockExplorersAccounts);
export const blockExplorerTransactionEndpoint = getBlockExplorerTransactionEndpoint(activeExplorer as keyof typeof blockExplorersTransactions);
