import { Schema as FilterSchema } from '../components/Entities/EntitiesExplorer/Components/EntitiesFilter/schema/types'
import { Schema as HeaderSchema } from '../components/Entities/EntitiesExplorer/Components/EntitiesHero/schema/types'
import { Schema as ControlPanelSchema } from 'components/ControlPanel/types'
import { AgentRole } from 'redux/account/account.types'

export const PDS_URL =
  process.env.REACT_APP_USE_LOCAL_CELLNODE === 'true'
    ? process.env.REACT_APP_PDS_LOCAL_URL
    : process.env.REACT_APP_PDS_URL

export interface Agent {
  status: string
  kyc: boolean
  did: string
  role: AgentRole
}

export enum EntityType {
  Project = 'project',
  Dao = 'dao',
  Investment = 'investment',
  Oracle = 'oracle',
  Protocol = 'protocol',
  Asset = 'asset',
}

export enum EntityStatus {
  Pending = 'Pending',
  Live = 'Live',
  Stopped = 'Stopped',
  Sealed = 'Sealed',
  Deleted = 'Deleted',
  Recruiting = 'Recruiting',
}

export enum EntityStage {
  Proposal = 'Proposal',
  Planning = 'Planning',
  Delivery = 'Delivery',
  Paused = 'Paused',
  Closing = 'Closing',
  Ended = 'Ended',
  Archived = 'Archived',
}

export enum EntityView {
  Visible = 'Visible',
  Encrypted = 'Encrypted',
}

export enum PageView {
  Public = 'Public',
  Private = 'Private',
  Secret = 'Secret',
}

export enum PaymentDenomination {
  IXO = 'IXO',
  eEUR = 'eEUR',
  eCHF = 'eCHF',
  eUSD = 'eUSD',
}

export enum PaymentType {
  FeeForService = 'FeeForService',
  OracleFee = 'OracleFee',
  Subscription = 'Subscription',
  RentalFee = 'RentalFee',
  OutcomePayment = 'OutcomePayment',
  InterestRepayment = 'InterestRepayment',
  LoanRepayment = 'LoanRepayment',
  IncomeDistribution = 'IncomeDistribution',
  DisputeSettlement = 'DisputeSettlement',
}

export enum StakeType {
  SecurityGuarantee = 'SecurityGuarantee',
  PerformanceGuarantee = 'PerformanceGuarantee',
  LoanGuarantee = 'LoanGuarantee',
  ClaimGuarantee = 'ClaimGuarantee',
  DisputeGuarantee = 'DisputeGuarantee',
  VotingProposalDeposit = 'VotingProposalDeposit',
  MembershipDeposit = 'MembershipDeposit',
  ServicesDeposit = 'ServicesDeposit',
  InsuranceGuarantee = 'InsuranceGuarantee',
}

export enum SlashingCondition {
  FailedService = 'FailedService',
  FailedSecurity = 'FailedSecurity',
  LoanDefault = 'LoanDefault',
  FailedProposal = 'FailedProposal',
  FailedDispute = 'FailedDispute',
  InsuredEvent = 'InsuredEvent',
  FailedMembership = 'FailedMembership',
}

export enum KeyType {
  Ed25519VerificationKey2018 = 'Ed25519VerificationKey2018',
  JwsVerificationKey2020 = 'JwsVerificationKey2020',
  Secp256k1VerificationKey2018 = 'Secp256k1VerificationKey2018',
}

export enum KeyPurpose {
  Authentication = 'Authentication',
  Encryption = 'Encryption',
  Verification = 'Verification',
  Identification = 'Identification',
}

export enum ServiceType {
  DIDAgent = 'DIDAgent',
  CosmosWeb3 = 'CosmosWeb3',
  EthereumWeb3 = 'EthereumWeb3',
  Web2 = 'Web2',
}

export enum DataResourceType {
  SchemaOverlay = 'SchemaOverlay',
  MobileIdentityWallet = 'MobileIdentityWallet',
  PersonalDataPod = 'PersonalDataPod',
  CellNodeDB = 'CellNodeDB',
  EnterpriseDB = 'EnterpriseDB',
  InterplanetaryFileStore = 'InterplanetaryFileStore',
}

