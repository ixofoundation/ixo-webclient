import { useDisclosure } from '@mantine/hooks';
import { createContext, useState, ReactNode, useMemo } from "react";

interface Wallet {
  // Define the structure of your wallet object here
}

interface WalletContextType {
  wallet: Wallet | null;
  setWallet: (wallet: Wallet | null) => void;
  opened: boolean
  open: () => void
  close: () => void
}

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletContext = createContext<WalletContextType | undefined>(
  undefined
);

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [opened, { open, close }] = useDisclosure(false);

  // Add methods to handle wallet connection, disconnection, etc.

  const providerValue = useMemo(
    () => ({ wallet, setWallet, opened, open, close }),
    [wallet, setWallet, opened, open, close]
  );

  return (
    <WalletContext.Provider value={providerValue}>
      {children}
    </WalletContext.Provider>
  );
};

export {
  Wallet,
  WalletContextType, 
  WalletProviderProps
}