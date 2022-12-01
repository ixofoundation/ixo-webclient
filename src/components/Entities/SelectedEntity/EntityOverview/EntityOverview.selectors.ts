import { PageContent } from 'api/blocksync/types/pageContent'
import { Attestation } from 'types/entityClaims'
import { createSelector } from 'reselect'
import * as entitySelectors from 'redux/selectedEntity/selectedEntity.selectors'

export const selectPageContent = createSelector(entitySelectors.selectSelectedEntity, (entity) => {
  return entity ? (entity.content as PageContent) : null
})

export const selectAttestationContent = createSelector(entitySelectors.selectSelectedEntity, (entity) => {
  return entity ? (entity.content as Attestation) : null
})
