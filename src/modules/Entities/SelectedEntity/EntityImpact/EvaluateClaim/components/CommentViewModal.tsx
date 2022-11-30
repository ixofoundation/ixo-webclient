import React from 'react'
import { ModalWrapper } from 'components/Wrappers/ModalWrapper'
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
  display: flex;
  align-items: center;

  svg {
    width: 15px;
    height: 15px;
  }
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

interface Props {
  icon: JSX.Element
  title: string
  isOpen: boolean
  comments: string
  handleToggleModal?: (isOpen: boolean) => void
}

const CommentViewModal: React.FunctionComponent<Props> = ({ title, icon, isOpen, comments, handleToggleModal }) => {
  return (
    <ModalWrapper isModalOpen={isOpen} handleToggleModal={handleToggleModal} bgColor='transparent'>
      <ModalInner>
        <ContentContainer>
          <TitleHeader>
            {icon}
            <strong>{title}</strong>&nbsp;Card
          </TitleHeader>
          <StyledTextarea value={comments} readOnly></StyledTextarea>
        </ContentContainer>
      </ModalInner>
    </ModalWrapper>
  )
}

export default CommentViewModal
