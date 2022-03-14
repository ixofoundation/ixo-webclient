import React from 'react'
import MultiControlForm from 'common/components/JsonForm/MultiControlForm/MultiControlForm'
import { FormCardProps } from '../../../types'
import { QuestionCardBaseProps } from '../../types'
import { questionSchema, questionUiSchema } from '../../constants'

interface Props extends FormCardProps, QuestionCardBaseProps {
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
      attributeType,
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
      attributeType,
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
      ...questionSchema,
      required: [...questionSchema.required, 'itemValues'],
      properties: {
        ...questionSchema.properties,
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
      ...questionUiSchema,
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
