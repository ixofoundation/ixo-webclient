import React, { Dispatch } from 'react'
import { connect } from 'react-redux'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import CreateEntityBase, {
  CreateEntityBaseProps,
} from '../components/CreateEntityBase/CreateEntityBase'
import { FormData, ControlType } from 'common/components/JsonForm/types'
import { RootState } from 'common/redux/types'
import FormCardWrapper from 'common/components/Wrappers/FormCardWrapper/FormCardWrapper'
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
  addAudioUploadQuestion,
  addAvatarUploadQuestion,
  addDocumentUploadQuestion,
  addImageUploadQuestion,
  addVideoUploadQuestion,
  updateAudioUploadQuestion,
  updateAvatarUploadQuestion,
  updateDocumentUploadQuestion,
  updateImageUploadQuestion,
  updateVideoUploadQuestion,
  addLocationSelectorQuestion,
  updateLocationSelectorQuestion,
  addQRCodeQuestion,
  updateQRCodeQuestion,
  addQRCodeScanQuestion,
  updateQRCodeScanQuestion,
  addRatingQuestion,
  updateRatingQuestion,
  addCheckBoxesQuestion,
  updateCheckBoxesQuestion,
  moveQuestion,
} from './CreateEntityAttestation.actions'
import * as attestationSelectors from './CreateEntityAttestation.selectors'
import * as createEntitySelectors from '../CreateEntity.selectors'
import AddQuestionBar from './components/AddQuestionBar/AddQuestionBar'
import QuestionCard from './components/QuestionCard/QuestionCard'
import ShortTextQuestion from './components/ShortTextQuestion/ShortTextQuestion'
import SingleDateSelectorQuestion from './components/SingleDateSelectorQuestion/SingleDateSelectorQuestion'
import DateRangeSelectorQuestion from './components/DateRangeSelectorQuestion/DateRangeSelectorQuestion'
import AvatarUploadQuestion from './components/AvatarUploadQuestion/AvatarUploadQuestion'
import ImageUploadQuestion from './components/ImageUploadQuestion/ImageUploadQuestion'
import VideoUploadQuestion from './components/VideoUploadQuestion/VideoUploadQuestion'
import AudioUploadQuestion from './components/AudioUploadQuestion/AudioUploadQuestion'
import DocumentUploadQuestion from './components/DocumentUploadQuestion/DocumentUploadQuestion'
import LocationSelectorQuestion from './components/LocationSelectorQuestion/LocationSelectorQuestion'
import QRCodeQuestion from './components/QRCodeQuestion/QRCodeQuestion'
import QRCodeScanQuestion from './components/QRCodeScanQuestion/QRCodeScanQuestion'
import RatingQuestion from './components/RatingQuestion/RatingQuestion'
import CheckBoxesQuestion from './components/CheckBoxesQuestion/CheckBoxesQuestion'
import { goToStep } from '../CreateEntity.actions'
import { QuestionsListWrapper } from './CreteEntityAttestation.styles'

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
  handleAddAvatarUploadQuestion: () => void
  handleUpdateAvatarUploadQuestion: (id: string, formData: FormData) => void
  handleAddImageUploadQuestion: () => void
  handleUpdateImageUploadQuestion: (id: string, formData: FormData) => void
  handleAddVideoUploadQuestion: () => void
  handleUpdateVideoUploadQuestion: (id: string, formData: FormData) => void
  handleAddAudioUploadQuestion: () => void
  handleUpdateAudioUploadQuestion: (id: string, formData: FormData) => void
  handleAddDocumentUploadQuestion: () => void
  handleUpdateDocumentUploadQuestion: (id: string, formData: FormData) => void
  handleAddLocationSelectorQuestion: () => void
  handleUpdateLocationSelectorQuestion: (id: string, formData: FormData) => void
  handleAddQRCodeQuestion: () => void
  handleUpdateQRCodeQuestion: (id: string, formData: FormData) => void
  handleAddQRCodeScanQuestion: () => void
  handleUpdateQRCodeScanQuestion: (id: string, formData: FormData) => void
  handleAddRatingQuestion: () => void
  handleUpdateRatingQuestion: (id: string, formData: FormData) => void
  handleAddCheckBoxesQuestion: () => void
  handleUpdateCheckBoxesQuestion: (id: string, formData: FormData) => void
  handleUpdateAnswerRequired: (id: string, required: boolean) => void
  handleCopyQuestion: (id: string) => void
  handleMoveQuestion: (fromIndex: number, toIndex: number) => void
  handleRemoveQuestion: (id: string) => void
}

