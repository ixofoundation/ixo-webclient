import { ChainInfo, ConnectedWallet, Wallet, WalletClient } from "@ixo-webclient/types";
export declare const getConnectedWalletInfo: (wallet: Wallet, client: WalletClient, chainInfo: ChainInfo) => Promise<ConnectedWallet>;
