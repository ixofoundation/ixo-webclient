import Image from 'next/image'
import { PropertyBox } from 'screens/CreateEntity/Components'
import React, { useMemo, useState } from 'react'
import { TProposalActionModel } from 'types/entities'

import { AddActionModal } from 'components/Modals'
import { ProposalActionConfig } from 'constants/entity'
import { IconPlus } from 'components/IconPaths'
import { Flex, useMantineTheme } from '@mantine/core'

interface Props {
  actions: TProposalActionModel[]
  setActions: (actions: TProposalActionModel[]) => void
  constant?: boolean
}

const SetupActionsForm: React.FC<Props> = ({ actions, setActions, constant = false }): JSX.Element => {
  const [openAddActionModal, setOpenAddActionModal] = useState(false)
  const [selectedAction, setSelectedAction] = useState<TProposalActionModel | undefined>()
  const theme = useMantineTheme()
  const SetupModal = useMemo(() => {
    if (!selectedAction) {
      return undefined
    }
    return ProposalActionConfig[selectedAction.group].items[selectedAction.text].setupModal
  }, [selectedAction])

  const handleAddAction = (action: TProposalActionModel): void => {
    setActions([...actions, action])
    setSelectedAction(action)
  }
  const handleRemoveAction = (id: string): void => {
    setActions([...actions].filter((item) => item.id !== id))
  }
  const handleUpdateAction = (action: TProposalActionModel): void => {
    setActions(actions.map((item, i) => (item.id === action.id ? action : item)))
  }

  return (
    <>
      <Flex gap={5} wrap='wrap'>
        {actions.map((item) => {
          const Icon = ProposalActionConfig[item.group].items[item.text]?.icon
          const disabled = ProposalActionConfig[item.group].items[item.text]?.disabled

          return (
            <PropertyBox
              key={item.id}
              icon={Icon && <Icon />}
              label={item.text}
              set={item.data}
              disabled={disabled}
              handleClick={() => setSelectedAction(item)}
              handleRemove={() => !constant && handleRemoveAction(item.id)}
            />
          )
        })}
        {!constant && (
          <PropertyBox
            icon={<Image src={IconPlus} alt='Plus' width={5} height={5} color={theme.colors.blue[5]} />}
            noData
            handleClick={(): void => setOpenAddActionModal(true)}
          />
        )}
      </Flex>

      <AddActionModal
        actionsToExclude={actions}
        open={openAddActionModal}
        onClose={() => setOpenAddActionModal(false)}
        onAdd={handleAddAction}
      />
      {SetupModal && (
        <SetupModal
          open={!!SetupModal}
          action={selectedAction}
          onSubmit={handleUpdateAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
    </>
  )
}

export default SetupActionsForm
