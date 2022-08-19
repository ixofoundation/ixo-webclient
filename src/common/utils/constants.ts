export const SchemaGitUrl = process.env.REACT_APP_CONFIG_SCHEMA_URL
export const RelayersConfigUrl = process.env.REACT_APP_CONFIG_RELAYER_URL
export const AssetListConfigUrl =
  process.env.REACT_APP_CONFIG_ASSETLIST_URL ||
  'https://raw.githubusercontent.com/ixofoundation/ixo-webclient/dev/configs/testzone/asset-list.json'
