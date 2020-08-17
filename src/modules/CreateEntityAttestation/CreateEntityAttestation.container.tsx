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
import { questionTypeMap } from './strategy-map'
import {
  updateClaimInfo,
  addShortTextQuestion,
  addLongTextQuestion,
  updateShortTextQuestion,
  updateLongTextQuestion,
  addSingleDateSelectorQuestion,
  updateSingleDateSelectorQuestion,
  addDateRangeSelectorQuestion,
  updateDateRangeSelectorQuestion,
  updateAnswerRequired,
  copyQuestion,
  removeQuestion,
  validated,
  validationError,
} from './CreateEntityAttestation.actions'
import * as attestationSelectors from './CreateEntityAttestation.selectors'
import AddQuestionBar from './components/AddQuestionBar/AddQuestionBar'
import QuestionCardWrapper from './components/QuestionCardWrapper/QuestionCardWrapper'
import ShortTextQuestion from './components/ShortTextQuestion/ShortTextQuestion'
import SingleDateSelectorQuestion from './components/SingleDateSelectorQuestion/SingleDateSelectorQuestion'
import DateRangeSelectorQuestion from './components/DateRangeSelectorQuestion/DateRangeSelectorQuestion'

interface Props extends CreateEntityBaseProps {
  claimInfo: ClaimInfo
  questions: Question[]
  handleUpdateClaimInfo: (formData: FormData) => void
  handleAddShortTextQuestion: () => void
  handleUpdateShortTextQuestion: (id: string, formData: FormData) => void
  handleAddLongTextQuestion: () => void
  handleUpdateLongTextQuestion: (id: string, formData: FormData) => void
  handleAddSingleDateSelectorQuestion: () => void
  handleUpdateSingleDateSelectorQuestion: (
    id: string,
    formData: FormData,
  ) => void
  handleAddDateRangeSelectorQuestion: () => void
  handleUpdateDateRangeSelectorQuestion: (
    id: string,
    formData: FormData,
  ) => void
  handleUpdateAnswerRequired: (id: string, required: boolean) => void
  handleCopyQuestion: (id: string) => void
  handleRemoveQuestion: (id: string) => void
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
          const { id, required } = question

          this.cardRefs[id] = React.createRef()

          let questionElem
          let title

          switch (question.control) {
            case ControlType.Text:
              questionElem = this.renderShortTextQuestion(question)
              title = questionTypeMap[ControlType.Text].title
              break
            case ControlType.TextArea:
              questionElem = this.renderLongTextQuestion(question)
              title = questionTypeMap[ControlType.TextArea].title
              break
            case ControlType.SingleDateSelector:
              questionElem = this.renderSingleDateSelectorQuestion(question)
              title = questionTypeMap[ControlType.SingleDateSelector].title
              break
            case ControlType.DateRangeSelector:
              questionElem = this.renderDateRangeSelectorQuestion(question)
              title = questionTypeMap[ControlType.DateRangeSelector].title
              break
          }

