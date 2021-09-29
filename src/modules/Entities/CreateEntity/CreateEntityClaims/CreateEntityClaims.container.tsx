import React, { Dispatch } from 'react'
import { connect } from 'react-redux'
import CreateEntityBase, {
  CreateEntityBaseProps,
} from '../components/CreateEntityBase/CreateEntityBase'
import { RootState } from 'common/redux/types'
import * as entityClaimsSelectors from '../CreateEntityClaims/CreateEntityClaims.selectors'
import * as createEntitySelectors from '../CreateEntity.selectors'
import * as entitiesSelectors from '../../EntitiesExplorer/EntitiesExplorer.selectors'
import { goToStep } from '../CreateEntity.actions'
import {
  EntityClaimItem,
  Template,
  AgentRole,
  Evaluation,
  ApprovalCriterion,
  Enrichment,
} from './types'
import {
  addEntityClaim,
  removeEntityClaim,
  updateEntityClaimTemplate,
  addEntityClaimAgentRole,
  removeEntityClaimAgentRole,
  updateEntityClaimAgentRole,
  addEntityClaimEvaluation,
  removeEntityClaimEvaluation,
  updateEntityClaimEvaluation,
  addEntityClaimApprovalCriterion,
  removeEntityClaimApprovalCriterion,
  updateEntityClaimApprovalCriterion,
  addEntityClaimEnrichment,
  removeEntityClaimEnrichment,
  updateEntityClaimEnrichment,
  validated,
  validationError,
} from './CreateEntityClaims.actions'
import { FormData } from 'common/components/JsonForm/types'
import TemplateCard from './components/TemplateCard/TemplateCard'
import AgentRoleCard from './components/AgentRoleCard/AgentRoleCard'
import EvaluationCard from './components/EvaluationCard/EvaluationCard'
import ApprovalCriterionCard from './components/ApprovalCriterionCard/ApprovalCriterionCard'
import EnrichmentCard from './components/EnrichmentCard/EnrichmentCard'
import {
  Container,
  AddSectionButton,
} from 'common/components/Wrappers/FormCardWrapper/FormCardWrapper.styles'
import { getEntities } from 'modules/Entities/EntitiesExplorer/EntitiesExplorer.actions'
import { ExplorerEntity } from 'modules/Entities/EntitiesExplorer/types'
import { Spinner } from 'common/components/Spinner'

interface Props extends CreateEntityBaseProps {
  entityClaims: EntityClaimItem[]
  templates: ExplorerEntity[]
  isLoadingEntities: boolean
  handleAddEntityClaim: () => void
  handleRemoveEntityClaim: (id: string) => void
  handleUpdateEntityClaimTemplate: (
    entityClaimId: string,
    id: string,
    formData: FormData,
  ) => void
  handleAddEntityClaimAgentRole: (entityClaimId: string) => void
  handleRemoveEntityClaimAgentRole: (entityClaimId: string, id: string) => void
  handleUpdateEntityClaimAgentRole: (
    entityClaimId: string,
    id: string,
    formData: FormData,
  ) => void
  handleAddEntityClaimEvaluation: (entityClaimId: string) => void
  handleRemoveEntityClaimEvaluation: (entityClaimId: string, id: string) => void
  handleUpdateEntityClaimEvaluation: (
    entityClaimId: string,
    id: string,
    formData: FormData,
  ) => void
  handleAddEntityClaimApprovalCriterion: (entityClaimId: string) => void
  handleRemoveEntityClaimApprovalCriterion: (
    entityClaimId: string,
    id: string,
  ) => void
  handleUpdateEntityClaimApprovalCriterion: (
    entityClaimId: string,
    id: string,
    formData: FormData,
  ) => void
  handleAddEntityClaimEnrichment: (entityClaimId: string) => void
  handleRemoveEntityClaimEnrichment: (entityClaimId: string, id: string) => void
  handleUpdateEntityClaimEnrichment: (
    entityClaimId: string,
    id: string,
    formData: FormData,
  ) => void
  handleGetEntities: () => void
}

class CreateEntityClaims extends CreateEntityBase<Props> {
  componentDidMount(): void {
    const { handleGetEntities } = this.props

    handleGetEntities()
  }

