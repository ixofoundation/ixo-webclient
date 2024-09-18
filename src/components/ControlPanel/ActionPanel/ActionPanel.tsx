import ClaimPanel from './ClaimPanel/ClaimPanel'
import KeyValuePanel from './KeyValuePanel'

type ActionPanelProps = {
  type: 'resource' | 'service' | 'claim' | 'entity'
  data: any
}

export const KeyValueActionPanel = ({ type, data }: ActionPanelProps) => {
  switch (type) {
    case 'resource':
    case 'service':
      return <KeyValuePanel data={data} />
    case 'claim':
      return <ClaimPanel data={data} />
    default:
      return <KeyValuePanel data={data} />
  }
}
