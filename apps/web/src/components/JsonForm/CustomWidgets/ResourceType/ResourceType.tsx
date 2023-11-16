import { useCallback } from 'react'
import ResourceTypeDropDown from '../../../Controls/IconDropDown/ResourceTypeDropDown/ResourceTypeDropDown'

interface Props {
  id: string
  value: string
  onChange: (value: string) => void
  onBlur: (id: string, value: string) => void
  onFocus: (id: string, value: string) => void
}

const ResourceType: React.FunctionComponent<Props> = ({ id, value, onChange, onBlur, onFocus }) => {
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

  const handleChange = useCallback(
    (sdg: string) => {
      onChange(sdg)
    },
    [onChange],
  )
  return (
    <>
      <div>
        <ResourceTypeDropDown onBlur={handleBlur} onFocus={handleFocus} value={value} onChange={handleChange} />
      </div>
    </>
  )
}

export default ResourceType
