import Approve from 'assets/icons/EvaluateClaim/Approve'
import Commented from 'assets/icons/EvaluateClaim/Commented'
import Queried from 'assets/icons/EvaluateClaim/Queried'
import Reject from 'assets/icons/EvaluateClaim/Reject'
import React, { useMemo } from 'react'
import moment from 'moment'
import styled from 'styled-components'
import Rating from 'react-rating'
import CommentViewModal from '../CommentViewModal'
import { Switch } from 'common/components/Switch/Switch'
import blocksyncApi from 'api/blocksync/blocksync'
import keysafe from 'lib/keysafe/keysafe'
import * as Toast from 'utils/toast'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCellNodeEndpoint, selectUserRole } from 'redux/selectedEntity/selectedEntity.selectors'
import { EntityClaimStatus } from '../../../EntityClaims/types'
import { AgentRole } from 'redux/account/account.types'
import { selectEvaluator } from '../../../../../../../redux/evaluateClaim/evaluateClaim.selectors'

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
  color: ${(props): string => props.theme.highlight.light};
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;

  svg {
    margin-left: 8px;
  }
`

const RatingCircle = styled.div<{ isActive: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ isActive }): string => (isActive ? '#00D2FF' : '#e8edee')};
  margin-bottom: 4px;
`

const RatingItem = styled.div<{ isActive?: boolean }>`
  text-align: center;
  margin-right: 12px;
  color: ${({ isActive }): string => (isActive ? '#00D2FF' : '#a5adb0')};
  font-size: 12px;
`

const ScoreContainer = styled.div`
  border-bottom: 1px solid #d5d9e0;
  padding-top: 24px;
  padding-bottom: 24px;
`

const SubTitle = styled.div`
  color: #143f54;
  font-size: 12px;
  margin-bottom: 8px;
`

const StyledTextarea = styled.textarea`
  width: 100%;
  min-height: 50px;
  background: #f0f3f9;
  border-radius: 4px;
  outline: none;
  border: none;
  padding: 8px 4px;
`

const SwitchContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
  margin-bottom: 24px;
`

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
  margin-top: 16px;
  margin-bottom: 8px;
`
const DeferButton = styled.button<{ disabled?: boolean }>`
  outline: none;
  border: none;
  background: linear-gradient(180deg, #0c4a6a 0%, #09405c 100%);
  mix-blend-mode: normal;
  border-radius: 4px;
  width: 144px;
  height: 36px;
  color: white;
  cursor: ${(props): string => (props.disabled ? 'not-allowed' : 'pointer')};

  &:focus {
    outline: none;
  }
`
const DisputeButton = styled(DeferButton)`
  background: linear-gradient(180deg, #ed9526 0%, #e18c21 100%);
`

const RejectButton = styled(DeferButton)`
  background: linear-gradient(180deg, #e2223b 0%, #cd1c33 100%);
`

const ApproveButton = styled(DeferButton)`
  background: linear-gradient(180deg, #6fcf97 0%, #52a675 100%);
`

interface Props extends RouteComponentProps {
  claim: any
  template: any
  projectDid: string

  rating: number
  notes: string
  includeComments: boolean

  setRating: (value: number) => void
  setNotes: (value: string) => void
  setIncludeComments: (value: boolean) => void
}

