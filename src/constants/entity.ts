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

const HandshakeIcon = '/assets/images/icon-handshake.svg'

const StakingIcon = '/assets/images/icon-staking.svg'

const MultisigIcon = '/assets/images/icon-multisig.svg'

const PlusIcon = '/assets/images/icon-plus.svg'

const LockOnIcon = '/assets/images/icon-lock-open-solid.svg'

const StarIcon = '/assets/images/icon-star.svg'

const FireIcon = '/assets/images/icon-fire.svg'

const TreasuryIcon = '/assets/images/icon-treasury.svg'

const DatabaseMultiIcon = '/assets/images/icon-coins-solid.svg'

const ArrowDownIcon = '/assets/images/icon-arrow-down.svg'

const HandHoldingUsdIcon = '/assets/images/icon-hand-holding-usd-solid.svg'

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

const CheckSquareIcon = '/assets/images/icon-check-square.svg'
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
  SetupUpdateVotingConfigModal,
  SetupAcceptToMarketplaceModal,
} from 'components/Modals/AddActionModal'
import SetupAddEntityModal from 'components/Modals/AddActionModal/SetupAddEntityModal'

export const EntityStatusMap = {
  null: 'undefined',
  0: 'created',
  1: 'closed',
  2: 'transferred',
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
  proposalAction: {
    text: 'Proposal Action',
    icon: TextIcon,
    accept: { '*': [] },
  },
  verifiableCredential: {
    text: 'Credential Schema',
    icon: CredentialIcon,
    accept: { '*': [] },
    disabled: false,
  },
  claims: {
    text: 'Claims Schema',
    icon: ClaimIcon,
    accept: { '*': [] },
    disabled: false,
  },
  database: {
    text: 'Database',
    icon: DatabaseIcon,
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
  DeedRequest: {
    text: 'Request',
    icon: PaperIcon,
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
        icon: HandHoldingUsdIcon,
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
      'AuthZ Grant / Revoke': {
        text: 'AuthZ Grant / Revoke',
        description: 'Grant / revoke authorisations that allow other accounts to perform actions on behalf of the DAO.',
        icon: AuthGrantIcon,
        in: ['dao_voting_cw20_staked', 'dao_voting_cw4'],
        disabled: false,
        setupModal: SetupAuthzGrantModal,
      },
      'AuthZ Exec': {
        text: 'AuthZ Exec',
        description: 'Perform an action on behalf of another account.',
        icon: LockOnIcon,
        in: ['dao_voting_cw20_staked', 'dao_voting_cw4'],
        disabled: false,
        setupModal: SetupAuthzExecModal,
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
        description: 'Create an Entity of type DAO, Project, Asset, Protocol, Oracle, Investment.',
        icon: CreatorIcon,
        in: ['dao_voting_cw20_staked', 'dao_voting_cw4'],
        setupModal: SetupAddEntityModal,
        disabled: false,
      },
      'Edit Entity': {
        text: 'Edit Entity',
        description: 'Edit Entity',
        icon: SlidersHSolidIcon,
        in: ['dao_voting_cw20_staked', 'dao_voting_cw4'],
        setupModal: SetupEditEntityModal,
        disabled: true,
      },
      'Accept to Marketplace': {
        text: 'Accept to Marketplace',
        description: 'Every entity created on a marketplace has to be accepted by the DAO that runs the marketplace.',
        icon: CheckSquareIcon,
        in: ['dao_voting_cw20_staked', 'dao_voting_cw4'],
        setupModal: SetupAcceptToMarketplaceModal,
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

export const ProposalActionConfigMap: Record<string, any> = {
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
  'bank.send': {
    type: 'bank.send',
    group: 'Tokens',
    text: 'Spend',
    description: 'Spend native or CW20 tokens from the treasury.',
    icon: HandHoldingUsdIcon,
    setupModal: SetupSpendModal,
  },
  '/ixo.entity.v1beta1.MsgUpdateEntityVerified': {
    type: '/ixo.entity.v1beta1.MsgUpdateEntityVerified',
    group: 'Entities',
    text: 'Accept to Marketplace',
    description: 'Every entity created on a marketplace has to be accepted by the DAO that runs the marketplace.',
    icon: CheckSquareIcon,
    setupModal: SetupAcceptToMarketplaceModal,
  },
}

export const VMKeyMap = {
  authentication: 'Authentication',
  assertionMethod: 'Assertion Method',
  keyAgreement: 'Key Agreement',
  capabilityInvocation: 'Capability Invocation',
  capabilityDelegation: 'Capability Delegation',
}
