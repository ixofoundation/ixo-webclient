import React from 'react'
import { debounce } from 'debounce'
import SingleControlForm from 'components/JsonForm/SingleControlForm/SingleControlForm'
import { ButtonGroup } from 'components/JsonForm/JsonForm.styles'
import { QuestionForm } from '../../../../../../types/entityClaims'
import { customControls } from 'components/JsonForm/types'

interface Props {
  question: QuestionForm
  answer: any
  savingAnswer: boolean
  currentQuestionNo: number
  questionCount: number
  answersComplete: boolean
  handlePreviousClick: () => void
  handleNextClick: () => void
  handleFormDataChange: (formData: any) => void
}

const Question: React.FunctionComponent<Props> = ({
  question,
  currentQuestionNo,
  questionCount,
  answer,
  savingAnswer,
  answersComplete,
  handlePreviousClick,
  handleNextClick,
  handleFormDataChange,
}) => {
  const handleFormDataChangeDebounce = debounce(handleFormDataChange, 500)

  const id = Object.keys(question.uiSchema)[0]
  const widgetName = question.uiSchema[id]['ui:widget']
  const widget = customControls[widgetName] ? customControls[widgetName] : widgetName

  const uiSchema = {
    ...question.uiSchema,
    [id]: {
      ...question.uiSchema[id],
      'ui:widget': widget,
      'ui:uploading': savingAnswer,
    },
  }

  return (
    <SingleControlForm
      formData={answer}
      handleFormDataChange={(formData): void => handleFormDataChangeDebounce(formData)}
      handleSubmit={handleNextClick}
      schema={question.schema}
      uiSchema={uiSchema}
    >
      <ButtonGroup>
        {currentQuestionNo > 1 && !answersComplete && (
          <button type='button' onClick={handlePreviousClick}>
            Previous
          </button>
        )}
        <button type='submit' className='submitForm'>
          {answersComplete ? 'Update' : questionCount === currentQuestionNo ? 'Finalise' : 'Next'}
        </button>
      </ButtonGroup>
    </SingleControlForm>
  )
}

export default Question
