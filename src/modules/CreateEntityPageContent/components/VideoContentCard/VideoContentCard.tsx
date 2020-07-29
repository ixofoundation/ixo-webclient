import React from 'react'
import Form from '@rjsf/core'
import { debounce } from 'debounce'
import { FormContainer } from '../../../../common/components/JsonForm/JsonForm.styles'
import * as formUtils from '../../../../common/components/JsonForm/JsonForm.utils'
import { FormData } from '../../../../common/components/JsonForm/types'
import VideoLoader from '../../../../common/components/DropZone/FileLoader/FileLoader'
import { FileType } from 'src/common/components/DropZone/types'
import { RemoveButton } from './VideoContentCard.styles'

interface Props {
  id: string
  title: string
  content: string
  videoDid: string
  uploadingVideo: boolean
  handleUpdateContent: (id: string, formData: FormData) => void
  handleUploadVideo: (id: string, base64EncodedVideo: string) => void
  handleRemoveSection: (id: string) => void
}

const HeaderCard: React.FunctionComponent<Props> = ({
  id,
  title,
  content,
  videoDid,
  uploadingVideo,
  handleUpdateContent,
  handleUploadVideo,
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

  const handleUpdateContentDebounce = debounce(handleUpdateContent, 500)

  return (
    <FormContainer className="row">
      <div className="col-lg-6">
        <div className="form-group">
          <label className="control-label">
            Video<span className="required">*</span>
          </label>
          <VideoLoader
            uploadedFileSrc={
              videoDid
                ? `${process.env.REACT_APP_PDS_URL}public/${videoDid}`
                : null
            }
            uploading={uploadingVideo}
            handleSave={(base64EncodedVideo): void =>
              handleUploadVideo(id, base64EncodedVideo)
            }
            maxFileSize={20000000}
            fileType={FileType.Video}
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
        <RemoveButton
          type="button"
          onClick={(): void => handleRemoveSection(id)}
        >
          Remove
        </RemoveButton>
      </div>
    </FormContainer>
  )
}

export default HeaderCard
