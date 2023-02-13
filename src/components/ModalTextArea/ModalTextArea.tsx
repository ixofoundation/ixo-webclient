import cx from 'classnames'
import { ModalTextAreaWrapper, IconWrapper, TextAreaWrapper, InvalidLabel } from './ModalTextArea.styles'

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string
  preIcon?: string
}

const ModalTextArea: React.FunctionComponent<Props> = ({ error = '', preIcon, ...rest }) => {
  return (
    <>
      <ModalTextAreaWrapper className={cx({ disabled: { ...rest }.disabled, error })}>
        {preIcon && (
          <IconWrapper>
            <img src={preIcon} alt={''} />
          </IconWrapper>
        )}
        <TextAreaWrapper style={preIcon ? { paddingLeft: '30px' } : {}}>
          <textarea {...rest} />
        </TextAreaWrapper>
      </ModalTextAreaWrapper>
      <InvalidLabel className={cx({ visible: error }, { invisible: !error })}>{error}</InvalidLabel>
    </>
  )
}

export default ModalTextArea
