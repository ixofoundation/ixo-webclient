import React from 'react'
import { ProgressWrapper } from './Progress.styles'
import ApprovedTick from '../../../../assets/icons/ApprovedTick'

interface Props {
  question: any
  currentQuestionNo: any
  questionCount: any
  handleJumpToQuestion: (questionNo: number) => void
}

export const Progress: React.FunctionComponent<Props> = props => {
  const questions = new Array(props.questionCount)
    .fill(null)
    .map((u, i) => i + 1)

  return (
    <ProgressWrapper className="progress-wrapper">
      {questions.map(question => {
        return question === props.currentQuestionNo ? (
          <div className="progress-item active">
            {question}
            <span className="step-text">{props.question.title}</span>
          </div>
        ) : question < props.currentQuestionNo ? (
          <div
            className="progress-item completed"
            onClick={(): void => props.handleJumpToQuestion(question)}
          >
            <ApprovedTick width="8px" fill="#fff" />
          </div>
        ) : (
          <div className="progress-item">{question}</div>
        )
      })}
    </ProgressWrapper>
  )
}
