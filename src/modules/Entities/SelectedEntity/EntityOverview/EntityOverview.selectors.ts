import { ApiPageContent } from 'common/api/blocksync-api/types/page-content'
import { createSelector } from 'reselect'
import * as entitySelectors from '../SelectedEntity.selectors'

export const selectPageContent = createSelector(
  entitySelectors.selectSelectedEntity,
  (entity) => {
    return entity ? (entity.content as ApiPageContent) : null
  },
)
