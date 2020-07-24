import * as SUT from './CreateClaimTemplate.actions'
import { CreateClaimTemplateActions } from './types'
import mockStore from '../../common/redux/mockStore'

let store
let state = {
  createClaimTemplate: {
    activeStep: 1,
    questions: [],
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

      expect(action.type).toEqual(CreateClaimTemplateActions.updateActiveStep)
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

  describe('addQuestion', () => {
    it('should dispatch an action to add a question to the list', () => {
      state = {
        ...state,
        createClaimTemplate: {
          ...state.createClaimTemplate,
          questions: [],
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

      expect(action.type).toEqual(CreateClaimTemplateActions.addAttestation)
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
})
