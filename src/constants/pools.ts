import { Dictionary, Pool, Token, TokenType } from 'types/swap'

export const tokens = new Map<string, Token>()
// Example
// tokens.set('USDT', { address: 'ixo15d2tyq2jzxmpg32y3am3w62dts32qgzmds9qnr6c87r0gwwr7ynq28958z', type: TokenType.Cw20 });
// tokens.set('CARBON', {
//   address: 'ixo15d2tyq2jzxmpg32y3am3w62dts32qgzmds9qnr6c87r0gwwr7ynq28958z',
//   type: TokenType.Cw1155,
// });
// tokens.set('uixo', { type: TokenType.Native });

export const pools = new Dictionary((keyObject: Pool) => JSON.stringify(keyObject))
// Example
// pools.set({ token1155: 'CARBON', token2: 'USDT' }, 'ixo15d2tyq2jzxmpg32y3am3w62dts32qgzmds9qnr6c87r0gwwr7ynq28958z');
// pools.set({ token1155: 'CARBON', token2: 'uixo' }, 'ixo15d2tyq2jzxmpg32y3am3w62dts32qgzmds9qnr6c87r0gwwr7ynq28958z');
