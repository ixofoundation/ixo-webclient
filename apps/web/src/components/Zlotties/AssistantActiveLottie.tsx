import blackAnimation from '/public/assets/lottie/assistant-active-black.json'
import whiteAnimation from '/public/assets/lottie/assistant-active-white.json'
import { useCompanion } from 'hooks/useCompanion'
import { useCompanionDesignConfig } from 'hooks/userInterface/useCompanionDesignConfig'
import { useLottie } from 'lottie-react'
import { useEffect } from 'react'

const style = { width: 50, height: 50 }

const getAnimation = (isCompanionOpen: boolean, idleLottie?: string, activeLottie?: string) => {
  if (isCompanionOpen) {
    return activeLottie === 'black' ? blackAnimation : whiteAnimation
  }
  return idleLottie === 'black' ? blackAnimation : whiteAnimation
}

const AssistantActiveLottie = () => {
  const { isCompanionOpen } = useCompanion()
  const { idleLottie, activeLottie } = useCompanionDesignConfig()

  const options = {
    animationData: getAnimation(isCompanionOpen, idleLottie, activeLottie),
    loop: true,
    autoplay: false,
  }

  const { View, play, stop } = useLottie(options, style)

  useEffect(() => {
    if (isCompanionOpen) {
      play()
    } else {
      stop()
    }
  }, [isCompanionOpen, play, stop])

  return View
}

export default AssistantActiveLottie
