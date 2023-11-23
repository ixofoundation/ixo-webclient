import { IWalletConnector } from "../interfaces/walletConnector";
export declare class Keplr implements IWalletConnector {
    connect(): Promise<import("@ixo-webclient/types").ConnectedWallet>;
    disconnect(): Promise<void>;
}
