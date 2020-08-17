import * as SUT from './keysafe.actions';
import { KeysafeActions } from './types';

let windowSpy;

beforeEach(() => {
  windowSpy = jest.spyOn(global, 'window' as any, 'get');
});

afterEach(() => {
  windowSpy.mockRestore();
});

describe('Keysafe Actions', () => {
  describe('initKeysafe', () => {
    it('should return an action of type KeysafeActions.InitKeysafe and an error if keysafe is not installed', () => {
      // when ... we call the initKeysafe action creator
      const action = SUT.initKeysafe();

      // then we should expect it to create an action with the correct type
      expect(action.type).toEqual(KeysafeActions.InitKeysafe);
      // ... the payload should be set correctly
      expect(action.payload).toEqual({
        keysafe: null,
        error: { error: 'Please install IXO Keysafe!' },
      });
    });

    it('should return an action of type KeysafeActions.InitKeysafe and an error if keysafe is installed and logged in', () => {
      windowSpy.mockImplementation(() => ({
        ixoKs: jest.fn(),
      }));

      // when ... we call the initKeysafe action creator
      const action = SUT.initKeysafe();

      // then we should expect it to create an action with the correct type
      expect(action.type).toEqual(KeysafeActions.InitKeysafe);

      // ... the payload should be set correctly
      expect(action.payload).toEqual({
        keysafe: {},
        error: {},
      });
    });

    // *TODO - cannot find a way to mock not being logged in to keysafe - the logic in the action is weird with checking
    // if window.ixoKs is null and then the "const ixoInpageProvider = new IxoInpageProvider()"" and checking if that is null
  });

  describe('initUserInfo', () => {
    it('should return an action of type KeysafeActions.ResetKeysafe', () => {
      // when ... we call the resetKeysafe action creator
      const action = SUT.resetKeysafe();

      // then we should expect it to create an action with the correct type
      expect(action.type).toEqual(KeysafeActions.ResetKeysafe);
    });
  });
});
