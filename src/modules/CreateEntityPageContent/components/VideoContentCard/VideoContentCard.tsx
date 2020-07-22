import React from 'react'
import Form from '@rjsf/core'
import { debounce } from 'debounce'
import { FormContainer } from '../../../../common/components/JsonForm/JsonForm.styles'
import * as formUtils from '../../../../common/components/JsonForm/JsonForm.utils'
import { FormData } from '../../../../common/components/JsonForm/types'
import VideoLoader from '../../../../common/components/DropZone/FileLoader/FileLoader'
import { FileType } from 'src/common/components/DropZone/types'

interface Props {
  title: string
  content: string
  videoDid: string
  uploadingVideo: boolean
  handleUpdateContent: (formData: FormData) => void
  handleUploadVideo: (base64EncodedVideo: string) => void
}

const HeaderCard: React.FunctionComponent<Props> = ({
  title,
  content,
  videoDid,
  uploadingVideo,
  handleUpdateContent,
  handleUploadVideo,
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
              handleUploadVideo(base64EncodedVideo)
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
