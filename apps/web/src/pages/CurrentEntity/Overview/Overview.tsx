import EntityOverviewHero from 'components/EntityOverviewHero/EntityOverviewHero'
import { Box, Tabs, Flex } from '@mantine/core'
import { useNavigate, useParams, Outlet } from 'react-router-dom'
import { selectEntityConfig } from 'redux/configs/configs.selectors'
import { useAppSelector } from 'redux/hooks'
import { useTheme } from 'styled-components'
import { useEntityOverview } from 'hooks/entity/useEntityOverview'
import { upperFirst } from 'lodash'
import { useKeyValueViewerContext } from 'contexts/KeyValueViewerContext'
import styles from './Overview.module.css'

const ClaimsTab = ({ type }: { type: string }) => {
  const claimsKey = type === 'deed/request' ? 'tasks' : 'claims'

  return (
    <Tabs.Tab value={claimsKey} pb={2} px={2} mx={10}>
      {upperFirst(claimsKey)}
    </Tabs.Tab>
  )
}

const Overview: React.FC = () => {
  const theme: any = useTheme()
  const { entityId = '', tab = 'sadasda' } = useParams<{ entityId: string; tab: string }>()
  const { resetKeyValue } = useKeyValueViewerContext()

  const config = useAppSelector(selectEntityConfig)
  const primaryColor = config.theme.primaryColor ?? theme.ixoNewBlue
  const navigate = useNavigate()
  const handleTabChange = (value: string | null) => {
    resetKeyValue()
    if (value === tab) return
    navigate(`/entity/${entityId}/overview/${value}`)
  }

  const { type } = useEntityOverview(entityId)

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
          classNames={{
            tab: styles.tab,
            tabLabel: styles.tabLabel,
            root: styles.tabsRoot,
            list: styles.tabsList,
          }}
          value={tab}
          onChange={handleTabChange}
        >
          <Tabs.List
            pb={20}
            styles={{
              list: {
                borderBottom: 'none',
                '&::before': {
                  display: 'none',
                },
                '&::after': {
                  display: 'none',
                },
              },
            }}
          >
            <Tabs.Tab value='page' pb={2} px={2} mr={10}>
              Overview
            </Tabs.Tab>
            <ClaimsTab type={type} />
            <Tabs.Tab value='resources' pb={2} px={2} mx={10}>
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
