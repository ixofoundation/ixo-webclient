import React, { useEffect, useState } from 'react'
import * as Modal from 'react-modal'
import { ReactComponent as CloseIcon } from 'assets/images/icon-close.svg'
import { ModalStyles, CloseButton } from 'components/Modals/styles'
import { FlexBox, SvgBox, theme } from 'components/App/App.styles'
import { AccountValidStatus, Button, Input } from 'pages/CreateEntity/Components'
import { Typography } from 'components/Typography'
import { DeedActionConfig, TDeedActionModel } from 'types/protocol'

const inputHeight = '48px'
const initialState = {
  type: 'display', // | 'remove'
  nftCollectionAddress: '',
}

interface Props {
  open: boolean
  action: TDeedActionModel
  onClose: () => void
  onSubmit: (data: any) => void
}

const SetupManageTreasuryNFTsModal: React.FC<Props> = ({ open, action, onClose, onSubmit }): JSX.Element => {
  const [formData, setFormData] = useState<any>(initialState)
  const Icon = DeedActionConfig[action.group].items[action.type].icon

  useEffect(() => {
    setFormData(action?.data ?? initialState)
  }, [action])

  const handleUpdateFormData = (key: string, value: string) => {
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
          <FlexBox width='100%' gap={4}>
            <Button
              variant={formData.type === 'display' ? 'primary' : 'secondary'}
              onClick={() => handleUpdateFormData('type', 'display')}
              style={{ width: '100%', textTransform: 'capitalize', fontWeight: 500 }}
            >
              Display Collection
            </Button>
            <Button
              variant={formData.type === 'remove' ? 'primary' : 'secondary'}
              onClick={() => handleUpdateFormData('type', 'remove')}
              style={{ width: '100%', textTransform: 'capitalize', fontWeight: 500 }}
            >
              Remove Collection
            </Button>
          </FlexBox>

          <FlexBox direction='column' width='100%' gap={2}>
            <Typography color='black' weight='medium' size='xl' transform='capitalize'>
              {formData.type} NFT Collection in Treasury
            </Typography>

            <FlexBox width='100%' gap={4}>
              <Input
                name='collection_contract_address'
                height={inputHeight}
                placeholder='Collection Contract Address'
                inputValue={formData.nftCollectionAddress}
                handleChange={(value) => handleUpdateFormData('nftCollectionAddress', value)}
              />
              <AccountValidStatus address={formData.nftCollectionAddress} style={{ flex: '0 0 48px' }} />
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

export default SetupManageTreasuryNFTsModal
