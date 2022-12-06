import { FunctionComponent, useState, useEffect, Fragment, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { getDisplayAmount } from 'utils/currency'
import BondAccountTable from 'components/Bonds/BondAccountTable/BondAccountTable'
import BigNumber from 'bignumber.js'
import ProjectAccountWrapper from './Components/ProjectAccountWrapper'
import ProjectAccount from './Components/ProjectAccount'
import { selectPathnameProps } from 'redux/router/router.selector'
import { getProjectAccounts } from 'redux/project/project.actions'
import { selectAccounts, selectAccountLoadingState, selectProjectAddress } from 'redux/project/project.selectors'
import { Spinner } from 'components/Spinner/Spinner'
import { getTransactionsByAsset } from 'redux/account/account.actions'
import { selectEntityType } from 'redux/selectedEntity/selectedEntity.selectors'
import { NoAssets } from './Account.style'
import { SendModal } from 'components/Modals'

const Accounts: FunctionComponent = () => {
  const dispatch = useAppDispatch()
  const pathName = useAppSelector(selectPathnameProps)
  const accounts = useAppSelector(selectAccounts)
  const projectAddress = useAppSelector(selectProjectAddress)
  const accountLoadingState = useAppSelector(selectAccountLoadingState)
  const entityType = useAppSelector(selectEntityType)
  const { transactionsByAsset } = useAppSelector((state) => state.account)
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

export default Accounts
