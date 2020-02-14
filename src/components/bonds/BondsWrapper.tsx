import * as React from 'react'
import Header from './header/Header'
import { NavLink } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import './BondsWrapper.css'

export default function BondsWrapper({ children }) {
  const isActive = (m: any, l: any, paths: [string]) => {
    let active = m != undefined

    paths.forEach((path: string) => {
      active = active || l.pathname.indexOf(path) != -1
    })

    return active
  }

  return (
    <div className="BondsWrapper">
      <div className="tablinks sidebar">
        <NavLink
          exact
          to={`/`}
          isActive={(m, l) => {
            return isActive(m, l, ['/overview'])
          }}
          className="tablinks_tablink icon home"
        />
        <NavLink to={`/exchange`} className="tablinks_tablink icon trades" />
        <NavLink to={`/orders`} className="tablinks_tablink icon orders" />
        <a className="tablinks_tablink icon wallet" />
        <a className="tablinks_tablink icon settings" />
      </div>
      <div className="pane">
        <Header />
        {children}
      </div>
    </div>
  )
}
