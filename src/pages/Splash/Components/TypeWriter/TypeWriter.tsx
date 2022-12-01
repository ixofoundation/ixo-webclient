import { FunctionComponent, useEffect, useRef, useState } from 'react'

import { TypeWriterText, TypeWriterCursor } from './TypeWriter.styles'

interface TypeWriterProps {
  text: string | string[]
  typingSpeed: number
  typingDelay: number
  eraseSpeed: number
  eraseDelay: number
  showCursor?: boolean
}

const TypeWriter: FunctionComponent<TypeWriterProps> = ({
  text,
  typingSpeed,
  eraseSpeed,
  typingDelay,
  eraseDelay,
  showCursor = false,
}) => {
  const mounted = useRef(false)
  const [currentText, setCurrentText] = useState('')
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)
  const [isTyping, setIsTyping] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)

  const getRawText = (): string[] => {
    return typeof text === 'string' ? [text] : [...text]
  }

  const type = (): void => {
    if (!mounted.current) return
    const rawText = getRawText()[currentIndex]

    if (currentText.length < rawText.length) {
      const displayText = rawText.substring(0, currentText.length + 1)

      setCurrentText(displayText)
    }
  }

  const startTyping = (): void => {
    setTimeoutId(setTimeout(type, typingSpeed))
  }

  const erase = (): void => {
    if (!mounted.current) return
    if (currentText.length !== 0) {
      const displayText = currentText.substring(-currentText.length, currentText.length - 1)

      setCurrentText(displayText)
    } else {
      const textArray = getRawText()
      const index = currentIndex + 1 === textArray.length ? 0 : currentIndex + 1

      setCurrentIndex(index)
    }
  }

  useEffect(() => {
    mounted.current = true
    startTyping()

    return (): void => {
      mounted.current = false
      if (timeoutId) clearTimeout(timeoutId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const rawText = getRawText()[currentIndex]

    if (isTyping) {
      if (currentText.length < rawText.length) {
        setTimeoutId(setTimeout(type, typingSpeed))
      } else {
        setIsTyping(false)
        setTimeoutId(setTimeout(erase, eraseDelay))
      }
    } else {
      if (currentText.length === 0) {
        const textArray = getRawText()
        const index = currentIndex + 1 === textArray.length ? 0 : currentIndex + 1

        if (index === currentIndex) {
          setIsTyping(true)
          setTimeout(startTyping, typingDelay)
        } else {
          setTimeout(() => setCurrentIndex(index), typingDelay)
        }
      } else {
        setTimeoutId(setTimeout(erase, eraseSpeed))
      }
    }

    return (): void => {
      if (timeoutId) clearTimeout(timeoutId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentText])

  useEffect(() => {
    if (!isTyping) {
      setIsTyping(true)
      startTyping()
    }

    return (): void => {
      if (timeoutId) clearTimeout(timeoutId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex])

  return (
    <>
      <TypeWriterText>{currentText}</TypeWriterText>
      {showCursor && <TypeWriterCursor>|</TypeWriterCursor>}
    </>
  )
}

export default TypeWriter
