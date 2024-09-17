import { ConnectedWallet } from "@ixo-webclient/types";

export interface IWalletConnector {
    connect: () => Promise<ConnectedWallet>;     // Method to connect to the wallet
    disconnect: () => Promise<void>;  // Method to disconnect from the wallet
  }
  