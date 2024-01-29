import { getKeplrChainInfo } from "@ixo/cosmos-chain-resolver";
import { IWalletConnector } from "../interfaces/walletConnector";
import { KeplrExtensionWallet, chainNetwork } from "../constants";
import { ChainInfo } from "@ixo-webclient/types";
import { getConnectedWalletInfo } from "utils";

export class Keplr implements IWalletConnector {
    async connect() {
      const chainInfo = await getKeplrChainInfo('impacthub', chainNetwork)
      chainInfo.rest = process.env.REACT_APP_GAIA_URL ?? chainInfo.rest
      const wallet = KeplrExtensionWallet
      const walletClient = await wallet.getClient(chainInfo as ChainInfo)
      if (!walletClient) {
        throw new Error('Failed to retrieve wallet client.')
      }
      const connectedWallet = await getConnectedWalletInfo(wallet, walletClient, chainInfo as ChainInfo)
      return connectedWallet
    }
  
    async disconnect() {
      // Logic to disconnect from Leap wallet
    }
  }