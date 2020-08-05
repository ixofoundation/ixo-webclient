import React from 'react'
import {
  FormData,
  customControls,
} from '../../../../common/components/JsonForm/types'
import ImageLoader from '../../../../common/components/DropZone/ImageLoader/ImageLoader'
import MultiControlForm from 'src/common/components/JsonForm/MultiControlForm/MultiControlForm'

interface Props {
  title: string
  shortDescription: string
  imageDid: string
  imageDescription: string
  company: string
  sdgs: string[]
  country: string
  uploadingImage: boolean
  handleUpdateContent: (formData: FormData) => void
  handleUploadImage: (base64EncodedImage: string) => void
}

const HeaderCard: React.FunctionComponent<Props> = ({
  title,
  shortDescription,
  imageDescription,
  company,
  country,
  imageDid,
  uploadingImage,
  sdgs,
  handleUpdateContent,
  handleUploadImage,
}) => {
  const formData = {
    title,
    shortDescription,
    sdgs: sdgs.join('|'),
    company,
    country,
    imageDescription,
  }

  const schema = {
    type: 'object',
    required: ['title', 'shortDescription', 'company', 'country'],
    properties: {
      title: { type: 'string', title: 'Title' },
      shortDescription: { type: 'string', title: 'Short Description' },
      company: { type: 'string', title: 'Organisation' },
      country: { type: 'string', title: 'Country' },
      sdgs: { type: 'string', title: 'Tag' },
      imageDescription: { type: 'string', title: 'Header Image Description' },
    },
  } as any

  const uiSchema = {
    title: {
      ['ui:widget']: 'text',
      ['ui:placeholder']: 'Enter Title',
    },
    shortDescription: {
      ['ui:widget']: 'textarea',
      ['ui:placeholder']: 'Start Typing Here',
    },
    company: {
      ['ui:widget']: 'text',
      ['ui:placeholder']: 'Enter Organisation',
    },
    country: {
      ['ui:widget']: customControls['countryselector'],
    },
    sdgs: {
      ['ui:widget']: customControls['sdgselector'],
    },
    imageDescription: {
      ['ui:widget']: 'text',
      ['ui:placeholder']: 'Enter Title',
    },
  }

  return (
    <>
      <div className="justify-content-center">
        <div className="form-group">
          <label className="control-label">
            Header Image<span className="required">*</span>
          </label>
          <ImageLoader
            keepCropSelection={true}
            circularCrop={false}
            aspect={16 / 9}
            uploadedImageSrc={
              imageDid
                ? `${process.env.REACT_APP_PDS_URL}public/${imageDid}`
                : null
            }
            uploading={uploadingImage}
            handleSave={(base64EncodedImage): void =>
              handleUploadImage(base64EncodedImage)
            }
            maxDimension={960}
            previewWidth={960}
          />
        </div>
      </div>
      <div>
        <MultiControlForm
          handleSubmit={(): void => null}
          handleFormDataChange={handleUpdateContent}
          formData={formData}
          schema={schema}
          uiSchema={uiSchema}
        >
          &nbsp;
        </MultiControlForm>
      </div>
    </>
  )
}

export default HeaderCard
