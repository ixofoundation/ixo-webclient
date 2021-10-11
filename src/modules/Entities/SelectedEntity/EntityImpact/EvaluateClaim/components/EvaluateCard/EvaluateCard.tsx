import React from 'react'
import Comment from 'assets/icons/EvaluateClaim/Comment'
import Query from 'assets/icons/EvaluateClaim/Query'
import Reject from 'assets/icons/EvaluateClaim/Reject'
import Approve from 'assets/icons/EvaluateClaim/Approve'
import Image from 'modules/Entities/SelectedEntity/EntityImpact/EvaluateClaim/components/Image/Image'
import Video from 'modules/Entities/SelectedEntity/EntityImpact/EvaluateClaim/components/Video/Video'
import Document from 'common/components/Document/Document'
import Audio from '../Audio/Audio'
import CommentModal from '../CommentModal'
import { EvaluateClaimStatus } from '../../types'
import {
  Container,
  ActionButtonContainer,
  Value,
  Title,
  Description,
  ImageContainer,
  AudioContainer,
} from './EvaluateCard.styles'
import moment from 'moment'

interface Props {
  claimItem: any
  template: any
  handleSaveComments: (itemId: string, comments: string) => void
  handleUpdateStatus: (itemId: string, status: EvaluateClaimStatus) => void
}

