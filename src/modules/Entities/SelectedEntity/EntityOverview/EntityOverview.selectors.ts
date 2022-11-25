import { PageContent } from 'common/api/blocksync-api/types/page-content'
import { Attestation } from 'modules/EntityClaims/types'
import { createSelector } from 'reselect'
import * as entitySelectors from '../SelectedEntity.selectors'

export const selectPageContent = createSelector(entitySelectors.selectSelectedEntity, (entity) => {
  return entity ? (entity.content as PageContent) : null
})

export const selectAttestationContent = createSelector(entitySelectors.selectSelectedEntity, (entity) => {
  return entity ? (entity.content as Attestation) : null
})
