import Dashboard from 'components/Dashboard/Dashboard'
import { HeaderTab, Path } from 'components/Dashboard/types'
import useCurrentEntity from 'hooks/currentEntity'
import { Navigate, Routes, Route, useParams } from 'react-router-dom'
import { requireCheckDefault } from 'utils/images'
import ClaimQuestions from './ClaimQuestions'
import { toTitleCase } from 'utils/formatters'
import { useAccount } from 'hooks/account'
import EditEntity from './EditEntity'

const ClaimDashboard: React.FC = (): JSX.Element => {
  const { entityId } = useParams<{ entityId: string }>()
  const entityType = 'protocol'
  const { owner, profile } = useCurrentEntity()
  const { registered, address } = useAccount()

  const routes: Path[] = [
    {
      url: `/entity/${entityId}/dashboard/questions`,
      icon: requireCheckDefault(require('assets/img/sidebar/global.svg')),
      sdg: 'Questions',
      tooltip: 'Questions',
      strict: true,
    },
    {
      url: `/entity/${entityId}/dashboard/edit`,
      icon: requireCheckDefault(require('assets/img/sidebar/gear.svg')),
      sdg: 'Edit Entity',
      tooltip: 'Edit Entity',
      disabled: !registered || owner !== address,
    },
  ]

  const breadcrumbs = [
    {
      url: `/explore`,
      icon: '',
      sdg: 'Explore Protocols',
      tooltip: '',
    },
    {
      url: `/entity/${entityId}/overview`,
      icon: '',
      sdg: profile?.name ?? "",
      tooltip: '',
    },
    {
      url: `/entity/${entityId}/dashboard`,
      icon: '',
      sdg: 'Dashboard',
      tooltip: '',
    },
  ]

  const tabs: HeaderTab[] = [
    {
      iconClass: `icon-${entityType}`,
      linkClass: entityType,
      path: `/entity/${entityId}/overview`,
      title: toTitleCase(entityType),
      tooltip: `${toTitleCase(entityType)} Overview`,
    },
    {
      iconClass: `icon-dashboard`,
      path: `/entity/${entityId}/dashboard`,
      title: 'Dashboard',
      tooltip: `${toTitleCase(entityType)} Management`,
    },
  ]

  const theme = 'light'

  return (
    <Dashboard
      theme={theme}
      title={profile.name}
      subRoutes={routes}
      baseRoutes={breadcrumbs}
      tabs={tabs}
      entityType={entityType}
    >
      <Routes>
        <Route index element={<Navigate to={`questions`} />} />
        <Route path='questions' Component={ClaimQuestions} />
        {registered && owner === address && <Route path='edit' Component={EditEntity} />}
      </Routes>
    </Dashboard>
  )
}

export default ClaimDashboard