const EvaluateCard: React.FunctionComponent<Props> = ({
  claimItem,
  template,
  handleSaveComments,
  handleUpdateStatus,
}) => {
  const form = template.filter(
    (form) => Object.keys(form.uiSchema)[0] === claimItem.id,
  )[0]
  const [commentModalOpened, setCommentModalOpened] = React.useState(false)
  const [commentModalTitle, setCommentModalTitle] = React.useState('')
  const [showMedia, setShowMedia] = React.useState(true)

  const handleToggleCommentModal = (isOpen): void => {
    setCommentModalOpened(isOpen)
  }

  const handleRenderAvatar = (): JSX.Element => {
    console.log('fffffffffffff', claimItem.value)
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
            <Video src={claimItem.value} onError={() => setShowMedia(false)} />
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

  const { comments, status } = claimItem.evaluation
  const isQueried = status === EvaluateClaimStatus.Queried
  const isRejected = status === EvaluateClaimStatus.Rejected
  const isApproved = status === EvaluateClaimStatus.Approved

  return (
    <Container>
      {handleRenderData()}
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
        <button>
          <svg
            width="23"
            height="24"
            viewBox="0 0 23 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.4478 13.1753C12.3439 13.1753 13.0704 12.5056 13.0704 11.6795C13.0704 10.8533 12.3439 10.1836 11.4478 10.1836C10.5517 10.1836 9.8252 10.8533 9.8252 11.6795C9.8252 12.5056 10.5517 13.1753 11.4478 13.1753Z"
              fill="#49BFE0"
            />
            <path
              d="M11.4467 16.47C12.1631 16.47 12.7439 15.9346 12.7439 15.2741C12.7439 14.6136 12.1631 14.0781 11.4467 14.0781C10.7302 14.0781 10.1494 14.6136 10.1494 15.2741C10.1494 15.9346 10.7302 16.47 11.4467 16.47Z"
              fill="#49BFE0"
            />
            <path
              d="M11.4467 9.28058C12.1631 9.28058 12.7439 8.74513 12.7439 8.08463C12.7439 7.42412 12.1631 6.88867 11.4467 6.88867C10.7302 6.88867 10.1494 7.42412 10.1494 8.08463C10.1494 8.74513 10.7302 9.28058 11.4467 9.28058Z"
              fill="#49BFE0"
            />
            <path
              d="M11.4478 4.80495C11.8995 4.80495 12.2657 4.46736 12.2657 4.05091C12.2657 3.63447 11.8995 3.29688 11.4478 3.29688C10.9961 3.29688 10.6299 3.63447 10.6299 4.05091C10.6299 4.46736 10.9961 4.80495 11.4478 4.80495Z"
              fill="#49BFE0"
            />
            <path
              d="M11.4464 0.914825C11.7204 0.914825 11.9425 0.710034 11.9425 0.457412C11.9425 0.20479 11.7204 0 11.4464 0C11.1723 0 10.9502 0.20479 10.9502 0.457412C10.9502 0.710034 11.1723 0.914825 11.4464 0.914825Z"
              fill="#49BFE0"
            />
            <path
              d="M11.4464 23.3719C11.7204 23.3719 11.9425 23.1671 11.9425 22.9144C11.9425 22.6618 11.7204 22.457 11.4464 22.457C11.1723 22.457 10.9502 22.6618 10.9502 22.9144C10.9502 23.1671 11.1723 23.3719 11.4464 23.3719Z"
              fill="#49BFE0"
            />
            <path
              d="M0.894594 6.52029C1.16861 6.52029 1.39075 6.3155 1.39075 6.06288C1.39075 5.81026 1.16861 5.60547 0.894594 5.60547C0.620575 5.60547 0.398438 5.81026 0.398438 6.06288C0.398438 6.3155 0.620575 6.52029 0.894594 6.52029Z"
              fill="#49BFE0"
            />
            <path
              d="M22.001 6.52029C22.2751 6.52029 22.4972 6.3155 22.4972 6.06288C22.4972 5.81026 22.2751 5.60547 22.001 5.60547C21.727 5.60547 21.5049 5.81026 21.5049 6.06288C21.5049 6.3155 21.727 6.52029 22.001 6.52029Z"
              fill="#49BFE0"
            />
            <path
              d="M0.894594 17.7527C1.16861 17.7527 1.39075 17.5479 1.39075 17.2953C1.39075 17.0427 1.16861 16.8379 0.894594 16.8379C0.620575 16.8379 0.398438 17.0427 0.398438 17.2953C0.398438 17.5479 0.620575 17.7527 0.894594 17.7527Z"
              fill="#49BFE0"
            />
            <path
              d="M22.001 17.7527C22.2751 17.7527 22.4972 17.5479 22.4972 17.2953C22.4972 17.0427 22.2751 16.8379 22.001 16.8379C21.727 16.8379 21.5049 17.0427 21.5049 17.2953C21.5049 17.5479 21.727 17.7527 22.001 17.7527Z"
              fill="#49BFE0"
            />
            <path
              d="M18.4825 19.6277C18.7565 19.6277 18.9786 19.4229 18.9786 19.1703C18.9786 18.9177 18.7565 18.7129 18.4825 18.7129C18.2085 18.7129 17.9863 18.9177 17.9863 19.1703C17.9863 19.4229 18.2085 19.6277 18.4825 19.6277Z"
              fill="#49BFE0"
            />
            <path
              d="M18.4825 4.64724C18.7565 4.64724 18.9786 4.44245 18.9786 4.18983C18.9786 3.93721 18.7565 3.73242 18.4825 3.73242C18.2085 3.73242 17.9863 3.93721 17.9863 4.18983C17.9863 4.44245 18.2085 4.64724 18.4825 4.64724Z"
              fill="#49BFE0"
            />
            <path
              d="M15.0313 21.4636C15.3053 21.4636 15.5275 21.2589 15.5275 21.0062C15.5275 20.7536 15.3053 20.5488 15.0313 20.5488C14.7573 20.5488 14.5352 20.7536 14.5352 21.0062C14.5352 21.2589 14.7573 21.4636 15.0313 21.4636Z"
              fill="#49BFE0"
            />
            <path
              d="M7.92878 21.4636C8.2028 21.4636 8.42494 21.2589 8.42494 21.0062C8.42494 20.7536 8.2028 20.5488 7.92878 20.5488C7.65476 20.5488 7.43262 20.7536 7.43262 21.0062C7.43262 21.2589 7.65476 21.4636 7.92878 21.4636Z"
              fill="#49BFE0"
            />
            <path
              d="M7.92878 2.81326C8.2028 2.81326 8.42494 2.60847 8.42494 2.35585C8.42494 2.10323 8.2028 1.89844 7.92878 1.89844C7.65476 1.89844 7.43262 2.10323 7.43262 2.35585C7.43262 2.60847 7.65476 2.81326 7.92878 2.81326Z"
              fill="#49BFE0"
            />
            <path
              d="M4.47956 19.6277C4.75358 19.6277 4.97572 19.4229 4.97572 19.1703C4.97572 18.9177 4.75358 18.7129 4.47956 18.7129C4.20554 18.7129 3.9834 18.9177 3.9834 19.1703C3.9834 19.4229 4.20554 19.6277 4.47956 19.6277Z"
              fill="#49BFE0"
            />
            <path
              d="M4.47956 4.64724C4.75358 4.64724 4.97572 4.44245 4.97572 4.18983C4.97572 3.93721 4.75358 3.73242 4.47956 3.73242C4.20554 3.73242 3.9834 3.93721 3.9834 4.18983C3.9834 4.44245 4.20554 4.64724 4.47956 4.64724Z"
              fill="#49BFE0"
            />
            <path
              d="M15.0313 2.81326C15.3053 2.81326 15.5275 2.60847 15.5275 2.35585C15.5275 2.10323 15.3053 1.89844 15.0313 1.89844C14.7573 1.89844 14.5352 2.10323 14.5352 2.35585C14.5352 2.60847 14.7573 2.81326 15.0313 2.81326Z"
              fill="#49BFE0"
            />
            <path
              d="M0.894594 14.0086C1.16861 14.0086 1.39075 13.8038 1.39075 13.5512C1.39075 13.2985 1.16861 13.0938 0.894594 13.0938C0.620575 13.0938 0.398438 13.2985 0.398438 13.5512C0.398438 13.8038 0.620575 14.0086 0.894594 14.0086Z"
              fill="#49BFE0"
            />
            <path
              d="M22.001 14.0086C22.2751 14.0086 22.4972 13.8038 22.4972 13.5512C22.4972 13.2985 22.2751 13.0938 22.001 13.0938C21.727 13.0938 21.5049 13.2985 21.5049 13.5512C21.5049 13.8038 21.727 14.0086 22.001 14.0086Z"
              fill="#49BFE0"
            />
            <path
              d="M0.894594 10.2644C1.16861 10.2644 1.39075 10.0596 1.39075 9.80702C1.39075 9.5544 1.16861 9.34961 0.894594 9.34961C0.620575 9.34961 0.398438 9.5544 0.398438 9.80702C0.398438 10.0596 0.620575 10.2644 0.894594 10.2644Z"
              fill="#49BFE0"
            />
            <path
              d="M22.001 10.2644C22.2751 10.2644 22.4972 10.0596 22.4972 9.80702C22.4972 9.5544 22.2751 9.34961 22.001 9.34961C21.727 9.34961 21.5049 9.5544 21.5049 9.80702C21.5049 10.0596 21.727 10.2644 22.001 10.2644Z"
              fill="#49BFE0"
            />
            <path
              d="M4.27982 8.6194C4.73154 8.6194 5.09773 8.28181 5.09773 7.86537C5.09773 7.44892 4.73154 7.11133 4.27982 7.11133C3.8281 7.11133 3.46191 7.44892 3.46191 7.86537C3.46191 8.28181 3.8281 8.6194 4.27982 8.6194Z"
              fill="#49BFE0"
            />
            <path
              d="M7.86283 6.7112C8.31455 6.7112 8.68074 6.37361 8.68074 5.95716C8.68074 5.54072 8.31455 5.20312 7.86283 5.20312C7.41111 5.20312 7.04492 5.54072 7.04492 5.95716C7.04492 6.37361 7.41111 6.7112 7.86283 6.7112Z"
              fill="#49BFE0"
            />
            <path
              d="M18.6148 16.2503C19.0665 16.2503 19.4327 15.9127 19.4327 15.4962C19.4327 15.0798 19.0665 14.7422 18.6148 14.7422C18.1631 14.7422 17.7969 15.0798 17.7969 15.4962C17.7969 15.9127 18.1631 16.2503 18.6148 16.2503Z"
              fill="#49BFE0"
            />
            <path
              d="M4.27982 16.2503C4.73154 16.2503 5.09773 15.9127 5.09773 15.4962C5.09773 15.0798 4.73154 14.7422 4.27982 14.7422C3.8281 14.7422 3.46191 15.0798 3.46191 15.4962C3.46191 15.9127 3.8281 16.2503 4.27982 16.2503Z"
              fill="#49BFE0"
            />
            <path
              d="M18.6148 12.4339C19.0665 12.4339 19.4327 12.0963 19.4327 11.6798C19.4327 11.2634 19.0665 10.9258 18.6148 10.9258C18.1631 10.9258 17.7969 11.2634 17.7969 11.6798C17.7969 12.0963 18.1631 12.4339 18.6148 12.4339Z"
              fill="#49BFE0"
            />
            <path
              d="M4.27982 12.4339C4.73154 12.4339 5.09773 12.0963 5.09773 11.6798C5.09773 11.2634 4.73154 10.9258 4.27982 10.9258C3.8281 10.9258 3.46191 11.2634 3.46191 11.6798C3.46191 12.0963 3.8281 12.4339 4.27982 12.4339Z"
              fill="#49BFE0"
            />
            <path
              d="M18.6148 8.6194C19.0665 8.6194 19.4327 8.28181 19.4327 7.86537C19.4327 7.44892 19.0665 7.11133 18.6148 7.11133C18.1631 7.11133 17.7969 7.44892 17.7969 7.86537C17.7969 8.28181 18.1631 8.6194 18.6148 8.6194Z"
              fill="#49BFE0"
            />
            <path
              d="M11.4478 20.0647C11.8995 20.0647 12.2657 19.7271 12.2657 19.3107C12.2657 18.8942 11.8995 18.5566 11.4478 18.5566C10.9961 18.5566 10.6299 18.8942 10.6299 19.3107C10.6299 19.7271 10.9961 20.0647 11.4478 20.0647Z"
              fill="#49BFE0"
            />
            <path
              d="M15.0298 18.1585C15.4815 18.1585 15.8477 17.8209 15.8477 17.4044C15.8477 16.988 15.4815 16.6504 15.0298 16.6504C14.5781 16.6504 14.2119 16.988 14.2119 17.4044C14.2119 17.8209 14.5781 18.1585 15.0298 18.1585Z"
              fill="#49BFE0"
            />
            <path
              d="M7.86283 18.1585C8.31455 18.1585 8.68074 17.8209 8.68074 17.4044C8.68074 16.988 8.31455 16.6504 7.86283 16.6504C7.41111 16.6504 7.04492 16.988 7.04492 17.4044C7.04492 17.8209 7.41111 18.1585 7.86283 18.1585Z"
              fill="#49BFE0"
            />
            <path
              d="M15.0298 6.7112C15.4815 6.7112 15.8477 6.37361 15.8477 5.95716C15.8477 5.54072 15.4815 5.20312 15.0298 5.20312C14.5781 5.20312 14.2119 5.54072 14.2119 5.95716C14.2119 6.37361 14.5781 6.7112 15.0298 6.7112Z"
              fill="#49BFE0"
            />
            <path
              d="M14.8256 14.6732C15.542 14.6732 16.1228 14.1377 16.1228 13.4772C16.1228 12.8167 15.542 12.2812 14.8256 12.2812C14.1091 12.2812 13.5283 12.8167 13.5283 13.4772C13.5283 14.1377 14.1091 14.6732 14.8256 14.6732Z"
              fill="#49BFE0"
            />
            <path
              d="M14.8256 11.0794C15.542 11.0794 16.1228 10.544 16.1228 9.88346C16.1228 9.22295 15.542 8.6875 14.8256 8.6875C14.1091 8.6875 13.5283 9.22295 13.5283 9.88346C13.5283 10.544 14.1091 11.0794 14.8256 11.0794Z"
              fill="#49BFE0"
            />
            <path
              d="M8.06972 14.6732C8.78618 14.6732 9.36699 14.1377 9.36699 13.4772C9.36699 12.8167 8.78618 12.2812 8.06972 12.2812C7.35326 12.2812 6.77246 12.8167 6.77246 13.4772C6.77246 14.1377 7.35326 14.6732 8.06972 14.6732Z"
              fill="#49BFE0"
            />
            <path
              d="M8.06972 11.0794C8.78618 11.0794 9.36699 10.544 9.36699 9.88346C9.36699 9.22295 8.78618 8.6875 8.06972 8.6875C7.35326 8.6875 6.77246 9.22295 6.77246 9.88346C6.77246 10.544 7.35326 11.0794 8.06972 11.0794Z"
              fill="#49BFE0"
            />
          </svg>
        </button>
      </ActionButtonContainer>
      <CommentModal
        title={commentModalTitle}
        isOpen={commentModalOpened}
        initialComments={claimItem.evaluation.comments}
        handleToggleModal={handleToggleCommentModal}
        handleSave={handleSaveComment}
      />
    </Container>
  )
}

export default EvaluateCard
