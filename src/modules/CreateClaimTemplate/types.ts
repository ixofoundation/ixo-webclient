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
  updateActiveStep = 'ixo/CreateClaimTemplate/UPDATE_STEP',
  addAttestation = 'ixo/CreateClaimTemplate/ADD_ATTESTATION',
}

export interface UpdateActiveStepAction {
  type: typeof CreateClaimTemplateActions.updateActiveStep
  payload: number
}

export interface AddAttestationAction {
  type: typeof CreateClaimTemplateActions.addAttestation
  payload: Attestation
}

export type CreateClaimTemplateActionTypes =
  | UpdateActiveStepAction
  | AddAttestationAction
