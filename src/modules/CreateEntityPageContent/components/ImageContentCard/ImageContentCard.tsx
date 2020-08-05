import React from 'react'
import MultiControlForm from 'src/common/components/JsonForm/MultiControlForm/MultiControlForm'
import { LinkButton } from '../../../../common/components/JsonForm/JsonForm.styles'
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

  return (
    <>
      <div className="justify-content-center">
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
            aspect={16 / 9}
            maxDimension={960}
            previewWidth={960}
          />
        </div>
      </div>
      <div>
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
      <div className="text-right">
        <LinkButton type="button" onClick={(): void => handleRemoveSection(id)}>
          - Remove
        </LinkButton>
      </div>
    </>
  )
}

export default HeaderCard
