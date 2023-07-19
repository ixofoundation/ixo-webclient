import { ControlType, Type } from 'components/JsonForm/types'
import { useCreateEntityState } from 'hooks/createEntity'
import React, { useMemo } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { questionTypeMap, TQuestion } from 'types/protocol'
import { AddQuestionBar } from './AddQuestionBar'
import { QuestionCard } from './QuestionCard'
import { Wrapper, Row, QuestionsListWrapper } from './SetupDataCollection.styles'
import { ShortTextQuestion } from './ShortTextQuestion'
import { SingleDateSelectorQuestion } from './SingleDateSelectorQuestion'
import { DateRangeSelectorQuestion } from './DateRangeSelectorQuestion'
import { AvatarUploadQuestion } from './AvatarUploadQuestion'
import { ImageUploadQuestion } from './ImageUploadQuestion'
import { VideoUploadQuestion } from './VideoUploadQuestion'
import { AudioUploadQuestion } from './AudioUploadQuestion'
import { DocumentUploadQuestion } from './DocumentUploadQuestion'
import { LocationSelectorQuestion } from './LocationSelectorQuestion'
import { QRCodeQuestion } from './QRCodeQuestion'
import { QRCodeScanQuestion } from './QRCodeScanQuestion'
import { RatingQuestion } from './RatingQuestion'
import { CheckBoxesQuestion } from './CheckBoxesQuestion'
import { CurrencyQuestion } from './CurrencyQuestion'
import { omitKey, reorderObjectElement } from 'utils/objects'
import { Button } from 'pages/CreateEntity/Components'
import { RouteComponentProps, useHistory } from 'react-router-dom'

