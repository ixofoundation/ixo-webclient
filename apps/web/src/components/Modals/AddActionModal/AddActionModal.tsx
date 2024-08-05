import Image from 'next/image'
import React, { useEffect, useMemo, useState } from 'react'
import * as Modal from 'react-modal'
import { ModalStyles, CloseButton } from 'components/Modals/styles'
import { TProposalActionModel } from 'types/entities'
import { Button, Dropdown, PropertyBox } from 'screens/CreateEntity/Components'
import { Typography } from 'components/Typography'
import { v4 as uuidv4 } from 'uuid'
import { useParams } from 'react-router-dom'
import { useCurrentEntityDAOGroup } from 'hooks/currentEntity'
import { ProposalActionConfig } from 'constants/entity'
import { getEntityById } from 'redux/entities/entities.selectors'
import { useAppSelector } from 'redux/hooks'
import { IconClose } from 'components/IconPaths'
import { Flex, Grid, useMantineTheme } from '@mantine/core'

interface Props {
  open: boolean
  actionsToExclude?: TProposalActionModel[]
  onClose: () => void
  onAdd: (action: TProposalActionModel) => void
}

const AddActionModal: React.FC<Props> = ({ open, actionsToExclude = [], onClose, onAdd }): JSX.Element => {
  const theme = useMantineTheme()
  const { coreAddress = '', entityId = '' } = useParams<{ coreAddress: string; entityId: string }>()
  const { daoGroups = {} } = useAppSelector(getEntityById(entityId))

  const { contractName } = useCurrentEntityDAOGroup(coreAddress, daoGroups)

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
        <Image src={IconClose} alt='Close' width={5} height={5} color={theme.colors.blue[5]} />
      </CloseButton>

      <Flex direction='column' gap={4}>
        <Flex w='100%'>
          <Dropdown
            style={{ height: '48px' }}
            options={options.map((v) => ({ text: v, value: v }))}
            $hasArrow={false}
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
          />
        </Flex>
        <Flex w='100%' h='50px'>
          {selectedAction?.description && (
            <Typography size='md' style={{ width: 0, flexGrow: 1 }}>
              {selectedAction.description}
            </Typography>
          )}
        </Flex>
        <Grid columns={4} w='100%'>
          {groupItems
            .filter((item) => !contractName || item.in.includes(contractName))
            .map((item) => {
              const Icon = item.icon
              const disabled = item.disabled
              const hidden = item.hidden

              if (hidden) {
                return undefined
              }

              return (
                <Grid.Col span={4} key={item.text}>
                  <PropertyBox
                    icon={<Icon />}
                    label={item.text}
                    disabled={disabled}
                    required
                    hovered={item.text === selectedAction?.text}
                    handleClick={(): void => setSelectedAction(item)}
                  />
                </Grid.Col>
              )
            })
            .filter(Boolean)}
        </Grid>
        <Flex w='100%'>
          <Button variant='primary' disabled={!selectedAction} onClick={handleContinue} style={{ width: '100%' }}>
            Continue
          </Button>
        </Flex>
      </Flex>
    </Modal>
  )
}

export default AddActionModal
