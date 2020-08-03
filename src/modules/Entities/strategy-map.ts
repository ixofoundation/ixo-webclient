import {
  EntityType,
  EntityTypeStrategyMap,
  PaymentTypeStrategyMap,
  PaymentType,
  PaymentDenominationStrategyMap,
  PaymentDenomination,
  EntityStatus,
  EntityStatusStrategyMap,
  EntityStageStrategyMap,
  EntityStage,
  EntityViewStrategyMap,
  EntityView,
  PageViewStrategyMap,
  PageView,
  SlashingConditionStrategyMap,
  StakeTypeStrategyMap,
  StakeType,
  SlashingCondition,
} from './types'
import ProjectFilterSchema from './components/EntitiesFilter/schema/ProjectFilter.schema.json'
import CellFilterSchema from './components/EntitiesFilter/schema/CellFilter.schema.json'
import DataFilterSchema from './components/EntitiesFilter/schema/DataFilter.schema.json'
import InvestmentFilterSchema from './components/EntitiesFilter/schema/InvestmentFilter.schema.json'
import OracleFilterSchema from './components/EntitiesFilter/schema/OracleFilter.schema.json'
import TemplateFilterSchema from './components/EntitiesFilter/schema/TemplateFilter.schema.json'
import ProjectHeaderSchema from './components/EntitiesHero/schema/ProjectHeader.schema.json'
import CellHeaderSchema from './components/EntitiesHero/schema/CellHeader.schema.json'
import InvestmentHeaderSchema from './components/EntitiesHero/schema/InvestmentHeader.schema.json'
import OracleHeaderSchema from './components/EntitiesHero/schema/OracleHeader.schema.json'
import TemplateHeaderSchema from './components/EntitiesHero/schema/TemplateHeader.schema.json'
import DataHeaderSchema from './components/EntitiesHero/schema/DataHeader.schema.json'
import ProjectControlPanelSchema from '../../common/components/ControlPanel/schema/Project.schema.json'
import CellControlPanelSchema from '../../common/components/ControlPanel/schema/Cell.schema.json'
import InvestmentControlPanelSchema from '../../common/components/ControlPanel/schema/Investment.schema.json'
import OracleControlPanelSchema from '../../common/components/ControlPanel/schema/Oracle.schema.json'
import TemplateControlPanelSchema from '../../common/components/ControlPanel/schema/Template.schema.json'
import DataControlPanelSchema from '../../common/components/ControlPanel/schema/Data.schema.json'

export const entityTypeMap: EntityTypeStrategyMap = {
  [EntityType.Project]: {
    title: 'Project',
    plural: 'Projects',
    themeColor: '#2f80ed',
    headerSchema: ProjectHeaderSchema,
    filterSchema: ProjectFilterSchema,
    controlPanelSchema: ProjectControlPanelSchema,
  },
  [EntityType.Oracle]: {
    title: 'Oracle',
    plural: 'Oracles',
    themeColor: '#ad245c',
    headerSchema: OracleHeaderSchema,
    filterSchema: OracleFilterSchema,
    controlPanelSchema: OracleControlPanelSchema,
  },
  [EntityType.Investment]: {
    title: 'Investment',
    plural: 'Investments',
    themeColor: '#e4bc3d',
    headerSchema: InvestmentHeaderSchema,
    filterSchema: InvestmentFilterSchema,
    controlPanelSchema: InvestmentControlPanelSchema,
  },
  [EntityType.Cell]: {
    title: 'Cell',
    plural: 'Cells',
    themeColor: '#79af50',
    headerSchema: CellHeaderSchema,
    filterSchema: CellFilterSchema,
    controlPanelSchema: CellControlPanelSchema,
  },
  [EntityType.Template]: {
    title: 'Template',
    plural: 'Templates',
    themeColor: '#7c2740',
    headerSchema: TemplateHeaderSchema,
    filterSchema: TemplateFilterSchema,
    controlPanelSchema: TemplateControlPanelSchema,
  },
  [EntityType.Data]: {
    title: 'Data Asset',
    plural: 'Data Assets',
    themeColor: '#f89d28',
    headerSchema: DataHeaderSchema,
    filterSchema: DataFilterSchema,
    controlPanelSchema: DataControlPanelSchema,
  },
}

export const entityStatusMap: EntityStatusStrategyMap = {
  [EntityStatus.Pending]: { title: 'Pending' },
  [EntityStatus.Live]: { title: 'Live' },
  [EntityStatus.Stopped]: { title: 'Stopped' },
  [EntityStatus.Sealed]: { title: 'Sealed' },
  [EntityStatus.Deleted]: { title: 'Deleted' },
}

export const entityStageMap: EntityStageStrategyMap = {
  [EntityStage.Proposal]: { title: 'Proposal' },
  [EntityStage.Planning]: { title: 'Planning' },
  [EntityStage.Delivery]: { title: 'Delivery' },
  [EntityStage.Paused]: { title: 'Paused' },
  [EntityStage.Closing]: { title: 'Closing' },
  [EntityStage.Ended]: { title: 'Ended' },
  [EntityStage.Archived]: { title: 'Archived' },
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
  [PaymentType.FeeforService]: { title: 'Fee for Service' },
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
  [StakeType.PerformanceGuarantee]: { title: 'Performanc eGuarantee' },
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
