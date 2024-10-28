import Dashboard from 'components/Dashboard/Dashboard'
import { HeaderTab, Path } from 'components/Dashboard/types'
import { useAccount } from 'hooks/account'
import { Navigate, Route, useParams, Routes } from 'react-router-dom'
import EditEntity from './EditEntity'
import { useAppSelector } from 'redux/hooks'
import { getEntityById } from 'redux/entities/entities.selectors'

const AssetCollectionDashboard: React.FC = (): JSX.Element => {
  const { entityId = '' } = useParams<{ entityId: string }>()
  const { address } = useAccount()
  const { type, owner, profile, verificationMethod } = useAppSelector(getEntityById(entityId))

  const isVerifiedOnEntity =
    verificationMethod.some((verification) => verification?.blockchainAccountID === address) || owner === address

  const routes: Path[] = [
    {
      url: `/entity/${entityId}/dashboard/edit`,
      icon: '/assets/img/sidebar/gear.svg',
      sdg: 'Edit Entity',
      tooltip: 'Edit Entity',
      disabled: !isVerifiedOnEntity,
    },
  ]

  const breadcrumbs: any[] = []
  const tabs: HeaderTab[] = []

  return (
    <Dashboard
      theme={'light'}
      title={profile?.name ?? ''}
      subRoutes={routes}
      baseRoutes={breadcrumbs}
      tabs={tabs}
      noTabs
      entityType={type}
    >
      <Routes>
        <Route index element={<Navigate to={`edit`} />} />
        {isVerifiedOnEntity && <Route path='edit' Component={EditEntity} />}
      </Routes>
    </Dashboard>
  )
}

export default AssetCollectionDashboard
