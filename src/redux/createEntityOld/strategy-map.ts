import { RootState } from 'redux/types'
import { EntityType } from '../../types/entities'
import {
  selectAttestationApiPayload,
  selectAttestationHeaderForEntityApiPayload,
  selectClaimsForEntityApiPayload,
  selectPageContentApiPayload,
  selectPageContentHeaderForEntityApiPayload,
} from './createEntity.selectors'
import { CreateEntityAdvancedConnected } from '../../components/Entities/CreateEntity/CreateEntityAdvanced/CreateEntityAdvanced'
import { CreateEntityAttestationConnected } from '../../components/Entities/CreateEntity/CreateEntityAttestation/CreateEntityAttestation'
import { CreateEntityClaimsConnected } from '../../components/Entities/CreateEntity/CreateEntityClaims/CreateEntityClaims'
import { CreateEntityPageContentConnected } from '../../components/Entities/CreateEntity/CreateEntityPageContent/CreateEntityPageContent'
import { CreateEntitySettingsConnected } from '../../components/Entities/CreateEntity/CreateEntitySettings/CreateEntitySettings'
import CreateSelectTemplate from '../../components/Entities/CreateEntity/CreateSelectTemplate/CreateSelectTemplate'
import { CreateTemplateConnected } from '../../components/Entities/CreateEntity/CreateTemplate/CreateTemplate'
import { EntityStepStrategyMap } from './createEntity.types'

