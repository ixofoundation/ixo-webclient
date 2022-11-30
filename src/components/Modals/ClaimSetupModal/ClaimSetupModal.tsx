import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import * as Modal from 'react-modal'
import { ReactComponent as CloseIcon } from 'assets/images/icon-close.svg'
import { ModalStyles, CloseButton, ModalBody, ModalWrapper, ModalRow, ModalTitle } from '../styles'
import { Button } from 'pages/CreateEntity/components'
import { FormData } from 'components/JsonForm/types'
import { TClaimAgentRole, TClaimApprovalCriterion, TClaimEnrichment, TClaimEvaluation, TEntityClaimModel } from 'types'
import { Box, theme, Typography } from 'components/App/App.styles'
import TemplateCard from 'modules/Entities/CreateEntity/CreateEntityClaims/components/TemplateCard/TemplateCard'
import { useSelector } from 'react-redux'
import { selectAllTemplateEntities } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import AgentRoleCard from 'modules/Entities/CreateEntity/CreateEntityClaims/components/AgentRoleCard/AgentRoleCard'
import { omitKey } from 'utils'
import EvaluationCard from 'modules/Entities/CreateEntity/CreateEntityClaims/components/EvaluationCard/EvaluationCard'
import ApprovalCriterionCard from 'modules/Entities/CreateEntity/CreateEntityClaims/components/ApprovalCriterionCard/ApprovalCriterionCard'
import EnrichmentCard from 'modules/Entities/CreateEntity/CreateEntityClaims/components/EnrichmentCard/EnrichmentCard'

interface Props {
  claim: TEntityClaimModel
  open: boolean
  onClose: () => void
  handleChange: (claim: TEntityClaimModel) => void
}

