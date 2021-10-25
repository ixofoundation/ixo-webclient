import { v4 } from 'uuid'
jest.mock('uuid')
import * as SUT from './CreateEntityAttestation.actions'
import { CreateEntityAttestationActions } from './types'
import { Type, ControlType } from 'common/components/JsonForm/types'
import mockStore from 'common/redux/mockStore'
// import { EntityClaimType } from 'modules/EntityClaims/types'

let store

beforeEach(() => {
  store = mockStore({
    createEntityAttestation: {
      questions: {
        '8c1debff-3b7d-4bad-9bdd-2b0d7b3dcb6d': {
          id: '8c1debff-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          title: 'someTitle1',
          label: 'someLabel1',
          description: 'someDescription1',
          required: true,
          type: Type.String,
          control: ControlType.Text,
          placeholder: 'Start Typing here',
          order: 3,
        },
        '8c1debff-3b7d-4bad-9bdd-2b0d7b3dcb67': {
          id: '8c1debff-3b7d-4bad-9bdd-2b0d7b3dcb67',
          title: 'someTitle2',
          label: 'someLabel2',
          description: 'someDescription2',
          required: true,
          type: Type.String,
          control: ControlType.Text,
          placeholder: 'Start Typing here',
          order: 1,
        },
        '8c1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d': {
          id: '8c1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          title: 'someTitle3',
          label: 'someLabel3',
          description: 'someDescription3',
          required: true,
          type: Type.String,
          control: ControlType.Text,
          placeholder: 'Start Typing here',
          order: 2,
        },
      },
    },
  })
})

