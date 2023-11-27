import { useDisclosure } from '@mantine/hooks';
import { SignXEndpoints, SignXWallet } from 'impactsxmobile';
import { createContext, useState, ReactNode, useMemo, SetStateAction } from "react";

interface Wallet {
  [key: string]: any
}

interface WalletContextType {
  wallet: Wallet | null;
  setWallet: (wallet: Wallet | null) => void;
  opened: boolean
  open: () => void
  close: () => void
  mobile: MobileStateProps
  setMobile: React.Dispatch<SetStateAction<MobileStateProps>>
  signXWallet: SignXWallet
  CustomComponent: ReactNode
}

interface WalletProviderProps {
  children: ReactNode;
  chainNetwork: string
  customComponent: ReactNode
}

export const WalletContext = createContext<WalletContextType | undefined>(
  undefined
);

type MobileStateProps = {
  qr: null | string
  timeout?: number
  transacting?: boolean
}

let signXWallet: SignXWallet

export const WalletProvider = ({ children, chainNetwork, customComponent }: WalletProviderProps) => {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [mobile, setMobile] = useState<MobileStateProps>({ qr: null, timeout: 0});

  // Add methods to handle wallet connection, disconnection, etc.

  if(chainNetwork && !signXWallet){
    console.log("initialise sign x", chainNetwork)
    signXWallet = new SignXWallet(chainNetwork as keyof typeof SignXEndpoints)
    setMobile(prevState => ({...prevState, timeout: signXWallet.timeout}))
  }

  const providerValue = useMemo(
    () => ({ wallet, setWallet, opened, open, close, mobile, setMobile, signXWallet, CustomComponent: customComponent }),
    [wallet, setWallet, opened, open, close, setMobile, mobile, signXWallet, customComponent]
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