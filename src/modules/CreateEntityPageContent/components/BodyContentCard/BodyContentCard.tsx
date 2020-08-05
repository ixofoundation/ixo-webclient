import React from 'react'
import MultiControlForm from '../../../../common/components/JsonForm/MultiControlForm/MultiControlForm'
import { LinkButton } from '../../../../common/components/JsonForm/JsonForm.styles'
import { FormData } from '../../../../common/components/JsonForm/types'
import ImageLoader from '../../../../common/components/DropZone/ImageLoader/ImageLoader'

interface Props {
  id: string
  title: string
  content: string
  imageDid: string
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
  uploadingImage,
  handleUpdateContent,
  handleUploadImage,
  handleRemoveSection,
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

  return (
    <div className="row">
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
              handleUploadImage(id, base64EncodedImage)
            }
            aspect={1}
            maxDimension={960}
            previewWidth={440}
          />
        </div>
      </div>
      <div className="col-lg-6">
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
      </div>
      <div className="col-lg-12 text-right">
        <LinkButton type="button" onClick={(): void => handleRemoveSection(id)}>
          - Remove
        </LinkButton>
      </div>
    </div>
  )
}

export default HeaderCard
