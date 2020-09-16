import * as SUT from './SubmitEntityClaim.actions'
import { SubmitEntityClaimActions } from './types'
import mockStore from 'common/redux/mockStore'

let store
let state = {
  submitEntityClaim: {
    questions: [
      { id: 'abc', title: 'foo' },
      { id: 'xyz', title: 'bar' },
    ],
    currentQuestionNo: 2,
    answers: [
      { id: 'abc', data: 'foo' },
      { id: 'xyz', data: 'bar' },
    ],
    answersComplete: false,
    sending: false,
    sent: false,
    error: null,
    savingAnswer: false,
  },
}

beforeEach(() => {
  store = mockStore(() => state)
})

describe('SubmitEntityClaim Actions', () => {
  /*   describe('saveAnswer', () => {
    it('should create an action to save an answer', () => {
      // when ... we have an answer and a questionId
      const answer = { questionId: 'xyz', foo: 'bar' }

      // when ... we call saveAnswer
      const action = SUT.saveAnswer(answer)

      // then we should expect it to create action with the correct type and payload
      expect(action.type).toEqual(SubmitEntityClaimActions.SaveAnswer)
      expect(action.payload).toEqual({ answer })
    })
  }) */

  describe('goToPreviousQuestion', () => {
    it('should dispatch an action to go to the previous question when the currentQuestionNo is greater than 1', () => {
      state = {
        ...state,
        submitEntityClaim: {
          ...state.submitEntityClaim,
          currentQuestionNo: 2,
        },
      }

      // when ... we call saveAnswer
      store.dispatch(SUT.goToPreviousQuestion())
      const action = store.getActions()[0]

      expect(action.type).toEqual(SubmitEntityClaimActions.GoToPreviousQuestion)
      expect(action.payload).toEqual({ previousQuestionNo: 1 })
    })

    it('should not dispatch any action when the currentQuestionNo is less than 2', () => {
      state = {
        ...state,
        submitEntityClaim: {
          ...state.submitEntityClaim,
          currentQuestionNo: 1,
        },
      }

      // when ... we call saveAnswer
      store.dispatch(SUT.goToPreviousQuestion())
      const actions = store.getActions()

      expect(actions).toEqual([])
    })
  })

  describe('goToNextQuestion', () => {
    it('should dispatch an action to go to the next question when the currentQuestionNo is less than the total question count', () => {
      state = {
        ...state,
        submitEntityClaim: {
          ...state.submitEntityClaim,
          currentQuestionNo: 1,
        },
      }

      // when ... we call saveAnswer
      store.dispatch(SUT.goToNextQuestion())
      const action = store.getActions()[0]

      expect(action.type).toEqual(SubmitEntityClaimActions.GoToNextQuestion)
      expect(action.payload).toEqual({ nextQuestionNo: 2 })
    })

    it('should not dispatch any action when the currentQuestionNo is equal to the total question count', () => {
      state = {
        ...state,
        submitEntityClaim: {
          ...state.submitEntityClaim,
          currentQuestionNo: 2,
        },
      }

      // when ... we call saveAnswer
      store.dispatch(SUT.goToNextQuestion())
      const actions = store.getActions()

      expect(actions).toEqual([])
    })

    it('should not dispatch any action when the currentQuestionNo is greater than the total question count', () => {
      state = {
        ...state,
        submitEntityClaim: {
          ...state.submitEntityClaim,
          currentQuestionNo: 3,
        },
      }

      // when ... we call saveAnswer
      store.dispatch(SUT.goToNextQuestion())
      const actions = store.getActions()

      expect(actions).toEqual([])
    })
  })

  describe('goToQuestionNumber', () => {
    it('should dispatch an action to go to the new question when the currentQuestionNo is great than the questionNo', () => {
      state = {
        ...state,
        submitEntityClaim: {
          ...state.submitEntityClaim,
          currentQuestionNo: 2,
        },
      }

      // when ... we call goToQuestionNumber
      store.dispatch(SUT.goToQuestionNumber(1))
      const action = store.getActions()[0]

      expect(action.type).toEqual(SubmitEntityClaimActions.GoToQuestionNumber)
      expect(action.payload).toEqual({ questionNo: 1 })
    })

    it('should not dispatch any action when the questionNo is equal to the currentQuestionNo', () => {
      state = {
        ...state,
        submitEntityClaim: {
          ...state.submitEntityClaim,
          currentQuestionNo: 2,
        },
      }

      // when ... we call saveAnswer
      store.dispatch(SUT.goToQuestionNumber(2))
      const actions = store.getActions()

      expect(actions).toEqual([])
    })

    it('should not dispatch any action when the questionNo is great than the currentQuestionNo', () => {
      state = {
        ...state,
        submitEntityClaim: {
          ...state.submitEntityClaim,
          currentQuestionNo: 2,
        },
      }

      // when ... we call saveAnswer
      store.dispatch(SUT.goToQuestionNumber(4))
      const actions = store.getActions()

      expect(actions).toEqual([])
    })
  })
})
