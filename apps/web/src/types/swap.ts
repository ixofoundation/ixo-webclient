export type Pool = {
  token1155: string
  token2: string
}
type ObjectMap = {
  [key: string]: string
}

export class Dictionary {
  private map: ObjectMap = {}
  private hashFunction: (key: Pool) => string

  constructor(hashFunction: (key: Pool) => string) {
    this.hashFunction = hashFunction
  }

  set(key: Pool, item: string) {
    this.map[this.hashFunction(key)] = item
  }

  get(key: Pool) {
    return this.map[this.hashFunction(key)]
  }
}

export type Token = {
  type: TokenType
  address?: string
}

export enum TokenType {
  Cw1155,
  Cw20,
  Native,
  Token1155,
  token2,
}

export type TokenAmount = {
  [key in AmountType]?: string | ObjectMap
}
export enum AmountType {
  Single = 'single',
  Multiple = 'multiple',
}
export enum TokenSelect {
  Token1155 = 'token1155',
  Token2 = 'token2',
}
