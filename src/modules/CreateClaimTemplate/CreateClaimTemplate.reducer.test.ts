import * as SUT from './CreateClaimTemplate.reducer';
import {
  UpdateActiveStepAction,
  CreateClaimTemplateActions,
  AddAttestationAction,
  RemoveAttestationAction,
  UpdateAttestationAction,
  UpdateClaimInfoAction,
} from './types';

const { initialState } = SUT;

describe('CreateClaimTemplate Reducer', () => {
  it('should return the same state if an action is called on it which is not handled by the reducer', () => {
    // given .. we have an action the reducer does not handle
    const action: any = 'foo';

    // when ... we run the reducer with this action
    const result = SUT.reducer(initialState, action);

    // then ... the state that was passed into the function should be returned
    expect(result).toEqual(initialState);
  });

  describe('UpdateActiveStep Action', () => {
    it('should update the activeStep number', () => {
      const action: UpdateActiveStepAction = {
        type: CreateClaimTemplateActions.UpdateActiveStep,
        payload: 3,
      };

      const result = SUT.reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        activeStep: 3,
      });
    });
  });

  describe('UpdateClaimInfo Action', () => {
    it('should update the claim info', () => {
      const action: UpdateClaimInfoAction = {
        type: CreateClaimTemplateActions.UpdateClaimInfo,
        payload: { claimName: 'someName', shortDescription: 'someDescription' },
      };

      const result = SUT.reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        claimInfo: {
          claimName: 'someName',
          shortDescription: 'someDescription',
        },
      });
    });
  });

  describe('AddAttestationAction Action', () => {
    it('should update the activeStep number', () => {
      const action: AddAttestationAction = {
        type: CreateClaimTemplateActions.AddAttestation,
        payload: {
          id: 'string',
          title: 'string',
          description: 'string',
          label: 'string',
          required: true,
          type: 'string',
          control: 'string',
        },
      };

      const result = SUT.reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        attestations: [
          {
            id: 'string',
            title: 'string',
            description: 'string',
            label: 'string',
            required: true,
            type: 'string',
            control: 'string',
          },
        ],
      });
    });
  });

  describe('RemoveAttestation Action', () => {
    it('should update the activeStep number', () => {
      const action: RemoveAttestationAction = {
        type: CreateClaimTemplateActions.RemoveAttestation,
        payload: 'string',
      };

      const result = SUT.reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        attestations: [],
      });
    });
  });

  describe('UpdateAttestation Action', () => {
    // it('should update the attestation with the new details', () => {
    //   const action: UpdateAttestationAction = {
    //     type: CreateClaimTemplateActions.UpdateAttestation,
    //     payload: {
    //       id: 'string',
    //       title: 'newstring',
    //       description: 'string',
    //       label: 'string',
    //       required: true,
    //       type: 'string',
    //       control: 'string',
    //     },
    //   }
    //   const result = SUT.reducer(
    //     {
    //       ...initialState,
    //       attestations: [
    //         {
    //           id: 'string',
    //           title: 'string',
    //           description: 'string',
    //           label: 'string',
    //           required: true,
    //           type: 'string',
    //           control: 'string',
    //         },
    //       ],
    //     },
    //     action,
    //   )

    //   expect(result).toEqual({
    //     ...initialState,
    //     attestations: [
    //       {
    //         id: 'string',
    //         title: 'newstring',
    //         description: 'string',
    //         label: 'string',
    //         required: true,
    //         type: 'string',
    //         control: 'string',
    //       },
    //     ],
    //   })

    it('should update the content of the attestation', () => {
      // given .. we have an action of type CreateClaimTemplateActions.UpdateAttestation
      const action: UpdateAttestationAction = {
        type: CreateClaimTemplateActions.UpdateAttestation,
        payload: {
          id: 'someID',
          title: 'someNewString',
          description: 'someNewString',
          label: 'someNewString',
          required: true,
          type: 'someNewString',
          control: 'someNewString',
        },
      };

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          attestations: [
            {
              id: 'someID',
              title: 'someOldString',
              description: 'someOldString',
              label: 'someOldString',
              required: false,
              type: 'someOldString',
              control: 'someOldString',
            },
          ],
        },
        action,
      );

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        attestations: [
          {
            id: 'someID',
            title: 'someNewString',
            description: 'someNewString',
            label: 'someNewString',
            required: true,
            type: 'someNewString',
            control: 'someNewString',
          },
        ],
      });
    });
  });
});