export enum LinkedResourceType {
  UNDEFINED = '',
  IMPACT_PROOF = 'Impact Proof',
  CREDENTIAL = 'Credential',
  IMAGE = 'Image',
  DATA_ASSET = 'Data Asset',
  AUTHORISATION = 'Authorisation',
  PDF = 'PDF',
  CODE = 'Code',
  ALGORITHM = 'Algorithm',
}

export enum NodeType {
  RelayerNode = 'RelayerNode',
  CellNode = 'CellNode',
  IBCNode = 'IBCNode',
  Ipfs = 'Ipfs',
}

export enum FundSource { //  TODO: should be removed
  Alphabond = 'Alphabond',
  WalletAddress = 'WalletAddress',
  BankAccount = 'BankAccount',
  PaymentContract = 'PaymentContract',
  NFTAsset = 'NFTAsset',
  LiquidityPool = 'LiquidityPool',
}

export enum LiquiditySource {
  Alphabond = 'Alphabond',
  WalletAddress = 'WalletAddress',
  BankAccount = 'BankAccount',
  PaymentContract = 'PaymentContract',
  NFTAsset = 'NFTAsset',
  LiquidityPool = 'LiquidityPool',
}

export enum TermsOfUseType {
  PayPerUse = 'PayPerUse',
  OnceOffFee = 'OnceOffFee',
  FreeOpenSource = 'FreeOpenSource',
  Proprietary = 'Proprietary',
}

export enum ProjectStatus {
  Created = 'CREATED',
  Pending = 'PENDING',
  Funded = 'FUNDED',
  Started = 'STARTED',
  Stopped = 'STOPPED',
  PaidOut = 'PAIDOUT',
}

export type EntityTypeStrategyMap = {
  [TKey in EntityType]: {
    title: string
    plural: string
    themeColor: string
    headerSchema: HeaderSchema
    filterSchema: FilterSchema
    controlPanelSchema: ControlPanelSchema
    createNewTitle: string
    urlPart: string
  }
}

export interface EntityConfig extends EntityTypeStrategyMap {
  theme?: any
  UI?: {
    logo?: string
    topMenu?: {
      item: string
      visible: boolean
    }[]
    explorer?: {
      defaultView: string
    }
    head?: {
      title?: string
      icon?: string
    }
    header?: {
      background: string
      buttonColor: string
    }
    footer?: {
      mailTo?: {
        text: string
        email: string
      }
      address?: string
      privacyPolicy?: {
        text: string
        href: string
      }
      socials?: {
        [key: string]: {
          title: string
          href: string
          iconClassName: string
        }
      }
    }
  }
  route?: {
    splashIsRootRoute?: boolean
  }
}

export type EntityStatusStrategyMap = {
  [TKey in EntityStatus]: {
    title: string
  }
}

export type EntityStageStrategyMap = {
  [TKey in EntityStage]: {
    title: string
  }
}

export type EntityViewStrategyMap = {
  [TKey in EntityView]: {
    title: string
  }
}

export type PageViewStrategyMap = {
  [TKey in PageView]: {
    title: string
  }
}

export type PaymentTypeStrategyMap = {
  [TKey in PaymentType]: {
    title: string
  }
}

export type PaymentDenominationStrategyMap = {
  [TKey in PaymentDenomination]: {
    title: string
  }
}

export type StakeTypeStrategyMap = {
  [TKey in StakeType]: {
    title: string
  }
}

export type SlashingConditionStrategyMap = {
  [TKey in SlashingCondition]: {
    title: string
  }
}

export type LiquiditySourceStrategyMap = {
  [TKey in LiquiditySource]: {
    title: string
  }
}

export type NodeTypeStrategyMap = {
  [TKey in NodeType]: {
    title: string
  }
}

export type KeyTypeStrategyMap = {
  [TKey in KeyType]: {
    title: string
  }
}

export type KeyPurposeStrategyMap = {
  [TKey in KeyPurpose]: {
    title: string
  }
}

export type ServiceTypeStrategyMap = {
  [TKey in ServiceType]: {
    title: string
  }
}

export type DataResourceTypeStrategyMap = {
  [TKey in DataResourceType]: {
    title: string
  }
}

export type TermsOfUseTypeStrategyMap = {
  [TKey in TermsOfUseType]: {
    title: string
    icon: any
  }
}
