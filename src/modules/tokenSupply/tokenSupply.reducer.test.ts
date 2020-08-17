import * as SUT from './tokenSupply.reducer';
import { TokenSupplyActions, GetTotalSupplySuccessAction } from './types';

const { initialState } = SUT;

describe('TokenSupply Reducer', () => {
  it('should return the same state if an action is called on it which is not handled by the reducer', () => {
    // given .. we have an action the reducer does not handle
    const action: any = 'foo';

    // when ... we run the reducer with this action
    const result = SUT.reducer(initialState, action);

    // then ... the state that was passed into the function should be returned
    expect(result).toEqual(initialState);
  });

  describe('GetTotalSupplySuccess Action', () => {
    it('should return a new copy of state, with the totalSupply set', () => {
      const tokenSupply = [
        { amount: 100, denom: 'abc' },
        { amount: 200, denom: 'def' },
        { amount: 300, denom: 'def' },
      ];
      // ... we create a getBalances action
      const action: GetTotalSupplySuccessAction = {
        type: TokenSupplyActions.GetTotalSupplySuccess,
        payload: {
          tokenSupply,
        },
      };

      // when ... we run the reducer and pass it our initial state and this action
      const state = SUT.reducer(initialState, action);

      // then the state should be set as expected
      expect(state).toEqual(tokenSupply);
    });
  });
});
