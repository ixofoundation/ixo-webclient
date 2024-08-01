import React, { useEffect, useState } from 'react'
import * as Modal from 'react-modal'
import CloseIcon from 'assets/images/icon-close.svg'
import { ModalStyles, CloseButton, ModalWrapper, ModalTitle } from 'components/Modals/styles'
import { Button, InputWithLabel } from 'pages/CreateEntity/Components'
import { FlexBox } from 'components/App/App.styles'
import { useTheme } from 'styled-components'
import { LinkedEntity } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { Typography } from 'components/Typography'
import { ixo } from '@ixo/impactxclient-sdk'
import { isAccountAddress } from 'utils/validation'

interface Props {
  open: boolean
  onClose: () => void
  onAdd: (linkedEntity: LinkedEntity) => void
}

const DelegateAccountSetupModal: React.FC<Props> = ({ open, onClose, onAdd }): JSX.Element => {
  const theme: any = useTheme()
  const [address, setAddress] = useState('')

  /**
   * @description initialize states
   */
  useEffect(() => {
    setAddress('')
  }, [open])

  const handleAdd = () => {
    if (isAccountAddress(address)) {
      onAdd(
        ixo.iid.v1beta1.LinkedEntity.fromPartial({
          type: 'IndividualAccount',
          id: address,
          relationship: `delegate`,
          service: ``,
        }),
      )
      onClose()
    }
  }

  return (
    <>
      {/* @ts-ignore */}
      <Modal style={ModalStyles} isOpen={open} onRequestClose={onClose} contentLabel='Modal' ariaHideApp={false}>
        <CloseButton onClick={onClose}>
          <CloseIcon />
        </CloseButton>

        <ModalWrapper>
          <ModalTitle>Add a Delegate</ModalTitle>
          <FlexBox $direction='column' $gap={4}>
            <Typography>Delegates represent DAO Entities in decentralised governance.</Typography>
            <FlexBox width='100%' height='100%' $gap={4}>
              <InputWithLabel
                name='delegate_ixo_account'
                inputValue={address}
                handleChange={setAddress}
                label='Delegate ixo Address'
                width='100%'
                height='48px'
                style={{
                  fontFamily: theme.secondaryFontFamily,
                  fontWeight: 500,
                  fontSize: 20,
                  lineHeight: 28,
                }}
                wrapperStyle={{
                  color: address ? (isAccountAddress(address) ? theme.ixoGreen : theme.ixoRed) : theme.ixoNewBlue,
                }}
              />
            </FlexBox>
            <FlexBox width='100%' $justifyContent='flex-end'>
              <Button variant='primary' disabled={!isAccountAddress(address)} onClick={handleAdd}>
                Continue
              </Button>
            </FlexBox>
          </FlexBox>
        </ModalWrapper>
      </Modal>
    </>
  )
}

export default DelegateAccountSetupModal
