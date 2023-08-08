import { DropDownOption } from '../types'
import SDGArray from 'constants/sdgIcons.json'
import IconDropDownSelect from '../IconDropDownSelect'
import { Container } from './SDGDropDown.styles'

interface Props {
  value: string
  excludes: string[]
  onChange: (value: string) => void
  onBlur: (value: string) => void
  onFocus: (value: string) => void
}

const SDGDropDown: React.FunctionComponent<Props> = ({ value, excludes, onChange, onBlur, onFocus }) => {
  const options: DropDownOption[] = SDGArray.map((sdg, index) => ({
    text: sdg.title,
    value: (index + 1).toString(),
    iconAssetPath: `/images/sdg/sdg${index + 1}.svg`,
  }))

  return (
    <Container>
      <IconDropDownSelect
        options={options}
        value={value}
        excludes={excludes}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        selectText={'Select Tag'}
      />
    </Container>
  )
}

export default SDGDropDown
