import {
  SelectCreationProcess,
  SetupMetadata,
  SetupProperties,
} from 'pages/CreateEntity/CreateAsset/pages'

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
        component: SelectCreationProcess,
        url: '/create/entity/asset/select-process',
        prevStep: undefined,
        nextStep: 2,
      },
      [`2`]: {
        id: 2,
        name: 'Token Metadata',
        component: SetupMetadata,
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
        nextStep: undefined,
      },
    },
  },
}