const SetupDataCollection: React.FC<Pick<RouteComponentProps, 'match'>> = ({ match }): JSX.Element => {
  const history = useHistory()
  const baseLink = match.path.split('/').slice(0, -1).join('/')

  const { claimQuestions, updateClaimQuestions } = useCreateEntityState()
  const questions: TQuestion[] = useMemo(() => Object.values(claimQuestions), [claimQuestions])

  const handlePrev = (): void => {
    history.push(`${baseLink}/profile`)
  }
  const handleNext = (): void => {
    history.push(`${baseLink}/property`)
  }

  const handleRemoveQuestion = (id: string): void => {
    const newQuestions = omitKey(claimQuestions, id)
    updateClaimQuestions(newQuestions)
  }
  const handleMoveQuestion = (srcId: string, dstId: string): void => {
    const newQuestions = reorderObjectElement(srcId, dstId, { ...claimQuestions })
    updateClaimQuestions(newQuestions)
  }
  const handleUpdateProfile = (payload: any): void => {
    updateClaimQuestions({
      ...claimQuestions,
      [payload.id]: payload,
    })
  }
  const handleValidated = (id: string): void => {
    console.log('handleValidated', id)
  }
  const handleValidationError = (id: string, errors: string[]): void => {
    console.log('handleValidationError', id, errors)
  }
  const handleUpdateAnswerRequired = (id: string, required: boolean): void => {
    handleUpdateProfile({ ...claimQuestions[id], required })
  }
  const handleCopyQuestion = (id: string): void => {
    const newId = uuidv4()
    handleUpdateProfile({ ...claimQuestions[id], id: newId })
  }
  const handleAddQuestion = (controlType: ControlType): void => {
    const handleAddShortTextQuestion = (): void => {
      const id = uuidv4()
      handleUpdateProfile({
        id,
        title: undefined,
        description: undefined,
        label: 'Short Answer',
        attributeType: undefined,
        required: true,
        type: Type.String,
        control: ControlType.Text,
        placeholder: 'Start Typing here',
      })
    }
    const handleAddLongTextQuestion = (): void => {
      const id = uuidv4()
      handleUpdateProfile({
        id,
        title: undefined,
        description: undefined,
        label: 'Long Answer',
        attributeType: undefined,
        required: true,
        type: Type.String,
        control: ControlType.TextArea,
        placeholder: 'Start Typing here',
      })
    }
    const handleAddSingleDateSelectorQuestion = (): void => {
      const id = uuidv4()
      handleUpdateProfile({
        id,
        title: undefined,
        description: undefined,
        attributeType: undefined,
        label: 'Date',
        required: true,
        type: Type.String,
        control: ControlType.SingleDateSelector,
      })
    }
    const handleAddDateRangeSelectorQuestion = (): void => {
      const id = uuidv4()
      handleUpdateProfile({
        id,
        title: undefined,
        description: undefined,
        label: 'Dates',
        attributeType: undefined,
        required: true,
        type: Type.String,
        control: ControlType.DateRangeSelector,
      })
    }
    const handleAddAvatarUploadQuestion = (): void => {
      const id = uuidv4()
      handleUpdateProfile({
        id,
        title: undefined,
        description: undefined,
        label: 'Select Avatar Image to Upload',
        attributeType: undefined,
        required: true,
        type: Type.String,
        control: ControlType.AvatarUpload,
      })
    }
    const handleAddImageUploadQuestion = (): void => {
      const id = uuidv4()
      handleUpdateProfile({
        id,
        title: undefined,
        description: undefined,
        label: 'Select Image to Upload',
        attributeType: undefined,
        required: true,
        type: Type.String,
        control: ControlType.ImageUpload,
      })
    }
    const handleAddVideoUploadQuestion = (): void => {
      const id = uuidv4()
      handleUpdateProfile({
        id,
        title: undefined,
        description: undefined,
        label: 'Select Video to Upload',
        attributeType: undefined,
        required: true,
        type: Type.String,
        control: ControlType.VideoUpload,
      })
    }
    const handleAddAudioUploadQuestion = (): void => {
      const id = uuidv4()
      handleUpdateProfile({
        id,
        title: undefined,
        description: undefined,
        label: 'Select Audio Clip to Upload',
        attributeType: undefined,
        required: true,
        type: Type.String,
        control: ControlType.AudioUpload,
      })
    }
    const handleAddDocumentUploadQuestion = (): void => {
      const id = uuidv4()
      handleUpdateProfile({
        id,
        title: undefined,
        description: undefined,
        label: 'Select Document to Upload',
        attributeType: undefined,
        required: true,
        type: Type.String,
        control: ControlType.DocumentUpload,
      })
    }
    const handleAddLocationSelectorQuestion = (): void => {
      const id = uuidv4()
      handleUpdateProfile({
        id,
        title: undefined,
        description: undefined,
        label: 'Location',
        attributeType: undefined,
        required: true,
        type: Type.String,
        control: ControlType.LocationSelector,
      })
    }
    const handleAddQRCodeQuestion = (): void => {
      const id = uuidv4()
      handleUpdateProfile({
        id,
        title: undefined,
        description: undefined,
        label: 'QR Code',
        attributeType: undefined,
        required: true,
        type: Type.String,
        control: ControlType.QRCode,
        initialValue: undefined,
      })
    }
    const handleAddQRCodeScanQuestion = (): void => {
      const id = uuidv4()
      handleUpdateProfile({
        id,
        title: undefined,
        description: undefined,
        label: 'Scan QR Code',
        attributeType: undefined,
        placeholder: 'Waiting for data...',
        required: true,
        type: Type.String,
        control: ControlType.QRCodeScan,
      })
    }
    const handleAddRatingQuestion = (): void => {
      const id = uuidv4()
      handleUpdateProfile({
        id,
        title: undefined,
        description: undefined,
        label: 'Rating',
        attributeType: undefined,
        required: true,
        type: Type.String,
        control: ControlType.Rating,
        values: undefined,
        inline: true,
      })
    }
    const handleAddCheckBoxesQuestion = (): void => {
      const id = uuidv4()
      handleUpdateProfile({
        id,
        title: undefined,
        description: undefined,
        label: 'Select Options',
        attributeType: undefined,
        required: true,
        type: Type.Array,
        control: ControlType.CheckBoxes,
        itemValues: [],
        itemLabels: [],
      })
    }
    const handleAddCurrencyQuestion = (): void => {
      const id = uuidv4()
      handleUpdateProfile({
        id,
        title: undefined,
        description: undefined,
        label: 'Currency',
        attributeType: undefined,
        required: true,
        type: Type.Array,
        control: ControlType.Currency,
        currency: undefined,
      })
    }
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
      case ControlType.Currency:
        handleAddCurrencyQuestion()
        break
      default:
        break
    }
  }

  ////////

  const renderShortTextQuestion = (question: TQuestion): JSX.Element => {
    const { id, title, description, label, attributeType } = question
    return (
      <ShortTextQuestion
        handleUpdateContent={(formData): void => handleUpdateProfile({ ...question, ...formData })}
        handleSubmitted={(): void => handleValidated(id)}
        handleError={(errors): void => handleValidationError(id, errors)}
        title={title}
        description={description}
        attributeType={attributeType}
        label={label}
      />
    )
  }
  const renderLongTextQuestion = (question: TQuestion): JSX.Element => {
    const { id, title, description, label, attributeType } = question
    return (
      <ShortTextQuestion
        handleUpdateContent={(formData): void => handleUpdateProfile({ ...question, ...formData })}
        handleSubmitted={(): void => handleValidated(id)}
        handleError={(errors): void => handleValidationError(id, errors)}
        title={title}
        description={description}
        attributeType={attributeType}
        label={label}
      />
    )
  }
  const renderSingleDateSelectorQuestion = (question: TQuestion): JSX.Element => {
    const { id, title, description, label, attributeType } = question
    return (
      <SingleDateSelectorQuestion
        handleUpdateContent={(formData): void => handleUpdateProfile({ ...question, ...formData })}
        handleSubmitted={(): void => handleValidated(id)}
        handleError={(errors): void => handleValidationError(id, errors)}
        title={title}
        description={description}
        attributeType={attributeType}
        label={label}
      />
    )
  }
  const renderDateRangeSelectorQuestion = (question: TQuestion): JSX.Element => {
    const { id, title, description, label, attributeType } = question
    return (
      <DateRangeSelectorQuestion
        handleUpdateContent={(formData): void => handleUpdateProfile({ ...question, ...formData })}
        handleSubmitted={(): void => handleValidated(id)}
        handleError={(errors): void => handleValidationError(id, errors)}
        title={title}
        description={description}
        attributeType={attributeType}
        label={label}
      />
    )
  }
  const renderAvatarUploadQuestion = (question: TQuestion): JSX.Element => {
    const { id, title, description, label, attributeType } = question
    return (
      <AvatarUploadQuestion
        handleUpdateContent={(formData): void => handleUpdateProfile({ ...question, ...formData })}
        handleSubmitted={(): void => handleValidated(id)}
        handleError={(errors): void => handleValidationError(id, errors)}
        title={title}
        description={description}
        attributeType={attributeType}
        label={label}
      />
    )
  }
  const renderImageUploadQuestion = (question: TQuestion): JSX.Element => {
    const { id, title, description, label, attributeType } = question
    return (
      <ImageUploadQuestion
        handleUpdateContent={(formData): void => handleUpdateProfile({ ...question, ...formData })}
        handleSubmitted={(): void => handleValidated(id)}
        handleError={(errors): void => handleValidationError(id, errors)}
        title={title}
        description={description}
        attributeType={attributeType}
        label={label}
      />
    )
  }
  const renderVideoUploadQuestion = (question: TQuestion): JSX.Element => {
    const { id, title, description, label, attributeType } = question
    return (
      <VideoUploadQuestion
        handleUpdateContent={(formData): void => handleUpdateProfile({ ...question, ...formData })}
        handleSubmitted={(): void => handleValidated(id)}
        handleError={(errors): void => handleValidationError(id, errors)}
        title={title}
        description={description}
        attributeType={attributeType}
        label={label}
      />
    )
  }
  const renderAudioUploadQuestion = (question: TQuestion): JSX.Element => {
    const { id, title, description, label, attributeType } = question
    return (
      <AudioUploadQuestion
        handleUpdateContent={(formData): void => handleUpdateProfile({ ...question, ...formData })}
        handleSubmitted={(): void => handleValidated(id)}
        handleError={(errors): void => handleValidationError(id, errors)}
        title={title}
        description={description}
        attributeType={attributeType}
        label={label}
      />
    )
  }
  const renderDocumentUploadQuestion = (question: TQuestion): JSX.Element => {
    const { id, title, description, label, attributeType } = question
    return (
      <DocumentUploadQuestion
        handleUpdateContent={(formData): void => handleUpdateProfile({ ...question, ...formData })}
        handleSubmitted={(): void => handleValidated(id)}
        handleError={(errors): void => handleValidationError(id, errors)}
        title={title}
        description={description}
        attributeType={attributeType}
        label={label}
      />
    )
  }
  const renderLocationSelectorQuestion = (question: TQuestion): JSX.Element => {
    const { id, title, description, label, attributeType } = question
    return (
      <LocationSelectorQuestion
        handleUpdateContent={(formData): void => handleUpdateProfile({ ...question, ...formData })}
        handleSubmitted={(): void => handleValidated(id)}
        handleError={(errors): void => handleValidationError(id, errors)}
        title={title}
        description={description}
        attributeType={attributeType}
        label={label}
      />
    )
  }
  const renderQRCodeQuestion = (question: TQuestion): JSX.Element => {
    const { id, title, description, label, attributeType, initialValue } = question
    return (
      <QRCodeQuestion
        handleUpdateContent={(formData): void => handleUpdateProfile({ ...question, ...formData })}
        handleSubmitted={(): void => handleValidated(id)}
        handleError={(errors): void => handleValidationError(id, errors)}
        title={title}
        description={description}
        attributeType={attributeType}
        label={label}
        initialValue={initialValue!}
      />
    )
  }
  const renderQRCodeScanQuestion = (question: TQuestion): JSX.Element => {
    const { id, title, description, label, attributeType } = question
    return (
      <QRCodeScanQuestion
        handleUpdateContent={(formData): void => handleUpdateProfile({ ...question, ...formData })}
        handleSubmitted={(): void => handleValidated(id)}
        handleError={(errors): void => handleValidationError(id, errors)}
        title={title}
        description={description}
        attributeType={attributeType}
        label={label}
      />
    )
  }
  const renderRatingQuestion = (question: TQuestion): JSX.Element => {
    const { id, title, description, label, attributeType, values } = question
    return (
      <RatingQuestion
        handleUpdateContent={(formData): void => handleUpdateProfile({ ...question, ...formData })}
        handleSubmitted={(): void => handleValidated(id)}
        handleError={(errors): void => handleValidationError(id, errors)}
        title={title}
        description={description}
        attributeType={attributeType}
        label={label}
        values={values!}
      />
    )
  }
  const renderCheckBoxesQuestion = (question: TQuestion): JSX.Element => {
    const { id, title, description, label, attributeType, itemValues, minItems, maxItems } = question
    return (
      <CheckBoxesQuestion
        handleUpdateContent={(formData): void => handleUpdateProfile({ ...question, ...formData })}
        handleSubmitted={(): void => handleValidated(id)}
        handleError={(errors): void => handleValidationError(id, errors)}
        title={title}
        description={description}
        attributeType={attributeType}
        label={label}
        itemValues={itemValues!}
        minItems={minItems!}
        maxItems={maxItems!}
      />
    )
  }
  const renderCurrencyQuestion = (question: TQuestion): JSX.Element => {
    const { id, title, description, label, attributeType, currency } = question
    return (
      <CurrencyQuestion
        handleUpdateContent={(formData): void => handleUpdateProfile({ ...question, ...formData })}
        handleSubmitted={(): void => handleValidated(id)}
        handleError={(errors): void => handleValidationError(id, errors)}
        title={title}
        description={description}
        attributeType={attributeType}
        label={label}
        currency={currency!}
      />
    )
  }
  const renderQuestions = (): JSX.Element => (
    <DragDropContext
      onDragEnd={(result): void => {
        const { source, destination } = result
        if (source && destination && source.index !== destination.index) {
          handleMoveQuestion(questions[source.index].id, questions[destination.index].id)
        }
      }}
    >
      <Droppable droppableId='questions-list'>
        {(provided): JSX.Element => (
          <QuestionsListWrapper ref={provided.innerRef} {...provided.droppableProps}>
            {questions.map((question: TQuestion, index: number) => {
              const { id, required } = question

              let questionElem: JSX.Element | null = null
              let title: string

              switch (question.control) {
                case ControlType.Text:
                  questionElem = renderShortTextQuestion(question)
                  title = questionTypeMap[ControlType.Text].title
                  break
                case ControlType.TextArea:
                  questionElem = renderLongTextQuestion(question)
                  title = questionTypeMap[ControlType.TextArea].title
                  break
                case ControlType.SingleDateSelector:
                  questionElem = renderSingleDateSelectorQuestion(question)
                  title = questionTypeMap[ControlType.SingleDateSelector].title
                  break
                case ControlType.DateRangeSelector:
                  questionElem = renderDateRangeSelectorQuestion(question)
                  title = questionTypeMap[ControlType.DateRangeSelector].title
                  break
                case ControlType.AvatarUpload:
                  questionElem = renderAvatarUploadQuestion(question)
                  title = questionTypeMap[ControlType.AvatarUpload].title
                  break
                case ControlType.ImageUpload:
                  questionElem = renderImageUploadQuestion(question)
                  title = questionTypeMap[ControlType.ImageUpload].title
                  break
                case ControlType.VideoUpload:
                  questionElem = renderVideoUploadQuestion(question)
                  title = questionTypeMap[ControlType.VideoUpload].title
                  break
                case ControlType.AudioUpload:
                  questionElem = renderAudioUploadQuestion(question)
                  title = questionTypeMap[ControlType.AudioUpload].title
                  break
                case ControlType.DocumentUpload:
                  questionElem = renderDocumentUploadQuestion(question)
                  title = questionTypeMap[ControlType.DocumentUpload].title
                  break
                case ControlType.LocationSelector:
                  questionElem = renderLocationSelectorQuestion(question)
                  title = questionTypeMap[ControlType.LocationSelector].title
                  break
                case ControlType.QRCode:
                  questionElem = renderQRCodeQuestion(question)
                  title = questionTypeMap[ControlType.QRCode].title
                  break
                case ControlType.QRCodeScan:
                  questionElem = renderQRCodeScanQuestion(question)
                  title = questionTypeMap[ControlType.QRCodeScan].title
                  break
                case ControlType.Rating:
                  questionElem = renderRatingQuestion(question)
                  title = questionTypeMap[ControlType.Rating].title
                  break
                case ControlType.CheckBoxes:
                  questionElem = renderCheckBoxesQuestion(question)
                  title = questionTypeMap[ControlType.CheckBoxes].title
                  break
                case ControlType.Currency:
                  questionElem = renderCurrencyQuestion(question)
                  title = questionTypeMap[ControlType.Currency].title
                  break
                default:
                  break
              }

              return (
                <Row key={id}>
                  <QuestionCard
                    id={id}
                    index={index}
                    title={title!}
                    subTitle={question.title}
                    required={required}
                    handleCopy={(): void => handleCopyQuestion(id)}
                    handleToggleRequire={(): void => handleUpdateAnswerRequired(id, !required)}
                    handleRemove={(): void => handleRemoveQuestion(id)}
                  >
                    {questionElem}
                  </QuestionCard>
                </Row>
              )
            })}
            {provided.placeholder}
          </QuestionsListWrapper>
        )}
      </Droppable>
    </DragDropContext>
  )
  return (
    <Wrapper>
      {renderQuestions()}
      <Row>
        <AddQuestionBar addQuestion={handleAddQuestion} />
      </Row>
      <Row className='d-flex mt-4' style={{ gap: 16 }}>
        <Button variant='secondary' onClick={handlePrev}>
          Back
        </Button>
        <Button variant='primary' onClick={handleNext}>
          Continue
        </Button>
      </Row>
    </Wrapper>
  )
}

export default SetupDataCollection
