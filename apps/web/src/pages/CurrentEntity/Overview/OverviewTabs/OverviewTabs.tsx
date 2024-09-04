import { Flex, Tabs } from '@mantine/core'
import { useParams } from 'react-router-dom'
import Claims from '../Claims/Claims'
import Page from '../Page/Page'
import { ResourceTable } from '../Resources/Resources'
import { ServiceTable } from '../Services/Services'
import Tasks from '../Tasks/Tasks'

const OverviewTabs = () => {
  const { entityId = '' } = useParams<{ entityId: string }>()

  if (!entityId) return null

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

      <Tabs.Panel value='resources' w={'100%'}>
        <Flex w='100%' justify={'center'} align={'center'} direction={'column'} gap={25}>
          <ResourceTable title='Resources' />
          <ServiceTable title='Services' />
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
