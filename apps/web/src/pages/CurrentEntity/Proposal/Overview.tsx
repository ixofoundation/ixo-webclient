import { LinkedResource } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { Box, FlexBox } from 'components/App/App.styles'
import ControlPanel from 'components/ControlPanel/ControlPanel'
import { EntityLinkedResourceConfig } from 'constants/entity'
import { useEntityConfig } from 'hooks/configs'
import { useParams } from 'react-router-dom'
import { selectEntityById } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { useAppSelector } from 'redux/hooks'
import { OverviewHero } from '../Components'
import { LinkedFiles } from '../Overview/LinkedFiles'
import { PageContent } from '../Overview/PageContent'
import { InstructionsToExecute } from './InstructionsToExecute'

const Overview: React.FC = () => {
  const { entityId, deedId } = useParams<{ entityId: string; deedId: string }>()
  const { controlPanelSchema } = useEntityConfig()
  const entity = useAppSelector(selectEntityById(deedId))

  return (
    <div className='container-fluid h-100' style={{ background: '#F8F9FD' }}>
      <div className='row h-100'>
        <FlexBox className='col-lg-9' direction='column' py={20} px={20} xs={{ px: 6 }}>
          <OverviewHero
            onlyTitle={false}
            assistantFixed={true}
            light
            startDate={(entity?.startDate as never as string) || ''}
            creatorName={entity?.creator?.displayName || ''}
            creatorLogo={entity?.creator?.logo || ''}
          />
          <PageContent page={entity?.page ?? []} />
          <InstructionsToExecute />
          <LinkedFiles
            linkedFiles={
              entity?.linkedResource.filter((item: LinkedResource) =>
                Object.keys(EntityLinkedResourceConfig).includes(item.type),
              ) ?? []
            }
          />
        </FlexBox>
        <Box className='col-lg-3' background='#F0F3F9'>
          <ControlPanel schema={controlPanelSchema} entityDid={entityId} claims={[]} />
        </Box>
      </div>
    </div>
  )
}

export default Overview
