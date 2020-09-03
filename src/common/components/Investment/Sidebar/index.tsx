import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { isActiveRoute } from 'common/utils/isActiveRoute'

interface Props {
  projectDID: string
  bondDID: string
}

const BondsSidebar = ({ projectDID, bondDID }: Props): JSX.Element => {
  return (
    <div data-testid="BondsSidebar" className="tablinks sidebar">
      <NavLink
        to={`/projects/${projectDID}/bonds/${bondDID}/accounts`}
        className="tablinks_tablink icon account"
        data-testid="BondsSidebar-navLink-accounts"
        isActive={(match, location): any => {
          return isActiveRoute(match, location, [
            `/investment/${projectDID}/funds/accounts`,
          ])
        }}
        title='Accounts'
      />
      <NavLink
        to={`/projects/${projectDID}/bonds/${bondDID}/payments`}
        className="tablinks_tablink icon trades"
        data-testid="BondsSidebar-navLink-trades"
        title="Payments"
      />
      <NavLink
        to={`/projects/${projectDID}/bonds/${bondDID}/events`}
        className="tablinks_tablink icon orders"
        data-testid="BondsSidebar-navLink-orders"
        title="Events"
      />
      <NavLink
        to={`/projects/${projectDID}/bonds/${bondDID}/investment`}
        className="tablinks_tablink icon investment"
        data-testid="BondsSidebar-navLink-investment"
        title="Investment"
      />
    </div>
  )
}
export default BondsSidebar
