import React, { Dispatch } from 'react'
import { RootState } from 'common/redux/types'
import { connect } from 'react-redux'
import * as entityClaimsSelectors from 'modules/Entities/SelectedEntity/EntityImpact/EntityClaims/EntityClaims.selectors'
import Steps from './components/Steps'
import Exclamation from 'assets/icons/Exclamation'
import EvaluateCard from './components/EvaluateCard/EvaluateCard'
import {
  getClaim
} from './EvaluateClaim.actions'

import {
  Layout,
  ActionButton,
  SubmitContainer,
  StepsContainer
} from './EvaluateClaim.styles'

interface Props {
  getClaim: (claimId: string, projectDid: string) => void
}

class EvaluateClaim extends React.Component<Props> {
  componentDidMount() {
    const { getClaim } = this.props;
    getClaim('5fbe9c74b7695300249071a8', 'did:ixo:JG5WkyVPNUawJ1awFrU2Lu')
  }

  handleGoToQuestionClick = (step): void => {

  }

  handleRenderSteps = (): void => {

  }

  render(): JSX.Element {
    const steps = [
      {
        label: 'Analyse',
        number: 1,
        isActive: true,
      },{
        label: 'Enrich',
        number: 2,
        isActive: false,
      },{
        label: 'Approve',
        number: 3,
        isActive: false,
      },{
        label: 'Issue',
        number: 4,
        isActive: false,
      },
    ];

    return (
      <Layout>
        <StepsContainer>
          <Steps
            steps={ steps }
          />
          <SubmitContainer>
            <ActionButton
              className="btn-save mr-3"
            >
              Save
            </ActionButton>
            <ActionButton
              className="btn-submit"
            >
              Submit
            </ActionButton>
            <Exclamation />
          </SubmitContainer>
        </StepsContainer>
        <EvaluateCard />
        <SubmitContainer className="mt-5">
            <ActionButton
              className="btn-save mr-3"
            >
              Save
            </ActionButton>
            <ActionButton
              className="btn-submit"
            >
              Submit
            </ActionButton>
        </SubmitContainer>
      </Layout>
    )
  }
}

const mapStateToProps = (state: RootState): any => ({
  claims: entityClaimsSelectors.selectEntityClaims(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  getClaim: (claimId: string, projectDid: string): void =>
    dispatch(getClaim(claimId, projectDid)),
})


export default connect(mapStateToProps, mapDispatchToProps)(EvaluateClaim);