import { Moment } from 'moment'
import { Schema as FilterSchema } from './components/EntitiesFilter/schema/types'
import { Schema as HeaderSchema } from './components/EntitiesHero/schema/types'
import { Schema as ControlPanelSchema } from '../../common/components/ControlPanel/types'

export enum EntityType {
  Project = 'Project',
  Cell = 'Cell',
  Investment = 'Investment',
  Oracle = 'Oracle',
  Template = 'Template',
  Data = 'Data',
}

export enum EntityStatus {
  Pending = 'Pending',
  Live = 'Live',
  Stopped = 'Stopped',
  Sealed = 'Sealed',
  Deleted = 'Deleted',
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

// some of these enums not not be best suited to be in this file

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
  FeeforService = 'FeeforService',
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

export enum NodeType {
  RelayerNode = 'RelayerNode',
  CellNode = 'CellNode',
  IBCNode = 'IBCNode',
}

export enum FundSource {
  AlphaBond = 'AlphaBond',
  WalletAddress = 'WalletAddress',
  BankAccount = 'BankAccount',
  PaymentContract = 'PaymentContract',
  NFTAsset = 'NFTAsset',
}

export interface Entity {
  entityType: EntityType
  did: string
  userDid: string
  title: string
  shortDescription: string
  longDescription: string
  dateCreated: Moment
  ownerName: string
  status: string
  country: string
  impactAction: string
  serviceProvidersCount: number
  evaluatorsCount: number
  requiredClaimsCount: number
  successfulClaimsCount: number
  pendingClaimsCount: number
  rejectedClaimsCount: number
  sdgs: number[]
  agentDids: string[]
  imageUrl: string
  logoUrl: string
  categories: Category[]
  founderLogoUrl: string
  pdsUrl: string
  data: any // this is temporary until we don't have to pass projectData into the card component because of the weird link
}

export interface Category {
  name: string
  tags: string[]
}

export interface Filter {
  categories: Category[]
  sector: string
  dateFrom: Moment
  dateTo: Moment
  userEntities: boolean
  featuredEntities: boolean
  popularEntities: boolean
}

export interface EntitiesState {
  entities: Entity[]
  selectedEntitiesType: EntityType
  filter: Filter
}

export type EntityTypeStrategyMap = {
  [TKey in EntityType]: {
    title: string
    plural: string
    themeColor: string
    headerSchema: HeaderSchema
    filterSchema: FilterSchema
    controlPanelSchema: ControlPanelSchema
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

// these types an potentially go in a different module
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

export type FundSourceStrategyMap = {
  [TKey in FundSource]: {
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

export enum EntitiesActions {
  GetEntities = 'ixo/Entities/GET_ENTITIES',
  GetEntitiesSuccess = 'ixo/Entities/GET_ENTITIES_FULFILLED',
  GetEntitiesPending = 'ixo/Entities/GET_ENTITIES_PENDING',
  GetEntitiesFailure = 'ixo/Entities/GET_ENTITIES_REJECTED',
  ChangeEntitiesType = 'ixo/Entities/CHANGE_ENTITIES_TYPE',
  FilterToggleUserEntities = 'ixo/Entities/FILTER_TOGGLE_USER_ENTITIES',
  FilterToggleFeaturedEntities = 'ixo/Entities/FILTER_TOGGLE_FEATURED_ENTITIES',
  FilterTogglePopularEntities = 'ixo/Entities/FILTER_TOGGLE_POPULAR_ENTITIES',
  FilterDates = 'ixo/Entities/FILTER_DATES',
  FilterCategoryTag = 'ixo/Entities/FILTER_CATEGORY_TAG',
  FilterAddCategoryTag = 'ixo/Entities/FILTER_ADD_CATEGORY_TAG',
  FilterCategories = 'ixo/Entities/FILTER_CATEGORIES',
  ResetDatesFilter = 'ixo/Entities/RESET_DATES_FILTER',
  FilterSector = 'ixo/Entities/FILTER_SECTOR',
  ResetCategoryFilter = 'ixo/Entities/RESET_CATEGORY_FILTER',
  ResetSectorFilter = 'ixo/Entities/RESET_SECTOR_FILTER',
  ResetFilters = 'ixo/Entities/RESET_FILTERS',
}

export interface GetEntitiesAction {
  type: typeof EntitiesActions.GetEntities
  payload: Promise<Entity[]>
}

export interface GetEntitiesSuccessAction {
  type: typeof EntitiesActions.GetEntitiesSuccess
  payload: Entity[]
}

export interface FilterToggleUserEntitiesAction {
  type: typeof EntitiesActions.FilterToggleUserEntities
  payload: {
    userEntities: boolean
  }
}

export interface ChangeEntitiesTypeAction {
  type: typeof EntitiesActions.ChangeEntitiesType
  payload: {
    entityType: EntityType
  }
}

export interface FilterToggleFeaturedEntitiesAction {
  type: typeof EntitiesActions.FilterToggleFeaturedEntities
  payload: {
    featuredEntities: boolean
  }
}

export interface FilterTogglePopularEntitiesAction {
  type: typeof EntitiesActions.FilterTogglePopularEntities
  payload: {
    popularEntities: boolean
  }
}

export interface FilterDatesAction {
  type: typeof EntitiesActions.FilterDates
  payload: {
    dateFrom: Moment
    dateTo: Moment
  }
}

export interface ResetDatesFilterAction {
  type: typeof EntitiesActions.ResetDatesFilter
}

export interface FilterCategoryTagAction {
  type: typeof EntitiesActions.FilterCategoryTag
  payload: {
    category: string
    tags: string[]
  }
}

export interface FilterAddCategoryTagAction {
  type: typeof EntitiesActions.FilterAddCategoryTag
  payload: {
    category: string
    tags: string[]
  }
}

export interface FilterCategoriesAction {
  type: typeof EntitiesActions.FilterCategories
  payload: {
    categories: Category[]
  }
}

export interface ResetCategoryFilterAction {
  type: typeof EntitiesActions.ResetCategoryFilter
  payload: {
    category: string
  }
}
export interface FilterSectorAction {
  type: typeof EntitiesActions.FilterSector
  payload: {
    sector: string
  }
}
export interface ResetSectorFilterAction {
  type: typeof EntitiesActions.ResetSectorFilter
}

export interface ResetFiltersAction {
  type: typeof EntitiesActions.ResetFilters
}

export type EntitiesActionTypes =
  | GetEntitiesAction
  | GetEntitiesSuccessAction
  | ChangeEntitiesTypeAction
  | FilterToggleUserEntitiesAction
  | FilterToggleFeaturedEntitiesAction
  | FilterTogglePopularEntitiesAction
  | FilterDatesAction
  | FilterCategoryTagAction
  | FilterAddCategoryTagAction
  | FilterCategoriesAction
  | FilterSectorAction
  | ResetDatesFilterAction
  | ResetCategoryFilterAction
  | ResetSectorFilterAction
  | ResetFiltersAction