  renderEntityClaimTemplate = (template: Template): JSX.Element => {
    const { templates } = this.props

    const {
      id,
      entityClaimId,
      templateId,
      title,
      description,
      isPrivate,
      minTargetClaims,
      maxTargetClaims,
      goal,
      submissionStartDate,
      submissionEndDate,
    } = template

    this.cardRefs[id] = React.createRef()

    return (
      <>
        <h2>Claim Setup</h2>
        <TemplateCard
          ref={this.cardRefs[id]}
          key={id}
          templateId={templateId}
          templates={templates.map((template) => {
            const { name: title, did, dateCreated, ddoTags } = template
            return {
              title,
              did,
              dateCreated: dateCreated.format('DD-MMM-YYYY'),
              imageUrl: null,
              previewUrl: '',
              ddoTags,
            }
          })}
          title={title}
          description={description}
          isPrivate={isPrivate}
          minTargetClaims={minTargetClaims}
          maxTargetClaims={maxTargetClaims}
          goal={goal}
          submissionStartDate={submissionStartDate}
          submissionEndDate={submissionEndDate}
          handleUpdateContent={(formData): void =>
            this.handleUpdateClaimTemplate(entityClaimId, id, formData)
          }
          handleSubmitted={(): void => this.props.handleValidated(id)}
          handleError={(errors): void =>
            this.props.handleValidationError(id, errors)
          }
        />
      </>
    )
  }

  handleUpdateClaimTemplate = (entityClaimId, id, formData): void => {
    const {
      handleUpdateEntityClaimTemplate,
      templates,
      entityClaims,
    } = this.props
    const updatedClaimTemplate = entityClaims.find(
      (claim) => claim.id === entityClaimId,
    )
    let newData = { ...formData }
    // Claim template replaced, need to auto populate goal and description
    if (updatedClaimTemplate.template.templateId !== formData.templateId) {
      const selectedTemplate = templates.find(
        (template) => template.did === formData.templateId,
      )
      newData = {
        ...formData,
        goal: selectedTemplate.goal,
        description: selectedTemplate.description,
      }
    }

    handleUpdateEntityClaimTemplate(entityClaimId, id, newData)
  }

  renderEntityClaimAgentRoles = (
    entityClaimId: string,
    agentRoles: AgentRole[],
  ): JSX.Element => {
    const {
      handleAddEntityClaimAgentRole,
      handleRemoveEntityClaimAgentRole,
      handleUpdateEntityClaimAgentRole,
    } = this.props

    return (
      <>
        <h2>Agent Roles</h2>
        {agentRoles.map((agentRole) => {
          const { id, autoApprove, credential, role } = agentRole

          this.cardRefs[id] = React.createRef()

          return (
            <AgentRoleCard
              ref={this.cardRefs[id]}
              key={id}
              autoApprove={autoApprove}
              credential={credential}
              role={role}
              handleUpdateContent={(formData): void =>
                handleUpdateEntityClaimAgentRole(entityClaimId, id, formData)
              }
              handleRemoveSection={(): void =>
                handleRemoveEntityClaimAgentRole(entityClaimId, id)
              }
              handleSubmitted={(): void => this.props.handleValidated(id)}
              handleError={(errors): void =>
                this.props.handleValidationError(id, errors)
              }
            />
          )
        })}
        <div className="text-right">
          <hr />
          <AddSectionButton
            type="button"
            onClick={(): void => handleAddEntityClaimAgentRole(entityClaimId)}
          >
            + Add Agent Role
          </AddSectionButton>
        </div>
      </>
    )
  }

  renderEntityClaimEvaluations = (
    entityClaimId: string,
    evaluations: Evaluation[],
  ): JSX.Element => {
    const {
      handleAddEntityClaimEvaluation,
      handleRemoveEntityClaimEvaluation,
      handleUpdateEntityClaimEvaluation,
    } = this.props

    return (
      <>
        <h2>Claim Evaluation</h2>
        {evaluations.map((evaluation) => {
          const {
            id,
            context,
            contextLink,
            evaluationAttributes,
            evaluationMethodology,
          } = evaluation

          this.cardRefs[id] = React.createRef()

          return (
            <EvaluationCard
              ref={this.cardRefs[id]}
              key={id}
              context={context}
              contextLink={contextLink}
              evaluationMethodology={evaluationMethodology}
              evaluationAttributes={evaluationAttributes}
              handleUpdateContent={(formData): void =>
                handleUpdateEntityClaimEvaluation(entityClaimId, id, formData)
              }
              handleRemoveSection={(): void =>
                handleRemoveEntityClaimEvaluation(entityClaimId, id)
              }
              handleSubmitted={(): void => this.props.handleValidated(id)}
              handleError={(errors): void =>
                this.props.handleValidationError(id, errors)
              }
            />
          )
        })}
        <div className="text-right">
          <hr />
          <AddSectionButton
            type="button"
            onClick={(): void => handleAddEntityClaimEvaluation(entityClaimId)}
          >
            + Add Context to Evaluate
          </AddSectionButton>
        </div>
      </>
    )
  }

