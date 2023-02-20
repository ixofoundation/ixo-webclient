import React, { useEffect, useState } from 'react'
import * as Modal from 'react-modal'
import { ReactComponent as CloseIcon } from 'assets/images/icon-close.svg'
import { ModalStyles, CloseButton } from 'components/Modals/styles'
import { Box, FlexBox, SvgBox, theme } from 'components/App/App.styles'
import { AccountValidStatus, Button, Dropdown, Input, NumberCounter } from 'pages/CreateEntity/Components'
import { Typography } from 'components/Typography'
import { DeedActionConfig, TDeedActionModel } from 'types/protocol'
import styled from 'styled-components'
import { ReactComponent as PlusIcon } from 'assets/images/icon-plus.svg'
import { ReactComponent as TimesIcon } from 'assets/images/icon-times.svg'

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
  const Icon = DeedActionConfig[action.group].items[action.type].icon

  useEffect(() => {
    setFormData(action?.data ?? initialState)
  }, [action])

  const handleUpdateFormData = (key: string, value: any) => {
    setFormData((data: any) => ({ ...data, [key]: value }))
  }

  const handleAddFund = () => {
    handleUpdateFormData('funds', [...formData.funds, []])
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
    onSubmit(formData)
    onClose()
  }

  return (
    // @ts-ignore
    <Modal style={ModalStyles} isOpen={open} onRequestClose={onClose} contentLabel='Modal' ariaHideApp={false}>
      <CloseButton onClick={onClose}>
        <CloseIcon />
      </CloseButton>

      <FlexBox direction='column' gap={8} width='440px' fontSize={5} fontWeight={500}>
        <FlexBox alignItems='center' gap={2}>
          <SvgBox color={theme.ixoBlack} svgWidth={8} svgHeight={8}>
            <Icon />
          </SvgBox>
          <Typography weight='medium' size='xl'>
            {action.type}
          </Typography>
        </FlexBox>

        <FlexBox direction='column' width='100%' gap={4}>
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
                  value={'$IXO'}
                  options={['$IXO']}
                  hasArrow={false}
                  onChange={(e) => handleUpdateFund(index, { ...fund, type: e.target.value })}
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
        </FlexBox>

        <FlexBox width='100%'>
          <Button variant='primary' onClick={handleConfirm} style={{ width: '100%' }}>
            Confirm
          </Button>
        </FlexBox>
      </FlexBox>
    </Modal>
  )
}

export default SetupInstantiateSmartContractModal
