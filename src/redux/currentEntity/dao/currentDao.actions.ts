import {
  ClearDaoGroupAction,
  CurrentDaoActions,
  DaoGroup,
  SelectDaoGroupAction,
  UpdateDaoGroupAction,
} from './currentDao.types'

export const updateGroupAction = (group: DaoGroup): UpdateDaoGroupAction => ({
  type: CurrentDaoActions.UpdateGroup,
  payload: group,
})

export const clearGroupAction = (): ClearDaoGroupAction => ({
  type: CurrentDaoActions.ClearGroup,
})

export const selectGroupAction = (address: string, multi = false): SelectDaoGroupAction => ({
  type: CurrentDaoActions.SelectGroup,
  payload: { address, multi },
})
