import React, { Fragment, useEffect, useState } from 'react'
import Header from 'common/components/Bonds/BondsSummaryHeader/VotingHeader'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectEntityBondDid,
  selectEntityGoal,
} from '../../SelectedEntity.selectors'
import BondChartScreen from 'modules/BondModules/BondChart/index.container'
import BondTable from 'modules/BondModules/BondTable'
import {
  clearBond,
  getBondDetail,
  getPriceHistory,
  getTransactionsByBondDID,
  getWithdrawHistory,
} from 'modules/BondModules/bond/bond.actions'
import { getTransactions } from 'modules/Account/Account.actions'
import { RootState } from 'common/redux/types'

let timer1: any = undefined
let timer2: any = undefined
const interval: number = 1000 * 10 //  10 secs

const VotingBond: React.FunctionComponent = () => {
  const dispatch = useDispatch()
  const [selectedHeader, setSelectedHeader] = useState('price')
  const goal = useSelector(selectEntityGoal)
  const bondDid = useSelector(selectEntityBondDid)
  const { address: accountAddress } = useSelector(
    (state: RootState) => state.account,
  )

  function fetchData(bondDid): void {
    if (bondDid) {
      dispatch(getBondDetail(bondDid))
      dispatch(getTransactionsByBondDID(bondDid))
      dispatch(getPriceHistory(bondDid))
      dispatch(getWithdrawHistory(bondDid))
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
    accountAddress && dispatch(getTransactions(accountAddress))
    timer2 = setInterval(() => {
      accountAddress && dispatch(getTransactions(accountAddress))
    }, interval)

    return (): void => {
      clearInterval(timer2)
    }
    // eslint-disable-next-line
  }, [accountAddress])

  return (
    <Fragment>
      <Header
        isDark={false}
        goal={goal}
        selectedHeader={selectedHeader}
        setSelectedHeader={setSelectedHeader}
      />
      <BondChartScreen selectedHeader={selectedHeader} isDark={false} />
      <BondTable
        selectedHeader={selectedHeader}
        isDark={false}
        isVoting={true}
      />
    </Fragment>
  )
}

export default VotingBond
