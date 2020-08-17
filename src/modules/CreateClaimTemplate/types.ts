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

export type Attestation = Question;

export interface ClaimInfo {
  claimName: string
  shortDescription: string
}

export interface CreateClaimTemplateState {
  activeStep: number
  claimInfo: ClaimInfo
  attestations: Attestation[]
  evaluation: any // @todo create interface
  approval: any // @todo create interface
}

export enum CreateClaimTemplateActions {
  UpdateActiveStep = 'ixo/CreateClaimTemplate/UPDATE_STEP',
  UpdateClaimInfo = 'ixo/CreateClaimTemplate/UPDATE_CLAIM_INFO',
  AddAttestation = 'ixo/CreateClaimTemplate/ADD_ATTESTATION',
  RemoveAttestation = 'ixo/CreateClaimTemplate/REMOVE_ATTESTATION',
  DuplicateAttestation = 'ixo/CreateClaimTemplate/DUPLICATE_ATTESTATION',
  UpdateAttestation = 'ixo/CreateClaimTemplate/UPDATE_ATTESTATION',
}

export interface UpdateActiveStepAction {
  type: typeof CreateClaimTemplateActions.UpdateActiveStep
  payload: number
}
export interface UpdateClaimInfoAction {
  type: typeof CreateClaimTemplateActions.UpdateClaimInfo
  payload: ClaimInfo
}

export interface AddAttestationAction {
  type: typeof CreateClaimTemplateActions.AddAttestation
  payload: Attestation
}
export interface RemoveAttestationAction {
  type: typeof CreateClaimTemplateActions.RemoveAttestation
  payload: string
}
export interface DuplicateAttestationAction {
  type: typeof CreateClaimTemplateActions.DuplicateAttestation
  payload: Attestation
}
export interface UpdateAttestationAction {
  type: typeof CreateClaimTemplateActions.UpdateAttestation
  payload: Attestation
}

export type CreateClaimTemplateActionTypes =
  | UpdateActiveStepAction
  | UpdateClaimInfoAction
  | AddAttestationAction
  | RemoveAttestationAction
  | DuplicateAttestationAction
  | UpdateAttestationAction;
