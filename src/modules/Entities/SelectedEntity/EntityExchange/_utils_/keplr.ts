import { SigningCosmosClient } from '@cosmjs/launchpad'

declare const window: any

const addTestnet = async (): Promise<any> => {
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
  })
}

const enableChain = async (chainId: string): Promise<any> => {
  await window.keplr.enable(chainId)
}

export const sign = async (): Promise<any> => {
  const isInstalled = window.keplr

  if (!isInstalled) {
    return {
      isInstalled,
    }
  }

  await addTestnet()
  await addMainNet()

  const chainId = 'pandora-4'
  await enableChain(chainId)
  await enableChain('impacthub-3')

  const offlineSigner = window.getOfflineSigner(chainId)
  const accounts = await offlineSigner.getAccounts()

  // Initialize the gaia api with the offline signer that is injected by Keplr extension.
  const cosmJS = new SigningCosmosClient(
    'https://lcd-cosmoshub.keplr.app',
    accounts[0].address,
    offlineSigner,
  )

  return {
    isInstalled,
    cosmJS,
  }
}
