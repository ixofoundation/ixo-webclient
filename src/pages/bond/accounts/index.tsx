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
import { selectEntityType } from 'modules/Entities/SelectedEntity/SelectedEntity.selectors'
import { NoAssets } from './index.style'
import { ModalWrapper } from 'common/components/Wrappers/ModalWrapper'
import WalletSelectModal from 'common/components/ControlPanel/Actions/WalletSelectModal'
import SendModal from 'common/components/ControlPanel/Actions/SendModal'

export const Accounts: FunctionComponent = () => {
  const dispatch = useDispatch()
  const pathName = useSelector(selectPathnameProps)
  const accounts = useSelector(selectAccounts)
  const projectAddress = useSelector(selectProjectAddress)
  const accountLoadingState = useSelector(selectAccountLoadingState)
  const entityType = useSelector(selectEntityType)
  const { transactionsByAsset } = useSelector(
    (state: RootState) => state.account,
  )
  const [sendModalOpen, setSendModalOpen] = useState<boolean>(false)
  const [walletModalOpen, setWalletModalOpen] = useState<boolean>(false)
  const [walletType, setWalletType] = useState(null)
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [modalTitle, setModalTitle] = useState('Send')

  const projectDID = pathName.split('/')[2]

  useEffect(() => {
    dispatch(getProjectAccounts(projectDID))
    // eslint-disable-next-line
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
    // eslint-disable-next-line
  }, [projectAddress, accounts])

  const [selected, setSelected] = useState(0)

  const handleAddAccount = (e): void => {
    console.log('handleAddAccount', e)
  }

  const handleNewTransaction = (): void => {
    setWalletModalOpen(true)
  }

  const handleWalletSelect = (
    walletType: string,
    accountAddress: string,
  ): void => {
    setWalletType(walletType)
    setSelectedAddress(accountAddress)
    // dispatch(changeSelectedAccountAddress(accountAddress))
    setWalletModalOpen(false)
    setSendModalOpen(true)
  }

  const balances = useMemo(() => {
    return accounts.map((account) => ({
      denom: (account['denom'] === 'uixo'
        ? 'ixo'
        : account['denom']
      ).toUpperCase(),
      amount:
        account['denom'] === 'uixo' || account['denom'] === 'xusd'
          ? getBalanceNumber(new BigNumber(account['amount']))
          : account['amount'],
    }))
    // eslint-disable-next-line
  }, [accounts])

  if (accountLoadingState) return <Spinner info="Loading accounts..." />
  return (
    <Fragment>
      <ProjectAccountWrapper
        title={`${entityType} Accounts`}
        handleAddAccount={handleAddAccount}
      >
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
        {balances.length === 0 && (
          // <ProjectAccount
          //   count={7}
          //   selected={selected === 0}
          //   onSelect={(): void => setSelected(0)}
          //   balance={{
          //     denom: 'IXO',
          //     amount: 0,
          //   }}
          //   subLabel={`USD ${usdRate.toFixed(2)}`}
          // />
          <NoAssets>No Available balances</NoAssets>
        )}
      </ProjectAccountWrapper>
      {transactionsByAsset.length > 0 && (
        <BondAccountTable
          handleNewTransaction={handleNewTransaction}
          token={
            balances[selected]?.denom !== 'uixo'
              ? balances[selected]?.denom
              : 'ixo'
          }
          tableData={
            transactionsByAsset[selected][
              balances[selected]?.denom !== 'uixo'
                ? balances[selected]?.denom
                : 'ixo'
            ] ?? []
          }
        />
      )}
      <ModalWrapper
        isModalOpen={walletModalOpen}
        header={{
          title: 'Select Wallet',
          titleNoCaps: true,
          noDivider: true,
        }}
        handleToggleModal={(): void => setWalletModalOpen(false)}
      >
        <WalletSelectModal
          handleSelect={handleWalletSelect}
          availableWallets={['keysafe', 'keplr']}
        />
      </ModalWrapper>
      <ModalWrapper
        isModalOpen={sendModalOpen}
        header={{
          title: modalTitle,
          titleNoCaps: true,
          noDivider: true,
        }}
        handleToggleModal={(): void => setSendModalOpen(false)}
      >
        <SendModal
          walletType={walletType}
          accountAddress={selectedAddress}
          handleChangeTitle={setModalTitle}
        />
      </ModalWrapper>
    </Fragment>
  )
}
