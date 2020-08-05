import React from 'react'
import Form from '@rjsf/core'
import { debounce } from 'debounce'
import {
  FormContainer,
  LinkButton,
} from '../../../../common/components/JsonForm/JsonForm.styles'
import * as formUtils from '../../../../common/components/JsonForm/JsonForm.utils'
import { FormData } from '../../../../common/components/JsonForm/types'
import ImageLoader from '../../../../common/components/DropZone/ImageLoader/ImageLoader'

interface Props {
  id: string
  title: string
  content: string
  imageDid: string
  imageDescription: string
  uploadingImage: boolean
  handleUpdateContent: (id: string, formData: FormData) => void
  handleUploadImage: (id: string, base64EncodedImage: string) => void
  handleRemoveSection: (id: string) => void
}

const HeaderCard: React.FunctionComponent<Props> = ({
  id,
  title,
  content,
  imageDid,
  imageDescription,
  uploadingImage,
  handleUpdateContent,
  handleUploadImage,
  handleRemoveSection,
}) => {
  const formData = {
    title,
    content,
    imageDescription,
  }

  const schema = {
    type: 'object',
    required: ['title', 'content'],
    properties: {
      title: { type: 'string', title: 'Title' },
      content: { type: 'string', title: 'Body Content' },
      imageDescription: { type: 'string', title: 'Image Description' },
    },
  } as any

  const uiSchema = {
    title: {
      ['ui:widget']: 'text',
      ['ui:placeholder']: 'Enter Title',
    },
    content: {
      ['ui:widget']: 'textarea',
      ['ui:placeholder']: 'Start Typing Here',
    },
    imageDescription: {
      ['ui:widget']: 'text',
      ['ui:placeholder']: 'Start Typing',
    },
  }

  const handleUpdateContentDebounce = debounce(handleUpdateContent, 500)

  return (
    <FormContainer className="row">
      <div className="col-lg-6">
        <div className="form-group">
          <label className="control-label">
            Image<span className="required">*</span>
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
            imageWidth={100}
          />
        </div>
      </div>
      <div className="col-lg-6">
        <Form
          formData={formData}
          onChange={(control): void =>
            handleUpdateContentDebounce(id, control.formData)
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
      <div className="col-lg-12 text-right">
        <LinkButton type="button" onClick={(): void => handleRemoveSection(id)}>
          - Remove
        </LinkButton>
      </div>
    </FormContainer>
  )
}

export default HeaderCard
