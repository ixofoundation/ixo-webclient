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
import { ControlType, Type } from 'components/JsonForm/types'

const CreatorIcon = '/assets/images/icon-creator.svg'

const UserIcon = '/assets/images/icon-user.svg'

const UserCircleIcon = '/assets/images/icon-user-circle.svg'

const TagsIcon = '/assets/images/icon-tag.svg'

const PageIcon = '/assets/images/icon-laptop.svg'

const PaymentIcon = '/assets/images/icon-payment.svg'

const ImageIcon = '/assets/images/icon-image-outline.svg'

const TextIcon = '/assets/images/icon-text.svg'

const DatabaseIcon = '/assets/images/icon-database.svg'

const CredentialIcon = '/assets/images/icon-credential.svg'

const AuthorisationIcon = '/assets/images/icon-authorisation.svg'

const GlobeIcon = '/assets/images/icon-globe.svg'

const AlgorithmIcon = '/assets/images/icon-algorithm.svg'

const SmartContractIcon = '/assets/images/icon-smart-contract.svg'

const ClaimIcon = '/assets/images/icon-claim.svg'

const DashboardIcon = '/assets/images/icon-dashboard.svg'

const DocumentIcon = '/assets/images/icon-document.svg'

const AgentAuthorisationIcon = '/assets/images/icon-agent-autorisation.svg'

const AgentCapabilityIcon = '/assets/images/icon-agent-capability.svg'

const AgentUsageLicenseIcon = '/assets/images/icon-usage-license.svg'

const ProjectIcon = '/assets/images/icon-project.svg'

const AlphaBondIcon = '/assets/images/icon-alphabond.svg'

const LBPIcon = '/assets/images/icon-lbp.svg'

const QuadraticIcon = '/assets/images/icon-quadratic.svg'

const ConvertibleIcon = '/assets/images/icon-convertible.svg'

const ClaimSchemaStoreIcon = '/assets/images/icon-claim-schema-store.svg'

const PublicDataNodeIcon = '/assets/images/icon-public-data-node.svg'

const ChainServicesIcon = '/assets/images/icon-chain-services.svg'

const Web2ServicesIcon = '/assets/images/icon-web2-services.svg'

const OracleServicesIcon = '/assets/images/icon-oracle-services.svg'

const DataSourceIcon = '/assets/images/icon-data-source.svg'

const VerifiableDisplaySourceIcon = '/assets/images/icon-verifiable-display-source.svg'

const AuthenticationSourceIcon = '/assets/images/icon-authentication-source.svg'

const WebKeyManagementIcon = '/assets/images/icon-web-key-management.svg'

const SmartContract2Icon = '/assets/images/icon-smart-contract2.svg'

const JamboDAppIcon = '/assets/images/icon-jambo-dapp.svg'

const MatrixServerIcon = '/assets/images/icon-matrix-server.svg'

const EvaluationMethodologyIcon = '/assets/images/icon-evaluation-methodology.svg'

const HandshakeIcon = '/assets/images/icon-handshake.svg'

const StakingIcon = '/assets/images/icon-staking.svg'

const MultisigIcon = '/assets/images/icon-multisig.svg'

const PlusIcon = '/assets/images/icon-plus.svg'

const LockOpenIcon = '/assets/images/icon-lock-open-solid.svg'

const StarIcon = '/assets/images/icon-star.svg'

const FireIcon = '/assets/images/icon-fire.svg'

const TreasuryIcon = '/assets/images/icon-treasury.svg'

const DatabaseMultiIcon = '/assets/images/icon-coins-solid.svg'

const ArrowDownIcon = '/assets/images/icon-arrow-down.svg'

const HandHoldingUSDIcon = '/assets/images/icon-hand-holding-usd-solid.svg'

const CycleIcon = '/assets/images/icon-cycle.svg'

const ArrowUpIcon = '/assets/images/icon-arrow-up.svg'

const AuthGrantIcon = '/assets/images/icon-auth-grant.svg'

const MemberGroupIcon = '/assets/images/icon-member-group.svg'

const DAOIcon = '/assets/images/icon-dao.svg'

