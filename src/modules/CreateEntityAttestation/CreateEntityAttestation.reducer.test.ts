import * as SUT from './CreateEntityAttestation.reducer'
import {
  UpdateClaimInfoAction,
  CreateEntityAttestationActions,
  ValidatedAction,
  ValidationErrorAction,
  AddShortTextQuestionAction,
  UpdateShortTextQuestionAction,
  AddLongTextQuestionAction,
  UpdateLongTextQuestionAction,
  UpdateAnswerRequiredAction,
  RemoveQuestionAction,
  CopyQuestionAction,
} from './types'
import { Type, ControlType } from 'common/components/JsonForm/types'

const initialState = SUT.initialState

describe('CreateEntityAttestation Reducer', () => {
  it('should return the same state if an action is called on it which is not handled by the reducer', () => {
    // given .. we have an action the reducer does not handle
    const action: any = 'foo'

    // when ... we run the reducer with this action
    const result = SUT.reducer(initialState, action)

    // then ... the state that was passed into the function should be returned
    expect(result).toEqual(initialState)
  })

  describe('ClaimInfo Actions', () => {
    it('should update the claimInfo', () => {
      const title = 'someNewTitle'
      const shortDescription = 'someNewShortDescription'

      // given .. we have an action of type CreateEntityPageContentActions.UpdateSocialContent
      const action: UpdateClaimInfoAction = {
        type: CreateEntityAttestationActions.UpdateClaimInfo,
        payload: {
          title,
          shortDescription,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          claimInfo: {
            title: 'someOldTitle',
            shortDescription: 'someOldShortDescription',
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        claimInfo: {
          title,
          shortDescription,
        },
      })
    })
  })

  describe('ShortTextQuestion Actions', () => {
    it('should add a new short text question', () => {
      const id = 'someId'

      // given ... we have an action of type CreateEntityAttestationActions.AddShortTextQuestion
      const action: AddShortTextQuestionAction = {
        type: CreateEntityAttestationActions.AddShortTextQuestion,
        payload: {
          id,
          title: undefined,
          description: undefined,
          label: undefined,
          required: true,
          type: Type.String,
          control: ControlType.Text,
          placeholder: 'Start Typing here',
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(initialState, action)

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        questions: {
          [id]: {
            id,
            title: undefined,
            description: undefined,
            label: undefined,
            required: true,
            type: Type.String,
            control: ControlType.Text,
            placeholder: 'Start Typing here',
          },
        },
      })
    })

    it('should update the short text question and leave other properties in tact', () => {
      const id = 'someId'
      const title = 'someNewTitle'
      const label = 'someNewLabel'
      const description = 'someNewDescription'

      // given .. we have an action of type CreateEntityAttestationActions.UpdateShortTextQuestion
      const action: UpdateShortTextQuestionAction = {
        type: CreateEntityAttestationActions.UpdateShortTextQuestion,
        payload: {
          id,
          title,
          label,
          description,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          questions: {
            [id]: {
              id,
              title: 'someOldTitle',
              label: 'someOldLabel',
              description: 'someOldDescription',
              required: true,
              type: Type.String,
              control: ControlType.Text,
              placeholder: 'Start Typing here',
            },
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        questions: {
          [id]: {
            id,
            title,
            label,
            description,
            required: true,
            type: Type.String,
            control: ControlType.Text,
            placeholder: 'Start Typing here',
          },
        },
      })
    })
  })

  describe('LongTextQuestion Actions', () => {
    it('should add a new long text question', () => {
      const id = 'someId'

      // given ... we have an action of type CreateEntityAttestationActions.AddLongTextQuestion
      const action: AddLongTextQuestionAction = {
        type: CreateEntityAttestationActions.AddLongTextQuestion,
        payload: {
          id,
          title: undefined,
          description: undefined,
          label: undefined,
          required: true,
          type: Type.String,
          control: ControlType.TextArea,
          placeholder: 'Start Typing here',
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(initialState, action)

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        questions: {
          [id]: {
            id,
            title: undefined,
            description: undefined,
            label: undefined,
            required: true,
            type: Type.String,
            control: ControlType.TextArea,
            placeholder: 'Start Typing here',
          },
        },
      })
    })

    it('should update the long text question and leave other properties in tact', () => {
      const id = 'someId'
      const title = 'someNewTitle'
      const label = 'someNewLabel'
      const description = 'someNewDescription'

      // given .. we have an action of type CreateEntityAttestationActions.UpdateLongTextQuestion
      const action: UpdateLongTextQuestionAction = {
        type: CreateEntityAttestationActions.UpdateLongTextQuestion,
        payload: {
          id,
          title,
          label,
          description,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          questions: {
            [id]: {
              id,
              title: 'someOldTitle',
              label: 'someOldLabel',
              description: 'someOldDescription',
              required: true,
              type: Type.String,
              control: ControlType.TextArea,
              placeholder: 'Start Typing here',
            },
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        questions: {
          [id]: {
            id,
            title,
            label,
            description,
            required: true,
            type: Type.String,
            control: ControlType.TextArea,
            placeholder: 'Start Typing here',
          },
        },
      })
    })
  })

  describe('Required Actions', () => {
    it('should set required flag', () => {
      const id = 'someId'
      const required = true
      // given ... we have an action of type CreateEntityAttestationActions.UpdateAnswerRequired
      const action: UpdateAnswerRequiredAction = {
        type: CreateEntityAttestationActions.UpdateAnswerRequired,
        payload: {
          id,
          required,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          questions: {
            [id]: {
              id,
              title: 'someExistingTitle',
              label: 'someExistingLabel',
              description: 'someExistingDescription',
              required: false,
              type: Type.String,
              control: ControlType.TextArea,
              placeholder: 'Start Typing here',
            },
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        questions: {
          [id]: {
            id,
            title: 'someExistingTitle',
            label: 'someExistingLabel',
            description: 'someExistingDescription',
            required: true,
            type: Type.String,
            control: ControlType.TextArea,
            placeholder: 'Start Typing here',
          },
        },
      })
    })
  })

  describe('Remove Actions', () => {
    it('should remove the question', () => {
      const id = 'someId'
      // given ... we have an action of type CreateEntityAttestationActions.RemoveQuestion
      const action: RemoveQuestionAction = {
        type: CreateEntityAttestationActions.RemoveQuestion,
        payload: {
          id,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          questions: {
            [id]: {
              id,
              title: 'someExistingTitle',
              label: 'someExistingLabel',
              description: 'someExistingDescription',
              required: false,
              type: Type.String,
              control: ControlType.TextArea,
              placeholder: 'Start Typing here',
            },
            ['anotherid']: {
              id,
              title: 'anotherExistingTitle',
              label: 'anotherExistingLabel',
              description: 'anotherExistingDescription',
              required: false,
              type: Type.String,
              control: ControlType.TextArea,
              placeholder: 'Start Typing here',
            },
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        questions: {
          ['anotherid']: {
            id,
            title: 'anotherExistingTitle',
            label: 'anotherExistingLabel',
            description: 'anotherExistingDescription',
            required: false,
            type: Type.String,
            control: ControlType.TextArea,
            placeholder: 'Start Typing here',
          },
        },
      })
    })
  })

  describe('Copy Actions', () => {
    it('should copy the question', () => {
      const newId = 'someId'
      const idToCopy = 'someExistingId'

      // given ... we have an action of type CreateEntityAttestationActions.RemoveQuestion
      const action: CopyQuestionAction = {
        type: CreateEntityAttestationActions.CopyQuestion,
        payload: {
          newId,
          idToCopy,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          questions: {
            [idToCopy]: {
              id: idToCopy,
              title: 'someQuestionToCopyTitle',
              label: 'someQuestionToCopyLabel',
              description: 'someQuestionToCopyDescription',
              required: false,
              type: Type.String,
              control: ControlType.TextArea,
              placeholder: 'Start Typing here',
            },
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        questions: {
          [idToCopy]: {
            id: idToCopy,
            title: 'someQuestionToCopyTitle',
            label: 'someQuestionToCopyLabel',
            description: 'someQuestionToCopyDescription',
            required: false,
            type: Type.String,
            control: ControlType.TextArea,
            placeholder: 'Start Typing here',
          },
          [newId]: {
            id: newId,
            title: 'someQuestionToCopyTitle',
            label: 'someQuestionToCopyLabel',
            description: 'someQuestionToCopyDescription',
            required: false,
            type: Type.String,
            control: ControlType.TextArea,
            placeholder: 'Start Typing here',
          },
        },
      })
    })
  })

  describe('Validation Actions', () => {
    it('should set validated to true and clear any errors', () => {
      const identifier = 'someBodySectionId'
      const errors = ['error1', 'error2']
      // given ... we have an action of type CreateEntityAttestationActions.Validated
      const action: ValidatedAction = {
        type: CreateEntityAttestationActions.Validated,
        payload: {
          identifier,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          validation: {
            [identifier]: {
              identifier,
              validated: false,
              errors,
            },
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        validation: {
          [identifier]: {
            identifier,
            validated: true,
            errors: [],
          },
        },
      })
    })
  })

  it('should set validated to false and add any errors', () => {
    const identifier = 'someBodySectionId'
    const errors = ['error1', 'error2']
    // given ... we have an action of type CreateEntityPageContentActions.SetValidated
    const action: ValidationErrorAction = {
      type: CreateEntityAttestationActions.ValidationError,
      payload: {
        errors,
        identifier,
      },
    }

    // when ... we run the reducer with this action
    const result = SUT.reducer(
      {
        ...initialState,
        validation: {
          [identifier]: {
            identifier,
            validated: true,
            errors: [],
          },
        },
      },
      action,
    )

    // then ... the state should be set as expected
    expect(result).toEqual({
      ...initialState,
      validation: {
        [identifier]: {
          identifier,
          validated: false,
          errors,
        },
      },
    })
  })
})
