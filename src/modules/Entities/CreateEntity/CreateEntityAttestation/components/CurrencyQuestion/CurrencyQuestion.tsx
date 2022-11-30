import React from 'react'
import MultiControlForm from 'common/components/JsonForm/MultiControlForm/MultiControlForm'
import { FormCardProps } from '../../../../../../redux/createEntityOld/createEntity.types'
import { QuestionCardBaseProps } from '../../../../../../redux/createEntityAttestation/createEntityAttestation.types'
import { questionSchema, questionUiSchema, currencyEnum } from '../../constants'
import { ObjectFieldTemplate2Column } from 'common/components/JsonForm/CustomTemplates/ObjectFieldTemplate'

interface Props extends FormCardProps, QuestionCardBaseProps {
  currency: string
}

const CurrencyQuestion: React.FunctionComponent<Props> = React.forwardRef(
  ({ title, description, label, attributeType, currency, handleUpdateContent, handleSubmitted, handleError }, ref) => {
    const formData = {
      title,
      description,
      label,
      attributeType,
      currency,
    }

    const schema = {
      ...questionSchema,
      required: [...questionSchema.required, 'currency'],
      properties: {
        ...questionSchema.properties,
        currency: {
          type: 'array',
          title: 'Currency',
          items: {
            type: 'string',
            enumNames: currencyEnum.map((item) => item.match(/(\w+) \((\d+)\)/)![1]).sort(),
            enum: currencyEnum.sort(),
          },
          uniqueItems: true,
          // maxItems: 1,
        },
        // amount: {
        //   type: 'number',
        //   title: 'Amount',
        //   multipleOf: 0.01,
        // },
      },
      // dependencies: {
      //   currency: {
      //     oneOf: amountSchema,
      //   },
      // },
    } as any

    const uiSchema = {
      ...questionUiSchema,
      currency: {},
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
CurrencyQuestion.displayName = 'CurrencyQuestion'

export default CurrencyQuestion
