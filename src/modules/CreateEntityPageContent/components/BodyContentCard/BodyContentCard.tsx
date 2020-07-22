import React from 'react'
import Form from '@rjsf/core'
import { debounce } from 'debounce'
import { FormContainer } from '../../../../common/components/JsonForm/JsonForm.styles'
import * as formUtils from '../../../../common/components/JsonForm/JsonForm.utils'
import FormCardWrapper from '../../../../common/components/Wrappers/FormCardWrapper/FormCardWrapper'
import { FormData } from '../../../../common/components/JsonForm/types'
import ImageLoader from '../../../../common/components/DropZone/ImageLoader/ImageLoader'

interface Props {
  title: string
  content: string
  imageDid: string
  uploadingImage: boolean
  handleUpdateContent: (formData: FormData) => void
  handleUploadImage: (base64EncodedImage: string) => void
}

const HeaderCard: React.FunctionComponent<Props> = ({
  title,
  content,
  imageDid,
  uploadingImage,
  handleUpdateContent,
  handleUploadImage,
}) => {
  const formData = {
    title,
    content,
  }

  const schema = {
    type: 'object',
    required: ['title', 'content'],
    properties: {
      title: { type: 'string', title: 'Title' },
      content: { type: 'string', title: 'Body Content' },
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
  }

  const handleUpdateContentDebounce = debounce(handleUpdateContent, 500)

  return (
    <FormCardWrapper
      title="Body Content Card"
      description="Accepts Markdown formatting such as **bold**, *italic* and ***bold italic***."
    >
      <FormContainer className="row">
        <div className="col-lg-6">
          <div className="form-group">
            <label className="control-label">
              In Article Image<span className="required">*</span>
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
