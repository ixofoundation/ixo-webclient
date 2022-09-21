import React, { Dispatch } from 'react'
import moment from 'moment'
import { RootState } from 'common/redux/types'
import { connect } from 'react-redux'
import * as Toast from 'common/utils/Toast'
import * as selectedEntitySelectors from 'modules/Entities/SelectedEntity/SelectedEntity.selectors'
import * as submitEntityClaimSelectors from 'modules/EntityClaims/SubmitEntityClaim/SubmitEntityClaim.selectors'
import * as accountSelectors from 'modules/Account/Account.selectors'
import * as entityUtils from 'modules/Entities/Entities.utils'
import { QuestionForm } from 'modules/EntityClaims/types'

import Steps from './components/Steps'
import EvaluateCard from './components/EvaluateCard/EvaluateCard'
import {
  getClaim,
  saveComments,
  updateStatus,
  moveToNextStep,
  moveToStep,
} from './EvaluateClaim.actions'
import {
  Layout,
  ActionButton,
  SubmitContainer,
  StepsContainer,
  DescriptionContainer,
} from './EvaluateClaim.styles'
import * as evaluateClaimSelectors from './EvaluateClaim.selectors'
import { Spinner } from 'common/components/Spinner'
import { EvaluateClaimStatus } from './types'
import ApproveClaim from './components/ApproveStep/ApproveClaim'
import { AgentRole } from 'modules/Account/types'
import { Agent } from 'modules/Entities/types'

interface Props {
  isLoading: boolean
  questions: QuestionForm[]
  entityDid: string
  claimTemplateDid: string
  match: any
  evaluateClaim: any
  templateForms: any
  claim: any
  userDid: string
  creatorDid: string
  agents: Agent[]
  evaluator: any
  handleGetClaim: (
    claimId: string,
    projectDid: string,
    claimTemplateDid: string,
  ) => void
  handleSaveComments: (itemId: string, comments: string) => void
  handleUpdateStatus: (itemId: string, status: EvaluateClaimStatus) => void
  handleMoveToNextStep: () => void
  handleMoveToStep: (step: string) => void
}

class EvaluateClaim extends React.Component<Props> {
  componentDidMount(): void {
    const { claimId } = this.props.match.params
    const { claimTemplateDid, entityDid, handleGetClaim } = this.props

    handleGetClaim(claimId, entityDid, claimTemplateDid)
  }

  handleRenderEvaluateCards = (): JSX.Element => {
    const {
      userDid,
      creatorDid,
      agents,
      claim,
      templateForms,
      evaluator,
      handleSaveComments,
      handleUpdateStatus,
    } = this.props

    const isEvaluator = entityUtils.isUserInRolesOfEntity(
      userDid,
      creatorDid,
      agents,
      [AgentRole.Evaluator],
    )
    const isEvaluated = evaluator?.status ?? undefined

    return claim?.items?.map(
      (item, key): JSX.Element => {
        return (
          <EvaluateCard
            key={key}
            canUpdate={isEvaluator && !isEvaluated}
            claimItem={item}
            template={templateForms}
            handleSaveComments={handleSaveComments}
            handleUpdateStatus={handleUpdateStatus}
          />
        )
      },
    )
  }

  handleSaveProgress = (): void => {
    const { claim } = this.props
    try {
      localStorage.setItem(claim.txHash, JSON.stringify(claim))
      Toast.successToast(`Current evaluation progress saved!`)
    } catch (e) {
      Toast.errorToast(`There was an error while saving your progress.`)
    }
  }

  handleRenderContent = (): JSX.Element => {
    const { claim } = this.props
    // steps [`Analysis`,`Enrichment`,`Approval`,`History`]
    switch (claim.stage) {
      case 'Approve':
        return this.handleRenderApproveSection()
      case 'Analysis':
      default:
        return this.handleRenderEvaluateCards()
    }
  }

  handleRenderApproveSection = (): JSX.Element => {
    const { claim, templateForms, entityDid } = this.props
    return (
      <ApproveClaim
        claim={claim}
        template={templateForms}
        projectDid={entityDid}
      />
    )
  }

  validatedToSubmit = (): boolean => {
    const { claim } = this.props

    return (
      claim?.items?.findIndex((item) => item.evaluation.status === '') === -1
    )
  }

  handleClickStep = (stepNumber: number): void => {
    const { handleMoveToStep } = this.props
    const currentStage = this.switchStepAndStage(stepNumber)

    if (currentStage === 'Analyse' || currentStage === 'Approve') {
      handleMoveToStep(String(this.switchStepAndStage(stepNumber)))
    }
  }

