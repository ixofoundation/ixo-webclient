import React from 'react'
import MultiControlForm from 'common/components/JsonForm/MultiControlForm/MultiControlForm'
import { FormCardProps } from '../../../CreateEntity/types'

interface Props extends FormCardProps {
  title: string
  description: string
  label: string
  itemValues: string[]
  minItems: number
  maxItems: number
}

const CheckBoxesQuestion: React.FunctionComponent<Props> = React.forwardRef(
  (
    {
      title,
      description,
      label,
      itemValues,
      minItems,
      maxItems,
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
      itemValues,
      minItems,
      maxItems,
    }

    const enumMinArray = Array.from(
      Array(itemValues.length > 0 ? itemValues.length : 10),
      (_, i) => i + 1,
    )

    const enumMaxArray = Array.from(
      Array(itemValues.length > 0 ? itemValues.length : 10),
      (_, i) => i + 1,
    ).filter((i) => i > 0)

    const schema = {
      type: 'object',
      required: ['title', 'label', 'itemValues'],
      properties: {
        title: { type: 'string', title: 'Title' },
        label: { type: 'string', title: 'Control Label' },
        description: { type: 'string', title: 'Description' },
        itemValues: {
          type: 'array',
          title: 'Options',
          minItems: 1,
          items: {
            type: 'string',
          },
        },
        minItems: {
          type: 'number',
          title: 'Minimum Required Selections',
          enum: enumMinArray,
        },
        maxItems: {
          type: 'number',
          title: 'Maximum Required Selections',
          enum: enumMaxArray,
        },
      },
    } as any

    const uiSchema = {
      title: {
        'ui:widget': 'text',
        'ui:placeholder': 'The title of the question',
      },
      label: {
        'ui:widget': 'text',
        'ui:placeholder': 'The label for the input',
      },
      description: {
        'ui:widget': 'textarea',
        'ui:placeholder':
          'Provide a short explanation or instruction for the question (optional)',
      },
      itemValues: {
        'ui:options': {
          addable: true,
          orderable: true,
          removable: true,
        },
      },
      minItems: {
        'ui:placeholder': 'Any',
      },
      maxItems: {
        'ui:placeholder': 'Any',
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

export default CheckBoxesQuestion
