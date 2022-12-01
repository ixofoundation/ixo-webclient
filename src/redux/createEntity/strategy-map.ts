import {
  CreateToken,
  PreviewClass,
  SelectCreationProcess,
  SetupMetadata,
  SetupProperties,
} from 'components/pages/CreateEntity/CreateAsset/Pages'

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
        nextStep: 4,
      },
      [`4`]: {
        id: 4,
        name: 'Assect Collection',
        component: PreviewClass,
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
}
