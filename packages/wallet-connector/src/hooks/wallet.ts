import { WalletType } from "@ixo-webclient/types";
import { useContext } from "react";
import { WalletContextType, WalletContext, Wallet } from "contexts";
import { DeliverTxResponse } from "@cosmjs/stargate";
import { StdFee } from "@ixo/impactxclient-sdk/node_modules/@cosmjs/amino";

type ExecuteProps = {
  data: MessageProps;
  transactionConfig?: {
    sequence: number;
    transactionSessionHash?: string;
  };
};

type MessageProps = {
  messages: {
    typeUrl: string;
    value: any;
  }[];
  fee: StdFee;
  memo: string | undefined;
};

type UseWalletProps = WalletContextType & {
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  execute: (transaction: ExecuteProps) => Promise<DeliverTxResponse>;
  executeTxBody: ({ txBody }: { txBody: Uint8Array }) => Promise<DeliverTxResponse>;
  setWallet: (wallet: Wallet | null) => void
};

export const useWallet = (): UseWalletProps => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }

  const connectWallet = async (): Promise<void> => {
    context.open();
    const loginData = await context.signXWallet.init();

    context.setMobile({
      timeout: Number(new Date(loginData.timeout).getTime()),
      data: loginData,
    });
    const wallet: any = await context.signXWallet.connect();

    if (wallet) {
      context.setWallet({
        ...wallet,
        publicKey: wallet.pubKey,
        wallet: { type: WalletType.ImpactXMobile },
      });
      context.close();
    }
  };

  const executeTxBody = async ({ txBody }: { txBody: Uint8Array }) => {
    const transactData = await context.signXWallet.initTransaction(
      1,
      txBody,
      context.wallet as any
    );

    context.setMobile((prevState) => ({
      ...prevState,
      data: transactData.data,
      timeout: transactData.timeout,
    }));

    if (context.signXWallet.getSequenceNumber() > 1) {
      context.setMobile((prevState) => ({
        ...prevState,
        data: { ...prevState.data, type: "SIGN_X_TRANSACT_SESSION" },
      }));
      context.signXWallet.pollNextTransaction();
    }

    context.open();

    const transaction = await context.signXWallet.waitOnTransactionExecution();

    return transaction as DeliverTxResponse;
  };

  const execute = async ({ data, transactionConfig }: ExecuteProps) => {
    const transactData = await context.signXWallet.initTransaction(
      1,
      data.messages,
      context.wallet as any
    );

    context.setMobile((prevState) => ({
      ...prevState,
      data: transactData.data,
      timeout: transactData.timeout,
    }));

    if (context.signXWallet.getSequenceNumber() > 1) {
      context.setMobile((prevState) => ({
        ...prevState,
        data: { ...prevState.data, type: "SIGN_X_TRANSACT_SESSION" },
      }));
      context.signXWallet.pollNextTransaction();
    }

    context.open();

    const transaction = await context.signXWallet.waitOnTransactionExecution();

    return transaction as DeliverTxResponse;
  };

  const disconnectWallet = (): void => {
    context.setWallet(null);
  };

  // Add other wallet-related methods here

  return {
    ...context,
    connectWallet,
    disconnectWallet,
    execute,
    executeTxBody,
  };
};