const ApproveClaim: React.FunctionComponent<Props> = ({
  claim,
  template,
  projectDid,
  rating,
  notes,
  includeComments,
  setRating,
  setIncludeComments,
  setNotes,
  history,
}): JSX.Element => {
  const [commentModalProps, setCommentModalProps] = React.useState<any>({
    isOpen: false,
    icon: null,
    title: '',
    comments: '',
  })
  const cellNodeEndpoint = useSelector(selectCellNodeEndpoint)
  const userRole = useSelector(selectUserRole)
  const evaluator = useSelector(selectEvaluator)

  const isProjectOwner = useMemo(() => userRole === AgentRole.Owner, [userRole])
  const isEvaluator = useMemo(() => userRole === AgentRole.Evaluator, [userRole])
  // const isServiceAgent = useMemo(() => userRole === AgentRole.ServiceProvider, [
  //   userRole,
  // ])
  const isEvaluated = useMemo(() => evaluator?.status ?? undefined, [evaluator])

  const handleToggleModal = (isOpen: boolean): void => {
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
            <Approve fill='#85AD5C' />
          </IconContainer>
        )
      case 'Rejected':
        return (
          <IconContainer>
            <Reject fill='#E2223B' />
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
        <Commented fill='#E8EDEE' />
      </CommentsButton>
    )
  }

  const handleRenderClaimItem = (item: any): JSX.Element => {
    const form = template.filter((form: any) => Object.keys(form.uiSchema)[0] === item.id)[0]
    return (
      <Item key={item.id}>
        {handleRenderIcon(item)}
        <ItemTitle>{form ? form.schema.title : ''}</ItemTitle>
        {handleRenderViewComment(item, form ? form.schema.title : '')}
      </Item>
    )
  }

  const handleEvaluated = (status: EntityClaimStatus): void => {
    setTimeout(() => {
      history.push({
        pathname: `/projects/${projectDid}/detail/claims`,
        search: `?status=${status}`,
      })
    }, 5000) // TODO: should know exactly
  }

  const handleEvaluate = (status: EntityClaimStatus): void => {
    const payload = {
      claimId: claim?.txHash,
      status,
      projectDid,
    }

    keysafe.requestSigning(
      JSON.stringify(payload),
      (error: any, signature: any) => {
        if (!error && signature) {
          blocksyncApi.claim.evaluateClaim(payload, signature, cellNodeEndpoint!).then(() => {
            Toast.successToast(`Successfully evaluated`)
            handleEvaluated(status)
          })
        } else {
          Toast.errorToast(`Evaluation failed`)
        }
      },
      'base64',
    )
  }

  const handleRatingChange = (value: number): void => {
    setRating(value)
  }

  const handleNotesChange = (e: any): void => {
    setNotes(e.target.value)
  }

  return (
    <Container>
      <SectionTitle>{isProjectOwner ? 'Approval' : 'Approve'}</SectionTitle>
      <Label>Claim Identifier</Label>
      <Identifier>{claim?.txHash}</Identifier>
      <Divider />
      {evaluator && (
        <>
          <Label>Verifier</Label>
          <Identifier>{evaluator._creator}</Identifier>
          <Label style={{ margin: 0 }}>Verified on: {moment(evaluator._created).format('DD MMM YYYY')}</Label>
        </>
      )}

      <SectionTitle style={{ marginTop: 20 }}>Results</SectionTitle>
      {claim?.items && claim.items.map((item: any) => handleRenderClaimItem(item))}
      {/* {!isServiceAgent && ( */}
      {false && (
        <>
          <ScoreContainer>
            <SubTitle>Confidence Score</SubTitle>
            <Rating
              readonly={isProjectOwner || isEvaluated}
              stop={10}
              emptySymbol={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                <RatingItem className='icon-text' key={n}>
                  <RatingCircle isActive={false}></RatingCircle>
                  {n}
                </RatingItem>
              ))}
              fullSymbol={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                <RatingItem className='icon-text' key={n} isActive={true}>
                  <RatingCircle isActive={true}></RatingCircle>
                  {n}
                </RatingItem>
              ))}
              initialRating={rating}
              onChange={handleRatingChange}
            />
          </ScoreContainer>
          <ScoreContainer>
            <SubTitle>Notes</SubTitle>
            <StyledTextarea
              placeholder='Start Typing Here'
              readOnly={isProjectOwner || isEvaluated}
              value={notes}
              onChange={handleNotesChange}
            />
          </ScoreContainer>
          <SwitchContainer>
            <Switch
              label='Include Comments'
              on={includeComments}
              handleChange={() => !isProjectOwner && setIncludeComments(!includeComments)}
            />
          </SwitchContainer>
        </>
      )}
      {isProjectOwner || isEvaluated ? (
        <ActionButtons>
          {evaluator?.status === EntityClaimStatus.Disputed && <DisputeButton disabled>Disputed</DisputeButton>}
          {evaluator?.status === EntityClaimStatus.Rejected && <RejectButton disabled>Rejected</RejectButton>}
          {evaluator?.status === EntityClaimStatus.Approved && <ApproveButton disabled>Approved</ApproveButton>}
        </ActionButtons>
      ) : isEvaluator ? (
        <ActionButtons>
          <DisputeButton onClick={(): void => handleEvaluate(EntityClaimStatus.Disputed)}>Dispute</DisputeButton>
          <RejectButton onClick={(): void => handleEvaluate(EntityClaimStatus.Rejected)}>Reject</RejectButton>
          <ApproveButton onClick={(): void => handleEvaluate(EntityClaimStatus.Approved)}>Approve</ApproveButton>
        </ActionButtons>
      ) : null}
      <CommentViewModal {...commentModalProps} handleToggleModal={handleToggleModal} />
    </Container>
  )
}

export default withRouter(ApproveClaim)
