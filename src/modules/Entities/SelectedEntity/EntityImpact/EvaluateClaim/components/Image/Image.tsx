import React, { useState } from 'react'
import ImageIcon from 'assets/icons/EvaluateClaim/Image'
import { ModalWrapper } from 'common/components/Wrappers/ModalWrapper'

import {
  Container,
  IconContainer,
  ModalInner,
  ImageWrapper,
  Shadow,
} from './Image.styles'

const Image: React.FunctionComponent<React.ImgHTMLAttributes<
  HTMLImageElement
>> = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleImageClick = (): void => {
    setIsModalOpen(true)
  }

  return (
    <Container>
      <IconContainer onClick={handleImageClick}>
        <ImageIcon />
      </IconContainer>
      <img alt="" {...props} />
      <ModalWrapper
        isModalOpen={isModalOpen}
        handleToggleModal={(isOpen: boolean): void => {
          setIsModalOpen(isOpen)
        }}
        bgColor="transparent"
      >
        <ModalInner>
          <ImageWrapper>
            <Shadow />
            <img alt="" src={props.src} />
          </ImageWrapper>
        </ModalInner>
      </ModalWrapper>
    </Container>
  )
}

export default Image
