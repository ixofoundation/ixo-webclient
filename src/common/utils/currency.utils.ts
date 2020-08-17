import BigNumber from 'bignumber.js';

export const displayFiatAmount = (
  amount: BigNumber | number,
  fiatSymbol: string,
): string => {
  return `${fiatSymbol} ${amount
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};

export const displayTokenAmount = (amount: BigNumber | number): string => {
  const amountParts = amount.toFixed(3).split('.');
  const intAmountPart = amountParts[0];
  const decAmountPart = amountParts[1];

  return `${intAmountPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ',',
  )}.${decAmountPart}`;
};
