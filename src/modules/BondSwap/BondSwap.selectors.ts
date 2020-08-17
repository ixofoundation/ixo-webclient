import { createSelector } from 'reselect';
import { RootState } from 'common/redux/types';
import { Currency } from 'types/models';
import { BondSwapState } from './types';

export const selectBondSwap = (state: RootState): BondSwapState =>
  state.bondSwap;

export const selectBondSwapTotalFee = createSelector(
  selectBondSwap,
  (bondSwap: BondSwapState): Currency => bondSwap.totalFee,
);

export const selectBondSwapReceiving = createSelector(
  selectBondSwap,
  (bondSwap: BondSwapState): Currency => bondSwap.receiving,
);

export const selectBondSwapSending = createSelector(
  selectBondSwap,
  (bondSwap: BondSwapState): Currency => bondSwap.sending,
);

export const selectBondSwapSignPending = createSelector(
  selectBondSwap,
  (bondSwap: BondSwapState): boolean => bondSwap.signPending,
);

export const selectBondSwapQuotePending = createSelector(
  selectBondSwap,
  (bondSwap: BondSwapState): boolean => bondSwap.quotePending,
);

export const selectBondSwapTransacting = createSelector(
  selectBondSwap,
  (bondSwap: BondSwapState): boolean => bondSwap.transacting,
);

export const selectBondSwapIsSending = createSelector(
  selectBondSwap,
  (bondSwap: BondSwapState): boolean => !!bondSwap.sending,
);

export const selectBondSwapPriceEstimate = createSelector(
  selectBondSwapReceiving,
  selectBondSwapSending,
  (receiving: Currency, sending: Currency) => ({
    amount: receiving.amount / sending.amount,
    denom: receiving.denom,
  }),
);
