import { ConnectedWallet } from "@ixo-webclient/types";
export interface IWalletConnector {
    connect: () => Promise<ConnectedWallet>;
    disconnect: () => Promise<void>;
}
