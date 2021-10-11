import {
  EntityType,
  EntityTypeStrategyMap,
  PaymentTypeStrategyMap,
  PaymentType,
  PaymentDenominationStrategyMap,
  PaymentDenomination,
  EntityStatus,
  EntityStatusStrategyMap,
  EntityViewStrategyMap,
  EntityView,
  PageViewStrategyMap,
  PageView,
  SlashingConditionStrategyMap,
  StakeTypeStrategyMap,
  StakeType,
  SlashingCondition,
  NodeTypeStrategyMap,
  NodeType,
  FundSourceStrategyMap,
  FundSource,
  KeyTypeStrategyMap,
  KeyPurpose,
  KeyType,
  KeyPurposeStrategyMap,
  ServiceTypeStrategyMap,
  ServiceType,
  DataResourceTypeStrategyMap,
  DataResourceType,
  TermsOfUseTypeStrategyMap,
  TermsOfUseType,
} from './types'
import ProjectFilterSchema from './EntitiesExplorer/components/EntitiesFilter/schema/ProjectFilter.schema.json'
import CellFilterSchema from './EntitiesExplorer/components/EntitiesFilter/schema/CellFilter.schema.json'
import DataFilterSchema from './EntitiesExplorer/components/EntitiesFilter/schema/DataFilter.schema.json'
import InvestmentFilterSchema from './EntitiesExplorer/components/EntitiesFilter/schema/InvestmentFilter.schema.json'
import OracleFilterSchema from './EntitiesExplorer/components/EntitiesFilter/schema/OracleFilter.schema.json'
import TemplateFilterSchema from './EntitiesExplorer/components/EntitiesFilter/schema/TemplateFilter.schema.json'
import ProjectHeaderSchema from './EntitiesExplorer/components/EntitiesHero/schema/ProjectHeader.schema.json'
import CellHeaderSchema from './EntitiesExplorer/components/EntitiesHero/schema/CellHeader.schema.json'
import InvestmentHeaderSchema from './EntitiesExplorer/components/EntitiesHero/schema/InvestmentHeader.schema.json'
import OracleHeaderSchema from './EntitiesExplorer/components/EntitiesHero/schema/OracleHeader.schema.json'
import TemplateHeaderSchema from './EntitiesExplorer/components/EntitiesHero/schema/TemplateHeader.schema.json'
import DataHeaderSchema from './EntitiesExplorer/components/EntitiesHero/schema/DataHeader.schema.json'
import ProjectControlPanelSchema from 'common/components/ControlPanel/schema/Project.schema.json'
import CellControlPanelSchema from 'common/components/ControlPanel/schema/Cell.schema.json'
import InvestmentControlPanelSchema from 'common/components/ControlPanel/schema/Investment.schema.json'
import OracleControlPanelSchema from 'common/components/ControlPanel/schema/Oracle.schema.json'
import TemplateControlPanelSchema from 'common/components/ControlPanel/schema/Template.schema.json'
import DataControlPanelSchema from 'common/components/ControlPanel/schema/Data.schema.json'
import PayPerUse from 'assets/icons/PayPerUse'
import Proprietary from 'assets/icons/Proprietary'
import OnceOffFee from 'assets/icons/OnceOffFee'
import FreeOpenSource from 'assets/icons/FreeOpenSource'

