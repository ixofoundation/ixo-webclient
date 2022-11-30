import { createSelector } from 'reselect'
import { RootState } from 'redux/types'
import { RouterState } from 'connected-react-router'
export const selectRouter = (state: RootState): RouterState => state.router

export const selectLocationProps = createSelector(selectRouter, (router: RouterState) => router.location)

export const selectPathnameProps = createSelector(selectRouter, (router: RouterState) => {
  return router.location.pathname
})
