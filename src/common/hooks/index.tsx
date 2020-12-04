import { useState, useEffect } from 'react'
import { useSpring } from 'react-spring'

interface HooksReturnType {
  width: number
  height: number
}

function useWindowSize(): HooksReturnType {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  })

  useEffect(() => {
    // Handler to call on window resize
    function handleResize(): void {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // Add event listener
    window.addEventListener('resize', handleResize)

    // Call handler right away so state gets updated with initial window size
    handleResize()

    // Remove event listener on cleanup
    return (): void => window.removeEventListener('resize', handleResize)
  }, []) // Empty array ensures that effect is only run on mount

  return windowSize
}

const useAssistant = assistant => {
  const windowSize = useWindowSize()

  const [assistantActive, setAssistantActive] = useState(assistant)

  const [resizeMain, setResizeMain] = useSpring(() => ({
    width: assistant ? windowSize.width < 768 ? '0%' : '75%' : '100%',
  }))

  const [resizeAssistant, setResizeAssistant] = useSpring(() => ({
    width: assistant ? windowSize.width < 768 ? '100%' : '25%' : '0%',
    display: assistant ? 'block' : 'none',
    background: '#F0F3F9',
  }))

  const toggleAssistant = (): void => {
    setResizeMain({
      width: !assistantActive ? windowSize.width < 768 ? '0%' : '75%' : '100%',
    })

    setResizeAssistant({
      width: !assistantActive ? windowSize.width < 768 ? '100%' : '25%' : '0%',
      display: assistantActive ? 'none' : 'block',
    })

    setAssistantActive(!assistantActive)
  }

  return { assistantActive, toggleAssistant, resizeMain, resizeAssistant }
}


export { useWindowSize, useAssistant }
