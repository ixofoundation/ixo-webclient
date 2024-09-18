import EntitySelectorControl from '../../../Selector/EntitySelector/EntitySelector'

interface Props {
  value: string
  options: any
  onChange: (value: any) => void
}

const EntitySelector: React.FunctionComponent<Props> = ({ value, options: { entities }, onChange }) => {
  return <EntitySelectorControl entities={entities} onSelectEntity={onChange} selectedEntityId={value} />
}

export default EntitySelector
