// import { EditTemplateConnected } from './EditTemplate/EditTemplate.container'
import { EditEntityPageContentConnected } from '../../modules/Entities/SelectedEntity/EntityEdit/EditEntityPageContent/EditEntityPageContent.container'
import { EditEntityAttestationConnected } from '../../modules/Entities/SelectedEntity/EntityEdit/EditEntityAttestation/EditEntityAttestation.container'
import { EditEntityClaimsConnected } from '../../modules/Entities/SelectedEntity/EntityEdit/EditEntityClaims/EditEntityClaims.container'
import { EditEntitySettingsConnected } from '../../modules/Entities/SelectedEntity/EntityEdit/EditEntitySettings/EditEntitySettings.container'
import { EditEntityAdvancedConnected } from '../../modules/Entities/SelectedEntity/EntityEdit/EditEntityAdvanced/EditEntityAdvanced.container'
import { EntityStepStrategyMap } from './editEntity.types'
import { EntityType } from '../../modules/Entities/types'
import {
  selectAttestationHeaderForEntityApiPayload,
  selectPageContentHeaderForEntityApiPayload,
  selectPageContentApiPayload,
  selectAttestationApiPayload,
  selectClaimsForEntityApiPayload,
} from './editEntity.selectors'
import { RootState } from 'redux/types'

export const editEntityMap: EntityStepStrategyMap = {
  [EntityType.Project]: {
    stepCount: 4,
    steps: {
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
    } as any,
    selectHeaderInfoApiPayload: (state: RootState): any => selectPageContentHeaderForEntityApiPayload(state),
    selectPageContentApiPayload: (state: RootState): any => selectPageContentApiPayload(state),
    selectClaimsApiPayload: (state: RootState): any => selectClaimsForEntityApiPayload(state),
  },
  [EntityType.Dao]: {
    stepCount: 4,
    steps: {
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
    } as any,
    selectHeaderInfoApiPayload: (state: RootState): any => selectPageContentHeaderForEntityApiPayload(state),
    selectPageContentApiPayload: (state: RootState): any => selectPageContentApiPayload(state),
    selectClaimsApiPayload: (state: RootState): any => selectClaimsForEntityApiPayload(state),
  },
  [EntityType.Asset]: {
    stepCount: 4,
    steps: {
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
    } as any,
    selectHeaderInfoApiPayload: (state: RootState): any => selectPageContentHeaderForEntityApiPayload(state),
    selectPageContentApiPayload: (state: RootState): any => selectPageContentApiPayload(state),
    selectClaimsApiPayload: (state: RootState): any => selectClaimsForEntityApiPayload(state),
  },
  [EntityType.Investment]: {
    stepCount: 4,
    steps: {
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
    } as any,
    selectHeaderInfoApiPayload: (state: RootState): any => selectPageContentHeaderForEntityApiPayload(state),
    selectPageContentApiPayload: (state: RootState): any => selectPageContentApiPayload(state),
    selectClaimsApiPayload: (state: RootState): any => selectClaimsForEntityApiPayload(state),
  },
  [EntityType.Oracle]: {
    stepCount: 4,
    steps: {
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
    } as any,
    selectHeaderInfoApiPayload: (state: RootState): any => selectPageContentHeaderForEntityApiPayload(state),
    selectPageContentApiPayload: (state: RootState): any => selectPageContentApiPayload(state),
    selectClaimsApiPayload: (state: RootState): any => selectClaimsForEntityApiPayload(state),
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
        url: '/page',
        name: 'Page',
        previousStep: null,
        nextStep: 2,
      },
      '2': {
        container: EditEntitySettingsConnected,
        url: '/settings',
        name: 'Settings',
        previousStep: 1,
        nextStep: 3,
      },
      '3': {
        container: EditEntityAdvancedConnected,
        url: '/advanced',
        name: 'Advanced',
        previousStep: 2,
        nextStep: null,
      },
    } as any,
    selectHeaderInfoApiPayload: (state: RootState): any => selectAttestationHeaderForEntityApiPayload(state),
    selectPageContentApiPayload: (state: RootState): any => selectAttestationApiPayload(state),
    selectClaimsApiPayload: (): any => undefined,
  },
}
