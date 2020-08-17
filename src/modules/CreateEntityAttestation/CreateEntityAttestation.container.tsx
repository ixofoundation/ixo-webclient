import React, { Dispatch } from 'react'
import { connect } from 'react-redux'
import CreateEntityBase, {
  CreateEntityBaseProps,
} from '../CreateEntity/components/CreateEntityBase/CreateEntityBase'
import { FormData, ControlType } from '../../common/components/JsonForm/types'
import { RootState } from '../../common/redux/types'
import FormCardWrapper from '../../common/components/Wrappers/FormCardWrapper/FormCardWrapper'
import ClaimInfoCard from './components/ClaimInfoCard/ClaimInfoCard'
import { ClaimInfo, Question } from './types'
import {
  updateClaimInfo,
  addShortTextQuestion,
  addLongTextQuestion,
  updateShortTextQuestion,
  updateLongTextQuestion,
  updateAnswerRequired,
} from './CreateEntityAttestation.actions'
import * as attestationSelectors from './CreateEntityAttestation.selectors'
import AddQuestionBar from './components/AddQuestionBar/AddQuestionBar'
import QuestionCardWrapper from './components/QuestionCardWrapper/QuestionCardWrapper'
import ShortTextQuestion from './components/ShortTextQuestion/ShortTextQuestion'

interface Props extends CreateEntityBaseProps {
  claimInfo: ClaimInfo
  questions: Question[]
  handleUpdateClaimInfo: (formData: FormData) => void
  handleAddShortTextQuestion: () => void
  handleUpdateShortTextQuestion: (id: string, formData: FormData) => void
  handleAddLongTextQuestion: () => void
  handleUpdateAnswerRequired: (id: string, required: boolean) => void
}

class CreateEntityAttestation extends CreateEntityBase<Props> {
  renderClaimInfo = (): JSX.Element => {
    this.cardRefs['claiminfo'] = React.createRef()

    const {
      claimInfo: { title, shortDescription },
      handleUpdateClaimInfo,
    } = this.props

    return (
      <FormCardWrapper title="Claim Info" showAddSection={false}>
        <ClaimInfoCard
          ref={this.cardRefs['claiminfo']}
          handleUpdateContent={handleUpdateClaimInfo}
          handleSubmitted={(): void => this.props.handleValidated('claiminfo')}
          handleError={(errors): void =>
            this.props.handleValidationError('claiminfo', errors)
          }
          title={title}
          shortDescription={shortDescription}
        />
      </FormCardWrapper>
    )
  }

  renderQuestions = (): JSX.Element => {
    const { questions } = this.props

    return (
      <>
        {questions.map((question) => {
          const { id } = question

          this.cardRefs[id] = React.createRef()

          switch (question.control) {
            case ControlType.Text:
              return this.renderShortTextQuestion(question)
          }

          return <></>
        })}
      </>
    )
  }

  renderShortTextQuestion = (question: Question): JSX.Element => {
    const { handleUpdateShortTextQuestion } = this.props
    const { id, title, description, label, required } = question

    return (
      <QuestionCardWrapper
        title="Short Text"
        required={required}
        handleDuplicate={(): void => console.log('duplicate')}
        handleToggleRequire={(): void =>
          this.props.handleUpdateAnswerRequired(id, !required)
        }
        handleDelete={(): void => console.log('handldelete')}
      >
        <ShortTextQuestion
          ref={this.cardRefs[id]}
          handleUpdateContent={(formData): void =>
            handleUpdateShortTextQuestion(id, formData)
          }
          handleSubmitted={(): void => console.log('submitted')}
          handleError={(errors): void =>
            this.props.handleValidationError(id, errors)
          }
          title={title}
          description={description}
          label={label}
        />
      </QuestionCardWrapper>
    )
  }

  addQuestion = (controlType: ControlType): void => {
    const { handleAddShortTextQuestion, handleAddLongTextQuestion } = this.props

    switch (controlType) {
      case ControlType.Text:
        handleAddShortTextQuestion()
        break
      case ControlType.TextArea:
        handleAddLongTextQuestion()
        break
    }
  }

  render(): JSX.Element {
    return (
      <>
        {this.renderClaimInfo()}
        {this.renderQuestions()}
        <AddQuestionBar addQuestion={this.addQuestion} />
      </>
    )
  }
}

const mapStateToProps = (state: RootState): any => ({
  claimInfo: attestationSelectors.selectClaimInfo(state),
  questions: attestationSelectors.selectQuestions(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleUpdateClaimInfo: (formData: FormData): void =>
    dispatch(updateClaimInfo(formData)),
  handleAddShortTextQuestion: (): void => dispatch(addShortTextQuestion()),
  handleAddLongTextQuestion: (): void => dispatch(addLongTextQuestion()),
  handleUpdateShortTextQuestion: (id: string, formData: FormData): void =>
    dispatch(updateShortTextQuestion(id, formData)),
  handleUpdateLongTextQuestion: (id: string, formData: FormData): void =>
    dispatch(updateLongTextQuestion(id, formData)),
  handleUpdateAnswerRequired: (id: string, required: boolean): void =>
    dispatch(updateAnswerRequired(id, required)),
})

export const CreateEntityAttestationConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateEntityAttestation)
