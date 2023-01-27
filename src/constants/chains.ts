export const SchemaGitUrl = process.env.REACT_APP_CONFIG_SCHEMA_URL
export const RelayersConfigUrl = process.env.REACT_APP_CONFIG_RELAYER_URL
export const AssetListConfigUrl = process.env.REACT_APP_CONFIG_ASSETLIST_URL
export const ExchangeConfigUrl = process.env.REACT_APP_CONFIG_EXCHANGE_URL

export const CHAINS = {
  'pandora-7': {
    chainId: 'pandora-7',
    chainName: 'ixo Testnet',
    rpc: 'https://testnet.ixo.earth/rpc/',
    rest: 'https://testnet.ixo.earth/rest/',
    bip44: {
      coinType: 118,
    },
    bech32Config: {
      bech32PrefixAccAddr: 'ixo',
      bech32PrefixAccPub: 'ixopub',
      bech32PrefixValAddr: 'ixovaloper',
      bech32PrefixValPub: 'ixovaloperpub',
      bech32PrefixConsAddr: 'ixovalcons',
      bech32PrefixConsPub: 'ixovalconspub',
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
    features: ['stargate'],
  },
  'ixo-4': {
    chainId: 'ixo-4',
    chainName: 'Impact Hub',
    rpc: 'https://impacthub.ixo.world/rpc/',
    rest: 'https://impacthub.ixo.world/rest/',
    bip44: {
      coinType: 118,
    },
    bech32Config: {
      bech32PrefixAccAddr: 'ixo',
      bech32PrefixAccPub: 'ixopub',
      bech32PrefixValAddr: 'ixovaloper',
      bech32PrefixValPub: 'ixovaloperpub',
      bech32PrefixConsAddr: 'ixovalcons',
      bech32PrefixConsPub: 'ixovalconspub',
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
    features: ['stargate'],
  },
  'devnet-1': {
    chainId: 'devnet-1',
    chainName: 'IXO Devnet',
    rpc: 'https://devnet.ixo.earth/rpc/',
    rest: 'https://devnet.ixo.earth/rest/',
    bip44: {
      coinType: 118,
    },
    bech32Config: {
      bech32PrefixAccAddr: 'ixo',
      bech32PrefixAccPub: 'ixopub',
      bech32PrefixValAddr: 'ixovaloper',
      bech32PrefixValPub: 'ixovaloperpub',
      bech32PrefixConsAddr: 'ixovalcons',
      bech32PrefixConsPub: 'ixovalconspub',
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
    features: ['stargate'],
  },
}
