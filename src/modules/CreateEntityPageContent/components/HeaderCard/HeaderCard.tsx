import React, { useRef } from 'react'
import {
  FormData,
  customControls,
} from '../../../../common/components/JsonForm/types'
import MultiControlForm from 'src/common/components/JsonForm/MultiControlForm/MultiControlForm'

interface Props {
  title: string
  shortDescription: string
  imageSrc: string
  imageDescription: string
  company: string
  sdgs: string[]
  country: string
  uploadingImage: boolean
  handleUpdateContent: (formData: FormData) => void
  handleError: (errors: string[]) => void
}

const HeaderCard: React.FunctionComponent<Props> = ({
  title,
  shortDescription,
  imageDescription,
  company,
  country,
  imageSrc,
  uploadingImage,
  sdgs,
  handleUpdateContent,
  handleError,
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
    required: ['image', 'title', 'shortDescription', 'company', 'country'],
    properties: {
      image: { type: 'string', title: 'Header Image' },
      title: { type: 'string', title: 'Title' },
      shortDescription: { type: 'string', title: 'Short Description' },
      company: { type: 'string', title: 'Organisation' },
      country: { type: 'string', title: 'Country' },
      sdgs: { type: 'string', title: 'Tag' },
      imageDescription: { type: 'string', title: 'Header Image Description' },
    },
  } as any

  const uiSchema = {
    image: {
      ['ui:widget']: customControls['imageupload'],
      ['ui:uploading']: uploadingImage,
      ['ui:imageSrc']: imageSrc,
    },
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

  const multiFormRef = useRef() as any

  return (
    <>
      {/*       <div className="justify-content-center">
        <div className="form-group">
          <label className="control-label">
            Header Image<span className="required">*</span>
          </label>
          <ImageLoader
            keepCropSelection={true}
            circularCrop={false}
            aspect={16 / 9}
            uploadedImageSrc={
              imageSrc
                ? `${process.env.REACT_APP_PDS_URL}public/${imageSrc}`
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
      </div> */}
      <MultiControlForm
        ref={multiFormRef}
        handleSubmit={(): void => console.log('submitted')}
        handleFormDataChange={handleUpdateContent}
        handleError={handleError}
        formData={formData}
        schema={schema}
        uiSchema={uiSchema}
      >
        <div onClick={(): void => multiFormRef.current.validateAndSubmit()}>
          Submit
        </div>
      </MultiControlForm>
    </>
  )
}

export default HeaderCard
