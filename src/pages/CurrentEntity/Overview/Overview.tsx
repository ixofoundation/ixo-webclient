import ControlPanel from 'components/ControlPanel'
import useCurrentEntity, {
  useCurrentEntityCreator,
  useCurrentEntityLinkedFiles,
  useCurrentEntityProfile,
} from 'hooks/currentEntity'
import { useQuery } from 'hooks/window'
import ClaimForm from './ClaimForm'
import { OverviewHero } from '../Components'
import { LinkedFiles } from './LinkedFiles'
import { PageContent } from './PageContent'
import OfferForm from './OfferForm'
import { AgentRoles } from 'types/models'
import { Flex, ScrollArea } from '@mantine/core'

const Overview: React.FC = () => {
  const { getQuery } = useQuery()
  const claimId = getQuery('claimId')
  const claimCollectionId = getQuery('collectionId')
  const agentRole: AgentRoles = getQuery('agentRole') as AgentRoles

  const { startDate, page } = useCurrentEntity()
  const { name, description, location } = useCurrentEntityProfile()
  const { displayName: creatorName, logo: creatorLogo } = useCurrentEntityCreator()
  const linkedFiles = useCurrentEntityLinkedFiles()

  return (
    <Flex w='100%' h='100%' bg='#F8F9FD'>
      <ScrollArea w='100%'>
        <Flex w='100%' direction='column' p={80} style={{ flex: 1 }}>
          <OverviewHero
            onlyTitle={false}
            assistantFixed={true}
            light
            startDate={startDate}
            name={name}
            description={description}
            location={location}
            creatorName={creatorName}
            creatorLogo={creatorLogo}
          />
          {!claimId && !claimCollectionId && (
            <>
              <PageContent page={page} />
              <LinkedFiles linkedFiles={linkedFiles} />
            </>
          )}
          {claimCollectionId && agentRole && <OfferForm claimCollectionId={claimCollectionId} agentRole={agentRole} />}
          {claimId && <ClaimForm claimId={claimId} />}
        </Flex>
      </ScrollArea>
      <Flex h='100%' bg='#F0F3F9'>
        <ControlPanel />
      </Flex>
    </Flex>
  )
}

export default Overview
