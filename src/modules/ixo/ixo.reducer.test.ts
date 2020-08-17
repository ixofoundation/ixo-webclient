import { Ixo } from '@ixo/ixo-apimodule';
import * as SUT from './ixo.reducer';
import * as fromActions from './ixo.actions';
import { IxoState } from './types';

const { initialState } = SUT;

describe('Ixo Reducer', () => {
  it('should return the same state if an action is called on it which is not handled by the reducer', () => {
    // given .. we have an action the reducer does not handle
    const action: any = 'foo';

    // when ... we run the reducer with this action
    const result = SUT.reducer(initialState, action);

    // then ... the state that was passed into the function should be returned
    expect(result).toEqual(initialState);
  });

  describe('InitUserInfo Action', () => {
    it('should return a new copy of state, with the ixo result set', () => {
      // given ... we have some mock state
      const mockState: IxoState = {
        ixo: new Ixo('some-url'),
      };

      // ... we create a initIxo action
      const action = fromActions.initIxo('some-url');

      // when ... we run the reducer and pass it our initial state and this action
      const state = SUT.reducer(initialState, action);

      // then the state should be set as expected
      expect(JSON.stringify(state)).toEqual(JSON.stringify(mockState));
    });
  });

  describe('ResetUserInfo Action', () => {
    it('should return the initial state', () => {
      // given ... we have some mock state
      const mockState: IxoState = {
        ixo: new Ixo('some-url'),
      };

      // ... we create a resetIxo action
      const action = fromActions.resetIxo();

      // when ... we run the reducer and pass it our mockState state and this action
      const state = SUT.reducer(mockState, action);

      // then the state should be reset
      expect(state).toEqual(initialState);
    });
  });
});