const InfoIcon = '/assets/images/icon-info.svg'

const AnnouncementIcon = '/assets/images/icon-announcement.svg'

const PaperIcon = '/assets/images/icon-paper2.svg'

const ProposalIcon = '/assets/images/icon-proposal.svg'

const SmartContract3Icon = '/assets/images/icon-smart-contract3.svg'

const SmartContract4Icon = '/assets/images/icon-smart-contract4.svg'

const ProfileIcon = '/assets/images/icon-profile.svg'

const GearMultiIcon = '/assets/images/icon-gear-multi.svg'

const Plus2Icon = '/assets/images/icon-plus2.svg'

const CodeIcon = '/assets/images/icon-code-solid.svg'

const BoxOpenSolidIcon = '/assets/images/icon-box-open-solid.svg'

const SlidersHSolidIcon = '/assets/images/icon-sliders-h-solid.svg'

const VoteYeaIcon = '/assets/images/icon-vote-yea-solid.svg'

const VolumeUpIcon = '/assets/images/icon-volume-up-solid.svg'

const LinkedAccountIcon = '/assets/images/icon-linked-account.svg'

const UserPlusIcon = '/assets/images/icon-user-plus-solid.svg'
import { Service } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import SetupUpdateVotingConfigModal from 'components/Modals/AddActionModal/SetupUpdateVotingConfigModal'
import {
  SetupAuthzExecModal,
  SetupAuthzGrantModal,
  SetupBurnNFTModal,
  SetupCustomModal,
  SetupDAOAdminExecuteModal,
  SetupVoteOnADAOModal,
  SetupEditEntityModal,
  SetupExecuteSmartContractModal,
  SetupInstantiateSmartContractModal,
  SetupManageMembersModal,
  SetupManageStorageItemsModal,
  SetupManageSubDAOsModal,
  SetupManageTreasuryNFTsModal,
  SetupManageTreasuryTokensModal,
  SetupMigrateSmartContractModal,
  SetupMintModal,
  SetupSpendModal,
  SetupStakingActionsModal,
  SetupTokenSwapModal,
  SetupTransferNFTModal,
  SetupUpdateContractAdminModal,
  SetupUpdateDAOInfoModal,
  SetupUpdateProposalSubmissionConfigModal,
  SetupValidatorActionsModal,
  SetupVoteOnAGovernanceProposalModal,
  SetupWithdrawTokenSwapModal,
  SetupSubmitProposalOnADAOModal,
  SetupStakeToGroupModal,
  SetupSendGroupTokenModal,
} from 'components/Modals/AddActionModal'
import SetupJoinModal from 'components/Modals/AddActionModal/SetupJoinModal'
import { Config } from '@ixo/impactxclient-sdk/types/codegen/DaoCore.types'
import { Config as PreProposeConfig } from '@ixo/impactxclient-sdk/types/codegen/DaoPreProposeSingle.types'
import { Config as ProposalConfig, VoteInfo } from '@ixo/impactxclient-sdk/types/codegen/DaoProposalSingle.types'
import { Config as Cw20StakeConfig } from '@ixo/impactxclient-sdk/types/codegen/Cw20Stake.types'
import { Member, Proposal } from 'types/dao'
import { MarketingInfoResponse, TokenInfoResponse } from '@ixo/impactxclient-sdk/types/codegen/Cw20Base.types'

export enum ELocalisation {
  EN = 'EN',
  FR = 'FR',
  ES = 'ES',
  CHI = 'CHI',
}

