export enum ETokenType {
  IXO1155 = 'IXO1155',
  IXO721 = 'IXO721',
  CW721 = 'CW721',
  CW20 = 'CW20',
}

export enum TokenType {
  Native = 'native',
  Cw20 = 'cw20',
  Cw721 = 'cw721',
}

export type GenericToken = {
  type: TokenType
  denomOrAddress: string
  symbol: string
  decimals: number
  imageUrl: string | undefined
}
