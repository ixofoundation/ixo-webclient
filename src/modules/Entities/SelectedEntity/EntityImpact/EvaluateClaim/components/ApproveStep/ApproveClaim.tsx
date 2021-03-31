import Approve from 'assets/icons/EvaluateClaim/Approve'
import Commented from 'assets/icons/EvaluateClaim/Commented'
import Queried from 'assets/icons/EvaluateClaim/Queried'
import Reject from 'assets/icons/EvaluateClaim/Reject'
import React from 'react'
import styled from 'styled-components'
import CommentViewModal from '../CommentViewModal'

const Container = styled.div`
  background: white;
  border-radius: 0.25rem;
  padding: 30px 28px;
`

const SectionTitle = styled.div`
  font-size: 22px;
  color: black;
`

const Label = styled.div`
  font-size: 14px;
  color: #437c98;
  margin-top: 20px;
`
const Identifier = styled.div`
  font-size: 16px;
  color: black;
  font-weight: 700;
`

const Divider = styled.hr`
  border-color: #d5d9e0;
`

const Item = styled.div`
  display: flex;
  align-items: center;
  color: #4a4e50;
  border-bottom: 1px solid #d5d9e0;
  padding-top: 15px;
  padding-bottom: 15px;
`
const IconContainer = styled.div`
  min-width: 25px;
`

const ItemTitle = styled.div``

const CommentsButton = styled.div`
  margin-left: auto;
  color: #39c3e6;
  font-size: 12px;
  cursor: pointer;

  svg {
    margin-left: 8px;
  }
`

interface Props {
  claim: any
  template: any
}

const ApproveClaim: React.FunctionComponent<Props> = ({
  claim,
  template,
}): JSX.Element => {
  const [commentModalProps, setCommentModalProps] = React.useState({
    isOpen: false,
    icon: null,
    title: '',
    comments: '',
  })

  const handleToggleModal = (isOpen: boolean) => {
    setCommentModalProps({
      isOpen: isOpen,
      icon: null,
      title: '',
      comments: '',
    })
  }

  const handleRenderIcon = (item: any): JSX.Element => {
    switch (item.evaluation.status) {
      case 'Approved':
        return (
          <IconContainer>
            <Approve fill="#85AD5C" />
          </IconContainer>
        )
      case 'Rejected':
        return (
          <IconContainer>
            <Reject fill="#E2223B" />
          </IconContainer>
        )
      default:
        return (
          <IconContainer>
            <Queried />
          </IconContainer>
        )
    }
  }

  const handleViewComment = (item: any, title: string): void => {
    setCommentModalProps({
      title,
      isOpen: true,
      comments: item.evaluation.comments,
      icon: handleRenderIcon(item),
    })
  }

  const handleRenderViewComment = (item: any, title: string): JSX.Element => {
    if (item.evaluation.comments) {
      return (
        <CommentsButton onClick={(): void => handleViewComment(item, title)}>
          View Comment
          <Commented />
        </CommentsButton>
      )
    }

    return (
      <CommentsButton>
        <Commented fill="#E8EDEE" />
      </CommentsButton>
    )
  }

  const handleRenderClaimItem = (item: any): JSX.Element => {
    const form = template.filter(
      (form) => Object.keys(form.uiSchema)[0] === item.id,
    )[0]

    return (
      <Item>
        {handleRenderIcon(item)}
        <ItemTitle>{form.schema.title}</ItemTitle>
        {handleRenderViewComment(item, form.schema.title)}
      </Item>
    )
  }

  return (
    <Container>
      <SectionTitle>Approve</SectionTitle>
      <Label>Claim Identifier</Label>
      <Identifier>{claim.txHash}</Identifier>
      <Divider />
      <SectionTitle>Results</SectionTitle>
      {claim.items.map((item) => handleRenderClaimItem(item))}
      <CommentViewModal
        {...commentModalProps}
        handleToggleModal={handleToggleModal}
      />
    </Container>
  )
}

export default ApproveClaim
