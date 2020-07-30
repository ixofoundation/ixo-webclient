import * as SUT from './CreateClaimTemplate.actions'
import { CreateClaimTemplateActions } from './types'
import mockStore from '../../common/redux/mockStore'

let store
let state = {
  createClaimTemplate: {
    activeStep: 1,
    claimInfo: null,
    attestations: [],
  },
}

beforeEach(() => {
  store = mockStore(() => state)
})

describe('CreateClaimTemplate Actions', () => {
  describe('goToStepNumber', () => {
    it('should dispatch an action to go to the new step when the activeStep is passed in', () => {
      state = {
        ...state,
        createClaimTemplate: {
          ...state.createClaimTemplate,
          activeStep: 1,
        },
      }

      // when ... we call goToQuestionNumber
      store.dispatch(SUT.updateActiveStep(2))
      const action = store.getActions()[0]

      expect(action.type).toEqual(CreateClaimTemplateActions.UpdateActiveStep)
      expect(action.payload).toEqual(2)
    })

    it('should not dispatch any action when the new step is equal to the activeStep', () => {
      state = {
        ...state,
        createClaimTemplate: {
          ...state.createClaimTemplate,
          activeStep: 2,
        },
      }

      // when ... we call saveAnswer
      store.dispatch(SUT.updateActiveStep(2))
      const actions = store.getActions()

      expect(actions).toEqual([])
    })

    it('should not dispatch any action when the new step is greater than the total steps', () => {
      state = {
        ...state,
        createClaimTemplate: {
          ...state.createClaimTemplate,
          activeStep: 3,
        },
      }

      // when ... we call saveAnswer
      store.dispatch(SUT.updateActiveStep(4))
      const actions = store.getActions()

      expect(actions).toEqual([])
    })
  })

  describe('updateClaimInfo', () => {
    it('should dispatch an action to add a update the claim info', () => {
      state = {
        ...state,
        createClaimTemplate: {
          ...state.createClaimTemplate,
          claimInfo: null,
        },
      }

      // when ... we call goToQuestionNumber
      store.dispatch(
        SUT.updateClaimInfo({
          claimName: 'string',
          shortDescription: 'string',
        }),
      )
      const action = store.getActions()[0]

      expect(action.type).toEqual(CreateClaimTemplateActions.UpdateClaimInfo)
      expect(action.payload).toEqual({
        claimName: 'string',
        shortDescription: 'string',
      })
    })
  })

  describe('addAttestation', () => {
    it('should dispatch an action to add a question to the list', () => {
      state = {
        ...state,
        createClaimTemplate: {
          ...state.createClaimTemplate,
          attestations: [],
        },
      }

      // when ... we call goToQuestionNumber
      store.dispatch(
        SUT.addAttestation({
          id: 'string',
          title: 'string',
          description: 'string',
          label: 'string',
          required: true,
          type: 'string',
          control: 'string',
        }),
      )
      const action = store.getActions()[0]

      expect(action.type).toEqual(CreateClaimTemplateActions.AddAttestation)
      expect(action.payload).toEqual({
        id: 'string',
        title: 'string',
        description: 'string',
        label: 'string',
        required: true,
        type: 'string',
        control: 'string',
      })
    })
  })

  describe('removeAttestation', () => {
    it('should dispatch an action to remove an attestation from the list', () => {
      state = {
        ...state,
        createClaimTemplate: {
          ...state.createClaimTemplate,
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
        },
      }

      // when ... we call goToQuestionNumber
      store.dispatch(SUT.removeAttestation('string'))
      const action = store.getActions()[0]

      expect(action.type).toEqual(CreateClaimTemplateActions.RemoveAttestation)
      expect(action.payload).toEqual('string')
    })
  })

  describe('updateAttestation', () => {
    it('should dispatch an action to duplicate an attestation in the list', () => {
      state = {
        ...state,
        createClaimTemplate: {
          ...state.createClaimTemplate,
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
        },
      }

      store.dispatch(
        SUT.updateAttestation({
          id: 'string',
          title: 'newstring',
          description: 'newstring',
          label: 'newstring',
          required: true,
          type: 'newstring',
          control: 'newstring',
        }),
      )
      const action = store.getActions()[0]

      expect(action.type).toEqual(CreateClaimTemplateActions.UpdateAttestation)
      expect(action.payload).toEqual({
        id: 'string',
        title: 'newstring',
        description: 'newstring',
        label: 'newstring',
        required: true,
        type: 'newstring',
        control: 'newstring',
      })
    })
  })
})