          return (
            <QuestionCardWrapper
              title={title}
              required={required}
              handleCopy={(): void => this.props.handleCopyQuestion(id)}
              handleToggleRequire={(): void =>
                this.props.handleUpdateAnswerRequired(id, !required)
              }
              handleRemove={(): void => this.props.handleRemoveQuestion(id)}
            >
              {questionElem}
            </QuestionCardWrapper>
          )
        })}
      </>
    )
  }

  renderShortTextQuestion = (question: Question): JSX.Element => {
    const { handleUpdateShortTextQuestion } = this.props
    const { id, title, description, label } = question

    return (
      <ShortTextQuestion
        ref={this.cardRefs[id]}
        handleUpdateContent={(formData): void =>
          handleUpdateShortTextQuestion(id, formData)
        }
        handleSubmitted={(): void => this.props.handleValidated(id)}
        handleError={(errors): void =>
          this.props.handleValidationError(id, errors)
        }
        title={title}
        description={description}
        label={label}
      />
    )
  }

  renderLongTextQuestion = (question: Question): JSX.Element => {
    const { handleUpdateLongTextQuestion } = this.props
    const { id, title, description, label } = question

    return (
      <ShortTextQuestion
        ref={this.cardRefs[id]}
        handleUpdateContent={(formData): void =>
          handleUpdateLongTextQuestion(id, formData)
        }
        handleSubmitted={(): void => this.props.handleValidated(id)}
        handleError={(errors): void =>
          this.props.handleValidationError(id, errors)
        }
        title={title}
        description={description}
        label={label}
      />
    )
  }

  renderSingleDateSelectorQuestion = (question: Question): JSX.Element => {
    const { handleUpdateSingleDateSelectorQuestion } = this.props
    const { id, title, description, label } = question

    return (
      <SingleDateSelectorQuestion
        ref={this.cardRefs[id]}
        handleUpdateContent={(formData): void =>
          handleUpdateSingleDateSelectorQuestion(id, formData)
        }
        handleSubmitted={(): void => this.props.handleValidated(id)}
        handleError={(errors): void =>
          this.props.handleValidationError(id, errors)
        }
        title={title}
        description={description}
        label={label}
      />
    )
  }

  renderDateRangeSelectorQuestion = (question: Question): JSX.Element => {
    const { handleUpdateDateRangeSelectorQuestion } = this.props
    const { id, title, description, label } = question

    return (
      <DateRangeSelectorQuestion
        ref={this.cardRefs[id]}
        handleUpdateContent={(formData): void =>
          handleUpdateDateRangeSelectorQuestion(id, formData)
        }
        handleSubmitted={(): void => this.props.handleValidated(id)}
        handleError={(errors): void =>
          this.props.handleValidationError(id, errors)
        }
        title={title}
        description={description}
        label={label}
      />
    )
  }

  addQuestion = (controlType: ControlType): void => {
    const {
      handleAddShortTextQuestion,
      handleAddLongTextQuestion,
      handleAddSingleDateSelectorQuestion,
      handleAddDateRangeSelectorQuestion,
    } = this.props

    switch (controlType) {
      case ControlType.Text:
        handleAddShortTextQuestion()
        break
      case ControlType.TextArea:
        handleAddLongTextQuestion()
        break
      case ControlType.SingleDateSelector:
        handleAddSingleDateSelectorQuestion()
        break
      case ControlType.DateRangeSelector:
        handleAddDateRangeSelectorQuestion()
        break
    }
  }

  onSubmitted = (): void => {
    console.log('TODO - gotostep')
  }

  render(): JSX.Element {
    const { questions } = this.props
    const identifiers: string[] = []

    identifiers.push('claiminfo')

    questions.forEach((question) => {
      identifiers.push(question.id)
    })

    return (
      <>
        {this.renderClaimInfo()}
        {this.renderQuestions()}
        <AddQuestionBar addQuestion={this.addQuestion} />
        {this.renderButtonGroup(identifiers, false)}
      </>
    )
  }
}

const mapStateToProps = (state: RootState): any => ({
  claimInfo: attestationSelectors.selectClaimInfo(state),
  questions: attestationSelectors.selectQuestions(state),
  validationComplete: attestationSelectors.selectValidationComplete(state),
  validated: attestationSelectors.selectValidated(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleUpdateClaimInfo: (formData: FormData): void =>
    dispatch(updateClaimInfo(formData)),
  handleAddShortTextQuestion: (): void => dispatch(addShortTextQuestion()),
  handleUpdateShortTextQuestion: (id: string, formData: FormData): void =>
    dispatch(updateShortTextQuestion(id, formData)),
  handleAddLongTextQuestion: (): void => dispatch(addLongTextQuestion()),
  handleUpdateLongTextQuestion: (id: string, formData: FormData): void =>
    dispatch(updateLongTextQuestion(id, formData)),
  handleAddSingleDateSelectorQuestion: (): void =>
    dispatch(addSingleDateSelectorQuestion()),
  handleUpdateSingleDateSelectorQuestion: (
    id: string,
    formData: FormData,
  ): void => dispatch(updateSingleDateSelectorQuestion(id, formData)),
  handleAddDateRangeSelectorQuestion: (): void =>
    dispatch(addDateRangeSelectorQuestion()),
  handleUpdateDateRangeSelectorQuestion: (
    id: string,
    formData: FormData,
  ): void => dispatch(updateDateRangeSelectorQuestion(id, formData)),
  handleUpdateAnswerRequired: (id: string, required: boolean): void =>
    dispatch(updateAnswerRequired(id, required)),
  handleCopyQuestion: (id: string): void => dispatch(copyQuestion(id)),
  handleRemoveQuestion: (id: string): void => dispatch(removeQuestion(id)),
  handleValidated: (identifier: string): void =>
    dispatch(validated(identifier)),
  handleValidationError: (identifier: string, errors: string[]): void =>
    dispatch(validationError(identifier, errors)),
})

export const CreateEntityAttestationConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateEntityAttestation)
