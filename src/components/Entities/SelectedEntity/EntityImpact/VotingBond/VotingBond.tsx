import React, { Fragment, useEffect, useState } from 'react'
import Header from 'components/Bonds/BondsSummaryHeader/VotingHeader'
import { useDispatch, useSelector } from 'react-redux'
import { selectEntityBondDid, selectEntityGoal } from '../../../../../redux/selectedEntity/selectedEntity.selectors'
import BondChartScreen from 'components/Bonds/BondChart/BondChart'
import BondTable from 'components/Bonds/BondTable/BondTable'
import {
  clearBond,
  getBondDetail,
  getPriceHistory,
  getTransactionsByBondDID,
  getWithdrawHistory,
} from 'redux/bond/bond.actions'
import { getTransactions } from 'redux/account/account.actions'
import { RootState } from 'redux/types'

let timer1: any = undefined
let timer2: any = undefined
const interval: number = 1000 * 10 //  10 secs

const VotingBond: React.FunctionComponent = () => {
  const dispatch = useDispatch()
  const [selectedHeader, setSelectedHeader] = useState('price')
  const goal = useSelector(selectEntityGoal)
  const bondDid = useSelector(selectEntityBondDid)
  const { address: accountAddress } = useSelector((state: RootState) => state.account)

  function fetchData(bondDid: any): void {
    if (bondDid) {
      dispatch(getBondDetail(bondDid) as any)
      dispatch(getTransactionsByBondDID(bondDid) as any)
      dispatch(getPriceHistory(bondDid) as any)
      dispatch(getWithdrawHistory(bondDid) as any)
    }
  }

  useEffect(() => {
    return (): void => {
      dispatch(clearBond())
      clearInterval(timer1)
    }
    // eslint-disable-next-line
  }, [])

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
  }, [bondDid])

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

  return (
    <Fragment>
      <Header isDark={false} goal={goal} selectedHeader={selectedHeader} setSelectedHeader={setSelectedHeader} />
      <BondChartScreen selectedHeader={selectedHeader} isDark={false} />
      <BondTable selectedHeader={selectedHeader} isDark={false} isVoting={true} />
    </Fragment>
  )
}

export default VotingBond
