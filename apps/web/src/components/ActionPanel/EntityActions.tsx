import { useLocation, matchPath } from 'react-router-dom'
import { CreateFlowProfileCard } from './Actions/CreateFlowProfileCard'
import { Flex } from '@mantine/core'
import { CreateFlowDescriptionCard } from './Actions/CreateFlowDescriptionCard'
import { CreateFlowSDGCard } from './Actions/CreateFlowSDGCard'
import { CreateFlowStageCard } from './Actions/CreateFlowStageCard'
import { CreateFlowTypeCard } from './Actions/CreateFlowTypeCard'
import { CreateFlowDateRangeCard } from './Actions/CreateFlowDateRangeCard'

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

    return null
  }

  return (
    <Flex direction='column' gap={10}>
      {getControlPanelContent()}
    </Flex>
  )
}

export default ControlPanel
