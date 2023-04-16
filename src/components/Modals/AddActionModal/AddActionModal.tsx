import React, { useEffect, useMemo, useState } from 'react'
import * as Modal from 'react-modal'
import { ReactComponent as CloseIcon } from 'assets/images/icon-close.svg'
import { ModalStyles, CloseButton } from 'components/Modals/styles'
import { ProposalActionConfig, TProposalActionModel } from 'types/protocol'
import { FlexBox, GridContainer, GridItem } from 'components/App/App.styles'
import { Button, Dropdown, PropertyBox } from 'pages/CreateEntity/Components'
import { Typography } from 'components/Typography'
import { v4 as uuidv4 } from 'uuid'
import { useCurrentDaoGroup } from 'hooks/currentDao'
import { useParams } from 'react-router-dom'

interface Props {
  open: boolean
  onClose: () => void
  onAdd: (action: TProposalActionModel) => void
}

const AddActionModal: React.FC<Props> = ({ open, onClose, onAdd }): JSX.Element => {
  const { coreAddress } = useParams<{ coreAddress: string }>()
  const { contractName } = useCurrentDaoGroup(coreAddress)

  const options = Object.values(ProposalActionConfig).map((item) => item.text)
  const [selectedGroup, setSelectedGroup] = useState(options[0])
  const [selectedAction, setSelectedAction] = useState<any>()

  const groupItems: any[] = useMemo(() => {
    return Object.values(ProposalActionConfig[selectedGroup].items)
  }, [selectedGroup])

  const handleContinue = () => {
    onAdd({ id: uuidv4(), text: selectedAction?.text, group: selectedGroup })
    onClose()
  }

  useEffect(() => {
    setSelectedAction(undefined)
  }, [selectedGroup])

  return (
    // @ts-ignore
    <Modal style={ModalStyles} isOpen={open} onRequestClose={onClose} contentLabel='Modal' ariaHideApp={false}>
      <CloseButton onClick={onClose}>
        <CloseIcon />
      </CloseButton>

      <FlexBox direction='column' gap={4}>
        <FlexBox width='100%'>
          <Dropdown
            style={{ height: '48px' }}
            options={options}
            hasArrow={false}
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
          />
        </FlexBox>
        <FlexBox width='100%' height='50px'>
          {selectedAction?.description && (
            <Typography size='md' style={{ width: 0, flexGrow: 1 }}>
              {selectedAction.description}
            </Typography>
          )}
        </FlexBox>
        <GridContainer columns={4} width='100%' gridGap={4}>
          {groupItems
            .filter((item) => item.in.includes(contractName))
            .map((item) => (
              <GridItem key={item.text}>
                <PropertyBox
                  icon={<item.icon />}
                  label={item.text}
                  required
                  hovered={item.text === selectedAction?.text}
                  handleClick={(): void => setSelectedAction(item)}
                />
              </GridItem>
            ))}
        </GridContainer>
        <FlexBox width='100%'>
          <Button variant='primary' disabled={!selectedAction} onClick={handleContinue} style={{ width: '100%' }}>
            Continue
          </Button>
        </FlexBox>
      </FlexBox>
    </Modal>
  )
}

export default AddActionModal
