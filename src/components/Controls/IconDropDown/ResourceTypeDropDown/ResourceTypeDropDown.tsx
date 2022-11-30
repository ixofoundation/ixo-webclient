import { DropDownOption } from '../types'
import IconDropDownSelect from '../IconDropDownSelect'
import { Container } from './ResourceTypeDropDown.styles'
import { LinkedResourceType } from 'modules/Entities/types'

interface Props {
  value: string
  onChange: (value: string) => void
  onBlur: (value: string) => void
  onFocus: (value: string) => void
}

const ResourceTypeDropDown: React.FunctionComponent<Props> = ({ value, onChange, onBlur, onFocus }) => {
  const options: DropDownOption[] = Object.keys(LinkedResourceType)
    .slice(1)
    .map((resourceType) => ({
      text: LinkedResourceType[resourceType],
      value: LinkedResourceType[resourceType],
      iconAssetPath: `/img/resourcetype/${LinkedResourceType[resourceType]}.svg`,
    }))

  return (
    <Container>
      <IconDropDownSelect
        options={options}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        selectText={'Select Resource Type'}
      />
    </Container>
  )
}

export default ResourceTypeDropDown
