import * as React from 'react'
import Header from './header/Header'
import { NavLink } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import './BondsWrapper.css'
import { BondsHero } from './BondsHero'

export default function BondsWrapper({ children }): JSX.Element {
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
            to="/bonds"
            isActive={(m, l): any => {
              return isActive(m, l, ['/bonds/overview'])
            }}
            className="tablinks_tablink icon home"
          />
          <NavLink
            to="/bonds/exchange"
            className="tablinks_tablink icon trades"
          />
          <NavLink
            to="/bonds/orders"
            className="tablinks_tablink icon orders"
          />
          <a className="tablinks_tablink icon wallet" />
          <a className="tablinks_tablink icon settings" />
        </div>
        <div className="pane">
          <Header />
          {children}
        </div>
      </div>
    </div>
  )
}
