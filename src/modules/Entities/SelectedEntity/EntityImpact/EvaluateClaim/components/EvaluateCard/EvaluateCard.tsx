import Assistant from 'assets/icons/Assistant'
import Approve from 'assets/icons/EvaluateClaim/Approve'
import Comment from 'assets/icons/EvaluateClaim/Comment'
import Query from 'assets/icons/EvaluateClaim/Query'
import Reject from 'assets/icons/EvaluateClaim/Reject'
import Document from 'common/components/Document/Document'
import { toggleAssistant } from 'modules/Account/Account.actions'
import { ToogleAssistantPayload } from 'modules/Account/types'
import { selectEntityPrimaryColor } from 'modules/Entities/EntitiesExplorer/EntitiesExplorer.selectors'
import Image from 'modules/Entities/SelectedEntity/EntityImpact/EvaluateClaim/components/Image/Image'
import Video from 'modules/Entities/SelectedEntity/EntityImpact/EvaluateClaim/components/Video/Video'
import moment from 'moment'
import React, { Dispatch } from 'react'
import { connect, useSelector } from 'react-redux'
import { EvaluateClaimStatus } from '../../types'
import Audio from '../Audio/Audio'
import CommentModal from '../CommentModal'
import {
  ActionButtonContainer,
  AudioContainer,
  Container,
  Description,
  ImageContainer,
  Title,
  Value,
  StatusContainer,
} from './EvaluateCard.styles'

interface Props {
  claimItem: any
  template: any
  canUpdate: boolean
  handleSaveComments: (itemId: string, comments: string) => void
  handleUpdateStatus: (itemId: string, status: EvaluateClaimStatus) => void
  toggleAssistant?: (param: ToogleAssistantPayload) => void
}

