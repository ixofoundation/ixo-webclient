import Image from 'next/image'
import { Typography } from 'components/Typography'
import { useMemo, useState } from 'react'
import { Button, CheckBox, PropertyBox } from 'screens/CreateEntity/Components'
import { AddDAOGroupModal } from 'components/Modals'
import { useCreateEntityState } from 'hooks/createEntity'
import { v4 as uuidv4 } from 'uuid'
import { TDAOGroupModel } from 'types/entities'
import { omitKey } from 'utils/objects'
import SetupGroupSettings from './SetupGroupSettings'
import { deviceWidth } from 'constants/device'
import { ixo } from '@ixo/impactxclient-sdk'
import BigNumber from 'bignumber.js'
import { DAOGroupConfig } from 'constants/entity'
import { useCreateEntityStepState } from 'hooks/createEntityStepState'
import { IconPlus } from 'components/IconPaths'
import { Box, Flex, useMantineTheme } from '@mantine/core'

export const initialGroupConfig: TDAOGroupModel['config'] = {
  automatically_add_cw20s: true,
  automatically_add_cw721s: true,
  description: '',
  name: '',
}

export const initialProposalModule: TDAOGroupModel['proposalModule'] = {
  proposalModuleAddress: '',
  preProposalContractAddress: '',
  preProposeConfig: {
    open_proposal_submission: false,
    deposit_info: null,
  },
  proposalConfig: {
    allow_revoting: false,
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

export const initialMembers: TDAOGroupModel['votingModule']['members'] = [{ addr: '', weight: 1 }]
export const initialMemberships: TDAOGroupModel['memberships'] = [{ members: [''], weight: 1 }]

export const initialVotingModule: TDAOGroupModel['votingModule'] = {
  votingModuleAddress: '',
  contractName: '',
  members: initialMembers,
  totalWeight: 0,
}

export const initialTokenModule: TDAOGroupModel['token'] = {
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

export const initialStakingGroup: TDAOGroupModel = {
  coreAddress: '',
  type: 'staking',
  admin: '',
  config: initialGroupConfig,
  proposalModule: initialProposalModule,
  votingModule: initialVotingModule,
  token: initialTokenModule,
  memberships: [],
}

export const initialMembershipGroup: TDAOGroupModel = {
  coreAddress: '',
  type: 'membership',
  admin: '',
  config: initialGroupConfig,
  proposalModule: initialProposalModule,
  votingModule: initialVotingModule,
  token: undefined,
  memberships: [],
}

export const initialMultisigGroup: TDAOGroupModel = {
  coreAddress: '',
  type: 'multisig',
  admin: '',
  config: initialGroupConfig,
  proposalModule: {
    ...initialProposalModule,
    proposalConfig: {
      allow_revoting: true,
      close_proposal_on_execution_failure: true,
      dao: '',
      max_voting_period: { time: 604800 },
      only_members_execute: false,
      threshold: {
        absolute_count: {
          threshold: '0',
        },
      },
    },
  },
  votingModule: initialVotingModule,
  token: undefined,
  memberships: initialMemberships,
}

const SetupDAOGroups = ({ showNavigation = true }: { showNavigation?: boolean }): JSX.Element => {
  const { daoGroups, daoController, linkedEntity, updateDAOGroups, updateLinkedEntity, updateDAOController } =
    useCreateEntityState()
  const [openAddGroupModal, setOpenAddGroupModal] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState('')
  const canSubmit = useMemo(
    () => Object.values(daoGroups).length > 0 && !Object.values(daoGroups).some(({ coreAddress }) => !coreAddress),
    [daoGroups],
  )
  const theme = useMantineTheme()
  const { navigateToNextStep, navigateToPreviousStep } = useCreateEntityStepState()

  const handleAddGroup = (type: string): void => {
    const id = uuidv4()

    switch (type) {
      case 'membership':
        updateDAOGroups({
          ...daoGroups,
          [id]: { id, ...initialMembershipGroup },
        })
        break
      case 'multisig':
        updateDAOGroups({
          ...daoGroups,
          [id]: { id, ...initialMultisigGroup },
        })
        break
      case 'staking':
        updateDAOGroups({
          ...daoGroups,
          [id]: { id, ...initialStakingGroup },
        })
        break
      default:
        break
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

  const handleBack = () => {
    navigateToPreviousStep()
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

    navigateToNextStep()
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
      <Flex direction='column' gap={5}>
        <Box w={`${deviceWidth.mobile}px`}>
          <Typography variant='secondary'>
            A DAO has one or more Groups. Each Group has its own membership and governance mechanism. A Group may even
            be a member of another Group. One of these groups is nominated to control the DAO and will have the
            authority to remove or add more groups after the DAO has been created.
          </Typography>
        </Box>

        <Flex gap={5}>
          {Object.entries(daoGroups).map(([key, value]) => {
            const Icon = DAOGroupConfig[value.type]?.icon
            const text = DAOGroupConfig[value.type]?.text
            return (
              <Flex key={key} direction='column' align='center' gap={4}>
                <PropertyBox
                  icon={Icon && <Icon />}
                  label={text}
                  set={!!value.coreAddress}
                  handleRemove={(): void => handleRemoveGroup(key)}
                  handleClick={(): void => setSelectedGroup(key)}
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
                  handleChange={() =>
                    daoController !== value.coreAddress && updateDAOController(value.coreAddress || '')
                  }
                  style={{ flexDirection: 'column' }}
                />
              </Flex>
            )
          })}
          <PropertyBox
            icon={<Image src={IconPlus} alt='Plus' width={5} height={5} color={theme.colors.blue[5]} />}
            noData
            handleClick={(): void => setOpenAddGroupModal(true)}
          />
        </Flex>

        <Flex gap={5} mt={10}>
          <Button variant='secondary' onClick={handleBack}>
            Back
          </Button>
          <Button variant='primary' disabled={!canSubmit} onClick={handleContinue}>
            Continue
          </Button>
        </Flex>
      </Flex>

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
