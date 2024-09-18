import { useLocation, matchPath } from 'react-router-dom'
import { Flex } from '@mantine/core'
import { CreateEntityCard } from './Actions/CreateEntityCard'
import { UseProtocolCard } from './Actions/UseProtocolCard'
import { DidQRCode } from 'components/ControlPanel/DidQRCode'

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
    // Check for the specific 'select-or-create' route first
    if (location.pathname === '/entity/select-or-create') {
      // Handle the select-or-create case
      return null // or return a specific component for this route
    }

    if (matchPath('/entity/:entityId/*', location.pathname)) {
      return (
        <>
          <UseProtocolCard />
          <DidQRCode />
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
