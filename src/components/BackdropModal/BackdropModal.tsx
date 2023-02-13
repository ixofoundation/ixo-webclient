import { BackdropWrapper, Button, ButtonWrapper, ModalWrapper } from './BackdropModal.styles'

interface Props {
  cancelText: string
  submitText: string
  backdropStyle?: any
  style?: any
  submitEnabled?: boolean
  resetText?: string
  onSubmit: () => void
  onCancel: () => void
  onReset?: () => void
}

const BackdropModal: React.FunctionComponent<Props> = ({
  children,
  submitText,
  cancelText,
  backdropStyle,
  style,
  submitEnabled = true,
  resetText,
  onSubmit,
  onCancel,
  onReset,
}) => {
  return (
    <BackdropWrapper style={backdropStyle}>
      <ModalWrapper style={style} data-rbd-drag-handle-draggable-id='gibberish' data-rbd-drag-handle-context-id={0}>
        <div>{children}</div>
        <ButtonWrapper>
          <Button type='button' onClick={onCancel}>
            {cancelText}
          </Button>
          <div>
            {resetText && (
              <Button type='button' onClick={onReset} className='mr-2'>
                {resetText}
              </Button>
            )}
            <Button type='button' className='submit' onClick={onSubmit} disabled={!submitEnabled}>
              {submitText}
            </Button>
          </div>
        </ButtonWrapper>
      </ModalWrapper>
    </BackdropWrapper>
  )
}

export default BackdropModal