const ClaimSetupModal: React.FC<Props> = ({ claim, open, onClose, handleChange }): JSX.Element => {
  const templates = useSelector(selectAllTemplateEntities) ?? []
  const [formData, setFormData] = useState<FormData>(claim)

  const handleSubmit = (): void => {
    handleChange(formData as TEntityClaimModel)
  }

  const renderClaimTemplate = (): JSX.Element => {
    const templateId = formData?.template?.templateId
    const title = formData?.template?.title
    const description = formData?.template?.description
    const isPrivate = formData?.template?.isPrivate
    const minTargetClaims = formData?.template?.minTargetClaims
    const maxTargetClaims = formData?.template?.maxTargetClaims
    const goal = formData?.template?.goal
    const submissionStartDate = formData?.template?.submissionStartDate
    const submissionEndDate = formData?.template?.submissionEndDate
    const handleUpdateClaimTemplate = (data: FormData): void => {
      setFormData((pre) => ({
        ...pre,
        template: {
          ...pre.template,
          ...data,
          submissionStartDate: data.submissionDates ? data.submissionDates.split('|')[0] : undefined,
          submissionEndDate: data.submissionDates ? data.submissionDates.split('|')[1] : undefined,
        },
      }))
    }
    return (
      <Box className='d-flex flex-column w-100'>
        <h2>Template</h2>
        <TemplateCard
          templateId={templateId}
          templates={
            templates.map((template) => ({
              title: template.name,
              did: template.did,
              dateCreated: template.dateCreated.format('DD-MMM-YYYY'),
              imageUrl: null,
              previewUrl: '',
              ddoTags: template.ddoTags,
            })) as any
          }
          title={title}
          description={description}
          isPrivate={isPrivate}
          minTargetClaims={minTargetClaims}
          maxTargetClaims={maxTargetClaims}
          goal={goal}
          submissionStartDate={submissionStartDate}
          submissionEndDate={submissionEndDate}
          handleUpdateContent={handleUpdateClaimTemplate}
          handleSubmitted={(): void => {
            // this.props.handleValidated(id)
          }}
          handleError={(): void => {
            // this.props.handleValidationError(id, errors)
          }}
        />
      </Box>
    )
  }

  const renderClaimAgentRoles = (): JSX.Element => {
    const agentRoles: TClaimAgentRole[] = Object.values(formData?.agentRoles ?? {})
    const handleAddEntityClaimAgentRole = (): void => {
      const id = uuidv4()
      setFormData((pre) => ({
        ...pre,
        agentRoles: { ...pre.agentRoles, [id]: { id } },
      }))
    }
    const handleUpdateEntityClaimAgentRole = (id: string, data: FormData): void => {
      setFormData((pre) => ({
        ...pre,
        agentRoles: { ...pre.agentRoles, [id]: { id, ...data } },
      }))
    }
    const handleRemoveEntityClaimAgentRole = (id: string): void => {
      setFormData((pre) => ({
        ...pre,
        agentRoles: omitKey(pre.agentRoles, id),
      }))
    }
    return (
      <Box className='d-flex flex-column w-100'>
        {agentRoles.length > 0 && <h2>Agent Roles</h2>}
        {agentRoles.map((agentRole) => {
          const { id, autoApprove, credential, role } = agentRole

          return (
            <AgentRoleCard
              key={id}
              autoApprove={autoApprove}
              credential={credential}
              role={role}
              handleUpdateContent={(formData): void => handleUpdateEntityClaimAgentRole(id, formData)}
              handleRemoveSection={(): void => handleRemoveEntityClaimAgentRole(id)}
              handleSubmitted={(): void => {
                // this.props.handleValidated(id)
              }}
              handleError={(): void => {
                // this.props.handleValidationError(id, errors)
              }}
            />
          )
        })}
        <Box className='text-right'>
          {agentRoles.length > 0 && <hr />}
          <Typography color={theme.ixoNewBlue} style={{ cursor: 'pointer' }} onClick={handleAddEntityClaimAgentRole}>
            + Add Agent Role
          </Typography>
        </Box>
      </Box>
    )
  }

  const renderClaimEvaluations = (): JSX.Element => {
    const evaluations: TClaimEvaluation[] = Object.values(formData?.evaluations ?? {})
    const handleAddEntityClaimEvaluation = (): void => {
      const id = uuidv4()
      setFormData((pre) => ({
        ...pre,
        evaluations: { ...pre.evaluations, [id]: { id } },
      }))
    }
    const handleUpdateEntityClaimEvaluation = (id: string, data: FormData): void => {
      setFormData((pre) => ({
        ...pre,
        evaluations: { ...pre.evaluations, [id]: { id, ...data } },
      }))
    }
    const handleRemoveEntityClaimEvaluation = (id: string): void => {
      setFormData((pre) => ({
        ...pre,
        evaluations: omitKey(pre.evaluations, id),
      }))
    }
    return (
      <Box className='d-flex flex-column w-100'>
        {evaluations.length > 0 && <h2>Claim Evaluation</h2>}
        {evaluations.map((evaluation) => {
          const { id, context, contextLink, evaluationAttributes, evaluationMethodology } = evaluation

          return (
            <EvaluationCard
              key={id}
              context={context}
              contextLink={contextLink}
              evaluationMethodology={evaluationMethodology}
              evaluationAttributes={evaluationAttributes}
              handleUpdateContent={(formData): void => handleUpdateEntityClaimEvaluation(id, formData)}
              handleRemoveSection={(): void => handleRemoveEntityClaimEvaluation(id)}
              handleSubmitted={(): void => {
                // this.props.handleValidated(id)
              }}
              handleError={(): void => {
                // this.props.handleValidationError(id, errors)
              }}
            />
          )
        })}
        <Box className='text-right'>
          {evaluations.length > 0 && <hr />}
          <Typography color={theme.ixoNewBlue} style={{ cursor: 'pointer' }} onClick={handleAddEntityClaimEvaluation}>
            + Add Context to Evaluate
          </Typography>
        </Box>
      </Box>
    )
  }

  const renderClaimApprovalCriteria = (): JSX.Element => {
    const approvalCriteria: TClaimApprovalCriterion[] = Object.values(formData?.approvalCriteria ?? {})
    const handleAddEntityClaimApprovalCriterion = (): void => {
      const id = uuidv4()
      setFormData((pre) => ({
        ...pre,
        approvalCriteria: { ...pre.approvalCriteria, [id]: { id } },
      }))
    }
    const handleUpdateEntityClaimApprovalCriterion = (id: string, data: FormData): void => {
      setFormData((pre) => ({
        ...pre,
        approvalCriteria: { ...pre.approvalCriteria, [id]: { id, ...data } },
      }))
    }
    const handleRemoveEntityClaimApprovalCriterion = (id: string): void => {
      setFormData((pre) => ({
        ...pre,
        approvalCriteria: omitKey(pre.approvalCriteria, id),
      }))
    }
    return (
      <Box className='d-flex flex-column w-100'>
        {approvalCriteria.length > 0 && <h2>Approval Criteria</h2>}
        {approvalCriteria.map((approvalCriterion) => {
          const { id, context, contextLink, approvalAttributes } = approvalCriterion

          return (
            <ApprovalCriterionCard
              key={id}
              context={context}
              contextLink={contextLink}
              approvalAttributes={approvalAttributes}
              handleUpdateContent={(formData): void => handleUpdateEntityClaimApprovalCriterion(id, formData)}
              handleRemoveSection={(): void => handleRemoveEntityClaimApprovalCriterion(id)}
              handleSubmitted={(): void => {
                // this.props.handleValidated(id)
              }}
              handleError={(): void => {
                // this.props.handleValidationError(id, errors)
              }}
            />
          )
        })}
        <Box className='text-right'>
          {approvalCriteria.length > 0 && <hr />}
          <Typography
            color={theme.ixoNewBlue}
            style={{ cursor: 'pointer' }}
            onClick={handleAddEntityClaimApprovalCriterion}
          >
            + Add Criteria
          </Typography>
        </Box>
      </Box>
    )
  }

  const renderClaimEnrichments = (): JSX.Element => {
    const enrichments: TClaimEnrichment[] = Object.values(formData.enrichments ?? {})
    const handleAddEntityClaimEnrichment = (): void => {
      const id = uuidv4()
      setFormData((pre) => ({
        ...pre,
        enrichments: { ...pre.enrichments, [id]: { id } },
      }))
    }
    const handleUpdateEntityClaimEnrichment = (id: string, data: FormData): void => {
      setFormData((pre) => ({
        ...pre,
        enrichments: { ...pre.enrichments, [id]: { id, ...data } },
      }))
    }
    const handleRemoveEntityClaimEnrichment = (id: string): void => {
      setFormData((pre) => ({
        ...pre,
        enrichments: omitKey(pre.enrichments, id),
      }))
    }
    return (
      <Box className='d-flex flex-column w-100'>
        {enrichments.length > 0 && <h2>Claim Enrichment</h2>}
        {enrichments.map((enrichment) => {
          const { id, context, contextLink, resources } = enrichment

          return (
            <EnrichmentCard
              key={id}
              context={context}
              contextLink={contextLink}
              resources={resources}
              handleUpdateContent={(formData): void => handleUpdateEntityClaimEnrichment(id, formData)}
              handleRemoveSection={(): void => handleRemoveEntityClaimEnrichment(id)}
              handleSubmitted={(): void => {
                // this.props.handleValidated(id)
              }}
              handleError={(): void => {
                // this.props.handleValidationError(id, errors)
              }}
            />
          )
        })}
        <Box className='text-right'>
          {enrichments.length > 0 && <hr />}
          <Typography color={theme.ixoNewBlue} style={{ cursor: 'pointer' }} onClick={handleAddEntityClaimEnrichment}>
            + Add Enrichment
          </Typography>
        </Box>
      </Box>
    )
  }

  return (
    // @ts-ignore
    <Modal style={ModalStyles} isOpen={open} onRequestClose={onClose} contentLabel='Modal' ariaHideApp={false}>
      <CloseButton onClick={onClose}>
        <CloseIcon />
      </CloseButton>

      <ModalWrapper style={{ width: '70vw' }}>
        <ModalTitle>Claim Setup</ModalTitle>
        <ModalBody>
          <ModalRow>{renderClaimTemplate()}</ModalRow>
          <ModalRow>{renderClaimAgentRoles()}</ModalRow>
          <ModalRow>{renderClaimEvaluations()}</ModalRow>
          <ModalRow>{renderClaimApprovalCriteria()}</ModalRow>
          <ModalRow>{renderClaimEnrichments()}</ModalRow>
          <ModalRow style={{ justifyContent: 'flex-end' }}>
            <Button disabled={!formData} onClick={handleSubmit}>
              Continue
            </Button>
          </ModalRow>
        </ModalBody>
      </ModalWrapper>
    </Modal>
  )
}

export default ClaimSetupModal
