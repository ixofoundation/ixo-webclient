import { ReactComponent as CreatorIcon } from 'assets/images/icon-creator.svg'
import { ReactComponent as ControllerIcon } from 'assets/images/icon-controller.svg'
import { ReactComponent as TagsIcon } from 'assets/images/icon-tag.svg'
import { ReactComponent as PageIcon } from 'assets/images/icon-laptop.svg'
import { ReactComponent as PaymentIcon } from 'assets/images/icon-payment.svg'
import { ReactComponent as InvestmentIcon } from 'assets/images/icon-investment.svg'
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
import { ReactComponent as AgentAuthorisationIcon } from 'assets/images/icon-agent-autorisation.svg'
import { ReactComponent as AgentCapabilityIcon } from 'assets/images/icon-agent-capability.svg'
import { ReactComponent as AgentUsageLicenseIcon } from 'assets/images/icon-usage-license.svg'
import { ReactComponent as ProjectIcon } from 'assets/images/icon-project.svg'
import { ReactComponent as OracleIcon } from 'assets/images/icon-oracle.svg'
import { ReactComponent as EntityIcon } from 'assets/images/icon-entity.svg'
import { ReactComponent as AssetIcon } from 'assets/images/icon-asset.svg'
import { ReactComponent as CircleIcon } from 'assets/images/icon-circle.svg'
import { ReactComponent as HTMLTagIcon } from 'assets/images/icon-html-tag.svg'
import { ReactComponent as AlphaBondIcon } from 'assets/images/icon-alphabond.svg'
import { ReactComponent as LBPIcon } from 'assets/images/icon-lbp.svg'
import { ReactComponent as QuadraticIcon } from 'assets/images/icon-quadratic.svg'
import { ReactComponent as ConvertibleIcon } from 'assets/images/icon-convertible.svg'
import ShortText from 'assets/icons/ShortText'
import DatePicker from 'assets/icons/DatePicker'
import SingleDatePicker from 'assets/icons/SingleDatePicker'
import LongText from 'assets/icons/LongText'
import Selection from 'assets/icons/Selection'
import Rating from 'assets/icons/Rating'
import QRCode from 'assets/icons/QRcode'
import QRCodeScan from 'assets/icons/QRcodeScan'
import Location from 'assets/icons/Location'
import UploadImage from 'assets/icons/UploadImage'
import UploadAvatar from 'assets/icons/UploadAvatar'
import UploadFile from 'assets/icons/UploadFile'
import UploadAudio from 'assets/icons/UploadAudio'
import UploadVideo from 'assets/icons/UploadVideo'
import SelectPicture from 'assets/icons/SelectPicture'
import Currency from 'assets/icons/Currency'
import { Service } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/iid'
import { OutputBlockData } from '@editorjs/editorjs'
import { ControlType, Type } from 'components/JsonForm/types'

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
    icon: InvestmentIcon,
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

export const EntityAccordedRightsConfig = {
  authorisation: {
    text: 'Authorisation',
    icon: AgentAuthorisationIcon,
  },
  agentCapability: {
    text: 'Agent Capability',
    icon: AgentCapabilityIcon,
  },
  usageLicense: {
    text: 'Usage License',
    icon: AgentUsageLicenseIcon,
  },
}

export const EntityLinkedEntitiesConfig = {
  investment: {
    text: 'Investment',
    icon: InvestmentIcon,
  },
  project: {
    text: 'Project',
    icon: ProjectIcon,
  },
  oracle: {
    text: 'Oracle',
    icon: OracleIcon,
  },
  protocol: {
    text: 'Protocol',
    icon: EntityIcon,
  },
  asset: {
    text: 'Asset',
    icon: AssetIcon,
  },
  paymentTemplate: {
    text: 'Payment Template',
    icon: CircleIcon,
  },
  smartContract: {
    text: 'Smart Contract',
    icon: HTMLTagIcon,
  },
}

