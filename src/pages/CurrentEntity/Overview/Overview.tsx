import { FlexBox } from 'components/App/App.styles'
import ControlPanel from 'components/ControlPanel'
import { useEntityConfig } from 'hooks/configs'
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

const Overview: React.FC = () => {
  const { getQuery } = useQuery()
  const claimId = getQuery('claimId')
  const claimCollectionId = getQuery('collectionId')
  const agentRole: AgentRoles = getQuery('agentRole') as AgentRoles

  const { startDate, page } = useCurrentEntity()
  const { controlPanelSchema } = useEntityConfig()
  const { name, description, location } = useCurrentEntityProfile()
  const { displayName: creatorName, logo: creatorLogo } = useCurrentEntityCreator()
  const linkedFiles = useCurrentEntityLinkedFiles()

  return (
    <div className='container-fluid h-100' style={{ background: '#F8F9FD' }}>
      <div className='row h-100'>
        <FlexBox className='col-lg-9' direction='column' py={20} px={20} xs={{ px: 6 }}>
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
        </FlexBox>
        <FlexBox className='col-lg-3 p-0' background='#F0F3F9'>
          {/* <ControlPanel schema={controlPanelSchema} entityDid={entityId} /> */}
          <ControlPanel schema={controlPanelSchema} />
        </FlexBox>
      </div>
    </div>
  )
}

export default Overview
