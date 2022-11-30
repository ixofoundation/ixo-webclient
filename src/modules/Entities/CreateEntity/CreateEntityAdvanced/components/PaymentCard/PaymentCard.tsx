import React from 'react'
import { PaymentType } from '../../../../types'
import { paymentTypeMap } from '../../../../strategy-map'
import MultiControlForm from 'components/JsonForm/MultiControlForm/MultiControlForm'
import { FormCardProps } from '../../../../../../redux/createEntityOld/createEntity.types'
import { LinkButton } from 'components/JsonForm/JsonForm.styles'
import { ObjectFieldTemplate2Column } from 'components/JsonForm/CustomTemplates/ObjectFieldTemplate'

interface Props extends FormCardProps {
  type: PaymentType
  paymentId: string
}

const PaymentCard: React.FunctionComponent<Props> = React.forwardRef(
  ({ type, paymentId, handleUpdateContent, handleSubmitted, handleError, handleRemoveSection }, ref) => {
    const formData = {
      type,
      paymentId,
    }

    const schema = {
      type: 'object',
      required: ['type', 'paymentId'],
      properties: {
        type: {
          type: 'string',
          title: 'Payment Type',
          enum: Object.keys(PaymentType).map((key) => PaymentType[key]),
          enumNames: Object.keys(PaymentType).map((key) => paymentTypeMap[PaymentType[key]].title),
        },
        paymentId: { type: 'string', title: 'Payment ID' },
      },
    } as any

    const uiSchema = {
      type: {
        'ui:placeholder': 'Select Payment',
      },
      paymentId: {
        'ui:placeholder': 'Enter ID',
      },
    }

    return (
      <>
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
        <div className='text-right'>
          <LinkButton type='button' onClick={handleRemoveSection}>
            - Remove
          </LinkButton>
        </div>
      </>
    )
  },
)
PaymentCard.displayName = 'PaymentCard'

export default PaymentCard