export const createEntityMap: EntityStepStrategyMap = {
  [EntityType.Project]: {
    stepCount: 5,
    steps: {
      '1': {
        container: CreateTemplateConnected,
        url: '/project/new/template',
        name: 'Template',
        previousStep: null,
        nextStep: 2,
      },
      '2': {
        container: CreateEntityPageContentConnected,
        url: '/project/new/page',
        name: 'Page',
        previousStep: 1,
        nextStep: 3,
      },
      '3': {
        container: CreateEntityClaimsConnected,
        url: '/project/new/claims',
        name: 'Claims',
        previousStep: 2,
        nextStep: 4,
      },
      '4': {
        container: CreateEntitySettingsConnected,
        url: '/project/new/settings',
        name: 'Settings',
        previousStep: 3,
        nextStep: 5,
      },
      '5': {
        container: CreateEntityAdvancedConnected,
        url: '/project/new/advanced',
        name: 'Advanced',
        previousStep: 4,
        nextStep: null,
      },
    } as any,
    selectHeaderInfoApiPayload: (state: RootState): any => selectPageContentHeaderForEntityApiPayload(state),
    selectPageContentApiPayload: (state: RootState): any => selectPageContentApiPayload(state),
    selectClaimsApiPayload: (state: RootState): any => selectClaimsForEntityApiPayload(state),
  },
  [EntityType.Dao]: {
    stepCount: 5,
    steps: {
      '1': {
        container: CreateTemplateConnected,
        url: '/dao/new/template',
        name: 'Template',
        previousStep: null,
        nextStep: 2,
      },
      '2': {
        container: CreateEntityPageContentConnected,
        url: '/dao/new/page',
        name: 'Page',
        previousStep: 1,
        nextStep: 3,
      },
      '3': {
        container: CreateEntityClaimsConnected,
        url: '/dao/new/claims',
        name: 'Claims',
        previousStep: 2,
        nextStep: 4,
      },
      '4': {
        container: CreateEntitySettingsConnected,
        url: '/dao/new/settings',
        name: 'Settings',
        previousStep: 3,
        nextStep: 5,
      },
      '5': {
        container: CreateEntityAdvancedConnected,
        url: '/dao/new/advanced',
        name: 'Advanced',
        previousStep: 4,
        nextStep: null,
      },
    } as any,
    selectHeaderInfoApiPayload: (state: RootState): any => selectPageContentHeaderForEntityApiPayload(state),
    selectPageContentApiPayload: (state: RootState): any => selectPageContentApiPayload(state),
    selectClaimsApiPayload: (state: RootState): any => selectClaimsForEntityApiPayload(state),
  },
  [EntityType.Asset]: {
    stepCount: 5,
    steps: {
      '1': {
        container: CreateTemplateConnected,
        url: '/asset/new/template',
        name: 'Template',
        previousStep: null,
        nextStep: 2,
      },
      '2': {
        container: CreateEntityPageContentConnected,
        url: '/asset/new/page',
        name: 'Page',
        previousStep: 1,
        nextStep: 3,
      },
      '3': {
        container: CreateEntityClaimsConnected,
        url: '/asset/new/claims',
        name: 'Claims',
        previousStep: 2,
        nextStep: 4,
      },
      '4': {
        container: CreateEntitySettingsConnected,
        url: '/asset/new/settings',
        name: 'Settings',
        previousStep: 3,
        nextStep: 5,
      },
      '5': {
        container: CreateEntityAdvancedConnected,
        url: '/asset/new/advanced',
        name: 'Advanced',
        previousStep: 4,
        nextStep: null,
      },
    } as any,
    selectHeaderInfoApiPayload: (state: RootState): any => selectPageContentHeaderForEntityApiPayload(state),
    selectPageContentApiPayload: (state: RootState): any => selectPageContentApiPayload(state),
    selectClaimsApiPayload: (state: RootState): any => selectClaimsForEntityApiPayload(state),
  },
  [EntityType.Investment]: {
    stepCount: 5,
    steps: {
      '1': {
        container: CreateTemplateConnected,
        url: '/investment/new/template',
        name: 'Template',
        previousStep: null,
        nextStep: 2,
      },
      '2': {
        container: CreateEntityPageContentConnected,
        url: '/investment/new/page',
        name: 'Page',
        previousStep: 1,
        nextStep: 3,
      },
      '3': {
        container: CreateEntityClaimsConnected,
        url: '/investment/new/claims',
        name: 'Claims',
        previousStep: 2,
        nextStep: 4,
      },
      '4': {
        container: CreateEntitySettingsConnected,
        url: '/investment/new/settings',
        name: 'Settings',
        previousStep: 3,
        nextStep: 5,
      },
      '5': {
        container: CreateEntityAdvancedConnected,
        url: '/investment/new/advanced',
        name: 'Advanced',
        previousStep: 4,
        nextStep: null,
      },
    } as any,
    selectHeaderInfoApiPayload: (state: RootState): any => selectPageContentHeaderForEntityApiPayload(state),
    selectPageContentApiPayload: (state: RootState): any => selectPageContentApiPayload(state),
    selectClaimsApiPayload: (state: RootState): any => selectClaimsForEntityApiPayload(state),
  },
  [EntityType.Oracle]: {
    stepCount: 5,
    steps: {
      '1': {
        container: CreateTemplateConnected,
        url: '/oracle/new/template',
        name: 'Template',
        previousStep: null,
        nextStep: 2,
      },
      '2': {
        container: CreateEntityPageContentConnected,
        url: '/oracle/new/page',
        name: 'Page',
        previousStep: 1,
        nextStep: 3,
      },
      '3': {
        container: CreateEntityClaimsConnected,
        url: '/oracle/new/claims',
        name: 'Claims',
        previousStep: 2,
        nextStep: 4,
      },
      '4': {
        container: CreateEntitySettingsConnected,
        url: '/oracle/new/settings',
        name: 'Settings',
        previousStep: 3,
        nextStep: 5,
      },
      '5': {
        container: CreateEntityAdvancedConnected,
        url: '/oracle/new/advanced',
        name: 'Advanced',
        previousStep: 4,
        nextStep: null,
      },
    } as any,
    selectHeaderInfoApiPayload: (state: RootState): any => selectPageContentHeaderForEntityApiPayload(state),
    selectPageContentApiPayload: (state: RootState): any => selectPageContentApiPayload(state),
    selectClaimsApiPayload: (state: RootState): any => selectClaimsForEntityApiPayload(state),
  },
  [EntityType.Template]: {
    stepCount: 5,
    steps: {
      '1': {
        container: CreateSelectTemplate,
        url: '/template/new/select/template',
        name: 'Template',
        previousStep: null,
        nextStep: 2,
      },
      '2': {
        container: CreateTemplateConnected,
        url: '/template/new/template',
        name: 'Method',
        previousStep: 1,
        nextStep: 3,
      },
      '3': {
        container: CreateEntityAttestationConnected,
        url: '/template/new/page',
        name: 'Page',
        previousStep: 2,
        nextStep: 4,
      },
      '4': {
        container: CreateEntitySettingsConnected,
        url: '/template/new/settings',
        name: 'Settings',
        previousStep: 3,
        nextStep: 5,
      },
      '5': {
        container: CreateEntityAdvancedConnected,
        url: '/template/new/advanced',
        name: 'Advanced',
        previousStep: 4,
        nextStep: null,
      },
    } as any,
    selectHeaderInfoApiPayload: (state: RootState): any => selectAttestationHeaderForEntityApiPayload(state),
    selectPageContentApiPayload: (state: RootState): any => selectAttestationApiPayload(state),
    selectClaimsApiPayload: (): any => undefined,
  },
}
