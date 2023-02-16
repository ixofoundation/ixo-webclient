import React, { useEffect, useState } from 'react'
import * as Modal from 'react-modal'
import { ReactComponent as CloseIcon } from 'assets/images/icon-close.svg'
import { ModalStyles, CloseButton } from 'components/Modals/styles'
import { FlexBox, SvgBox, theme } from 'components/App/App.styles'
import { AccountValidStatus, Button, Input, NumberCounter, SimpleSelect } from 'pages/CreateEntity/Components'
import { Typography } from 'components/Typography'
import { DeedActionConfig, TDeedActionModel } from 'types/protocol'

const inputHeight = '48px'
const initialState = {
  type: '',
  delegatorAddress: '',
  validator: '',
  tokenAmount: 1,
}

interface Props {
  open: boolean
  action: TDeedActionModel
  onClose: () => void
  onSubmit: (data: any) => void
}

const SetupAuthzExecModal: React.FC<Props> = ({ open, action, onClose, onSubmit }): JSX.Element => {
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
            <Typography color='black' weight='medium' size='xl'>
              Authz Exec Action Type
            </Typography>
            <Input
              name='authz_exec_action_type'
              height={inputHeight}
              placeholder='Stake'
              inputValue={formData.type}
              handleChange={(value) => handleUpdateFormData('type', value)}
            />
          </FlexBox>

          <FlexBox direction='column' width='100%' gap={2}>
            <Typography color='black' weight='medium' size='xl'>
              Delegator Address
            </Typography>
            <FlexBox width='100%' gap={4}>
              <Input
                name='delegator_address'
                height={inputHeight}
                placeholder='Enter Address'
                inputValue={formData.delegatorAddress}
                handleChange={(value) => handleUpdateFormData('delegatorAddress', value)}
              />
              <AccountValidStatus address={formData.delegatorAddress} style={{ flex: '0 0 48px' }} />
            </FlexBox>
          </FlexBox>

          <FlexBox direction='column' width='100%' gap={2}>
            <Typography color='black' weight='medium' size='xl'>
              Validator
            </Typography>
            <Input
              name='validator'
              height={inputHeight}
              placeholder='Select Validator'
              inputValue={formData.validator}
              handleChange={(value) => handleUpdateFormData('validator', value)}
            />
          </FlexBox>

          <FlexBox direction='column' width='100%' gap={2}>
            <Typography color='black' weight='medium' size='xl'>
              Choose Token Amount
            </Typography>
            <FlexBox alignItems='center' gap={2} width='100%'>
              <NumberCounter
                direction={'row-reverse'}
                height={inputHeight}
                value={formData.tokenAmount}
                onChange={(value) => handleUpdateFormData('tokenAmount', value)}
              />
              <SimpleSelect
                value={'$IXO'}
                options={['$IXO']}
                onChange={() => {
                  //
                }}
              />
            </FlexBox>
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

export default SetupAuthzExecModal