export const entityTypeMap: EntityTypeStrategyMap = {
  [EntityType.Project]: {
    title: 'Project',
    plural: 'Projects',
    themeColor: '#49BFE0',
    headerSchema: ProjectHeaderSchema,
    filterSchema: ProjectFilterSchema,
    controlPanelSchema: ProjectControlPanelSchema,
    createNewTitle: 'Create a Project',
    urlPart: 'project',
  },
  [EntityType.Oracle]: {
    title: 'Oracle',
    plural: 'Oracles',
    themeColor: '#AD245C',
    headerSchema: OracleHeaderSchema,
    filterSchema: OracleFilterSchema,
    controlPanelSchema: OracleControlPanelSchema,
    createNewTitle: 'Create an Oracle',
    urlPart: 'oracle',
  },
  [EntityType.Investment]: {
    title: 'Investment',
    plural: 'Investments',
    themeColor: '#E4BC3D',
    headerSchema: InvestmentHeaderSchema,
    filterSchema: InvestmentFilterSchema,
    controlPanelSchema: InvestmentControlPanelSchema,
    createNewTitle: 'Create an Investment',
    urlPart: 'investment',
  },
  [EntityType.Cell]: {
    title: 'Cell',
    plural: 'Cells',
    themeColor: '#85AD5C',
    headerSchema: CellHeaderSchema,
    filterSchema: CellFilterSchema,
    controlPanelSchema: CellControlPanelSchema,
    createNewTitle: 'Create a Cell',
    urlPart: 'cell',
  },
  [EntityType.Template]: {
    title: 'Template',
    plural: 'Templates',
    themeColor: '#7c2740',
    headerSchema: TemplateHeaderSchema,
    filterSchema: TemplateFilterSchema,
    controlPanelSchema: TemplateControlPanelSchema,
    createNewTitle: 'Create a Claim Template',
    urlPart: 'template',
  },
  [EntityType.Asset]: {
    title: 'Asset',
    plural: 'Assets',
    themeColor: '#ED9526',
    headerSchema: DataHeaderSchema,
    filterSchema: DataFilterSchema,
    controlPanelSchema: DataControlPanelSchema,
    createNewTitle: 'Create Assets',
    urlPart: 'asset',
  },
}

export function getStage(entityType: string): any {
  return entityTypeMap[entityType].filterSchema.ddoTags.find((ddoTag) => ddoTag.name=='Stage').tags
}

export const entityStatusMap: EntityStatusStrategyMap = {
  [EntityStatus.Pending]: { title: 'Pending' },
  [EntityStatus.Live]: { title: 'Live' },
  [EntityStatus.Stopped]: { title: 'Stopped' },
  [EntityStatus.Sealed]: { title: 'Sealed' },
  [EntityStatus.Deleted]: { title: 'Deleted' },
}

export const entityViewMap: EntityViewStrategyMap = {
  [EntityView.Visible]: { title: 'Visible' },
  [EntityView.Encrypted]: { title: 'Encrypted' },
}

export const pageViewMap: PageViewStrategyMap = {
  [PageView.Public]: { title: 'Public' },
  [PageView.Private]: { title: 'Private' },
  [PageView.Secret]: { title: 'Secret' },
}

export const paymentTypeMap: PaymentTypeStrategyMap = {
  [PaymentType.FeeForService]: { title: 'Fee for Service' },
  [PaymentType.OracleFee]: { title: 'Oracle Fee' },
  [PaymentType.Subscription]: { title: 'Subscription' },
  [PaymentType.RentalFee]: { title: 'Rental Fee' },
  [PaymentType.OutcomePayment]: { title: 'Outcome Payment' },
  [PaymentType.InterestRepayment]: { title: 'Interest Repayment' },
  [PaymentType.LoanRepayment]: { title: 'Loan Repayment' },
  [PaymentType.IncomeDistribution]: { title: 'Income Distribution' },
  [PaymentType.DisputeSettlement]: { title: 'Dispute Settlement' },
}

export const paymentDenominationMap: PaymentDenominationStrategyMap = {
  [PaymentDenomination.IXO]: { title: 'IXO' },
  [PaymentDenomination.eEUR]: { title: 'eEUR' },
  [PaymentDenomination.eCHF]: { title: 'eCHF' },
  [PaymentDenomination.eUSD]: { title: 'eUSD' },
}

export const stakeTypeMap: StakeTypeStrategyMap = {
  [StakeType.SecurityGuarantee]: { title: 'Security Guarantee' },
  [StakeType.PerformanceGuarantee]: { title: 'Performance Guarantee' },
  [StakeType.LoanGuarantee]: { title: 'Loan Guarantee' },
  [StakeType.ClaimGuarantee]: { title: 'Claim Guarantee' },
  [StakeType.DisputeGuarantee]: { title: 'Dispute Guarantee' },
  [StakeType.VotingProposalDeposit]: { title: 'Voting Proposal Deposit' },
  [StakeType.MembershipDeposit]: { title: 'Membership Deposit' },
  [StakeType.ServicesDeposit]: { title: 'Services Deposit' },
  [StakeType.InsuranceGuarantee]: { title: 'Insurance Guarantee' },
}

