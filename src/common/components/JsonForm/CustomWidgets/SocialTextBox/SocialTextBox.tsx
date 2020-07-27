import React from 'react'
import SocialInput, {
  Type,
} from '../../../Controls/IconInput/SocialInput/SocialInput'

interface Props {
  options: any
  value: string
  placeholder: string
  onChange: (value: any) => void
}

const SocialTextBox: React.FunctionComponent<Props> = ({
  options: { socialIcon },
  placeholder,
  value,
  onChange,
}) => {
  return (
    <SocialInput
      type={Type[socialIcon as keyof typeof Type]}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  )
}

export default SocialTextBox
