import React, { useEffect, useMemo, useState } from 'react'
import { Box, FlexBox, SvgBox } from 'components/App/App.styles'
import { AccountValidStatus, Dropdown, Input, NumberCounter } from 'pages/CreateEntity/Components'
import { Typography } from 'components/Typography'
import { TDeedActionModel } from 'types/protocol'
import styled from 'styled-components'
import { ReactComponent as PlusIcon } from 'assets/images/icon-plus.svg'
import { ReactComponent as TimesIcon } from 'assets/images/icon-times.svg'
import SetupActionModalTemplate from './SetupActionModalTemplate'

const inputHeight = '48px'

const AddFundButton = styled(FlexBox)`
  width: 200px;
  height: ${inputHeight};
  padding: 10px;
  color: black;
  border: 1px solid ${(props) => props.theme.ixoBlue};
  border-radius: 8px;
  cursor: pointer;
`

const initialState = {
  codeId: '',
  contractLabel: '',
  message: '',
  funds: [],
  admin: '',
}

interface Props {
  open: boolean
  action: TDeedActionModel
  onClose: () => void
  onSubmit: (data: any) => void
}

const SetupInstantiateSmartContractModal: React.FC<Props> = ({ open, action, onClose, onSubmit }): JSX.Element => {
  const [formData, setFormData] = useState<any>(initialState)

  const validate = useMemo(
    () =>
      formData.codeId &&
      formData.contractLabel &&
      formData.message &&
      formData.funds.length > 0 &&
      !formData.funds.some(({ amount, denom }: any) => !amount || !denom),
    [formData],
  )

  useEffect(() => {
    setFormData(action?.data ?? initialState)
  }, [action])

  const handleUpdateFormData = (key: string, value: any) => {
    setFormData((data: any) => ({ ...data, [key]: value }))
  }

  const handleAddFund = () => {
    handleUpdateFormData('funds', [...formData.funds, { amount: 1, denom: '$IXO' }])
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
    onSubmit({ ...action, data: formData })
    onClose()
  }

  return (
    <SetupActionModalTemplate
      open={open}
      action={action}
      onClose={onClose}
      onSubmit={handleConfirm}
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
            inputValue={formData.contractLabel}
            handleChange={(value) => handleUpdateFormData('contractLabel', value)}
          />
          <AccountValidStatus address={''} style={{ flex: '0 0 48px' }} />
        </FlexBox>
      </FlexBox>

      <FlexBox direction='column' width='100%' gap={2}>
        <FlexBox width='100%' gap={4}>
          <Input
            name='message'
            height={inputHeight}
            placeholder='Message (json)'
            inputValue={formData.message}
            handleChange={(value) => handleUpdateFormData('message', value)}
          />
          <AccountValidStatus address={formData.message} style={{ flex: '0 0 48px' }} />
        </FlexBox>
      </FlexBox>

      <FlexBox direction='column' width='100%' gap={2}>
        <Typography color='black' weight='medium' size='xl'>
          Funds
        </Typography>

        {formData.funds.map((fund: any, index: number) => (
          <FlexBox key={index} alignItems='center' gap={2} width='100%'>
            <Box style={{ flex: '0 0 200px' }}>
              <NumberCounter
                direction={'row-reverse'}
                height={inputHeight}
                value={fund.amount}
                onChange={(value) => handleUpdateFund(index, { ...fund, amount: value })}
              />
            </Box>
            {/* TODO: missing options */}
            <Dropdown
              name={'token'}
              value={fund.denom}
              options={['$IXO']}
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
