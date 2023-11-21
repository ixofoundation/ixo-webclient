import React, { useEffect, useMemo, useState } from 'react'
import { Box, FlexBox, SvgBox } from 'components/App/App.styles'
import { CodeMirror, Dropdown, Input, NumberCounter } from 'pages/CreateEntity/Components'
import { Typography } from 'components/Typography'
import { TProposalActionModel } from 'types/entities'
import styled from 'styled-components'
import { ReactComponent as PlusIcon } from 'assets/images/icon-plus.svg'
import { ReactComponent as TimesIcon } from 'assets/images/icon-times.svg'
import SetupActionModalTemplate from './SetupActionModalTemplate'
import { Coin } from '@ixo/impactxclient-sdk/types/codegen/cosmos/base/v1beta1/coin'
import { validateJSON } from 'utils/validation'
import { useParams } from 'react-router-dom'

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

export interface InstantiateData {
  admin: string
  codeId: number
  label: string
  message: string
  funds: Coin[]
}

interface Props {
  open: boolean
  action: TProposalActionModel
  onClose: () => void
  onSubmit?: (data: any) => void
}

const SetupInstantiateSmartContractModal: React.FC<Props> = ({ open, action, onClose, onSubmit }): JSX.Element => {
  const { coreAddress = "" } = useParams<{ coreAddress: string }>()
  const initialState: InstantiateData = {
    admin: coreAddress,
    codeId: 0,
    label: '',
    message: '{}',
    funds: [],
  }
  const [formData, setFormData] = useState<InstantiateData>(initialState)

  const validate = useMemo(
    () => !!formData.codeId && !!formData.label && validateJSON(formData.message) === true,
    [formData],
  )

  useEffect(() => {
    setFormData(action?.data ?? initialState)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action])

  const handleUpdateFormData = (key: string, value: any) => {
    onSubmit && setFormData((data) => ({ ...data, [key]: value }))
  }

  const handleAddFund = () => {
    handleUpdateFormData('funds', [...formData.funds, { amount: '1', denom: 'uixo' }])
  }
  const handleUpdateFund = (index: number, data: any) => {
    handleUpdateFormData(
      'funds',
      formData.funds.map((fund: Coin, i: number) => (i === index ? data : fund)),
    )
  }
  const handleRemoveFund = (index: number) => {
    handleUpdateFormData(
      'funds',
      formData.funds.filter((fund: Coin, i: number) => i !== index),
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
      <FlexBox direction='column' width='100%' gap={2}>
        <FlexBox width='100%' gap={4}>
          <Input
            name='code_id'
            height={inputHeight}
            placeholder='Code ID'
            inputValue={formData.codeId}
            handleChange={(value) => handleUpdateFormData('codeId', value)}
          />
          <Input
            name='contract_label'
            height={inputHeight}
            placeholder='Contract Label'
            inputValue={formData.label}
            handleChange={(value) => handleUpdateFormData('label', value)}
          />
        </FlexBox>
      </FlexBox>

      <FlexBox direction='column' width='100%' gap={2}>
        <Typography color='black' weight='medium' size='xl'>
          Message (json)
        </Typography>
        <CodeMirror value={formData.message} onChange={(value) => handleUpdateFormData('message', value)} />
      </FlexBox>

      <FlexBox direction='column' width='100%' gap={2}>
        <Typography color='black' weight='medium' size='xl'>
          Funds
        </Typography>

        {formData.funds.map((fund: Coin, index: number) => (
          <FlexBox key={index} alignItems='center' gap={2} width='100%'>
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
              options={[{ value: 'uixo', text: '$IXO' }]}
              hasArrow={false}
              onChange={(e) => handleUpdateFund(index, { ...fund, denom: e.target.value })}
              style={{ textAlign: 'center', height: inputHeight }}
            />

            <SvgBox color='black' onClick={() => handleRemoveFund(index)} cursor='pointer'>
              <TimesIcon />
            </SvgBox>
          </FlexBox>
        ))}

        <AddFundButton alignItems='center' gap={2.5} onClick={handleAddFund}>
          <SvgBox color='black'>
            <PlusIcon />
          </SvgBox>
          <Typography size='xl' weight='medium'>
            Add Payment
          </Typography>
        </AddFundButton>
      </FlexBox>

      <FlexBox direction='column' width='100%' gap={2}>
        <Typography color='black' weight='medium' size='xl'>
          Admin (optional)
        </Typography>
        <Input
          name='admin'
          height={inputHeight}
          placeholder='Admin (optional)'
          inputValue={formData.admin}
          handleChange={(value) => handleUpdateFormData('admin', value)}
        />
      </FlexBox>
    </SetupActionModalTemplate>
  )
}

export default SetupInstantiateSmartContractModal
