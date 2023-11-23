import { ReactNode } from "react";
interface Wallet {
}
interface WalletContextType {
    wallet: Wallet | null;
    setWallet: (wallet: Wallet | null) => void;
    opened: boolean;
    open: () => void;
    close: () => void;
}
interface WalletProviderProps {
    children: ReactNode;
}
export declare const WalletContext: import("react").Context<WalletContextType | undefined>;
export declare const WalletProvider: ({ children }: WalletProviderProps) => import("react/jsx-runtime").JSX.Element;
export { Wallet, WalletContextType, WalletProviderProps };
