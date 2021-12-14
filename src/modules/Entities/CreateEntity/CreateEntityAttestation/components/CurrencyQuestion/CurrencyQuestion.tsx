import React from 'react'
import MultiControlForm from 'common/components/JsonForm/MultiControlForm/MultiControlForm'
import { FormCardProps } from '../../../types'
import { QuestionCardBaseProps } from '../../types'
import { questionSchema, questionUiSchema, currencyEnum } from '../../constants'

interface Props extends FormCardProps, QuestionCardBaseProps {
  currency: string
  amount: number
}

const amountSchema = currencyEnum.map((item) => {
  return {
    properties: {
      currency: {
        enum: [item],
      },
      amount: {
        type: 'number',
        title: 'Amount',
        multipleOf: 10 ** (-Number(item.match(/.*\((\d+)\)/)[1]) ?? -2),
      },
    },
  }
})

const CurrencyQuestion: React.FunctionComponent<Props> = React.forwardRef(
  (
    {
      title,
      description,
      label,
      attributeType,
      currency,
      amount,
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
      currency,
      amount,
    }

    const schema = {
      ...questionSchema,
      required: [...questionSchema.required, 'currency', 'amount'],
      properties: {
        ...questionSchema.properties,
        currency: {
          type: 'string',
          title: 'Currency',
          enum: currencyEnum.sort(),
        },
        amount: {
          type: 'number',
          title: 'Amount',
          multipleOf: 0.01,
        },
      },
      dependencies: {
        currency: {
          oneOf: amountSchema,
        },
      },
    } as any

    const uiSchema = {
      ...questionUiSchema,
      currency: { 'ui:placeholder': 'Select a Currency' },
      amount: {
        'ui:widget': 'text',
        'ui:placeholder': 'Enter an Amount',
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

export default CurrencyQuestion
