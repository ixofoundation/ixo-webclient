import ControlPanel from 'components/ControlPanel'
import { useQuery } from 'hooks/window'
import ClaimForm from './ClaimForm'
import { OverviewHero } from '../Components'
import { LinkedFiles } from './LinkedFiles'
import { PageContent } from './PageContent'
import OfferForm from './OfferForm'
import { AgentRoles } from 'types/models'
import { Flex, ScrollArea } from '@mantine/core'
import PageContentLegacy from './PageContentLegacy'
import { useEntityOverview } from 'hooks/entity/useEntityOverview'
import { useParams } from 'react-router-dom'
import { useEffect, useMemo } from 'react'

const Overview: React.FC = () => {
  const { getQuery } = useQuery()
  const claimId = getQuery('claimId')
  const claimCollectionId = getQuery('collectionId')
  const agentRole: AgentRoles = getQuery('agentRole') as AgentRoles
  const { entityId = '' } = useParams<{ entityId: string }>()

  const { page, pageLegacy, creator, profile, startDate, refetch, linkedFiles, service, type = "" } = useEntityOverview(entityId)

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

  return (
    <Flex w='100%' h='100%' bg='#F8F9FD'>
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
            entityType={type}
          />
          {!claimId && !claimCollectionId && (
            <>
              <PageContent page={page} />
              {pageLegacy && <PageContentLegacy page={pageLegacy} />}
              <LinkedFiles linkedFiles={linkedFiles} service={service} />
            </>
          )}
          {claimCollectionId && agentRole && <OfferForm claimCollectionId={claimCollectionId} agentRole={agentRole} />}
          {claimId && <ClaimForm claimId={claimId} />}
        </Flex>
      </ScrollArea>
      <Flex h='100%' bg='#F0F3F9'>
        <ControlPanel entityType={type} entityName={name} />
      </Flex>
    </Flex>
  )
}

export default Overview
