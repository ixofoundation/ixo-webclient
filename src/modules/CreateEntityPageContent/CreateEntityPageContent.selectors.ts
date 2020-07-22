import { createSelector } from 'reselect'
import { RootState } from '../../common/redux/types'
import { CreateEntityPageContentState } from './types'

export const selectPageContent = (
  state: RootState,
): CreateEntityPageContentState => state.createEntityPageContent

export const selectHeaderContent = createSelector(
  selectPageContent,
  pageContent => {
    return pageContent.header
  },
)

export const selectBodyContentSections = createSelector(
  selectPageContent,
  pageContent => {
    return Object.values(pageContent.body)
  },
)

export const selectImageContentSections = createSelector(
  selectPageContent,
  pageContent => {
    return Object.values(pageContent.images)
  },
)

export const selectVideoContentSections = createSelector(
  selectPageContent,
  pageContent => {
    return Object.values(pageContent.videos)
  },
)

export const selectProfileContentSections = createSelector(
  selectPageContent,
  pageContent => {
    return Object.values(pageContent.profiles)
  },
)

export const selectSocialContent = createSelector(
  selectPageContent,
  pageContent => {
    return pageContent.social
  },
)

export const selectEmbeddedContentSections = createSelector(
  selectPageContent,
  pageContent => {
    return Object.values(pageContent.embedded)
  },
)
