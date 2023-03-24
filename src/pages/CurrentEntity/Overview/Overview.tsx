import { Box } from 'components/App/App.styles'
import ControlPanel from 'components/ControlPanel/ControlPanel'
import EntityHero from 'components/Entities/SelectedEntity/EntityHero/EntityHero2'
import { useEntityConfig } from 'hooks/configs'
import React from 'react'
import { useParams } from 'react-router-dom'
import { PageContent } from './PageContent'

const Overview: React.FC = () => {
  const { entityId } = useParams<{ entityId: string }>()
  const { controlPanelSchema } = useEntityConfig()

  return (
    <div className='container-fluid'>
      <div className='row'>
        <Box className='col-lg-9 pl-3 pl-md-5'>
          <EntityHero onlyTitle={false} assistantFixed={true} light />
          <PageContent />
        </Box>
        <Box className='col-lg-3' background='#F0F3F9'>
          <ControlPanel schema={controlPanelSchema} entityDid={entityId} claims={[]} />
        </Box>
      </div>
    </div>
  )
}

export default Overview
