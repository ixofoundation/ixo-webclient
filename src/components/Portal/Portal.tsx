import { useState, useLayoutEffect, ReactPortal } from 'react'
import { createPortal } from 'react-dom'

function createWrapperAndAppendToBody(wrapperId: string): HTMLDivElement {
  const element = document.createElement('div')

  element.setAttribute('id', wrapperId)
  document.body.appendChild(element)

  return element
}

function Portal({ children, wrapperId = 'react-portal-wrapper' }: any): ReactPortal {
  const [root, setRoot] = useState<any>(null)

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId)!
    let programmaticallyCreated = false

    // if element is not found with wrapperId or wrapperId is not provided:
    // create and append to body

    if (!element) {
      programmaticallyCreated = true
      element = createWrapperAndAppendToBody(wrapperId)
    }

    setRoot(element)

    return (): void => {
      // delete the programmatically created element (root)
      if (programmaticallyCreated && element.parentNode) {
        element.parentNode.removeChild(element)
      }
    }
  }, [wrapperId])

  // root state will be null on the very first render.
  if (!root) return null!

  return createPortal(children, root)
}

export default Portal
