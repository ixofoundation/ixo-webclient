import React from 'react'
import { PaymentType, PaymentDenomination } from '../../../Entities/types'
import {
  paymentTypeMap,
  paymentDenominationMap,
} from '../../../Entities/strategy-map'
import MultiControlForm from 'common/components/JsonForm/MultiControlForm/MultiControlForm'
import { FormCardProps } from '../../../CreateEntity/types'
import { LinkButton } from 'common/components/JsonForm/JsonForm.styles'

interface Props extends FormCardProps {
  type: PaymentType
  paymentId: string
  denom: PaymentDenomination
  maxFee: number
  maxQty: number
}

const PaymentCard: React.FunctionComponent<Props> = React.forwardRef(
  (
    {
      type,
      paymentId,
      denom,
      maxFee,
      maxQty,
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
      denom,
      maxFee,
      maxQty,
    }

    const schema = {
      type: 'object',
      required: ['type', 'paymentId', 'denom', 'maxFee', 'maxQty'],
      properties: {
        type: {
          type: 'string',
          title: 'Payment Type',
          enum: Object.keys(PaymentType).map(key => PaymentType[key]),
          enumNames: Object.keys(PaymentType).map(
            key => paymentTypeMap[PaymentType[key]].title,
          ),
        },
        paymentId: { type: 'string', title: 'Payment ID' },
        denom: {
          type: 'string',
          title: 'Payment Denomination',
          enum: Object.keys(PaymentDenomination).map(
            key => PaymentDenomination[key],
          ),
          enumNames: Object.keys(PaymentDenomination).map(
            key => paymentDenominationMap[PaymentDenomination[key]].title,
          ),
        },
        maxFee: {
          type: 'number',
          title: 'Maximum Payment Amount',
        },
        maxQty: { type: 'number', title: 'Maximum Quantity' },
      },
    } as any

    const uiSchema = {
      type: {
        ['ui:placeholder']: 'Select Payment',
      },
      paymentId: {
        ['ui:placeholder']: 'Enter ID',
      },
      denom: {
        ['ui:placeholder']: 'Select Denomination',
      },
      maxFee: {
        ['ui:placeholder']: 'Enter Amount',
      },
      maxQty: {
        ['ui:placeholder']: 'Enter Number of Units',
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
