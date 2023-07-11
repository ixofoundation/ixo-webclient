import { Validation } from '../editEntityOld/editEntity.types'

export interface Template {
  id: string
  entityClaimId: string
  templateId: string
  title: string
  description: string
  isPrivate: boolean
  minTargetClaims: number
  maxTargetClaims: number
  goal: string
  submissionStartDate: string
  submissionEndDate: string
}

export interface AgentRole {
  id: string
  entityClaimId: string
  role: string
  credential: string
  autoApprove: boolean
}

export interface Evaluation {
  entityClaimId: string
  id: string
  context: string
  contextLink: string
  evaluationAttributes: string[]
  evaluationMethodology: string
}

export interface ApprovalAttribute {
  attribute: string
  condition: string
}

export interface ApprovalCriterion {
  id: string
  entityClaimId: string
  context: string
  contextLink: string
  approvalAttributes: ApprovalAttribute[]
}

export interface EnrichmentResource {
  productId: string
  resource: string
}

export interface Enrichment {
  id: string
  entityClaimId: string
  context: string
  contextLink: string
  resources: EnrichmentResource[]
}

export interface EntityClaim {
  id: string
  template: Template
  agentRoles: {
    [id: string]: AgentRole
  }
  evaluations: {
    [id: string]: Evaluation
  }
  approvalCriteria: {
    [id: string]: ApprovalCriterion
  }
  enrichments: {
    [id: string]: Enrichment
  }
}

export interface EntityClaimItem {
  id: string
  template: Template
  agentRoles: AgentRole[]
  evaluations: Evaluation[]
  approvalCriteria: ApprovalCriterion[]
  enrichments: Enrichment[]
}

export interface EditEntityClaimsState {
  entityClaims: {
    [id: string]: EntityClaim
  }
  validation: {
    [identifier: string]: Validation
  }
}

export enum EditEntityClaimsActions {
  AddEntityClaim = 'ixo/EditEntityClaims/ADD_ENTITY_CLAIM',
  RemoveEntityClaim = 'ixo/EditEntityClaims/REMOVE_ENTITY_CLAIM',
  // Template
  UpdateEntityClaimTemplate = 'ixo/EditEntityClaims/UPDATE_ENTITY_CLAIM_TEMPLATE',
  // Agent Roles
  AddEntityClaimAgentRole = 'ixo/EditEntityClaims/ADD_ENTITY_CLAIM_AGENT_ROLE',
  RemoveEntityClaimAgentRole = 'ixo/EditEntityClaims/REMOVE_ENTITY_CLAIM_AGENT_ROLE',
  UpdateEntityClaimAgentRole = 'ixo/EditEntityClaims/UPDATE_ENTITY_CLAIM_AGENT_ROLE',
  // Evaluations
  AddEntityClaimEvaluation = 'ixo/EditEntityClaims/ADD_ENTITY_CLAIM_EVALUATION',
  RemoveEntityClaimEvaluation = 'ixo/EditEntityClaims/REMOVE_ENTITY_CLAIM_EVALUATION',
  UpdateEntityClaimEvaluation = 'ixo/EditEntityClaims/UPDATE_ENTITY_CLAIM_EVALUATION',
  // Approval Criteria
  AddEntityClaimApprovalCriterion = 'ixo/EditEntityClaims/ADD_ENTITY_CLAIM_APPROVAL_CRITERION',
  RemoveEntityClaimApprovalCriterion = 'ixo/EditEntityClaims/REMOVE_ENTITY_CLAIM_APPROVAL_CRITERION',
  UpdateEntityClaimApprovalCriterion = 'ixo/EditEntityClaims/UPDATE_ENTITY_CLAIM_APPROVAL_CRITERION',
  // Enrichment
  AddEntityClaimEnrichment = 'ixo/EditEntityClaims/ADD_ENTITY_CLAIM_ENRICHMENT',
  RemoveEntityClaimEnrichment = 'ixo/EditEntityClaims/REMOVE_ENTITY_CLAIM_ENRICHMENT',
  UpdateEntityClaimEnrichment = 'ixo/EditEntityClaims/UPDATE_ENTITY_CLAIM_ENRICHMENT',
  // Validation
  Validated = 'ixo/EditEntitySettings/SET_VALIDATED',
  ValidationError = 'ixo/EditEntitySettings/VALIDATION_ERROR',

  ImportEntityClaims = 'ixo/EditEntityClaims/IMPORT_ENTITY_CLAIMS',
}

export interface AddEntityClaimAction {
  type: typeof EditEntityClaimsActions.AddEntityClaim
  payload: {
    id: string
  }
}

