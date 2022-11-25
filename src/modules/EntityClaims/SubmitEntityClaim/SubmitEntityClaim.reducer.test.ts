import * as SUT from './SubmitEntityClaim.reducer'
import {
  SaveAnswerSuccessAction,
  SaveAnswerPendingAction,
  SaveAnswerFailureAction,
  SubmitEntityClaimActions,
  GoToNextQuestionAction,
  GoToPreviousQuestionAction,
  GoToQuestionNumberAction,
} from './types'

const initialState = SUT.initialState

describe('SubmitEntityClaim Reducer', () => {
  it('should return the same state if an action is called on it which is not handled by the reducer', () => {
    // given .. we have an action the reducer does not handle
    const action: any = 'foo'

    // when ... we run the reducer with this action
    const result = SUT.reducer(initialState, action)

    // then ... the state that was passed into the function should be returned
    expect(result).toEqual(initialState)
  })

  describe('SaveAnswerPending Action', () => {
    it('should set the savingAnswer flag to true', () => {
      // given .. we have an action of type SubmitEntityActions.SaveAnswerPending with an answer
      const action: SaveAnswerPendingAction = {
        type: SubmitEntityClaimActions.SaveAnswerPending,
      }

      // when ... we run the reducer with this action and initialState
      const result = SUT.reducer(initialState, action)

      expect(result).toEqual({
        ...initialState,
        savingAnswer: true,
      })
    })
  })

  describe('SaveAnswerSuccess Action', () => {
    it('should add the new answer to the answers array and leave other answers in tact', () => {
      // given .. we have an action of type SubmitEntityActions.SaveAnswerSuccess with an answer
      const action: SaveAnswerSuccessAction = {
        type: SubmitEntityClaimActions.SaveAnswerSuccess,
        payload: { foo3: 'bar3' },
      }

      const currentState = {
        ...initialState,
        answers: {
          foo1: 'bar1',
          foo2: 'bar2',
        },
        savingAnswer: true,
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(currentState, action)

      // then the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        answers: {
          foo1: 'bar1',
          foo2: 'bar2',
          foo3: 'bar3',
        },
        savingAnswer: false,
      })
    })

    it('should update the existing answer in the answers array and leave other answers in tact', () => {
      // given .. we have an action of type SubmitEntityActions.SaveAnswerSuccess with an answer
      const action: SaveAnswerSuccessAction = {
        type: SubmitEntityClaimActions.SaveAnswerSuccess,
        payload: { foo1: 'bar123' },
      }

      const currentState = {
        ...initialState,
        answers: {
          foo1: 'bar1',
          foo2: 'bar2',
          foo3: 'bar3',
        },
        savingAnswer: true,
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(currentState, action)

      // then the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        answers: {
          foo1: 'bar123',
          foo2: 'bar2',
          foo3: 'bar3',
        },
        savingAnswer: false,
      })
    })
  })

  describe('SaveAnswerFailure Action', () => {
    it('should set the savingAnswer flag to false', () => {
      // given .. we have an action of type SubmitEntityActions.SaveAnswerFailure with an answer
      const action: SaveAnswerFailureAction = {
        type: SubmitEntityClaimActions.SaveAnswerFailure,
      }

      // when ... we run the reducer with this action and initialState
      const result = SUT.reducer({ ...initialState, savingAnswer: true }, action)

      expect(result).toEqual({
        ...initialState,
        savingAnswer: false,
      })
    })
  })

  describe('GoToNextQuestion Action', () => {
    it('should update the currentQuestionNo', () => {
      const action: GoToNextQuestionAction = {
        type: SubmitEntityClaimActions.GoToNextQuestion,
        payload: {
          nextQuestionNo: 3,
        },
      }

      const result = SUT.reducer(initialState, action)

      expect(result).toEqual({
        ...initialState,
        currentQuestionNo: 3,
      })
    })
  })

  describe('GoToPreviousQuestion Action', () => {
    it('should update the currentQuestionNo', () => {
      const action: GoToPreviousQuestionAction = {
        type: SubmitEntityClaimActions.GoToPreviousQuestion,
        payload: {
          previousQuestionNo: 2,
        },
      }

      const result = SUT.reducer(initialState, action)

      expect(result).toEqual({
        ...initialState,
        currentQuestionNo: 2,
      })
    })
  })

  describe('GoToQuestionNumber Action', () => {
    it('should update the currentQuestionNo', () => {
      const action: GoToQuestionNumberAction = {
        type: SubmitEntityClaimActions.GoToQuestionNumber,
        payload: {
          questionNo: 2,
        },
      }

      const result = SUT.reducer(initialState, action)

      expect(result).toEqual({
        ...initialState,
        currentQuestionNo: 2,
      })
    })
  })
})

// TODO  - tests for GetClaimTemplate and CreateClaim
