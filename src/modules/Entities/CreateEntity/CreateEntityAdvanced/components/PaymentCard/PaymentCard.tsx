import React from 'react'
import { PaymentType } from '../../../../types'
import { paymentTypeMap } from '../../../../strategy-map'
import MultiControlForm from 'common/components/JsonForm/MultiControlForm/MultiControlForm'
import { FormCardProps } from '../../../types'
import { LinkButton } from 'common/components/JsonForm/JsonForm.styles'

interface Props extends FormCardProps {
  type: PaymentType
  paymentId: string
}

const PaymentCard: React.FunctionComponent<Props> = React.forwardRef(
  (
    {
      type,
      paymentId,
      handleUpdateContent,
      handleSubmitted,
      handleError,
      handleRemoveSection,
    },
    ref,
  ) => {
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
          enumNames: Object.keys(PaymentType).map(
            (key) => paymentTypeMap[PaymentType[key]].title,
          ),
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
          multiColumn
        >
          &nbsp;
        </MultiControlForm>
        <div className="text-right">
          <LinkButton type="button" onClick={handleRemoveSection}>
            - Remove
          </LinkButton>
        </div>
      </>
    )
  },
)

export default PaymentCard
