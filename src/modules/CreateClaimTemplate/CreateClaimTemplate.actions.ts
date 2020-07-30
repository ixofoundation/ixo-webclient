import {
  UpdateActiveStepAction,
  CreateClaimTemplateActions,
  AddAttestationAction,
  Attestation,
  RemoveAttestationAction,
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
