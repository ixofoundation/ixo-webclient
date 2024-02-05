import React, { useEffect, useState } from 'react'
import * as Modal from 'react-modal'
import { ModalStyles, CloseButton } from 'components/Modals/styles'
import { ReactComponent as CloseIcon } from 'assets/images/icon-close.svg'
import { Box, FlexBox } from 'components/App/App.styles'
import { Button } from 'pages/CreateEntity/Components'
import { Typography } from 'components/Typography'
import {
  TClaimApprovalCriterion,
  TClaimEnrichment,
  TClaimEvaluation,
  TEntityClaimEvaluationMethodModel,
} from 'types/entities'
import { FormData } from 'components/JsonForm/types'
import { v4 as uuidv4 } from 'uuid'
import { omitKey } from 'utils/objects'
import EvaluationCard from './EvaluationCard'
import ApprovalCriterionCard from './ApprovalCriterionCard'
import EnrichmentCard from './EnrichmentCard'

interface Props {
  open: boolean
  claimEvaluationMethod: TEntityClaimEvaluationMethodModel
  onClose: () => void
  onChange: (claimEvaluationMethod: TEntityClaimEvaluationMethodModel) => void
}

const ClaimEvaluationMethodSetupModal: React.FC<Props> = ({
  open,
  claimEvaluationMethod,
  onClose,
  onChange,
}): JSX.Element => {
  const [formData, setFormData] = useState<FormData | undefined>(undefined)

  useEffect(() => {
    setFormData(claimEvaluationMethod)
  }, [claimEvaluationMethod])

  const handleContinue = (): void => {
    formData && onChange(formData as TEntityClaimEvaluationMethodModel)
    onClose()
  }

  const renderClaimEvaluations = (): JSX.Element => {
    const evaluations: TClaimEvaluation[] = Object.values(formData?.evaluations ?? {})
    const handleAddEntityClaimEvaluation = (): void => {
      const id = uuidv4()
      setFormData((pre) => ({
        ...pre,
        evaluations: { ...pre?.evaluations, [id]: { id } },
      }))
    }
    const handleUpdateEntityClaimEvaluation = (id: string, data: FormData): void => {
      setFormData((pre) => ({
        ...pre,
        evaluations: { ...pre?.evaluations, [id]: { id, ...data } },
      }))
    }
    const handleRemoveEntityClaimEvaluation = (id: string): void => {
      setFormData((pre) => ({
        ...pre,
        evaluations: omitKey(pre?.evaluations, id),
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
          <Typography color='blue' className='cursor-pointer' onClick={handleAddEntityClaimEvaluation}>
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
        approvalCriteria: { ...pre?.approvalCriteria, [id]: { id } },
      }))
    }
    const handleUpdateEntityClaimApprovalCriterion = (id: string, data: FormData): void => {
      setFormData((pre) => ({
        ...pre,
        approvalCriteria: { ...pre?.approvalCriteria, [id]: { id, ...data } },
      }))
    }
    const handleRemoveEntityClaimApprovalCriterion = (id: string): void => {
      setFormData((pre) => ({
        ...pre,
        approvalCriteria: omitKey(pre?.approvalCriteria, id),
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
          <Typography color='blue' className='cursor-pointer' onClick={handleAddEntityClaimApprovalCriterion}>
            + Add Criteria
          </Typography>
        </Box>
      </Box>
    )
  }

  const renderClaimEnrichments = (): JSX.Element => {
    const enrichments: TClaimEnrichment[] = Object.values(formData?.enrichments ?? {})
    const handleAddEntityClaimEnrichment = (): void => {
      const id = uuidv4()
      setFormData((pre) => ({
        ...pre,
        enrichments: { ...pre?.enrichments, [id]: { id } },
      }))
    }
    const handleUpdateEntityClaimEnrichment = (id: string, data: FormData): void => {
      setFormData((pre) => ({
        ...pre,
        enrichments: { ...pre?.enrichments, [id]: { id, ...data } },
      }))
    }
    const handleRemoveEntityClaimEnrichment = (id: string): void => {
      setFormData((pre) => ({
        ...pre,
        enrichments: omitKey(pre?.enrichments, id),
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
          <Typography color='blue' className='cursor-pointer' onClick={handleAddEntityClaimEnrichment}>
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

      <FlexBox $direction='column' $gap={8} width='700px'>
        <FlexBox $justifyContent='space-between' $alignItems='center'>
          <Typography size='2xl'>Select a Verifiable Claim Protocol</Typography>
        </FlexBox>
        <FlexBox width='100%' $direction='column' $alignItems='end'>
          {renderClaimEvaluations()}
          {renderClaimApprovalCriteria()}
          {renderClaimEnrichments()}
        </FlexBox>
        <FlexBox className='w-100' $justifyContent='flex-end' $gap={5}>
          <Button disabled={!formData} onClick={handleContinue}>
            Continue
          </Button>
        </FlexBox>
      </FlexBox>
    </Modal>
  )
}

export default ClaimEvaluationMethodSetupModal
