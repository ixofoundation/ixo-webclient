import { Schema as FilterSchema } from '../pages/EntitiesExplorer/Components/EntitiesFilter/schema/types'
import { Schema as HeaderSchema } from '../pages/EntitiesExplorer/Components/EntitiesHero/schema/types'
import { Schema as ControlPanelSchema } from 'components/ControlPanel/types'
import { AgentRole } from 'redux/account/account.types'
import { Entity } from '@ixo/impactxclient-sdk/types/codegen/ixo/entity/v1beta1/entity'
import { IidDocument } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/iid'
import { OutputBlockData } from '@editorjs/editorjs'
import { Config } from '@ixo/impactxclient-sdk/types/codegen/DaoCore.types'
import { Config as PreProposeConfig } from '@ixo/impactxclient-sdk/types/codegen/DaoPreProposeSingle.types'
import { Config as ProposalConfig, VoteInfo } from '@ixo/impactxclient-sdk/types/codegen/DaoProposalSingle.types'
import { Config as Cw20StakeConfig } from '@ixo/impactxclient-sdk/types/codegen/Cw20Stake.types'
import { LinkedResource, Service } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { Member, Proposal } from 'types/dao'
import { MarketingInfoResponse, TokenInfoResponse } from '@ixo/impactxclient-sdk/types/codegen/Cw20Base.types'

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
  ProtocolClaim = 'protocol/claim',
  ProtocolDeed = 'protocol/deed',
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
  CellNode = 'CellNode', //  cellnode
  CellNodeEncrypted = 'CellNodeEncrypted', //  cellnode-encrypted
  BlockchainRPC = 'Blockchain', //  blockchain
  WebService = 'WebService', //  webservice
  BotService = 'BotService', //  bot-service
  AuthenticationService = 'AuthenticationService', //  authentication
  CloudWorker = 'CloudWorker', //  cloudworker
  Ipfs = 'Ipfs', //  ipfs
  CredentialRegistry = 'CredentialRegistry', //  credential-registry
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
      design?: {
        card: {
          borderRadius?: number | string
          border?: string
        }
      }
    }
    head?: {
      title?: string
      icon?: string
    }
    header?: {
      background: string
      buttonColor: string
      borderColor: string
      link: string
      tabs: {
        background: string
        borderColor: string
        color: string
        active: {
          background: string
          color: string
        }
        assistant: {
          to: string
          right: string
          color: string
          active: {
            to: string
            right: string
            color: string
          }
        }
      }
    }
    companion: {
      toolbar: {
        background: string
        color: string
        active: {
          background: string
          color: string
        }
      }
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

export interface TEntityMetricModel {
  prefix: string
  metric: string
  suffix: string
  source: string
}
export interface TEntityAttributeModel {
  key: string
  value: string
}
export interface TBasicMetadataModel {
  orgName?: string
  name?: string
  image?: string
  logo?: string
  type?: string

  description?: string
  brand?: string
  location?: string
  attributes?: TEntityAttributeModel[]
  metrics?: TEntityMetricModel[]
}
export enum EAssetType {
  ImpactToken = 'Impact Token',
  Commodity = 'Commodity',
  Inventory = 'Inventory',
  Data = 'Data',
  Equipment = 'Equipment',
  Digital = 'Digital',
  Carbon = 'Carbon',
  RealEstate = 'Real Estate',
  Bond = 'Bond',
  Outcome = 'Outcome',
  IP = 'IP',
  Brand = 'Brand',
  Equity = 'Equity',
  Income = 'Income',
  Other = 'Other',
  Wallet = 'Wallet',
  Rights = 'Rights',
}
export interface TAssetMetadataModel extends TBasicMetadataModel {
  denom?: string
  type?: EAssetType
  tokenName?: string
  maxSupply?: number | undefined
  decimals?: number
  autoGenerateZLottie?: boolean
  category?: string
}
export type TEntityMetadataModel = TAssetMetadataModel
export interface TEntityProfileModel {
  '@context': {
    ixo: string
    '@id': string
    type: string
    '@protected': boolean
  }
  id: string
  type: string
  orgName: string
  name: string
  image: string
  logo: string
  brand: string
  location: string
  description: string
  attributes: TEntityAttributeModel[]
  metrics: TEntityMetricModel[]
  category?: string
}
export interface TEntityCreatorModel {
  id: string
  '@type': string
  logo: string
  displayName: string
  email: string
  location: string
  website: string
  mission: string
}
export type TEntityAdministratorModel = TEntityCreatorModel
export type TEntityPageSectionModel = OutputBlockData
export interface TEntityPageSectionLegacyModel {
  header: any
  body: any[]
  images: any[]
  profiles: any[]
  social: any
  embedded: any
}
export type TEntityPageModel = { [id: string]: TEntityPageSectionModel }
export interface TEntityDDOTagModel {
  category: string
  tags: string[]
  readonly?: boolean
}
export interface TTokenMetadataModel {
  id: string
  type: string
  name: string
  tokenName: string
  decimals: number
  description: string
  image: string
  properties: {
    denom: string
    icon: string
    maxSupply: string
  }
}
export type TDAOGroupModel = {
  id?: string
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
        tokenInfo: TokenInfoResponse
        marketingInfo: MarketingInfoResponse
        treasuryPercent?: number
      }
    | undefined
  selected?: boolean
  memberships?: {
    category?: string
    weight: number
    members: string[]
  }[]
}
export interface TEntityClaimTemplateModel {
  id: string
  type: string
  title: string
  description: string
  creator: string
  createdAt: string
}
export interface TEntityClaimModel {
  id: string
  template?: TEntityClaimTemplateModel
  isEncrypted?: boolean
  isHeadlineMetric?: boolean
}
export interface TProposalActionModel {
  id: string
  type?: string
  group: string
  text?: string
  data?: any
}
export interface TProposalModel {
  name?: string
  description?: string
  actions?: TProposalActionModel[]
}
export type TEntityServiceModel = Service

