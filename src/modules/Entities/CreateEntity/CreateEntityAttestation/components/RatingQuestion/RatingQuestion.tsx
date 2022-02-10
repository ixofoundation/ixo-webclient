import React from 'react'
import MultiControlForm from 'common/components/JsonForm/MultiControlForm/MultiControlForm'
import { FormCardProps } from '../../../types'
import { QuestionCardBaseProps } from '../../types'
import { questionSchema, questionUiSchema } from '../../constants'
import { ObjectFieldTemplate2Column } from 'common/components/JsonForm/CustomTemplates/ObjectFieldTemplate'

interface Props extends FormCardProps, QuestionCardBaseProps {
  values: string[]
}

const RatingQuestion: React.FunctionComponent<Props> = React.forwardRef(
  (
    {
      title,
      description,
      label,
      attributeType,
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
      attributeType,
      scale: values ? values.length : undefined,
    }

    const schema = {
      ...questionSchema,
      required: [...questionSchema.required, 'scale'],
      properties: {
        ...questionSchema.properties,
        scale: {
          type: 'number',
          title: 'Rating Scale',
          enum: Array.from(Array(10), (_, i) => i + 1).filter((i) => i > 1),
        },
      },
    } as any

    const uiSchema = {
      ...questionUiSchema,
      scale: {
        'ui:placeholder': '-- Select Rating Scale --',
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

export default RatingQuestion
