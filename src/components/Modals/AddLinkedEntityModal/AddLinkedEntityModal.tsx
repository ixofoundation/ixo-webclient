import React, { useEffect, useState } from 'react'
import * as Modal from 'react-modal'
import { ReactComponent as CloseIcon } from 'assets/images/icon-close.svg'
import { ModalStyles, CloseButton, ModalWrapper, ModalTitle } from 'components/Modals/styles'
import { Button, ChainSelector, Input } from 'pages/CreateEntity/Components'
import { TEntityLinkedEntityModel } from 'types/protocol'
import { FlexBox, SvgBox } from 'components/App/App.styles'
import { BlockSyncService } from 'services/blocksync'
import { validateEntityDid } from 'utils/validation'
import { ReactComponent as SearchIcon } from 'assets/images/icon-search.svg'
import { useTheme } from 'styled-components'

const bsService = new BlockSyncService()

interface Props {
  open: boolean
  onClose: () => void
  onAdd: (linkedEntity: TEntityLinkedEntityModel) => void
}

const AddLinkedEntityModal: React.FC<Props> = ({ open, onClose, onAdd }): JSX.Element => {
  const theme: any = useTheme()
  const SearchInputStyles = {
    fontFamily: theme.secondaryFontFamily,
    fontWeight: 500,
    fontSize: 20,
    lineHeight: 28,
  }
  const [chainId, setChainId] = useState(undefined)
  const [entityDid, setEntityDid] = useState('')
  const [selectedType, setSelectedType] = useState('')

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
      setSelectedType('')
    }
  }, [open])

  /**
   * @description check entity alive by entityDid, call blocksync
   */
  useEffect(() => {
    if (validateEntityDid(entityDid)) {
      bsService.entity
        .getEntityById(entityDid)
        .then((response: any) => {
          setSelectedType(response.type)
        })
        .catch(() => setSelectedType(''))
    } else {
      setSelectedType('')
    }
  }, [entityDid])

  return (
    <>
      {/* @ts-ignore */}
      <Modal style={ModalStyles} isOpen={open} onRequestClose={onClose} contentLabel='Modal' ariaHideApp={false}>
        <CloseButton onClick={onClose}>
          <CloseIcon />
        </CloseButton>

        <ModalWrapper>
          <ModalTitle>Add a Linked Entity</ModalTitle>
          <FlexBox direction='column' gap={4}>
            <FlexBox width='100%' height='100%' gap={4}>
              <ChainSelector chainId={chainId!} onChange={setChainId as any} />
              <Input
                name='entitydid'
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
            <FlexBox width='100%' justifyContent='flex-end'>
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

export default AddLinkedEntityModal
