import React from 'react'
import MultiControlForm from 'components/JsonForm/MultiControlForm/MultiControlForm'
import { FormCardProps } from '../../../../../../../redux/editEntityOld/editEntity.types'
import { QuestionCardBaseProps } from '../../../../../../../redux/editEntityAttestation/editEntityAttestation.types'
import { questionSchema, questionUiSchema } from '../../constants'
import { ObjectFieldTemplate2Column } from 'components/JsonForm/CustomTemplates/ObjectFieldTemplate'

interface Props extends FormCardProps, QuestionCardBaseProps {}

const LongTextQuestion: React.FunctionComponent<Props> = React.forwardRef(
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
LongTextQuestion.displayName = 'LongTextQuestion'

export default LongTextQuestion
