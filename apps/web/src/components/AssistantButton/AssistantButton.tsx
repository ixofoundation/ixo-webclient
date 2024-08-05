import React, { useState } from 'react'
import Lottie from 'react-lottie'
import assistanceAnimation from '/public/assets/animations/assistant/hover.json'
import { AssistantButton as StyledAssistantButton } from './AssistantButton.styles'

interface Props {
  handleClick?: () => void
}

const AssistantButton: React.FC<Props> = ({ handleClick }): JSX.Element => {
  const [animLoop, setAnimLoop] = useState(false)

  return (
    <StyledAssistantButton
      onMouseEnter={(): void => setAnimLoop(true)}
      onMouseLeave={(): void => setAnimLoop(false)}
      onClick={(): void => {
        handleClick && handleClick()
      }}
    >
      <Lottie
        height={44}
        width={44}
        options={{
          loop: true,
          autoplay: false,
          animationData: assistanceAnimation,
        }}
        isStopped={!animLoop}
      />
    </StyledAssistantButton>
  )
}

export default AssistantButton
