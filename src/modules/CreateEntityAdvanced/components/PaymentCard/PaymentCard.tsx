import React from 'react'
import { FormData } from '../../../../common/components/JsonForm/types'
import { PaymentType, PaymentDenomination } from '../../../Entities/types'
import {
  paymentTypeMap,
  paymentDenominationMap,
} from '../../../Entities/strategy-map'
import MultiControlForm from '../../../../common/components/JsonForm/MultiControlForm/MultiControlForm'
import { LinkButton } from '../../../../common/components/JsonForm/JsonForm.styles'

interface Props {
  id: string
  type: PaymentType
  paymentId: string
  denomination: PaymentDenomination
  maxAmount: number
  maxUnits: number
  handleUpdate: (id: string, formData: FormData) => void
  handleRemoveSection: (id: string) => void
}

const PaymentCard: React.FunctionComponent<Props> = ({
  id,
  type,
  paymentId,
  denomination,
  maxAmount,
  maxUnits,
  handleUpdate,
  handleRemoveSection,
}) => {
  const formData = {
    type,
    paymentId,
    denomination,
    maxAmount,
    maxUnits,
  }

  const schema = {
    type: 'object',
    required: ['type', 'paymentId', 'denomination', 'maxAmount', 'maxUnits'],
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
      denomination: {
        type: 'string',
        title: 'Payment Denomination',
        enum: Object.keys(PaymentDenomination).map(
          key => PaymentDenomination[key],
        ),
        enumNames: Object.keys(PaymentDenomination).map(
          key => paymentDenominationMap[PaymentDenomination[key]].title,
        ),
      },
      maxAmount: {
        type: 'number',
        title: 'Maximum Payment Amount',
      },
      maxUnits: { type: 'number', title: 'Maximum Quantity' },
    },
  } as any

  const uiSchema = {
    type: {
      ['ui:placeholder']: 'Select Payment',
    },
    paymentId: {
      ['ui:placeholder']: 'Enter ID',
    },
    denomination: {
      ['ui:placeholder']: 'Select Denomination',
    },
    maxAmount: {
      ['ui:placeholder']: 'Enter Amount',
    },
    maxUnits: {
      ['ui:placeholder']: 'Enter Number of Units',
    },
  }

  return (
    <>
      <MultiControlForm
        onSubmit={(): void => null}
        onFormDataChange={(formData): void => handleUpdate(id, formData)}
        formData={formData}
        schema={schema}
        uiSchema={uiSchema}
        multiColumn
      >
        &nbsp;
      </MultiControlForm>
      <div className="text-right">
        <LinkButton type="button" onClick={(): void => handleRemoveSection(id)}>
          - Remove
        </LinkButton>
      </div>
    </>
  )
}

export default PaymentCard
