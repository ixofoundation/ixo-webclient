import { Dictionary, Pool, Token, TokenType } from 'types/swap'

export const tokens = new Map<string, Token>()
tokens.set('CARBON', {
  address: 'ixo1nc5tatafv6eyq7llkr2gv50ff9e22mnf70qgjlv737ktmt4eswrqvg5w3c',
  type: TokenType.Cw1155,
})

export const pools = new Dictionary((keyObject: Pool) => JSON.stringify(keyObject))
pools.set({ token1155: 'CARBON', token2: 'uixo' }, 'ixo17srjznxl9dvzdkpwpw24gg668wc73val88a6m5ajg6ankwvz9wtsek9x34')
