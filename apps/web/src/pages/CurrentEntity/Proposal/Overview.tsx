import { LinkedResource } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { EntityLinkedResourceConfig } from 'constants/entity'
import { useParams } from 'react-router-dom'
import { selectEntityById } from 'redux/entities/entities.selectors'
import { useAppSelector } from 'redux/hooks'
import { LinkedFiles } from '../Overview/LinkedFiles'
import { InstructionsToExecute } from './InstructionsToExecute'
import { Flex, ScrollArea } from '@mantine/core'
import HeaderTabs from 'components/HeaderTabs/HeaderTabs'
import { MatchType } from 'types/models'
import { useMemo } from 'react'
import { useEntity } from 'hooks/entity/useEntity'
import Editor from 'components/Editor/Editor'

const Overview: React.FC = () => {
  const { entityId = '', deedId = '' } = useParams<{ entityId: string; deedId: string }>()
  const entity = useAppSelector(selectEntityById(deedId))

  const headerTabs = useMemo(
    () => [
      {
        iconClass: `icon-info`,
        path: ``,
        title: 'Deed',
        tooltip: `Deed Overview`,
      },
      {
        iconClass: `icon-dashboard`,
        path: `/entity/${entityId}/dashboard`,
        title: 'DASHBOARD',
        tooltip: `DAO Management`,
      },
    ],
    [entityId],
  )
  useEntity(deedId)

  return (
    <Flex w='100%' h='100%' bg='#F8F9FD'>
      <ScrollArea w='100%'>
        <Flex w='100%' direction='column' p={80} style={{ flex: 1 }}>
          <HeaderTabs matchType={MatchType.strict} buttons={headerTabs} />
          <Editor initialPage={entity?.page} editable={false} />
          <InstructionsToExecute />
          <LinkedFiles
            linkedFiles={
              entity?.linkedResource.filter((item: LinkedResource) =>
                Object.keys(EntityLinkedResourceConfig).includes(item.type),
              ) ?? []
            }
            service={entity?.service}
          />
        </Flex>
      </ScrollArea>
    </Flex>
  )
}

export default Overview
