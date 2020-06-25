import React, { Dispatch } from 'react'
import { connect } from 'react-redux'
import { RootState } from 'src/common/redux/types'
import Instructions from './components/Instructions/Instructions'
import { Hero } from './components/Hero/Hero'
import Question from './components/Question/Question'
import { Container } from './SubmitEntityClaim.container.styles'
import { FormControl } from '../../common/components/JsonForm/types'
import * as submitEntityClaimSelectors from './SubmitEntityClaim.selectors'
import * as accountSelectors from '../Account/Account.selectors'
import {
  goToNextQuestion,
  goToPreviousQuestion,
} from './SubmitEntityClaim.actions'
import ControlPanel from '../../common/components/ControlPanel/ControlPanel'
import CellControlPanelSchema from '../../common/components/ControlPanel/schema/Cell.schema.json'

// TODO - hookup redux for project data

interface Props {
  userDid: string
  currentQuestion: FormControl
  currentQuestionNo: number
  questionCount: number
  handlePreviousClick: () => void
  handleNextClick: () => void
}

interface State {
  showInstructions: boolean
}

class SubmitEntityClaim extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      showInstructions: true, // temp
    }
  }

  handleToggleInstructions = (): void => {
    this.setState({
      showInstructions: !this.state.showInstructions,
    })
  }

  render(): JSX.Element {
    const {
      userDid,
      currentQuestion,
      currentQuestionNo,
      questionCount,
      handlePreviousClick,
      handleNextClick,
    } = this.props
    return (
      <>
        <Hero />
        <div className="container-fluid">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <Container>
                  {this.state.showInstructions ? (
                    <Instructions
                      toggleInstructions={this.handleToggleInstructions}
                    />
                  ) : (
                    <Question
                      handlePreviousClick={handlePreviousClick}
                      handleNextClick={handleNextClick}
                      question={currentQuestion}
                      currentQuestionNo={currentQuestionNo}
                      questionCount={questionCount}
                    />
                  )}
                </Container>
              </div>
              <div className="col-lg-4">
                <ControlPanel
                  schema={CellControlPanelSchema}
                  entityDid={'123'}
                  userDid={userDid}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state: RootState): Record<string, any> => ({
  currentQuestion: submitEntityClaimSelectors.selectCurrentQuestion(state),
  currentQuestionNo: submitEntityClaimSelectors.selectCurrentQuestionNo(state),
  questionCount: submitEntityClaimSelectors.selectQuestionCount(state),
  userDid: accountSelectors.selectUserDid(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handlePreviousClick: (): void => dispatch(goToPreviousQuestion()),
  handleNextClick: (): void => dispatch(goToNextQuestion()),
})

export const SubmitEntityClaimConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubmitEntityClaim)
