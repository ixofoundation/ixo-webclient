import { LinkedResource } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { EntityLinkedResourceConfig } from 'constants/entity'
import { useParams } from 'react-router-dom'
import { selectEntityById } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { useAppSelector } from 'redux/hooks'
import { OverviewHero } from '../Components'
import { LinkedFiles } from '../Overview/LinkedFiles'
import { PageContent } from '../Overview/PageContent'
import { InstructionsToExecute } from './InstructionsToExecute'
import { Flex, ScrollArea } from '@mantine/core'
import ControlPanel from 'components/ControlPanel'

const Overview: React.FC = () => {
  const { deedId = '' } = useParams<{ entityId: string; deedId: string }>()
  const entity = useAppSelector(selectEntityById(deedId))

  return (
    <Flex w='100%' h='100%' bg='#F8F9FD'>
      <ScrollArea w='100%'>
        <Flex w='100%' direction='column' p={80} style={{ flex: 1 }}>
          <OverviewHero
            $onlyTitle={false}
            assistantFixed={true}
            light
            startDate={(entity?.startDate as never as string) || ''}
            creatorName={entity?.creator?.displayName || ''}
            creatorLogo={entity?.creator?.logo || ''}
            entityType={entity?.type ?? ""}
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
        </Flex>
      </ScrollArea>
      <Flex h='100%' bg='#F0F3F9'>
        <ControlPanel />
      </Flex>
    </Flex>
  )
}

export default Overview