  renderEntityClaimApprovalCriteria = (
    entityClaimId: string,
    approvalCriteria: ApprovalCriterion[],
  ): JSX.Element => {
    const {
      handleAddEntityClaimApprovalCriterion,
      handleRemoveEntityClaimApprovalCriterion,
      handleUpdateEntityClaimApprovalCriterion,
    } = this.props

    return (
      <>
        <h2>Approval Criteria</h2>
        {approvalCriteria.map((approvalCriterion) => {
          const {
            id,
            context,
            contextLink,
            approvalAttributes,
          } = approvalCriterion

          this.cardRefs[id] = React.createRef()

          return (
            <ApprovalCriterionCard
              ref={this.cardRefs[id]}
              key={id}
              context={context}
              contextLink={contextLink}
              approvalAttributes={approvalAttributes}
              handleUpdateContent={(formData): void =>
                handleUpdateEntityClaimApprovalCriterion(
                  entityClaimId,
                  id,
                  formData,
                )
              }
              handleRemoveSection={(): void =>
                handleRemoveEntityClaimApprovalCriterion(entityClaimId, id)
              }
              handleSubmitted={(): void => this.props.handleValidated(id)}
              handleError={(errors): void =>
                this.props.handleValidationError(id, errors)
              }
            />
          )
        })}
        <div className="text-right">
          <hr />
          <AddSectionButton
            type="button"
            onClick={(): void =>
              handleAddEntityClaimApprovalCriterion(entityClaimId)
            }
          >
            + Add Criteria
          </AddSectionButton>
        </div>
      </>
    )
  }

  renderEntityClaimEnrichments = (
    entityClaimId: string,
    enrichments: Enrichment[],
  ): JSX.Element => {
    const {
      handleAddEntityClaimEnrichment,
      handleRemoveEntityClaimEnrichment,
      handleUpdateEntityClaimEnrichment,
    } = this.props

    return (
      <>
        <h2>Claim Enrichment</h2>
        {enrichments.map((enrichment) => {
          const { id, context, contextLink, resources } = enrichment

          this.cardRefs[id] = React.createRef()

          return (
            <EnrichmentCard
              ref={this.cardRefs[id]}
              key={id}
              context={context}
              contextLink={contextLink}
              resources={resources}
              handleUpdateContent={(formData): void =>
                handleUpdateEntityClaimEnrichment(entityClaimId, id, formData)
              }
              handleRemoveSection={(): void =>
                handleRemoveEntityClaimEnrichment(entityClaimId, id)
              }
              handleSubmitted={(): void => this.props.handleValidated(id)}
              handleError={(errors): void =>
                this.props.handleValidationError(id, errors)
              }
            />
          )
        })}
        <div className="text-right">
          <hr />
          <AddSectionButton
            type="button"
            onClick={(): void => handleAddEntityClaimEnrichment(entityClaimId)}
          >
            + Add Criteria
          </AddSectionButton>
        </div>
      </>
    )
  }

  renderEntityClaims = (): JSX.Element[] => {
    const { entityClaims, handleRemoveEntityClaim } = this.props

    return entityClaims.map((entityClaim, index) => {
      const {
        id,
        template,
        agentRoles,
        evaluations,
        approvalCriteria,
        enrichments,
      } = entityClaim
      return (
        <Container key={id}>
          {this.renderEntityClaimTemplate(template)}
          <div>
            <hr className="subdivider" />
          </div>
          {this.renderEntityClaimAgentRoles(id, agentRoles)}
          <div>
            <hr className="subdivider" />
          </div>
          {this.renderEntityClaimEvaluations(id, evaluations)}
          <div>
            <hr className="subdivider" />
          </div>
          {this.renderEntityClaimApprovalCriteria(id, approvalCriteria)}
          <div>
            <hr className="subdivider" />
          </div>
          {this.renderEntityClaimEnrichments(id, enrichments)}
          <div>
            <hr className="subdivider" />
          </div>
          <div className="text-center">
            {index > 0 && (
              <AddSectionButton
                type="button"
                onClick={(): void => handleRemoveEntityClaim(id)}
              >
                + Remove Claim
              </AddSectionButton>
            )}
          </div>
        </Container>
      )
    })
  }

  onSubmitted = (): void => {
    const { entityType, step, handleGoToStep } = this.props

    handleGoToStep(this.getNextStep(entityType, step))
  }

  onBack = (): void => {
    const { entityType, step, handleGoToStep } = this.props

    handleGoToStep(this.getPreviousStep(entityType, step))
  }

