import React, { useState } from 'react'
import * as Modal from 'react-modal'

import { ModalStyles, CloseButton, ModalBody, ModalWrapper, ModalRow, ModalTitle } from 'components/Modals/styles'
import { Button, PropertyBox } from 'screens/CreateEntity/Components'
import { FlexBox } from 'components/CoreEntry/App.styles'

import { Typography } from 'components/Typography'
import { useGetClaimTemplateEntityByCollectionId } from 'graphql/claims'
import { AgentRoles } from 'types/models'
import { ClaimCollection } from 'generated/graphql'

interface OfferBoxProps {
  collection: ClaimCollection
  selectedCollectionId: string
  setSelectedCollectionId: (selectedCollectionId: string) => void
}

export const OfferBox: React.FC<OfferBoxProps> = ({ collection, selectedCollectionId, setSelectedCollectionId }) => {
  const collectionId = collection.id
  const claimTemplateEntity = useGetClaimTemplateEntityByCollectionId(collectionId!)

  return (
    <FlexBox $direction='column' $alignItems='center' $gap={4}>
      <PropertyBox
        icon={<img src='/assets/images/icon-claim.svg' />}
        required={true}
        set={true}
        hovered={!!collectionId && selectedCollectionId === collectionId}
        handleClick={(): void => {
          collectionId && setSelectedCollectionId(collectionId)
        }}
      />
      <Typography
        variant='primary'
        size='md'
        color={selectedCollectionId === collectionId ? 'blue' : 'black'}
        $overflowLines={2}
        style={{ width: 100, textAlign: 'center' }}
      >
        {claimTemplateEntity?.profile?.name}
      </Typography>
    </FlexBox>
  )
}

interface Props {
  claimCollections: ClaimCollection[]
  open: boolean
  onClose: () => void
  onSubmit: (selectedCollectionId: string, agentRole: AgentRoles) => void
}

const ApplyToJoinModal: React.FC<Props> = ({ claimCollections = [], open, onClose, onSubmit }): JSX.Element => {
  const [selectedCollectionId, setSelectedCollectionId] = useState('')

  const handleSubmit = (agentRole: AgentRoles) => (): void => {
    onSubmit(selectedCollectionId, agentRole)
    onClose()
  }
  return (
    // @ts-ignore
    <Modal style={ModalStyles} isOpen={open} onRequestClose={onClose} contentLabel='Modal' ariaHideApp={false}>
      <CloseButton onClick={onClose}>
        <img src='/assets/images/icon-close.svg' />
      </CloseButton>

      <ModalWrapper style={{ width: 600 }}>
        <ModalTitle>Select a Claim Collection</ModalTitle>
        <ModalBody>
          <ModalRow style={{ justifyContent: 'left', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            {claimCollections.map((collection: ClaimCollection) => (
              <OfferBox
                key={collection.id}
                collection={collection}
                selectedCollectionId={selectedCollectionId}
                setSelectedCollectionId={setSelectedCollectionId}
              />
            ))}
          </ModalRow>
          <ModalRow>
            <Button
              variant='primary'
              onClick={handleSubmit(AgentRoles.serviceProviders)}
              textTransform='capitalize'
              size='flex'
              disabled={!selectedCollectionId}
            >
              Continue as Agent
            </Button>
            <Button
              variant='primary'
              onClick={handleSubmit(AgentRoles.evaluators)}
              textTransform='capitalize'
              size='flex'
              disabled={!selectedCollectionId}
            >
              Continue as Evaluator
            </Button>
          </ModalRow>
        </ModalBody>
      </ModalWrapper>
    </Modal>
  )
}

export default ApplyToJoinModal
