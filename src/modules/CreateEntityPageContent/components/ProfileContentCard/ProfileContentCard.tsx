import React from 'react'
import Form from '@rjsf/core'
import { debounce } from 'debounce'
import { FormContainer } from '../../../../common/components/JsonForm/JsonForm.styles'
import * as formUtils from '../../../../common/components/JsonForm/JsonForm.utils'
import { FormData } from '../../../../common/components/JsonForm/types'
import ImageLoader from '../../../../common/components/DropZone/ImageLoader/ImageLoader'

interface Props {
  name: string
  position: string
  linkedInUrl: string
  twitterUrl: string
  imageDid: string
  uploadingImage: boolean
  handleUpdateContent: (formData: FormData) => void
  handleUploadImage: (base64EncodedImage: string) => void
}

const HeaderCard: React.FunctionComponent<Props> = ({
  name,
  position,
  linkedInUrl,
  twitterUrl,
  imageDid,
  uploadingImage,
  handleUpdateContent,
  handleUploadImage,
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
    title: {
      ['ui:widget']: 'text',
      ['ui:placeholder']: 'Enter Title',
    },
    position: {
      ['ui:widget']: 'text',
      ['ui:placeholder']: 'Enter Title',
    },
    linkedInUrl: {
      ['ui:widget']: 'text',
      ['ui:placeholder']: 'Paste Url',
    },
    twitterUrl: {
      ['ui:widget']: 'text',
      ['ui:placeholder']: 'Paste Url',
    },
  }

  const handleUpdateContentDebounce = debounce(handleUpdateContent, 500)

  return (
    <FormContainer className="row">
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
  )
}

export default HeaderCard
