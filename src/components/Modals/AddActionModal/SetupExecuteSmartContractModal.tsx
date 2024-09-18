import React, { useEffect, useMemo, useState } from 'react'
import { Box, FlexBox, SvgBox } from 'components/CoreEntry/App.styles'
import { AccountValidStatus, CodeMirror, Dropdown, Input, NumberCounter } from 'screens/CreateEntity/Components'
import { Typography } from 'components/Typography'
import { TProposalActionModel } from 'types/entities'
import styled from 'styled-components'

import SetupActionModalTemplate from './SetupActionModalTemplate'
import { isContractAddress, validateJSON } from 'utils/validation'
import { Coin } from '@ixo/impactxclient-sdk/types/codegen/cosmos/base/v1beta1/coin'
import { NATIVE_MICRODENOM } from 'constants/chains'

const inputHeight = '48px'

const AddFundButton = styled(FlexBox)`
  width: 200px;
  height: ${inputHeight};
  padding: 10px;
  color: black;
  border: 1px solid ${(props) => props.theme.ixoNewBlue};
  border-radius: 8px;
  cursor: pointer;
`

export interface ExecuteData {
  address: string
  message: string
  funds: Coin[]
}

const initialState: ExecuteData = {
  address: '',
  message: '{}',
  funds: [],
}

interface Props {
  open: boolean
  action: TProposalActionModel
  onClose: () => void
  onSubmit?: (data: any) => void
}

const SetupExecuteSmartContractModal: React.FC<Props> = ({ open, action, onClose, onSubmit }): JSX.Element => {
  const [formData, setFormData] = useState<ExecuteData>(initialState)

  const validate = useMemo(
    () => isContractAddress(formData.address) && validateJSON(formData.message) === true,
    [formData],
  )

  useEffect(() => {
    setFormData(action?.data ?? initialState)
  }, [action])

  const handleUpdateFormData = (key: string, value: any) => {
    onSubmit && setFormData((data: any) => ({ ...data, [key]: value }))
  }

  const handleAddFund = () => {
    handleUpdateFormData('funds', [...formData.funds, { amount: '1', denom: 'uixo' }])
  }
  const handleUpdateFund = (index: number, data: any) => {
    handleUpdateFormData(
      'funds',
      formData.funds.map((fund: any, i: number) => (i === index ? data : fund)),
    )
  }
  const handleRemoveFund = (index: number) => {
    handleUpdateFormData(
      'funds',
      formData.funds.filter((fund: any, i: number) => i !== index),
    )
  }

  const handleConfirm = () => {
    onSubmit && onSubmit({ ...action, data: formData })
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
      <FlexBox $direction='column' width='100%' $gap={2}>
        <FlexBox width='100%' $gap={4}>
          <Input
            name='smart_contract_address'
            height={inputHeight}
            placeholder='Smart Contract Address'
            inputValue={formData.address}
            handleChange={(value) => handleUpdateFormData('address', value)}
          />
          <AccountValidStatus address={formData.address} style={{ flex: '0 0 48px' }} />
        </FlexBox>
      </FlexBox>

      <FlexBox $direction='column' width='100%' $gap={2}>
        <Typography color='black' weight='medium' size='xl'>
          Message (json)
        </Typography>
        <CodeMirror value={formData.message} onChange={(value) => handleUpdateFormData('message', value)} />
      </FlexBox>

      <FlexBox $direction='column' width='100%' $gap={2}>
        <Typography color='black' weight='medium' size='xl'>
          Funds
        </Typography>

        {formData.funds.map((fund: Coin, index: number) => (
          <FlexBox key={index} $alignItems='center' $gap={2} width='100%'>
            <Box style={{ flex: '0 0 200px' }}>
              <NumberCounter
                direction={'row-reverse'}
                height={inputHeight}
                value={Number(fund.amount)}
                onChange={(value) => handleUpdateFund(index, { ...fund, amount: value })}
              />
            </Box>
            {/* TODO: missing options */}
            <Dropdown
              name={'token'}
              value={fund.denom}
              options={[{ value: NATIVE_MICRODENOM, text: '$IXO' }]}
              $hasArrow={false}
              onChange={(e) => handleUpdateFund(index, { ...fund, denom: e.target.value })}
              style={{ textAlign: 'center', height: inputHeight }}
            />

            <SvgBox color='black' onClick={() => handleRemoveFund(index)} cursor='pointer'>
              <img src='/assets/images/icon-times.svg' />
            </SvgBox>
          </FlexBox>
        ))}

        <AddFundButton $alignItems='center' $gap={2.5} onClick={handleAddFund}>
          <SvgBox color='black'>
            <img src='/assets/images/icon-plus.svg' />
          </SvgBox>
          <Typography size='xl' weight='medium'>
            Add Payment
          </Typography>
        </AddFundButton>
      </FlexBox>
    </SetupActionModalTemplate>
  )
}

export default SetupExecuteSmartContractModal
