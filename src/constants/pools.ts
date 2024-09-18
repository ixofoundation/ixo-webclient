import { Dictionary, Pool, Token, TokenType } from 'types/swap'

export const tokens = new Map<string, Token>()
tokens.set('CARBON', {
  address: 'ixo1nc5tatafv6eyq7llkr2gv50ff9e22mnf70qgjlv737ktmt4eswrqvg5w3c',
  type: TokenType.Cw1155,
})

export const pools = new Dictionary((keyObject: Pool) => JSON.stringify(keyObject))
pools.set({ token1155: 'CARBON', token2: 'uixo' }, 'ixo1p5nwq2ut6344qwlvjv42ayqhvarl46lnqfmnrgjnh2cwahl54g2qpg4y8y')
