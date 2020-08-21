import React from 'react'
import { ModalWrapper } from './Modal.styles'

interface Props {
  cancelText: string
  submitText: string
  style?: any
  onSubmit: () => void
  onCancel: () => void
}

const Modal: React.FunctionComponent<Props> = ({
  children,
  submitText,
  cancelText,
  style,
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
        <button type="button" className="submit" onClick={onSubmit}>
          {submitText}
        </button>
      </div>
    </ModalWrapper>
  )
}

export default Modal
