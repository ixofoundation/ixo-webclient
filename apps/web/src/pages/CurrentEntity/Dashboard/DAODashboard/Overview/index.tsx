import { Flex } from '@mantine/core'
import { EntityOverviewSkeletonCard, withEntityData } from 'components'
import React, { useMemo } from 'react'
import { DaoCard } from 'components/EntityCards/DaoCard'
import { GridContainer, GridItem } from 'components/App/App.styles'
import TreasuryPoolCard from './TreasuryPoolCard'
import GovernanceCard from './GovernanceCard'
import GovernanceActivityCard from './GovernanceActivityCard'
import Groups from './Groups'
import { useAppSelector } from 'redux/hooks'
import { getEntityById } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { useParams } from 'react-router-dom'
import { TEntityModel } from 'types/entities'
import useCurrentEntity from 'hooks/currentEntity'

const DAOOverview: React.FC = () => {
  const { entityId = "" } = useParams<{ entityId: string }>()
  const stateEntity = useAppSelector(getEntityById(entityId)) as TEntityModel
  const {currentEntity: singleEntity} = useCurrentEntity()

  const WrappedDAOCard = withEntityData(DaoCard)

  const currentEntity = useMemo(() => ({ ...stateEntity, ...singleEntity }), [stateEntity, singleEntity])

  return (
    <Flex w={'100%'} direction={'column'} gap={6}>
      <GridContainer
        $gridTemplateAreas={`"a b b""c d d""e e e"`}
        $gridTemplateColumns={'1fr 1fr 1fr'}
        $gridTemplateRows={'repeat(3, minmax(400px, auto))'}
        $gridGap={6}
        width='100%'
      >
        <GridItem $gridArea='a' $alignSelf='stretch' height='400px'>
          {currentEntity ? <WrappedDAOCard entity={currentEntity} loading={false}/> : <EntityOverviewSkeletonCard />}
        </GridItem>
        <GridItem $gridArea='b' $alignSelf='stretch' height='400px'>
          <TreasuryPoolCard />
        </GridItem>
        <GridItem $gridArea='c' $alignSelf='stretch' height='400px'>
          <GovernanceCard />
        </GridItem>
        <GridItem $gridArea='d' $alignSelf='stretch' height='400px'>
          <GovernanceActivityCard />
        </GridItem>
        <GridItem $gridArea='e' $alignSelf='stretch' height='400px'>
          <Groups />
        </GridItem>
      </GridContainer>
    </Flex>
  )
}

export default DAOOverview
