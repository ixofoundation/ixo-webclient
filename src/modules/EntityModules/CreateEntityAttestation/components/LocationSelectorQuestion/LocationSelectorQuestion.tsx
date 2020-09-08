import React from 'react'
import MultiControlForm from 'common/components/JsonForm/MultiControlForm/MultiControlForm'
import { FormCardProps } from '../../../CreateEntity/types'

interface Props extends FormCardProps {
  title: string
  description: string
  label: string
}

const LocationSelectorQuestion: React.FunctionComponent<Props> = React.forwardRef(
  (
    {
      title,
      description,
      label,
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
    }

    const schema = {
      type: 'object',
      required: ['title', 'label'],
      properties: {
        title: { type: 'string', title: 'Title' },
        label: { type: 'string', title: 'Control Label' },
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
        'ui:placeholder': 'The label for the location selector',
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

export default LocationSelectorQuestion
