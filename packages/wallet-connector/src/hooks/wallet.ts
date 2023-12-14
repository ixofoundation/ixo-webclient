import { WalletType } from "@ixo-webclient/types";
import { useContext } from "react";
import { WalletContextType, WalletContext } from "contexts";
import { createSigningClient } from "@ixo/impactxclient-sdk";
import { DeliverTxResponse } from "@cosmjs/stargate";
import { StdFee } from "@ixo/impactxclient-sdk/node_modules/@cosmjs/amino";
import { Keplr } from "keplr";
import { CHAIN_ID } from "@constants";
import * as store from "store";

type ExecuteProps = {
  messages: any[];
  fee: StdFee | undefined;
};

type UseWalletProps = WalletContextType & {
  connectWallet: (type: WalletType) => Promise<void>;
  disconnectWallet: () => void;
  execute: (data: ExecuteProps) => Promise<DeliverTxResponse | string>;
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
      }
    }
  };

  const execute = async (
    data: ExecuteProps
  ): Promise<DeliverTxResponse | string> => {
    const { messages, fee } = data;
    if (context?.wallet?.wallet?.type === WalletType.ImpactXMobile) {
      try {
        context.setMobile((prevState) => ({ ...prevState, transacting: true }));

        const transactData = await context.signXWallet.initTransaction(
          messages,
          context.wallet
        );

        context.setMobile((prevState) => ({
          ...prevState,
          qr: JSON.stringify(transactData.data),
          timeout: transactData.timeout,
        }));

        context.open();

        const transaction =
          await context.signXWallet.waitOnTransactionExecution();

        if (transaction) {
          context.setMobile((prevState) => ({
            ...prevState,
            transacting: false,
          }));
          context.close();
          return transaction as DeliverTxResponse;
        }
      } catch (error) {
        context.setMobile((prevState) => ({
          ...prevState,
          transacting: false,
        }));

        console.error({ error });
      }
    }
    if (context?.wallet?.wallet?.type === WalletType.Keplr) {
      try {
        console.log("keplr wallet running");
        const offlineSigner = (window as any).getOfflineSigner(CHAIN_ID);
        console.log("offline signer", offlineSigner);

        return await createSigningClient(
          context.rpcEndpoint,
          offlineSigner,
          false,
          {},
          {
            getLocalData: (k) => store.get(k),
            setLocalData: (k, d) => store.set(k, d),
          }
        ).then((client) => {
          console.log("client", client);

          console.log(context?.wallet?.address, data, data?.fee);

          return client.signAndBroadcast(
            context?.wallet?.address,
            messages as any,
            fee ?? {
              amount: [
                {
                  denom: "uixo",
                  amount: "100000",
                },
              ],
              gas: "3000000",
            }
          ) as unknown as DeliverTxResponse;
        });
      } catch (error) {
        console.error({ error });
      }
    }
    return String("Wallet not found");
  };

  const disconnectWallet = (): void => {
    // Logic to disconnect the wallet
  };

  // Add other wallet-related methods here

  return { ...context, connectWallet, disconnectWallet, execute };
};
