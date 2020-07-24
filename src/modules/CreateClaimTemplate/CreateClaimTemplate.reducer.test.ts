import * as SUT from './CreateClaimTemplate.reducer'
import {
  UpdateActiveStepAction,
  CreateClaimTemplateActions,
  AddAttestationAction,
} from './types'

const initialState = SUT.initialState

describe('CreateClaimTemplate Reducer', () => {
  it('should return the same state if an action is called on it which is not handled by the reducer', () => {
    // given .. we have an action the reducer does not handle
    const action: any = 'foo'

    // when ... we run the reducer with this action
    const result = SUT.reducer(initialState, action)

    // then ... the state that was passed into the function should be returned
    expect(result).toEqual(initialState)
  })

  describe('UpdateActiveStep Action', () => {
    it('should update the activeStep number', () => {
      const action: UpdateActiveStepAction = {
        type: CreateClaimTemplateActions.updateActiveStep,
        payload: 3,
      }

      const result = SUT.reducer(initialState, action)

      expect(result).toEqual({
        ...initialState,
        activeStep: 3,
      })
    })
  })

  describe('AddQuestionAction Action', () => {
    it('should update the activeStep number', () => {
      const action: AddAttestationAction = {
        type: CreateClaimTemplateActions.addAttestation,
        payload: {
          id: 'string',
          title: 'string',
          description: 'string',
          label: 'string',
          required: true,
          type: 'string',
          control: 'string',
        },
      }

      const result = SUT.reducer(initialState, action)

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
      })
    })
  })
})
