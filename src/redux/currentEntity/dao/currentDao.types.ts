import { MarketingInfoResponse, TokenInfoResponse } from '@ixo/impactxclient-sdk/types/codegen/Cw20Base.types'
import { Config } from '@ixo/impactxclient-sdk/types/codegen/DaoCore.types'
import { Config as PreProposeConfig } from '@ixo/impactxclient-sdk/types/codegen/DaoPreProposeSingle.types'
import { Config as ProposalConfig, VoteInfo } from '@ixo/impactxclient-sdk/types/codegen/DaoProposalSingle.types'
import { Config as Cw20StakeConfig } from '@ixo/impactxclient-sdk/types/codegen/Cw20Stake.types'
import { Member, Proposal } from 'types/dao'

export type DaoGroup = {
  coreAddress: string
  type: string //  'membership' || 'staking'
  admin: string
  config: Config
  proposalModule: {
    proposalModuleAddress: string
    preProposalContractAddress: string
    preProposeConfig: PreProposeConfig
    proposalConfig: ProposalConfig
    proposals: Proposal[]
    votes: VoteInfo[]
  }
  votingModule: {
    votingModuleAddress: string
    contractName: string //  'dao_voting_cw20_staked' || 'dao_voting_cw4'

    members: Member[]
    totalWeight: number
  }
  token:
    | {
        config: Cw20StakeConfig
        tokenInfo: TokenInfoResponse & { initial_supply?: string }
        marketingInfo: MarketingInfoResponse
      }
    | undefined
  selected?: boolean
}

export type CurrentDao = {
  [coreAddress: string]: DaoGroup
}

export enum CurrentDaoActions {
  UpdateGroup = 'ixo/CurrentDao/UPDATE_DAO_GROUP',
  ClearGroup = 'ixo/CurrentDao/CLEAR_DAO_GROUP',
  SelectGroup = 'ixo/CurrentDao/SELECT_DAO_GROUP',
}

export interface UpdateDaoGroupAction {
  type: typeof CurrentDaoActions.UpdateGroup
  payload: DaoGroup
}

export interface ClearDaoGroupAction {
  type: typeof CurrentDaoActions.ClearGroup
}

export interface SelectDaoGroupAction {
  type: typeof CurrentDaoActions.SelectGroup
  payload: { address: string; multi: boolean }
}

export type CurrentDaoActionTypes = UpdateDaoGroupAction | ClearDaoGroupAction | SelectDaoGroupAction
