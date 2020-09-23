import React from 'react'
import { ModalWrapper } from './Modal.styles'

interface Props {
  cancelText: string
  submitText: string
  style?: any
  submitEnabled?: boolean
  onSubmit: () => void
  onCancel: () => void
}

const Modal: React.FunctionComponent<Props> = ({
  children,
  submitText,
  cancelText,
  style,
  submitEnabled = true,
  onSubmit,
  onCancel,
}) => {
  return (
    <ModalWrapper style={style}>
      <div>{children}</div>
      <div className="button-wrapper">
        <button type="button" onClick={onCancel}>
          {cancelText}
        </button>
        <button
          type="button"
          className="submit"
          onClick={onSubmit}
          disabled={!submitEnabled}
        >
          {submitText}
        </button>
      </div>
    </ModalWrapper>
  )
}

export default Modal
