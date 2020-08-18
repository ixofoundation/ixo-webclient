import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { isActiveRoute } from '../../../../common/utils/isActiveRoute'

interface Props {
  projectDID: string
  bondDID: string
}

const BondsSidebar = ({ projectDID, bondDID }: Props): JSX.Element => {
  return (
    <div data-testid="BondsSidebar" className="tablinks sidebar">
      <NavLink
        exact
        to={`/projects/${projectDID}/bonds/${bondDID}`}
        isActive={(match, location): any => {
          return isActiveRoute(match, location, [
            `/projects/${projectDID}/bonds/${bondDID}/overview`,
          ])
        }}
        className="tablinks_tablink icon global"
        data-testid="BondsSidebar-navLink-overview"
      />
      <NavLink
        to={`/projects/${projectDID}/bonds/${bondDID}/accounts`}
        className="tablinks_tablink icon account"
        data-testid="BondsSidebar-navLink-account"
      />
      <NavLink
        to={`/projects/${projectDID}/bonds/${bondDID}/exchange`}
        className="tablinks_tablink icon trades"
        data-testid="BondsSidebar-navLink-trades"
      />
      <NavLink
        to={`/projects/${projectDID}/bonds/${bondDID}/orders`}
        className="tablinks_tablink icon orders"
        data-testid="BondsSidebar-navLink-orders"
      />
      <a className="tablinks_tablink icon wallet" href="#" />
      <a className="tablinks_tablink icon settings" href="#" />
    </div>
  )
}
export default BondsSidebar
