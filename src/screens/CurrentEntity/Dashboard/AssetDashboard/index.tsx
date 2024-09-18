import Dashboard from 'components/Dashboard/Dashboard'
import { MatchType } from 'types/models'
import { useHeaderTabs } from 'hooks/headerTabs'
import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import AssetOverview from './Overview'
import { useAppSelector } from 'redux/hooks'
import { getEntityById } from 'redux/entities/entities.selectors'
import { toRootEntityType } from 'utils/entities'

const AssetDashboard = () => {
  const entityType = 'asset'
  const { entityId = '' } = useParams()
  const entity = useAppSelector(getEntityById(entityId))

  const headerTabs = useHeaderTabs({ entityType: toRootEntityType(entity.type) })

  const assetNumber = entity?.alsoKnownAs?.replace('{id}#', '') || ''
  const title = entity?.profile?.name || ''

  return (
    <Dashboard
      theme={'dark'}
      title={`${title} #${assetNumber}`}
      subRoutes={[]}
      baseRoutes={[]}
      entityType={entityType}
      tabs={headerTabs}
      matchType={MatchType.strict}
    >
      <Routes>
        <Route index element={<Navigate to={`overview`} />} />
        <Route path='overview' Component={AssetOverview} />
      </Routes>
    </Dashboard>
  )
}

export default AssetDashboard