export enum EClaimType {
  Identity = 'Identity',
  Accreditation = 'Accreditation',
  Service = 'Service',
  Outcome = 'Outcome',
  CredentialAudit = 'CredentialAudit',
  Credential = 'Credential',
  UseOfFunds = 'Use of Funds',
  Payment = 'Payment',
  Investment = 'Investment',
  Banking = 'Banking',
  Invoice = 'Invoice',
  Procurement = 'Procurement',
  Provenance = 'Provenance',
  Ownership = 'Ownership',
  Custody = 'Custody',
  Dispute = 'Dispute',
  Impact = 'Impact',
  Offset = 'Offset',
  Contribution = 'Contribution',
  Grant = 'Grant',
  Compensation = 'Compensation',
}
export enum EDeedType {
  Proposal = 'Proposal',
  Offer = 'Offer',
  Request = 'Request',
  Subscription = 'Subscription',
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

export interface FormCardProps {
  ref?: any
  handleUpdateContent: (formData: FormData) => void
  handleError: (errors: string[]) => void
  handleSubmitted: () => void
  handleRemoveSection?: () => void
}

export interface QuestionCardBaseProps {
  title: string
  description: string
  label: string
  attributeType: string
}

export const EntitySettingsConfig: { [key: string]: any } = {
  // required
  creator: {
    text: 'Creator',
    icon: CreatorIcon,
    required: true,
  },
  administrator: {
    text: 'Administrator',
    icon: UserCircleIcon,
    required: true,
  },
  ddoTags: {
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
  claimEvaluationMethod: {
    text: 'Evaluation Methodology',
    icon: EvaluationMethodologyIcon,
  },
}

export const EntityLinkedResourceConfig: { [key: string]: any } = {
  image: {
    text: 'Media',
    icon: ImageIcon,
    accept: { 'image/*': [] },
  },
  document: {
    text: 'Document',
    icon: DocumentIcon,
    accept: { 'application/pdf': [] },
  },
  text: {
    text: 'Text',
    icon: TextIcon,
    accept: { 'text/plain': ['.txt'] },
  },
  database: {
    text: 'Database',
    icon: DatabaseIcon,
    accept: { '*': [] },
    disabled: true,
  },
  verifiableCredential: {
    text: 'Verifiable Credential',
    icon: CredentialIcon,
    accept: { '*': [] },
    disabled: true,
  },
  authorisation: {
    text: 'Authorisation',
    icon: AuthorisationIcon,
    accept: { '*': [] },
    disabled: true,
  },
  website: {
    text: 'Website',
    icon: GlobeIcon,
    accept: { '*': [] },
    disabled: true,
  },
  algorithm: {
    text: 'Algorithm',
    icon: AlgorithmIcon,
    accept: { '*': [] },
    disabled: true,
  },
  smartContract: {
    text: 'Smart Contract',
    icon: SmartContractIcon,
    accept: { '*': [] },
    disabled: true,
  },
  claims: {
    text: 'Claims',
    icon: ClaimIcon,
    accept: { '*': [] },
    disabled: true,
  },
  dashboard: {
    text: 'Dashboard',
    icon: DashboardIcon,
    accept: { '*': [] },
    disabled: true,
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
  BlockchainAccount: {
    text: 'Account',
    icon: LinkedAccountIcon,
  },
  ImpactEntity: {
    text: 'Impact Entity',
    icon: ProjectIcon,
  },
  IndividualAccount: {
    text: 'Delegate',
    icon: UserIcon,
  },
  // dao: {
  //   text: 'DAO',
  //   icon: DAOIcon,
  // },
  // project: {
  //   text: 'Project',
  //   icon: ProjectIcon,
  // },
  // asset: {
  //   text: 'Asset',
  //   icon: AssetIcon,
  // },
  // protocol: {
  //   text: 'Protocol',
  //   icon: EntityIcon,
  // },
  // investment: {
  //   text: 'Investment',
  //   icon: InvestmentIcon,
  // },
  // oracle: {
  //   text: 'Oracle',
  //   icon: OracleIcon,
  // },
  // paymentTemplate: {
  //   text: 'Payment Template',
  //   icon: CircleIcon,
  // },
  // smartContract: {
  //   text: 'Smart Contract',
  //   icon: HTMLTagIcon,
  // },
  // liquidity: {
  //   text: 'Liquidity',
  //   icon: InvestmentIcon,
  // },
}

export const InvestmentInstrumentsConfig: { [key: string]: any } = {
  alphaBond: {
    text: 'AlphaBond',
    icon: AlphaBondIcon,
    required: true,
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
    icon: HandshakeIcon,
  },
  staking: {
    text: 'Staking',
    description:
      'Staking Governance assigns a weight to each Group member’s vote, based on how many governance tokens they have staked. Anyone can participate by acquiring and staking governance tokens.',
    icon: StakingIcon,
  },
  multisig: {
    text: 'Multisig',
    description:
      'Multisig Governance allocates control of a group account to predefined signatories. A threshold number of signatures is required to approve any transaction. This does not require any on-chain voting procedure.',
    icon: MultisigIcon,
  },
  new: {
    text: 'Add an existing group',
    description: 'Paste the group ID to add',
    icon: PlusIcon,
  },
}

export const ProposalActionConfig = {
  Tokens: {
    id: 'tokens',
    text: 'Tokens',
    items: {
      Mint: {
        text: 'Mint',
        description: 'Mint new governance tokens.',
        icon: StarIcon,
        in: ['dao_voting_cw20_staked'],
        disabled: true,
        setupModal: SetupMintModal,
      },
      'Mint NFT': {
        text: 'Mint NFT',
        description: 'Create a new NFT.',
        icon: StarIcon,
        in: ['dao_voting_cw20_staked', 'dao_voting_cw4'],
        disabled: true,
      },
      'Burn NFT': {
        text: 'Burn NFT',
        description: 'Burn an NFT.',
        icon: FireIcon,
        in: ['dao_voting_cw20_staked', 'dao_voting_cw4'],
        disabled: true,
        setupModal: SetupBurnNFTModal,
      },
      'Manage Treasury NFTs': {
        text: 'Manage Treasury NFTs',
        description: 'Manage NFT Collections displayed on your DAO’s treasury page.',
        icon: TreasuryIcon,
        in: ['dao_voting_cw20_staked', 'dao_voting_cw4'],
        disabled: true,
        setupModal: SetupManageTreasuryNFTsModal,
      },
      'Manage Treasury Tokens': {
        text: 'Manage Treasury Tokens',
        description: 'Manage Tokens displayed on your DAO’s treasury page.',
        icon: DatabaseMultiIcon,
        in: ['dao_voting_cw20_staked', 'dao_voting_cw4'],
        setupModal: SetupManageTreasuryTokensModal,
      },
      'Withdraw Token Swap': {
        text: 'Withdraw Token Swap',
        description: 'Withdraw funds from a token swap that has not yet completed.',
        icon: ArrowDownIcon,
        in: ['dao_voting_cw20_staked', 'dao_voting_cw4'],
        disabled: true,
        setupModal: SetupWithdrawTokenSwapModal,
      },
      Spend: {
        text: 'Spend',
        description: 'Spend native or CW20 tokens from the treasury.',
        icon: HandHoldingUSDIcon,
        in: ['dao_voting_cw20_staked'],
        setupModal: SetupSpendModal,
      },
      'Token Swap': {
        text: 'Token Swap',
        description:
          'Create a new token swap that completes when both parties have paid their tokens or fund an existing one.',
        icon: CycleIcon,
        in: ['dao_voting_cw20_staked', 'dao_voting_cw4'],
        disabled: true,
        setupModal: SetupTokenSwapModal,
      },
      'Transfer NFT': {
        text: 'Transfer NFT',
        description: 'Transfer an NFT out of the DAO’s treasury.',
        icon: ArrowUpIcon,
        in: ['dao_voting_cw20_staked', 'dao_voting_cw4'],
        disabled: true,
        setupModal: SetupTransferNFTModal,
      },
    },
  },
  Groups: {
    id: 'groups',
    text: 'Groups',
    items: {
      Join: {
        text: 'Join',
        description:
          'ImpactsDAO is a cooperative of DAOs. If you’re a delegate of a DAO entity that wants to join ImpactsDAO, submit a proposal for your DAO to be added.',
        icon: UserPlusIcon,
        in: ['dao_voting_cw20_staked', 'dao_voting_cw4'],
        hidden: true,
        setupModal: SetupJoinModal,
      },
      'AuthZ Exec': {
        text: 'AuthZ Exec',
        description: 'Perform an action on behalf of another account.',
        icon: LockOpenIcon,
        in: ['dao_voting_cw20_staked', 'dao_voting_cw4'],
        disabled: true,
        setupModal: SetupAuthzExecModal,
      },
      'AuthZ Grant / Revoke': {
        text: 'AuthZ Grant / Revoke',
        description: 'Grant / revoke authorisations that allow other accounts to perform actions on behalf of the DAO.',
        icon: AuthGrantIcon,
        in: ['dao_voting_cw20_staked', 'dao_voting_cw4'],
        disabled: true,
        setupModal: SetupAuthzGrantModal,
      },
      'Change Group Membership': {
        text: 'Change Group Membership',
        description: 'Add, update or remove members from the DAO.',
        icon: MemberGroupIcon,
        in: ['dao_voting_cw4'],
        setupModal: SetupManageMembersModal,
      },
      'Manage Subgroups': {
        text: 'Manage Subgroups',
        description: 'Recognize or remove SubDAOs from the DAO.',
        icon: DAOIcon,
        in: ['dao_voting_cw20_staked', 'dao_voting_cw4'],
        disabled: true,
        setupModal: SetupManageSubDAOsModal,
      },
      'Manage Storage Items': {
        text: 'Manage Storage Items',
        description: 'Manage Storage Items associated with your DAO. Set or remove key / value pairs.',
        icon: BoxOpenSolidIcon,
        in: ['dao_voting_cw20_staked', 'dao_voting_cw4'],
        setupModal: SetupManageStorageItemsModal,
      },
      'Update Info': {
        text: 'Update Info',
        description: 'Update your DAO’s name, image and description.',
        icon: InfoIcon,
        in: ['dao_voting_cw20_staked', 'dao_voting_cw4'],
        setupModal: SetupUpdateDAOInfoModal,
      },
      'Update Proposal Submission Config': {
        text: 'Update Proposal Submission Config',
        description: 'Update the proposal submission parameters for your DAO.',
        icon: AnnouncementIcon,
        in: ['dao_voting_cw20_staked', 'dao_voting_cw4'],
        setupModal: SetupUpdateProposalSubmissionConfigModal,
      },
      'Update Voting Config': {
        text: 'Update Voting Config',
        description: 'Update the voting parameters for your DAO.',
        icon: PaperIcon,
        in: ['dao_voting_cw20_staked', 'dao_voting_cw4'],
        setupModal: SetupUpdateVotingConfigModal,
      },
      'Vote on a Network Proposal': {
        text: 'Vote on a Network Proposal',
        description: 'Vote on an open chain governance proposal, as an individual or as a validator.',
        icon: ProposalIcon,
        in: ['dao_voting_cw20_staked', 'dao_voting_cw4'],
        disabled: true,
        setupModal: SetupVoteOnAGovernanceProposalModal,
      },
      'DAO Admin Execute': {
        text: 'DAO Admin Execute',
        description:
          'Execute actions on behalf of a DAO with you as the admin. A parent DAO could use this to execute actions on behalf of a SubDAO.',
        icon: AgentAuthorisationIcon,
        in: ['dao_voting_cw20_staked', 'dao_voting_cw4'],
        disabled: true,
        setupModal: SetupDAOAdminExecuteModal,
      },
    },
  },
  'Smart Contracts': {
    id: 'smartContracts',
    text: 'Smart Contracts',
    items: {
      'Initiate Smart Contract': {
        text: 'Initiate Smart Contract',
        description: 'Instantiate a smart contract.',
        icon: SmartContract3Icon,
        in: ['dao_voting_cw20_staked', 'dao_voting_cw4'],
        setupModal: SetupInstantiateSmartContractModal,
      },
      'Execute Smart Contract': {
        text: 'Execute Smart Contract',
        description: 'Execute a message on a smart contract',
        icon: SmartContract4Icon,
        in: ['dao_voting_cw20_staked', 'dao_voting_cw4'],
        setupModal: SetupExecuteSmartContractModal,
      },
      'Migrate Smart Contract': {
        text: 'Migrate Smart Contract',
        description: 'Migrate a CosmWasm contract to a new code ID.',
        icon: MemberGroupIcon,
        in: ['dao_voting_cw20_staked', 'dao_voting_cw4'],
        setupModal: SetupMigrateSmartContractModal,
      },
      'Update Contract Admin': {
        text: 'Update Contract Admin',
        description: 'Update the CosmWasm level admin of a smart contract.',
        icon: ProfileIcon,
        in: ['dao_voting_cw20_staked', 'dao_voting_cw4'],
        setupModal: SetupUpdateContractAdminModal,
      },
    },
  },
  Staking: {
    id: 'staking',
    text: 'Staking',
    items: {
      'Validator Actions': {
        text: 'Validator Actions',
        description: 'Make transactions related to DAO run validators.',
        icon: GearMultiIcon,
        in: ['dao_voting_cw20_staked', 'dao_voting_cw4'],
        disabled: true,
        setupModal: SetupValidatorActionsModal,
      },
      'Staking Actions': {
        text: 'Staking Actions',
        description: 'Manage native token staking: claim rewards, delegate, redelegate and undelegate.',
        icon: Plus2Icon,
        in: ['dao_voting_cw20_staked', 'dao_voting_cw4'],
        disabled: true,
        setupModal: SetupStakingActionsModal,
      },
      'Stake To Group': {
        text: 'Stake To Group',
        description: 'Manage cw20 token staking.',
        icon: Plus2Icon,
        in: ['dao_voting_cw20_staked', 'dao_voting_cw4'],
        setupModal: SetupStakeToGroupModal,
      },
      'Send Group Tokens': {
        text: 'Send Group Tokens',
        description: 'Send Group Tokens.',
        icon: ArrowUpIcon,
        in: ['dao_voting_cw20_staked', 'dao_voting_cw4'],
        setupModal: SetupSendGroupTokenModal,
      },
    },
  },
  Entities: {
    id: 'entities',
    text: 'Entities',
    items: {
      'Create Entity': {
        text: 'Create Entity',
        description: 'Create Entity',
        icon: CreatorIcon,
        in: ['dao_voting_cw20_staked', 'dao_voting_cw4'],
        disabled: true,
      },
      'Edit Entity': {
        text: 'Edit Entity',
        description: 'Edit Entity',
        icon: SlidersHSolidIcon,
        in: ['dao_voting_cw20_staked', 'dao_voting_cw4'],
        setupModal: SetupEditEntityModal,
      },
    },
  },
  DAOs: {
    id: 'daos',
    text: 'DAOs',
    items: {
      Vote: {
        text: 'Vote',
        description: '',
        icon: VoteYeaIcon,
        in: ['dao_voting_cw20_staked', 'dao_voting_cw4'],
        setupModal: SetupVoteOnADAOModal,
      },
      'Submit Proposal': {
        text: 'Submit Proposal',
        description: '',
        icon: VolumeUpIcon,
        in: ['dao_voting_cw20_staked', 'dao_voting_cw4'],
        setupModal: SetupSubmitProposalOnADAOModal,
      },
    },
  },
  Other: {
    id: 'other',
    text: 'Other',
    items: {
      Custom: {
        text: 'Custom',
        description: 'Perform any custom action a wallet can.',
        icon: CodeIcon,
        in: ['dao_voting_cw20_staked', 'dao_voting_cw4'],
        setupModal: SetupCustomModal,
      },
    },
  },
}

export const ProposalActionConfigMap = {
  'wasm.execute.update_members': {
    type: 'wasm.execute.update_members',
    group: 'Groups',
    text: 'Change Group Membership',
    description: 'Add, update or remove members from the DAO.',
    icon: MemberGroupIcon,
    setupModal: SetupManageMembersModal,
  },
  'wasm.execute.update_config.config': {
    type: 'wasm.execute.update_config.config',
    group: 'Groups',
    text: 'Update Info',
    description: 'Update your DAO’s name, image and description.',
    icon: InfoIcon,
    setupModal: SetupUpdateDAOInfoModal,
  },
  'wasm.execute.update_config.proposal': {
    type: 'wasm.execute.update_config.proposal',
    group: 'Groups',
    text: 'Update Proposal Submission Config',
    description: 'Update the proposal submission parameters for your DAO.',
    icon: AnnouncementIcon,
    setupModal: SetupUpdateProposalSubmissionConfigModal,
  },
  'wasm.execute.update_config.voting': {
    type: 'wasm.execute.update_config.voting',
    group: 'Groups',
    text: 'Update Voting Config',
    description: 'Update the voting parameters for your DAO.',
    icon: PaperIcon,
    setupModal: SetupUpdateVotingConfigModal,
  },
  '/ixo.iid.v1beta1.MsgAddLinkedEntity': {
    type: '/ixo.iid.v1beta1.MsgAddLinkedEntity',
    group: 'Groups',
    text: 'Join',
    description:
      'ImpactsDAO is a cooperative of DAOs. If you’re a delegate of a DAO entity that wants to join ImpactsDAO, submit a proposal for your DAO to be added.',
    icon: UserPlusIcon,
    setupModal: SetupJoinModal,
  },
}

export enum EAssetType {
  ImpactToken = 'Impact Token',
  Coin = 'Coin',
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
export interface TEntityClaimTemplateModel {
  id: string
  type: string
  title: string
  description: string
  creator: string
  createdAt: string
}
export interface TEntityClaimSubmissionModel {
  maximum: number
  startDate: string
  endDate: string
}
export interface TEntityClaimModel {
  id: string
  template?: TEntityClaimTemplateModel
  submissions?: TEntityClaimSubmissionModel
  approvalTarget?: number
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
export interface TAssetMetadataModel extends TBasicMetadataModel {
  denom?: string
  type?: EAssetType
  tokenName?: string
  maxSupply?: number | undefined
  decimals?: number
  autoGenerateZLottie?: boolean
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

export type TEntityMetadataModel = TAssetMetadataModel

// based on ixo-protocol/artefacts/profile_schema.json
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
export interface TEntityDDOTagModel {
  category: string
  tags: string[]
  readonly?: boolean
}

export type TEntityAdministratorModel = TEntityCreatorModel

/**
 * @description memberships, staking
 */
// export interface TDAOGroupModel extends UpdatePreProposeConfigData, UpdateProposalConfigData {
//   id: string
//   type: string // 'membership' | 'staking' | 'multisig'
//   contractAddress?: string

//   name: string
//   description: string
//   memberships: {
//     category?: string
//     weight: number
//     members: string[]
//   }[]
//   staking?: {
//     // use existing token
//     tokenContractAddress: string
//     // create new token
//     tokenSymbol: string
//     tokenName: string
//     tokenSupply: number
//     tokenLogo?: string
//     treasuryPercent: number
//     // config
//     unstakingDuration: DurationWithUnits
//   }

//   /** <extends from UpdatePreProposeConfigData>
//    *  depositRequired: boolean
//       depositInfo: {
//         amount: string
//         type: 'native' | 'cw20' | 'voting_module_token'
//         denomOrAddress: string
//         token?: GenericToken
//         refundPolicy: DepositRefundPolicy
//       }
//       anyoneCanPropose: boolean // only_members | everyone
//    */
//   /** <extends from UpdateProposalConfigData>
//    *  onlyMembersExecute: boolean
//       thresholdType: '%' | 'majority'
//       thresholdPercentage?: number
//       quorumEnabled: boolean
//       quorumType: '%' | 'majority'
//       quorumPercentage?: number
//       proposalDuration: number
//       proposalDurationUnits: 'weeks' | 'days' | 'hours' | 'minutes' | 'seconds'
//       allowRevoting: boolean
//    */

//   /**
//    * @description absoluteThresholdCount is only for multisig group
//    */
//   absoluteThresholdCount?: string
// }

export interface TProposalActionModel {
  id: string
  type?: string
  group: string
  text?: string
  data?: any
}

/**
 * @description proposal
 */
export interface TProposalModel {
  name?: string
  description?: string
  actions?: TProposalActionModel[]
}

/**
 * @description token metadata
 */
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

/**
 * @description DAO Group
 */
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
