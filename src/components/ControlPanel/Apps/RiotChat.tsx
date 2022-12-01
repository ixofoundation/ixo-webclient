import RiotIcon from 'assets/icons/Riot'
import Tooltip from '../../Tooltip/Tooltip'
import { Control } from '../types'

interface Props {
  buttonClassName: string //index > 3 ? (showMore ? 'show' : 'hide') : 'show'
  control: Control
}

const RiotChat: React.FunctionComponent<Props> = ({ control, buttonClassName }) => {
  return (
    <Tooltip text={control.tooltip}>
      <button className={buttonClassName}>
        <div
          className='icon-wrapper grey-border'
          style={{
            background: '#fff',
          }}
        >
          <RiotIcon width={36} />
        </div>
        {control.title}
      </button>
    </Tooltip>
  )
}

export default RiotChat