  render(): JSX.Element {
    const { handleAddEntityClaim, isLoadingEntities } = this.props

    if (isLoadingEntities) {
      return (
        <Container>
          <Spinner info="Loading Templates" transparentBg={true} />
        </Container>
      )
    }

    const { entityClaims } = this.props
    const identifiers: string[] = []

    entityClaims.forEach((entityClaim) => {
      const {
        template,
        agentRoles,
        evaluations,
        approvalCriteria,
        enrichments,
      } = entityClaim

      identifiers.push(template.id)
      agentRoles.forEach((agentRole) => {
        identifiers.push(agentRole.id)
      })
      evaluations.forEach((evaluation) => {
        identifiers.push(evaluation.id)
      })
      approvalCriteria.forEach((approvalCriterion) => {
        identifiers.push(approvalCriterion.id)
      })
      enrichments.forEach((enrichment) => {
        identifiers.push(enrichment.id)
      })
    })

    return (
      <>
        {this.renderEntityClaims()}
        <div className="text-center" style={{ marginTop: '3rem' }}>
          <AddSectionButton type="button" onClick={handleAddEntityClaim}>
            + Add Claim
          </AddSectionButton>
        </div>
        {this.renderButtonGroup(identifiers, true)}
      </>
    )
  }
}

const mapStateToProps = (state: RootState): any => ({
  templates: entitiesSelectors.selectAllTemplateEntities(state),
  isLoadingEntities: entitiesSelectors.selectIsLoadingEntities(state),
  step: createEntitySelectors.selectStep(state),
  entityType: createEntitySelectors.selectEntityType(state),
  validationComplete: entityClaimsSelectors.selectValidationComplete(state),
  validated: entityClaimsSelectors.selectValidated(state),
  entityClaims: entityClaimsSelectors.selectEntityClaims(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleAddEntityClaim: (): void => dispatch(addEntityClaim()),
  handleRemoveEntityClaim: (id: string): void =>
    dispatch(removeEntityClaim(id)),
  handleUpdateEntityClaimTemplate: (
    entityClaimId: string,
    id: string,
    formData: FormData,
  ): void => dispatch(updateEntityClaimTemplate(entityClaimId, id, formData)),
  handleAddEntityClaimAgentRole: (entityClaimId: string): void =>
    dispatch(addEntityClaimAgentRole(entityClaimId)),
  handleRemoveEntityClaimAgentRole: (entityClaimId: string, id: string): void =>
    dispatch(removeEntityClaimAgentRole(entityClaimId, id)),
  handleUpdateEntityClaimAgentRole: (
    entityClaimId: string,
    id: string,
    formData: FormData,
  ): void => dispatch(updateEntityClaimAgentRole(entityClaimId, id, formData)),
  handleAddEntityClaimEvaluation: (entityClaimId: string): void =>
    dispatch(addEntityClaimEvaluation(entityClaimId)),
  handleRemoveEntityClaimEvaluation: (
    entityClaimId: string,
    id: string,
  ): void => dispatch(removeEntityClaimEvaluation(entityClaimId, id)),
  handleUpdateEntityClaimEvaluation: (
    entityClaimId: string,
    id: string,
    formData: FormData,
  ): void => dispatch(updateEntityClaimEvaluation(entityClaimId, id, formData)),
  handleAddEntityClaimApprovalCriterion: (entityClaimId: string): void =>
    dispatch(addEntityClaimApprovalCriterion(entityClaimId)),
  handleRemoveEntityClaimApprovalCriterion: (
    entityClaimId: string,
    id: string,
  ): void => dispatch(removeEntityClaimApprovalCriterion(entityClaimId, id)),
  handleUpdateEntityClaimApprovalCriterion: (
    entityClaimId: string,
    id: string,
    formData: FormData,
  ): void =>
    dispatch(updateEntityClaimApprovalCriterion(entityClaimId, id, formData)),
  handleAddEntityClaimEnrichment: (entityClaimId: string): void =>
    dispatch(addEntityClaimEnrichment(entityClaimId)),
  handleRemoveEntityClaimEnrichment: (
    entityClaimId: string,
    id: string,
  ): void => dispatch(removeEntityClaimEnrichment(entityClaimId, id)),
  handleUpdateEntityClaimEnrichment: (
    entityClaimId: string,
    id: string,
    formData: FormData,
  ): void => dispatch(updateEntityClaimEnrichment(entityClaimId, id, formData)),
  handleValidated: (identifier: string): void =>
    dispatch(validated(identifier)),
  handleValidationError: (identifier: string, errors: string[]): void =>
    dispatch(validationError(identifier, errors)),
  handleGoToStep: (step: number): void => dispatch(goToStep(step)),
  handleGetEntities: (): void => dispatch(getEntities()),
})

export const CreateEntityClaimsConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateEntityClaims)
