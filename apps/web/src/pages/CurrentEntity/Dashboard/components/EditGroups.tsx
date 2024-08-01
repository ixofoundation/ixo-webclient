import { FlexBox } from 'components/App/App.styles'
import React, { useState } from 'react'
import useEditEntity from 'hooks/editEntity'
import { CheckBox, PropertyBox } from 'pages/CreateEntity/Components'
import { Typography } from 'components/Typography'
import PlusIcon from 'assets/images/icon-plus.svg'
import { AddDAOGroupModal } from 'components/Modals'
import { v4 as uuidv4 } from 'uuid'
import { initialMembershipGroup, initialStakingGroup } from 'pages/CreateEntity/EntityPages/SetupGroups/SetupGroups'
import { omitKey } from 'utils/objects'
import { LinkedEntity } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import SetupGroupSettings from 'pages/CreateEntity/EntityPages/SetupGroups/SetupGroupSettings'
import { TDAOGroupModel } from 'types/entities'
import { DAOGroupConfig } from 'constants/entity'

const EditGroups: React.FC = (): JSX.Element => {
  const { editEntity, setEditedField } = useEditEntity()
  const [openAddGroupModal, setOpenAddGroupModal] = useState(false)
  const daoGroups: { [address: string]: TDAOGroupModel } = editEntity.daoGroups ?? {}
  const linkedEntity = Object.fromEntries((editEntity.linkedEntity ?? []).map((v) => [v.id, v]))
  const [selectedGroup, setSelectedGroup] = useState('')
  const daoController =
    Object.values(daoGroups)
      .map((v) => v.coreAddress)
      .find((addr) => editEntity.verificationMethod.some((v) => v.id.includes(addr))) || ''

  const updateDAOGroups = (daoGroups: { [address: string]: TDAOGroupModel }): void => {
    setEditedField('daoGroups', daoGroups)
  }

  const updateDAOController = (id: string) => {
    if (daoController) {
      // update daoController
      setEditedField(
        'verificationMethod',
        editEntity.verificationMethod.map((v) =>
          v.id.includes('{id}#') ? { ...v, id: `{id}#${id}`, blockchainAccountID: id } : v,
        ),
      )
    } else {
      // add new daoController
      setEditedField('verificationMethod', [
        ...editEntity.verificationMethod,
        {
          id: `{id}#${id}`,
          type: 'CosmosAccountAddress',
          controller: '{id}',
          blockchainAccountID: id,
        },
      ])
    }
  }

  const updateLinkedEntity = (linkedEntity: { [id: string]: LinkedEntity }) => {
    setEditedField('linkedEntity', Object.values(linkedEntity))
  }

  const handleAddGroup = (type: string): void => {
    const id = uuidv4()
    if (type !== 'staking') {
      updateDAOGroups({
        ...daoGroups,
        [id]: { id, ...initialMembershipGroup },
      })
    } else {
      updateDAOGroups({
        ...daoGroups,
        [id]: { id, ...initialStakingGroup },
      })
    }

    /**
     * @description navigate setup specific group screen
     */
    setSelectedGroup(id)
  }
  const handleUpdateGroup = (data: TDAOGroupModel): void => {
    if (data.id) {
      const newDaoGroups = omitKey({ ...daoGroups }, data.id)
      updateDAOGroups({
        ...newDaoGroups,
        [data.coreAddress]: data,
      })
      setSelectedGroup('')
      if (!daoController) {
        updateDAOController(data.coreAddress)
      }
    }
  }
  const handleRemoveGroup = (id: string): void => {
    const newDaoGroups = omitKey(daoGroups, id)
    updateDAOGroups(newDaoGroups)

    const newLinkedEntity = omitKey(linkedEntity, id)
    updateLinkedEntity(newLinkedEntity)

    // Change DAO controller if removed one was a controller
    if (daoController === id) {
      updateDAOController(Object.keys(newDaoGroups).pop() ?? '')
    }
  }
  const handleCloneGroup = (address: string): void => {
    // TODO: fetch DAO group from somewhere with given address
  }

  if (selectedGroup && daoGroups[selectedGroup]) {
    return (
      <SetupGroupSettings
        daoGroup={daoGroups[selectedGroup]}
        onBack={(): void => setSelectedGroup('')}
        onSubmit={handleUpdateGroup}
      />
    )
  }

  return (
    <>
      <FlexBox $gap={5}>
        {Object.entries(daoGroups ?? {}).map(([key, value]) => {
          const Icon = DAOGroupConfig[value.type]?.icon
          const text = DAOGroupConfig[value.type]?.text
          const preFilled = Object.values(linkedEntity).some((v) => v.id.includes(key))

          return (
            <FlexBox key={key} $direction='column' $alignItems='center' $gap={4}>
              <PropertyBox
                icon={Icon && <Icon />}
                label={text}
                set={!!value.coreAddress}
                handleRemove={(): void => handleRemoveGroup(key)}
                handleClick={(): any => !preFilled && setSelectedGroup(key)}
              />
              <Typography variant='secondary' $overflowLines={1} style={{ width: 100, textAlign: 'center' }}>
                &nbsp;{value.config.name}&nbsp;
              </Typography>
              <CheckBox
                label='DAO Controller'
                value={daoController === value.coreAddress}
                textVariant='secondary'
                textSize={'base'}
                textColor={daoController === value.coreAddress ? 'blue' : 'black'}
                handleChange={() => daoController !== value.coreAddress && updateDAOController(value.coreAddress || '')}
                style={{ flexDirection: 'column' }}
              />
            </FlexBox>
          )
        })}
        <PropertyBox icon={<PlusIcon />} noData handleClick={(): void => setOpenAddGroupModal(true)} />
      </FlexBox>
      <AddDAOGroupModal
        open={openAddGroupModal}
        onClose={(): void => setOpenAddGroupModal(false)}
        onAdd={handleAddGroup}
        onClone={handleCloneGroup}
      />
    </>
  )
}

export default EditGroups
