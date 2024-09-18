import IconInput from '../IconInput'

export enum Type {
  Discourse = 'Discourse',
  Facebook = 'Facebook',
  Github = 'Github',
  Instagram = 'Instagram',
  LinkedIn = 'LinkedIn',
  Telegram = 'Telegram',
  Twitter = 'Twitter',
  Other = 'Other',
}

interface Props {
  type: Type
  value: string
  placeholder: string
  onChange: (value: string) => void
  onBlur: (value: string) => void
  onFocus: (value: string) => void
}

const SocialInput: React.FunctionComponent<Props> = ({ type, value, placeholder, onChange, onBlur, onFocus }) => {
  return (
    <IconInput
      onBlur={onBlur}
      onFocus={onFocus}
      onChange={onChange}
      value={value}
      iconAssetPath={`/images/social/${type.toString().toLowerCase()}.svg`}
      placeholder={placeholder}
    />
  )
}

export default SocialInput