class CreateEntityAttestation extends CreateEntityBase<Props> {
  renderClaimInfo = (): JSX.Element => {
    this.cardRefs['claiminfo'] = React.createRef()

    const {
      entityType,
      claimInfo: { title, shortDescription, type },
      handleUpdateClaimInfo,
    } = this.props

    return (
      <FormCardWrapper title="Information Card" showAddSection={false}>
        <ClaimInfoCard
          ref={this.cardRefs['claiminfo']}
          handleUpdateContent={handleUpdateClaimInfo}
          handleSubmitted={(): void => this.props.handleValidated('claiminfo')}
          handleError={(errors): void =>
            this.props.handleValidationError('claiminfo', errors)
          }
          type={type}
          title={title}
          shortDescription={shortDescription}
          entityType={entityType}
        />
      </FormCardWrapper>
    )
  }

  renderQuestions = (): JSX.Element => {
    const { questions, handleMoveQuestion } = this.props

    return (
      <DragDropContext
        onDragEnd={(result): void =>
          handleMoveQuestion(result.draggableId, result.destination.index)
        }
      >
        <Droppable droppableId="questions-list">
          {(provided): JSX.Element => (
            <QuestionsListWrapper
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {questions.map((question, index) => {
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
                    questionElem = this.renderSingleDateSelectorQuestion(
                      question,
                    )
                    title =
                      questionTypeMap[ControlType.SingleDateSelector].title
                    break
                  case ControlType.DateRangeSelector:
                    questionElem = this.renderDateRangeSelectorQuestion(
                      question,
                    )
                    title = questionTypeMap[ControlType.DateRangeSelector].title
                    break
                  case ControlType.AvatarUpload:
                    questionElem = this.renderAvatarUploadQuestion(question)
                    title = questionTypeMap[ControlType.AvatarUpload].title
                    break
                  case ControlType.ImageUpload:
                    questionElem = this.renderImageUploadQuestion(question)
                    title = questionTypeMap[ControlType.ImageUpload].title
                    break
                  case ControlType.VideoUpload:
                    questionElem = this.renderVideoUploadQuestion(question)
                    title = questionTypeMap[ControlType.VideoUpload].title
                    break
                  case ControlType.AudioUpload:
                    questionElem = this.renderAudioUploadQuestion(question)
                    title = questionTypeMap[ControlType.AudioUpload].title
                    break
                  case ControlType.DocumentUpload:
                    questionElem = this.renderDocumentUploadQuestion(question)
                    title = questionTypeMap[ControlType.DocumentUpload].title
                    break
                  case ControlType.LocationSelector:
                    questionElem = this.renderLocationSelectorQuestion(question)
                    title = questionTypeMap[ControlType.LocationSelector].title
                    break
                  case ControlType.QRCode:
                    questionElem = this.renderQRCodeQuestion(question)
                    title = questionTypeMap[ControlType.QRCode].title
                    break
                  case ControlType.QRCodeScan:
                    questionElem = this.renderQRCodeScanQuestion(question)
                    title = questionTypeMap[ControlType.QRCodeScan].title
                    break
                  case ControlType.Rating:
                    questionElem = this.renderRatingQuestion(question)
                    title = questionTypeMap[ControlType.Rating].title
                    break
                  case ControlType.CheckBoxes:
                    questionElem = this.renderCheckBoxesQuestion(question)
                    title = questionTypeMap[ControlType.CheckBoxes].title
                    break
                }

                return (
                  <QuestionCard
                    id={id}
                    index={index}
                    key={id}
                    title={title}
                    required={required}
                    handleCopy={(): void => this.props.handleCopyQuestion(id)}
                    handleToggleRequire={(): void =>
                      this.props.handleUpdateAnswerRequired(id, !required)
                    }
                    handleRemove={(): void =>
                      this.props.handleRemoveQuestion(id)
                    }
                  >
                    {questionElem}
                  </QuestionCard>
                )
              })}
              {provided.placeholder}
            </QuestionsListWrapper>
          )}
        </Droppable>
      </DragDropContext>
    )
  }

  renderShortTextQuestion = (question: Question): JSX.Element => {
    const { handleUpdateShortTextQuestion } = this.props
    const { id, title, description, label, attributeType } = question

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
        attributeType={attributeType}
        label={label}
      />
    )
  }

  renderLongTextQuestion = (question: Question): JSX.Element => {
    const { handleUpdateLongTextQuestion } = this.props
    const { id, title, description, label, attributeType } = question

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
        attributeType={attributeType}
        label={label}
      />
    )
  }

  renderSingleDateSelectorQuestion = (question: Question): JSX.Element => {
    const { handleUpdateSingleDateSelectorQuestion } = this.props
    const { id, title, description, label, attributeType } = question

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
        attributeType={attributeType}
        label={label}
      />
    )
  }

  renderDateRangeSelectorQuestion = (question: Question): JSX.Element => {
    const { handleUpdateDateRangeSelectorQuestion } = this.props
    const { id, title, description, label, attributeType } = question

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
        attributeType={attributeType}
        label={label}
      />
    )
  }

  renderAvatarUploadQuestion = (question: Question): JSX.Element => {
    const { handleUpdateAvatarUploadQuestion } = this.props
    const { id, title, description, label, attributeType } = question

    return (
      <AvatarUploadQuestion
        ref={this.cardRefs[id]}
        handleUpdateContent={(formData): void =>
          handleUpdateAvatarUploadQuestion(id, formData)
        }
        handleSubmitted={(): void => this.props.handleValidated(id)}
        handleError={(errors): void =>
          this.props.handleValidationError(id, errors)
        }
        title={title}
        description={description}
        attributeType={attributeType}
        label={label}
      />
    )
  }

  renderImageUploadQuestion = (question: Question): JSX.Element => {
    const { handleUpdateImageUploadQuestion } = this.props
    const { id, title, description, label, attributeType } = question

    return (
      <ImageUploadQuestion
        ref={this.cardRefs[id]}
        handleUpdateContent={(formData): void =>
          handleUpdateImageUploadQuestion(id, formData)
        }
        handleSubmitted={(): void => this.props.handleValidated(id)}
        handleError={(errors): void =>
          this.props.handleValidationError(id, errors)
        }
        title={title}
        description={description}
        attributeType={attributeType}
        label={label}
      />
    )
  }

  renderVideoUploadQuestion = (question: Question): JSX.Element => {
    const { handleUpdateVideoUploadQuestion } = this.props
    const { id, title, description, label, attributeType } = question

    return (
      <VideoUploadQuestion
        ref={this.cardRefs[id]}
        handleUpdateContent={(formData): void =>
          handleUpdateVideoUploadQuestion(id, formData)
        }
        handleSubmitted={(): void => this.props.handleValidated(id)}
        handleError={(errors): void =>
          this.props.handleValidationError(id, errors)
        }
        title={title}
        description={description}
        attributeType={attributeType}
        label={label}
      />
    )
  }

  renderAudioUploadQuestion = (question: Question): JSX.Element => {
    const { handleUpdateAudioUploadQuestion } = this.props
    const { id, title, description, label, attributeType } = question

    return (
      <AudioUploadQuestion
        ref={this.cardRefs[id]}
        handleUpdateContent={(formData): void =>
          handleUpdateAudioUploadQuestion(id, formData)
        }
        handleSubmitted={(): void => this.props.handleValidated(id)}
        handleError={(errors): void =>
          this.props.handleValidationError(id, errors)
        }
        title={title}
        description={description}
        attributeType={attributeType}
        label={label}
      />
    )
  }

  renderDocumentUploadQuestion = (question: Question): JSX.Element => {
    const { handleUpdateDocumentUploadQuestion } = this.props
    const { id, title, description, label, attributeType } = question

    return (
      <DocumentUploadQuestion
        ref={this.cardRefs[id]}
        handleUpdateContent={(formData): void =>
          handleUpdateDocumentUploadQuestion(id, formData)
        }
        handleSubmitted={(): void => this.props.handleValidated(id)}
        handleError={(errors): void =>
          this.props.handleValidationError(id, errors)
        }
        title={title}
        description={description}
        attributeType={attributeType}
        label={label}
      />
    )
  }

  renderLocationSelectorQuestion = (question: Question): JSX.Element => {
    const { handleUpdateLocationSelectorQuestion } = this.props
    const { id, title, description, label, attributeType } = question

    return (
      <LocationSelectorQuestion
        ref={this.cardRefs[id]}
        handleUpdateContent={(formData): void =>
          handleUpdateLocationSelectorQuestion(id, formData)
        }
        handleSubmitted={(): void => this.props.handleValidated(id)}
        handleError={(errors): void =>
          this.props.handleValidationError(id, errors)
        }
        title={title}
        description={description}
        attributeType={attributeType}
        label={label}
      />
    )
  }

  renderQRCodeQuestion = (question: Question): JSX.Element => {
    const { handleUpdateQRCodeQuestion } = this.props
    const {
      id,
      title,
      description,
      label,
      attributeType,
      initialValue,
    } = question

    return (
      <QRCodeQuestion
        ref={this.cardRefs[id]}
        handleUpdateContent={(formData): void =>
          handleUpdateQRCodeQuestion(id, formData)
        }
        handleSubmitted={(): void => this.props.handleValidated(id)}
        handleError={(errors): void =>
          this.props.handleValidationError(id, errors)
        }
        title={title}
        description={description}
        attributeType={attributeType}
        label={label}
        initialValue={initialValue}
      />
    )
  }

  renderQRCodeScanQuestion = (question: Question): JSX.Element => {
    const { handleUpdateQRCodeScanQuestion } = this.props
    const { id, title, description, label, attributeType } = question

    return (
      <QRCodeScanQuestion
        ref={this.cardRefs[id]}
        handleUpdateContent={(formData): void =>
          handleUpdateQRCodeScanQuestion(id, formData)
        }
        handleSubmitted={(): void => this.props.handleValidated(id)}
        handleError={(errors): void =>
          this.props.handleValidationError(id, errors)
        }
        title={title}
        description={description}
        attributeType={attributeType}
        label={label}
      />
    )
  }

  renderRatingQuestion = (question: Question): JSX.Element => {
    const { handleUpdateRatingQuestion } = this.props
    const { id, title, description, label, attributeType, values } = question

    return (
      <RatingQuestion
        ref={this.cardRefs[id]}
        handleUpdateContent={(formData): void =>
          handleUpdateRatingQuestion(id, formData)
        }
        handleSubmitted={(): void => this.props.handleValidated(id)}
        handleError={(errors): void =>
          this.props.handleValidationError(id, errors)
        }
        title={title}
        description={description}
        attributeType={attributeType}
        label={label}
        values={values}
      />
    )
  }

  renderCheckBoxesQuestion = (question: Question): JSX.Element => {
    const { handleUpdateCheckBoxesQuestion } = this.props
    const {
      id,
      title,
      description,
      label,
      attributeType,
      itemValues,
      minItems,
      maxItems,
    } = question

    return (
      <CheckBoxesQuestion
        ref={this.cardRefs[id]}
        handleUpdateContent={(formData): void =>
          handleUpdateCheckBoxesQuestion(id, formData)
        }
        handleSubmitted={(): void => this.props.handleValidated(id)}
        handleError={(errors): void =>
          this.props.handleValidationError(id, errors)
        }
        title={title}
        description={description}
        attributeType={attributeType}
        label={label}
        itemValues={itemValues}
        minItems={minItems}
        maxItems={maxItems}
      />
    )
  }

  addQuestion = (controlType: ControlType): void => {
    const {
      handleAddShortTextQuestion,
      handleAddLongTextQuestion,
      handleAddSingleDateSelectorQuestion,
      handleAddDateRangeSelectorQuestion,
      handleAddAvatarUploadQuestion,
      handleAddImageUploadQuestion,
      handleAddVideoUploadQuestion,
      handleAddAudioUploadQuestion,
      handleAddDocumentUploadQuestion,
      handleAddLocationSelectorQuestion,
      handleAddQRCodeQuestion,
      handleAddQRCodeScanQuestion,
      handleAddRatingQuestion,
      handleAddCheckBoxesQuestion,
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
      case ControlType.AvatarUpload:
        handleAddAvatarUploadQuestion()
        break
      case ControlType.ImageUpload:
        handleAddImageUploadQuestion()
        break
      case ControlType.VideoUpload:
        handleAddVideoUploadQuestion()
        break
      case ControlType.AudioUpload:
        handleAddAudioUploadQuestion()
        break
      case ControlType.DocumentUpload:
        handleAddDocumentUploadQuestion()
        break
      case ControlType.LocationSelector:
        handleAddLocationSelectorQuestion()
        break
      case ControlType.QRCode:
        handleAddQRCodeQuestion()
        break
      case ControlType.QRCodeScan:
        handleAddQRCodeScanQuestion()
        break
      case ControlType.Rating:
        handleAddRatingQuestion()
        break
      case ControlType.CheckBoxes:
        handleAddCheckBoxesQuestion()
        break
    }
  }

  onSubmitted = (): void => {
    const { entityType, step, handleGoToStep } = this.props

    handleGoToStep(this.getNextStep(entityType, step))
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
        {this.renderButtonGroup(identifiers, false, !questions.length)}
      </>
    )
  }
}

