import {
  CreateToken,
  ReviewAssetClass,
  SelectCreationProcess as SelectAssetCreationProcess,
  SetupMetadata as SetupAssetMetadata,
  SetupProperties,
} from 'pages/CreateEntity/CreateAsset/Pages'
import {
  SelectCreationProcess as SelectInvestmentCreationProcess,
  SetupMetadata as SetupInvestmentMetadata,
  SetupInstrument as SetupInvestmentInstrument,
  ReviewInvestment,
} from 'pages/CreateEntity/CreateInvestment/Pages'
import {
  SelectCreationProcess as SelectClaimCreationProcess,
  SetupMetadata as SetupClaimMetadata,
  SetupDataCollection as SetupClaimDataCollection,
  SetupProperties as SetupClaimProperties,
  ReviewClaim,
} from 'pages/CreateEntity/CreateClaim/Pages'
import {
  SelectCreationProcess as SelectDAOCreationProcess,
  SetupMetadata as SetupDAOMetadata,
  SetupDAOGroups,
  SetupProperties as SetupDAOProperties,
  ReviewDAO,
} from 'pages/CreateEntity/CreateDAO/Pages'
import {
  SelectCreationProcess as SelectProjectCreationProcess,
  SetupMetadata as SetupProjectMetadata,
  ReviewProject,
} from 'pages/CreateEntity/CreateProject/Pages'
import {
  SelectCreationProcess as SelectOracleCreationProcess,
  SetupMetadata as SetupOracleMetadata,
  SetupProperties as SetupOracleProperties,
  ReviewOracle,
} from 'pages/CreateEntity/CreateOracle/Pages'
import {
  SetupInfo as SetupProposalInfo,
  SetupPageContent,
  SetupActions,
  SetupProperties as SetupProposalProperties,
  ReviewProposal,
} from 'pages/CreateEntity/CreateProposal/Pages'

export interface TCreateEntityStepType {
  id: number
  name: string
  component: React.FC<any>
  url: string
  prevStep: number | undefined
  nextStep: number | undefined
}

export interface TCreateEntityStrategyType {
  entityType: string
  title: string
  steps: { [stepNo: string]: TCreateEntityStepType }
}

export interface TCreateEntityStrategyMap {
  [entityType: string]: TCreateEntityStrategyType
}