describe('CreateEntityAttestation Actions', () => {
  describe('claimInfo', () => {
    describe('updateClaimInfo', () => {
      it('should update the claimInfo section', () => {
        // given ... some data
        const title = 'someTitle'
        const shortDescription = 'someShortDescription'
        // const type = EntityClaimType.Provenance
        const type = 'Provenance'

        const formData = {
          title,
          shortDescription,
          type,
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
          type,
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
          attributeType: undefined,
          label: 'Short Answer',
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
        const attributeType = 'someAttributeType'
        const label = 'someLabel'

        const formData = {
          title,
          description,
          attributeType,
          label,
        }

        // when ... we call the action
        const action = SUT.updateShortTextQuestion(id, formData)

        // then ... we should expect it to create the action as expected
        expect(action.type).toEqual(
          CreateEntityAttestationActions.UpdateShortTextQuestion,
        )
        expect(action.payload).toEqual({
          id,
          title,
          description,
          label,
          attributeType,
        })
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
          attributeType: undefined,
          label: 'Long Answer',
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
        const attributeType = 'someAttributeType'
        const label = 'someLabel'

        const formData = {
          title,
          description,
          attributeType,
          label,
        }

        // when ... we call the action
        const action = SUT.updateLongTextQuestion(id, formData)

        // then ... we should expect it to create the action as expected
        expect(action.type).toEqual(
          CreateEntityAttestationActions.UpdateLongTextQuestion,
        )
        expect(action.payload).toEqual({
          id,
          title,
          description,
          label,
          attributeType,
        })
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
          attributeType: undefined,
          label: 'Date',
          required: true,
          type: Type.String,
          control: ControlType.SingleDateSelector,
        })
      })
    })

    describe('updatedSingleDateSelectorQuestion', () => {
      it('should update the single date selector question', () => {
        // given ... some data
        const id = 'existingId'
        const title = 'someNewTitle'
        const description = 'someDescription'
        const attributeType = 'someAttributeType'
        const label = 'someLabel'

        const formData = {
          title,
          description,
          attributeType,
          label,
        }

        // when ... we call the action
        const action = SUT.updateSingleDateSelectorQuestion(id, formData)

        // then ... we should expect it to create the action as expected
        expect(action.type).toEqual(
          CreateEntityAttestationActions.UpdateSingleDateSelectorQuestion,
        )
        expect(action.payload).toEqual({
          id,
          title,
          description,
          label,
          attributeType,
        })
      })
    })
  })

  describe('dateRangeSelectorQuestion', () => {
    describe('addDateRangeSelectorQuestion', () => {
      it('should add a new date range selector question', () => {
        // given ... an id
        const id = 'newId'
        v4.mockImplementationOnce(() => id)

        // when ... we call the action
        const action = SUT.addDateRangeSelectorQuestion()

        // then ... we should expect it to create an action with the correct type
        expect(action.type).toEqual(
          CreateEntityAttestationActions.AddDateRangeSelectorQuestion,
        )
        expect(action.payload).toEqual({
          id,
          title: undefined,
          description: undefined,
          attributeType: undefined,
          label: 'Dates',
          required: true,
          type: Type.String,
          control: ControlType.DateRangeSelector,
        })
      })
    })

    describe('updatedDateRangeSelectorQuestion', () => {
      it('should update the date range selector question', () => {
        // given ... some data
        const id = 'existingId'
        const title = 'someNewTitle'
        const description = 'someDescription'
        const attributeType = 'someAttributeType'
        const label = 'someLabel'

        const formData = {
          title,
          description,
          attributeType,
          label,
        }

        // when ... we call the action
        const action = SUT.updateDateRangeSelectorQuestion(id, formData)

        // then ... we should expect it to create the action as expected
        expect(action.type).toEqual(
          CreateEntityAttestationActions.UpdateDateRangeSelectorQuestion,
        )
        expect(action.payload).toEqual({
          id,
          title,
          description,
          label,
          attributeType,
        })
      })
    })
  })

  describe('avatarUploadQuestion', () => {
    describe('addAvatarUploadQuestion', () => {
      it('should add a new avatar question', () => {
        // given ... an id
        const id = 'newId'
        v4.mockImplementationOnce(() => id)

        // when ... we call the action
        const action = SUT.addAvatarUploadQuestion()

        // then ... we should expect it to create an action with the correct type
        expect(action.type).toEqual(
          CreateEntityAttestationActions.AddAvatarUploadQuestion,
        )
        expect(action.payload).toEqual({
          id,
          title: undefined,
          description: undefined,
          attributeType: undefined,
          label: 'Select Avatar Image to Upload',
          required: true,
          type: Type.String,
          control: ControlType.AvatarUpload,
        })
      })
    })

    describe('updateAvatarUploadQuestion', () => {
      it('should update the avatar question', () => {
        // given ... some data
        const id = 'existingId'
        const title = 'someNewTitle'
        const description = 'someDescription'
        const attributeType = 'someAttributeType'
        const label = 'someLabel'

        const formData = {
          title,
          description,
          attributeType,
          label,
        }

        // when ... we call the action
        const action = SUT.updateAvatarUploadQuestion(id, formData)

        // then ... we should expect it to create the action as expected
        expect(action.type).toEqual(
          CreateEntityAttestationActions.UpdateAvatarUploadQuestion,
        )
        expect(action.payload).toEqual({
          id,
          title,
          description,
          label,
          attributeType,
        })
      })
    })
  })

  describe('imageUploadQuestion', () => {
    describe('addImageUploadQuestion', () => {
      it('should add a new image question', () => {
        // given ... an id
        const id = 'newId'
        v4.mockImplementationOnce(() => id)

        // when ... we call the action
        const action = SUT.addImageUploadQuestion()

        // then ... we should expect it to create an action with the correct type
        expect(action.type).toEqual(
          CreateEntityAttestationActions.AddImageUploadQuestion,
        )
        expect(action.payload).toEqual({
          id,
          title: undefined,
          description: undefined,
          attributeType: undefined,
          label: 'Select Image to Upload',
          required: true,
          type: Type.String,
          control: ControlType.ImageUpload,
        })
      })
    })

    describe('updateImageUploadQuestion', () => {
      it('should update the image question', () => {
        // given ... some data
        const id = 'existingId'
        const title = 'someNewTitle'
        const description = 'someDescription'
        const attributeType = 'someAttributeType'
        const label = 'someLabel'

        const formData = {
          title,
          description,
          attributeType,
          label,
        }

        // when ... we call the action
        const action = SUT.updateImageUploadQuestion(id, formData)

        // then ... we should expect it to create the action as expected
        expect(action.type).toEqual(
          CreateEntityAttestationActions.UpdateImageUploadQuestion,
        )
        expect(action.payload).toEqual({
          id,
          title,
          description,
          label,
          attributeType,
        })
      })
    })
  })

  describe('videoUploadQuestion', () => {
    describe('addVideoUploadQuestion', () => {
      it('should add a new video question', () => {
        // given ... an id
        const id = 'newId'
        v4.mockImplementationOnce(() => id)

        // when ... we call the action
        const action = SUT.addVideoUploadQuestion()

        // then ... we should expect it to create an action with the correct type
        expect(action.type).toEqual(
          CreateEntityAttestationActions.AddVideoUploadQuestion,
        )
        expect(action.payload).toEqual({
          id,
          title: undefined,
          description: undefined,
          attributeType: undefined,
          label: 'Select Video to Upload',
          required: true,
          type: Type.String,
          control: ControlType.VideoUpload,
        })
      })
    })

    describe('updateVideoUploadQuestion', () => {
      it('should update the video question', () => {
        // given ... some data
        const id = 'existingId'
        const title = 'someNewTitle'
        const description = 'someDescription'
        const attributeType = 'someAttributeType'
        const label = 'someLabel'

        const formData = {
          title,
          description,
          attributeType,
          label,
        }

        // when ... we call the action
        const action = SUT.updateVideoUploadQuestion(id, formData)

        // then ... we should expect it to create the action as expected
        expect(action.type).toEqual(
          CreateEntityAttestationActions.UpdateVideoUploadQuestion,
        )
        expect(action.payload).toEqual({
          id,
          title,
          description,
          label,
          attributeType,
        })
      })
    })
  })

  describe('audioUploadQuestion', () => {
    describe('addAudioUploadQuestion', () => {
      it('should add a new audio question', () => {
        // given ... an id
        const id = 'newId'
        v4.mockImplementationOnce(() => id)

        // when ... we call the action
        const action = SUT.addAudioUploadQuestion()

        // then ... we should expect it to create an action with the correct type
        expect(action.type).toEqual(
          CreateEntityAttestationActions.AddAudioUploadQuestion,
        )
        expect(action.payload).toEqual({
          id,
          title: undefined,
          description: undefined,
          attributeType: undefined,
          label: 'Select Audio Clip to Upload',
          required: true,
          type: Type.String,
          control: ControlType.AudioUpload,
        })
      })
    })

    describe('updateAudioUploadQuestion', () => {
      it('should update the audio question', () => {
        // given ... some data
        const id = 'existingId'
        const title = 'someNewTitle'
        const description = 'someDescription'
        const attributeType = 'someAttributeType'
        const label = 'someLabel'

        const formData = {
          title,
          description,
          attributeType,
          label,
        }

        // when ... we call the action
        const action = SUT.updateAudioUploadQuestion(id, formData)

        // then ... we should expect it to create the action as expected
        expect(action.type).toEqual(
          CreateEntityAttestationActions.UpdateAudioUploadQuestion,
        )
        expect(action.payload).toEqual({
          id,
          title,
          description,
          label,
          attributeType,
        })
      })
    })
  })

  describe('documentUploadQuestion', () => {
    describe('addDocumentUploadQuestion', () => {
      it('should add a new document question', () => {
        // given ... an id
        const id = 'newId'
        v4.mockImplementationOnce(() => id)

        // when ... we call the action
        const action = SUT.addDocumentUploadQuestion()

        // then ... we should expect it to create an action with the correct type
        expect(action.type).toEqual(
          CreateEntityAttestationActions.AddDocumentUploadQuestion,
        )
        expect(action.payload).toEqual({
          id,
          title: undefined,
          description: undefined,
          attributeType: undefined,
          label: 'Select Document to Upload',
          required: true,
          type: Type.String,
          control: ControlType.DocumentUpload,
        })
      })
    })

    describe('updateDocumentUploadQuestion', () => {
      it('should update the document question', () => {
        // given ... some data
        const id = 'existingId'
        const title = 'someNewTitle'
        const description = 'someDescription'
        const attributeType = 'someAttributeType'
        const label = 'someLabel'

        const formData = {
          title,
          description,
          attributeType,
          label,
        }

        // when ... we call the action
        const action = SUT.updateDocumentUploadQuestion(id, formData)

        // then ... we should expect it to create the action as expected
        expect(action.type).toEqual(
          CreateEntityAttestationActions.UpdateDocumentUploadQuestion,
        )
        expect(action.payload).toEqual({
          id,
          title,
          description,
          label,
          attributeType,
        })
      })
    })
  })

  describe('locationSelectorQuestion', () => {
    describe('addLocationSelectorQuestion', () => {
      it('should add a new location selector question', () => {
        // given ... an id
        const id = 'newId'
        v4.mockImplementationOnce(() => id)

        // when ... we call the action
        const action = SUT.addLocationSelectorQuestion()

        // then ... we should expect it to create an action with the correct type
        expect(action.type).toEqual(
          CreateEntityAttestationActions.AddLocationSelectorQuestion,
        )
        expect(action.payload).toEqual({
          id,
          title: undefined,
          description: undefined,
          attributeType: undefined,
          label: 'Location',
          required: true,
          type: Type.String,
          control: ControlType.LocationSelector,
        })
      })
    })

    describe('updateLocationSelectorQuestion', () => {
      it('should update the location selector question', () => {
        // given ... some data
        const id = 'existingId'
        const title = 'someNewTitle'
        const description = 'someDescription'
        const attributeType = 'someAttributeType'
        const label = 'someLabel'

        const formData = {
          title,
          description,
          attributeType,
          label,
        }

        // when ... we call the action
        const action = SUT.updateLocationSelectorQuestion(id, formData)

        // then ... we should expect it to create the action as expected
        expect(action.type).toEqual(
          CreateEntityAttestationActions.UpdateLocationSelectorQuestion,
        )
        expect(action.payload).toEqual({
          id,
          title,
          description,
          label,
          attributeType,
        })
      })
    })
  })

  describe('qrCodeQuestion', () => {
    describe('addQRCodeQuestion', () => {
      it('should add a new qrcode question', () => {
        // given ... an id
        const id = 'newId'
        v4.mockImplementationOnce(() => id)

        // when ... we call the action
        const action = SUT.addQRCodeQuestion()

        // then ... we should expect it to create an action with the correct type
        expect(action.type).toEqual(
          CreateEntityAttestationActions.AddQRCodeQuestion,
        )
        expect(action.payload).toEqual({
          id,
          title: undefined,
          description: undefined,
          attributeType: undefined,
          label: 'QR Code',
          required: true,
          type: Type.String,
          control: ControlType.QRCode,
          initialValue: undefined,
        })
      })
    })

    describe('updateQRCodeQuestion', () => {
      it('should update the qr code question', () => {
        // given ... some data
        const id = 'existingId'
        const title = 'someNewTitle'
        const description = 'someDescription'
        const attributeType = 'someAttributeType'
        const label = 'someLabel'
        const initialValue = 'https://www.someurl.com/'

        const formData = {
          title,
          description,
          attributeType,
          label,
          initialValue,
        }

        // when ... we call the action
        const action = SUT.updateQRCodeQuestion(id, formData)

        // then ... we should expect it to create the action as expected
        expect(action.type).toEqual(
          CreateEntityAttestationActions.UpdateQRCodeQuestion,
        )
        expect(action.payload).toEqual({
          id,
          title,
          description,
          attributeType,
          label,
          initialValue,
        })
      })
    })
  })

  describe('qrCodeScanQuestion', () => {
    describe('addQRCodeScanQuestion', () => {
      it('should add a new qrcodescan question', () => {
        // given ... an id
        const id = 'newId'
        v4.mockImplementationOnce(() => id)

        // when ... we call the action
        const action = SUT.addQRCodeScanQuestion()

        // then ... we should expect it to create an action with the correct type
        expect(action.type).toEqual(
          CreateEntityAttestationActions.AddQRCodeScanQuestion,
        )
        expect(action.payload).toEqual({
          id,
          title: undefined,
          description: undefined,
          attributeType: undefined,
          label: 'Scan QR Code',
          placeholder: 'Waiting for data...',
          required: true,
          type: Type.String,
          control: ControlType.QRCodeScan,
        })
      })
    })

    describe('updateQRCodeScanQuestion', () => {
      it('should update the qrcodescan question', () => {
        // given ... some data
        const id = 'existingId'
        const title = 'someNewTitle'
        const description = 'someDescription'
        const attributeType = 'someAttributeType'
        const label = 'someLabel'

        const formData = {
          title,
          description,
          attributeType,
          label,
        }

        // when ... we call the action
        const action = SUT.updateQRCodeScanQuestion(id, formData)

        // then ... we should expect it to create the action as expected
        expect(action.type).toEqual(
          CreateEntityAttestationActions.UpdateQRCodeScanQuestion,
        )
        expect(action.payload).toEqual({
          id,
          title,
          description,
          attributeType,
          label,
        })
      })
    })
  })

  describe('ratingQuestion', () => {
    describe('addRatingQuestion', () => {
      it('should add a new rating question', () => {
        // given ... an id
        const id = 'newId'
        v4.mockImplementationOnce(() => id)

        // when ... we call the action
        const action = SUT.addRatingQuestion()

        // then ... we should expect it to create an action with the correct type
        expect(action.type).toEqual(
          CreateEntityAttestationActions.AddRatingQuestion,
        )
        expect(action.payload).toEqual({
          id,
          title: undefined,
          description: undefined,
          attributeType: undefined,
          label: 'Rating',
          required: true,
          type: Type.String,
          control: ControlType.Rating,
          values: undefined,
          inline: true,
        })
      })
    })

    describe('updateRatingQuestion', () => {
      it('should update the rating question when scale has a value', () => {
        // given ... some data
        const id = 'existingId'
        const title = 'someNewTitle'
        const description = 'someDescription'
        const attributeType = 'someAttributeType'
        const label = 'someLabel'
        const scale = 10

        const formData = {
          title,
          description,
          attributeType,
          label,
          scale,
        }

        // when ... we call the action
        const action = SUT.updateRatingQuestion(id, formData)

        // then ... we should expect it to create the action as expected
        expect(action.type).toEqual(
          CreateEntityAttestationActions.UpdateRatingQuestion,
        )
        expect(action.payload).toEqual({
          id,
          title,
          description,
          attributeType,
          label,
          values: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        })
      })

      it('should update the rating question when scale does not have a value', () => {
        // given ... some data
        const id = 'existingId'
        const title = 'someNewTitle'
        const description = 'someDescription'
        const attributeType = 'someAttributeType'
        const label = 'someLabel'
        const scale = undefined

        const formData = {
          title,
          description,
          attributeType,
          label,
          scale,
        }

        // when ... we call the action
        const action = SUT.updateRatingQuestion(id, formData)

        // then ... we should expect it to create the action as expected
        expect(action.type).toEqual(
          CreateEntityAttestationActions.UpdateRatingQuestion,
        )
        expect(action.payload).toEqual({
          id,
          title,
          description,
          attributeType,
          label,
          values: undefined,
        })
      })
    })
  })

  describe('checkboxesQuestion', () => {
    describe('addCheckBoxesQuestion', () => {
      it('should add a new checkboxes question', () => {
        // given ... an id
        const id = 'newId'
        v4.mockImplementationOnce(() => id)

        // when ... we call the action
        const action = SUT.addCheckBoxesQuestion()

        // then ... we should expect it to create an action with the correct type
        expect(action.type).toEqual(
          CreateEntityAttestationActions.AddCheckBoxesQuestion,
        )
        expect(action.payload).toEqual({
          id,
          title: undefined,
          description: undefined,
          attributeType: undefined,
          label: 'Select Options',
          required: true,
          type: Type.Array,
          control: ControlType.CheckBoxes,
          itemValues: [],
          itemLabels: [],
        })
      })
    })

    describe('updateCheckBoxesQuestion', () => {
      it('should update the checkboxes question', () => {
        // given ... some data
        const id = 'existingId'
        const title = 'someNewTitle'
        const description = 'someDescription'
        const attributeType = 'someAttributeType'
        const label = 'someLabel'
        const itemValues = ['Option1', 'Option2', 'Option3']
        const minItems = 1
        const maxItems = 3

        const formData = {
          title,
          description,
          attributeType,
          label,
          itemValues,
          minItems,
          maxItems,
        }

        // when ... we call the action
        const action = SUT.updateCheckBoxesQuestion(id, formData)

        // then ... we should expect it to create the action as expected
        expect(action.type).toEqual(
          CreateEntityAttestationActions.UpdateCheckBoxesQuestion,
        )
        expect(action.payload).toEqual({
          id,
          title,
          description,
          attributeType,
          label,
          itemValues,
          itemLabels: itemValues,
          minItems,
          maxItems,
        })
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

  describe('moveQuestion', () => {
    it('should move the question', async () => {
      // given ... an id and an index
      const id = '8c1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
      const toIndex = 2 // order at 3

      // when ... we call the moveQuestion action creator
      await store.dispatch(SUT.moveQuestion(id, toIndex))
      const actions = store.getActions()

      // then ... it should dispatch the correct action
      expect(actions.length).toEqual(1)
      expect(actions[0].type).toEqual(
        CreateEntityAttestationActions.MoveQuestion,
      )
      expect(actions[0].payload).toEqual({
        fromId: '8c1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
        toId: '8c1debff-3b7d-4bad-9bdd-2b0d7b3dcb6d',
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
