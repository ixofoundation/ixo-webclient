import { createSelector } from 'reselect'
import { RootState } from 'common/redux/types'
import { CreateEntityAttestationState } from './types'

export const selectAttestation = (
  state: RootState,
): CreateEntityAttestationState => state.createEntityAttestation

export const selectClaimInfo = createSelector(
  selectAttestation,
  attestation => attestation.claimInfo,
)

export const selectQuestions = createSelector(selectAttestation, attestation =>
  Object.values(attestation.questions),
)
