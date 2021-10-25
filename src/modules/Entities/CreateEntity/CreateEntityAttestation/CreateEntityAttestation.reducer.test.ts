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
  CreateEntityActions,
  CreateEntitySuccessAction,
} from '../types'
import { EntityType } from '../../types'
// import { EntityClaimType } from 'modules/EntityClaims/types'

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
      // const type = EntityClaimType.Service
      const type = 'Service'

      // given .. we have an action of type CreateEntityPageContentActions.UpdateSocialContent
      const action: UpdateClaimInfoAction = {
        type: CreateEntityAttestationActions.UpdateClaimInfo,
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
            // type: EntityClaimType.Provenance,
            type: 'Provenance',
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

      // given ... we have an action of type CreateEntityAttestationActions.AddShortTextQuestion
      const action: AddShortTextQuestionAction = {
        type: CreateEntityAttestationActions.AddShortTextQuestion,
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

      // given .. we have an action of type CreateEntityAttestationActions.UpdateShortTextQuestion
      const action: UpdateShortTextQuestionAction = {
        type: CreateEntityAttestationActions.UpdateShortTextQuestion,
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

      // given ... we have an action of type CreateEntityAttestationActions.AddLongTextQuestion
      const action: AddLongTextQuestionAction = {
        type: CreateEntityAttestationActions.AddLongTextQuestion,
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

      // given .. we have an action of type CreateEntityAttestationActions.UpdateLongTextQuestion
      const action: UpdateLongTextQuestionAction = {
        type: CreateEntityAttestationActions.UpdateLongTextQuestion,
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

      // given ... we have an action of type CreateEntityAttestationActions.AddSingleDateSelectorQuestion
      const action: AddSingleDateSelectorQuestionAction = {
        type: CreateEntityAttestationActions.AddSingleDateSelectorQuestion,
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

      // given .. we have an action of type CreateEntityAttestationActions.UpdateSingleDateSelectorQuestion
      const action: UpdateSingleDateSelectorQuestionAction = {
        type: CreateEntityAttestationActions.UpdateSingleDateSelectorQuestion,
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

      // given ... we have an action of type CreateEntityAttestationActions.AddDateRangeSelectorQuestion
      const action: AddDateRangeSelectorQuestionAction = {
        type: CreateEntityAttestationActions.AddDateRangeSelectorQuestion,
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

      // given .. we have an action of type CreateEntityAttestationActions.UpdateDateRangeSelectorQuestion
      const action: UpdateDateRangeSelectorQuestionAction = {
        type: CreateEntityAttestationActions.UpdateDateRangeSelectorQuestion,
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

      // given ... we have an action of type CreateEntityAttestationActions.AddAvatarUploadQuestion
      const action: AddAvatarUploadQuestionAction = {
        type: CreateEntityAttestationActions.AddAvatarUploadQuestion,
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

      // given .. we have an action of type CreateEntityAttestationActions.UpdateAvatarUploadQuestion
      const action: UpdateAvatarUploadQuestionAction = {
        type: CreateEntityAttestationActions.UpdateAvatarUploadQuestion,
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

      // given ... we have an action of type CreateEntityAttestationActions.AddImageUploadQuestion
      const action: AddImageUploadQuestionAction = {
        type: CreateEntityAttestationActions.AddImageUploadQuestion,
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

      // given .. we have an action of type CreateEntityAttestationActions.UpdateImageUploadQuestion
      const action: UpdateImageUploadQuestionAction = {
        type: CreateEntityAttestationActions.UpdateImageUploadQuestion,
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

      // given ... we have an action of type CreateEntityAttestationActions.AddVideoUploadQuestion
      const action: AddVideoUploadQuestionAction = {
        type: CreateEntityAttestationActions.AddVideoUploadQuestion,
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

      // given .. we have an action of type CreateEntityAttestationActions.UpdateVideoUploadQuestion
      const action: UpdateVideoUploadQuestionAction = {
        type: CreateEntityAttestationActions.UpdateVideoUploadQuestion,
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

      // given ... we have an action of type CreateEntityAttestationActions.AddAudioUploadQuestion
      const action: AddAudioUploadQuestionAction = {
        type: CreateEntityAttestationActions.AddAudioUploadQuestion,
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

      // given .. we have an action of type CreateEntityAttestationActions.UpdateAudioUploadQuestion
      const action: UpdateAudioUploadQuestionAction = {
        type: CreateEntityAttestationActions.UpdateAudioUploadQuestion,
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

      // given ... we have an action of type CreateEntityAttestationActions.AddDocumentUploadQuestion
      const action: AddDocumentUploadQuestionAction = {
        type: CreateEntityAttestationActions.AddDocumentUploadQuestion,
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

      // given .. we have an action of type CreateEntityAttestationActions.UpdateDocumentUploadQuestion
      const action: UpdateDocumentUploadQuestionAction = {
        type: CreateEntityAttestationActions.UpdateDocumentUploadQuestion,
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

      // given ... we have an action of type CreateEntityAttestationActions.AddLocationSelectorQuestion
      const action: AddLocationSelectorQuestionAction = {
        type: CreateEntityAttestationActions.AddLocationSelectorQuestion,
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

      // given .. we have an action of type CreateEntityAttestationActions.UpdateLocationSelectorQuestion
      const action: UpdateLocationSelectorQuestionAction = {
        type: CreateEntityAttestationActions.UpdateLocationSelectorQuestion,
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

      // given ... we have an action of type CreateEntityAttestationActions.AddQRCodeQuestion
      const action: AddQRCodeQuestionAction = {
        type: CreateEntityAttestationActions.AddQRCodeQuestion,
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

      // given .. we have an action of type CreateEntityAttestationActions.UpdateLocationSelectorQuestion
      const action: UpdateQRCodeQuestionAction = {
        type: CreateEntityAttestationActions.UpdateQRCodeQuestion,
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

      // given ... we have an action of type CreateEntityAttestationActions.AddQRCodeScanQuestion
      const action: AddQRCodeScanQuestionAction = {
        type: CreateEntityAttestationActions.AddQRCodeScanQuestion,
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

      // given .. we have an action of type CreateEntityAttestationActions.UpdateQRCodeScanQuestion
      const action: UpdateQRCodeScanQuestionAction = {
        type: CreateEntityAttestationActions.UpdateQRCodeScanQuestion,
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

      // given ... we have an action of type CreateEntityAttestationActions.AddRatingQuestion
      const action: AddRatingQuestionAction = {
        type: CreateEntityAttestationActions.AddRatingQuestion,
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

      // given .. we have an action of type CreateEntityAttestationActions.UpdateLocationSelectorQuestion
      const action: UpdateRatingQuestionAction = {
        type: CreateEntityAttestationActions.UpdateRatingQuestion,
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

      // given ... we have an action of type CreateEntityAttestationActions.AddCheckBoxesQuestion
      const action: AddCheckBoxesQuestionAction = {
        type: CreateEntityAttestationActions.AddCheckBoxesQuestion,
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

      // given .. we have an action of type CreateEntityAttestationActions.UpdateLocationSelectorQuestion
      const action: UpdateCheckBoxesQuestionAction = {
        type: CreateEntityAttestationActions.UpdateCheckBoxesQuestion,
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

      // given ... we have an action of type CreateEntityAttestationActions.RemoveQuestion
      const action: MoveQuestionAction = {
        type: CreateEntityAttestationActions.MoveQuestion,
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

  describe('NewEntity Actions', () => {
    it('should return initial state if a new entity action type is received', () => {
      // given ... we have an action of type CreateEntityActions.NewEntity
      const action: NewEntityAction = {
        type: CreateEntityActions.NewEntity,
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
            // type: EntityClaimType.UseOfFunds,
            type: 'UseOfFunds',
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual(initialState)
    })
  })

  describe('CreateEntitySuccess Actions', () => {
    it('should return initial state if a CreateEntitySuccess type is received', () => {
      // given ... we have an action of type CreateEntityActions.CreateEntitySuccess
      const action: CreateEntitySuccessAction = {
        type: CreateEntityActions.CreateEntitySuccess,
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          claimInfo: {
            shortDescription: 'someDataThatShouldBeCleared',
            title: 'someDataThatShouldBeCleared',
            // type: EntityClaimType.Service,
            type: 'Service',
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual(initialState)
    })
  })
})
