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
import { ReactComponent as ClaimSchemaStoreIcon } from 'assets/images/icon-claim-schema-store.svg'
import { ReactComponent as PublicDataNodeIcon } from 'assets/images/icon-public-data-node.svg'
import { ReactComponent as ChainServicesIcon } from 'assets/images/icon-chain-services.svg'
import { ReactComponent as Web2ServicesIcon } from 'assets/images/icon-web2-services.svg'
import { ReactComponent as OracleServicesIcon } from 'assets/images/icon-oracle-services.svg'
import { ReactComponent as DataSourceIcon } from 'assets/images/icon-data-source.svg'
import { ReactComponent as VerifiableDisplaySourceIcon } from 'assets/images/icon-verifiable-display-source.svg'
import { ReactComponent as AuthenticationSourceIcon } from 'assets/images/icon-authentication-source.svg'
import { ReactComponent as WebKeyManagementIcon } from 'assets/images/icon-web-key-management.svg'
import { ReactComponent as SmartContract2Icon } from 'assets/images/icon-smart-contract2.svg'
import { ReactComponent as JamboDAppIcon } from 'assets/images/icon-jambo-dapp.svg'
import { ReactComponent as MatrixServerIcon } from 'assets/images/icon-matrix-server.svg'
import { ReactComponent as EvaluationMethodologyIcon } from 'assets/images/icon-evaluation-methodology.svg'
import { ReactComponent as MemberShipIcon } from 'assets/images/icon-membership.svg'
import { ReactComponent as StakingIcon } from 'assets/images/icon-staking.svg'
import { ReactComponent as MultisigIcon } from 'assets/images/icon-multisig.svg'
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

export const EntitySettingsConfig: { [key: string]: any } = {
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
  ddoTags: {
    text: 'DDOTags',
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
  claimEvaluationMethod: {
    text: 'Evaluation Methodology',
    icon: EvaluationMethodologyIcon,
  },
}

export const EntityLinkedResourceConfig: { [key: string]: any } = {
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

export const EntityAccordedRightConfig = {
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
  payments: {
    text: 'Payments',
    icon: PaymentIcon,
  },
}

export const EntityLinkedEntityConfig = {
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
  liquidity: {
    text: 'Liquidity',
    icon: InvestmentIcon,
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

export const EntityServiceConfig: { [key: string]: any } = {
  claimSchemaStore: {
    text: 'Claim Schema Store',
    icon: ClaimSchemaStoreIcon,
  },
  publicDataNode: {
    text: 'Public Data Node',
    icon: PublicDataNodeIcon,
  },
  chainServices: {
    text: 'Chain Services',
    icon: ChainServicesIcon,
  },
  web2Services: {
    text: 'Web2.0 Services',
    icon: Web2ServicesIcon,
  },
  oracleServices: {
    text: 'Oracle Services',
    icon: OracleServicesIcon,
  },
  dataSource: {
    text: 'Data Source',
    icon: DataSourceIcon,
  },
  verifiableDisplaySource: {
    text: 'Verifiable Display Source',
    icon: VerifiableDisplaySourceIcon,
  },
  authenticationSource: {
    text: 'Authentication Source',
    icon: AuthenticationSourceIcon,
  },
  webKeyManagement: {
    text: 'Web Key Management',
    icon: WebKeyManagementIcon,
  },
  smartContract: {
    text: 'Smart Contract',
    icon: SmartContract2Icon,
  },
  jamboDApp: {
    text: 'JAMBO dApp',
    icon: JamboDAppIcon,
  },
  matrixServer: {
    text: 'Matrix Server',
    icon: MatrixServerIcon,
  },
}

export const DAOGroupConfig: { [key: string]: any } = {
  membership: {
    text: 'Membership',
    description:
      'Membership-based governance allocates a predefined voting weight to the account of each member in the Group. Changes in membership have to be approved by existing members casting their votes.',
    icon: MemberShipIcon,
  },
  staking: {
    text: 'Staking',
    description:
      'Staking Governance assigns a weight to each Group member’s vote based on the how many governance tokens they have staked. Anyone can participate by acquiring and staking governance tokens.',
    icon: StakingIcon,
  },
  multisig: {
    text: 'Multisig',
    description:
      'Multisig Governance allocates control of a group account to predefined signatories. A threshold number of signatures is required to approve any transaction. This does not require any on-chain voting procedure.',
    icon: MultisigIcon,
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
  id: string
  '@type': string
  logo: string
  displayName: string
  email: string
  location: string
  website: string
  mission: string
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
  data?: any
  required?: boolean
}

// TODO: add more fields
export interface TEntityAccordedRightModel {
  text: string
  icon: React.FC<React.SVGProps<SVGElement>>
  data: any
}

// TODO: add more fields
export interface TEntityLinkedEntityModel {
  text: string
  icon: React.FC<React.SVGProps<SVGElement>>
  data: any
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
/**
 * @deprecated
 */
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
export interface TEntityClaimTemplateModel {
  id: string
  title: string
  description: string
  creator: string
  createdAt: string
}
export interface TEntityClaimModel1 {
  id: string
  template: TEntityClaimTemplateModel

  maxSubmissions: number
  submissionStartDate: string
  submissionEndDate: string
  approvalTarget: number
  isEncrypted?: boolean
  isHeadlineMetric?: boolean
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
export interface TClaimMetadataModel extends TBasicMetadataModel {
  type: EClaimType
  title: string
  description: string
  autoGenerateZLottie?: boolean

  feature?: EClaimFeature
  reliability?: string
  userGuide?: string
  keywords?: { key: string; value: string }[]

  questions: {
    [id: string]: TQuestion
  }
}

/**
 * @deprecated
 */
export type TEntityMetadataModel = TAssetMetadataModel | TInvestmentMetadataModel | TClaimMetadataModel

// based on ixo-protocol/artefacts/profile_schema.json
export interface TEntityProfileAttributeModel {
  key: string
  value: string
}
export interface TEntityProfileMetricModel {
  prefix: string
  metric: string
  suffix: string
  source: string
}
export interface TEntityProfileModel {
  id: string
  '@type'?: string
  name: string
  description: string
  image: string
  imageDescription?: string // TODO: ?
  logo?: string
  brand: string
  location: string
  attributes: TEntityProfileAttributeModel[]
  metrics: TEntityProfileMetricModel[]
}
/**
 * @deprecated
 */
export interface TEntityTagsModel {
  [key: string]: string[]
}

export interface TEntityDDOTagModel {
  category: string
  tags: string[]
}

export type TEntityPageModel = { [id: string]: OutputBlockData }
export type TEntityControllerModel = TEntityCreatorModel

/**
 * @todo passingTreshold type,
 * @description memberships, staking, multisigMembers
 */
export interface TDAOGroupModel {
  id: string
  type: string // 'membership' | 'staking' | 'multisig'

  name?: string
  description?: string
  memberships?: {
    category: string
    weightPerMember: number
    members: string[]
  }[]
  staking?: {
    // use existing token
    tokenContractAddress?: string
    // create new token
    tokenSymbol?: string
    tokenName?: string
    tokenSupply?: number
    treasuryPercent?: number
    distributions?: {
      category: string
      totalSupplyPercent: number
      members: string[]
    }[]
  }
  multisigMembers?: string[]
  votingDuration?: {
    unit?: string // 'day' | 'month' | 'week'
    amount?: number
  }
  voteSwitching?: boolean
  passingTreshold?: string // 'Majority' |
  quorum?: number // 20%
}
