import React, { FunctionComponent, useState, Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BondChartScreen from 'modules/BondModules/BondChart/index.container'
import BondTable from 'modules/BondModules/BondTable'
import Header from 'components/Bonds/BondsSummaryHeader/Header'
// import BondOrders from 'modules/BondOrders/BondOrders.container'
// import { BondEvents } from 'modules/BondEvents/BondEvents.container'
import { selectLocationProps } from 'redux/router/router.selector'
import {
  getAlphaHistory,
  getBondDetail,
  getPriceHistory,
  getTransactionsByBondDID,
  getWithdrawHistory,
} from 'redux/bond/bond.actions'
import { RootState } from 'redux/types'
import { getTransactions } from 'redux/account/account.actions'
import { BondState } from './index.style'
import { selectEntityGoal } from 'redux/selectedEntity/selectedEntity.selectors'

let timer1: any = undefined
let timer2: any = undefined
const interval: number = 1000 * 10 //  10 secs

export const Overview: FunctionComponent = () => {
  const dispatch = useDispatch()
  const [selectedHeader, setSelectedHeader] = useState('price')
  const location: any = useSelector(selectLocationProps)
  const { address: accountAddress } = useSelector((state: RootState) => state.account)
  const { bondDid, state: bondState } = useSelector((state: RootState) => state.activeBond)
  const goal = useSelector(selectEntityGoal)

  function fetchData(bondDid: any): void {
    if (bondDid) {
      dispatch(getBondDetail(bondDid) as any)
      dispatch(getTransactionsByBondDID(bondDid) as any)
      dispatch(getPriceHistory(bondDid) as any)
      dispatch(getAlphaHistory(bondDid) as any)
      dispatch(getWithdrawHistory(bondDid) as any)
    }
  }

  useEffect(() => {
    fetchData(bondDid)

    clearInterval(timer1)
    timer1 = setInterval(() => {
      fetchData(bondDid)
    }, interval)

    return (): void => {
      clearInterval(timer1)
    }
    // eslint-disable-next-line
  }, [bondDid, bondState])

  useEffect(() => {
    accountAddress && dispatch(getTransactions(accountAddress) as any)
    timer2 = setInterval(() => {
      accountAddress && dispatch(getTransactions(accountAddress) as any)
    }, interval)

    return (): void => {
      clearInterval(timer2)
    }
    // eslint-disable-next-line
  }, [accountAddress])

  const projectPublic = location.state && location.state.projectPublic ? location.state.projectPublic : null

  return (
    <Fragment>
      <BondState>{bondState}</BondState>
      <h1 className='mobile-header'>{projectPublic?.title}</h1>
      <Header isDark={true} goal={goal} selectedHeader={selectedHeader} setSelectedHeader={setSelectedHeader} />
      <BondChartScreen selectedHeader={selectedHeader} isDark={true} />
      <BondTable selectedHeader={selectedHeader} isDark={true} />
    </Fragment>
  )
}
