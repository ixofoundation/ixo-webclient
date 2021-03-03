import React, { Dispatch } from 'react'
import { RootState } from 'common/redux/types'
import { connect } from 'react-redux'
import Steps from './components/Steps'
import Exclamation from 'assets/icons/Exclamation'
import EvaluateCard from './components/EvaluateCard/EvaluateCard'
import { getClaim } from './EvaluateClaim.actions'

import {
  Layout,
  ActionButton,
  SubmitContainer,
  StepsContainer,
} from './EvaluateClaim.styles'
import * as selectedEntitySelectors from 'modules/Entities/SelectedEntity/SelectedEntity.selectors'
import * as submitEntityClaimSelectors from 'modules/EntityClaims/SubmitEntityClaim/SubmitEntityClaim.selectors'
import { QuestionForm } from 'modules/EntityClaims/types'
import * as evaluateClaimSelectors from './EvaluateClaim.selectors'
import { Spinner } from 'common/components/Spinner'

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
}

class EvaluateClaim extends React.Component<Props> {
  componentDidMount(): void {
    const { claimId } = this.props.match.params
    const { claimTemplateDid, entityDid, handleGetClaim } = this.props

    handleGetClaim(claimId, entityDid, claimTemplateDid)
  }

  handleRenderEvaluateCards = (): JSX.Element => {
    const { claim, templateForms } = this.props

    return claim.items.map(
      (item, key): JSX.Element => {
        return (
          <EvaluateCard key={key} evaluation={item} template={templateForms} />
        )
      },
    )
  }

  render(): JSX.Element {
    const { isLoading } = this.props

    const steps = [
      {
        label: 'Analyse',
        number: 1,
        isActive: true,
      },
      {
        label: 'Enrich',
        number: 2,
        isActive: false,
      },
      {
        label: 'Approve',
        number: 3,
        isActive: false,
      },
      {
        label: 'Issue',
        number: 4,
        isActive: false,
      },
    ]

    if (isLoading) {
      return (
        <Layout>
          <div className="pt-5">
            <Spinner info="Loading claim..." transparentBg />
          </div>
        </Layout>
      )
    }

    return (
      <Layout>
        <StepsContainer>
          <Steps steps={steps} />
          <SubmitContainer>
            <ActionButton className="btn-save mr-3">Save</ActionButton>
            <ActionButton className="btn-submit">Submit</ActionButton>
            <Exclamation />
          </SubmitContainer>
        </StepsContainer>
        {this.handleRenderEvaluateCards()}
        <SubmitContainer className="mt-5">
          <ActionButton className="btn-save mr-3">Save</ActionButton>
          <ActionButton className="btn-submit">Submit</ActionButton>
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
})

export default connect(mapStateToProps, mapDispatchToProps)(EvaluateClaim)
