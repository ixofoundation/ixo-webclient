import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import * as Modal from 'react-modal'
import { FlexBox, SvgBox } from 'components/App/App.styles'
import { Button, InputWithLabel } from 'screens/CreateEntity/Components'
import { ModalStyles, CloseButton } from 'components/Modals/styles'
import { Typography } from 'components/Typography'
import { useMantineTheme } from '@mantine/core'
import { validateDid } from 'utils/validation'
import { IconCheckCircle } from 'components/IconPaths'
import { IconTimesCircle } from 'components/IconPaths'
import { IconClose } from 'components/IconPaths'


interface Props {
  open: boolean
  recipientDid: string
  onClose: () => void
  onSubmit?: (recipientDid: string) => void
}
const TransferEntityModal: React.FC<Props> = ({ open, recipientDid, onClose, onSubmit }): JSX.Element => {
  const theme = useMantineTheme()
  const [did, setDid] = useState('')

  useEffect(() => {
    setDid('')
  }, [open])

  return (
    // @ts-ignore
    <Modal style={ModalStyles} isOpen={open} onRequestClose={onClose} contentLabel='Modal' ariaHideApp={false}>
      <CloseButton onClick={onClose}>
        <Image src={IconClose} alt='Close' width={5} height={5} color={theme.colors.blue[5]} />
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
                color: did ? (validateDid(did) ? theme.ixoGreen : theme.ixoRed) : theme.colors.blue[5],
              }}
            />
            {did && !validateDid(did) && (
              <FlexBox width='100%' $justifyContent='flex-end' $alignItems='center' $gap={2}>
                <Typography size='xl'>Not a valid ixo DID</Typography>
                <SvgBox color={theme.ixoRed}>
                  <Image src={IconTimesCircle} alt='TimesCircle' width={5} height={5} color={theme.colors.blue[5]} />
                </SvgBox>
              </FlexBox>
            )}
            {did && validateDid(did) && (
              <FlexBox width='100%' $justifyContent='flex-end' $alignItems='center' $gap={2}>
                <Typography size='xl'>Valid ixo DID</Typography>
                <SvgBox color={theme.ixoGreen}>
                  <Image src={IconCheckCircle} alt='CheckCircle' width={5} height={5} color={theme.colors.blue[5]} />
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
