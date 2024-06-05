import ControlPanel from 'components/ControlPanel'
import { useQuery } from 'hooks/window'
import ClaimForm from './ClaimForm'
import { OverviewHero } from '../Components'
import { PageContent } from './PageContent'
import OfferForm from './OfferForm'
import { AgentRoles } from 'types/models'
import { Flex, ScrollArea, Tabs, Text, em, rem } from '@mantine/core'
import PageContentLegacy from './PageContentLegacy'
import { useEntityOverview } from 'hooks/entity/useEntityOverview'
import { useParams } from 'react-router-dom'
import { useEffect, useMemo } from 'react'
import { toRootEntityType } from 'utils/entities'
import { selectEntityConfig } from 'redux/configs/configs.selectors'
import { useAppSelector } from 'redux/hooks'
import { useTheme } from 'styled-components'
import KeyValueTable, { friendlyLinkedResourceNames, getLinkedResourceIcons } from 'components/KeyValueTable'
import { upperFirst } from 'lodash'
import { Column } from 'components/KeyValueTable/KeyValueTable'
import { LiaHddSolid } from 'react-icons/lia'
import { useMediaQuery } from '@mantine/hooks'

const Overview: React.FC = () => {
  const { getQuery } = useQuery()
  const claimId = getQuery('claimId')
  const claimCollectionId = getQuery('collectionId')
  const agentRole: AgentRoles = getQuery('agentRole') as AgentRoles
  const { entityId = '' } = useParams<{ entityId: string }>()
  const theme: any = useTheme()
  const config = useAppSelector(selectEntityConfig)
  const primaryColor = config.theme.primaryColor ?? theme.ixoNewBlue
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`)

  const {
    page,
    pageLegacy,
    creator,
    profile,
    startDate,
    refetch,
    accordedRight,
    service,
    type = '',
    linkedResource = [],
  } = useEntityOverview(entityId)

  const { logo, creatorName, name, description, location } = useMemo(() => {
    return {
      logo: creator?.logo ?? '',
      creatorName: creator?.displayName ?? '',
      name: profile?.name ?? '',
      description: profile?.description ?? '',
      location: profile?.location ?? '',
    }
  }, [creator?.logo, creator?.displayName, profile?.location, profile?.name, profile?.description])

  useEffect(() => {
    if (refetch && !page && !pageLegacy) {
      refetch()
    }
  }, [refetch, page, pageLegacy])

  const servicesColumns: Column[] = [
    {
      title: '',
      render: (row: any) => <LiaHddSolid size={24} color={primaryColor} />,
      style: { style: { width: rem(40) } },
    },
    {
      title: 'type',
      render: (row: any) => row.type,
    },
    {
      title: 'Name',
      render: (row: any) => upperFirst(row?.id.split('#')[1]),
    },
  ]

  const linkedResourceColumns: Column[] = [
    {
      title: '',
      render: (row: any) => getLinkedResourceIcons(row.mediaType, { color: primaryColor }),
      style: { style: { width: rem(40) } },
    },
    {
      title: 'Type',
      render: (row: any) => friendlyLinkedResourceNames(row.mediaType),
    },
    {
      title: 'Name',
      render: (row: any) => upperFirst(row?.id.split('#')[1]),
    },
  ]

  return (
    <Flex w='100%' h='100%' bg='#F8F9FD' direction={isMobile ? 'column' : 'row'}>
      {isMobile ? (
        <Flex w='100%' direction='column' p={isMobile ? 10 : 80} pt={80} style={{ flex: 1 }}>
          <OverviewHero
            $onlyTitle={false}
            assistantFixed={true}
            light
            startDate={String(startDate)}
            name={name}
            description={description}
            location={location}
            creatorName={creatorName}
            creatorLogo={logo}
            entityType={toRootEntityType(type)}
          />
          <Tabs
            color={primaryColor}
            defaultValue='overview'
            mt={20}
            h='100%'
            styles={{ tabLabel: { fontWeight: 'bold', color: '#A8ADAE', fontSize: 16 } }}
          >
            <Tabs.List pb={20}>
              <Tabs.Tab value='overview' pb={2} px={0} mr={10}>
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
            </Tabs.List>

            <Tabs.Panel value='overview'>
              {!claimId && !claimCollectionId && (
                <>
                  {page && <PageContent page={page} />}
                  {pageLegacy && <PageContentLegacy page={pageLegacy} />}
                </>
              )}
              {claimCollectionId && agentRole && (
                <OfferForm claimCollectionId={claimCollectionId} agentRole={agentRole} />
              )}
              {claimId && <ClaimForm claimId={claimId} />}
            </Tabs.Panel>

            <Tabs.Panel value='services'>
              <Flex w='100%' justify={'center'} align={'center'}>
                <KeyValueTable columns={servicesColumns} data={service} />
              </Flex>
            </Tabs.Panel>

            <Tabs.Panel value='rights' h='100%' w='100%'>
              <Flex justify={'center'} align={'center'} w='100%' h='100%'>
                {accordedRight?.length === 0 && <Text c="#A8ADAE'">No rights found</Text>}
              </Flex>
            </Tabs.Panel>
            <Tabs.Panel value='resources'>
              <Flex w='100%' justify={'center'} align={'center'}>
                <KeyValueTable columns={linkedResourceColumns} data={linkedResource} />
              </Flex>
            </Tabs.Panel>
          </Tabs>
        </Flex>
      ) : (
        <ScrollArea w='100%'>
          <Flex w='100%' direction='column' p={80} style={{ flex: 1 }}>
            <OverviewHero
              $onlyTitle={false}
              assistantFixed={true}
              light
              startDate={String(startDate)}
              name={name}
              description={description}
              location={location}
              creatorName={creatorName}
              creatorLogo={logo}
              entityType={toRootEntityType(type)}
            />
            <Tabs
              color={primaryColor}
              defaultValue='overview'
              mt={20}
              h='100%'
              styles={{ tabLabel: { fontWeight: 'bold', color: '#A8ADAE', fontSize: 16 } }}
            >
              <Tabs.List pb={20}>
                <Tabs.Tab value='overview' pb={2} px={0} mr={10}>
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
              </Tabs.List>

              <Tabs.Panel value='overview'>
                {!claimId && !claimCollectionId && (
                  <>
                    {page && <PageContent page={page} />}
                    {pageLegacy && <PageContentLegacy page={pageLegacy} />}
                  </>
                )}
                {claimCollectionId && agentRole && (
                  <OfferForm claimCollectionId={claimCollectionId} agentRole={agentRole} />
                )}
                {claimId && <ClaimForm claimId={claimId} />}
              </Tabs.Panel>

              <Tabs.Panel value='services'>
                <Flex w='100%' justify={'center'} align={'center'}>
                  <KeyValueTable columns={servicesColumns} data={service} />
                </Flex>
              </Tabs.Panel>

              <Tabs.Panel value='rights' h='100%' w='100%'>
                <Flex justify={'center'} align={'center'} w='100%' h='100%'>
                  {accordedRight?.length === 0 && <Text c="#A8ADAE'">No rights found</Text>}
                </Flex>
              </Tabs.Panel>
              <Tabs.Panel value='resources'>
                <Flex w='100%' justify={'center'} align={'center'}>
                  <KeyValueTable columns={linkedResourceColumns} data={linkedResource} />
                </Flex>
              </Tabs.Panel>
            </Tabs>
          </Flex>
        </ScrollArea>
      )}
      <Flex h='100%' bg='#F0F3F9'>
        <ControlPanel entityType={type} entityName={name} />
      </Flex>
    </Flex>
  )
}

export default Overview
