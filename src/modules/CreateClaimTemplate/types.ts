export interface Question {
  id: string
  title: string
  description: string
  label: string
  required: boolean
  type: string
  minItems?: number
  maxItems?: number
  control: string
  values?: any[]
  itemValues?: string[]
  itemLabels?: string[]
  itemImages?: string[]
  placeholder?: string
  initialValue?: string
}

export type Attestation = Question
export interface CreateClaimTemplateState {
  activeStep: number
  attestations: Attestation[]
  evaluation: any // @todo create interface
  approval: any // @todo create interface
}

export enum CreateClaimTemplateActions {
  UpdateActiveStep = 'ixo/CreateClaimTemplate/UPDATE_STEP',
  AddAttestation = 'ixo/CreateClaimTemplate/ADD_ATTESTATION',
  RemoveAttestation = 'ixo/CreateClaimTemplate/REMOVE_ATTESTATION',
}

export interface UpdateActiveStepAction {
  type: typeof CreateClaimTemplateActions.UpdateActiveStep
  payload: number
}

export interface AddAttestationAction {
  type: typeof CreateClaimTemplateActions.AddAttestation
  payload: Attestation
}
export interface RemoveAttestationAction {
  type: typeof CreateClaimTemplateActions.RemoveAttestation
  payload: string
}

export type CreateClaimTemplateActionTypes =
  | UpdateActiveStepAction
  | AddAttestationAction
  | RemoveAttestationAction
