import React from 'react'
import MultiControlForm from '../../../../common/components/JsonForm/MultiControlForm/MultiControlForm'
import { FormCardProps } from '../../../CreateEntity/types'

interface Props extends FormCardProps {
  title: string
  description: string
  label: string
  values: number[]
}

const RatingQuestion: React.FunctionComponent<Props> = React.forwardRef(
  (
    {
      title,
      description,
      label,
      values,
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
      scale: values ? values.length : undefined,
    }

    const schema = {
      type: 'object',
      required: ['title', 'label', 'scale'],
      properties: {
        title: { type: 'string', title: 'Title' },
        label: { type: 'string', title: 'Control Label' },
        scale: {
          type: 'number',
          title: 'Rating Scale',
          enum: Array.from(Array(10), (_, i) => i + 1).filter((i) => i > 1),
        },
        description: { type: 'string', title: 'Description' },
      },
    } as any

    const uiSchema = {
      title: {
        ['ui:widget']: 'text',
        ['ui:placeholder']: 'The title of the question',
      },
      label: {
        ['ui:widget']: 'text',
        ['ui:placeholder']: 'The label for the input',
      },
      scale: {
        ['ui:placeholder']: '-- Select Rating Scale --',
      },
      description: {
        ['ui:widget']: 'textarea',
        ['ui:placeholder']:
          'This will be a short description or explainer text explaining the question',
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

export default RatingQuestion
