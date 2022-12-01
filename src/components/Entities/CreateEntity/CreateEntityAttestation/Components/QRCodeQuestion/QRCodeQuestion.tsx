import React from 'react'
import MultiControlForm from 'components/JsonForm/MultiControlForm/MultiControlForm'
import { FormCardProps } from '../../../../../../redux/createEntityOld/createEntity.types'
import { QuestionCardBaseProps } from '../../../../../../redux/createEntityAttestation/createEntityAttestation.types'
import { questionSchema, questionUiSchema } from '../../constants'
import { ObjectFieldTemplate2Column } from 'components/JsonForm/CustomTemplates/ObjectFieldTemplate'

interface Props extends FormCardProps, QuestionCardBaseProps {
  initialValue: string
}

const QRCodeQuestion: React.FunctionComponent<Props> = React.forwardRef(
  (
    { title, description, label, attributeType, initialValue, handleUpdateContent, handleSubmitted, handleError },
    ref,
  ) => {
    const formData = {
      title,
      description,
      label,
      attributeType,
      initialValue,
    }

    const schema = {
      ...questionSchema,
      required: [...questionSchema.required, 'initialValue'],
      properties: {
        ...questionSchema.properties,
        initialValue: { type: 'string', title: 'Url', format: 'uri' },
      },
    } as any

    const uiSchema = {
      ...questionUiSchema,
      initialValue: {
        'ui:widget': 'text',
        'ui:placeholder': 'The url that the QR Code will generate from',
      },
    }

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
QRCodeQuestion.displayName = 'QRCodeQuestion'

export default QRCodeQuestion
