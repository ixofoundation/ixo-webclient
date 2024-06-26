import ClaimPanel from "./ClaimPanel/ClaimPanel"
import KeyValuePanel from "./KeyValuePanel"

type ActionPanelProps = {
    type: 'resource' | 'service' | 'claim'
    data: any
}

const ActionPanel = ({type, data}: ActionPanelProps) => {
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

export default ActionPanel