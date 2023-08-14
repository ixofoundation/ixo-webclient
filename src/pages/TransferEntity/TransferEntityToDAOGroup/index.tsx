import { Box, FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import React from 'react'
import { ReactComponent as PlusIcon } from 'assets/images/icon-plus.svg'
import { PropertyBox } from 'pages/CreateEntity/Components'
import { TDAOGroupModel } from 'types/entities'
import { deviceWidth } from 'constants/device'
import BigNumber from 'bignumber.js'
import { DAOGroupConfig } from 'constants/entity'
import { useTransferEntityState } from 'hooks/transferEntity'
import { utils } from '@ixo/impactxclient-sdk'

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

export const initialMembers: TDAOGroupModel['votingModule']['members'] = [{ addr: '', weight: 1 }]

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

const TransferEntityToDAOGroup: React.FC = (): JSX.Element => {
  const { selectedEntity, updateRecipientDid } = useTransferEntityState()

  const handleClick = (key: string) => () => {
    if (key === 'other') {
      //
    } else {
      updateRecipientDid(utils.did.generateWasmDid(key))
    }
  }

  if (!selectedEntity) {
    return <></>
  }

  return (
    <>
      <FlexBox direction='column' gap={5}>
        <Box width={`${deviceWidth.mobile}px`}>
          <Typography variant='secondary'>Transfer ImpactsDAO to a dao group or another account</Typography>
        </Box>

        <FlexBox gap={5}>
          {Object.entries(selectedEntity.daoGroups ?? {}).map(([key, value]) => {
            const Icon = DAOGroupConfig[value.type]?.icon
            const text = DAOGroupConfig[value.type]?.text
            return (
              <FlexBox key={key} direction='column' alignItems='center' gap={4}>
                <PropertyBox
                  icon={Icon && <Icon />}
                  label={text}
                  set={!!value.coreAddress}
                  handleClick={handleClick(key)}
                />
                <Typography variant='secondary' overflowLines={1} style={{ width: 100, textAlign: 'center' }}>
                  &nbsp;{selectedEntity.profile?.name || ''}&nbsp;
                </Typography>
                <Typography variant='secondary' overflowLines={1} style={{ width: 100, textAlign: 'center' }}>
                  &nbsp;{value.config.name} Group&nbsp;
                </Typography>
              </FlexBox>
            )
          })}
          <FlexBox direction='column' alignItems='center' gap={4}>
            <PropertyBox icon={<PlusIcon />} noData handleClick={handleClick('other')} />
            <Typography variant='secondary' overflowLines={1} style={{ width: 100, textAlign: 'center' }}>
              Other Account
            </Typography>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </>
  )
}

export default TransferEntityToDAOGroup
