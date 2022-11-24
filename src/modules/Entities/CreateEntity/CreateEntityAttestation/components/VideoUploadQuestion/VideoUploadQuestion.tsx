import React from 'react'
import MultiControlForm from 'common/components/JsonForm/MultiControlForm/MultiControlForm'
import { FormCardProps } from '../../../types'
import { QuestionCardBaseProps } from '../../types'
import { questionSchema, questionUiSchema } from '../../constants'
import { ObjectFieldTemplate2Column } from 'common/components/JsonForm/CustomTemplates/ObjectFieldTemplate'

interface Props extends FormCardProps, QuestionCardBaseProps {}

const VideoUploadQuestion: React.FunctionComponent<Props> = React.forwardRef(
  ({ title, description, label, attributeType, handleUpdateContent, handleSubmitted, handleError }, ref) => {
    const formData = {
      title,
      description,
      label,
      attributeType,
    }

    const schema = { ...questionSchema } as any

    const uiSchema = { ...questionUiSchema }

    return (
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
    )
  },
)
VideoUploadQuestion.displayName = 'VideoUploadQuestion'

export default VideoUploadQuestion
