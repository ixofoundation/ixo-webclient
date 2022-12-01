import React, { useState } from 'react'
import { ModalWrapper } from 'components/Wrappers/ModalWrapper'

import { Container, ModalInner, ImageWrapper, Shadow, VideoContainer } from './Video.styles'

interface Props {
  src: string
  onError: () => void
}

const Video: React.FunctionComponent<Props> = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleVideoClick = (): void => {
    setIsModalOpen(true)
  }

  return (
    <Container>
      <VideoContainer onClick={handleVideoClick}>
        <video width='220px' height='140px' onError={(): void => props.onError()}>
          <source src={props.src} />
        </video>
      </VideoContainer>
      <ModalWrapper
        isModalOpen={isModalOpen}
        handleToggleModal={(isOpen: boolean): void => {
          setIsModalOpen(isOpen)
        }}
        bgColor='transparent'
      >
        <ModalInner>
          <ImageWrapper>
            <Shadow />
            <video width='770px' controls>
              <source src={props.src} />
            </video>
          </ImageWrapper>
        </ModalInner>
      </ModalWrapper>
    </Container>
  )
}

export default Video