export const slashingConditionMap: SlashingConditionStrategyMap = {
  [SlashingCondition.FailedService]: { title: 'Failed Service' },
  [SlashingCondition.FailedSecurity]: { title: 'Failed Security' },
  [SlashingCondition.LoanDefault]: { title: 'Loan Default' },
  [SlashingCondition.FailedProposal]: { title: 'Failed Proposal' },
  [SlashingCondition.FailedDispute]: { title: 'Failed Dispute' },
  [SlashingCondition.InsuredEvent]: { title: 'Insured Event' },
  [SlashingCondition.FailedMembership]: { title: 'Failed Membership' },
}

export const nodeTypeMap: NodeTypeStrategyMap = {
  [NodeType.RelayerNode]: { title: 'Relayer Node' },
  [NodeType.CellNode]: { title: 'Cell Node' },
  [NodeType.IBCNode]: { title: 'IBC Node' },
}

export const fundSourceMap: FundSourceStrategyMap = {
  [FundSource.Alphabond]: { title: 'Alphabond' },
  [FundSource.WalletAddress]: { title: 'Wallet Address' },
  [FundSource.BankAccount]: { title: 'Bank Account' },
  [FundSource.PaymentContract]: { title: 'Payment Contract' },
  [FundSource.NFTAsset]: { title: 'NFT Asset' },
}

export const keyTypeMap: KeyTypeStrategyMap = {
  [KeyType.Ed25519VerificationKey2018]: { title: 'Ed25519VerificationKey2018' },
  [KeyType.JwsVerificationKey2020]: { title: 'JwsVerificationKey2020' },
  [KeyType.Secp256k1VerificationKey2018]: {
    title: 'Secp256k1VerificationKey2018',
  },
}

export const keyPurposeMap: KeyPurposeStrategyMap = {
  [KeyPurpose.Authentication]: { title: 'Authentication' },
  [KeyPurpose.Encryption]: { title: 'Encryption' },
  [KeyPurpose.Verification]: { title: 'Verification' },
  [KeyPurpose.Identification]: { title: 'Identification' },
}

export const serviceTypeMap: ServiceTypeStrategyMap = {
  [ServiceType.DIDAgent]: { title: 'DID Agent' },
  [ServiceType.CosmosWeb3]: { title: 'Cosmos Web3' },
  [ServiceType.EthereumWeb3]: { title: 'Ethereum Web3' },
  [ServiceType.Web2]: { title: 'Web2' },
}

export const dataResourceTypeMap: DataResourceTypeStrategyMap = {
  [DataResourceType.SchemaOverlay]: { title: 'Schema Overlay' },
  [DataResourceType.MobileIdentityWallet]: { title: 'Mobile Identity Wallet' },
  [DataResourceType.PersonalDataPod]: { title: 'Personal DataPod' },
  [DataResourceType.CellNodeDB]: { title: 'Cell NodeDB' },
  [DataResourceType.EnterpriseDB]: { title: 'Enterprise DB' },
  [DataResourceType.InterplanetaryFileStore]: {
    title: 'Interplanetary File Store',
  },
}

export const termsOfUseTypeStrategyMap: TermsOfUseTypeStrategyMap = {
  [TermsOfUseType.PayPerUse]: { title: 'Pay Per Use', icon: PayPerUse },
  [TermsOfUseType.OnceOffFee]: { title: 'Once-off Fee', icon: OnceOffFee },
  [TermsOfUseType.FreeOpenSource]: {
    title: 'Free Open-source',
    icon: FreeOpenSource,
  },
  [TermsOfUseType.Proprietary]: { title: 'Proprietary', icon: Proprietary },
}
