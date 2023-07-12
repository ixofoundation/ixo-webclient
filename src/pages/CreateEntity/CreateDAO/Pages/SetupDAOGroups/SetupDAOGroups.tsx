import { Box, FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import React, { useMemo, useState } from 'react'
import { ReactComponent as PlusIcon } from 'assets/images/icon-plus.svg'
import { Button, CheckBox, PropertyBox } from 'pages/CreateEntity/Components'
import { AddDAOGroupModal } from 'components/Modals'
import { useCreateEntityState } from 'hooks/createEntity'
import { v4 as uuidv4 } from 'uuid'
import { DAOGroupConfig, TDAOGroupModel } from 'types/protocol'
import { omitKey } from 'utils/objects'
import SetupGroupSettings from './SetupGroupSettings'
import { deviceWidth } from 'constants/device'
import { ixo } from '@ixo/impactxclient-sdk'
import { DaoGroup } from 'redux/currentEntity/dao/currentDao.types'
import BigNumber from 'bignumber.js'

export const initialGroupConfig: DaoGroup['config'] = {
  automatically_add_cw20s: true,
  automatically_add_cw721s: true,
  description: '',
  name: '',
}

export const initialProposalModule: DaoGroup['proposalModule'] = {
  proposalModuleAddress: '',
  preProposalContractAddress: '',
  preProposeConfig: {
    open_proposal_submission: false,
    deposit_info: null,
  },
  proposalConfig: {
    allow_revoting: true,
    close_proposal_on_execution_failure: true,
    dao: '',
    max_voting_period: { time: 604800 },
    only_members_execute: false,
    threshold: {
      threshold_quorum: {
        threshold: {
          majority: {},
        },
        quorum: {
          percent: '0.2',
        },
      },
    },
  },
  proposals: [],
  votes: [],
}

export const initialMembers: DaoGroup['votingModule']['members'] = [{ addr: '', weight: 1 }]

export const initialVotingModule: DaoGroup['votingModule'] = {
  votingModuleAddress: '',
  contractName: '',
  members: initialMembers,
  totalWeight: 0,
}

export const initialTokenModule: DaoGroup['token'] = {
  config: {
    token_address: '',
    unstaking_duration: { time: 1209600 },
  },
  tokenInfo: {
    decimals: 6,
    name: '',
    symbol: '',
    total_supply: new BigNumber(10_000_000).times(new BigNumber(10).pow(6)).toString(),
  },
  marketingInfo: {
    description: null,
    logo: null,
    marketing: null,
    project: null,
  },
  treasuryPercent: 90,
}

export const initialStakingGroup: DaoGroup = {
  coreAddress: '',
  type: 'staking',
  admin: '',
  config: initialGroupConfig,
  proposalModule: initialProposalModule,
  votingModule: initialVotingModule,
  token: initialTokenModule,
  memberships: [],
}

export const initialMembershipGroup: DaoGroup = {
  coreAddress: '',
  type: 'membership',
  admin: '',
  config: initialGroupConfig,
  proposalModule: initialProposalModule,
  votingModule: initialVotingModule,
  token: undefined,
  memberships: [],
}

const SetupDAOGroups: React.FC = (): JSX.Element => {
  const { daoGroups, daoController, linkedEntity, updateDAOGroups, updateLinkedEntity, updateDAOController, gotoStep } =
    useCreateEntityState()
  const [openAddGroupModal, setOpenAddGroupModal] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState('')
  const canSubmit = useMemo(
    () => Object.values(daoGroups).length > 0 && !Object.values(daoGroups).some(({ coreAddress }) => !coreAddress),
    [daoGroups],
  )

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
      updateDAOGroups({
        ...daoGroups,
        [data.id]: data,
      })
      setSelectedGroup('')
      if (!daoController) {
        updateDAOController(data.id)
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

  const handleContinue = (): void => {
    let tempLinkedEntity = {}
    Object.values(daoGroups).forEach(({ coreAddress }) => {
      tempLinkedEntity = {
        ...tempLinkedEntity,
        [coreAddress!]: ixo.iid.v1beta1.LinkedEntity.fromPartial({
          id: `{id}#${coreAddress!}`,
          type: 'Group',
          relationship: 'subsidiary',
          service: '',
        }),
      }
    })

    updateLinkedEntity(tempLinkedEntity)
    gotoStep(1)
  }

  if (selectedGroup) {
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
      <FlexBox direction='column' gap={5}>
        <Box width={`${deviceWidth.mobile}px`}>
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
              <FlexBox key={key} direction='column' alignItems='center' gap={4}>
                <PropertyBox
                  icon={Icon && <Icon />}
                  label={text}
                  set={!!value.coreAddress}
                  handleRemove={(): void => handleRemoveGroup(key)}
                  handleClick={(): void => setSelectedGroup(key)}
                />
                <Typography variant='secondary' overflowLines={1} style={{ width: 100, textAlign: 'center' }}>
                  &nbsp;{value.config.name}&nbsp;
                </Typography>
                <CheckBox
                  label='DAO Controller'
                  value={daoController === value.id}
                  textVariant='secondary'
                  textSize={'base'}
                  textColor={daoController === value.id ? 'blue' : 'black'}
                  handleChange={() => daoController !== value.id && updateDAOController(value.id || '')}
                  style={{ flexDirection: 'column' }}
                />
              </FlexBox>
            )
          })}
          <PropertyBox icon={<PlusIcon />} noData handleClick={(): void => setOpenAddGroupModal(true)} />
        </FlexBox>

        <FlexBox gap={5} marginTop={10}>
          <Button variant='secondary' onClick={(): void => gotoStep(-1)}>
            Back
          </Button>
          <Button variant='primary' disabled={!canSubmit} onClick={handleContinue}>
            Continue
          </Button>
        </FlexBox>
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

export default SetupDAOGroups
