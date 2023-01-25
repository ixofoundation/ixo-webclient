import { Box, FlexBox, theme } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import React, { useMemo, useState } from 'react'
import { ReactComponent as PlusIcon } from 'assets/images/icon-plus.svg'
import { Button, PropertyBox } from 'pages/CreateEntity/Components'
import { AddDAOGroupModal } from 'components/Modals'
import { useCreateEntityState } from 'hooks/createEntity'
import { v4 as uuidv4 } from 'uuid'
import { DAOGroupConfig, TDAOGroupModel } from 'types/protocol'
import { omitKey } from 'utils/objects'
import SetupGroupSettings from './SetupGroupSettings'

const SetupDAOGroups: React.FC = (): JSX.Element => {
  const { daoGroups, updateDAOGroups, gotoStep } = useCreateEntityState()
  const [openAddGroupModal, setOpenAddGroupModal] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState('')
  const canSubmit = useMemo(() => Object.values(daoGroups)?.length > 0, [daoGroups])

  const handleAddGroup = (type: string): void => {
    const id = uuidv4()
    updateDAOGroups({
      ...daoGroups,
      [id]: { id, type },
    })
  }
  const handleRemoveGroup = (id: string): void => {
    updateDAOGroups(omitKey(daoGroups, id))
  }

  if (selectedGroup) {
    return (
      <SetupGroupSettings
        id={selectedGroup}
        onBack={(): void => setSelectedGroup('')}
        onContinue={(data: TDAOGroupModel): void => {
          updateDAOGroups({
            ...daoGroups,
            [data.id]: data,
          })
          setSelectedGroup('')
        }}
      />
    )
  }

  return (
    <>
      <FlexBox direction='column' gap={5}>
        <Box width={`${theme.breakpoints.sm}px`}>
          <Typography variant='secondary'>
            A DAO has one or more Groups. Each Group has its own membership and governance mechanism. A Group may even
            be a member of another Group. One of these groups is nominated to control the DAO and will have the
            authority to remove or add more groups after the DAO has been created.
          </Typography>
        </Box>

        <FlexBox gap={5}>
          {Object.entries(daoGroups).map(([key, value]) => {
            const Icon = DAOGroupConfig[value.type]?.icon
            const text = DAOGroupConfig[value.type]?.text
            return (
              <PropertyBox
                key={key}
                icon={Icon && <Icon />}
                label={text}
                set={!!value.name}
                handleRemove={(): void => handleRemoveGroup(key)}
                handleClick={(): void => setSelectedGroup(key)}
              />
            )
          })}
          <PropertyBox icon={<PlusIcon />} handleClick={(): void => setOpenAddGroupModal(true)} />
        </FlexBox>

        <FlexBox gap={5} marginTop={10}>
          <Button variant='secondary' onClick={(): void => gotoStep(-1)}>
            Back
          </Button>
          <Button variant='primary' disabled={!canSubmit} onClick={(): void => gotoStep(1)}>
            Continue
          </Button>
        </FlexBox>
      </FlexBox>

      <AddDAOGroupModal
        open={openAddGroupModal}
        onClose={(): void => setOpenAddGroupModal(false)}
        onAdd={handleAddGroup}
      />
    </>
  )
}

export default SetupDAOGroups