  switchStepAndStage = (value: any): string | number => {
    switch (value) {
      case 'Analyse':
        return 1
      case 'Enrich':
        return 2
      case 'Approve':
        return 3
      case 'Issue':
        return 4
      case 1:
        return 'Analyse'
      case 2:
        return 'Enrich'
      case 3:
        return 'Approve'
      default:
        return 'Issue'
    }
  }

  handleRenderDescription = (): JSX.Element => {
    const { claim } = this.props
    return (
      <DescriptionContainer>
        {moment(claim?._created).format('DD/MM/YYYY')}
        <br />
        Submitted by {claim?._creator}
      </DescriptionContainer>
    )
  }

  render(): JSX.Element {
    const {
      isLoading,
      claim,
      userDid,
      creatorDid,
      agents,
      handleMoveToNextStep,
    } = this.props

    const isEvaluator = entityUtils.isUserInRolesOfEntity(
      userDid,
      creatorDid,
      agents,
      [AgentRole.Evaluator],
    )

    const isCreator = userDid === creatorDid

    if (isLoading) {
      return (
        <Layout>
          <div className="pt-5">
            <Spinner info="Loading claim..." transparentBg />
          </div>
        </Layout>
      )
    }

    const steps = [
      {
        label: 'Analyse',
        number: 1,
        isActive: claim.stage === 'Analyse',
        isCompleted: this.switchStepAndStage(claim.stage) > 1,
      },
      {
        label: 'Enrich',
        number: 2,
        isActive: claim.stage === 'Enrich',
        isCompleted: this.switchStepAndStage(claim.stage) > 2,
        isDisabled: true,
      },
      {
        label: 'Approve',
        number: 3,
        isActive: claim.stage === 'Approve',
        isCompleted: this.switchStepAndStage(claim.stage) > 3,
      },
      {
        label: 'Issue',
        number: 4,
        isActive: claim.stage === 'Issue',
        isCompleted: this.switchStepAndStage(claim.stage) > 4,
        isDisabled: true,
      },
    ]

    return (
      <Layout>
        {this.handleRenderDescription()}
        <StepsContainer>
          <Steps steps={steps} onClickStep={this.handleClickStep} />
          {isEvaluator && !isCreator && (
            <SubmitContainer>
              <ActionButton
                className="btn-save mr-3"
                onClick={this.handleSaveProgress}
              >
                Save
              </ActionButton>
              <ActionButton
                className="btn-submit"
                disabled={!this.validatedToSubmit()}
                onClick={handleMoveToNextStep}
              >
                Submit
              </ActionButton>
              {/* <Exclamation /> */}
            </SubmitContainer>
          )}
        </StepsContainer>
        {this.handleRenderContent()}
        {isEvaluator && !isCreator && (
          <SubmitContainer className="mt-5">
            <ActionButton
              className="btn-save mr-3"
              onClick={this.handleSaveProgress}
            >
              Save
            </ActionButton>
            <ActionButton
              className="btn-submit"
              disabled={!this.validatedToSubmit()}
              onClick={handleMoveToNextStep}
            >
              Submit
            </ActionButton>
          </SubmitContainer>
        )}
      </Layout>
    )
  }
}

const mapStateToProps = (state: RootState): any => ({
  questions: submitEntityClaimSelectors.selectQuestions(state),
  claimTemplateDid: selectedEntitySelectors.selectEntityClaimTemplateId(state),
  entityDid: selectedEntitySelectors.selectEntityDid(state),
  evaluateClaim: evaluateClaimSelectors.selectEvaluateClaim(state),
  isLoading: evaluateClaimSelectors.selectIsLoading(state),
  claim: evaluateClaimSelectors.selectClaim(state),
  templateForms: evaluateClaimSelectors.selectTemplateForms(state),
  userDid: accountSelectors.selectUserDid(state),
  creatorDid: selectedEntitySelectors.selectEntityCreator(state),
  agents: selectedEntitySelectors.selectEntityAgents(state),
  evaluator: evaluateClaimSelectors.selectEvaluator(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleGetClaim: (
    claimId: string,
    projectDid: string,
    claimTemplateDid: string,
  ): void => dispatch(getClaim(claimId, projectDid, claimTemplateDid)),
  handleSaveComments: (itemId: string, comments: string): void =>
    dispatch(saveComments(itemId, comments)),
  handleUpdateStatus: (itemId: string, status: EvaluateClaimStatus): void =>
    dispatch(updateStatus(itemId, status)),
  handleMoveToNextStep: (): void => dispatch(moveToNextStep()),
  handleMoveToStep: (step: string): void => dispatch(moveToStep(step)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EvaluateClaim)
