import { v4 } from 'uuid'
jest.mock('uuid')
import * as SUT from './CreateEntityAttestation.actions'
import { CreateEntityAttestationActions } from './types'
import { Type, ControlType } from '../../common/components/JsonForm/types'

describe('CreateEntityAttestation Actions', () => {
  describe('claimInfo', () => {
    describe('updateClaimInfo', () => {
      it('should update the claimInfo section', () => {
        // given ... some data
        const title = 'someTitle'
        const shortDescription = 'someShortDescription'

        const formData = {
          title,
          shortDescription,
        }

        // when ... we call the action
        const action = SUT.updateClaimInfo(formData)

        // then ... we should expect it to create an action with the correct type
        expect(action.type).toEqual(
          CreateEntityAttestationActions.UpdateClaimInfo,
        )
        expect(action.payload).toEqual({
          title,
          shortDescription,
        })
      })
    })
  })

  describe('shortTextQuestion', () => {
    describe('addShortTextQuestion', () => {
      it('should add a new short text question', () => {
        // given ... an id
        const id = 'newId'
        v4.mockImplementationOnce(() => id)

        // when ... we call the action
        const action = SUT.addShortTextQuestion()

        // then ... we should expect it to create an action with the correct type
        expect(action.type).toEqual(
          CreateEntityAttestationActions.AddShortTextQuestion,
        )
        expect(action.payload).toEqual({
          id,
          title: undefined,
          description: undefined,
          label: undefined,
          required: true,
          type: Type.String,
          control: ControlType.Text,
          placeholder: 'Start Typing here',
        })
      })
    })

    describe('updatedShortTextQuestion', () => {
      it('should update the short text question', () => {
        // given ... some data
        const id = 'existingId'
        const title = 'someNewTitle'
        const description = 'someDescription'
        const label = 'someLabel'

        const formData = {
          title,
          description,
          label,
        }

        // when ... we call the action
        const action = SUT.updateShortTextQuestion(id, formData)

        // then ... we should expect it to create the action as expected
        expect(action.type).toEqual(
          CreateEntityAttestationActions.UpdateShortTextQuestion,
        )
        expect(action.payload).toEqual({ id, title, description, label })
      })
    })
  })

  describe('longTextQuestion', () => {
    describe('addLongTextQuestion', () => {
      it('should add a new long text question', () => {
        // given ... an id
        const id = 'newId'
        v4.mockImplementationOnce(() => id)

        // when ... we call the action
        const action = SUT.addLongTextQuestion()

        // then ... we should expect it to create an action with the correct type
        expect(action.type).toEqual(
          CreateEntityAttestationActions.AddLongTextQuestion,
        )
        expect(action.payload).toEqual({
          id,
          title: undefined,
          description: undefined,
          label: undefined,
          required: true,
          type: Type.String,
          control: ControlType.TextArea,
          placeholder: 'Start Typing here',
        })
      })
    })

    describe('updatedLongTextQuestion', () => {
      it('should update the long text question', () => {
        // given ... some data
        const id = 'existingId'
        const title = 'someNewTitle'
        const description = 'someDescription'
        const label = 'someLabel'

        const formData = {
          title,
          description,
          label,
        }

        // when ... we call the action
        const action = SUT.updateLongTextQuestion(id, formData)

        // then ... we should expect it to create the action as expected
        expect(action.type).toEqual(
          CreateEntityAttestationActions.UpdateLongTextQuestion,
        )
        expect(action.payload).toEqual({ id, title, description, label })
      })
    })
  })

  describe('singleDateSelectorQuestion', () => {
    describe('addSingleDateSelectorQuestion', () => {
      it('should add a new single date selector question', () => {
        // given ... an id
        const id = 'newId'
        v4.mockImplementationOnce(() => id)

        // when ... we call the action
        const action = SUT.addSingleDateSelectorQuestion()

        // then ... we should expect it to create an action with the correct type
        expect(action.type).toEqual(
          CreateEntityAttestationActions.AddSingleDateSelectorQuestion,
        )
        expect(action.payload).toEqual({
          id,
          title: undefined,
          description: undefined,
          label: undefined,
          required: true,
          type: Type.String,
          control: ControlType.SingleDateSelector,
        })
      })
    })

    describe('updatedSingleDateSelectorQuestion', () => {
      it('should update the singleDateSelectort question', () => {
        // given ... some data
        const id = 'existingId'
        const title = 'someNewTitle'
        const description = 'someDescription'
        const label = 'someLabel'

        const formData = {
          title,
          description,
          label,
        }

        // when ... we call the action
        const action = SUT.updateSingleDateSelectorQuestion(id, formData)

        // then ... we should expect it to create the action as expected
        expect(action.type).toEqual(
          CreateEntityAttestationActions.UpdateSingleDateSelectorQuestion,
        )
        expect(action.payload).toEqual({ id, title, description, label })
      })
    })
  })

  describe('updateAnswerRequired', () => {
    it('should flag the answer as required or not required', () => {
      // given ... an id and the required flag
      const id = 'someId'
      const required = true

      // when ... we call the action
      const action = SUT.updateAnswerRequired(id, required)

      // then ... we should expect it to create an action with the correct type
      expect(action.type).toEqual(
        CreateEntityAttestationActions.UpdateAnswerRequired,
      )
      expect(action.payload).toEqual({
        id,
        required,
      })
    })
  })

  describe('removeQuestion', () => {
    it('should remove the question', () => {
      // given ... an id
      const id = 'someId'

      // when ... we call the action
      const action = SUT.removeQuestion(id)

      // then ... we should expect it to create an action with the correct type
      expect(action.type).toEqual(CreateEntityAttestationActions.RemoveQuestion)
      expect(action.payload).toEqual({
        id,
      })
    })
  })

  describe('copyQuestion', () => {
    it('should copy the question', () => {
      // given ... an id
      const newId = 'newId'
      const idToCopy = 'someExistingId'
      v4.mockImplementationOnce(() => newId)

      // when ... we call the action
      const action = SUT.copyQuestion(idToCopy)

      // then ... we should expect it to create an action with the correct type
      expect(action.type).toEqual(CreateEntityAttestationActions.CopyQuestion)
      expect(action.payload).toEqual({
        idToCopy,
        newId,
      })
    })
  })

  describe('validation', () => {
    it('should set validated to true', () => {
      const identifier = 'someIdentifier'
      // when ... we call the validated action creator
      const action = SUT.validated(identifier)

      // then ... we should expect it to create an action with the correct type and payload
      expect(action.type).toEqual(CreateEntityAttestationActions.Validated)
      expect(action.payload).toEqual({
        identifier,
      })
    })
  })
  describe('validationError', () => {
    it('should set validated to false with any errors', () => {
      const identifier = 'someIdentifier'
      const errors = ['error1', 'error2']
      // when ... we call the validated action creator
      const action = SUT.validationError(identifier, errors)

      // then ... we should expect it to create an action with the correct type and payload
      expect(action.type).toEqual(
        CreateEntityAttestationActions.ValidationError,
      )
      expect(action.payload).toEqual({
        identifier,
        errors,
      })
    })
  })
})
