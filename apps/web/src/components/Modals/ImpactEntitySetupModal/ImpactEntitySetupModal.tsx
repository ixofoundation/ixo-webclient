import React, { useEffect, useMemo, useState } from 'react'
import * as Modal from 'react-modal'
import { ReactComponent as CloseIcon } from '/public/assets/images/icon-close.svg'
import { ModalStyles, CloseButton, ModalWrapper, ModalTitle } from 'components/Modals/styles'
import { Button, ChainSelector, Input } from 'screens/CreateEntity/Components'
import { FlexBox, SvgBox } from 'components/App/App.styles'
import { ReactComponent as SearchIcon } from '/public/assets/images/icon-search.svg'
import { useMantineTheme } from '@mantine/core'
import { LinkedEntity } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { useGetEntityById } from 'graphql/entities'

interface Props {
  open: boolean
  onClose: () => void
  onAdd: (linkedEntity: LinkedEntity) => void
}

const ImpactEntitySetupModal: React.FC<Props> = ({ open, onClose, onAdd }): JSX.Element => {
  const theme = useMantineTheme()
  const SearchInputStyles = {
    fontFamily: theme.secondaryFontFamily,
    fontWeight: 500,
    fontSize: 20,
    lineHeight: 28,
  }
  const [chainId, setChainId] = useState(undefined)
  const [entityDid, setEntityDid] = useState('')

  const { data: selectedEntity } = useGetEntityById(entityDid)

  const selectedType = useMemo(() => selectedEntity?.type, [selectedEntity])

  const handleAdd = () => {
    onAdd({
      id: entityDid,
      type: selectedType,
      relationship: 'verifies', // TODO: TBD
      service: 'ixo',
    })
    onClose()
  }

  /**
   * @description initialize states
   */
  useEffect(() => {
    if (open === false) {
      setChainId(undefined)
      setEntityDid('')
    }
  }, [open])

  return (
    <>
      {/* @ts-ignore */}
      <Modal style={ModalStyles} isOpen={open} onRequestClose={onClose} contentLabel='Modal' ariaHideApp={false}>
        <CloseButton onClick={onClose}>
          <CloseIcon />
        </CloseButton>

        <ModalWrapper>
          <ModalTitle>Add a Linked Entity</ModalTitle>
          <FlexBox $direction='column' $gap={4}>
            <FlexBox width='100%' height='100%' $gap={4}>
              <ChainSelector chainId={chainId!} onChange={setChainId as any} />
              <Input
                name='entityDid'
                inputValue={entityDid}
                handleChange={setEntityDid}
                placeholder='Type to Search or enter a DID'
                preIcon={
                  <SvgBox color={theme.ixoGrey700}>
                    <SearchIcon />
                  </SvgBox>
                }
                width='400px'
                height='48px'
                style={SearchInputStyles}
              />
            </FlexBox>
            <FlexBox width='100%' $justifyContent='flex-end'>
              <Button variant='primary' disabled={!entityDid || !selectedType} onClick={handleAdd}>
                Continue
              </Button>
            </FlexBox>
          </FlexBox>
        </ModalWrapper>
      </Modal>
    </>
  )
}

export default ImpactEntitySetupModal
