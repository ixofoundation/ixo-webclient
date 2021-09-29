import React, { FunctionComponent, useState, Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BondChartScreen from 'modules/BondModules/BondChart/index.container'
import BondTable from 'modules/BondModules/BondTable'
import Header from 'common/components/Bonds/BondsSummaryHeader/Header'
// import BondOrders from 'modules/BondOrders/BondOrders.container'
// import { BondEvents } from 'modules/BondEvents/BondEvents.container'
import { selectLocationProps } from 'modules/Router/router.selector'
import { getTransactionsByBondDID } from 'modules/BondModules/bond/bond.actions'

export const Overview: FunctionComponent<any> = ({ match }) => {
  const dispatch = useDispatch()
  const [selectedHeader, setSelectedHeader] = useState('price')
  const location: any = useSelector(selectLocationProps)

  useEffect(() => {
    dispatch(getTransactionsByBondDID())
  }, [dispatch])

  const projectPublic =
    location.state && location.state.projectPublic
      ? location.state.projectPublic
      : null
  

  return (
    <Fragment>
      <h1 className="mobile-header">{projectPublic?.title}</h1>
      <Header
        bondDID={match.params.bondDID}
        selectedHeader={selectedHeader}
        setSelectedHeader={setSelectedHeader}
      />
      <BondChartScreen selectedHeader={selectedHeader} />
      <BondTable selectedHeader={selectedHeader}/>
    </Fragment>
  )
}
