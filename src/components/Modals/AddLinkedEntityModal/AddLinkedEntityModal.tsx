import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import * as Modal from 'react-modal'
import { ReactComponent as CloseIcon } from 'assets/images/icon-close.svg'
import { ModalStyles, CloseButton, ModalBody, ModalWrapper, ModalRow, ModalTitle } from 'components/Modals/styles'
import { Button, ChainSelector, Input, PropertyBox } from 'pages/CreateEntity/Components'
import { EntityLinkedEntityConfig, TEntityLinkedEntityModel } from 'types/protocol'
import { FlexBox, SvgBox, theme } from 'components/App/App.styles'
import { BlockSyncService } from 'services/blocksync'
import { validateEntityDid } from 'utils/validation'
import { v4 as uuidv4 } from 'uuid'
import { ReactComponent as SearchIcon } from 'assets/images/icon-search.svg'

const bsService = new BlockSyncService()

const SearchInputStyles = {
  fontFamily: theme.secondaryFontFamily,
  fontWeight: 500,
  fontSize: 20,
  lineHeight: 28,
}

interface Props {
  open: boolean
  onClose: () => void
  onAdd: (linkedEntity: TEntityLinkedEntityModel) => void
}

const AddLinkedEntityModal: React.FC<Props> = ({ open, onClose, onAdd }): JSX.Element => {
  const [selectedType, setSelectedType] = useState('')
  const [chainId, setChainId] = useState(undefined)
  const [entityDid, setEntityDid] = useState('')
  const [validate, setValidate] = useState(false)

  const handleAdd = () => {
    const id = uuidv4()
    onAdd({
      id,
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
      setSelectedType('')
      setChainId(undefined)
      setEntityDid('')
    }
  }, [open])

  /**
   * @description check entity alive by entityDid, call blocksync
   */
  useEffect(() => {
    if (validateEntityDid(entityDid)) {
      bsService.entity.getEntityById(entityDid).then(() => setValidate(true))
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
          {!selectedType ? (
            <ModalBody>
              {_.chunk(Object.entries(EntityLinkedEntityConfig), 3).map((row, rowIdx) => (
                <ModalRow key={rowIdx} style={{ justifyContent: 'flex-start' }}>
                  {row.map(([entityType, value]) => (
                    <PropertyBox
                      key={entityType}
                      icon={<value.icon />}
                      label={value.text}
                      handleClick={(): void => setSelectedType(entityType)}
                    />
                  ))}
                </ModalRow>
              ))}
            </ModalBody>
          ) : (
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
                <Button variant='primary' disabled={!validate} onClick={handleAdd}>
                  Continue
                </Button>
              </FlexBox>
            </FlexBox>
          )}
        </ModalWrapper>
      </Modal>
    </>
  )
}

export default AddLinkedEntityModal
