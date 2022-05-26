import React, { FunctionComponent, useState, Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BondChartScreen from 'modules/BondModules/BondChart/index.container'
import BondTable from 'modules/BondModules/BondTable'
import Header from 'common/components/Bonds/BondsSummaryHeader/Header'
// import BondOrders from 'modules/BondOrders/BondOrders.container'
// import { BondEvents } from 'modules/BondEvents/BondEvents.container'
import { selectLocationProps } from 'modules/Router/router.selector'
import {
  getAlphaHistory,
  getBalances,
  getPriceHistory,
  getTransactionsByBondDID,
  getWithdrawShareHistory,
} from 'modules/BondModules/bond/bond.actions'
import { RootState } from 'common/redux/types'
import { getTransactions } from 'modules/Account/Account.actions'
import { BondState } from './index.style'

let timer1: any = undefined
let timer2: any = undefined
const interval: number = 1000 * 10 //  10 secs

export const Overview: FunctionComponent<any> = ({ match }) => {
  const dispatch = useDispatch()
  const [selectedHeader, setSelectedHeader] = useState('price')
  const location: any = useSelector(selectLocationProps)
  const { address: accountAddress } = useSelector(
    (state: RootState) => state.account,
  )
  const { bondDid, state: bondState } = useSelector(
    (state: RootState) => state.activeBond,
  )

  function fetchData(): void {
    if (bondDid) {
      dispatch(getBalances(bondDid))
      dispatch(getTransactionsByBondDID(bondDid))
      dispatch(getPriceHistory(bondDid))
      dispatch(getAlphaHistory(bondDid))
      dispatch(getWithdrawShareHistory(bondDid))
    }
  }

  useEffect(() => {
    fetchData()

    timer1 = setInterval(() => {
      fetchData()
    }, interval)

    return (): void => {
      clearInterval(timer1)
    }
    // eslint-disable-next-line
  }, [dispatch])

  useEffect(() => {
    accountAddress && dispatch(getTransactions(accountAddress))
    timer2 = setInterval(() => {
      accountAddress && dispatch(getTransactions(accountAddress))
    }, interval)

    return (): void => {
      clearInterval(timer2)
    }
    // eslint-disable-next-line
  }, [accountAddress])

  const projectPublic =
    location.state && location.state.projectPublic
      ? location.state.projectPublic
      : null

  return (
    <Fragment>
      <BondState>{bondState}</BondState>
      <h1 className="mobile-header">{projectPublic?.title}</h1>
      <Header
        bondDID={match.params.bondDID}
        selectedHeader={selectedHeader}
        setSelectedHeader={setSelectedHeader}
      />
      <BondChartScreen selectedHeader={selectedHeader} />
      <BondTable
        selectedHeader={selectedHeader}
        isDark={true}
        isStake={false}
        activeBond={[]}
      />
    </Fragment>
  )
}
