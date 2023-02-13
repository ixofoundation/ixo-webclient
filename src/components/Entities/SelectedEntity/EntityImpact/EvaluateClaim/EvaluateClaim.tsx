import React, { Dispatch } from 'react'
import moment from 'moment'
import { RootState } from 'redux/store'
import { connect } from 'react-redux'
import * as Toast from 'utils/toast'
import * as selectedEntitySelectors from 'redux/selectedEntity/selectedEntity.selectors'
import * as submitEntityClaimSelectors from 'redux/submitEntityClaim/submitEntityClaim.selectors'
import * as accountSelectors from 'redux/account/account.selectors'
import * as entityUtils from 'utils/entities'
import { QuestionForm } from 'types/entityClaims'

import { default as Steps } from './Components/Steps'
import EvaluateCard from './Components/EvaluateCard/EvaluateCard'
import {
  getClaim,
  saveComments,
  updateStatus,
  moveToNextStep,
  moveToStep,
} from '../../../../../redux/evaluateClaim/evaluateClaim.actions'
import { Layout, ActionButton, SubmitContainer, StepsContainer, DescriptionContainer } from './EvaluateClaim.styles'
import * as evaluateClaimSelectors from '../../../../../redux/evaluateClaim/evaluateClaim.selectors'
import { Spinner } from 'components/Spinner/Spinner'
import { EvaluateClaimStatus } from '../../../../../redux/evaluateClaim/evaluateClaim.types'
import ApproveClaim from './Components/ApproveStep/ApproveClaim'
import { AgentRole } from 'redux/account/account.types'
import { Agent } from 'types/entities'

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
  isEvaluated: boolean
  handleGetClaim: (claimId: string, projectDid: string, claimTemplateDid: string) => void
  handleSaveComments: (itemId: string, comments: string) => void
  handleUpdateStatus: (itemId: string, status: EvaluateClaimStatus) => void
  handleMoveToNextStep: () => void
  handleMoveToStep: (step: string) => void
}

interface States {
  rating: number
  notes: string
  includeComments: boolean
}

class EvaluateClaim extends React.Component<Props, States> {
  constructor(props: any) {
    super(props)
    this.state = {
      rating: 0,
      notes: '',
      includeComments: false,
    }
  }

  componentDidMount(): void {
    const { claimId } = this.props.match.params
    const { claimTemplateDid, entityDid, handleGetClaim } = this.props

    handleGetClaim(claimId, entityDid, claimTemplateDid)
  }

  handleRenderEvaluateCards = (): JSX.Element => {
    const { userDid, creatorDid, agents, claim, templateForms, isEvaluated, handleSaveComments, handleUpdateStatus } =
      this.props

    const isEvaluator = entityUtils.isUserInRolesOfEntity(userDid, creatorDid, agents, [AgentRole.Evaluator])

    return claim?.items?.map((item: any, key: any): JSX.Element => {
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
    })
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
    switch (claim?.stage) {
      case 'Approve':
        return this.handleRenderApproveSection()
      case 'Analysis':
      default:
        return this.handleRenderEvaluateCards()
    }
  }

  handleRenderApproveSection = (): JSX.Element => {
    const { claim, templateForms, entityDid } = this.props
    const { rating, notes, includeComments } = this.state
    return (
      <ApproveClaim
        claim={claim}
        template={templateForms}
        projectDid={entityDid}
        rating={rating}
        notes={notes}
        includeComments={includeComments}
        setRating={(value: number): void => this.setState({ rating: value })}
        setNotes={(value: string): void => this.setState({ notes: value })}
        setIncludeComments={(value: boolean): void => this.setState({ includeComments: value })}
      />
    )
  }

  validatedToSubmit = (): boolean => {
    const { claim } = this.props

    return claim?.items?.findIndex((item: any) => item.evaluation.status === '') === -1
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

  handleRenderSubmitContainer = (): JSX.Element => {
    const { handleMoveToNextStep } = this.props

    return (
      <SubmitContainer>
        <ActionButton className='btn-save mr-3' onClick={this.handleSaveProgress}>
          Save
        </ActionButton>
        <ActionButton className='btn-submit' disabled={!this.validatedToSubmit()} onClick={handleMoveToNextStep}>
          Submit
        </ActionButton>
      </SubmitContainer>
    )
  }

  render(): JSX.Element {
    const { isLoading, claim, userDid, creatorDid, agents, isEvaluated } = this.props

    const isEvaluator = entityUtils.isUserInRolesOfEntity(userDid, creatorDid, agents, [AgentRole.Evaluator])
    const steps = [
      {
        label: 'Analyse',
        number: 1,
        isActive: claim?.stage === 'Analyse',
        isCompleted: this.switchStepAndStage(claim?.stage) > 1,
      },
      {
        label: 'Enrich',
        number: 2,
        isActive: claim?.stage === 'Enrich',
        isCompleted: this.switchStepAndStage(claim?.stage) > 2,
        isDisabled: true,
      },
      {
        label: 'Approve',
        number: 3,
        isActive: claim?.stage === 'Approve',
        isCompleted: this.switchStepAndStage(claim?.stage) > 3,
        isDisabled: !isEvaluated,
      },
      {
        label: 'Issue',
        number: 4,
        isActive: claim?.stage === 'Issue',
        isCompleted: this.switchStepAndStage(claim?.stage) > 4,
        isDisabled: true,
      },
    ]

    if (isLoading) {
      return (
        <Layout>
          <div className='pt-5'>
            <Spinner info='Loading claim...' transparentBg />
          </div>
        </Layout>
      )
    }

    return (
      <Layout>
        {this.handleRenderDescription()}
        <StepsContainer>
          <Steps steps={steps} onClickStep={this.handleClickStep} />
          {isEvaluator && !isEvaluated && claim?.stage !== 'Approve' && this.handleRenderSubmitContainer()}
        </StepsContainer>
        {this.handleRenderContent()}
        {isEvaluator && !isEvaluated && claim?.stage !== 'Approve' && this.handleRenderSubmitContainer()}
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
  isEvaluated: evaluateClaimSelectors.selectIsEvaluated(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleGetClaim: (claimId: string, projectDid: string, claimTemplateDid: string): void =>
    dispatch(getClaim(claimId, projectDid, claimTemplateDid)),
  handleSaveComments: (itemId: string, comments: string): void => dispatch(saveComments(itemId, comments)),
  handleUpdateStatus: (itemId: string, status: EvaluateClaimStatus): void => dispatch(updateStatus(itemId, status)),
  handleMoveToNextStep: (): void => dispatch(moveToNextStep()),
  handleMoveToStep: (step: string): void => dispatch(moveToStep(step)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EvaluateClaim)
