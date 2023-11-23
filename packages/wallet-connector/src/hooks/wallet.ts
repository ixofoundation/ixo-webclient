import { WalletType } from '@ixo-webclient/types';
import {  useContext } from 'react';

import { WalletContextType, WalletContext } from "contexts/WalletContext";
import { SignXWallet } from 'impactsxmobile';
import { Keplr } from 'keplr';

type UseWalletProps = WalletContextType & {
    connectWallet: (type: WalletType) => Promise<void>
    disconnectWallet: () => void
}

const KeplrWallet = new Keplr()
const signXWallet = new SignXWallet()

export const useWallet = (): UseWalletProps => {
    const context = useContext(WalletContext);
    if (context === undefined) {
      throw new Error('useWallet must be used within a WalletProvider');
    }
  
    const connectWallet = async (type: WalletType): Promise<void> => {
      let wallet
      // Logic to connect the wallet
      if(type === WalletType.Keplr){
         wallet = await KeplrWallet.connect()
      }

      if(type === WalletType.ImpactXMobile){
         wallet = await signXWallet.connect()
      }

      if(wallet){
        context.setWallet(wallet)
      }
    };
  
    const disconnectWallet = (): void => {
      // Logic to disconnect the wallet
    };
  
    // Add other wallet-related methods here
  
    return { ...context, connectWallet, disconnectWallet };
  };
  