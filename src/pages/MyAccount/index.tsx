import { useAccount } from 'hooks/account'
import { useEffect } from 'react'
import { Redirect, Route, useHistory } from 'react-router-dom'
import MyPortfolioPage from './MyPortfolioPage'
import Dashboard from 'components/Dashboard/Dashboard'
import { Path } from 'components/Dashboard/types'
import { requireCheckDefault } from 'utils/images'
import MyGroupsPage from './MyGroupsPage'

const MyAccountPage: React.FC = (): JSX.Element => {
  const history = useHistory()
  const { address } = useAccount()
  const title = 'My Portfolio'

  const routes: Path[] = [
    {
      url: `/myaccount/portfolio`,
      icon: requireCheckDefault(require('assets/images/icon-entity-account.svg')),
      sdg: 'My Portfolio',
      tooltip: 'My Portfolio',
    },
    {
      url: `/myaccount/groups`,
      icon: requireCheckDefault(require('assets/img/sidebar/agents.svg')),
      sdg: 'My Groups',
      tooltip: 'My Groups',
    },
  ]

  useEffect(() => {
    if (!address) {
      history.push('/explore')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address])

  return (
    <Dashboard theme={'dark'} title={title} subRoutes={routes} baseRoutes={[]} tabs={[]} noTabs noBreadcrumbs>
      <Route exact path='/myaccount/portfolio' component={MyPortfolioPage} />
      <Route exact path='/myaccount/groups' component={MyGroupsPage} />
      <Route exact path='/myaccount/'>
        <Redirect to={`/myaccount/portfolio`} />
      </Route>
    </Dashboard>
  )
}

export default MyAccountPage
