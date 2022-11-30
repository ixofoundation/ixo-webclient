import cx from 'classnames'
import { ModalTextAreaWrapper, IconWrapper, TextAreaWrapper, InvalidLabel } from './ModalTextArea.styles'

interface Props {
  invalid?: boolean
  invalidLabel?: string
  disable?: boolean
  preIcon?: string
  placeholder?: string
  value: string
  rows?: number
  cols?: number
  handleChange?: (event: any) => void
}

const ModalTextArea: React.FunctionComponent<Props> = ({
  invalid = false,
  invalidLabel = '',
  disable = false,
  preIcon,
  placeholder,
  value,
  rows,
  cols,
  handleChange,
}) => {
  return (
    <>
      <ModalTextAreaWrapper className={cx({ disable: disable, invalid: invalid })}>
        {preIcon && (
          <IconWrapper>
            <img src={preIcon} alt={placeholder} />
          </IconWrapper>
        )}
        <TextAreaWrapper className={cx({ disable: disable })} style={preIcon ? { paddingLeft: '30px' } : {}}>
          <textarea
            name='recipient_address'
            value={value}
            onChange={handleChange}
            rows={rows}
            cols={cols}
            placeholder={placeholder ?? 'Some placeholder'}
          />
        </TextAreaWrapper>
      </ModalTextAreaWrapper>
      <InvalidLabel className={cx({ visible: invalid }, { invisible: !invalid })}>{invalidLabel}</InvalidLabel>
    </>
  )
}

export default ModalTextArea
