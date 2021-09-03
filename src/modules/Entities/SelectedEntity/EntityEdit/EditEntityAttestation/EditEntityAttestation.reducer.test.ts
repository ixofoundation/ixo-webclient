import * as SUT from './EditEntityAttestation.reducer'
import {
  UpdateClaimInfoAction,
  EditEntityAttestationActions,
  ValidatedAction,
  ValidationErrorAction,
  AddShortTextQuestionAction,
  UpdateShortTextQuestionAction,
  AddLongTextQuestionAction,
  UpdateLongTextQuestionAction,
  UpdateSingleDateSelectorQuestionAction,
  AddSingleDateSelectorQuestionAction,
  UpdateAnswerRequiredAction,
  RemoveQuestionAction,
  CopyQuestionAction,
  AddDateRangeSelectorQuestionAction,
  UpdateDateRangeSelectorQuestionAction,
  AddAvatarUploadQuestionAction,
  UpdateAvatarUploadQuestionAction,
  AddImageUploadQuestionAction,
  UpdateImageUploadQuestionAction,
  UpdateVideoUploadQuestionAction,
  AddVideoUploadQuestionAction,
  UpdateAudioUploadQuestionAction,
  AddAudioUploadQuestionAction,
  UpdateDocumentUploadQuestionAction,
  AddDocumentUploadQuestionAction,
  UpdateLocationSelectorQuestionAction,
  AddLocationSelectorQuestionAction,
  AddQRCodeQuestionAction,
  UpdateQRCodeQuestionAction,
  AddQRCodeScanQuestionAction,
  UpdateQRCodeScanQuestionAction,
  AddRatingQuestionAction,
  UpdateRatingQuestionAction,
  AddCheckBoxesQuestionAction,
  UpdateCheckBoxesQuestionAction,
  MoveQuestionAction,
} from './types'
import { Type, ControlType } from 'common/components/JsonForm/types'
import {
  NewEntityAction,
  EditEntityActions,
  EditEntitySuccessAction,
} from '../types'
import { EntityType } from '../../../types'
import { EntityClaimType } from 'modules/EntityClaims/types'

const initialState = SUT.initialState

