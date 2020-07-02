import React from 'react'
import SingleControlForm from '../../../../common/components/JsonForm/SingleControlForm/SingleControlForm'
import { FormControl } from '../../../../common/components/JsonForm/types'

interface Props {
  question: FormControl
  answer: {}
  currentQuestionNo: number
  questionCount: number
  handlePreviousClick: () => void
  handleNextClick: () => void
  handleFormDataChange: (formData: any) => void
}

const Question: React.FunctionComponent<Props> = ({
  question,
  currentQuestionNo,
  questionCount,
  answer,
  handlePreviousClick,
  handleNextClick,
  handleFormDataChange,
}) => {
  return (
    <SingleControlForm
      formData={answer}
      handleFormDataChange={handleFormDataChange}
      handlePreviousClick={handlePreviousClick}
      handleNextClick={handleNextClick}
      formControl={question}
      showPreviousButton={currentQuestionNo > 1}
      nextButtonText={questionCount === currentQuestionNo ? 'Finalise' : 'Next'}
    />
  )
}

export default Question
