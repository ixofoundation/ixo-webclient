import SocialInput, { Type } from '../../../Controls/IconInput/SocialInput/SocialInput'

interface Props {
  id: string
  options: any
  value: string
  placeholder: string
  onChange: (value: any) => void
  onFocus: (id: string, value: any) => void
  onBlur: (id: string, value: any) => void
}

const SocialTextBox: React.FunctionComponent<Props> = ({
  id,
  options: { socialIcon },
  placeholder,
  value,
  onChange,
  onBlur,
  onFocus,
}) => {
  return (
    <SocialInput
      type={Type[socialIcon as keyof typeof Type]}
      value={value}
      onBlur={(value): void => onBlur(id, value)}
      onFocus={(value): void => onFocus(id, value)}
      onChange={onChange}
      placeholder={placeholder}
    />
  )
}

export default SocialTextBox
