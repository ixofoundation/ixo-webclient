import { WalletType } from '@ixo-webclient/types';
import { WalletContextType } from "../contexts/WalletContext";
type UseWalletProps = WalletContextType & {
    connectWallet: (type: WalletType) => Promise<void>;
    disconnectWallet: () => void;
};
export declare const useWallet: () => UseWalletProps;
export {};
