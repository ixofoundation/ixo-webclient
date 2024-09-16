import { useLocation, matchPath } from 'react-router-dom'
import { CreateFlowProfileCard } from './Actions/CreateFlowProfileCard'
import { Flex } from '@mantine/core'
import { CreateFlowDescriptionCard } from './Actions/CreateFlowDescriptionCard'
import { CreateFlowSDGCard } from './Actions/CreateFlowSDGCard'
import { CreateFlowStageCard } from './Actions/CreateFlowStageCard'
import { CreateFlowTypeCard } from './Actions/CreateFlowTypeCard'
import { CreateFlowDateRangeCard } from './Actions/CreateFlowDateRangeCard'
import { RequestEntityActions } from './RequestEntityActions'

const ControlPanel = () => {
  const location = useLocation()

  const getControlPanelContent = () => {
    if (matchPath('/entity/create-new/:protocolId/*', location.pathname)) {
      return (
        <>
          <CreateFlowProfileCard />
          <CreateFlowSDGCard />
          <CreateFlowDescriptionCard />
          <CreateFlowStageCard />
          <CreateFlowTypeCard />
          <CreateFlowDateRangeCard />
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
          <RequestEntityActions />
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
