import React from 'react'
import Form from '@rjsf/core'
import { debounce } from 'debounce'
import { FormContainer } from '../../../../common/components/JsonForm/JsonForm.styles'
import * as formUtils from '../../../../common/components/JsonForm/JsonForm.utils'
import FormCardWrapper from '../../../../common/components/Wrappers/FormCardWrapper/FormCardWrapper'
import {
  FormData,
  customControls,
} from '../../../../common/components/JsonForm/types'
import ImageLoader from '../../../../common/components/DropZone/ImageLoader/ImageLoader'

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
    imageDescription,
    company,
    country,
    imageDid,
    uploadingImage,
    sdgs: sdgs[0], // TODO - make this work for multiple SDGS!
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

  const handleUpdateContentDebounce = debounce(handleUpdateContent, 500)

  return (
    <FormCardWrapper
      title="Header Card"
      description="The information in this card displays on the Explorer card."
    >
      <FormContainer className="row">
        <div className="col-lg-6">
          <div className="form-group">
            <label className="control-label">
              Header Image<span className="required">*</span>
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
                handleUploadImage(base64EncodedImage)
              }
              imageWidth={100}
            />
          </div>
        </div>
        <div className="col-lg-6">
          <Form
            formData={formData}
            onChange={(control): void =>
              handleUpdateContentDebounce(control.formData)
            }
            noHtml5Validate
            liveValidate
            showErrorList={false}
            schema={schema}
            uiSchema={uiSchema}
            transformErrors={formUtils.transformErrors}
          >
            &nbsp;
          </Form>
        </div>
      </FormContainer>
    </FormCardWrapper>
  )
}

export default HeaderCard
