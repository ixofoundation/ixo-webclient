import React from 'react'
import MultiControlForm from 'common/components/JsonForm/MultiControlForm/MultiControlForm'
import { FormCardProps } from '../../../CreateEntity/types'

interface Props extends FormCardProps {
  title: string
  description: string
  label: string
  initialValue: string
}

const QRCodeQuestion: React.FunctionComponent<Props> = React.forwardRef(
  (
    {
      title,
      description,
      label,
      initialValue,
      handleUpdateContent,
      handleSubmitted,
      handleError,
    },
    ref,
  ) => {
    const formData = {
      title,
      description,
      label,
      initialValue,
    }

    const schema = {
      type: 'object',
      required: ['title', 'label', 'initialValue'],
      properties: {
        title: { type: 'string', title: 'Title' },
        label: { type: 'string', title: 'Control Label' },
        initialValue: { type: 'string', title: 'Url', format: 'uri' },
        description: { type: 'string', title: 'Description' },
      },
    } as any

    const uiSchema = {
      title: {
        'ui:widget': 'text',
        'ui:placeholder': 'The title of the question',
      },
      label: {
        'ui:widget': 'text',
        'ui:placeholder': 'The label for the QR Code image',
      },
      initialValue: {
        'ui:widget': 'text',
        'ui:placeholder': 'The url that the QR Code will generate from',
      },
      description: {
        'ui:widget': 'textarea',
        'ui:placeholder':
          'Provide a short explanation or instruction for the question (optional)',
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
        multiColumn
      >
        &nbsp;
      </MultiControlForm>
    )
  },
)

export default QRCodeQuestion