const mapStateToProps = (state: RootState): any => ({
  step: createEntitySelectors.selectStep(state),
  entityType: createEntitySelectors.selectEntityType(state),
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
  handleAddAvatarUploadQuestion: (): void =>
    dispatch(addAvatarUploadQuestion()),
  handleUpdateAvatarUploadQuestion: (id: string, formData: FormData): void =>
    dispatch(updateAvatarUploadQuestion(id, formData)),
  handleAddImageUploadQuestion: (): void => dispatch(addImageUploadQuestion()),
  handleUpdateImageUploadQuestion: (id: string, formData: FormData): void =>
    dispatch(updateImageUploadQuestion(id, formData)),
  handleAddVideoUploadQuestion: (): void => dispatch(addVideoUploadQuestion()),
  handleUpdateVideoUploadQuestion: (id: string, formData: FormData): void =>
    dispatch(updateVideoUploadQuestion(id, formData)),
  handleAddAudioUploadQuestion: (): void => dispatch(addAudioUploadQuestion()),
  handleUpdateAudioUploadQuestion: (id: string, formData: FormData): void =>
    dispatch(updateAudioUploadQuestion(id, formData)),
  handleAddDocumentUploadQuestion: (): void =>
    dispatch(addDocumentUploadQuestion()),
  handleUpdateDocumentUploadQuestion: (id: string, formData: FormData): void =>
    dispatch(updateDocumentUploadQuestion(id, formData)),
  handleAddLocationSelectorQuestion: (): void =>
    dispatch(addLocationSelectorQuestion()),
  handleUpdateLocationSelectorQuestion: (
    id: string,
    formData: FormData,
  ): void => dispatch(updateLocationSelectorQuestion(id, formData)),
  handleAddQRCodeQuestion: (): void => dispatch(addQRCodeQuestion()),
  handleUpdateQRCodeQuestion: (id: string, formData: FormData): void =>
    dispatch(updateQRCodeQuestion(id, formData)),
  handleAddQRCodeScanQuestion: (): void => dispatch(addQRCodeScanQuestion()),
  handleUpdateQRCodeScanQuestion: (id: string, formData: FormData): void =>
    dispatch(updateQRCodeScanQuestion(id, formData)),
  handleAddRatingQuestion: (): void => dispatch(addRatingQuestion()),
  handleUpdateRatingQuestion: (id: string, formData: FormData): void =>
    dispatch(updateRatingQuestion(id, formData)),
  handleAddCheckBoxesQuestion: (): void => dispatch(addCheckBoxesQuestion()),
  handleUpdateCheckBoxesQuestion: (id: string, formData: FormData): void =>
    dispatch(updateCheckBoxesQuestion(id, formData)),
  handleUpdateAnswerRequired: (id: string, required: boolean): void =>
    dispatch(updateAnswerRequired(id, required)),
  handleCopyQuestion: (id: string): void => dispatch(copyQuestion(id)),
  handleMoveQuestion: (id: string, toIndex: number): void =>
    dispatch(moveQuestion(id, toIndex)),
  handleRemoveQuestion: (id: string): void => dispatch(removeQuestion(id)),
  handleValidated: (identifier: string): void =>
    dispatch(validated(identifier)),
  handleValidationError: (identifier: string, errors: string[]): void =>
    dispatch(validationError(identifier, errors)),
  handleGoToStep: (step: number): void => dispatch(goToStep(step)),
})

export const CreateEntityAttestationConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateEntityAttestation)
