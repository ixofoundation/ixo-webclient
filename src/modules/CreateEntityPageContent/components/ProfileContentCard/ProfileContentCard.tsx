import React from 'react'
import {
  FormData,
  customControls,
} from '../../../../common/components/JsonForm/types'
import ImageLoader from '../../../../common/components/DropZone/ImageLoader/ImageLoader'
import { FormWrapper, RemoveButton } from '../PageContent.styles'
import MultiControlForm from 'src/common/components/JsonForm/MultiControlForm/MultiControlForm'

interface Props {
  id: string
  name: string
  position: string
  linkedInUrl: string
  twitterUrl: string
  imageDid: string
  uploadingImage: boolean
  handleUpdateContent: (id: string, formData: FormData) => void
  handleUploadImage: (id: string, base64EncodedImage: string) => void
  handleRemoveSection: (id: string) => void
}

const HeaderCard: React.FunctionComponent<Props> = ({
  id,
  name,
  position,
  linkedInUrl,
  twitterUrl,
  imageDid,
  uploadingImage,
  handleUpdateContent,
  handleUploadImage,
  handleRemoveSection,
}) => {
  const formData = {
    name,
    position,
    linkedInUrl,
    twitterUrl,
  }

  const schema = {
    type: 'object',
    required: ['name', 'position'],
    properties: {
      name: { type: 'string', title: 'Name' },
      position: { type: 'string', title: 'Position' },
      linkedInUrl: { type: 'string', title: 'Linked In' },
      twitterUrl: { type: 'string', title: 'Twitter' },
    },
  } as any

  const uiSchema = {
    name: {
      ['ui:widget']: 'text',
      ['ui:placeholder']: 'Enter Title',
    },
    position: {
      ['ui:widget']: 'text',
      ['ui:placeholder']: 'Enter Title',
    },
    linkedInUrl: {
      ['ui:widget']: customControls['socialtextbox'],
      ['ui:socialIcon']: 'LinkedIn',
      ['ui:placeholder']: 'Paste Url',
    },
    twitterUrl: {
      ['ui:widget']: customControls['socialtextbox'],
      ['ui:socialIcon']: 'Twitter',
      ['ui:placeholder']: 'Paste Url',
    },
  }

  return (
    <div className="row">
      <div className="col-lg-6">
        <div className="form-group">
          <label className="control-label">
            Profile Image<span className="required">*</span>
          </label>
          <ImageLoader
            keepCropSelection={true}
            circularCrop={false}
            uploadedImageSrc={
              imageDid
                ? `${process.env.REACT_APP_PDS_URL}public/${imageDid}`
                : null
            }
            uploading={uploadingImage}
            handleSave={(base64EncodedImage): void =>
              handleUploadImage(id, base64EncodedImage)
            }
            aspect={1}
            maxDimension={440}
            previewWidth={100}
          />
        </div>
      </div>
      <div className="col-lg-6">
        <FormWrapper>
          <MultiControlForm
            handleSubmit={(): void => null}
            handleFormDataChange={(formData): void =>
              handleUpdateContent(id, formData)
            }
            formData={formData}
            schema={schema}
            uiSchema={uiSchema}
          >
            &nbsp;
          </MultiControlForm>
        </FormWrapper>
      </div>
      <div className="col-lg-12 text-right">
        <RemoveButton
          type="button"
          onClick={(): void => handleRemoveSection(id)}
        >
          - Remove
        </RemoveButton>
      </div>
    </div>
  )
}

export default HeaderCard
