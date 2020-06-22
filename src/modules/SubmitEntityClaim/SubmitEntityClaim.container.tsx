import React, { Dispatch } from 'react'
import { connect } from 'react-redux'
import { RootState } from 'src/common/redux/types'
import Instructions from './components/Instructions/Instructions'
import Question from './components/Question/Question'
import { Container } from './SubmitEntityClaim.container.styles'
import { FormControl } from '../../common/components/JsonForm/types'
import * as submitEntityClaimSelectors from './SubmitEntityClaim.selectors'
import {
  goToNextQuestion,
  goToPreviousQuestion,
} from './SubmitEntityClaim.actions'
import { ActionWrapper } from '../../components/project/ControlPanel/Actions/Actions.styles'

interface Props {
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
      currentQuestion,
      currentQuestionNo,
      questionCount,
      handlePreviousClick,
      handleNextClick,
    } = this.props
    return (
      <ActionWrapper className="open">
        <Container>
          {this.state.showInstructions ? (
            <Instructions toggleInstructions={this.handleToggleInstructions} />
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
      </ActionWrapper>
    )
  }
}

const mapStateToProps = (state: RootState): Record<string, any> => ({
  currentQuestion: submitEntityClaimSelectors.selectCurrentQuestion(state),
  currentQuestionNo: submitEntityClaimSelectors.selectCurrentQuestionNo(state),
  questionCount: submitEntityClaimSelectors.selectQuestionCount(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handlePreviousClick: (): void => dispatch(goToPreviousQuestion()),
  handleNextClick: (): void => dispatch(goToNextQuestion()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SubmitEntityClaim)
