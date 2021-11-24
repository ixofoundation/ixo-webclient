// import { EditTemplateConnected } from './EditTemplate/EditTemplate.container'
import { EditEntityPageContentConnected } from './EditEntityPageContent/EditEntityPageContent.container'
import { EditEntityAttestationConnected } from './EditEntityAttestation/EditEntityAttestation.container'
import { EditEntityClaimsConnected } from './EditEntityClaims/EditEntityClaims.container'
import { EditEntitySettingsConnected } from './EditEntitySettings/EditEntitySettings.container'
import { EditEntityAdvancedConnected } from './EditEntityAdvanced/EditEntityAdvanced.container'
import { EntityStepStrategyMap } from './types'
import { EntityType } from '../../types'
import {
  selectAttestationHeaderForEntityApiPayload,
  selectPageContentHeaderForEntityApiPayload,
  selectPageContentApiPayload,
  selectAttestationApiPayload,
  selectClaimsForEntityApiPayload,
} from './EditEntity.selectors'
import { RootState } from 'common/redux/types'

export const editEntityMap: EntityStepStrategyMap = {
  [EntityType.Project]: {
    stepCount: 4,
    steps: {
      // '1': {
      //   container: EditTemplateConnected,
      //   url: '/project/edit/template',
      //   name: 'Template',
      //   previousStep: null,
      //   nextStep: 2,
      // },
      '1': {
        container: EditEntityPageContentConnected,
        url: '/page',
        name: 'Page',
        previousStep: null,
        nextStep: 2,
      },
      '2': {
        container: EditEntityClaimsConnected,
        url: '/claims',
        name: 'Claims',
        previousStep: 1,
        nextStep: 3,
      },
      '3': {
        container: EditEntitySettingsConnected,
        url: '/settings',
        name: 'Settings',
        previousStep: 2,
        nextStep: 4,
      },
      '4': {
        container: EditEntityAdvancedConnected,
        url: '/advanced',
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
      // '1': {
      //   container: EditTemplateConnected,
      //   url: '/cell/edit/template',
      //   name: 'Template',
      //   previousStep: null,
      //   nextStep: 2,
      // },
      '1': {
        container: EditEntityPageContentConnected,
        url: '/cell/edit/page',
        name: 'Page',
        previousStep: null,
        nextStep: 2,
      },
      '2': {
        container: EditEntityClaimsConnected,
        url: '/cell/edit/claims',
        name: 'Claims',
        previousStep: 1,
        nextStep: 3,
      },
      '3': {
        container: EditEntitySettingsConnected,
        url: '/cell/edit/settings',
        name: 'Settings',
        previousStep: 2,
        nextStep: 4,
      },
      '4': {
        container: EditEntityAdvancedConnected,
        url: '/cell/edit/advanced',
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
    stepCount: 4,
    steps: {
      // '1': {
      //   container: EditTemplateConnected,
      //   url: '/asset/edit/template',
      //   name: 'Template',
      //   previousStep: null,
      //   nextStep: 2,
      // },
      '1': {
        container: EditEntityPageContentConnected,
        url: '/asset/edit/page',
        name: 'Page',
        previousStep: null,
        nextStep: 2,
      },
      '2': {
        container: EditEntityClaimsConnected,
        url: '/asset/edit/claims',
        name: 'Claims',
        previousStep: 1,
        nextStep: 3,
      },
      '3': {
        container: EditEntitySettingsConnected,
        url: '/asset/edit/settings',
        name: 'Settings',
        previousStep: 2,
        nextStep: 4,
      },
      '4': {
        container: EditEntityAdvancedConnected,
        url: '/asset/edit/advanced',
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
      // '1': {
      //   container: EditTemplateConnected,
      //   url: '/investment/edit/template',
      //   name: 'Template',
      //   previousStep: null,
      //   nextStep: 2,
      // },
      '1': {
        container: EditEntityPageContentConnected,
        url: '/page',
        name: 'Page',
        previousStep: null,
        nextStep: 2,
      },
      '2': {
        container: EditEntityClaimsConnected,
        url: '/claims',
        name: 'Claims',
        previousStep: 1,
        nextStep: 3,
      },
      '3': {
        container: EditEntitySettingsConnected,
        url: '/settings',
        name: 'Settings',
        previousStep: 2,
        nextStep: 4,
      },
      '4': {
        container: EditEntityAdvancedConnected,
        url: '/advanced',
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
      // '1': {
      //   container: EditTemplateConnected,
      //   url: '/oracle/edit/template',
      //   name: 'Template',
      //   previousStep: null,
      //   nextStep: 2,
      // },
      '1': {
        container: EditEntityPageContentConnected,
        url: '/oracle/edit/page',
        name: 'Page',
        previousStep: null,
        nextStep: 2,
      },
      '2': {
        container: EditEntityClaimsConnected,
        url: '/oracle/edit/claims',
        name: 'Claims',
        previousStep: 1,
        nextStep: 3,
      },
      '3': {
        container: EditEntitySettingsConnected,
        url: '/oracle/edit/settings',
        name: 'Settings',
        previousStep: 2,
        nextStep: 4,
      },
      '4': {
        container: EditEntityAdvancedConnected,
        url: '/oracle/edit/advanced',
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
      // '1': {
      //   container: EditTemplateConnected,
      //   url: '/template/edit/template',
      //   name: 'Template',
      //   previousStep: null,
      //   nextStep: 2,
      // },
      '1': {
        container: EditEntityAttestationConnected,
        url: '/template/edit/page',
        name: 'Page',
        previousStep: null,
        nextStep: 2,
      },
      '2': {
        container: EditEntitySettingsConnected,
        url: '/template/edit/settings',
        name: 'Settings',
        previousStep: 1,
        nextStep: 3,
      },
      '3': {
        container: EditEntityAdvancedConnected,
        url: '/template/edit/advanced',
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
