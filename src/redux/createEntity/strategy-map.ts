import {
  CreateToken,
  PreviewClass as AssetPreviewClass,
  SelectCreationProcess as SelectAssetCreationProcess,
  SetupMetadata as SetupAssetMetadata,
  SetupProperties,
} from 'pages/CreateEntity/CreateAsset/Pages'
import {
  SelectCreationProcess as SelectInvestmentCreationProcess,
  SetupMetadata as SetupInvestmentMetadata,
  SetupInstrument as SetupInvestmentInstrument,
} from 'pages/CreateEntity/CreateInvestment/Pages'
import {
  SelectCreationProcess as SelectClaimCreationProcess,
  SetupMetadata as SetupClaimMetadata,
  SetupDataCollection as SetupClaimDataCollection,
} from 'pages/CreateEntity/CreateClaim/Pages'

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
  Asset: {
    entityType: 'Asset',
    title: 'Create an Asset Class',
    steps: {
      [`1`]: {
        id: 1,
        name: 'Template',
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
        name: 'Assect Collection',
        component: AssetPreviewClass,
        url: '/create/entity/asset/preview-class',
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
  Investment: {
    entityType: 'Investment',
    title: 'Create an Investment',
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
      // [`4`]: {
      //   id: 4,
      //   name: 'Assect Collection',
      //   component: PreviewClass,
      //   url: '/create/entity/asset/preview-class',
      //   prevStep: 3,
      //   nextStep: 5,
      // },
      // [`5`]: {
      //   id: 5,
      //   name: 'Create an Asset',
      //   component: CreateToken,
      //   url: '/create/entity/asset/create-token',
      //   prevStep: 4,
      //   nextStep: undefined,
      // },
    },
  },
  Claim: {
    entityType: 'Claim',
    title: 'Create a Verifiable Claim',
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
        id: 2,
        name: 'Data Collection Form',
        component: SetupClaimDataCollection,
        url: '/create/entity/claim/setup-data-collection',
        prevStep: 2,
        nextStep: 4,
      },
    },
  },
}
