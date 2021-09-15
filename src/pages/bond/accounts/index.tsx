import React, {
  FunctionComponent,
  useState,
  useEffect,
  Fragment,
  useMemo,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getBalanceNumber } from 'common/utils/currency.utils'
import BondAccountTable from 'modules/BondModules/BondAccountTable'
import BigNumber from 'bignumber.js'
import ProjectAccountWrapper from './components/ProjectAccountWrapper'
import ProjectAccount from './components/ProjectAccount'
import { selectPathnameProps } from 'modules/Router/router.selector'
import { getProjectAccounts } from 'pages/bond/store/actions'
import {
  selectAccounts,
  selectAccountLoadingState,
  selectProjectAddress,
} from '../store/selector'
import { Spinner } from 'common/components/Spinner'
import { getTransactionsByAsset } from 'modules/Account/Account.actions'
import { RootState } from 'common/redux/types'

export const Accounts: FunctionComponent = () => {
  const dispatch = useDispatch()
  const pathName = useSelector(selectPathnameProps)
  const accounts = useSelector(selectAccounts)
  const projectAddress = useSelector(selectProjectAddress)
  const accountLoadingState = useSelector(selectAccountLoadingState)
  const { transactionsByAsset } = useSelector(
    (state: RootState) => state.account,
  )

  const projectDID = pathName.split('/')[2]

  useEffect(() => {
    dispatch(getProjectAccounts(projectDID))
  }, [])

  useEffect(() => {
    if (projectAddress && accounts.length) {
      dispatch(
        getTransactionsByAsset(
          projectAddress,
          accounts.map((balance) => balance['denom']),
        ),
      )
    }
  }, [projectAddress, accounts])

  const [selected, setSelected] = useState(0)

  const handleAddAccount = (e) => {
    console.log('handleAddAccount', e)
  }

  const balances = useMemo(() => {
    return accounts.map((account) => ({
      denom: account['denom'],
      amount: Number(
        getBalanceNumber(new BigNumber(account['amount'])).toFixed(0),
      ),
    }))
  }, [accounts])

  if (accountLoadingState) return <Spinner info="Loading accounts..." />
  return (
    <Fragment>
      <ProjectAccountWrapper
        title="Project Accounts"
        handleAddAccount={handleAddAccount}
      >
        {balances.map((account, key) => (
          <ProjectAccount
            key={`project-account-${key}`}
            count={7}
            selected={selected === 0}
            onSelect={(): void => setSelected(0)}
            balance={account}
          ></ProjectAccount>
        ))}
        {balances.length === 0 && (
          <ProjectAccount
            count={7}
            selected={selected === 0}
            onSelect={(): void => setSelected(0)}
            balance={{
              denom: 'IXO',
              amount: 0,
            }}
          />
        )}
      </ProjectAccountWrapper>
      {transactionsByAsset.length > 0 && (
        <BondAccountTable
          token={
            balances[selected].denom !== 'uixo'
              ? balances[selected].denom
              : 'ixo'
          }
          tableData={
            transactionsByAsset[selected][
              balances[selected].denom !== 'uixo'
                ? balances[selected].denom
                : 'ixo'
            ]
          }
        />
      )}
    </Fragment>
  )
}