export const InvestmentInstrumentsConfig: { [key: string]: any } = {
  alphaBond: {
    text: 'AlphaBond',
    icon: AlphaBondIcon,
  },
  LBP: {
    text: 'LBP',
    icon: LBPIcon,
    disabled: true,
  },
  quadratic: {
    text: 'Quadratic',
    icon: QuadraticIcon,
    disabled: true,
  },
  convertible: {
    text: 'Convertible',
    icon: ConvertibleIcon,
    disabled: true,
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

// TODO: add more fields
export interface TEntityAccordedRightsModel {
  text: string
  icon: React.FC<React.SVGProps<SVGElement>>
}

// TODO: add more fields
export interface TEntityLinkedEntitiesModel {
  text: string
  icon: React.FC<React.SVGProps<SVGElement>>
}

// TODO: propertyModel
export interface TEntityPropertyModel {
  text?: string
  icon?: React.FC<React.SVGProps<SVGElement>>
  openModal?: boolean
  data?: any
  disabled?: boolean
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

export interface TBasicMetadataModel {
  description?: string
  brandName?: string
  country?: string
  attributes?: { key: string; value: string }[]
  metrics?: {
    name?: string
    prefix?: string
    suffix?: string
    source?: string
  }[]
  startDate?: string
  endDate?: string
}
export interface TAssetMetadataModel extends TBasicMetadataModel {
  image?: string
  denom?: string
  icon?: string
  type?: EAssetType
  tokenName?: string
  name?: string
  maxSupply?: number | undefined
  decimals?: number
  autoGenerateZLottie?: boolean
}
export interface TInvestmentMetadataModel extends TBasicMetadataModel {
  image?: string
  icon?: string
  orgName?: string
  name?: string
}
export enum EClaimType {
  Service = 'Service',
  Outcome = 'Outcome',
  Credential = 'Credential',
  UseOfFunds = 'Use of Funds',
  Payment = 'Payment',
  Investment = 'Investment',
  Banking = 'Banking',
  Procurement = 'Procurement',
  Provenance = 'Provenance',
  Ownership = 'Ownership',
  Custody = 'Custody',
  Dispute = 'Dispute',
  TheoryOfChange = 'Theory of Change',
  Staking = 'Staking',
  Impact = 'Impact',
}
export enum EClaimFeature {
  ShortText = 'Short Text',
  LongText = 'Long Text',
  MultipleSelect = 'Multiple Select',
  Currency = 'Currency',
  MultipleImageSelect = 'Multiple Image Select (Coming Soon)',
  Rating = 'Rating',
  SingleDateSelector = 'Single Date Selector',
  DateRangeSelector = 'Date Range Selector',
  QRCode = 'QR Code',
  QRCodeScan = 'QR Code Scan',
  LocationSelector = 'Location Selector',
  ImageUpload = 'Image Upload',
  AvatarUpload = 'Avatar Upload',
  DocumentUpload = 'Document Upload',
  VideoUpload = 'Video Upload',
  AudioUpload = 'Audio Upload',
  MixedForm = 'Mixed Form',
}
export const questionTypeMap = {
  [ControlType.Text]: {
    icon: ShortText,
    title: EClaimFeature.ShortText,
    controlType: ControlType.Text,
  },
  [ControlType.TextArea]: {
    icon: LongText,
    title: EClaimFeature.LongText,
    controlType: ControlType.TextArea,
  },
  [ControlType.CheckBoxes]: {
    icon: Selection,
    title: EClaimFeature.MultipleSelect,
    controlType: ControlType.CheckBoxes,
  },
  [ControlType.Currency]: {
    icon: Currency,
    title: EClaimFeature.Currency,
    controlType: ControlType.Currency,
  },
  [ControlType.ImageCheckboxes]: {
    icon: SelectPicture,
    title: EClaimFeature.MultipleImageSelect,
    controlType: ControlType.ImageCheckboxes,
  },
  [ControlType.Rating]: {
    icon: Rating,
    title: EClaimFeature.Rating,
    controlType: ControlType.Rating,
  },
  [ControlType.SingleDateSelector]: {
    icon: SingleDatePicker,
    title: EClaimFeature.SingleDateSelector,
    controlType: ControlType.SingleDateSelector,
  },
  [ControlType.DateRangeSelector]: {
    icon: DatePicker,
    title: EClaimFeature.DateRangeSelector,
    controlType: ControlType.DateRangeSelector,
  },
  [ControlType.QRCode]: {
    icon: QRCode,
    title: EClaimFeature.QRCode,
    controlType: ControlType.QRCode,
  },
  [ControlType.QRCodeScan]: {
    icon: QRCodeScan,
    title: EClaimFeature.QRCodeScan,
    controlType: ControlType.QRCodeScan,
  },
  [ControlType.LocationSelector]: {
    icon: Location,
    title: EClaimFeature.LocationSelector,
    controlType: ControlType.LocationSelector,
  },
  [ControlType.ImageUpload]: {
    icon: UploadImage,
    title: EClaimFeature.ImageUpload,
    controlType: ControlType.ImageUpload,
  },
  [ControlType.AvatarUpload]: {
    icon: UploadAvatar,
    title: EClaimFeature.AvatarUpload,
    controlType: ControlType.AvatarUpload,
  },
  [ControlType.DocumentUpload]: {
    icon: UploadFile,
    title: EClaimFeature.DocumentUpload,
    controlType: ControlType.DocumentUpload,
  },
  [ControlType.VideoUpload]: {
    icon: UploadVideo,
    title: EClaimFeature.VideoUpload,
    controlType: ControlType.VideoUpload,
  },
  [ControlType.AudioUpload]: {
    icon: UploadAudio,
    title: EClaimFeature.AudioUpload,
    controlType: ControlType.AudioUpload,
  },
}
export interface TQuestion {
  id: string
  title: string
  description: string
  label: string
  required: boolean
  type: Type
  control: ControlType
  attributeType: string
  minItems?: number
  maxItems?: number
  values?: string[]
  itemValues?: string[]
  itemLabels?: string[]
  itemImages?: string[]
  placeholder?: string
  initialValue?: string
  inline?: boolean
  order: number
  currency?: string
}
export interface TClaimMetadataModel {
  type: EClaimType
  title: string
  description: string

  feature?: EClaimFeature
  reliability?: string
  userGuide?: string
  keywords?: { key: string; value: string }[]

  questions: {
    [id: string]: TQuestion
  }
}

export type TEntityMetadataModel = TAssetMetadataModel | TInvestmentMetadataModel | TClaimMetadataModel

export interface TEntityTagsModel {
  [key: string]: string[]
}

export type TEntityPageModel = { [id: string]: OutputBlockData }
export type TEntityControllerModel = TEntityCreatorModel