const EvaluateCard: React.FunctionComponent<Props> = ({
  claimItem,
  template,
  canUpdate,
  handleSaveComments,
  handleUpdateStatus,
  toggleAssistant,
}) => {
  const form = template.filter(
    (form) => Object.keys(form.uiSchema)[0] === claimItem.id,
  )[0]
  const [commentModalOpened, setCommentModalOpened] = React.useState(false)
  const [commentModalTitle, setCommentModalTitle] = React.useState('')
  const [showMedia, setShowMedia] = React.useState(true)
  const activeColor = useSelector(selectEntityPrimaryColor)

  const { comments, status } = claimItem.evaluation
  const isQueried = status === EvaluateClaimStatus.Queried
  const isRejected = status === EvaluateClaimStatus.Rejected
  const isApproved = status === EvaluateClaimStatus.Approved

  const handleToggleCommentModal = (isOpen): void => {
    setCommentModalOpened(isOpen)
  }

  const handleRenderAvatar = (): JSX.Element => {
    return (
      <div className="px-3 d-flex justify-content-between mb-4">
        <div>
          <Title>{form.schema.title}</Title>
          <Description>{form.schema.description}</Description>
          {!showMedia && <Value>No Image</Value>}
        </div>
        {showMedia && (
          <ImageContainer>
            <img
              alt=""
              src={claimItem.value}
              onError={(error) => setShowMedia(false)}
            />
          </ImageContainer>
        )}
      </div>
    )
  }

  const handleRenderImage = (): JSX.Element => {
    return (
      <div className="px-3 d-flex justify-content-between mb-4">
        <div>
          <Title>{form.schema.title}</Title>
          <Description>{form.schema.description}</Description>
          {!showMedia && <Value>No Image</Value>}
        </div>
        {showMedia && (
          <ImageContainer>
            <Image
              src={claimItem.value}
              onError={(error) => setShowMedia(false)}
            />
          </ImageContainer>
        )}
      </div>
    )
  }

  const handleRenderValue = (): JSX.Element => {
    switch (form?.uiSchema[claimItem.id]['ui:widget']) {
      case 'singledateselector':
        return (
          <Value>
            {moment(claimItem.value, 'DD-MMM-YYYY').format('DD MMMM YYYY')}
          </Value>
        )
      default:
        return <Value>{claimItem.value}</Value>
    }
  }

  const handleRenderDocument = (): JSX.Element => {
    return (
      <div className="px-3 d-flex justify-content-between mb-4">
        <div>
          <Title>{form.schema.title}</Title>
          <Description>{form.schema.description}</Description>
          {!showMedia && <Value>No Document</Value>}
        </div>
        {showMedia && (
          <ImageContainer>
            <Document
              url={claimItem.value}
              onError={(): void => setShowMedia(false)}
            />
          </ImageContainer>
        )}
      </div>
    )
  }

  const handleRenderVideo = (): JSX.Element => {
    return (
      <div className="px-3 d-flex justify-content-between mb-4">
        <div>
          <Title>{form.schema.title}</Title>
          <Description>{form.schema.description}</Description>
          {!showMedia && <Value>No Video</Value>}
        </div>
        {showMedia && (
          <ImageContainer>
            <Video
              src={claimItem.value}
              onError={(): void => setShowMedia(false)}
            />
          </ImageContainer>
        )}
      </div>
    )
  }

  const handleRenderAudio = (): JSX.Element => {
    return (
      <div className="px-3">
        <Title>{form.schema.title}</Title>
        <Description>{form.schema.description}</Description>
        {claimItem.value && (
          <AudioContainer>
            <Audio src={claimItem.value} />
            {/* <AudioAvatar /> */}
          </AudioContainer>
        )}
        {!claimItem.value && <Value>No Audio</Value>}
      </div>
    )
  }

  const handleRenderData = (): JSX.Element => {
    switch (form?.uiSchema[claimItem.id]['ui:widget']) {
      case 'avatarupload':
        return handleRenderAvatar()
      case 'imageupload':
        return handleRenderImage()
      case 'documentupload':
        return handleRenderDocument()
      case 'videoupload':
        return handleRenderVideo()
      case 'audioupload':
        return handleRenderAudio()
      default:
        return (
          <div className="px-3">
            <Title>{form?.schema.title}</Title>
            <Description>{form?.schema.description}</Description>
            {handleRenderValue()}
          </div>
        )
    }
  }

  const handleCommentClick = (sectionTitle): void => {
    setCommentModalTitle(sectionTitle)
    setCommentModalOpened(true)
  }

  const handleSaveComment = (comments: string): void => {
    handleSaveComments(claimItem.id, comments)
  }

  const handleToggleAssistant = (): void => {
    toggleAssistant({
      fixed: true,
      intent: `/evaluate{"entity":"${claimItem.id}"}`,
    })
  }

  const renderCTAs = (): JSX.Element => {
    return (
      <ActionButtonContainer>
        <button
          onClick={(): void => handleCommentClick(form.schema.title)}
          className={comments.length ? 'hasComments' : null}
        >
          Comment
          <Comment fill={comments.length ? 'white' : null} />
        </button>
        <button
          className={isQueried ? 'queried' : null}
          onClick={(): void =>
            handleUpdateStatus(claimItem.id, EvaluateClaimStatus.Queried)
          }
        >
          {isQueried ? 'Queried' : 'Query'}
          <Query fill={isQueried ? 'white' : null} />
        </button>
        <button
          className={isRejected ? 'rejected' : null}
          onClick={(): void =>
            handleUpdateStatus(claimItem.id, EvaluateClaimStatus.Rejected)
          }
        >
          {isRejected ? 'Rejected' : 'Reject'}
          <Reject fill={isRejected ? 'white' : null} />
        </button>
        <button
          className={isApproved ? 'approved' : null}
          onClick={(): void =>
            handleUpdateStatus(claimItem.id, EvaluateClaimStatus.Approved)
          }
        >
          {isApproved ? 'Approved' : 'Approve'}
          <Approve fill={isApproved ? 'white' : null} />
        </button>
        <button onClick={(): void => handleToggleAssistant()}>
          <Assistant fill={'#49BFE0'} />
        </button>
      </ActionButtonContainer>
    )
  }

  const renderStatuses = (): JSX.Element => {
    return (
      <StatusContainer>
        {comments.length > 0 && (
          <button onClick={(): void => handleCommentClick(form.schema.title)}>
            <Comment width={'20px'} height={'20px'} fill={activeColor} />
          </button>
        )}
        {isQueried && <Query fill={activeColor} />}
        {isRejected && <Reject fill={activeColor} />}
        {isApproved && <Approve fill={activeColor} />}
      </StatusContainer>
    )
  }

  return (
    <Container>
      {handleRenderData()}
      {canUpdate ? renderCTAs() : renderStatuses()}
      <CommentModal
        title={commentModalTitle}
        isOpen={commentModalOpened}
        initialComments={claimItem.evaluation.comments}
        canUpdate={canUpdate}
        handleToggleModal={handleToggleCommentModal}
        handleSave={handleSaveComment}
      />
    </Container>
  )
}

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  toggleAssistant: (param: ToogleAssistantPayload): void =>
    dispatch(toggleAssistant(param)),
})

export default connect(null, mapDispatchToProps)(EvaluateCard)
