import { CreateTemplateConnected } from './CreateTemplate/CreateTemplate.container'
import { CreateEntityPageContentConnected } from './CreateEntityPageContent/CreateEntityPageContent.container'
import { CreateEntityAttestationConnected } from './CreateEntityAttestation/CreateEntityAttestation.container'
import { CreateEntityClaimsConnected } from './CreateEntityClaims/CreateEntityClaims.container'
import { CreateEntitySettingsConnected } from './CreateEntitySettings/CreateEntitySettings.container'
import { CreateEntityAdvancedConnected } from './CreateEntityAdvanced/CreateEntityAdvanced.container'
import { EntityStepStrategyMap } from './types'
import { EntityType } from '../types'
import {
  selectAttestationHeaderForEntityApiPayload,
  selectPageContentHeaderForEntityApiPayload,
  selectPageContentApiPayload,
  selectAttestationApiPayload,
  selectClaimsForEntityApiPayload,
} from './CreateEntity.selectors'
import { RootState } from 'common/redux/types'

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
    },
    selectHeaderInfoApiPayload: (state: RootState): any =>
      selectPageContentHeaderForEntityApiPayload(state),
    selectPageContentApiPayload: (state: RootState): any =>
      selectPageContentApiPayload(state),
    selectClaimsApiPayload: (state: RootState): any =>
      selectClaimsForEntityApiPayload(state),
  },
  [EntityType.Cell]: {
    stepCount: 5,
    steps: {
      '1': {
        container: CreateTemplateConnected,
        url: '/cell/new/template',
        name: 'Template',
        previousStep: null,
        nextStep: 2,
      },
      '2': {
        container: CreateEntityPageContentConnected,
        url: '/cell/new/page',
        name: 'Page',
        previousStep: null,
        nextStep: 3,
      },
      '3': {
        container: CreateEntityClaimsConnected,
        url: '/cell/new/claims',
        name: 'Claims',
        previousStep: 1,
        nextStep: 4,
      },
      '4': {
        container: CreateEntitySettingsConnected,
        url: '/cell/new/settings',
        name: 'Settings',
        previousStep: 2,
        nextStep: 5,
      },
      '5': {
        container: CreateEntityAdvancedConnected,
        url: '/cell/new/advanced',
        name: 'Advanced',
        previousStep: 3,
        nextStep: null,
      },
    },
    selectHeaderInfoApiPayload: (state: RootState): any =>
      selectPageContentHeaderForEntityApiPayload(state),
    selectPageContentApiPayload: (state: RootState): any =>
      selectPageContentApiPayload(state),
    selectClaimsApiPayload: (state: RootState): any =>
      selectClaimsForEntityApiPayload(state),
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
        previousStep: null,
        nextStep: 3,
      },
      '3': {
        container: CreateEntityClaimsConnected,
        url: '/asset/new/claims',
        name: 'Claims',
        previousStep: 1,
        nextStep: 4,
      },
      '4': {
        container: CreateEntitySettingsConnected,
        url: '/asset/new/settings',
        name: 'Settings',
        previousStep: 2,
        nextStep: 5,
      },
      '5': {
        container: CreateEntityAdvancedConnected,
        url: '/asset/new/advanced',
        name: 'Advanced',
        previousStep: 3,
        nextStep: null,
      },
    },
    selectHeaderInfoApiPayload: (state: RootState): any =>
      selectPageContentHeaderForEntityApiPayload(state),
    selectPageContentApiPayload: (state: RootState): any =>
      selectPageContentApiPayload(state),
    selectClaimsApiPayload: (state: RootState): any =>
      selectClaimsForEntityApiPayload(state),
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
        previousStep: null,
        nextStep: 3,
      },
      '3': {
        container: CreateEntityClaimsConnected,
        url: '/investment/new/claims',
        name: 'Claims',
        previousStep: 1,
        nextStep: 4,
      },
      '4': {
        container: CreateEntitySettingsConnected,
        url: '/investment/new/settings',
        name: 'Settings',
        previousStep: 2,
        nextStep: 5,
      },
      '5': {
        container: CreateEntityAdvancedConnected,
        url: '/investment/new/advanced',
        name: 'Advanced',
        previousStep: 3,
        nextStep: null,
      },
    },
    selectHeaderInfoApiPayload: (state: RootState): any =>
      selectPageContentHeaderForEntityApiPayload(state),
    selectPageContentApiPayload: (state: RootState): any =>
      selectPageContentApiPayload(state),
    selectClaimsApiPayload: (state: RootState): any =>
      selectClaimsForEntityApiPayload(state),
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
        previousStep: null,
        nextStep: 3,
      },
      '3': {
        container: CreateEntityClaimsConnected,
        url: '/oracle/new/claims',
        name: 'Claims',
        previousStep: 1,
        nextStep: 4,
      },
      '4': {
        container: CreateEntitySettingsConnected,
        url: '/oracle/new/settings',
        name: 'Settings',
        previousStep: 2,
        nextStep: 5,
      },
      '5': {
        container: CreateEntityAdvancedConnected,
        url: '/oracle/new/advanced',
        name: 'Advanced',
        previousStep: 3,
        nextStep: null,
      },
    },
    selectHeaderInfoApiPayload: (state: RootState): any =>
      selectPageContentHeaderForEntityApiPayload(state),
    selectPageContentApiPayload: (state: RootState): any =>
      selectPageContentApiPayload(state),
    selectClaimsApiPayload: (state: RootState): any =>
      selectClaimsForEntityApiPayload(state),
  },
  [EntityType.Template]: {
    stepCount: 4,
    steps: {
      '1': {
        container: CreateTemplateConnected,
        url: '/template/new/template',
        name: 'Template',
        previousStep: null,
        nextStep: 2,
      },
      '2': {
        container: CreateEntityAttestationConnected,
        url: '/template/new/page',
        name: 'Page',
        previousStep: null,
        nextStep: 3,
      },
      '3': {
        container: CreateEntitySettingsConnected,
        url: '/template/new/settings',
        name: 'Settings',
        previousStep: 1,
        nextStep: 4,
      },
      '4': {
        container: CreateEntityAdvancedConnected,
        url: '/template/new/advanced',
        name: 'Advanced',
        previousStep: 2,
        nextStep: null,
      },
    },
    selectHeaderInfoApiPayload: (state: RootState): any =>
      selectAttestationHeaderForEntityApiPayload(state),
    selectPageContentApiPayload: (state: RootState): any =>
      selectAttestationApiPayload(state),
    selectClaimsApiPayload: (): any => undefined,
  },
  [EntityType.Bond]: {
    stepCount: 5,
    steps: {
      '1': {
        container: CreateTemplateConnected,
        url: '/Bond/new/template',
        name: 'Template',
        previousStep: null,
        nextStep: 2,
      },
      '2': {
        container: CreateEntityPageContentConnected,
        url: '/Bond/new/page',
        name: 'Page',
        previousStep: 1,
        nextStep: 3,
      },
      '3': {
        container: CreateEntityClaimsConnected,
        url: '/Bond/new/claims',
        name: 'Claims',
        previousStep: 2,
        nextStep: 4,
      },
      '4': {
        container: CreateEntitySettingsConnected,
        url: '/Bond/new/settings',
        name: 'Settings',
        previousStep: 3,
        nextStep: 5,
      },
      '5': {
        container: CreateEntityAdvancedConnected,
        url: '/Bond/new/advanced',
        name: 'Advanced',
        previousStep: 4,
        nextStep: null,
      },
    },
    selectHeaderInfoApiPayload: (state: RootState): any =>
      selectPageContentHeaderForEntityApiPayload(state),
    selectPageContentApiPayload: (state: RootState): any =>
      selectPageContentApiPayload(state),
    selectClaimsApiPayload: (state: RootState): any =>
      selectClaimsForEntityApiPayload(state),
  },
  [EntityType.Account]: {
    stepCount: 5,
    steps: {
      '1': {
        container: CreateTemplateConnected,
        url: '/Account/new/template',
        name: 'Template',
        previousStep: null,
        nextStep: 2,
      },
      '2': {
        container: CreateEntityPageContentConnected,
        url: '/Account/new/page',
        name: 'Page',
        previousStep: 1,
        nextStep: 3,
      },
      '3': {
        container: CreateEntityClaimsConnected,
        url: '/Account/new/claims',
        name: 'Claims',
        previousStep: 2,
        nextStep: 4,
      },
      '4': {
        container: CreateEntitySettingsConnected,
        url: '/Account/new/settings',
        name: 'Settings',
        previousStep: 3,
        nextStep: 5,
      },
      '5': {
        container: CreateEntityAdvancedConnected,
        url: '/Account/new/advanced',
        name: 'Advanced',
        previousStep: 4,
        nextStep: null,
      },
    },
    selectHeaderInfoApiPayload: (state: RootState): any =>
      selectPageContentHeaderForEntityApiPayload(state),
    selectPageContentApiPayload: (state: RootState): any =>
      selectPageContentApiPayload(state),
    selectClaimsApiPayload: (state: RootState): any =>
      selectClaimsForEntityApiPayload(state),
  },
  [EntityType.Group]: {
    stepCount: 5,
    steps: {
      '1': {
        container: CreateTemplateConnected,
        url: '/Group/new/template',
        name: 'Template',
        previousStep: null,
        nextStep: 2,
      },
      '2': {
        container: CreateEntityPageContentConnected,
        url: '/Group/new/page',
        name: 'Page',
        previousStep: 1,
        nextStep: 3,
      },
      '3': {
        container: CreateEntityClaimsConnected,
        url: '/Group/new/claims',
        name: 'Claims',
        previousStep: 2,
        nextStep: 4,
      },
      '4': {
        container: CreateEntitySettingsConnected,
        url: '/Group/new/settings',
        name: 'Settings',
        previousStep: 3,
        nextStep: 5,
      },
      '5': {
        container: CreateEntityAdvancedConnected,
        url: '/Group/new/advanced',
        name: 'Advanced',
        previousStep: 4,
        nextStep: null,
      },
    },
    selectHeaderInfoApiPayload: (state: RootState): any =>
      selectPageContentHeaderForEntityApiPayload(state),
    selectPageContentApiPayload: (state: RootState): any =>
      selectPageContentApiPayload(state),
    selectClaimsApiPayload: (state: RootState): any =>
      selectClaimsForEntityApiPayload(state),
  },
  [EntityType.Agent]: {
    stepCount: 5,
    steps: {
      '1': {
        container: CreateTemplateConnected,
        url: '/Agent/new/template',
        name: 'Template',
        previousStep: null,
        nextStep: 2,
      },
      '2': {
        container: CreateEntityPageContentConnected,
        url: '/Agent/new/page',
        name: 'Page',
        previousStep: 1,
        nextStep: 3,
      },
      '3': {
        container: CreateEntityClaimsConnected,
        url: '/Agent/new/claims',
        name: 'Claims',
        previousStep: 2,
        nextStep: 4,
      },
      '4': {
        container: CreateEntitySettingsConnected,
        url: '/Agent/new/settings',
        name: 'Settings',
        previousStep: 3,
        nextStep: 5,
      },
      '5': {
        container: CreateEntityAdvancedConnected,
        url: '/Agent/new/advanced',
        name: 'Advanced',
        previousStep: 4,
        nextStep: null,
      },
    },
    selectHeaderInfoApiPayload: (state: RootState): any =>
      selectPageContentHeaderForEntityApiPayload(state),
    selectPageContentApiPayload: (state: RootState): any =>
      selectPageContentApiPayload(state),
    selectClaimsApiPayload: (state: RootState): any =>
      selectClaimsForEntityApiPayload(state),
  },
  [EntityType.Relayer]: {
    stepCount: 5,
    steps: {
      '1': {
        container: CreateTemplateConnected,
        url: '/Relayer/new/template',
        name: 'Template',
        previousStep: null,
        nextStep: 2,
      },
      '2': {
        container: CreateEntityPageContentConnected,
        url: '/Relayer/new/page',
        name: 'Page',
        previousStep: 1,
        nextStep: 3,
      },
      '3': {
        container: CreateEntityClaimsConnected,
        url: '/Relayer/new/claims',
        name: 'Claims',
        previousStep: 2,
        nextStep: 4,
      },
      '4': {
        container: CreateEntitySettingsConnected,
        url: '/Relayer/new/settings',
        name: 'Settings',
        previousStep: 3,
        nextStep: 5,
      },
      '5': {
        container: CreateEntityAdvancedConnected,
        url: '/Relayer/new/advanced',
        name: 'Advanced',
        previousStep: 4,
        nextStep: null,
      },
    },
    selectHeaderInfoApiPayload: (state: RootState): any =>
      selectPageContentHeaderForEntityApiPayload(state),
    selectPageContentApiPayload: (state: RootState): any =>
      selectPageContentApiPayload(state),
    selectClaimsApiPayload: (state: RootState): any =>
      selectClaimsForEntityApiPayload(state),
  },
}
