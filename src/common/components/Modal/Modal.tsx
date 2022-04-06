import React from 'react'
import { ModalWrapper } from './Modal.styles'

interface Props {
  cancelText: string
  submitText: string
  style?: any
  submitEnabled?: boolean
  resetText?: string
  onSubmit: () => void
  onCancel: () => void
  onReset?: () => void
}

const Modal: React.FunctionComponent<Props> = ({
  children,
  submitText,
  cancelText,
  style,
  submitEnabled = true,
  resetText,
  onSubmit,
  onCancel,
  onReset,
}) => {
  return (
    <ModalWrapper
      style={style}
      data-rbd-drag-handle-draggable-id="gibberish"
      data-rbd-drag-handle-context-id={0}
    >
      <div>{children}</div>
      <div className="button-wrapper">
        <button type="button" onClick={onCancel}>
          {cancelText}
        </button>
        <div>
          {resetText && (
            <button type="button" onClick={onReset} className="mr-2">
              {resetText}
            </button>
          )}
          <button
            type="button"
            className="submit"
            onClick={onSubmit}
            disabled={!submitEnabled}
          >
            {submitText}
          </button>
        </div>
      </div>
    </ModalWrapper>
  )
}

export default Modal
