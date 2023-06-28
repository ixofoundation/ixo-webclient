import { Box, FlexBox } from 'components/App/App.styles'
import ControlPanel from 'components/ControlPanel/ControlPanel'
import EntityHero from 'components/Entities/SelectedEntity/EntityHero/EntityHero2'
import { useEntityConfig } from 'hooks/configs'
import useCurrentEntity from 'hooks/currentEntity'
import { useParams } from 'react-router-dom'
import { InstructionsToExecute } from './InstructionsToExecute'
import { LinkedFiles } from './LinkedFiles'
import { PageContent } from './PageContent'

const Overview: React.FC = () => {
  const { entityId } = useParams<{ entityId: string }>()
  const { entityType } = useCurrentEntity()
  const { controlPanelSchema } = useEntityConfig()

  return (
    <div className='container-fluid h-100' style={{ background: '#F8F9FD' }}>
      <div className='row h-100'>
        <FlexBox className='col-lg-9' direction='column' py={20} px={20} xs={{ px: 6 }}>
          <EntityHero onlyTitle={false} assistantFixed={true} light />
          <PageContent />
          {entityType === 'deed' && <InstructionsToExecute />}
          <LinkedFiles />
        </FlexBox>
        <Box className='col-lg-3' background='#F0F3F9'>
          <ControlPanel schema={controlPanelSchema} entityDid={entityId} claims={[]} />
        </Box>
      </div>
    </div>
  )
}

export default Overview
