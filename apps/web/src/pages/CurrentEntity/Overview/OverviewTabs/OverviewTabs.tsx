import { Flex, Tabs } from '@mantine/core'
import Page from '../Page/Page'
import { ResourceTable } from '../Resources/Resources'
import Claims from '../Claims/Claims'
import { ServiceTable } from '../Services/Services'
import Tasks from '../Tasks/Tasks'

const OverviewTabs = () => {

  return (
    <Flex w='100%'>
      <Tabs.Panel value='page' w='100%'>
        <Page />
      </Tabs.Panel>
      <Tabs.Panel value='tasks' w='100%'>
        <Flex w='100%' justify={'center'} align={'center'}>
          <Tasks />
        </Flex>
      </Tabs.Panel>
      <Tabs.Panel value='services' w='100%'>
        <Flex w='100%' justify={'center'} align={'center'}>
          <ServiceTable />
        </Flex>
      </Tabs.Panel>

      <Tabs.Panel value='rights' h='100%' w='100%'>
        <Flex justify={'center'} align={'center'} w='100%' h='100%'></Flex>
      </Tabs.Panel>
      <Tabs.Panel value='resources' w={'100%'}>
        <Flex w='100%' justify={'center'} align={'center'}>
          <ResourceTable />
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

export default OverviewTabs
