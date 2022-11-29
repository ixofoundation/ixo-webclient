import { createSelector } from 'reselect'
import { RootState } from 'redux/types'
import { CreateEntityAttestationState } from './createEntityAttestation.types'

export const selectAttestation = (state: RootState): CreateEntityAttestationState => state.createEntityAttestation

export const selectClaimInfo = createSelector(selectAttestation, (attestation) => attestation.claimInfo)

export const selectQuestions = createSelector(selectAttestation, (attestation) =>
  // Object.values(attestation.questions).sort((a, b) =>
  //   a.order > b.order ? 1 : -1,
  // ),
  Object.values(attestation.questions),
)

export const selectValidation = createSelector(selectAttestation, (attestation) => {
  return attestation.validation
})

export const selectValidationComplete = createSelector(selectQuestions, selectValidation, (questions, validation) => {
  // check if each section has had it's validation completed
  let validationComplete = true
  validationComplete = !!validation['claiminfo']

  validationComplete = validationComplete && questions.map((question) => question.id).every((id) => !!validation[id])

  return validationComplete
})

export const selectValidated = createSelector(
  selectQuestions,
  selectValidationComplete,
  selectValidation,
  (questions, validationComplete, validation) => {
    // check if each section has been validated successfully
    if (!validationComplete) {
      return false
    }

    // check if each section has had it's validation completed
    let validated = true
    validated = validation['claiminfo'].validated

    validated = validated && questions.map((question) => question.id).every((id) => validation[id].validated)

    return validated
  },
)
