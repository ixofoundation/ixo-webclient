import CountryDropDown from '../../../Controls/IconDropDown/CountryDropDown/CountryDropDown'

interface Props {
  id: string
  value: string
  onChange: (value: string) => void
  onBlur: (id: string, value: string) => void
  onFocus: (id: string, value: string) => void
}

const CountrySelector: React.FunctionComponent<Props> = ({ id, value, onChange, onBlur, onFocus }) => {
  return (
    <CountryDropDown
      value={value}
      onBlur={(value): void => onBlur(id, value)}
      onFocus={(value): void => onFocus(id, value)}
      onChange={onChange}
    ></CountryDropDown>
  )
}

export default CountrySelector
