import * as SUT from './web3.reducer';
import * as fromActions from './web3.actions';
import { Web3State } from './types';

const { initialState } = SUT;

let windowSpy;

beforeEach(() => {
  windowSpy = jest.spyOn(global, 'window' as any, 'get');
});

afterEach(() => {
  windowSpy.mockRestore();
});

describe('Web3 Reducer', () => {
  it('should return the same state if an action is called on it which is not handled by the reducer', () => {
    // given .. we have an action the reducer does not handle
    const action: any = 'foo';

    // when ... we run the reducer with this action
    const result = SUT.reducer(initialState, action);

    // then ... the state that was passed into the function should be returned
    expect(result).toEqual(initialState);
  });

  describe('ConnectWeb3 Action', () => {
    it('should return a new copy of state, with the web3 result set', () => {
      windowSpy.mockImplementation(() => ({
        web3: { something: 'something' },
      }));

      // given ... we have some mock state
      const mockState: Web3State = {
        web3: { something: 'something' },
        error: {},
      };

      // ... we create a connectWeb3 action
      const action = fromActions.connectWeb3();

      // when ... we run the reducer and pass it our initial state and this action
      const state = SUT.reducer(initialState, action);

      // then the state should be set as expected
      expect(state).toEqual(mockState);
    });
  });

  describe('ResetWeb3Connection Action', () => {
    it('should return the initial state', () => {
      // given ... we have some mock state
      const mockState: Web3State = {
        web3: { something: 'something' },
        error: { error: 'Some error occurred' },
      };

      // ... we create a resetWeb3Connection action
      const action = fromActions.resetWeb3Connection();

      // when ... we run the reducer and pass it our mockState state and this action
      const state = SUT.reducer(mockState, action);

      // then the state should be reset
      expect(state).toEqual(initialState);
    });
  });
});
