import { ClearDaoGroupAction, CurrentDaoActions, DaoGroup, UpdateDaoGroupAction } from './currentDao.types'

export const updateGroupAction = (group: DaoGroup): UpdateDaoGroupAction => ({
  type: CurrentDaoActions.UpdateGroup,
  payload: group,
})

export const clearGroupAction = (): ClearDaoGroupAction => ({
  type: CurrentDaoActions.ClearGroup,
})
