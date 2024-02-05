import { Coin } from '@ixo/impactxclient-sdk/types/codegen/cosmos/base/v1beta1/coin'

export interface EconomyState {
  governance: GovernanceState
}

// Governance
export interface GovernanceState {
  proposals: ProposalsType[]
}

export enum ProposalStatus {
  // PROPOSAL_STATUS_REJECTED = 'PROPOSAL_STATUS_REJECTED',
  // PROPOSAL_STATUS_DEPOSIT_PERIOD = 'PROPOSAL_STATUS_DEPOSIT_PERIOD',
  // PROPOSAL_STATUS_UNSPECIFIED = 'PROPOSAL_STATUS_UNSPECIFIED',
  // PROPOSAL_STATUS_VOTING_PERIOD = 'PROPOSAL_STATUS_VOTING_PERIOD',
  // PROPOSAL_STATUS_PASSED = 'PROPOSAL_STATUS_PASSED',
  // PROPOSAL_STATUS_FAILED = 'PROPOSAL_STATUS_FAILED',

  /** PROPOSAL_STATUS_UNSPECIFIED - PROPOSAL_STATUS_UNSPECIFIED defines the default propopsal status. */
  PROPOSAL_STATUS_UNSPECIFIED = 0,
  /**
   * PROPOSAL_STATUS_DEPOSIT_PERIOD - PROPOSAL_STATUS_DEPOSIT_PERIOD defines a proposal status during the deposit
   * period.
   */
  PROPOSAL_STATUS_DEPOSIT_PERIOD = 1,
  /**
   * PROPOSAL_STATUS_VOTING_PERIOD - PROPOSAL_STATUS_VOTING_PERIOD defines a proposal status during the voting
   * period.
   */
  PROPOSAL_STATUS_VOTING_PERIOD = 2,
  /**
   * PROPOSAL_STATUS_PASSED - PROPOSAL_STATUS_PASSED defines a proposal status of a proposal that has
   * passed.
   */
  PROPOSAL_STATUS_PASSED = 3,
  /**
   * PROPOSAL_STATUS_REJECTED - PROPOSAL_STATUS_REJECTED defines a proposal status of a proposal that has
   * been rejected.
   */
  PROPOSAL_STATUS_REJECTED = 4,
  /**
   * PROPOSAL_STATUS_FAILED - PROPOSAL_STATUS_FAILED defines a proposal status of a proposal that has
   * failed.
   */
  PROPOSAL_STATUS_FAILED = 5,
  UNRECOGNIZED = -1,
}

export interface TallyType {
  yes: number
  no: number
  noWithVeto: number
  abstain: number
  available: number
}

export enum ProposalContentType {
  ParameterChangeProposal = '/cosmos.params.v1beta1.ParameterChangeProposal',
  TextProposal = '/cosmos.gov.v1beta1.TextProposal',
}

export enum InflationType {
  InflationMin = 'InflationMin',
  InflationMax = 'InflationMax',
  InflationRateChange = 'InflationRateChange',
}

export interface ProposalChangeType {
  subspace: string
  key: InflationType
  value: string
}

export interface ProposalContent {
  '@type': ProposalContentType
  title: string
  description: string
  changes?: ProposalChangeType[]
}

export interface ProposalsType {
  proposalId: number
  proposer: string
  content: ProposalContent
  tally: TallyType
  status: ProposalStatus
  totalDeposit: Coin[]
  submitTime: string
  DepositEndTime: string
  votingStartTime: string
  votingEndTime: string
}

export enum VoteStatus {
  VOTE_OPTION_UNSPECIFIED = 'VOTE_OPTION_UNSPECIFIED',
  VOTE_OPTION_YES = 'VOTE_OPTION_YES',
  VOTE_OPTION_ABSTAIN = 'VOTE_OPTION_ABSTAIN',
  VOTE_OPTION_NO = 'VOTE_OPTION_NO',
  VOTE_OPTION_NO_WITH_VETO = 'VOTE_OPTION_NO_WITH_VETO',
}

// Acion types
export enum EntityEconomyActions {
  GetProposals = 'ixo/Economy/GET_PROPOSALS',
  GetProposalsSuccess = 'ixo/Economy/GET_PROPOSALS_FULFILLED',
  GetProposalsPending = 'ixo/Economy/GET_PROPOSALS_PENDING',
  GetProposalsFailure = 'ixo/Economy/GET_PROPOSALS_REJECTED',
  GetProposers = 'ixo/Economy/GET_PROPOSERS',
  GetProposersSuccess = 'ixo/Economy/GET_PROPOSERS_FULFILLED',
  GetProposersPending = 'ixo/Economy/GET_PROPOSERS_PENDING',
  GetProposersFailure = 'ixo/Economy/GET_PROPOSERS_REJECTED',
}
export interface GetProposalsAction {
  type: typeof EntityEconomyActions.GetProposals
  payload: Promise<ProposalsType[]>
}
export interface GetProposalsSuccessAction {
  type: typeof EntityEconomyActions.GetProposalsSuccess
  payload: ProposalsType[]
}

export interface GetProposersAction {
  type: typeof EntityEconomyActions.GetProposers
  payload: Promise<ProposalsType[]>
}
export interface GetProposersSuccessAction {
  type: typeof EntityEconomyActions.GetProposersSuccess
  payload: ProposalsType[]
}

export type EconomyActionTypes =
  | GetProposalsAction
  | GetProposalsSuccessAction
  | GetProposersAction
  | GetProposersSuccessAction
