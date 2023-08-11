import { Dispatch } from 'redux'
import { GetCustomThemeAction, CustomThemeActionType } from './theme.types'
import Axios from 'axios'
import { CustomThemeUrl } from 'constants/chains'

export const getCustomTheme =
  () =>
  (dispatch: Dispatch): GetCustomThemeAction => {
    return dispatch({
      type: CustomThemeActionType,
      payload: Axios.get(CustomThemeUrl!).then((response) => {
        console.log(response.data.theme)
        return response.data.theme
      }),
    })
  }
