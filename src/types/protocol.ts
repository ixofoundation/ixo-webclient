import { ReactComponent as CreatorIcon } from 'assets/images/icon-creator.svg'
import { ReactComponent as ControllerIcon } from 'assets/images/icon-controller.svg'
import { ReactComponent as TagsIcon } from 'assets/images/icon-tag.svg'
import { ReactComponent as PageIcon } from 'assets/images/icon-laptop.svg'
import { ReactComponent as PaymentIcon } from 'assets/images/icon-payment.svg'
import { ReactComponent as LiquidityIcon } from 'assets/images/icon-investment.svg'
import { ReactComponent as ImageIcon } from 'assets/images/icon-image-outline.svg'
import { ReactComponent as TextIcon } from 'assets/images/icon-text.svg'
import { ReactComponent as DatabaseIcon } from 'assets/images/icon-database.svg'
import { ReactComponent as CredentialIcon } from 'assets/images/icon-credential.svg'
import { ReactComponent as AuthorisationIcon } from 'assets/images/icon-authorisation.svg'
import { ReactComponent as GlobeIcon } from 'assets/images/icon-globe.svg'
import { ReactComponent as AlgorithmIcon } from 'assets/images/icon-algorithm.svg'
import { ReactComponent as SmartContractIcon } from 'assets/images/icon-smart-contract.svg'
import { ReactComponent as ClaimIcon } from 'assets/images/icon-claim.svg'
import { ReactComponent as DashboardIcon } from 'assets/images/icon-dashboard.svg'
import { ReactComponent as DocumentIcon } from 'assets/images/icon-document.svg'
import { Service } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/iid'
import { OutputBlockData } from '@editorjs/editorjs'

export const EntitySettingsConfig = {
  // required
  creator: {
    text: 'Creator',
    icon: CreatorIcon,
    required: true,
  },
  controller: {
    text: 'Controller',
    icon: ControllerIcon,
    required: true,
  },
  tags: {
    text: 'Tags',
    icon: TagsIcon,
    required: true,
  },
  page: {
    text: 'Page',
    icon: PageIcon,
    required: true,
  },
  service: {
    text: 'Services',
    icon: GlobeIcon,
    required: true,
  },
  // optional
  payments: {
    text: 'Payments',
    icon: PaymentIcon,
  },
  liquidity: {
    text: 'Liquidity',
    icon: LiquidityIcon,
  },
}

export const EntityLinkedResourceConfig = {
  image: {
    text: 'Media',
    icon: ImageIcon,
  },
  text: {
    text: 'Text',
    icon: TextIcon,
  },
  database: {
    text: 'Database',
    icon: DatabaseIcon,
  },
  verifiableCredential: {
    text: 'Verifiable Credential',
    icon: CredentialIcon,
  },
  authorisation: {
    text: 'Authorisation',
    icon: AuthorisationIcon,
  },
  website: {
    text: 'Website',
    icon: GlobeIcon,
  },
  algorithm: {
    text: 'Algorithm',
    icon: AlgorithmIcon,
  },
  smartContract: {
    text: 'Smart Contract',
    icon: SmartContractIcon,
  },
  claims: {
    text: 'Claims',
    icon: ClaimIcon,
  },
  dashboard: {
    text: 'Dashboard',
    icon: DashboardIcon,
  },
  document: {
    text: 'Document',
    icon: DocumentIcon,
  },
}

export enum ELocalisation {
  EN = 'EN',
  FR = 'FR',
  ES = 'ES',
  CHI = 'CHI',
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

export enum ELiquiditySource {
  Alphabond = 'Alphabond',
  WalletAddress = 'WalletAddress',
  BankAccount = 'BankAccount',
  PaymentContract = 'PaymentContract',
  NFTAsset = 'NFTAsset',
  LiquidityPool = 'LiquidityPool',
}

export interface TEntityCreatorModel {
  image: string
  displayName: string
  email: string
  country: string
  identifier: string
  credential: string
  mission: string
  encrypted?: boolean
  mutable?: boolean
}

export type TEntityServiceModel = Service

// TODO:
export interface TEntityLiquidityModel {
  source: ELiquiditySource
  liquidityId: string
}

// TODO:
export interface TEntityPaymentModel {
  type: EPaymentType
  paymentId: string
}

// TODO:
export interface TEntityLinkedResourceModel {
  id?: string
  path: string //  url
  type: string
  name: string
  description: string

  // extra
  icon: React.FC<React.SVGProps<SVGElement>>
  text: string
  openModal?: boolean
}

// TODO:
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
export interface TEntityClaimModel {
  id: string
  template: TClaimTemplate
  agentRoles: {
    [id: string]: TClaimAgentRole
  }
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

export interface TAssetMetadataModel {
  image?: string
  denom?: string
  icon?: string
  type?: EAssetType
  tokenName?: string
  name?: string
  maxSupply?: number | undefined
  decimals?: number
  description?: string
  brandName?: string
  country?: string
  autoGenerateZLottie?: boolean
  attributes?: { key: string; value: string }[]
  metrics?: {
    name?: string
    prefix?: string
    suffix?: string
    source?: string
  }[]
}

export type TEntityMetadataModel = TAssetMetadataModel

export interface TEntityTagsModel {
  [key: string]: string[]
}

export type TEntityPageModel = { [id: string]: OutputBlockData }
export type TEntityControllerModel = TEntityCreatorModel
