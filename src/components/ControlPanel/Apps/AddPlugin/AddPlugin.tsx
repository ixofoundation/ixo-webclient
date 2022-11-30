import styled from 'styled-components'
import AddPluginImage from 'assets/icons/AddPlugin'
import Tooltip from '../../../Tooltip/Tooltip'

const AddpluginComponent = styled.div`
  background: #fff;
  border-style: dotted;
`

interface Props {
  buttonClassName: string //index > 3 ? (showMore ? 'show' : 'hide') : 'show'
}

const AddPlugin: React.FunctionComponent<Props> = ({ buttonClassName }) => {
  return (
    <Tooltip text='Plugins (Coming)'>
      <button className={buttonClassName}>
        <AddpluginComponent className='icon-wrapper grey-border'>
          <AddPluginImage width={30} />
        </AddpluginComponent>
        Add a Plugin...
      </button>
    </Tooltip>
  )
}

export default AddPlugin
