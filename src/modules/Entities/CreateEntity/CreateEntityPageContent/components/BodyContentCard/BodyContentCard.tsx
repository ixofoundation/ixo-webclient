import React from 'react'
import MultiControlForm from 'common/components/JsonForm/MultiControlForm/MultiControlForm'
import { LinkButton } from 'common/components/JsonForm/JsonForm.styles'
import { customControls } from 'common/components/JsonForm/types'
import { FormCardProps } from '../../../types'
import { ObjectFieldTemplate2Column } from 'common/components/JsonForm/CustomTemplates/ObjectFieldTemplate'

interface Props extends FormCardProps {
  title: string
  content: string
  fileSrc: string
  uploadingImage: boolean
}

const BodyContentCard: React.FunctionComponent<Props> = React.forwardRef(
  (
    {
      title,
      content,
      fileSrc,
      uploadingImage,
      handleUpdateContent,
      handleSubmitted,
      handleError,
      handleRemoveSection,
    },
    ref,
  ) => {
    const formData = {
      fileSrc,
      title,
      content,
    }

    const schema = {
      type: 'object',
      required: ['fileSrc', 'title', 'content'],
      properties: {
        title: { type: 'string', title: 'Title' },
        empty: { type: 'null' },
        fileSrc: { type: 'string', title: 'In Article Image' },
        content: { type: 'string', title: 'Body Content' },
      },
    } as any

    const uiSchema = {
      fileSrc: {
        'ui:widget': customControls['imageupload'],
        'ui:uploading': uploadingImage,
        'ui:maxDimension': 480,
        'ui:previewWidth': '100%',
        'ui:aspect': 16 / 9,
        'ui:circularCrop': false,
      },
      title: {
        'ui:widget': 'text',
        'ui:placeholder': 'Enter Title',
      },
      content: {
        'ui:widget': 'textarea',
        'ui:placeholder': 'Start Typing Here',
      },
    }

    return (
      <>
        <MultiControlForm
          ref={ref}
          onSubmit={handleSubmitted}
          onFormDataChange={handleUpdateContent}
          onError={handleError}
          formData={formData}
          schema={schema}
          uiSchema={uiSchema}
          customObjectFieldTemplate={ObjectFieldTemplate2Column}
        >
          &nbsp;
        </MultiControlForm>
        <div className="text-right">
          <LinkButton type="button" onClick={handleRemoveSection}>
            - Remove
          </LinkButton>
        </div>
      </>
    )
  },
)

export default BodyContentCard
