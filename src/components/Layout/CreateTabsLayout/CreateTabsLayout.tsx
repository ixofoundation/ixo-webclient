import EntityOverviewHero from 'components/EntityOverviewHero/EntityOverviewHero'
import { Box, Tabs, Flex, Indicator } from '@mantine/core'
import { useNavigate, useParams, Outlet } from 'react-router-dom'
import { selectEntityConfig } from 'redux/configs/configs.selectors'
import { useAppSelector } from 'redux/hooks'
import { useTheme } from 'styled-components'
import { useEntityOverview } from 'hooks/entity/useEntityOverview'
import { upperFirst } from 'lodash'
import { useKeyValueViewerContext } from 'contexts/KeyValueViewerContext'

const ClaimsTab = ({ type, claimItemsCount }: { type: string; claimItemsCount: number }) => {
  const claimsKey = type === 'deed/request' ? 'tasks' : 'claims'

  return (
    <Tabs.Tab value={claimsKey} pb={2} px={2} mr={10}>
      <Indicator label={claimItemsCount} size={16} position='middle-end' offset={-10}>
        {upperFirst(claimsKey)}
      </Indicator>
    </Tabs.Tab>
  )
}

const Overview: React.FC = () => {
  const theme: any = useTheme()
  const { entityId = '', tab = 'page' } = useParams<{ entityId: string; tab: string }>()
  const { resetKeyValue } = useKeyValueViewerContext()

  const config = useAppSelector(selectEntityConfig)
  const primaryColor = config.theme.primaryColor ?? theme.ixoNewBlue
  const navigate = useNavigate()
  const handleTabChange = (value: string | null) => {
    resetKeyValue()
    if (value === tab) return
    navigate(`/entity/${entityId}/overview/${value}`)
  }
  const { type, claim } = useEntityOverview(entityId)

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
            <Tabs.Tab value='page' pb={2} px={2} mr={10}>
              Overview
            </Tabs.Tab>
            <ClaimsTab type={type} claimItemsCount={Object.values(claim ?? {}).length} />
            <Tabs.Tab value='services' pb={2} px={2} mx={10}>
              Services
            </Tabs.Tab>
            <Tabs.Tab value='rights' pb={2} px={2} mx={10}>
              Rights
            </Tabs.Tab>
            <Tabs.Tab value='resources' pb={2} px={2} ml={10}>
              Resources
            </Tabs.Tab>
          </Tabs.List>
          <Outlet />
        </Tabs>
      </Flex>
    </Box>
  )
}

export default Overview
