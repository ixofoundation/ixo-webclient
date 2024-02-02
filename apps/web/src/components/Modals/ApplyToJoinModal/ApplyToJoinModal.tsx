import React, { useState } from 'react'
import * as Modal from 'react-modal'
import { ReactComponent as CloseIcon } from 'assets/images/icon-close.svg'
import { ModalStyles, CloseButton, ModalBody, ModalWrapper, ModalRow, ModalTitle } from 'components/Modals/styles'
import { Button, PropertyBox } from 'pages/CreateEntity/Components'
import { TEntityModel } from 'types/entities'
import { FlexBox } from 'components/App/App.styles'
import { ReactComponent as ClaimIcon } from 'assets/images/icon-claim.svg'
import { Typography } from 'components/Typography'
import { useGetClaimTemplateEntityByCollectionId } from 'graphql/claims'
import { AgentRoles } from 'types/models'

interface OfferBoxProps {
  entity: TEntityModel
  selectedCollectionId: string
  setSelectedCollectionId: (selectedCollectionId: string) => void
}

const OfferBox: React.FC<OfferBoxProps> = ({ entity, selectedCollectionId, setSelectedCollectionId }) => {
  const { linkedEntity } = entity
  const collectionId = linkedEntity?.find((v) => v.type === 'ClaimCollection' && v.relationship === 'submission')?.id
  const claimTemplateEntity = useGetClaimTemplateEntityByCollectionId(collectionId!)

  return (
    <FlexBox $direction='column' $alignItems='center' $gap={4}>
      <PropertyBox
        icon={<ClaimIcon />}
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
  offers: TEntityModel[]
  open: boolean
  onClose: () => void
  onSubmit: (selectedCollectionId: string, agentRole: AgentRoles) => void
}

const ApplyToJoinModal: React.FC<Props> = ({ offers, open, onClose, onSubmit }): JSX.Element => {
  const [selectedCollectionId, setSelectedCollectionId] = useState('')

  const handleSubmit = (agentRole: AgentRoles) => (): void => {
    onSubmit(selectedCollectionId, agentRole)
    onClose()
  }
  return (
    // @ts-ignore
    <Modal style={ModalStyles} isOpen={open} onRequestClose={onClose} contentLabel='Modal' ariaHideApp={false}>
      <CloseButton onClick={onClose}>
        <CloseIcon />
      </CloseButton>

      <ModalWrapper style={{ width: 600 }}>
        <ModalTitle>For which claim collection would you like to submit an offer?</ModalTitle>
        <ModalBody>
          <ModalRow style={{ justifyContent: 'left' }}>
            {offers.map((entity: TEntityModel) => (
              <OfferBox
                key={entity.id}
                entity={entity}
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
              Continue as Service Agent
            </Button>
            <Button
              variant='primary'
              onClick={handleSubmit(AgentRoles.evaluators)}
              textTransform='capitalize'
              size='flex'
              disabled={!selectedCollectionId}
            >
              Continue as Evaluation Agent
            </Button>
          </ModalRow>
        </ModalBody>
      </ModalWrapper>
    </Modal>
  )
}

export default ApplyToJoinModal
