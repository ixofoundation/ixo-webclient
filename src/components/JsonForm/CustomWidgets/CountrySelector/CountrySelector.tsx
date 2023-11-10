import { useCallback } from 'react'
import CountryDropDown from '../../../Controls/IconDropDown/CountryDropDown/CountryDropDown'

interface Props {
  id: string
  value: string
  onChange: (value: string) => void
  onBlur: (id: string, value: string) => void
  onFocus: (id: string, value: string) => void
}

const CountrySelector: React.FunctionComponent<Props> = ({ id, value, onChange, onBlur, onFocus }) => {
  const handleBlur = useCallback(
    (value: string) => {
      onBlur(id, value)
    },
    [onBlur, id],
  )
  const handleFocus = useCallback(
    (value: string) => {
      onFocus(id, value)
    },
    [onFocus, id],
  )
  return <CountryDropDown value={value} onBlur={handleBlur} onFocus={handleFocus} onChange={onChange}></CountryDropDown>
}

export default CountrySelector
