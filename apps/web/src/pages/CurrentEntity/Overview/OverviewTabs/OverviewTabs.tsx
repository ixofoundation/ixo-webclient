import { Box, Flex, Tabs } from '@mantine/core'

import { useNavigate, useParams } from 'react-router-dom'
import { selectEntityConfig } from 'redux/configs/configs.selectors'
import { useAppSelector } from 'redux/hooks'
import { useTheme } from 'styled-components'
import { useEntityOverview } from 'hooks/entity/useEntityOverview'
import Page from '../Page/Page'
import { ResourceTable } from '../Resources/Resources'
import Claims from '../Claims/Claims'
import { ServiceTable } from '../Services/Services'
import { useKeyValueViewerContext } from 'contexts/KeyValueViewerContext'
import { useEffect } from 'react'
import Tasks from '../Tasks/Tasks'
import { upperFirst } from 'lodash'

const ClaimsTab = ({ type }: { type: string }) => {
  const claimsKey = type === 'deed/request' ? 'tasks' : 'claims'

  return (
    <Tabs.Tab value={claimsKey} pb={2} px={0} ml={10}>
      {upperFirst(claimsKey)}
    </Tabs.Tab>
  )
}

const OverviewTabs = () => {
  const { entityId = '', tab = 'page' } = useParams<{ entityId: string; tab: string }>()
  const theme: any = useTheme()
  const config = useAppSelector(selectEntityConfig)
  const primaryColor = config.theme.primaryColor ?? theme.ixoNewBlue
  const navigate = useNavigate()
  const { resetKeyValue } = useKeyValueViewerContext()

  const { type } = useEntityOverview(entityId)

  useEffect(() => {
    return () => {
      resetKeyValue()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleTabChange = (value: string | null) => {
    resetKeyValue()
    if (value === tab) return
    navigate(`/entity/${entityId}/overview/${value}`)
  }

  return (
    <Flex w='100%'>
      <Tabs.Panel value='page' w='100%'>
        <Page />
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
      <Tabs.Panel value='tasks' w='100%'>
        <Flex w='100%' justify={'center'} align={'center'}>
          <Tasks />
        </Flex>
      </Tabs.Panel>
    </Flex>
  )
}

export default OverviewTabs
