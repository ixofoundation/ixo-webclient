import React, { useEffect, useState } from 'react'
import * as Modal from 'react-modal'
import { FlexBox, SvgBox } from 'components/App/App.styles'
import { Button, InputWithLabel } from 'pages/CreateEntity/Components'
import { ModalStyles, CloseButton } from 'components/Modals/styles'
import { Typography } from 'components/Typography'
import { useTheme } from 'styled-components'
import TimesCircleIcon from 'assets/images/icon-times-circle.svg'
import CheckCircleIcon from 'assets/images/icon-check-circle.svg'
import CloseIcon from 'assets/images/icon-close.svg'
import { validateDid } from 'utils/validation'

interface Props {
  open: boolean
  recipientDid: string
  onClose: () => void
  onSubmit?: (recipientDid: string) => void
}
const TransferEntityModal: React.FC<Props> = ({ open, recipientDid, onClose, onSubmit }): JSX.Element => {
  const theme: any = useTheme()
  const [did, setDid] = useState('')

  useEffect(() => {
    setDid('')
  }, [open])

  return (
    // @ts-ignore
    <Modal style={ModalStyles} isOpen={open} onRequestClose={onClose} contentLabel='Modal' ariaHideApp={false}>
      <CloseButton onClick={onClose}>
        <CloseIcon />
      </CloseButton>

      <FlexBox $direction='column' $gap={8} width={'700px'}>
        <Typography weight='medium' size='xl'>
          Transfer Entity
        </Typography>

        <FlexBox width='100%' $direction='column' $gap={4}>
          <FlexBox $direction='column' width='100%' $gap={4}>
            <Typography>Paste the recipient ixo DID</Typography>
            <InputWithLabel
              name='ixo_did'
              height='48px'
              label='Recipient ixo did'
              inputValue={did}
              handleChange={(value) => setDid(value)}
              wrapperStyle={{
                color: did ? (validateDid(did) ? theme.ixoGreen : theme.ixoRed) : theme.ixoNewBlue,
              }}
            />
            {did && !validateDid(did) && (
              <FlexBox width='100%' $justifyContent='flex-end' $alignItems='center' $gap={2}>
                <Typography size='xl'>Not a valid ixo DID</Typography>
                <SvgBox color={theme.ixoRed}>
                  <TimesCircleIcon />
                </SvgBox>
              </FlexBox>
            )}
            {did && validateDid(did) && (
              <FlexBox width='100%' $justifyContent='flex-end' $alignItems='center' $gap={2}>
                <Typography size='xl'>Valid ixo DID</Typography>
                <SvgBox color={theme.ixoGreen}>
                  <CheckCircleIcon />
                </SvgBox>
              </FlexBox>
            )}
          </FlexBox>
        </FlexBox>

        {onSubmit && (
          <FlexBox width='100%'>
            <Button
              variant='primary'
              onClick={() => onSubmit(did)}
              disabled={!validateDid(did)}
              style={{ width: '100%' }}
            >
              Confirm
            </Button>
          </FlexBox>
        )}
      </FlexBox>
    </Modal>
  )
}
export default TransferEntityModal
