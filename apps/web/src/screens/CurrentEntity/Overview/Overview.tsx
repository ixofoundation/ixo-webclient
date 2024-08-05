import { Box, Flex, Tabs } from '@mantine/core'

import { useNavigate, useParams } from 'react-router-dom'
import { selectEntityConfig } from 'redux/configs/configs.selectors'
import { useAppSelector } from 'redux/hooks'
import { useMantineTheme } from '@mantine/core'
import EntityOverviewHero from 'components/EntityOverviewHero/EntityOverviewHero'
import { useEntityOverview } from 'hooks/entity/useEntityOverview'
import Page from './Page/Page'
import { ResourceTable } from './Resources/Resources'
import Claims from './Claims/Claims'
import { ServiceTable } from './Services/Services'
import { useKeyValueViewerContext } from 'contexts/KeyValueViewerContext'
import { useEffect } from 'react'

const Overview: React.FC = () => {
  const { entityId = '', tab = 'page' } = useParams<{ entityId: string; tab: string }>()
  const theme = useMantineTheme()
  const config = useAppSelector(selectEntityConfig)
  const primaryColor = config.theme.primaryColor ?? theme.colors.blue[5]
  const navigate = useNavigate()
  const { resetKeyValue } = useKeyValueViewerContext()

  useEntityOverview(entityId)

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
    <Box w='100%' h='100%'>
      <EntityOverviewHero />
      <Flex mx={80}>
        <Tabs
          color={primaryColor}
          defaultValue='page'
          mt={20}
          w='100%'
          h='100%'
          styles={{ tab: { outline: 'none' }, tabLabel: { fontWeight: 'bold', color: '#A8ADAE', fontSize: 16 } }}
          value={tab}
          onChange={handleTabChange}
        >
          <Tabs.List pb={20}>
            <Tabs.Tab value='page' pb={2} px={0} mr={10}>
              Overview
            </Tabs.Tab>
            <Tabs.Tab value='services' pb={2} px={0} mx={10}>
              Services
            </Tabs.Tab>
            <Tabs.Tab value='rights' pb={2} px={0} mx={10}>
              Rights
            </Tabs.Tab>
            <Tabs.Tab value='resources' pb={2} px={0} ml={10}>
              Resources
            </Tabs.Tab>
            <Tabs.Tab value='claims' pb={2} px={0} ml={10}>
              Claims
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value='page'>
            <Page />
          </Tabs.Panel>

          <Tabs.Panel value='services'>
            <Flex w='100%' justify={'center'} align={'center'}>
              <ServiceTable />
            </Flex>
          </Tabs.Panel>

          <Tabs.Panel value='rights' h='100%' w='100%'>
            <Flex justify={'center'} align={'center'} w='100%' h='100%'></Flex>
          </Tabs.Panel>
          <Tabs.Panel value='resources'>
            <Flex w='100%' justify={'center'} align={'center'}>
              <ResourceTable />
            </Flex>
          </Tabs.Panel>
          <Tabs.Panel value='claims'>
            <Flex w='100%' justify={'center'} align={'center'}>
              <Claims />
            </Flex>
          </Tabs.Panel>
        </Tabs>
      </Flex>
    </Box>
  )
}

export default Overview
