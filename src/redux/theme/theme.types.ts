export type CustomTheme = Record<string, any>

export const CustomThemeActionType = 'ixo/theme/GET_CUSTOM_THEME'

export const CustomThemeActionTypeStates = {
  FULFILLED: CustomThemeActionType + '_FULFILLED',
  PENDING: CustomThemeActionType + '_PENDING',
}

export interface GetCustomThemeAction {
  type: typeof CustomThemeActionType
  payload: Promise<CustomTheme>
}

export type CustomThemeActionTypes = GetCustomThemeAction
