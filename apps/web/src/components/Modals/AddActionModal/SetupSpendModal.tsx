import React, { useEffect, useMemo, useState } from 'react'
import { FlexBox } from 'components/App/App.styles'
import { Dropdown, Input } from 'pages/CreateEntity/Components'
import { Typography } from 'components/Typography'
import { TProposalActionModel } from 'types/entities'
import SetupActionModalTemplate from './SetupActionModalTemplate'
import { Coin } from '@ixo/impactxclient-sdk/types/codegen/cosmos/base/v1beta1/coin'
import { NATIVE_DECIMAL, NATIVE_DENOM, NATIVE_MICRODENOM } from 'constants/chains'
import { useDAO } from 'hooks/dao'
import { useParams } from 'react-router-dom'
import { convertDenomToMicroDenomWithDecimals, convertMicroDenomToDenomWithDecimals } from 'utils/conversions'

export interface SpendData extends Coin {
  to: string
}

const initialState = {
  denom: NATIVE_MICRODENOM,
  amount: '1',
  to: '',
}

interface Props {
  open: boolean
  action: TProposalActionModel
  onClose: () => void
  onSubmit?: (data: any) => void
}

const SetupSpendModal: React.FC<Props> = ({ open, action, onClose, onSubmit }): JSX.Element => {
  const { entityId = '', coreAddress = '' } = useParams<{ entityId: string; coreAddress: string }>()
  const { getTokenInfo } = useDAO()
  const [formData, setFormData] = useState<SpendData>(initialState)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const cw20Token = useMemo(() => getTokenInfo(entityId, coreAddress), [])

  const validate = useMemo(() => !!formData.to && !!formData.amount && !!formData.denom, [formData])

  useEffect(() => {
    if (action?.data) {
      if (action?.type === 'bank.send') {
        const denom = action.data.amount[0].denom
        let decimals = 0
        if (denom === NATIVE_MICRODENOM) {
          decimals = NATIVE_DECIMAL
        } else if (cw20Token) {
          decimals = cw20Token.tokenInfo.decimals
        }
        const amount = convertMicroDenomToDenomWithDecimals(action.data.amount[0].amount, decimals).toString()
        setFormData({
          denom: denom,
          amount: amount,
          to: action.data.to_address,
        })
      } else {
        let decimals = 0
        if (action.data.denom === NATIVE_MICRODENOM) {
          decimals = NATIVE_DECIMAL
        } else if (cw20Token) {
          decimals = cw20Token.tokenInfo.decimals
        }
        const amount = convertMicroDenomToDenomWithDecimals(action.data.amount, decimals).toString()
        setFormData({
          denom: action.data.denom,
          amount: amount,
          to: action.data.to,
        })
      }
    } else {
      setFormData(initialState)
    }
  }, [action, cw20Token])

  const handleUpdateFormData = (key: string, value: string | number) => {
    onSubmit && setFormData((data: SpendData) => ({ ...data, [key]: value }))
  }

  const handleConfirm = () => {
    if (onSubmit && cw20Token) {
      let decimals = 0
      if (formData.denom === NATIVE_MICRODENOM) {
        decimals = NATIVE_DECIMAL
      } else {
        decimals = cw20Token.tokenInfo.decimals
      }

      const amount = convertDenomToMicroDenomWithDecimals(formData.amount, decimals).toString()
      onSubmit({
        ...action,
        data: {
          denom: formData.denom,
          amount: amount,
          to: formData.to,
        },
      })
    }
    onClose()
  }

  return (
    <SetupActionModalTemplate
      open={open}
      action={action}
      onClose={onClose}
      onSubmit={onSubmit && handleConfirm}
      validate={validate}
    >
      <FlexBox width='100%' $gap={4}>
        <Input
          inputValue={formData.amount}
          handleChange={(value) => handleUpdateFormData('amount', value)}
          style={{ textAlign: 'right' }}
        />
        <Dropdown
          name={'token'}
          value={formData.denom}
          options={[
            { value: NATIVE_MICRODENOM, text: `$${NATIVE_DENOM.toUpperCase()}` },
            ...(cw20Token
              ? [{ value: cw20Token.config.token_address, text: `$${cw20Token.tokenInfo.symbol.toUpperCase()}` }]
              : []),
          ]}
          $hasArrow={false}
          onChange={(e) => handleUpdateFormData('denom', e.target.value)}
          style={{ textAlign: 'center' }}
        />
      </FlexBox>

      <FlexBox width='100%'>
        <Typography weight='medium' size='xl'>
          will be send to
        </Typography>
      </FlexBox>

      <FlexBox width='100%' $gap={4}>
        <Input
          name='to_address'
          placeholder='Paste Address'
          inputValue={formData.to}
          handleChange={(value) => handleUpdateFormData('to', value)}
        />
      </FlexBox>
    </SetupActionModalTemplate>
  )
}

export default SetupSpendModal
