import { useQuery } from 'hooks/window'
import { AgentRoles } from 'types/models'
import { Box, Flex, Tabs, em } from '@mantine/core'

import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { selectEntityConfig } from 'redux/configs/configs.selectors'
import { useAppSelector } from 'redux/hooks'
import { useTheme } from 'styled-components'
import { useMediaQuery } from '@mantine/hooks'
import EntityOverviewHero from 'components/EntityOverviewHero/EntityOverviewHero'
import { useEntityOverview } from 'hooks/entity/useEntityOverview'
import Page from './Page/Page'
import KeyValueTable from 'components/KeyValueTable'
import { ResourceTable } from './Resources/Resources'

const Overview: React.FC = () => {
  const { getQuery } = useQuery()
  const claimId = getQuery('claimId')
  const claimCollectionId = getQuery('collectionId')
  const agentRole: AgentRoles = getQuery('agentRole') as AgentRoles
  const { entityId = '', tab = 'page' } = useParams<{ entityId: string, tab: string }>()
  const theme: any = useTheme()
  const config = useAppSelector(selectEntityConfig)
  const primaryColor = config.theme.primaryColor ?? theme.ixoNewBlue
  const navigate = useNavigate()

  useEntityOverview(entityId)


  const handleTabChange = (value: string | null) => {
    if(value === tab) return
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
          styles={{ tabLabel: { fontWeight: 'bold', color: '#A8ADAE', fontSize: 16 } }}
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
              My Claims
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value='page'>
            <Page />
            {/* {!claimId && !claimCollectionId && ( */}
              <>
                {/* {blocks && <Editor editable={false} initialBlocks={blocks as any} />} */}
                {/* {page && <PageContent page={page} />}
                    {pageLegacy && <PageContentLegacy page={pageLegacy} />} */}
              </>
            {/* )} */}
            {/* {claimCollectionId && agentRole && (
                  // <OfferForm claimCollectionId={claimCollectionId} agentRole={agentRole} />
                )} */}
            {/* {claimId && <ClaimForm claimId={claimId} />} */}
          </Tabs.Panel>

          <Tabs.Panel value='services'>
            <Flex w='100%' justify={'center'} align={'center'}>
              {/* <KeyValueTable columns={servicesColumns} data={service} /> */}
            </Flex>
          </Tabs.Panel>

          <Tabs.Panel value='rights' h='100%' w='100%'>
            <Flex justify={'center'} align={'center'} w='100%' h='100%'>
              {/* {accordedRight?.length === 0 && <Text c="#A8ADAE'">No rights found</Text>} */}
            </Flex>
          </Tabs.Panel>
          <Tabs.Panel value='resources'>
            <Flex w='100%' justify={'center'} align={'center'}>
              <ResourceTable />
            </Flex>
          </Tabs.Panel>
          <Tabs.Panel value='claims'>
            <Flex w='100%' justify={'center'} align={'center'}>
              {/* <KeyValueTable columns={linkedResourceColumns} data={linkedResource} /> */}
            </Flex>
          </Tabs.Panel>
        </Tabs>
      </Flex>
    </Box>
  )
}

export default Overview
