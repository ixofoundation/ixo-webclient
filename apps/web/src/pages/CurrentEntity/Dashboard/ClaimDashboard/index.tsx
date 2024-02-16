import Dashboard from 'components/Dashboard/Dashboard'
import { HeaderTab, Path } from 'components/Dashboard/types'
import { useCurrentEntityProfile } from 'hooks/currentEntity'
import { Navigate, Routes, Route, useParams } from 'react-router-dom'
import { requireCheckDefault } from 'utils/images'
import ClaimQuestions from './ClaimQuestions'
import { toTitleCase } from 'utils/formatters'

const ClaimDashboard: React.FC = (): JSX.Element => {
  const { entityId } = useParams<{ entityId: string }>()
  const entityType = 'protocol'
  const { name } = useCurrentEntityProfile()

  const routes: Path[] = [
    {
      url: `/entity/${entityId}/dashboard/questions`,
      icon: requireCheckDefault(require('assets/img/sidebar/global.svg')),
      sdg: 'Questions',
      tooltip: 'Questions',
      strict: true,
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
      sdg: name,
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

  const theme = 'dark'

  return (
    <Dashboard
      theme={theme}
      title={name}
      subRoutes={routes}
      baseRoutes={breadcrumbs}
      tabs={tabs}
      entityType={entityType}
    >
      <Routes>
        <Route index element={<Navigate to={`questions`} />} />
        <Route path='questions' Component={ClaimQuestions} />
      </Routes>
    </Dashboard>
  )
}

export default ClaimDashboard
