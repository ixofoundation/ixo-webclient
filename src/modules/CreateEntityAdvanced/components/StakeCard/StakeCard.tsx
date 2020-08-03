import React from 'react'
import Form from '@rjsf/core'
import { debounce } from 'debounce'
import { FormContainer } from '../../../../common/components/JsonForm/JsonForm.styles'
import * as formUtils from '../../../../common/components/JsonForm/JsonForm.utils'
import { FormData } from '../../../../common/components/JsonForm/types'
import { ObjectFieldTemplate2Column } from '../../../../common/components/JsonForm/CustomTemplates/ObjectFieldTemplate'
import {
  PaymentDenomination,
  StakeType,
  SlashingCondition,
} from '../../../Entities/types'
import {
  paymentDenominationMap,
  stakeTypeMap,
  slashingConditionMap,
} from '../../../Entities/strategy-map'

interface Props {
  id: string
  type: StakeType
  stakeId: string
  denomination: PaymentDenomination
  depositAddress: string
  minStake: number
  slashingCondition: SlashingCondition
  slashFactor: number
  maxSlashAmount: number
  unbondingPeriod: number
  handleUpdate: (id: string, formData: FormData) => void
  handleRemoveSection: (id: string) => void
}

const StakeCard: React.FunctionComponent<Props> = ({
  id,
  type,
  stakeId,
  denomination,
  depositAddress,
  minStake,
  slashingCondition,
  slashFactor,
  maxSlashAmount,
  unbondingPeriod,
  handleUpdate,
  handleRemoveSection,
}) => {
  const formData = {
    type,
    stakeId,
    denomination,
    depositAddress,
    minStake,
    slashingCondition,
    slashFactor,
    maxSlashAmount,
    unbondingPeriod,
  }

  const schema = {
    type: 'object',
    required: [
      'type',
      'stakeId',
      'denomination',
      'depositAddress',
      'minStake',
      'slashingCondition',
      'slashFactor',
      'maxSlashAmount',
      'unbondingPeriod',
    ],
    properties: {
      type: {
        type: 'string',
        title: 'Stake Type',
        enum: Object.keys(StakeType).map(key => StakeType[key]),
        enumNames: Object.keys(StakeType).map(
          key => stakeTypeMap[StakeType[key]].title,
        ),
      },
      stakeId: { type: 'string', title: 'Stake ID' },
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
      depositAddress: { type: 'string', title: 'Stake Deposit Address' },
      minStake: { type: 'number', title: 'Minimum Stake' },
      slashingCondition: {
        type: 'string',
        title: 'Slashing Condition',
        enum: Object.keys(SlashingCondition).map(key => SlashingCondition[key]),
        enumNames: Object.keys(SlashingCondition).map(
          key => slashingConditionMap[SlashingCondition[key]].title,
        ),
      },
      slashFactor: { type: 'number', title: 'Slash Factor' },
      maxSlashAmount: { type: 'number', title: 'Maximum Slash Amount' },
      unbondingPeriod: { type: 'number', title: 'Unbonding Period (Days)' },
    },
  } as any

  const uiSchema = {
    type: {
      ['ui:placeholder']: 'Select Stake Type',
    },
    stakeId: { ['ui:placeholder']: 'Enter Stake ID' },
    denomination: { ['ui:placeholder']: 'Enter Denomination' },
    depositAddress: { ['ui:placeholder']: 'Enter Address' },
    minStake: { ['ui:placeholder']: 'Enter Value' },
    slashingCondition: { ['ui:placeholder']: 'Select Condition' },
    slashFactor: { ['ui:placeholder']: 'Enter Factor' },
    maxSlashAmount: { ['ui:placeholder']: 'Enter Amount' },
    unbondingPeriod: { ['ui:placeholder']: 'Enter Days' },
  }

  const handleUpdateDebounce = debounce(handleUpdate, 500)

  return (
    <FormContainer className="row">
      <div className="col-lg-12">
        <Form
          formData={formData}
          onChange={(control): void =>
            handleUpdateDebounce(id, control.formData)
          }
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
      </div>
      <div className="col-lg-12 text-right">
        <button type="button" onClick={(): void => handleRemoveSection(id)}>
          Remove
        </button>
      </div>
    </FormContainer>
  )
}

export default StakeCard
