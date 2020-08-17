import {
  UpdateActiveStepAction,
  UpdateClaimInfoAction,
  CreateClaimTemplateActions,
  AddAttestationAction,
  Attestation,
  RemoveAttestationAction,
  UpdateAttestationAction,
  ClaimInfo,
} from './types'
import { Dispatch } from 'redux'
import { RootState } from 'common/redux/types'

export const updateActiveStep = (newStepNo: number) => (
  dispatch: Dispatch,
  getState: () => RootState,
): UpdateActiveStepAction => {
  const {
    createClaimTemplate: { activeStep },
  } = getState()
  const totalSteps = 3 // @todo set this more dynamically

  if (activeStep !== newStepNo && newStepNo <= totalSteps && newStepNo > 0)
    return dispatch({
      type: CreateClaimTemplateActions.UpdateActiveStep,
      payload: newStepNo,
    })
  return null
}

export const updateClaimInfo = (claimInfo: ClaimInfo) => (
  dispatch: Dispatch,
): UpdateClaimInfoAction => {
  return dispatch({
    type: CreateClaimTemplateActions.UpdateClaimInfo,
    payload: claimInfo,
  })
}

export const addAttestation = (newAttestation: Attestation) => (
  dispatch: Dispatch,
): AddAttestationAction => {
  return dispatch({
    type: CreateClaimTemplateActions.AddAttestation,
    payload: newAttestation,
  })
}

export const removeAttestation = (attestationID: string) => (
  dispatch: Dispatch,
): RemoveAttestationAction => {
  return dispatch({
    type: CreateClaimTemplateActions.RemoveAttestation,
    payload: attestationID,
  })
}

export const updateAttestation = (attestation: Attestation) => (
  dispatch: Dispatch,
): UpdateAttestationAction => {
  return dispatch({
    type: CreateClaimTemplateActions.UpdateAttestation,
    payload: attestation,
  })
}
