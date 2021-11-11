import { Validation } from '../types'

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

export interface CreateEntityClaimsState {
  entityClaims: {
    [id: string]: EntityClaim
  }
  validation: {
    [identifier: string]: Validation
  }
}

export enum CreateEntityClaimsActions {
  AddEntityClaim = 'ixo/CreateEntityClaims/ADD_ENTITY_CLAIM',
  RemoveEntityClaim = 'ixo/CreateEntityClaims/REMOVE_ENTITY_CLAIM',
  ReorderEntityClaim = 'ixo/CreateEntityClaims/REORDER_ENTITY_CLAIM',
  // Template
  UpdateEntityClaimTemplate = 'ixo/CreateEntityClaims/UPDATE_ENTITY_CLAIM_TEMPLATE',
  // Agent Roles
  AddEntityClaimAgentRole = 'ixo/CreateEntityClaims/ADD_ENTITY_CLAIM_AGENT_ROLE',
  RemoveEntityClaimAgentRole = 'ixo/CreateEntityClaims/REMOVE_ENTITY_CLAIM_AGENT_ROLE',
  UpdateEntityClaimAgentRole = 'ixo/CreateEntityClaims/UPDATE_ENTITY_CLAIM_AGENT_ROLE',
  // Evaluations
  AddEntityClaimEvaluation = 'ixo/CreateEntityClaims/ADD_ENTITY_CLAIM_EVALUATION',
  RemoveEntityClaimEvaluation = 'ixo/CreateEntityClaims/REMOVE_ENTITY_CLAIM_EVALUATION',
  UpdateEntityClaimEvaluation = 'ixo/CreateEntityClaims/UPDATE_ENTITY_CLAIM_EVALUATION',
  // Approval Criteria
  AddEntityClaimApprovalCriterion = 'ixo/CreateEntityClaims/ADD_ENTITY_CLAIM_APPROVAL_CRITERION',
  RemoveEntityClaimApprovalCriterion = 'ixo/CreateEntityClaims/REMOVE_ENTITY_CLAIM_APPROVAL_CRITERION',
  UpdateEntityClaimApprovalCriterion = 'ixo/CreateEntityClaims/UPDATE_ENTITY_CLAIM_APPROVAL_CRITERION',
  // Enrichment
  AddEntityClaimEnrichment = 'ixo/CreateEntityClaims/ADD_ENTITY_CLAIM_ENRICHMENT',
  RemoveEntityClaimEnrichment = 'ixo/CreateEntityClaims/REMOVE_ENTITY_CLAIM_ENRICHMENT',
  UpdateEntityClaimEnrichment = 'ixo/CreateEntityClaims/UPDATE_ENTITY_CLAIM_ENRICHMENT',
  // Validation
  Validated = 'ixo/CreateEntitySettings/SET_VALIDATED',
  ValidationError = 'ixo/CreateEntitySettings/VALIDATION_ERROR',

  ImportEntityClaims = 'ixo/CreateEntityClaims/IMPORT_ENTITY_CLAIMS',
}

export interface AddEntityClaimAction {
  type: typeof CreateEntityClaimsActions.AddEntityClaim
  payload: {
    id: string
  }
}

export interface RemoveEntityClaimAction {
  type: typeof CreateEntityClaimsActions.RemoveEntityClaim
  payload: {
    id: string
  }
}

export interface ReorderEntityClaimAction {
  type: typeof CreateEntityClaimsActions.ReorderEntityClaim
  payload: {
    [id: string]: EntityClaim
  }
}

export interface UpdateEntityClaimTemplateAction {
  type: typeof CreateEntityClaimsActions.UpdateEntityClaimTemplate
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
  type: typeof CreateEntityClaimsActions.AddEntityClaimAgentRole
  payload: {
    id: string
    entityClaimId: string
  }
}

export interface RemoveEntityClaimAgentRoleAction {
  type: typeof CreateEntityClaimsActions.RemoveEntityClaimAgentRole
  payload: {
    id: string
    entityClaimId: string
  }
}

export interface UpdateEntityClaimAgentRoleAction {
  type: typeof CreateEntityClaimsActions.UpdateEntityClaimAgentRole
  payload: {
    entityClaimId: string
    id: string
    role: string
    credential: string
    autoApprove: boolean
  }
}

export interface AddEntityClaimEvaluationAction {
  type: typeof CreateEntityClaimsActions.AddEntityClaimEvaluation
  payload: {
    id: string
    entityClaimId: string
  }
}

export interface RemoveEntityClaimEvaluationAction {
  type: typeof CreateEntityClaimsActions.RemoveEntityClaimEvaluation
  payload: {
    id: string
    entityClaimId: string
  }
}

export interface UpdateEntityClaimEvaluationAction {
  type: typeof CreateEntityClaimsActions.UpdateEntityClaimEvaluation
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
  type: typeof CreateEntityClaimsActions.AddEntityClaimApprovalCriterion
  payload: {
    id: string
    entityClaimId: string
  }
}

export interface RemoveEntityClaimApprovalCriterionAction {
  type: typeof CreateEntityClaimsActions.RemoveEntityClaimApprovalCriterion
  payload: {
    id: string
    entityClaimId: string
  }
}

export interface UpdateEntityClaimApprovalCriterionAction {
  type: typeof CreateEntityClaimsActions.UpdateEntityClaimApprovalCriterion
  payload: {
    id: string
    entityClaimId: string
    context: string
    contextLink: string
    approvalAttributes: ApprovalAttribute[]
  }
}

export interface AddEntityClaimEnrichmentAction {
  type: typeof CreateEntityClaimsActions.AddEntityClaimEnrichment
  payload: {
    id: string
    entityClaimId: string
  }
}

export interface RemoveEntityClaimEnrichmentAction {
  type: typeof CreateEntityClaimsActions.RemoveEntityClaimEnrichment
  payload: {
    id: string
    entityClaimId: string
  }
}

export interface UpdateEntityClaimEnrichmentAction {
  type: typeof CreateEntityClaimsActions.UpdateEntityClaimEnrichment
  payload: {
    id: string
    entityClaimId: string
    context: string
    contextLink: string
    resources: EnrichmentResource[]
  }
}

export interface ValidatedAction {
  type: typeof CreateEntityClaimsActions.Validated
  payload: {
    identifier: string
  }
}

export interface ValidationErrorAction {
  type: typeof CreateEntityClaimsActions.ValidationError
  payload: {
    identifier: string
    errors: string[]
  }
}

export interface ImportEntityClaimsAction {
  type: typeof CreateEntityClaimsActions.ImportEntityClaims,
  payload: any
}

export type CreateEntityClaimActionTypes =
  | AddEntityClaimAction
  | RemoveEntityClaimAction
  | ReorderEntityClaimAction
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