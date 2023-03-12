import {
  ArrayOfAddr,
  Config,
  Cw20BalanceResponse,
  ProposalModuleCountResponse,
} from '@ixo/impactxclient-sdk/types/codegen/DaoCore.types'
import { ProposalResponse } from '@ixo/impactxclient-sdk/types/codegen/DaoMigrator.types'
import { Member } from 'types/dao'

export type DaoGroup = {
  coreAddress: string
  type: string
  admin: string
  config: Config
  proposalModule: {
    proposalModuleAddress: string
    preProposalContractAddress: string
    proposalModuleCount: ProposalModuleCountResponse
    proposals: ProposalResponse[]
  }
  votingModule: {
    votingModuleAddress: string
    groupContractAddress: string
    members: Member[]
    totalWeight: number
  }
  treasury: {
    cw20Balances: Cw20BalanceResponse
    cw20TokenList: ArrayOfAddr
    cw721TokenList: ArrayOfAddr
  }
}

export type CurrentDao = {
  [coreAddress: string]: DaoGroup
}

export enum CurrentDaoActions {
  UpdateGroup = 'ixo/CurrentDao/UPDATE_DAO_GROUP',
}

export interface UpdateDaoGroupAction {
  type: typeof CurrentDaoActions.UpdateGroup
  payload: DaoGroup
}

export type CurrentDaoActionTypes = UpdateDaoGroupAction
