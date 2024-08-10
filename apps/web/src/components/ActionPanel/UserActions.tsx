import { useLocation, matchPath } from 'react-router-dom'
import { Flex } from '@mantine/core'
import { CreateEntityCard } from './Actions/CreateEntityCard'
import { UseProtocolCard } from './Actions/UseProtocolCard'

const ControlPanel = () => {
  const location = useLocation()

  const getControlPanelContent = () => {
    if (matchPath('/entity/create-new/:protocolId/*', location.pathname)) {
      return (
        <>
          <CreateEntityCard />
        </>
      )
    }
    if (matchPath('/entity/:entityId/*', location.pathname)) {
      return (
        <>
          <UseProtocolCard />
        </>
      )
    }

    return null
  }

  return (
    <Flex direction='column' gap={10}>
      {getControlPanelContent()}
    </Flex>
  )
}

export default ControlPanel
