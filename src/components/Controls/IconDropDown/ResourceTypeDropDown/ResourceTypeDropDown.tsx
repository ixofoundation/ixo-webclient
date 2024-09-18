import React, { useMemo } from 'react'
import IconDropDownSelect from '../IconDropDownSelect'
import { Container } from './ResourceTypeDropDown.styles'
import { LinkedResourceType } from 'types/entities'

interface Props {
  value: string
  onChange: (value: string) => void
  onBlur: (value: string) => void
  onFocus: (value: string) => void
}

const ResourceTypeDropDown: React.FunctionComponent<Props> = ({ value, onChange, onBlur, onFocus }) => {
  const options = useMemo(() => {
    return Object.keys(LinkedResourceType)
      .slice(1) // Assuming the first item is not needed
      .map((resourceType) => ({
        text: LinkedResourceType[resourceType],
        value: LinkedResourceType[resourceType],
        iconAssetPath: `/img/resourcetype/${LinkedResourceType[resourceType]}.svg`,
      }))
  }, [])

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

export default React.memo(ResourceTypeDropDown)
