import React, { useEffect, useState } from 'react'
import { Redirect, Route, Switch, useLocation, useParams } from 'react-router-dom'
import DashboardPage from './Dashboard/Dashboard'
import OverviewPage from './Overview/Overview'
import TreasuryPage from './Treasury/Treasury'
import ProposalOverviewPage from './Proposal/Overview'
import useCurrentEntity from 'hooks/currentEntity'
import { Spinner } from 'components/Spinner/Spinner'
import { TEntityModel } from 'types/entities'
import { useAppSelector } from 'redux/hooks'
import { selectEntityById } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { useEntityQuery } from 'generated/graphql'
import { apiEntityToEntity } from 'utils/entities'
import { useAccount } from 'hooks/account'

const CurrentEntityPage: React.FC = (): JSX.Element => {
  const location = useLocation<{ collectionName: string }>()
  const { entityId } = useParams<{ entityId: string }>()
  const { cwClient } = useAccount()
  const entity: TEntityModel | undefined = useAppSelector(selectEntityById(entityId))
  const { entityType, updateEntity, clearEntity } = useCurrentEntity()
  const [fetchedEntity, setFetchedEntity] = useState<TEntityModel | null>(null)

  useEntityQuery({
    variables: {
      id: entityId,
    },
    skip: Boolean(entity),
    onCompleted: (data) => {
      console.log({ data: data?.entity })
      setFetchedEntity(data?.entity as any)
      apiEntityToEntity({ entity: data?.entity, cwClient }, (key, value) => {
        setFetchedEntity((entity: any) => ({ ...entity, [key]: value }))
      })
    },
  })

  useEffect(() => {
    if (fetchedEntity) {
      updateEntity(fetchedEntity)
    }
    if (entity) {
      updateEntity(entity)
    }

    return () => {
      clearEntity()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entity, fetchedEntity])

  if (!entityType) {
    return <Spinner info='Loading Entity...' />
  }

  return (
    <Switch>
      <Route exact path='/entity/:entityId/overview' component={OverviewPage} />
      <Route path='/entity/:entityId/dashboard' component={DashboardPage} />
      <Route path='/entity/:entityId/treasury' component={TreasuryPage} />
      <Route path='/entity/:entityId/overview/proposal/:deedId' component={ProposalOverviewPage} />
      <Route exact path='/entity/:entityId'>
        <Redirect to={`/entity/${entityId}/overview?collection=${location.state?.collectionName}`} />
      </Route>
    </Switch>
  )
}

export default CurrentEntityPage
