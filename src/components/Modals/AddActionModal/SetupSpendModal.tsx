import React, { useEffect, useState } from 'react'
import * as Modal from 'react-modal'
import { ReactComponent as CloseIcon } from 'assets/images/icon-close.svg'
import { ModalStyles, CloseButton } from 'components/Modals/styles'
import { FlexBox, SvgBox, theme } from 'components/App/App.styles'
import { AccountValidStatus, Button, Dropdown, Input } from 'pages/CreateEntity/Components'
import { Typography } from 'components/Typography'
import { DeedActionConfig, TDeedActionModel } from 'types/protocol'

const inputHeight = '48px'
const initialState = {
  token: {
    denom: '$IXO',
    amount: 1,
  },
  toAddress: '',
}

interface Props {
  open: boolean
  action: TDeedActionModel
  onClose: () => void
  onSubmit: (data: any) => void
}

const SetupSpendModal: React.FC<Props> = ({ open, action, onClose, onSubmit }): JSX.Element => {
  const [formData, setFormData] = useState<any>(initialState)
  const Icon = DeedActionConfig[action.group].items[action.type].icon

  useEffect(() => {
    setFormData(action?.data ?? initialState)
  }, [action])

  const handleUpdateFormData = (key: string, value: string | number) => {
    setFormData((data: any) => ({ ...data, [key]: value }))
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

      <FlexBox direction='column' gap={8} width='440px'>
        <FlexBox alignItems='center' gap={4}>
          <SvgBox color={theme.ixoBlack} svgWidth={8} svgHeight={8}>
            <Icon />
          </SvgBox>
          <Typography weight='medium' size='xl'>
            {action.type}
          </Typography>
        </FlexBox>

        <FlexBox direction='column' width='100%' gap={4}>
          <FlexBox width='100%' gap={4}>
            <Input
              height={inputHeight}
              inputValue={formData.token?.amount}
              handleChange={(value) => handleUpdateFormData('token', { ...formData.token, amount: value })}
              style={{ textAlign: 'right' }}
            />
            {/* TODO: missing options */}
            <Dropdown
              name={'token'}
              value={formData.token?.denom}
              options={[formData.token?.denom]}
              hasArrow={false}
              onChange={(e) => handleUpdateFormData('token', { ...formData.token, denom: e.target.value })}
              style={{ textAlign: 'center', height: inputHeight }}
            />
          </FlexBox>

          <FlexBox width='100%'>
            <Typography weight='medium' size='xl'>
              will be send to
            </Typography>
          </FlexBox>

          <FlexBox width='100%' gap={4}>
            <Input
              name='to_address'
              height={inputHeight}
              placeholder='Paste Address'
              inputValue={formData.toAddress}
              handleChange={(value) => handleUpdateFormData('toAddress', value)}
            />
            <AccountValidStatus address={formData.toAddress} style={{ flex: `0 0 ${inputHeight}` }} />
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

export default SetupSpendModal
