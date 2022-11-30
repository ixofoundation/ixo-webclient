import ResourceTypeDropDown from '../../../Controls/IconDropDown/ResourceTypeDropDown/ResourceTypeDropDown'

interface Props {
  id: string
  value: string
  onChange: (value: string) => void
  onBlur: (id: string, value: string) => void
  onFocus: (id: string, value: string) => void
}

const ResourceType: React.FunctionComponent<Props> = ({ id, value, onChange, onBlur, onFocus }) => {
  return (
    <>
      <div>
        <ResourceTypeDropDown
          onBlur={(value): void => onBlur(id, value)}
          onFocus={(value): void => onFocus(id, value)}
          value={value}
          onChange={(sdg): void => onChange(sdg)}
        />
      </div>
    </>
  )
}

export default ResourceType
