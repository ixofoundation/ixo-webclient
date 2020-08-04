import React from 'react'
import Form from '@rjsf/core'
import { debounce } from 'debounce'
import { FormContainer } from '../../../../common/components/JsonForm/JsonForm.styles'
import * as formUtils from '../../../../common/components/JsonForm/JsonForm.utils'
import { FormData } from '../../../../common/components/JsonForm/types'
import { ObjectFieldTemplate2Column } from '../../../../common/components/JsonForm/CustomTemplates/ObjectFieldTemplate'
import { PaymentType, PaymentDenomination } from '../../../Entities/types'
import {
  paymentTypeMap,
  paymentDenominationMap,
} from '../../../Entities/strategy-map'
import { FormWrapper } from '../CreateEntityAdvanced.styles'

interface Props {
  type: PaymentType
  paymentId: string
  denomination: PaymentDenomination
  maxAmount: number
  maxUnits: number
  handleUpdate: (formData: FormData) => void
}

const PaymentCard: React.FunctionComponent<Props> = ({
  type,
  paymentId,
  denomination,
  maxAmount,
  maxUnits,
  handleUpdate,
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

  const handleUpdateDebounce = debounce(handleUpdate, 500)

  return (
    <FormContainer className="row">
      <div className="col-lg-12">
        <FormWrapper>
          <Form
            formData={formData}
            onChange={(control): void => handleUpdateDebounce(control.formData)}
            noHtml5Validate
            liveValidate
            showErrorList={false}
            schema={schema}
            uiSchema={uiSchema}
            transformErrors={formUtils.transformErrors}
            ObjectFieldTemplate={ObjectFieldTemplate2Column}
          >
            &nbsp;
          </Form>
        </FormWrapper>
      </div>
    </FormContainer>
  )
}

export default PaymentCard
