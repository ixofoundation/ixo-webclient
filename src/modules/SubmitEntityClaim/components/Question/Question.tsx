import React from 'react'
import SingleControlForm from '../../../../common/components/JsonForm/SingleControlForm/SingleControlForm'
import { FormControl } from '../../../../common/components/JsonForm/types'

interface Props {
  question: FormControl
  currentQuestionNo: number
  questionCount: number
  handlePreviousClick: () => void
  handleNextClick: () => void
}

const Question: React.FunctionComponent<Props> = ({
  question,
  currentQuestionNo,
  questionCount,
  handlePreviousClick,
  handleNextClick,
}) => {
  return (
    <SingleControlForm
      handlePreviousClick={handlePreviousClick}
      handleNextClick={handleNextClick}
      formControl={question}
      showPreviousButton={currentQuestionNo > 1}
      nextButtonText={questionCount === currentQuestionNo ? 'Finalise' : 'Next'}
    />
  )
}

export default Question
