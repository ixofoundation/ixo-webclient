import Dashboard from 'components/Dashboard/Dashboard'
import { HeaderTab, Path } from 'components/Dashboard/types'
import { useAccount } from 'hooks/account'
import useCurrentEntity, { useCurrentEntityProfile } from 'hooks/currentEntity'
import { Navigate, Route, useParams, Routes } from 'react-router-dom'
import { requireCheckDefault } from 'utils/images'
import EditEntity from './EditEntity'

const AssetCollectionDashboard: React.FC = (): JSX.Element => {
  const { entityId } = useParams<{ entityId: string }>()
  const { entityType, owner } = useCurrentEntity()
  const { name } = useCurrentEntityProfile()
  const { registered, address } = useAccount()

  const routes: Path[] = [
    {
      url: `/entity/${entityId}/dashboard/edit`,
      icon: requireCheckDefault(require('assets/img/sidebar/gear.svg')),
      sdg: 'Edit Entity',
      tooltip: 'Edit Entity',
      disabled: !registered || owner !== address,
    },
  ]

  const breadcrumbs: any[] = []
  const tabs: HeaderTab[] = []

  return (
    <Dashboard
      theme={'light'}
      title={name}
      subRoutes={routes}
      baseRoutes={breadcrumbs}
      tabs={tabs}
      noTabs
      entityType={entityType}
    >
      <Routes>
        <Route index element={<Navigate to={`edit`} />} />
        {registered && owner === address && <Route path='edit' Component={EditEntity} />}
      </Routes>
    </Dashboard>
  )
}

export default AssetCollectionDashboard
