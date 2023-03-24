import { TEntityModel } from 'api/blocksync/types/entities'
import {
  TEntityAdministratorModel,
  TEntityCreatorModel,
  TEntityDDOTagModel,
  TEntityPageSectionModel,
  TEntityProfileModel,
} from 'types/protocol'

export enum CurrentEntityActions {
  UpdateEntity = 'ixo/CurrentEntity/UPDATE_ENTITY',
  UpdateEntityProfile = 'ixo/CurrentEntity/UPDATE_ENTITY_PROFILE',
  UpdateEntityCreator = 'ixo/CurrentEntity/UPDATE_ENTITY_CREATOR',
  UpdateEntityAdministrator = 'ixo/CurrentEntity/UPDATE_ENTITY_ADMINISTRATOR',
  UpdateEntityPage = 'ixo/CurrentEntity/UPDATE_ENTITY_PAGE',
  UpdateEntityTags = 'ixo/CurrentEntity/UPDATE_ENTITY_TAGS',
}

export interface UpdateEntityAction {
  type: typeof CurrentEntityActions.UpdateEntity
  payload: TEntityModel
}
export interface UpdateEntityProfileAction {
  type: typeof CurrentEntityActions.UpdateEntityProfile
  payload: TEntityProfileModel
}
export interface UpdateEntityCreatorAction {
  type: typeof CurrentEntityActions.UpdateEntityCreator
  payload: TEntityCreatorModel
}
export interface UpdateEntityAdministratorAction {
  type: typeof CurrentEntityActions.UpdateEntityAdministrator
  payload: TEntityAdministratorModel
}
export interface UpdateEntityPageAction {
  type: typeof CurrentEntityActions.UpdateEntityPage
  payload: TEntityPageSectionModel[]
}
export interface UpdateEntityTagsAction {
  type: typeof CurrentEntityActions.UpdateEntityTags
  payload: TEntityDDOTagModel[]
}

export type CurrentEntityActionTypes =
  | UpdateEntityAction
  | UpdateEntityProfileAction
  | UpdateEntityCreatorAction
  | UpdateEntityAdministratorAction
  | UpdateEntityPageAction
  | UpdateEntityTagsAction
