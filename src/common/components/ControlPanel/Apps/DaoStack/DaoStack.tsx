import DAOStackIcon from 'assets/icons/DAOStack'
import Tooltip from '../../../Tooltip/Tooltip'
import { Control } from '../../types'

interface Props {
  buttonClassName: string //index > 3 ? (showMore ? 'show' : 'hide') : 'show'
  control: Control
}

const DaoStack: React.FunctionComponent<Props> = ({ control, buttonClassName }) => {
  return (
    <Tooltip text={control.tooltip}>
      <button className={buttonClassName}>
        <div
          className='icon-wrapper'
          style={{
            background: '#000',
          }}
        >
          <DAOStackIcon width={36} />
        </div>
        {control.title}
      </button>
    </Tooltip>
  )
}

export default DaoStack