describe('EditEntityAttestation Reducer', () => {
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
      const type = EntityClaimType.Service

      // given .. we have an action of type EditEntityPageContentActions.UpdateSocialContent
      const action: UpdateClaimInfoAction = {
        type: EditEntityAttestationActions.UpdateClaimInfo,
        payload: {
          title,
          shortDescription,
          type,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          claimInfo: {
            title: 'someOldTitle',
            shortDescription: 'someOldShortDescription',
            type: EntityClaimType.Provenance,
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
          type,
        },
      })
    })
  })

  describe('ShortTextQuestion Actions', () => {
    it('should add a new short text question and set the correct order', () => {
      const id = 'someId'

      // given ... we have an action of type EditEntityAttestationActions.AddShortTextQuestion
      const action: AddShortTextQuestionAction = {
        type: EditEntityAttestationActions.AddShortTextQuestion,
        payload: {
          id,
          title: undefined,
          description: undefined,
          attributeType: undefined,
          label: undefined,
          required: true,
          type: Type.String,
          control: ControlType.Text,
          placeholder: 'Start Typing here',
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          questions: {
            ['someExistingId']: {
              id,
              title: undefined,
              description: undefined,
              attributeType: undefined,
              label: undefined,
              required: true,
              type: Type.String,
              control: ControlType.Text,
              placeholder: 'Start Typing here',
              order: 1,
            },
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        questions: {
          ['someExistingId']: {
            id,
            title: undefined,
            description: undefined,
            attributeType: undefined,
            label: undefined,
            required: true,
            type: Type.String,
            control: ControlType.Text,
            placeholder: 'Start Typing here',
            order: 1,
          },
          [id]: {
            id,
            title: undefined,
            description: undefined,
            attributeType: undefined,
            label: undefined,
            required: true,
            type: Type.String,
            control: ControlType.Text,
            placeholder: 'Start Typing here',
            order: 2,
          },
        },
      })
    })

    it('should update the short text question and leave other properties in tact', () => {
      const id = 'someId'
      const title = 'someNewTitle'
      const label = 'someNewLabel'
      const description = 'someNewDescription'
      const attributeType = 'someNewAttributeType'

      // given .. we have an action of type EditEntityAttestationActions.UpdateShortTextQuestion
      const action: UpdateShortTextQuestionAction = {
        type: EditEntityAttestationActions.UpdateShortTextQuestion,
        payload: {
          id,
          title,
          label,
          description,
          attributeType,
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
              attributeType: 'someOldAttributeType',
              required: true,
              type: Type.String,
              control: ControlType.Text,
              placeholder: 'Start Typing here',
              order: 20,
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
            attributeType,
            required: true,
            type: Type.String,
            control: ControlType.Text,
            placeholder: 'Start Typing here',
            order: 20,
          },
        },
      })
    })
  })

  describe('LongTextQuestion Actions', () => {
    it('should add a new long text question and set the correct order', () => {
      const id = 'someId'

      // given ... we have an action of type EditEntityAttestationActions.AddLongTextQuestion
      const action: AddLongTextQuestionAction = {
        type: EditEntityAttestationActions.AddLongTextQuestion,
        payload: {
          id,
          title: undefined,
          description: undefined,
          attributeType: undefined,
          label: undefined,
          required: true,
          type: Type.String,
          control: ControlType.TextArea,
          placeholder: 'Start Typing here',
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          questions: {
            ['someExistingId']: {
              id: 'someExistingId',
              title: undefined,
              description: undefined,
              attributeType: undefined,
              label: undefined,
              required: true,
              type: Type.String,
              control: ControlType.TextArea,
              placeholder: 'Start Typing here',
              order: 1,
            },
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        questions: {
          ['someExistingId']: {
            id: 'someExistingId',
            title: undefined,
            description: undefined,
            attributeType: undefined,
            label: undefined,
            required: true,
            type: Type.String,
            control: ControlType.TextArea,
            placeholder: 'Start Typing here',
            order: 1,
          },
          [id]: {
            id,
            title: undefined,
            description: undefined,
            attributeType: undefined,
            label: undefined,
            required: true,
            type: Type.String,
            control: ControlType.TextArea,
            placeholder: 'Start Typing here',
            order: 2,
          },
        },
      })
    })

    it('should update the long text question and leave other properties in tact', () => {
      const id = 'someId'
      const title = 'someNewTitle'
      const label = 'someNewLabel'
      const description = 'someNewDescription'
      const attributeType = 'someNewAttributeType'

      // given .. we have an action of type EditEntityAttestationActions.UpdateLongTextQuestion
      const action: UpdateLongTextQuestionAction = {
        type: EditEntityAttestationActions.UpdateLongTextQuestion,
        payload: {
          id,
          title,
          label,
          description,
          attributeType,
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
              attributeType: 'someOldAttributeType',
              required: true,
              type: Type.String,
              control: ControlType.TextArea,
              placeholder: 'Start Typing here',
              order: 30,
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
            attributeType,
            required: true,
            type: Type.String,
            control: ControlType.TextArea,
            placeholder: 'Start Typing here',
            order: 30,
          },
        },
      })
    })
  })

  describe('SingleDateSelectorQuestion Actions', () => {
    it('should add a new single date selector question and set the correct order', () => {
      const id = 'someId'

      // given ... we have an action of type EditEntityAttestationActions.AddSingleDateSelectorQuestion
      const action: AddSingleDateSelectorQuestionAction = {
        type: EditEntityAttestationActions.AddSingleDateSelectorQuestion,
        payload: {
          id,
          title: undefined,
          description: undefined,
          attributeType: undefined,
          label: undefined,
          required: true,
          type: Type.String,
          control: ControlType.SingleDateSelector,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          questions: {
            ['someExistingId']: {
              id,
              title: undefined,
              description: undefined,
              attributeType: undefined,
              label: undefined,
              required: true,
              type: Type.String,
              control: ControlType.SingleDateSelector,
              order: 1,
            },
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        questions: {
          ['someExistingId']: {
            id,
            title: undefined,
            description: undefined,
            attributeType: undefined,
            label: undefined,
            required: true,
            type: Type.String,
            control: ControlType.SingleDateSelector,
            order: 1,
          },
          [id]: {
            id,
            title: undefined,
            description: undefined,
            attributeType: undefined,
            label: undefined,
            required: true,
            type: Type.String,
            control: ControlType.SingleDateSelector,
            order: 2,
          },
        },
      })
    })

    it('should update the single date selector question and leave other properties in tact', () => {
      const id = 'someId'
      const title = 'someNewTitle'
      const label = 'someNewLabel'
      const description = 'someNewDescription'
      const attributeType = 'someNewAttributeType'

      // given .. we have an action of type EditEntityAttestationActions.UpdateSingleDateSelectorQuestion
      const action: UpdateSingleDateSelectorQuestionAction = {
        type: EditEntityAttestationActions.UpdateSingleDateSelectorQuestion,
        payload: {
          id,
          title,
          label,
          description,
          attributeType,
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
              attributeType: 'someOldAttributeType',
              required: true,
              type: Type.String,
              control: ControlType.SingleDateSelector,
              order: 20,
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
            attributeType,
            required: true,
            type: Type.String,
            control: ControlType.SingleDateSelector,
            order: 20,
          },
        },
      })
    })
  })

  describe('DateRangeSelectorQuestion Actions', () => {
    it('should add a new date range selector question and set the correct order', () => {
      const id = 'someId'

      // given ... we have an action of type EditEntityAttestationActions.AddDateRangeSelectorQuestion
      const action: AddDateRangeSelectorQuestionAction = {
        type: EditEntityAttestationActions.AddDateRangeSelectorQuestion,
        payload: {
          id,
          title: undefined,
          description: undefined,
          attributeType: undefined,
          label: undefined,
          required: true,
          type: Type.String,
          control: ControlType.DateRangeSelector,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          questions: {
            ['someExistingId']: {
              id,
              title: undefined,
              description: undefined,
              attributeType: undefined,
              label: undefined,
              required: true,
              type: Type.String,
              control: ControlType.DateRangeSelector,
              order: 1,
            },
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        questions: {
          ['someExistingId']: {
            id,
            title: undefined,
            description: undefined,
            attributeType: undefined,
            label: undefined,
            required: true,
            type: Type.String,
            control: ControlType.DateRangeSelector,
            order: 1,
          },
          [id]: {
            id,
            title: undefined,
            description: undefined,
            attributeType: undefined,
            label: undefined,
            required: true,
            type: Type.String,
            control: ControlType.DateRangeSelector,
            order: 2,
          },
        },
      })
    })

    it('should update the date range selector question and leave other properties in tact', () => {
      const id = 'someId'
      const title = 'someNewTitle'
      const label = 'someNewLabel'
      const description = 'someNewDescription'
      const attributeType = 'someNewAttributeType'

      // given .. we have an action of type EditEntityAttestationActions.UpdateDateRangeSelectorQuestion
      const action: UpdateDateRangeSelectorQuestionAction = {
        type: EditEntityAttestationActions.UpdateDateRangeSelectorQuestion,
        payload: {
          id,
          title,
          label,
          description,
          attributeType,
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
              attributeType: 'someOldAttributeType',
              required: true,
              type: Type.String,
              control: ControlType.DateRangeSelector,
              order: 20,
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
            attributeType,
            required: true,
            type: Type.String,
            control: ControlType.DateRangeSelector,
            order: 20,
          },
        },
      })
    })
  })

  describe('AvatarUploadQuestion Actions', () => {
    it('should add a new avatar upload question and set the correct order', () => {
      const id = 'someId'

      // given ... we have an action of type EditEntityAttestationActions.AddAvatarUploadQuestion
      const action: AddAvatarUploadQuestionAction = {
        type: EditEntityAttestationActions.AddAvatarUploadQuestion,
        payload: {
          id,
          title: undefined,
          description: undefined,
          attributeType: undefined,
          label: undefined,
          required: true,
          type: Type.String,
          control: ControlType.AvatarUpload,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          questions: {
            ['someExistingId']: {
              id,
              title: undefined,
              description: undefined,
              attributeType: undefined,
              label: undefined,
              required: true,
              type: Type.String,
              control: ControlType.AvatarUpload,
              order: 1,
            },
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        questions: {
          ['someExistingId']: {
            id,
            title: undefined,
            description: undefined,
            attributeType: undefined,
            label: undefined,
            required: true,
            type: Type.String,
            control: ControlType.AvatarUpload,
            order: 1,
          },
          [id]: {
            id,
            title: undefined,
            description: undefined,
            attributeType: undefined,
            label: undefined,
            required: true,
            type: Type.String,
            control: ControlType.AvatarUpload,
            order: 2,
          },
        },
      })
    })

    it('should update the avatar question and leave other properties in tact', () => {
      const id = 'someId'
      const title = 'someNewTitle'
      const label = 'someNewLabel'
      const description = 'someNewDescription'
      const attributeType = 'someNewAttributeType'

      // given .. we have an action of type EditEntityAttestationActions.UpdateAvatarUploadQuestion
      const action: UpdateAvatarUploadQuestionAction = {
        type: EditEntityAttestationActions.UpdateAvatarUploadQuestion,
        payload: {
          id,
          title,
          label,
          description,
          attributeType,
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
              attributeType: 'someOldAttributeType',
              required: true,
              type: Type.String,
              control: ControlType.AvatarUpload,
              order: 20,
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
            attributeType,
            required: true,
            type: Type.String,
            control: ControlType.AvatarUpload,
            order: 20,
          },
        },
      })
    })
  })

  describe('ImageUploadQuestion Actions', () => {
    it('should add a new image upload question and set the correct order', () => {
      const id = 'someId'

      // given ... we have an action of type EditEntityAttestationActions.AddImageUploadQuestion
      const action: AddImageUploadQuestionAction = {
        type: EditEntityAttestationActions.AddImageUploadQuestion,
        payload: {
          id,
          title: undefined,
          description: undefined,
          attributeType: undefined,
          label: undefined,
          required: true,
          type: Type.String,
          control: ControlType.ImageUpload,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          questions: {
            ['someExistingId']: {
              id,
              title: undefined,
              description: undefined,
              attributeType: undefined,
              label: undefined,
              required: true,
              type: Type.String,
              control: ControlType.ImageUpload,
              order: 1,
            },
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        questions: {
          ['someExistingId']: {
            id,
            title: undefined,
            description: undefined,
            attributeType: undefined,
            label: undefined,
            required: true,
            type: Type.String,
            control: ControlType.ImageUpload,
            order: 1,
          },
          [id]: {
            id,
            title: undefined,
            description: undefined,
            attributeType: undefined,
            label: undefined,
            required: true,
            type: Type.String,
            control: ControlType.ImageUpload,
            order: 2,
          },
        },
      })
    })

    it('should update the image question and leave other properties in tact', () => {
      const id = 'someId'
      const title = 'someNewTitle'
      const label = 'someNewLabel'
      const description = 'someNewDescription'
      const attributeType = 'someNewAttributeType'

      // given .. we have an action of type EditEntityAttestationActions.UpdateImageUploadQuestion
      const action: UpdateImageUploadQuestionAction = {
        type: EditEntityAttestationActions.UpdateImageUploadQuestion,
        payload: {
          id,
          title,
          label,
          description,
          attributeType,
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
              attributeType: 'someOldAttributeType',
              required: true,
              type: Type.String,
              control: ControlType.ImageUpload,
              order: 20,
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
            attributeType,
            required: true,
            type: Type.String,
            control: ControlType.ImageUpload,
            order: 20,
          },
        },
      })
    })
  })

  describe('VideoUploadQuestion Actions', () => {
    it('should add a new video upload question and set the correct order', () => {
      const id = 'someId'

      // given ... we have an action of type EditEntityAttestationActions.AddVideoUploadQuestion
      const action: AddVideoUploadQuestionAction = {
        type: EditEntityAttestationActions.AddVideoUploadQuestion,
        payload: {
          id,
          title: undefined,
          description: undefined,
          attributeType: undefined,
          label: undefined,
          required: true,
          type: Type.String,
          control: ControlType.VideoUpload,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          questions: {
            ['someExistingId']: {
              id,
              title: undefined,
              description: undefined,
              attributeType: undefined,
              label: undefined,
              required: true,
              type: Type.String,
              control: ControlType.VideoUpload,
              order: 1,
            },
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        questions: {
          ['someExistingId']: {
            id,
            title: undefined,
            description: undefined,
            attributeType: undefined,
            label: undefined,
            required: true,
            type: Type.String,
            control: ControlType.VideoUpload,
            order: 1,
          },
          [id]: {
            id,
            title: undefined,
            description: undefined,
            attributeType: undefined,
            label: undefined,
            required: true,
            type: Type.String,
            control: ControlType.VideoUpload,
            order: 2,
          },
        },
      })
    })

    it('should update the video question and leave other properties in tact', () => {
      const id = 'someId'
      const title = 'someNewTitle'
      const label = 'someNewLabel'
      const description = 'someNewDescription'
      const attributeType = 'someNewAttributeType'

      // given .. we have an action of type EditEntityAttestationActions.UpdateVideoUploadQuestion
      const action: UpdateVideoUploadQuestionAction = {
        type: EditEntityAttestationActions.UpdateVideoUploadQuestion,
        payload: {
          id,
          title,
          label,
          description,
          attributeType,
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
              attributeType: 'someOldAttributeType',
              required: true,
              type: Type.String,
              control: ControlType.VideoUpload,
              order: 20,
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
            attributeType,
            required: true,
            type: Type.String,
            control: ControlType.VideoUpload,
            order: 20,
          },
        },
      })
    })
  })

  describe('AudioUploadQuestion Actions', () => {
    it('should add a new audio upload question and set the correct order', () => {
      const id = 'someId'

      // given ... we have an action of type EditEntityAttestationActions.AddAudioUploadQuestion
      const action: AddAudioUploadQuestionAction = {
        type: EditEntityAttestationActions.AddAudioUploadQuestion,
        payload: {
          id,
          title: undefined,
          description: undefined,
          attributeType: undefined,
          label: undefined,
          required: true,
          type: Type.String,
          control: ControlType.AudioUpload,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          questions: {
            ['someExistingId']: {
              id,
              title: undefined,
              description: undefined,
              attributeType: undefined,
              label: undefined,
              required: true,
              type: Type.String,
              control: ControlType.AudioUpload,
              order: 1,
            },
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        questions: {
          ['someExistingId']: {
            id,
            title: undefined,
            description: undefined,
            attributeType: undefined,
            label: undefined,
            required: true,
            type: Type.String,
            control: ControlType.AudioUpload,
            order: 1,
          },
          [id]: {
            id,
            title: undefined,
            description: undefined,
            attributeType: undefined,
            label: undefined,
            required: true,
            type: Type.String,
            control: ControlType.AudioUpload,
            order: 2,
          },
        },
      })
    })

    it('should update the audio question and leave other properties in tact', () => {
      const id = 'someId'
      const title = 'someNewTitle'
      const label = 'someNewLabel'
      const description = 'someNewDescription'
      const attributeType = 'someNewAttributeType'

      // given .. we have an action of type EditEntityAttestationActions.UpdateAudioUploadQuestion
      const action: UpdateAudioUploadQuestionAction = {
        type: EditEntityAttestationActions.UpdateAudioUploadQuestion,
        payload: {
          id,
          title,
          label,
          description,
          attributeType,
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
              attributeType: 'someOldAttributeType',
              required: true,
              type: Type.String,
              control: ControlType.AudioUpload,
              order: 20,
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
            attributeType,
            required: true,
            type: Type.String,
            control: ControlType.AudioUpload,
            order: 20,
          },
        },
      })
    })
  })

  describe('DocumentUploadQuestion Actions', () => {
    it('should add a new audio upload question and set the correct order', () => {
      const id = 'someId'

      // given ... we have an action of type EditEntityAttestationActions.AddDocumentUploadQuestion
      const action: AddDocumentUploadQuestionAction = {
        type: EditEntityAttestationActions.AddDocumentUploadQuestion,
        payload: {
          id,
          title: undefined,
          description: undefined,
          attributeType: undefined,
          label: undefined,
          required: true,
          type: Type.String,
          control: ControlType.DocumentUpload,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          questions: {
            ['someExistingId']: {
              id,
              title: undefined,
              description: undefined,
              attributeType: undefined,
              label: undefined,
              required: true,
              type: Type.String,
              control: ControlType.DocumentUpload,
              order: 1,
            },
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        questions: {
          ['someExistingId']: {
            id,
            title: undefined,
            description: undefined,
            attributeType: undefined,
            label: undefined,
            required: true,
            type: Type.String,
            control: ControlType.DocumentUpload,
            order: 1,
          },
          [id]: {
            id,
            title: undefined,
            description: undefined,
            attributeType: undefined,
            label: undefined,
            required: true,
            type: Type.String,
            control: ControlType.DocumentUpload,
            order: 2,
          },
        },
      })
    })

    it('should update the audio question and leave other properties in tact', () => {
      const id = 'someId'
      const title = 'someNewTitle'
      const label = 'someNewLabel'
      const description = 'someNewDescription'
      const attributeType = 'someNewAttributeType'

      // given .. we have an action of type EditEntityAttestationActions.UpdateDocumentUploadQuestion
      const action: UpdateDocumentUploadQuestionAction = {
        type: EditEntityAttestationActions.UpdateDocumentUploadQuestion,
        payload: {
          id,
          title,
          label,
          description,
          attributeType,
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
              attributeType: 'someOldAttributeType',
              required: true,
              type: Type.String,
              control: ControlType.DocumentUpload,
              order: 20,
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
            attributeType,
            required: true,
            type: Type.String,
            control: ControlType.DocumentUpload,
            order: 20,
          },
        },
      })
    })
  })

  describe('LocationSelectorQuestion Actions', () => {
    it('should add a new location selector question and set the correct order', () => {
      const id = 'someId'

      // given ... we have an action of type EditEntityAttestationActions.AddLocationSelectorQuestion
      const action: AddLocationSelectorQuestionAction = {
        type: EditEntityAttestationActions.AddLocationSelectorQuestion,
        payload: {
          id,
          title: undefined,
          description: undefined,
          attributeType: undefined,
          label: undefined,
          required: true,
          type: Type.String,
          control: ControlType.LocationSelector,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          questions: {
            ['someExistingId']: {
              id,
              title: undefined,
              description: undefined,
              attributeType: undefined,
              label: undefined,
              required: true,
              type: Type.String,
              control: ControlType.LocationSelector,
              order: 1,
            },
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        questions: {
          ['someExistingId']: {
            id,
            title: undefined,
            description: undefined,
            attributeType: undefined,
            label: undefined,
            required: true,
            type: Type.String,
            control: ControlType.LocationSelector,
            order: 1,
          },
          [id]: {
            id,
            title: undefined,
            description: undefined,
            attributeType: undefined,
            label: undefined,
            required: true,
            type: Type.String,
            control: ControlType.LocationSelector,
            order: 2,
          },
        },
      })
    })

    it('should update the location selector question and leave other properties in tact', () => {
      const id = 'someId'
      const title = 'someNewTitle'
      const label = 'someNewLabel'
      const description = 'someNewDescription'
      const attributeType = 'someNewAttributeType'

      // given .. we have an action of type EditEntityAttestationActions.UpdateLocationSelectorQuestion
      const action: UpdateLocationSelectorQuestionAction = {
        type: EditEntityAttestationActions.UpdateLocationSelectorQuestion,
        payload: {
          id,
          title,
          label,
          description,
          attributeType,
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
              attributeType: 'someOldAttributeType',
              required: true,
              type: Type.String,
              control: ControlType.LocationSelector,
              order: 20,
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
            attributeType,
            required: true,
            type: Type.String,
            control: ControlType.LocationSelector,
            order: 20,
          },
        },
      })
    })
  })

  describe('QRCode Actions', () => {
    it('should add a new qr code question and set the correct order', () => {
      const id = 'someId'

      // given ... we have an action of type EditEntityAttestationActions.AddQRCodeQuestion
      const action: AddQRCodeQuestionAction = {
        type: EditEntityAttestationActions.AddQRCodeQuestion,
        payload: {
          id,
          title: undefined,
          description: undefined,
          attributeType: undefined,
          label: undefined,
          required: true,
          type: Type.String,
          control: ControlType.QRCode,
          initialValue: undefined,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          questions: {
            ['someExistingId']: {
              id,
              title: undefined,
              description: undefined,
              attributeType: undefined,
              label: undefined,
              required: true,
              type: Type.String,
              control: ControlType.QRCode,
              initialValue: 'https://www.something.com/',
              order: 1,
            },
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        questions: {
          ['someExistingId']: {
            id,
            title: undefined,
            description: undefined,
            attributeType: undefined,
            label: undefined,
            required: true,
            type: Type.String,
            control: ControlType.QRCode,
            initialValue: 'https://www.something.com/',
            order: 1,
          },
          [id]: {
            id,
            title: undefined,
            description: undefined,
            attributeType: undefined,
            label: undefined,
            required: true,
            type: Type.String,
            control: ControlType.QRCode,
            initialValue: undefined,
            order: 2,
          },
        },
      })
    })

    it('should update the qr code question and leave other properties in tact', () => {
      const id = 'someId'
      const title = 'someNewTitle'
      const label = 'someNewLabel'
      const description = 'someNewDescription'
      const attributeType = 'someNewAttributeType'
      const initialValue = 'https://www.somenewurl.com/'

      // given .. we have an action of type EditEntityAttestationActions.UpdateLocationSelectorQuestion
      const action: UpdateQRCodeQuestionAction = {
        type: EditEntityAttestationActions.UpdateQRCodeQuestion,
        payload: {
          id,
          title,
          label,
          description,
          attributeType,
          initialValue,
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
              attributeType: 'someOldAttributeType',
              initialValue: 'https://www.someoldurl.com/',
              required: true,
              type: Type.String,
              control: ControlType.QRCode,
              order: 20,
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
            attributeType,
            initialValue,
            required: true,
            type: Type.String,
            control: ControlType.QRCode,
            order: 20,
          },
        },
      })
    })
  })

  describe('QRCodeScan Actions', () => {
    it('should add a new qr code question scan and set the correct order', () => {
      const id = 'someId'

      // given ... we have an action of type EditEntityAttestationActions.AddQRCodeScanQuestion
      const action: AddQRCodeScanQuestionAction = {
        type: EditEntityAttestationActions.AddQRCodeScanQuestion,
        payload: {
          id,
          title: undefined,
          description: undefined,
          attributeType: undefined,
          label: undefined,
          placeholder: 'Waiting for data...',
          required: true,
          type: Type.String,
          control: ControlType.QRCodeScan,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          questions: {
            ['someExistingId']: {
              id,
              title: undefined,
              description: undefined,
              attributeType: undefined,
              label: undefined,
              placeholder: 'Waiting for data...',
              required: true,
              type: Type.String,
              control: ControlType.QRCodeScan,
              order: 1,
            },
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        questions: {
          ['someExistingId']: {
            id,
            title: undefined,
            description: undefined,
            attributeType: undefined,
            label: undefined,
            placeholder: 'Waiting for data...',
            required: true,
            type: Type.String,
            control: ControlType.QRCodeScan,
            order: 1,
          },
          [id]: {
            id,
            title: undefined,
            description: undefined,
            attributeType: undefined,
            label: undefined,
            placeholder: 'Waiting for data...',
            required: true,
            type: Type.String,
            control: ControlType.QRCodeScan,
            order: 2,
          },
        },
      })
    })

    it('should update the qr code question and leave other properties in tact', () => {
      const id = 'someId'
      const title = 'someNewTitle'
      const label = 'someNewLabel'
      const description = 'someNewDescription'
      const attributeType = 'someNewAttributeType'

      // given .. we have an action of type EditEntityAttestationActions.UpdateQRCodeScanQuestion
      const action: UpdateQRCodeScanQuestionAction = {
        type: EditEntityAttestationActions.UpdateQRCodeScanQuestion,
        payload: {
          id,
          title,
          label,
          description,
          attributeType,
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
              attributeType: 'someOldAttributeType',
              required: true,
              type: Type.String,
              control: ControlType.QRCodeScan,
              order: 20,
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
            attributeType,
            required: true,
            type: Type.String,
            control: ControlType.QRCodeScan,
            order: 20,
          },
        },
      })
    })
  })

  describe('Rating Actions', () => {
    it('should add a new rating question and set the correct order', () => {
      const id = 'someId'

      // given ... we have an action of type EditEntityAttestationActions.AddRatingQuestion
      const action: AddRatingQuestionAction = {
        type: EditEntityAttestationActions.AddRatingQuestion,
        payload: {
          id,
          title: undefined,
          description: undefined,
          attributeType: undefined,
          label: undefined,
          required: true,
          type: Type.Number,
          control: ControlType.Rating,
          values: undefined,
          inline: true,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          questions: {
            ['someExistingId']: {
              id,
              title: undefined,
              description: undefined,
              attributeType: undefined,
              label: undefined,
              required: true,
              type: Type.Number,
              control: ControlType.Rating,
              values: ['1', '2', '3', '4', '5'],
              inline: true,
              order: 1,
            },
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        questions: {
          ['someExistingId']: {
            id,
            title: undefined,
            description: undefined,
            attributeType: undefined,
            label: undefined,
            required: true,
            type: Type.Number,
            control: ControlType.Rating,
            values: ['1', '2', '3', '4', '5'],
            inline: true,
            order: 1,
          },
          [id]: {
            id,
            title: undefined,
            description: undefined,
            attributeType: undefined,
            label: undefined,
            required: true,
            type: Type.Number,
            control: ControlType.Rating,
            values: undefined,
            inline: true,
            order: 2,
          },
        },
      })
    })

    it('should update the rating question and leave other properties in tact', () => {
      const id = 'someId'
      const title = 'someNewTitle'
      const label = 'someNewLabel'
      const description = 'someNewDescription'
      const attributeType = 'someNewAttributeType'
      const values = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

      // given .. we have an action of type EditEntityAttestationActions.UpdateLocationSelectorQuestion
      const action: UpdateRatingQuestionAction = {
        type: EditEntityAttestationActions.UpdateRatingQuestion,
        payload: {
          id,
          title,
          label,
          description,
          attributeType,
          values,
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
              attributeType: 'someOldAttributeType',
              required: true,
              type: Type.Number,
              control: ControlType.Rating,
              values: ['1', '2', '3', '4'],
              inline: true,
              order: 20,
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
            attributeType,
            required: true,
            type: Type.Number,
            control: ControlType.Rating,
            values,
            inline: true,
            order: 20,
          },
        },
      })
    })
  })

  describe('CheckBoxes Actions', () => {
    it('should add a new checkboxes question and set the correct order', () => {
      const id = 'someId'

      // given ... we have an action of type EditEntityAttestationActions.AddCheckBoxesQuestion
      const action: AddCheckBoxesQuestionAction = {
        type: EditEntityAttestationActions.AddCheckBoxesQuestion,
        payload: {
          id,
          title: undefined,
          description: undefined,
          attributeType: undefined,
          label: undefined,
          required: true,
          type: Type.Array,
          control: ControlType.CheckBoxes,
          itemValues: [],
          itemLabels: [],
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          questions: {
            ['someExistingId']: {
              id,
              title: undefined,
              description: undefined,
              attributeType: undefined,
              label: undefined,
              required: true,
              type: Type.Array,
              control: ControlType.CheckBoxes,
              itemValues: ['Option1', 'Option2', 'Option3'],
              itemLabels: ['Option1', 'Option2', 'Option3'],
              order: 1,
            },
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        questions: {
          ['someExistingId']: {
            id,
            title: undefined,
            description: undefined,
            attributeType: undefined,
            label: undefined,
            required: true,
            type: Type.Array,
            control: ControlType.CheckBoxes,
            itemValues: ['Option1', 'Option2', 'Option3'],
            itemLabels: ['Option1', 'Option2', 'Option3'],
            order: 1,
          },
          [id]: {
            id,
            title: undefined,
            description: undefined,
            attributeType: undefined,
            label: undefined,
            required: true,
            type: Type.Array,
            control: ControlType.CheckBoxes,
            itemValues: [],
            itemLabels: [],
            order: 2,
          },
        },
      })
    })

    it('should update the checkboxes question and leave other properties in tact', () => {
      const id = 'someId'
      const title = 'someNewTitle'
      const label = 'someNewLabel'
      const description = 'someNewDescription'
      const attributeType = 'someNewAttributeType'
      const itemValues = ['Option1', 'Option2', 'Option3', 'A New Option']
      const itemLabels = ['Option1', 'Option2', 'Option3', 'A New Option']
      const minItems = 1
      const maxItems = 3

      // given .. we have an action of type EditEntityAttestationActions.UpdateLocationSelectorQuestion
      const action: UpdateCheckBoxesQuestionAction = {
        type: EditEntityAttestationActions.UpdateCheckBoxesQuestion,
        payload: {
          id,
          title,
          label,
          description,
          attributeType,
          itemValues,
          itemLabels,
          minItems,
          maxItems,
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
              attributeType: 'someOldAttributeType',
              required: true,
              type: Type.Array,
              control: ControlType.CheckBoxes,
              itemValues: ['Option1', 'Option2', 'Option3'],
              itemLabels: ['Option1', 'Option2', 'Option3'],
              minItems: 2,
              maxItems: 4,
              order: 20,
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
            attributeType,
            required: true,
            type: Type.Array,
            control: ControlType.CheckBoxes,
            itemValues,
            itemLabels,
            minItems,
            maxItems,
            order: 20,
          },
        },
      })
    })
  })

  describe('Required Actions', () => {
    it('should set required flag', () => {
      const id = 'someId'
      const required = true
      // given ... we have an action of type EditEntityAttestationActions.UpdateAnswerRequired
      const action: UpdateAnswerRequiredAction = {
        type: EditEntityAttestationActions.UpdateAnswerRequired,
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
              attributeType: 'someExistingAttributeType',
              required: false,
              type: Type.String,
              control: ControlType.TextArea,
              placeholder: 'Start Typing here',
              order: 10,
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
            attributeType: 'someExistingAttributeType',
            required: true,
            type: Type.String,
            control: ControlType.TextArea,
            placeholder: 'Start Typing here',
            order: 10,
          },
        },
      })
    })
  })

  describe('Remove Actions', () => {
    it('should remove the question and decrement the existing questions order', () => {
      const id = 'someId'
      // given ... we have an action of type EditEntityAttestationActions.RemoveQuestion
      const action: RemoveQuestionAction = {
        type: EditEntityAttestationActions.RemoveQuestion,
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
              attributeType: 'someExistingAttributeType',
              required: false,
              type: Type.String,
              control: ControlType.TextArea,
              placeholder: 'Start Typing here',
              order: 1,
            },
            ['anotherid']: {
              id: 'anotherid',
              title: 'anotherExistingTitle',
              label: 'anotherExistingLabel',
              description: 'anotherExistingDescription',
              attributeType: 'anoterExistingAttributeType',
              required: false,
              type: Type.String,
              control: ControlType.TextArea,
              placeholder: 'Start Typing here',
              order: 2,
            },
            ['andanotherid']: {
              id: 'andanotherid',
              title: 'anotherExistingTitle',
              label: 'anotherExistingLabel',
              description: 'anotherExistingDescription',
              attributeType: 'anoterExistingAttributeType',
              required: false,
              type: Type.String,
              control: ControlType.TextArea,
              placeholder: 'Start Typing here',
              order: 3,
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
            id: 'anotherid',
            title: 'anotherExistingTitle',
            label: 'anotherExistingLabel',
            description: 'anotherExistingDescription',
            attributeType: 'anoterExistingAttributeType',
            required: false,
            type: Type.String,
            control: ControlType.TextArea,
            placeholder: 'Start Typing here',
            order: 1,
          },
          ['andanotherid']: {
            id: 'andanotherid',
            title: 'anotherExistingTitle',
            label: 'anotherExistingLabel',
            description: 'anotherExistingDescription',
            attributeType: 'anoterExistingAttributeType',
            required: false,
            type: Type.String,
            control: ControlType.TextArea,
            placeholder: 'Start Typing here',
            order: 2,
          },
        },
      })
    })
  })

  describe('Copy Actions', () => {
    it('should copy the question and set the order to 1 above the question and increment the questions with numbers greater than the copied question number', () => {
      const newId = 'someId'
      const idToCopy = 'someExistingId'

      // given ... we have an action of type EditEntityAttestationActions.RemoveQuestion
      const action: CopyQuestionAction = {
        type: EditEntityAttestationActions.CopyQuestion,
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
              attributeType: 'someAttributeTypeToCopy',
              required: false,
              type: Type.String,
              control: ControlType.TextArea,
              placeholder: 'Start Typing here',
              order: 1,
            },
            ['anotherid']: {
              id: 'anotherid',
              title: 'someQuestionToCopyTitle',
              label: 'someQuestionToCopyLabel',
              description: 'someQuestionToCopyDescription',
              attributeType: 'someAttributeTypeToCopy',
              required: false,
              type: Type.String,
              control: ControlType.TextArea,
              placeholder: 'Start Typing here',
              order: 2,
            },
            ['andanotherid']: {
              id: 'andanotherid',
              title: 'someQuestionToCopyTitle',
              label: 'someQuestionToCopyLabel',
              description: 'someQuestionToCopyDescription',
              attributeType: 'someAttributeTypeToCopy',
              required: false,
              type: Type.String,
              control: ControlType.TextArea,
              placeholder: 'Start Typing here',
              order: 3,
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
            attributeType: 'someAttributeTypeToCopy',
            required: false,
            type: Type.String,
            control: ControlType.TextArea,
            placeholder: 'Start Typing here',
            order: 1,
          },
          ['anotherid']: {
            id: 'anotherid',
            title: 'someQuestionToCopyTitle',
            label: 'someQuestionToCopyLabel',
            description: 'someQuestionToCopyDescription',
            attributeType: 'someAttributeTypeToCopy',
            required: false,
            type: Type.String,
            control: ControlType.TextArea,
            placeholder: 'Start Typing here',
            order: 3,
          },
          ['andanotherid']: {
            id: 'andanotherid',
            title: 'someQuestionToCopyTitle',
            label: 'someQuestionToCopyLabel',
            description: 'someQuestionToCopyDescription',
            attributeType: 'someAttributeTypeToCopy',
            required: false,
            type: Type.String,
            control: ControlType.TextArea,
            placeholder: 'Start Typing here',
            order: 4,
          },
          [newId]: {
            id: newId,
            title: 'someQuestionToCopyTitle',
            label: 'someQuestionToCopyLabel',
            description: 'someQuestionToCopyDescription',
            attributeType: 'someAttributeTypeToCopy',
            required: false,
            type: Type.String,
            control: ControlType.TextArea,
            placeholder: 'Start Typing here',
            order: 2,
          },
        },
      })
    })
  })

  describe('Move Actions', () => {
    it('should swap the order of the from and to indexes of the questions', () => {
      const fromId = 'someFromId'
      const toId = 'someToId'

      // given ... we have an action of type EditEntityAttestationActions.RemoveQuestion
      const action: MoveQuestionAction = {
        type: EditEntityAttestationActions.MoveQuestion,
        payload: {
          fromId,
          toId,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          questions: {
            [fromId]: {
              id: fromId,
              title: 'someQuestionToCopyTitle',
              label: 'someQuestionToCopyLabel',
              description: 'someQuestionToCopyDescription',
              attributeType: 'someAttributeTypeToCopy',
              required: false,
              type: Type.String,
              control: ControlType.TextArea,
              placeholder: 'Start Typing here',
              order: 1,
            },
            ['anotherid']: {
              id: 'anotherid',
              title: 'someQuestionToCopyTitle',
              label: 'someQuestionToCopyLabel',
              description: 'someQuestionToCopyDescription',
              attributeType: 'someAttributeTypeToCopy',
              required: false,
              type: Type.String,
              control: ControlType.TextArea,
              placeholder: 'Start Typing here',
              order: 2,
            },
            [toId]: {
              id: toId,
              title: 'someQuestionToCopyTitle',
              label: 'someQuestionToCopyLabel',
              description: 'someQuestionToCopyDescription',
              attributeType: 'someAttributeTypeToCopy',
              required: false,
              type: Type.String,
              control: ControlType.TextArea,
              placeholder: 'Start Typing here',
              order: 3,
            },
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        questions: {
          [fromId]: {
            id: fromId,
            title: 'someQuestionToCopyTitle',
            label: 'someQuestionToCopyLabel',
            description: 'someQuestionToCopyDescription',
            attributeType: 'someAttributeTypeToCopy',
            required: false,
            type: Type.String,
            control: ControlType.TextArea,
            placeholder: 'Start Typing here',
            order: 3,
          },
          ['anotherid']: {
            id: 'anotherid',
            title: 'someQuestionToCopyTitle',
            label: 'someQuestionToCopyLabel',
            description: 'someQuestionToCopyDescription',
            attributeType: 'someAttributeTypeToCopy',
            required: false,
            type: Type.String,
            control: ControlType.TextArea,
            placeholder: 'Start Typing here',
            order: 2,
          },
          [toId]: {
            id: toId,
            title: 'someQuestionToCopyTitle',
            label: 'someQuestionToCopyLabel',
            description: 'someQuestionToCopyDescription',
            attributeType: 'someAttributeTypeToCopy',
            required: false,
            type: Type.String,
            control: ControlType.TextArea,
            placeholder: 'Start Typing here',
            order: 1,
          },
        },
      })
    })
  })

  describe('Validation Actions', () => {
    it('should set validated to true and clear any errors', () => {
      const identifier = 'someBodySectionId'
      const errors = ['error1', 'error2']
      // given ... we have an action of type EditEntityAttestationActions.Validated
      const action: ValidatedAction = {
        type: EditEntityAttestationActions.Validated,
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
    // given ... we have an action of type EditEntityPageContentActions.SetValidated
    const action: ValidationErrorAction = {
      type: EditEntityAttestationActions.ValidationError,
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

  describe('NewEntity Actions', () => {
    it('should return initial state if a new entity action type is received', () => {
      // given ... we have an action of type EditEntityActions.NewEntity
      const action: NewEntityAction = {
        type: EditEntityActions.NewEntity,
        payload: {
          entityType: EntityType.Cell,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          claimInfo: {
            shortDescription: 'someDataThatShouldBeCleared',
            title: 'someDataThatShouldBeCleared',
            type: EntityClaimType.UseOfFunds,
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual(initialState)
    })
  })

  describe('EditEntitySuccess Actions', () => {
    it('should return initial state if a EditEntitySuccess type is received', () => {
      // given ... we have an action of type EditEntityActions.EditEntitySuccess
      const action: EditEntitySuccessAction = {
        type: EditEntityActions.EditEntitySuccess,
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          claimInfo: {
            shortDescription: 'someDataThatShouldBeCleared',
            title: 'someDataThatShouldBeCleared',
            type: EntityClaimType.Service,
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual(initialState)
    })
  })
})
