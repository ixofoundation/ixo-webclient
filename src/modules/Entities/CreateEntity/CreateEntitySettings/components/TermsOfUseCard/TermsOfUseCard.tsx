import React from 'react'
import { TermsOfUseType } from '../../../../types'
import { termsOfUseTypeStrategyMap } from '../../../../strategy-map'
import MultiControlForm from 'components/JsonForm/MultiControlForm/MultiControlForm'
import { FormCardProps } from '../../../../../../redux/createEntityOld/createEntity.types'
import { ObjectFieldTemplate2Column } from 'components/JsonForm/CustomTemplates/ObjectFieldTemplate'

interface Props extends FormCardProps {
  type: TermsOfUseType
  paymentTemplateId: string
}

const TermsOfUseCard: React.FunctionComponent<Props> = React.forwardRef(
  ({ type, paymentTemplateId, handleUpdateContent, handleSubmitted, handleError }, ref) => {
    const formData = {
      type,
      paymentTemplateId,
    }

    const schema = {
      type: 'object',
      required: ['type', 'paymentTemplateId'],
      properties: {
        type: {
          type: 'string',
          title: 'Terms Of Use',
          enum: Object.keys(TermsOfUseType).map((key) => TermsOfUseType[key]),
          enumNames: Object.keys(TermsOfUseType).map((key) => termsOfUseTypeStrategyMap[TermsOfUseType[key]].title),
        },
        paymentTemplateId: { type: 'string', title: 'Payment Template' },
      },
    } as any

    const uiSchema = {
      type: {
        'ui:placeholder': 'Select Terms Of Use',
      },
      paymentTemplateId: {
        'ui:placeholder': 'Enter Payment Template Identifier',
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
TermsOfUseCard.displayName = 'TermsOfUseCard'

export default TermsOfUseCard
