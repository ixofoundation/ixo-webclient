import GitCoinIcon from 'assets/icons/GitCoin'
import Tooltip from '../../../Tooltip/Tooltip'
import { Control } from '../../types'

interface Props {
  buttonClassName: string //index > 3 ? (showMore ? 'show' : 'hide') : 'show'
  control: Control
}

const GitCoin: React.FunctionComponent<Props> = ({ control, buttonClassName }) => {
  return (
    <Tooltip text={control.tooltip}>
      <button className={buttonClassName}>
        <div
          className='icon-wrapper'
          style={{
            background: '#A2DDEF',
          }}
        >
          <GitCoinIcon width={36} />
        </div>
        {control.title}
      </button>
    </Tooltip>
  )
}

export default GitCoin