export enum ELiquiditySource {
  Alphabond = 'Alphabond',
  WalletAddress = 'WalletAddress',
  BankAccount = 'BankAccount',
  PaymentContract = 'PaymentContract',
  NFTAsset = 'NFTAsset',
  LiquidityPool = 'LiquidityPool',
}
export interface TEntityLiquidityModel {
  source: ELiquiditySource
  liquidityId: string
}
export enum EPaymentType {
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
export interface TEntityPaymentModel {
  type: EPaymentType
  paymentId: string
}
export interface TClaimTemplate {
  id: string
  entityClaimId: string
  templateId: string
  title: string
  description: string
  isPrivate: boolean
  minTargetClaims: number
  maxTargetClaims: number
  goal: string
  submissionStartDate: string
  submissionEndDate: string
}
export interface TClaimAgentRole {
  id: string
  entityClaimId: string
  role: string
  credential: string
  autoApprove: boolean
}
export interface TClaimEvaluation {
  entityClaimId: string
  id: string
  context: string
  contextLink: string
  evaluationAttributes: string[]
  evaluationMethodology: string
}
export interface TClaimApprovalAttribute {
  attribute: string
  condition: string
}

export interface TClaimApprovalCriterion {
  id: string
  entityClaimId: string
  context: string
  contextLink: string
  approvalAttributes: TClaimApprovalAttribute[]
}

export interface TClaimEnrichmentResource {
  productId: string
  resource: string
}

export interface TClaimEnrichment {
  id: string
  entityClaimId: string
  context: string
  contextLink: string
  resources: TClaimEnrichmentResource[]
}
export interface TEntityClaimEvaluationMethodModel {
  evaluations: {
    [id: string]: TClaimEvaluation
  }
  approvalCriteria: {
    [id: string]: TClaimApprovalCriterion
  }
  enrichments: {
    [id: string]: TClaimEnrichment
  }
}
export type TZlottie = any
export interface TEntityModel extends Omit<Entity, 'metadata'>, IidDocument {
  owner: string
  publicKey?: string
  settings: {
    [key: string]: LinkedResource
  }

  profile?: TEntityProfileModel
  creator?: TEntityCreatorModel
  administrator?: TEntityAdministratorModel
  page?: TEntityPageSectionModel[]
  pageLegacy?: TEntityPageSectionLegacyModel
  tags?: TEntityDDOTagModel[]
  token?: TTokenMetadataModel
  zlottie?: TZlottie
  daoGroups?: { [address: string]: TDAOGroupModel }
  claim?: { [id: string]: TEntityClaimModel }
  surveyTemplate?: any
  type: string
  entityType?: string
  externalId?: string | null
  alsoKnownAs: string
}
