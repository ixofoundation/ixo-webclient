import { WalletType } from "@ixo-webclient/types";
import { useContext } from "react";
import { WalletContextType, WalletContext } from "contexts";
import { SignXWallet } from "impactsxmobile";
import { Keplr } from "keplr";

type UseWalletProps = WalletContextType & {
  connectWallet: (type: WalletType) => Promise<void>;
  disconnectWallet: () => void;
  execute: (data: any) => void;
};

const KeplrWallet = new Keplr();

export const useWallet = (): UseWalletProps => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }

  const connectWallet = async (type: WalletType): Promise<void> => {
    if (type === WalletType.Keplr) {
      const wallet = await KeplrWallet.connect();
      if (wallet) {
        context.setWallet(wallet);
      }
    }

    if (type === WalletType.ImpactXMobile) {
      const loginData = await context.signXWallet.init();
      context.setMobile({
        qr: JSON.stringify(loginData),
        timeout: Number(loginData.timeout),
      });
      const wallet: any = await context.signXWallet.connect();
      console.log("typeof pubKey, ", wallet.pubKey);
      if (wallet) {
        context.setWallet({
          ...wallet,
          publicKey: wallet.pubKey,
          wallet: { type: WalletType.ImpactXMobile },
        });
      }
    }
  };

  const execute = async (data: any) => {
    if (context?.wallet?.wallet?.type === WalletType.ImpactXMobile) {
      try {
        console.log("trying to execute on impacts x")
        context.setMobile((prevState) => ({ ...prevState, transacting: true }));

        const transactData = await context.signXWallet.initTransaction(data, context.wallet);

        context.setMobile({
          qr: JSON.stringify(transactData),
        });

        const transaction =
          await context.signXWallet.waitOnTransactionExecution();

        if (transaction) {
          context.setMobile((prevState) => ({
            ...prevState,
            transacting: false,
          }));
          return transaction;
        }
      } catch (error) {
        context.setMobile((prevState) => ({
          ...prevState,
          transacting: false,
        }));

        console.error({ error });
      }
    }
  };

  const disconnectWallet = (): void => {
    // Logic to disconnect the wallet
  };

  // Add other wallet-related methods here

  return { ...context, connectWallet, disconnectWallet, execute };
};
