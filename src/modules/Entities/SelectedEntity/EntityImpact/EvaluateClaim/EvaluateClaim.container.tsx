import React, { Dispatch } from 'react'
import { RootState } from 'common/redux/types'
import { connect } from 'react-redux'
import * as Toast from 'common/utils/Toast'
import * as selectedEntitySelectors from 'modules/Entities/SelectedEntity/SelectedEntity.selectors'
import * as submitEntityClaimSelectors from 'modules/EntityClaims/SubmitEntityClaim/SubmitEntityClaim.selectors'
import { QuestionForm } from 'modules/EntityClaims/types'

import Steps from './components/Steps'
import EvaluateCard from './components/EvaluateCard/EvaluateCard'
import {
  getClaim,
  saveComments,
  updateStatus,
  moveToNextStep,
} from './EvaluateClaim.actions'
import {
  Layout,
  ActionButton,
  SubmitContainer,
  StepsContainer,
} from './EvaluateClaim.styles'
import * as evaluateClaimSelectors from './EvaluateClaim.selectors'
import { Spinner } from 'common/components/Spinner'
import { EvaluateClaimStatus } from './types'
import ApproveClaim from './components/ApproveStep/ApproveClaim'

interface Props {
  isLoading: boolean
  questions: QuestionForm[]
  entityDid: string
  claimTemplateDid: string
  match: any
  evaluateClaim: any
  templateForms: any
  claim: any
  handleGetClaim: (
    claimId: string,
    projectDid: string,
    claimTemplateDid: string,
  ) => void
  handleSaveComments: (itemId: string, comments: string) => void
  handleUpdateStatus: (itemId: string, status: EvaluateClaimStatus) => void
  handleMoveToNextStep: () => void
}

class EvaluateClaim extends React.Component<Props> {
  componentDidMount(): void {
    const { claimId } = this.props.match.params
    const { claimTemplateDid, entityDid, handleGetClaim } = this.props

    handleGetClaim(claimId, entityDid, claimTemplateDid)
  }

  handleRenderEvaluateCards = (): JSX.Element => {
    const {
      claim,
      templateForms,
      handleSaveComments,
      handleUpdateStatus,
    } = this.props

    return claim.items.map(
      (item, key): JSX.Element => {
        return (
          <EvaluateCard
            key={key}
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
    switch (claim.stage) {
      case 'Approve':
        return this.handleRenderApproveSection()
      default:
        return this.handleRenderEvaluateCards()
    }
  }

  handleRenderApproveSection = (): JSX.Element => {
    const { claim, templateForms } = this.props
    return <ApproveClaim claim={claim} template={templateForms} />
  }

  validatedToSubmit = (): boolean => {
    const { claim } = this.props

    return claim.items.findIndex((item) => item.evaluation.status === '') == -1
  }

  render(): JSX.Element {
    const { isLoading, claim, handleMoveToNextStep } = this.props

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
        isActive:
          claim?.stage === 'Analyse' ||
          claim?.stage === 'Approve' ||
          claim?.stage === 'Enrich',
      },
      {
        label: 'Enrich',
        number: 2,
        isActive: claim?.stage === 'Enrich' || claim?.stage === 'Approve',
      },
      {
        label: 'Approve',
        number: 3,
        isActive: claim?.stage === 'Approve',
      },
      {
        label: 'Issue',
        number: 4,
        isActive: claim?.stage === 'Issue',
      },
    ]

    return (
      <Layout>
        <StepsContainer>
          <Steps steps={steps} />
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
        </StepsContainer>
        {this.handleRenderContent()}
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
})

export default connect(mapStateToProps, mapDispatchToProps)(EvaluateClaim)
