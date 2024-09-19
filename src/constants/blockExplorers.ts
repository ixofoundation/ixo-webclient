import { ChainNetwork } from "@ixo/impactxclient-sdk/types/custom_queries/chain.types";
import { chainNetwork } from "wallet-connector/constants";

const activeExplorer = process.env.NEXT_PUBLIC_BLOCK_EXPLORER || "mintscan";

const blockExplorersAccounts = {
  mintscan: "https://www.mintscan.io/ixo/account/",
  atomscan: "https://atomscan.com/ixo/accounts/",
  pingpub: "https://ping.pub/ixo/account/",
} as const;


const mintScan: Record<ChainNetwork, string> = {
  mainnet: 'https://ezstaking.app/impacthub/txs/',
  testnet: 'https://explorer.ixo.earth/testnet-ixo/tx',
  devnet: 'https://explorer.ixo.earth/devnet-ixo/tx',
}

const blockExplorersTransactions = {
  mintscan: mintScan[chainNetwork],
  atomscan: 'https://atomscan.com/ixo/transactions/',
  pingpub: 'https://ping.pub/ixo/tx/',
} as const

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
