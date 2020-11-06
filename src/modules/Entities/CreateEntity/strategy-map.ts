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
    stepCount: 4,
    steps: {
      1: {
        container: CreateEntityPageContentConnected,
        url: '/project/new/page',
        name: 'Page',
        previousStep: null,
        nextStep: 2,
      },
      2: {
        container: CreateEntityClaimsConnected,
        url: '/project/new/claims',
        name: 'Claims',
        previousStep: 1,
        nextStep: 3,
      },
      3: {
        container: CreateEntitySettingsConnected,
        url: '/project/new/settings',
        name: 'Settings',
        previousStep: 2,
        nextStep: 4,
      },
      4: {
        container: CreateEntityAdvancedConnected,
        url: '/project/new/advanced',
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
  [EntityType.Cell]: {
    stepCount: 4,
    steps: {
      1: {
        container: CreateEntityPageContentConnected,
        url: '/cell/new/page',
        name: 'Page',
        previousStep: null,
        nextStep: 2,
      },
      2: {
        container: CreateEntityClaimsConnected,
        url: '/cell/new/claims',
        name: 'Claims',
        previousStep: 1,
        nextStep: 3,
      },
      3: {
        container: CreateEntitySettingsConnected,
        url: '/cell/new/settings',
        name: 'Settings',
        previousStep: 2,
        nextStep: 4,
      },
      4: {
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
  [EntityType.Data]: {
    stepCount: 4,
    steps: {
      1: {
        container: CreateEntityPageContentConnected,
        url: '/data/new/page',
        name: 'Page',
        previousStep: null,
        nextStep: 2,
      },
      2: {
        container: CreateEntityClaimsConnected,
        url: '/data/new/claims',
        name: 'Claims',
        previousStep: 1,
        nextStep: 3,
      },
      3: {
        container: CreateEntitySettingsConnected,
        url: '/data/new/settings',
        name: 'Settings',
        previousStep: 2,
        nextStep: 4,
      },
      4: {
        container: CreateEntityAdvancedConnected,
        url: '/data/new/advanced',
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
    stepCount: 4,
    steps: {
      1: {
        container: CreateEntityPageContentConnected,
        url: '/investment/new/page',
        name: 'Page',
        previousStep: null,
        nextStep: 2,
      },
      2: {
        container: CreateEntityClaimsConnected,
        url: '/investment/new/claims',
        name: 'Claims',
        previousStep: 1,
        nextStep: 3,
      },
      3: {
        container: CreateEntitySettingsConnected,
        url: '/investment/new/settings',
        name: 'Settings',
        previousStep: 2,
        nextStep: 4,
      },
      4: {
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
    stepCount: 4,
    steps: {
      1: {
        container: CreateEntityPageContentConnected,
        url: '/oracle/new/page',
        name: 'Page',
        previousStep: null,
        nextStep: 2,
      },
      2: {
        container: CreateEntityClaimsConnected,
        url: '/oracle/new/claims',
        name: 'Claims',
        previousStep: 1,
        nextStep: 3,
      },
      3: {
        container: CreateEntitySettingsConnected,
        url: '/oracle/new/settings',
        name: 'Settings',
        previousStep: 2,
        nextStep: 4,
      },
      4: {
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
    stepCount: 3,
    steps: {
      1: {
        container: CreateEntityAttestationConnected,
        url: '/template/new/page',
        name: 'Page',
        previousStep: null,
        nextStep: 2,
      },
      2: {
        container: CreateEntitySettingsConnected,
        url: '/template/new/settings',
        name: 'Settings',
        previousStep: 1,
        nextStep: 3,
      },
      3: {
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
}
