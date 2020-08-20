import { CreateEntityPageContentConnected } from '../CreateEntityPageContent/CreateEntityPageContent.container'
import { CreateEntityAttestationConnected } from '../CreateEntityAttestation/CreateEntityAttestation.container'
import { CreateEntityClaimsConnected } from '../CreateEntityClaims/CreateEntityClaims.container'
import { CreateEntitySettingsConnected } from '../CreateEntitySettings/CreateEntitySettings.container'
import { CreateEntityAdvancedConnected } from '../CreateEntityAdvanced/CreateEntityAdvanced.container'
import { EntityStepStrategyMap } from './types'
import { EntityType } from '../Entities/types'

export const entityStepMap: EntityStepStrategyMap = {
  [EntityType.Project]: {
    stepCount: 4,
    steps: {
      [1]: {
        container: CreateEntityPageContentConnected,
        urls: ['/project/new/page', '/project/new'],
        name: 'Page',
        previousStep: null,
        nextStep: 2,
      },
      [2]: {
        container: CreateEntityClaimsConnected,
        urls: ['/project/new/claims'],
        name: 'Claims',
        previousStep: 1,
        nextStep: 3,
      },
      [3]: {
        container: CreateEntitySettingsConnected,
        urls: ['/project/new/settings'],
        name: 'Settings',
        previousStep: 2,
        nextStep: 4,
      },
      [4]: {
        container: CreateEntityAdvancedConnected,
        urls: ['/project/new/advanced'],
        name: 'Advanced',
        previousStep: 3,
        nextStep: null,
      },
    },
  },
  [EntityType.Cell]: {
    stepCount: 4,
    steps: {
      [1]: {
        container: CreateEntityPageContentConnected,
        urls: ['/cell/new/page', '/cell/new'],
        name: 'Page',
        previousStep: null,
        nextStep: 2,
      },
      [2]: {
        container: CreateEntityClaimsConnected,
        urls: ['/cell/new/claims'],
        name: 'Claims',
        previousStep: 1,
        nextStep: 3,
      },
      [3]: {
        container: CreateEntitySettingsConnected,
        urls: ['/cell/new/settings'],
        name: 'Settings',
        previousStep: 2,
        nextStep: 4,
      },
      [4]: {
        container: CreateEntityAdvancedConnected,
        urls: ['/cell/new/advanced'],
        name: 'Advanced',
        previousStep: 3,
        nextStep: null,
      },
    },
  },
  [EntityType.Data]: {
    stepCount: 4,
    steps: {
      [1]: {
        container: CreateEntityPageContentConnected,
        urls: ['/data/new/page', '/data/new'],
        name: 'Page',
        previousStep: null,
        nextStep: 2,
      },
      [2]: {
        container: CreateEntityClaimsConnected,
        urls: ['/data/new/claims'],
        name: 'Claims',
        previousStep: 1,
        nextStep: 3,
      },
      [3]: {
        container: CreateEntitySettingsConnected,
        urls: ['/data/new/settings'],
        name: 'Settings',
        previousStep: 2,
        nextStep: 4,
      },
      [4]: {
        container: CreateEntityAdvancedConnected,
        urls: ['/data/new/advanced'],
        name: 'Advanced',
        previousStep: 3,
        nextStep: null,
      },
    },
  },
  [EntityType.Investment]: {
    stepCount: 4,
    steps: {
      [1]: {
        container: CreateEntityPageContentConnected,
        urls: ['/investment/new/page', '/investment/new'],
        name: 'Page',
        previousStep: null,
        nextStep: 2,
      },
      [2]: {
        container: CreateEntityClaimsConnected,
        urls: ['/investment/new/claims'],
        name: 'Claims',
        previousStep: 1,
        nextStep: 3,
      },
      [3]: {
        container: CreateEntitySettingsConnected,
        urls: ['/investment/new/settings'],
        name: 'Settings',
        previousStep: 2,
        nextStep: 4,
      },
      [4]: {
        container: CreateEntityAdvancedConnected,
        urls: ['/investment/new/advanced'],
        name: 'Advanced',
        previousStep: 3,
        nextStep: null,
      },
    },
  },
  [EntityType.Oracle]: {
    stepCount: 4,
    steps: {
      [1]: {
        container: CreateEntityPageContentConnected,
        urls: ['/oracle/new/page', '/oracle/new'],
        name: 'Page',
        previousStep: null,
        nextStep: 2,
      },
      [2]: {
        container: CreateEntityClaimsConnected,
        urls: ['/oracle/new/claims'],
        name: 'Claims',
        previousStep: 1,
        nextStep: 3,
      },
      [3]: {
        container: CreateEntitySettingsConnected,
        urls: ['/oracle/new/settings'],
        name: 'Settings',
        previousStep: 2,
        nextStep: 4,
      },
      [4]: {
        container: CreateEntityAdvancedConnected,
        urls: ['/oracle/new/advanced'],
        name: 'Advanced',
        previousStep: 3,
        nextStep: null,
      },
    },
  },
  [EntityType.Template]: {
    stepCount: 3,
    steps: {
      [1]: {
        container: CreateEntityAttestationConnected,
        urls: ['/template/new/page', '/template/new'],
        name: 'Page',
        previousStep: null,
        nextStep: 2,
      },
      [2]: {
        container: CreateEntitySettingsConnected,
        urls: ['/template/new/settings'],
        name: 'Settings',
        previousStep: 1,
        nextStep: 3,
      },
      [3]: {
        container: CreateEntityAdvancedConnected,
        urls: ['/template/new/advanced'],
        name: 'Advanced',
        previousStep: 2,
        nextStep: null,
      },
    },
  },
}
