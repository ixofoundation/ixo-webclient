import { WalletType } from "@ixo-webclient/types";
import { useContext } from "react";
import { WalletContextType, WalletContext, Wallet } from "contexts";
import { DeliverTxResponse } from "@cosmjs/stargate";
import { StdFee } from "@ixo/impactxclient-sdk/node_modules/@cosmjs/amino";

type ExecuteProps = {
  data: MessageProps
  transactionConfig: {
    sequence: number
    transactionSessionHash?: string
  }
};

type MessageProps = {
  messages: {
    typeUrl: string;
    value: any;
  }[];
  fee: StdFee;
  memo: string | undefined;
}

type UseWalletProps = WalletContextType & {
  connectWallet: (type: WalletType) => Promise<void>;
  disconnectWallet: () => void;
  execute: (transaction: ExecuteProps) => Promise<DeliverTxResponse | string>;
  setWallet: (wallet: Wallet | null) => void
};

export const useWallet = (): UseWalletProps => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }

  const connectWallet = async (type: WalletType): Promise<void> => {
    if (type === WalletType.ImpactXMobile) {
      try {
        const loginData = await context.signXWallet.init();
        console.log({ loginData });
        context.setMobile({
          qr: JSON.stringify(loginData),
          timeout: Number(new Date(loginData.timeout).getTime()),
        });
        const wallet: any = await context.signXWallet.connect();
        console.log("typeof pubKey, ", wallet.pubKey);
        if (wallet) {
          context.setWallet({
            ...wallet,
            publicKey: wallet.pubKey,
            wallet: { type: WalletType.ImpactXMobile },
          });
          context.close()
        }
      } catch (error) {
        // TODO: send to logger
        console.log({ error });
      }
    }
  };

  const execute = async ({
    data,
    transactionConfig
  }: ExecuteProps) => {
    const { messages, fee } = data;
    context.setMobile((prevState) => ({ ...prevState, transacting: true }));

    const transactData = await context.signXWallet.initTransaction(
      transactionConfig.sequence,
      messages,
      context.wallet as any
    );

    context.setMobile((prevState) => ({
      ...prevState,
      qr: JSON.stringify(transactData.data),
      timeout: transactData.timeout,
    }));

    context.setTransaction({ transactionSessionHash: transactData.data.sessionHash, sequence: transactionConfig.sequence })
    console.log({ transactionSessionHash: transactData.data.sessionHash, sequence: transactionConfig.sequence })

    if (transactionConfig.sequence === 1) {
      context.open();
    }

    if (transactionConfig.sequence > 1) {
      context.signXWallet.pollNextTransaction()
    }

    const transaction =
      await context.signXWallet.waitOnTransactionExecution();


    return transaction as DeliverTxResponse;
  };

  const disconnectWallet = (): void => {
    context.setWallet(null)
  };

  // Add other wallet-related methods here

  return { ...context, connectWallet, disconnectWallet, execute };
};
