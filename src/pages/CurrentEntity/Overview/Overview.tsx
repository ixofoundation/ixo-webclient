import { Box, FlexBox } from 'components/App/App.styles'
import ControlPanel from 'components/ControlPanel/ControlPanel'
import EntityHero from 'components/Entities/SelectedEntity/EntityHero/EntityHero2'
import { useEntityConfig } from 'hooks/configs'
import useCurrentEntity, {
  useCurrentEntityCreator,
  useCurrentEntityLinkedFiles,
  useCurrentEntityProfile,
} from 'hooks/currentEntity'
import { useParams } from 'react-router-dom'
import { LinkedFiles } from './LinkedFiles'
import { PageContent } from './PageContent'

const Overview: React.FC = () => {
  const { entityId } = useParams<{ entityId: string }>()
  const { page = [], startDate } = useCurrentEntity()
  const { controlPanelSchema } = useEntityConfig()
  const { name, description, location } = useCurrentEntityProfile()
  const { displayName: creatorName, logo: creatorLogo } = useCurrentEntityCreator()
  const linkedFiles = useCurrentEntityLinkedFiles()

  return (
    <div className='container-fluid h-100' style={{ background: '#F8F9FD' }}>
      <div className='row h-100'>
        <FlexBox className='col-lg-9' direction='column' py={20} px={20} xs={{ px: 6 }}>
          <EntityHero
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
          <PageContent page={page} />
          <LinkedFiles linkedFiles={linkedFiles} />
        </FlexBox>
        <Box className='col-lg-3' background='#F0F3F9'>
          <ControlPanel schema={controlPanelSchema} entityDid={entityId} claims={[]} />
        </Box>
      </div>
    </div>
  )
}

export default Overview
