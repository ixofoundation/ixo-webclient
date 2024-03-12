import Dashboard from 'components/Dashboard/Dashboard'
import { MatchType } from 'types/models'
import { useHeaderTabs } from 'hooks/headerTabs'
import { Navigate, Route, Routes } from 'react-router-dom'
import AssetOverview from './Overview'
import useCurrentEntity from 'hooks/currentEntity'

const AssetDashboard = () => {
  const entityType = 'asset'
  const { currentEntity: entity } = useCurrentEntity()

  const headerTabs = useHeaderTabs()

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
