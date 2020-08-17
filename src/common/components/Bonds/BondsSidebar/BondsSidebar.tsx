import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { isActiveRoute } from '../../../utils/isActiveRoute';

interface Props {
  projectDID: string;
  bondDID: string;
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
          ]);
        }}
        className="tablinks_tablink icon home"
        data-testid="BondsSidebar-navLink-overview"
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
      <a className="tablinks_tablink icon wallet" />
      <a className="tablinks_tablink icon settings" />
    </div>
  );
};
export default BondsSidebar;
