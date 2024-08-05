import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import * as Modal from 'react-modal'
import { ModalStyles, CloseButton, ModalWrapper, ModalTitle } from 'components/Modals/styles'
import { Button, InputWithLabel } from 'screens/CreateEntity/Components'
import { FlexBox } from 'components/App/App.styles'
import { useMantineTheme } from '@mantine/core'
import { LinkedEntity } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { KeplrChainInfo } from '@ixo/cosmos-chain-resolver/types/types/chain'
import { determineChainFromAddress } from 'utils/account'
import { Typography } from 'components/Typography'
import { Avatar } from 'screens/CurrentEntity/Components'
import { ixo } from '@ixo/impactxclient-sdk'
import { IconClose } from 'components/IconPaths'


interface Props {
  open: boolean
  onClose: () => void
  onAdd: (linkedEntity: LinkedEntity) => void
}

const LinkedAccountSetupModal: React.FC<Props> = ({ open, onClose, onAdd }): JSX.Element => {
  const theme = useMantineTheme()
  const [address, setAddress] = useState('')
  const [chainInfo, setChainInfo] = useState<KeplrChainInfo | undefined>(undefined)

  /**
   * @description initialize states
   */
  useEffect(() => {
    setAddress('')
    setChainInfo(undefined)
  }, [open])

  useEffect(() => {
    if (address) {
      setChainInfo(undefined)
      determineChainFromAddress(address)
        .then((chainInfo) => {
          setChainInfo(chainInfo)
        })
        .catch(() => {
          setChainInfo(undefined)
        })
    } else {
      setChainInfo(undefined)
    }
  }, [address])

  const handleAdd = () => {
    if (chainInfo) {
      onAdd(
        ixo.iid.v1beta1.LinkedEntity.fromPartial({
          type: 'BlockchainAccount',
          id: address,
          relationship: `${chainInfo?.chainName} Network`,
          service: `did:cosmos:${chainInfo?.chainName}`,
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
          <Image src={IconClose} alt='Close' width={5} height={5} color={theme.colors.blue[5]} />
        </CloseButton>

        <ModalWrapper>
          <ModalTitle>Add a Linked Account</ModalTitle>
          <FlexBox $direction='column' $gap={4}>
            <FlexBox width='100%' height='100%' $gap={4}>
              <InputWithLabel
                name='address'
                inputValue={address}
                handleChange={setAddress}
                label='Enter Account'
                width='400px'
                height='48px'
                style={{
                  fontFamily: theme.secondaryFontFamily,
                  fontWeight: 500,
                  fontSize: 20,
                  lineHeight: 28,
                }}
                wrapperStyle={{ color: address ? (chainInfo ? theme.ixoGreen : theme.ixoRed) : theme.colors.blue[5] }}
              />
              <FlexBox
                $justifyContent='center'
                $alignItems='center'
                $gap={2}
                width='200px'
                height='48px'
                $borderWidth='1px'
                $borderStyle='solid'
                $borderColor={address ? (chainInfo ? theme.ixoGreen : theme.ixoRed) : theme.colors.blue[5]}
                $borderRadius='8px'
              >
                {address ? (
                  chainInfo ? (
                    <>
                      <Avatar url={chainInfo.chainSymbolImageUrl} size={32} borderWidth={0} />
                      <Typography size='xl' color='black'>
                        {chainInfo.chainName}
                      </Typography>
                    </>
                  ) : (
                    <Typography size='xl' color='grey500'>
                      not recognised
                    </Typography>
                  )
                ) : (
                  <Typography size='xl' color='grey500'>
                    chain
                  </Typography>
                )}
              </FlexBox>
            </FlexBox>
            <FlexBox width='100%' $justifyContent='flex-end'>
              <Button variant='primary' disabled={!chainInfo} onClick={handleAdd}>
                Continue
              </Button>
            </FlexBox>
          </FlexBox>
        </ModalWrapper>
      </Modal>
    </>
  )
}

export default LinkedAccountSetupModal
