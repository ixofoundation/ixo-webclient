import { useAccount } from 'hooks/account'
import { useEffect } from 'react'
import { Route, useNavigate, Navigate, Routes } from 'react-router-dom'
import MyPortfolioPage from './MyPortfolioPage'
import Dashboard from 'components/Dashboard/Dashboard'
import { Path } from 'components/Dashboard/types'
import { requireCheckDefault } from 'utils/images'
import MyGroupsPage from './MyGroupsPage'
import MyclaimsPage from './MyClaimsPage'
import { useIxoConfigs } from 'hooks/configs'

const MyAccountPage: React.FC = (): JSX.Element => {
  const navigate = useNavigate()
  const { address } = useAccount()
  const title = 'My Portfolio'
  const { entityConfig } = useIxoConfigs()

  const routes: Path[] = [
    {
      url: `/myaccount/portfolio`,
      icon: '/public/assets/images/icon-entity-account.svg',
      sdg: 'My Portfolio',
      tooltip: 'My Portfolio',
    },
    {
      url: `/myaccount/groups`,
      icon: '/public/assets/img/sidebar/agents.svg',
      sdg: 'My Groups',
      tooltip: 'My Groups',
    },
    {
      url: `/myaccount/claims`,
      icon: '/public/assets/img/sidebar/check.svg',
      sdg: 'Claims',
      tooltip: 'Claims',
    },
  ]

  useEffect(() => {
    if (!address) {
      navigate(`/explore?type=${entityConfig?.UI?.explorer?.defaultView}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address])

  return (
    <Dashboard theme={'dark'} title={title} subRoutes={routes} baseRoutes={[]} tabs={[]} noTabs noBreadcrumbs>
      <Routes>
        <Route index element={<Navigate to={`portfolio`} />} />
        <Route path='portfolio' Component={MyPortfolioPage} />
        <Route path='groups' Component={MyGroupsPage} />
        <Route path='claims' Component={MyclaimsPage} />
      </Routes>
    </Dashboard>
  )
}

export default MyAccountPage
