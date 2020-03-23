import * as React from 'react'
import Header from '../BondsSummaryHeader/Header'
import { NavLink } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import './BondsWrapper.css'
import BondsHero from '../BondsHero/BondsHero'
import { TypeForm } from '../../../../components/TypeForm'

export default function BondsWrapper({ children, params }): JSX.Element {
  const isActive = (m: any, l: any, paths: [string]): any => {
    let active = m != undefined

    paths.forEach((path: string) => {
      active = active || l.pathname.indexOf(path) != -1
    })

    return active
  }

  return (
    <div>
      <BondsHero />
      <div className="BondsWrapper">
        <div className="tablinks sidebar">
          <NavLink
            exact
            to={`/projects/${params.projectDID}/bonds/${params.bondDID}`}
            isActive={(m, l): any => {
              return isActive(m, l, [
                `/projects/${params.projectDID}/bonds/${params.bondDID}/overview`,
              ])
            }}
            className="tablinks_tablink icon home"
          />
          <NavLink
            to={`/projects/${params.projectDID}/bonds/${params.bondDID}/exchange`}
            className="tablinks_tablink icon trades"
          />
          <NavLink
            to={`/projects/${params.projectDID}/bonds/${params.bondDID}/orders`}
            className="tablinks_tablink icon orders"
          />
          <a className="tablinks_tablink icon wallet" />
          <a className="tablinks_tablink icon settings" />
        </div>
        <div className="pane">
          <TypeForm />
          <Header />
          {children}
        </div>
      </div>
    </div>
  )
}