export const CreateEntityStrategyMap: TCreateEntityStrategyMap = {
  asset: {
    entityType: 'asset',
    title: 'Create Asset Class',
    steps: {
      [`1`]: {
        id: 1,
        name: 'New or Clone',
        component: SelectAssetCreationProcess,
        url: '/create/entity/asset/select-process',
        prevStep: undefined,
        nextStep: 2,
      },
      [`2`]: {
        id: 2,
        name: 'Token Metadata',
        component: SetupAssetMetadata,
        url: '/create/entity/asset/setup-metadata',
        prevStep: 1,
        nextStep: 3,
      },
      [`3`]: {
        id: 3,
        name: 'Asset Class Properties',
        component: SetupProperties,
        url: '/create/entity/asset/setup-properties',
        prevStep: 2,
        nextStep: 4,
      },
      [`4`]: {
        id: 4,
        name: 'Asset Collection',
        component: ReviewAssetClass,
        url: '/create/entity/asset/review',
        prevStep: 3,
        nextStep: 5,
      },
      [`5`]: {
        id: 5,
        name: 'Create an Asset',
        component: CreateToken,
        url: '/create/entity/asset/create-token',
        prevStep: 4,
        nextStep: undefined,
      },
    },
  },
  investment: {
    entityType: 'investment',
    title: 'Create Investment',
    steps: {
      [`1`]: {
        id: 1,
        name: 'New or Clone',
        component: SelectInvestmentCreationProcess,
        url: '/create/entity/investment/select-process',
        prevStep: undefined,
        nextStep: 2,
      },
      [`2`]: {
        id: 2,
        name: 'Create Investment Metadata',
        component: SetupInvestmentMetadata,
        url: '/create/entity/investment/setup-metadata',
        prevStep: 1,
        nextStep: 3,
      },
      [`3`]: {
        id: 3,
        name: 'Create Investment Instrument/s',
        component: SetupInvestmentInstrument,
        url: '/create/entity/investment/setup-instrument',
        prevStep: 2,
        nextStep: 4,
      },
      [`4`]: {
        id: 4,
        name: 'Configure the Investment Settings',
        component: SetupProperties,
        url: '/create/entity/investment/setup-properties',
        prevStep: 3,
        nextStep: 5,
      },
      [`5`]: {
        id: 5,
        name: 'Review and Sign to Commit',
        component: ReviewInvestment,
        url: '/create/entity/investment/review',
        prevStep: 4,
        nextStep: undefined,
      },
    },
  },
  protocol: {
    entityType: 'protocol',
    title: 'Create Verifiable Claim',
    steps: {
      [`1`]: {
        id: 1,
        name: 'New or Clone',
        component: SelectClaimCreationProcess,
        url: '/create/entity/claim/select-process',
        prevStep: undefined,
        nextStep: 2,
      },
      [`2`]: {
        id: 2,
        name: 'Create Claim Metadata',
        component: SetupClaimMetadata,
        url: '/create/entity/claim/setup-metadata',
        prevStep: 1,
        nextStep: 3,
      },
      [`3`]: {
        id: 3,
        name: 'Data Collection Form',
        component: SetupClaimDataCollection,
        url: '/create/entity/claim/setup-data-collection',
        prevStep: 2,
        nextStep: 4,
      },
      [`4`]: {
        id: 4,
        name: 'Configuration',
        component: SetupClaimProperties,
        url: '/create/entity/claim/setup-properties',
        prevStep: 3,
        nextStep: 5,
      },
      [`5`]: {
        id: 5,
        name: 'Review and Sign to Commit',
        component: ReviewClaim,
        url: '/create/entity/claim/review',
        prevStep: 4,
        nextStep: undefined,
      },
    },
  },
  dao: {
    entityType: 'dao',
    title: 'Create DAO',
    steps: {
      [`1`]: {
        id: 1,
        name: 'New or Clone',
        component: SelectDAOCreationProcess,
        url: '/create/entity/dao/select-process',
        prevStep: undefined,
        nextStep: 2,
      },
      [`2`]: {
        id: 2,
        name: 'Metadata',
        component: SetupDAOMetadata,
        url: '/create/entity/dao/setup-metadata',
        prevStep: 1,
        nextStep: 3,
      },
      [`3`]: {
        id: 3,
        name: 'Add Groups',
        component: SetupDAOGroups,
        url: '/create/entity/dao/setup-groups',
        prevStep: 2,
        nextStep: 4,
      },
      [`4`]: {
        id: 4,
        name: 'Configure the DAO Settings',
        component: SetupDAOProperties,
        url: '/create/entity/dao/setup-properties',
        prevStep: 3,
        nextStep: 5,
      },
      [`5`]: {
        id: 5,
        name: 'Review and Sign to Commit',
        component: ReviewDAO,
        url: '/create/entity/dao/review',
        prevStep: 4,
        nextStep: undefined,
      },
    },
  },
  project: {
    entityType: 'project',
    title: 'Create Project Template',
    steps: {
      [`1`]: {
        id: 1,
        name: 'New or Clone',
        component: SelectProjectCreationProcess,
        url: '/create/entity/project/select-process',
        prevStep: undefined,
        nextStep: 2,
      },
      [`2`]: {
        id: 2,
        name: 'Template Metadata',
        component: SetupProjectMetadata,
        url: '/create/entity/project/setup-metadata',
        prevStep: 1,
        nextStep: 3,
      },
      [`3`]: {
        id: 3,
        name: 'Setup an additional information',
        component: SetupProperties,
        url: '/create/entity/project/setup-properties',
        prevStep: 2,
        nextStep: 4,
      },
      [`4`]: {
        id: 4,
        name: 'Review and Sign to Commit',
        component: ReviewProject,
        url: '/create/entity/project/review',
        prevStep: 3,
        nextStep: undefined,
      },
    },
  },
  oracle: {
    entityType: 'oracle',
    title: 'Create Oracle Method',
    steps: {
      [`1`]: {
        id: 1,
        name: 'New or Clone',
        component: SelectOracleCreationProcess,
        url: '/create/entity/oracle/select-process',
        prevStep: undefined,
        nextStep: 2,
      },
      [`2`]: {
        id: 2,
        name: 'Method Metadata',
        component: SetupOracleMetadata,
        url: '/create/entity/oracle/setup-metadata',
        prevStep: 1,
        nextStep: 3,
      },
      [`3`]: {
        id: 3,
        name: 'Setup an additional information',
        component: SetupOracleProperties,
        url: '/create/entity/oracle/setup-properties',
        prevStep: 2,
        nextStep: 4,
      },
      [`4`]: {
        id: 4,
        name: 'Review and Sign to Commit',
        component: ReviewOracle,
        url: '/create/entity/oracle/review',
        prevStep: 3,
        nextStep: undefined,
      },
    },
  },
  deed: {
    entityType: 'deed',
    title: 'Create governance proposal',
    steps: {
      [`1`]: {
        id: 1,
        name: 'Proposal Info',
        component: SetupProposalInfo,
        url: '/create/entity/deed/:entityId/:coreAddress/info',
        prevStep: undefined,
        nextStep: 2,
      },
      [`2`]: {
        id: 2,
        name: 'Configure the proposal page',
        component: SetupPageContent,
        url: '/create/entity/deed/:entityId/:coreAddress/setup-page',
        prevStep: 1,
        nextStep: 3,
      },
      [`3`]: {
        id: 3,
        name: 'Configure the proposal settings',
        component: SetupProposalProperties,
        url: '/create/entity/deed/:entityId/:coreAddress/setup-properties',
        prevStep: 2,
        nextStep: 4,
      },
      [`4`]: {
        id: 4,
        name: 'Add actions',
        component: SetupActions,
        url: '/create/entity/deed/:entityId/:coreAddress/setup-actions',
        prevStep: 3,
        nextStep: 5,
      },
      [`5`]: {
        id: 5,
        name: 'Review and Submit',
        component: ReviewProposal,
        url: '/create/entity/deed/:entityId/:coreAddress/review',
        prevStep: 4,
        nextStep: undefined,
      },
    },
  },
}
