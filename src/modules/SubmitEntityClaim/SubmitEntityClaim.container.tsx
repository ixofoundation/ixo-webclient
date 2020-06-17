import React, { Dispatch } from 'react'
import { connect } from 'react-redux'
import { RootState } from 'src/common/redux/types'
import { Instructions } from './components/Instructions/Instructions'
import { Container } from './SubmitEntityClaim.container.styles'
import QuestionComponent from './components/Question/Question'
import { Question } from './types'
import * as submitEntityClaimSelectors from './SubmitEntityClaim.selectors'
import {
  goToNextQuestion,
  goToPreviousQuestion,
} from './SubmitEntityClaim.actions'
import { ActionWrapper } from '../../components/project/ControlPanel/Actions/Actions.styles'

interface Props {
  currentQuestion: Question
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
      currentQuestion: {
        questionId,
        title,
        description,
        label,
        type,
        required,
        control,
        placeholder,
      },
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
            <QuestionComponent
              handlePreviousClick={handlePreviousClick}
              handleNextClick={handleNextClick}
              questionId={questionId}
              title={title}
              description={description}
              label={label}
              type={type}
              required={required}
              control={control}
              placeholder={placeholder}
              showPreviousButton={currentQuestionNo > 1}
              nextButtonText={
                questionCount === currentQuestionNo ? 'Finalise' : 'Next'
              }
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
