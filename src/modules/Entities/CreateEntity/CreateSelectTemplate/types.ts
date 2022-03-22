export interface CreateSelectTemplateState {
  templateType: string
}

export enum CreateSelectTemplateActions {
  UpdateTemplateType = 'ixo/CreateSelectTemplate/UPDATE_TEMPLATE_TYPE',
}

export interface UpdateTemplateTypeAction {
  type: typeof CreateSelectTemplateActions.UpdateTemplateType
  payload: CreateSelectTemplateState
}

export type CreateSelectTemplateActionTypes = UpdateTemplateTypeAction
