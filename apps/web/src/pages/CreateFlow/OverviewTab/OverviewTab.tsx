import { Flex, Tabs } from '@mantine/core'
import Claims from 'assets/icons/Claims'
import Tasks from 'pages/CurrentEntity/Overview/Tasks/Tasks'
import CreateFlowPage from './Components/CreateFlowPage'
import CreateFlowResources from './Components/CreateFlowResources'
import { SetupGroups } from '../Components/SetupGroups'

const OverviewTab = () => {
  return (
    <Flex w='100%'>
      <Tabs.Panel value='overview' w='100%'>
        <CreateFlowPage />
      </Tabs.Panel>
      <Tabs.Panel value='tasks' w='100%'>
        <Flex w='100%' justify={'center'} align={'center'}>
          <Tasks />
        </Flex>
      </Tabs.Panel>

      <Tabs.Panel value='groups' w='100%'>
        <Flex w='100%' justify={'center'} align={'center'}>
          <SetupGroups />
        </Flex>
      </Tabs.Panel>

      <Tabs.Panel value='resources' w={'100%'}>
        <Flex w='100%' justify={'center'} align={'center'} direction={'column'} gap={25}>
          <CreateFlowResources />
        </Flex>
      </Tabs.Panel>

      <Tabs.Panel value='claims' w='100%'>
        <Flex w='100%' justify={'center'} align={'center'}>
          <Claims />
        </Flex>
      </Tabs.Panel>
    </Flex>
  )
}

export default OverviewTab
