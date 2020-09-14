import React from 'react'
import { LinkButton } from 'common/components/JsonForm/JsonForm.styles'
import {
  PaymentDenomination,
  StakeType,
  SlashingCondition,
} from '../../../../types'
import {
  paymentDenominationMap,
  stakeTypeMap,
  slashingConditionMap,
} from '../../../../strategy-map'
import { FormCardProps } from '../../../types'
import MultiControlForm from 'common/components/JsonForm/MultiControlForm/MultiControlForm'

interface Props extends FormCardProps {
  type: StakeType
  stakeId: string
  denom: PaymentDenomination
  stakeAddress: string
  minStake: number
  slashCondition: SlashingCondition
  slashFactor: number
  slashAmount: number
  unbondPeriod: number
}

const StakeCard: React.FunctionComponent<Props> = React.forwardRef(
  (
    {
      type,
      stakeId,
      denom,
      stakeAddress,
      minStake,
      slashCondition,
      slashFactor,
      slashAmount,
      unbondPeriod,
      handleUpdateContent,
      handleSubmitted,
      handleError,
      handleRemoveSection,
    },
    ref,
  ) => {
    const formData = {
      type,
      stakeId,
      denom,
      stakeAddress,
      minStake,
      slashCondition,
      slashFactor,
      slashAmount,
      unbondPeriod,
    }

    const schema = {
      type: 'object',
      required: [
        'type',
        'stakeId',
        'denom',
        'stakeAddress',
        'minStake',
        'slashCondition',
        'slashFactor',
        'slashAmount',
        'unbondPeriod',
      ],
      properties: {
        type: {
          type: 'string',
          title: 'Stake Type',
          enum: Object.keys(StakeType).map((key) => StakeType[key]),
          enumNames: Object.keys(StakeType).map(
            (key) => stakeTypeMap[StakeType[key]].title,
          ),
        },
        stakeId: { type: 'string', title: 'Stake ID' },
        denom: {
          type: 'string',
          title: 'Deposit Denomination',
          enum: Object.keys(PaymentDenomination).map(
            (key) => PaymentDenomination[key],
          ),
          enumNames: Object.keys(PaymentDenomination).map(
            (key) => paymentDenominationMap[PaymentDenomination[key]].title,
          ),
        },
        stakeAddress: { type: 'string', title: 'Stake Deposit Address' },
        minStake: { type: 'number', title: 'Minimum Stake' },
        slashCondition: {
          type: 'string',
          title: 'Slashing Condition',
          enum: Object.keys(SlashingCondition).map(
            (key) => SlashingCondition[key],
          ),
          enumNames: Object.keys(SlashingCondition).map(
            (key) => slashingConditionMap[SlashingCondition[key]].title,
          ),
        },
        slashFactor: { type: 'number', title: 'Slash Factor' },
        slashAmount: { type: 'number', title: 'Maximum Slash Amount' },
        unbondPeriod: { type: 'number', title: 'Unbonding Period (Days)' },
      },
    } as any

    const uiSchema = {
      type: {
        'ui:placeholder': 'Select Stake Type',
      },
      stakeId: { 'ui:placeholder': 'Enter Stake ID' },
      denom: { 'ui:placeholder': 'Select Denomination' },
      stakeAddress: { 'ui:placeholder': 'Enter Address' },
      minStake: { 'ui:placeholder': 'Enter Value' },
      slashCondition: { 'ui:placeholder': 'Select Condition' },
      slashFactor: { 'ui:placeholder': 'Enter Percentage' },
      slashAmount: { 'ui:placeholder': 'Enter Amount' },
      unbondPeriod: { 'ui:placeholder': 'Enter Days' },
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

export default StakeCard