export interface RemoveEntityClaimAction {
  type: typeof EditEntityClaimsActions.RemoveEntityClaim
  payload: {
    id: string
  }
}

export interface UpdateEntityClaimTemplateAction {
  type: typeof EditEntityClaimsActions.UpdateEntityClaimTemplate
  payload: {
    id: string
    entityClaimId: string
    templateId: string
    title: string
    description: string
    isPrivate: boolean
    minTargetClaims: number
    maxTargetClaims: number
    goal: string
    submissionStartDate: string
    submissionEndDate: string
  }
}

export interface AddEntityClaimAgentRoleAction {
  type: typeof EditEntityClaimsActions.AddEntityClaimAgentRole
  payload: {
    id: string
    entityClaimId: string
  }
}

export interface RemoveEntityClaimAgentRoleAction {
  type: typeof EditEntityClaimsActions.RemoveEntityClaimAgentRole
  payload: {
    id: string
    entityClaimId: string
  }
}

export interface UpdateEntityClaimAgentRoleAction {
  type: typeof EditEntityClaimsActions.UpdateEntityClaimAgentRole
  payload: {
    entityClaimId: string
    id: string
    role: string
    credential: string
    autoApprove: boolean
  }
}

export interface AddEntityClaimEvaluationAction {
  type: typeof EditEntityClaimsActions.AddEntityClaimEvaluation
  payload: {
    id: string
    entityClaimId: string
  }
}

export interface RemoveEntityClaimEvaluationAction {
  type: typeof EditEntityClaimsActions.RemoveEntityClaimEvaluation
  payload: {
    id: string
    entityClaimId: string
  }
}

export interface UpdateEntityClaimEvaluationAction {
  type: typeof EditEntityClaimsActions.UpdateEntityClaimEvaluation
  payload: {
    id: string
    entityClaimId: string
    context: string
    contextLink: string
    evaluationMethodology: string
    evaluationAttributes: string[]
  }
}

export interface AddEntityClaimApprovalCriterionAction {
  type: typeof EditEntityClaimsActions.AddEntityClaimApprovalCriterion
  payload: {
    id: string
    entityClaimId: string
  }
}

export interface RemoveEntityClaimApprovalCriterionAction {
  type: typeof EditEntityClaimsActions.RemoveEntityClaimApprovalCriterion
  payload: {
    id: string
    entityClaimId: string
  }
}

export interface UpdateEntityClaimApprovalCriterionAction {
  type: typeof EditEntityClaimsActions.UpdateEntityClaimApprovalCriterion
  payload: {
    id: string
    entityClaimId: string
    context: string
    contextLink: string
    approvalAttributes: ApprovalAttribute[]
  }
}

export interface AddEntityClaimEnrichmentAction {
  type: typeof EditEntityClaimsActions.AddEntityClaimEnrichment
  payload: {
    id: string
    entityClaimId: string
  }
}

export interface RemoveEntityClaimEnrichmentAction {
  type: typeof EditEntityClaimsActions.RemoveEntityClaimEnrichment
  payload: {
    id: string
    entityClaimId: string
  }
}

export interface UpdateEntityClaimEnrichmentAction {
  type: typeof EditEntityClaimsActions.UpdateEntityClaimEnrichment
  payload: {
    id: string
    entityClaimId: string
    context: string
    contextLink: string
    resources: EnrichmentResource[]
  }
}

export interface ValidatedAction {
  type: typeof EditEntityClaimsActions.Validated
  payload: {
    identifier: string
  }
}

export interface ValidationErrorAction {
  type: typeof EditEntityClaimsActions.ValidationError
  payload: {
    identifier: string
    errors: string[]
  }
}

export interface ImportEntityClaimsAction {
  type: typeof EditEntityClaimsActions.ImportEntityClaims
  payload: any
}

export type EditEntityClaimActionTypes =
  | AddEntityClaimAction
  | RemoveEntityClaimAction
  | UpdateEntityClaimTemplateAction
  | AddEntityClaimAgentRoleAction
  | RemoveEntityClaimAgentRoleAction
  | UpdateEntityClaimAgentRoleAction
  | AddEntityClaimEvaluationAction
  | RemoveEntityClaimEvaluationAction
  | UpdateEntityClaimEvaluationAction
  | AddEntityClaimApprovalCriterionAction
  | RemoveEntityClaimApprovalCriterionAction
  | UpdateEntityClaimApprovalCriterionAction
  | AddEntityClaimEnrichmentAction
  | RemoveEntityClaimEnrichmentAction
  | UpdateEntityClaimEnrichmentAction
  | ValidatedAction
  | ValidationErrorAction
  | ImportEntityClaimsAction
