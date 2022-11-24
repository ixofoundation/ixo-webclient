import { NavLink } from 'react-router-dom'
// import { isActiveRoute } from 'common/utils/isActiveRoute'
import { ToolTip } from 'modules/Entities/SelectedEntity/EntityImpact/components/SideBar/SideBar.styles'

interface Props {
  projectDID: string
  bondDID: string
}

const BondsSidebar = ({ projectDID, bondDID }: Props): JSX.Element => {
  return (
    <div data-testid='BondsSidebar' className='tablinks sidebar'>
      <NavLink
        to={`/projects/${projectDID}/bonds/${bondDID}/accounts`}
        className='tablinks_tablink icon account'
        data-testid='BondsSidebar-navLink-accounts'
        activeClassName='active'
      >
        <ToolTip>Accounts</ToolTip>
      </NavLink>
      <NavLink
        to={`/projects/${projectDID}/bonds/${bondDID}/payments`}
        className='tablinks_tablink icon trades'
        data-testid='BondsSidebar-navLink-trades'
        title='Payments'
        activeClassName='active'
      >
        <ToolTip>Payments</ToolTip>
      </NavLink>
      <NavLink
        to={`/projects/${projectDID}/bonds/${bondDID}/events`}
        className='tablinks_tablink icon orders'
        data-testid='BondsSidebar-navLink-orders'
        title='Events'
        activeClassName='active'
      >
        <ToolTip>Events</ToolTip>
      </NavLink>
      <NavLink
        to={`/projects/${projectDID}/bonds/${bondDID}/investment`}
        className='tablinks_tablink icon investment'
        data-testid='BondsSidebar-navLink-investment'
        title='Investment'
        activeClassName='active'
      >
        <ToolTip>Investment</ToolTip>
      </NavLink>
    </div>
  )
}
export default BondsSidebar
