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
import blocksyncApi from 'common/api/blocksync-api/blocksync-api'
import keysafe from 'common/keysafe/keysafe'
import * as Toast from 'common/utils/Toast'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  selectCellNodeEndpoint,
  selectEntityAgents,
  selectEntityCreator,
} from 'modules/Entities/SelectedEntity/SelectedEntity.selectors'
import { selectUserDid } from 'modules/Account/Account.selectors'
import { EntityClaimStatus } from '../../../EntityClaims/types'
import { AgentRole } from 'modules/Account/types'
import * as entityUtils from 'modules/Entities/Entities.utils'

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
const DeferButton = styled.button`
  outline: none;
  border: none;
  background: linear-gradient(180deg, #0c4a6a 0%, #09405c 100%);
  mix-blend-mode: normal;
  border-radius: 4px;
  width: 144px;
  height: 36px;
  color: white;
  cursor: pointer;

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
}

const ApproveClaim: React.FunctionComponent<Props> = ({
  claim,
  template,
  projectDid,
  history,
}): JSX.Element => {
  const [commentModalProps, setCommentModalProps] = React.useState({
    isOpen: false,
    icon: null,
    title: '',
    comments: '',
  })
  const [includeComments, setIncludeComments] = React.useState(false)
  const cellNodeEndpoint = useSelector(selectCellNodeEndpoint)
  const userDid = useSelector(selectUserDid)
  const creatorDid = useSelector(selectEntityCreator)
  const agents = useSelector(selectEntityAgents)

  const isProjectOwner = useMemo(() => userDid === creatorDid, [
    userDid,
    creatorDid,
  ])

  const isEvaluator = entityUtils.isUserInRolesOfEntity(
    userDid,
    creatorDid,
    agents,
    [AgentRole.Evaluator],
  )

  const evaluator = useMemo(() => {
    if (!claim?.evaluations) {
      return undefined
    }
    const found = claim?.evaluations.find(
      ({ claimId }) => claimId === claim.txHash,
    )
    return found
  }, [claim])

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
      <Item key={item.id}>
        {handleRenderIcon(item)}
        <ItemTitle>{form ? form.schema.title : ''}</ItemTitle>
        {handleRenderViewComment(item, form ? form.schema.title : '')}
      </Item>
    )
  }

  const handleEvaluated = (): void => {
    Toast.successToast(`Successfully evaluated`)
    setTimeout(() => {
      history.push({
        pathname: `/projects/${projectDid}/detail/claims`,
        search: '?status=0',
      })
    }, 2000)
  }

  const handleApproveClick = (): void => {
    const payload = {
      claimId: claim?.txHash,
      status: '1',
      projectDid,
    }

    keysafe.requestSigning(
      JSON.stringify(payload),
      async (error, signature) => {
        if (!error) {
          await blocksyncApi.claim
            .evaluateClaim(payload, signature, cellNodeEndpoint)
            .then(() => {
              handleEvaluated()
            })
        }
      },
      'base64',
    )
  }

  const handleRejectClick = (): void => {
    const payload = {
      claimId: claim?.txHash,
      status: '2',
      projectDid,
    }

    keysafe.requestSigning(
      JSON.stringify(payload),
      async (error, signature) => {
        if (!error) {
          await blocksyncApi.claim
            .evaluateClaim(payload, signature, cellNodeEndpoint)
            .then(() => {
              handleEvaluated()
            })
        }
      },
      'base64',
    )
  }

  const handleDisputeClick = (): void => {
    const payload = {
      claimId: claim?.txHash,
      status: '3',
      projectDid,
    }

    keysafe.requestSigning(
      JSON.stringify(payload),
      async (error, signature) => {
        if (!error) {
          await blocksyncApi.claim
            .evaluateClaim(payload, signature, cellNodeEndpoint)
            .then(() => {
              handleEvaluated()
            })
        }
      },
      'base64',
    )
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
          <Label style={{ margin: 0 }}>
            Verified on: {moment(evaluator._created).format('DD MMM YYYY')}
          </Label>
        </>
      )}

      <SectionTitle style={{ marginTop: 20 }}>Results</SectionTitle>
      {claim?.items && claim.items.map((item) => handleRenderClaimItem(item))}
      <ScoreContainer>
        <SubTitle>Confidence Score</SubTitle>
        <Rating
          readonly={isProjectOwner}
          stop={10}
          emptySymbol={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
            <RatingItem className="icon-text" key={n}>
              <RatingCircle isActive={false}></RatingCircle>
              {n}
            </RatingItem>
          ))}
          fullSymbol={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
            <RatingItem className="icon-text" key={n} isActive={true}>
              <RatingCircle isActive={true}></RatingCircle>
              {n}
            </RatingItem>
          ))}
        />
      </ScoreContainer>
      <ScoreContainer>
        <SubTitle>Notes</SubTitle>
        <StyledTextarea
          placeholder="Start Typing Here"
          readOnly={isProjectOwner}
        />
      </ScoreContainer>
      <SwitchContainer>
        <Switch
          label="Include Comments"
          on={includeComments}
          handleChange={(): void =>
            !isProjectOwner && setIncludeComments(!includeComments)
          }
        />
      </SwitchContainer>
      {isProjectOwner ? (
        <ActionButtons>
          {!evaluator?.status && <DeferButton>Deferred</DeferButton>}
          {evaluator?.status === EntityClaimStatus.Disputed && (
            <DisputeButton>Disputed</DisputeButton>
          )}
          {evaluator?.status === EntityClaimStatus.Rejected && (
            <RejectButton>Rejected</RejectButton>
          )}
          {evaluator?.status === EntityClaimStatus.Approved && (
            <ApproveButton>Approved</ApproveButton>
          )}
        </ActionButtons>
      ) : isEvaluator ? (
        <ActionButtons>
          <DeferButton>Defer</DeferButton>
          <DisputeButton onClick={handleDisputeClick}>Dispute</DisputeButton>
          <RejectButton onClick={handleRejectClick}>Reject</RejectButton>
          <ApproveButton onClick={handleApproveClick}>Approve</ApproveButton>
        </ActionButtons>
      ) : null}
      <CommentViewModal
        {...commentModalProps}
        handleToggleModal={handleToggleModal}
      />
    </Container>
  )
}

export default withRouter(ApproveClaim)
