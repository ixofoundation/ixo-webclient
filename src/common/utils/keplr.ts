import { assertIsBroadcastTxSuccess, SigningStargateClient } from "@cosmjs/stargate";

// import { MsgDelegate } from "@cosmjs/launchpad";
import { TxRaw } from "cosmjs-types/cosmos/tx/v1beta1/tx";
import { Registry } from "@cosmjs/proto-signing";
import { MsgDelegate } from "cosmjs-types/cosmos/staking/v1beta1/tx";
import { MsgVote } from 'cosmjs-types/cosmos/gov/v1beta1/tx';
import { MsgSend } from 'cosmjs-types/cosmos/bank/v1beta1/tx';
import { MsgDeposit } from 'cosmjs-types/cosmos/gov/v1beta1/tx';
import { MsgWithdrawDelegatorReward, MsgSetWithdrawAddress } from 'cosmjs-types/cosmos/distribution/v1beta1/tx'

declare const window: any

const addTestNet = async (): Promise<any> => {
  await window.keplr.experimentalSuggestChain({
    chainId: 'pandora-4',
    chainName: 'ixo Testnet',
    rpc: 'https://testnet.ixo.world/rpc/',
    rest: 'https://testnet.ixo.world/rest/',
    bip44: {
      coinType: 118,
    },
    bech32Config: {
      bech32PrefixAccAddr: 'ixo',
      bech32PrefixAccPub: 'ixo' + 'pub',
      bech32PrefixValAddr: 'ixo' + 'valoper',
      bech32PrefixValPub: 'ixo' + 'valoperpub',
      bech32PrefixConsAddr: 'ixo' + 'valcons',
      bech32PrefixConsPub: 'ixo' + 'valconspub',
    },
    currencies: [
      {
        coinDenom: 'IXO',
        coinMinimalDenom: 'uixo',
        coinDecimals: 6,
        coinGeckoId: 'ixo',
      },
    ],
    feeCurrencies: [
      {
        coinDenom: 'IXO',
        coinMinimalDenom: 'uixo',
        coinDecimals: 6,
        coinGeckoId: 'ixo',
      },
    ],
    stakeCurrency: {
      coinDenom: 'IXO',
      coinMinimalDenom: 'uixo',
      coinDecimals: 6,
      coinGeckoId: 'ixo',
    },
    coinType: 118,
    gasPriceStep: {
      low: 0.01,
      average: 0.025,
      high: 0.03,
    },
    features: ["stargate"],
  })
}
const addMainNet = async (): Promise<any> => {
  await window.keplr.experimentalSuggestChain({
    chainId: 'impacthub-3',
    chainName: 'Impact Hub',
    rpc: 'https://impacthub.ixo.world/rpc/',
    rest: 'https://impacthub.ixo.world/rest/',
    bip44: {
      coinType: 118,
    },
    bech32Config: {
      bech32PrefixAccAddr: 'ixo',
      bech32PrefixAccPub: 'ixo' + 'pub',
      bech32PrefixValAddr: 'ixo' + 'valoper',
      bech32PrefixValPub: 'ixo' + 'valoperpub',
      bech32PrefixConsAddr: 'ixo' + 'valcons',
      bech32PrefixConsPub: 'ixo' + 'valconspub',
    },
    currencies: [
      {
        coinDenom: 'IXO',
        coinMinimalDenom: 'uixo',
        coinDecimals: 6,
        coinGeckoId: 'ixo',
      },
    ],
    feeCurrencies: [
      {
        coinDenom: 'IXO',
        coinMinimalDenom: 'uixo',
        coinDecimals: 6,
        coinGeckoId: 'ixo',
      },
    ],
    stakeCurrency: {
      coinDenom: 'IXO',
      coinMinimalDenom: 'uixo',
      coinDecimals: 6,
      coinGeckoId: 'ixo',
    },
    coinType: 118,
    gasPriceStep: {
      low: 0.01,
      average: 0.025,
      high: 0.03,
    },
    features: ["stargate"],
  })
}

// TODO: Move inside .env files
export const chainConfig = {
  id: process.env.REACT_APP_CHAIN_ID,
  rpc: process.env.REACT_APP_GAIA_URL + '/rpc/',
  lcd: process.env.REACT_APP_GAIA_URL + '/rest',
};

export const checkExtensionAndBrowser = (): boolean => {
  if (typeof window !== `undefined`) {
    if (
      window.getOfflineSigner &&
      window.keplr &&
      window.keplr.experimentalSuggestChain
    ) {
      return true;
    } else {
      console.log("Keplr undefined", window);
    }
  } else {
    console.log("Window is undefined :|", window);
  }
  return false;
};

export const initStargateClient = async (offlineSigner): Promise<SigningStargateClient> => {
  // Initialize the cosmic casino api with the offline signer that is injected by Keplr extension.
  const registry = new Registry();

  registry.register("/cosmos.staking.v1beta1.MsgDelegate", MsgDelegate);
  registry.register("/cosmos.gov.v1beta1.MsgVote", MsgVote);
  registry.register("/cosmos.bank.v1beta1.MsgSend", MsgSend);
  registry.register("/cosmos.gov.v1beta1.MsgDeposit", MsgDeposit);
  registry.register("/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward", MsgWithdrawDelegatorReward);
  registry.register("/cosmos.distribution.v1beta1.MsgSetWithdrawAddress", MsgSetWithdrawAddress);
  
  const options = { registry: registry };

  const cosmJS: SigningStargateClient = await SigningStargateClient.connectWithSigner(
    chainConfig.rpc,
    offlineSigner,
    options
  );

  return cosmJS;
};

export const connectAccount = async () => {
  if (!checkExtensionAndBrowser()) {
    return [null, null]
  }

  // Suggest chain if we don't have
  await addTestNet();
  await addMainNet();

  // Enable chain
  await window.keplr.enable(chainConfig.id);

  // Setup signer
  const offlineSigner = window.getOfflineSigner(chainConfig.id);
  const accounts = await offlineSigner.getAccounts(); // only one account currently supported by keplr

  return [accounts, offlineSigner];
};

export const sendTransaction = async (client, delegatorAddress, payload) => {
  try {
    const signed = await client.sign(delegatorAddress, [payload.msgAny], payload.fee, payload.memo);
    const result = await client.broadcastTx(Uint8Array.from(TxRaw.encode(signed).finish()));
    assertIsBroadcastTxSuccess(result);
    return result;
  } catch (e) {
    console.log('sendTransaction', e);
    throw e;
  }
}

export const getKeplr = async() => {
  if (window.keplr) {
      return window.keplr;
  }

  if (document.readyState === "complete") {
      return window.keplr;
  }

  return new Promise((resolve) => {
    const documentStateChange = (event: Event) => {
      if (
          event.target &&
          (event.target as Document).readyState === "complete"
      ) {
          resolve(window.keplr);
          document.removeEventListener("readystatechange", documentStateChange);
      }
    };

    document.addEventListener("readystatechange", documentStateChange);
  });
}

window.addEventListener("keplr_keystorechange", () => {
  console.log("Key store in Keplr is changed. You may need to refetch the account info.")
})
