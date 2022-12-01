import { FunctionComponent, useState, useEffect, Fragment, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getDisplayAmount } from 'utils/currency'
import BondAccountTable from 'modules/BondModules/BondAccountTable'
import BigNumber from 'bignumber.js'
import ProjectAccountWrapper from './components/ProjectAccountWrapper'
import ProjectAccount from './components/ProjectAccount'
import { selectPathnameProps } from 'redux/router/router.selector'
import { getProjectAccounts } from 'redux/project/project.actions'
import {
  selectAccounts,
  selectAccountLoadingState,
  selectProjectAddress,
} from '../../../redux/project/project.selectors'
import { Spinner } from 'components/Spinner'
import { getTransactionsByAsset } from 'redux/account/account.actions'
import { RootState } from 'redux/types'
import { selectEntityType } from 'redux/selectedEntity/selectedEntity.selectors'
import { NoAssets } from './index.style'
import { SendModal } from 'components/Modals'

export const Accounts: FunctionComponent = () => {
  const dispatch = useDispatch()
  const pathName = useSelector(selectPathnameProps)
  const accounts = useSelector(selectAccounts)
  const projectAddress = useSelector(selectProjectAddress)
  const accountLoadingState = useSelector(selectAccountLoadingState)
  const entityType = useSelector(selectEntityType)
  const { transactionsByAsset } = useSelector((state: RootState) => state.account)
  const [sendModalOpen, setSendModalOpen] = useState<boolean>(false)

  const projectDID = pathName.split('/')[2]

  useEffect(() => {
    dispatch(getProjectAccounts(projectDID) as any)
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (projectAddress && accounts.length) {
      dispatch(
        getTransactionsByAsset(
          projectAddress,
          accounts.map((balance) => balance['denom']),
        ) as any,
      )
    }
    // eslint-disable-next-line
  }, [projectAddress, accounts])

  const [selected, setSelected] = useState(0)

  const handleAddAccount = (e: any): void => {
    console.log('handleAddAccount', e)
  }

  const handleNewTransaction = (): void => {
    setSendModalOpen(true)
  }

  const balances = useMemo(() => {
    return accounts.map((account) => ({
      denom: (account['denom'] === 'uixo' ? 'ixo' : account['denom']).toUpperCase(),
      amount:
        account['denom'] === 'uixo' || account['denom'] === 'xusd'
          ? getDisplayAmount(new BigNumber(account['amount']))
          : account['amount'],
    }))
    // eslint-disable-next-line
  }, [accounts])

  if (accountLoadingState) return <Spinner info='Loading accounts...' />
  return (
    <Fragment>
      <ProjectAccountWrapper title={`${entityType} Accounts`} handleAddAccount={handleAddAccount}>
        {balances.map((account, key) => (
          <ProjectAccount
            key={`project-account-${key}`}
            count={7}
            selected={selected === 0}
            onSelect={(): void => setSelected(key)}
            balance={account}
            subLabel={`USD ${account.amount}`}
            address={projectAddress}
          ></ProjectAccount>
        ))}
        {balances.length === 0 && <NoAssets>No Available balances</NoAssets>}
      </ProjectAccountWrapper>
      {transactionsByAsset.length > 0 && (
        <BondAccountTable
          handleNewTransaction={handleNewTransaction}
          token={balances[selected]?.denom !== 'uixo' ? balances[selected]?.denom : 'ixo'}
          tableData={
            transactionsByAsset[selected][balances[selected]?.denom !== 'uixo' ? balances[selected]?.denom : 'ixo'] ??
            []
          }
        />
      )}
      <SendModal open={sendModalOpen} setOpen={setSendModalOpen} />
    </Fragment>
  )
}
