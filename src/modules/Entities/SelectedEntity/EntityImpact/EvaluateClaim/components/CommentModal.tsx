import React, { useEffect } from 'react'
import { ModalWrapper } from 'common/components/Wrappers/ModalWrapper'
import styled from 'styled-components'

export const ModalInner = styled.div`
  padding: 2rem 0rem;
  margin: 0rem -0.7rem;
  position: relative;
`

export const ContentContainer = styled.div`
  width: 800px;
  background: white;
  border-radius: 4px;
  padding: 50px 65px;
`

export const TitleHeader = styled.div`
  font-size: 22px;
  line-height: 26px;
  color: black;
  margin-bottom: 32px;
`

export const Description = styled.div`
  font-size: 12px;
  line-height: 14px;
  color: #143f54;
`

export const StyledTextarea = styled.textarea`
  margin-top: 10px;
  background: #e8edee;
  min-height: 300px;
  width: 100%;
  padding: 12px;
  outline: none;
  border: none;
  border-radius: 4px;
`
export const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`

export const DoneButton = styled.button`
  background: ${(props): string => props.theme.ixoBlue};
  border: none;
  border-radius: 4px;
  width: 138px;
  height: 50px;
  color: white;
  font-weight: 700;
  outline: none !important;
`

export const CancelButton = styled.button`
  background: white;
  border: none;
  border-radius: 4px;
  height: 50px;
  color: black;
  font-weight: 700;
  padding: 0;
  outline: none !important;
`

interface Props {
  title: string
  isOpen: boolean
  initialComments: string
  canUpdate: boolean
  handleToggleModal?: (isOpen: boolean) => void
  handleSave: (comment: string) => void
}

const CommentModal: React.FunctionComponent<Props> = ({
  title,
  isOpen,
  initialComments,
  canUpdate,
  handleToggleModal,
  handleSave,
}) => {
  const [comment, setComment] = React.useState(initialComments)

  useEffect(() => {
    setComment(initialComments)
  }, [initialComments])

  const handleDoneClick = (): void => {
    setComment('')
    handleSave(comment)
    handleToggleModal(false)
  }

  return (
    <ModalWrapper
      isModalOpen={isOpen}
      handleToggleModal={handleToggleModal}
      bgColor="transparent"
    >
      <ModalInner>
        <ContentContainer>
          <TitleHeader>
            Add Note to <strong>{title}</strong>&nbsp;Card
          </TitleHeader>
          <Description>Leave a Comment or Note</Description>
          <StyledTextarea
            value={comment}
            onChange={(event): void => setComment(event.target.value)}
          ></StyledTextarea>
          <Description>
            Only visible if you select to include notes with submission.
          </Description>
          {canUpdate && (
            <Buttons>
              <CancelButton onClick={(): void => handleToggleModal(false)}>
                Cancel
              </CancelButton>
              <DoneButton onClick={handleDoneClick}>Done</DoneButton>
            </Buttons>
          )}
        </ContentContainer>
      </ModalInner>
    </ModalWrapper>
  )
}

export default CommentModal
