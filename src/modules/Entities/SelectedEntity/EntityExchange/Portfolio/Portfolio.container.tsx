import React, { useState, useEffect } from 'react'
import { getTransactions } from 'modules/Account/Account.actions'
import Axios from 'axios'
import BalanceCard from 'pages/bond/accounts/components/ProjectAccount'
import AssetWrapper from 'pages/bond/accounts/components/ProjectAccountWrapper'
import AccountTransactionTable from 'modules/BondModules/BondAccountTable'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'common/redux/types'
import {
  changePortfolioAsset,
  changeSelectedAccountAddress,
} from '../EntityExchange.actions'
import { ModalWrapper } from 'common/components/Wrappers/ModalWrapper'
import WalletSelectModal from 'common/components/ControlPanel/Actions/WalletSelectModal'
import {
  apiCurrencyToCurrency,
  findDenomByMinimalDenom,
  minimalDenomToDenom,
} from 'modules/Account/Account.utils'
import { Currency } from 'types/models'
import SendModal from 'common/components/ControlPanel/Actions/SendModal'

const Portfolio: React.FunctionComponent = () => {
  const dispatch = useDispatch()
  const { transactions, usdRate } = useSelector(
    (state: RootState) => state.account,
  )
  const [selected, setSelected] = useState(0)
  const [sendModalOpen, setSendModalOpen] = useState<boolean>(false)
  const [walletModalOpen, setWalletModalOpen] = useState<boolean>(true)
  const [balances, setBalances] = useState<Currency[]>([])
  const [walletType, setWalletType] = useState(null)
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [modalTitle, setModalTitle] = useState('Send')

  const handleWalletSelect = (
    walletType: string,
    accountAddress: string,
  ): void => {
    setWalletType(walletType)
    setSelectedAddress(accountAddress)
    dispatch(changeSelectedAccountAddress(accountAddress))
    setWalletModalOpen(false)
  }

  const handleAddAccount = (e): void => {
    console.log('handleAddAccount', e)
    // dispatch(
    //   toggleAssistant({
    //     fixed: true,
    //     intent: `/add_account`,
    //   }),
    // )
  }
  const handleDownloadCSV = (): void => {
    console.log('handleDownloadCSV')
  }
  const handleNewTransaction = (): void => {
    setSendModalOpen(true)
  }

  const getBalances = async (address: string): Promise<any> => {
    return Axios.get(
      process.env.REACT_APP_GAIA_URL + '/bank/balances/' + address,
    ).then((response) => {
      return {
        balances: response.data.result.map((coin) =>
          apiCurrencyToCurrency(coin),
        ),
      }
    })
  }

  useEffect(() => {
    if (selectedAddress) {
      getBalances(selectedAddress).then(({ balances }) => {
        setBalances(
          balances.map((balance) => ({
            denom: findDenomByMinimalDenom(balance.denom),
            amount: minimalDenomToDenom(balance.denom, balance.amount),
          })),
        )
      })
      dispatch(getTransactions(selectedAddress))
    }
    // eslint-disable-next-line
  }, [selectedAddress])

  useEffect(() => {
    if (balances.length > 0) {
      setSelected(0)
      dispatch(changePortfolioAsset(balances[0].denom))
    }
    // eslint-disable-next-line
  }, [balances])

  useEffect(() => {
    if (balances.length > 0) {
      dispatch(changePortfolioAsset(balances[selected].denom))
    }
    // eslint-disable-next-line
  }, [selected])

  return (
    <>
      {selectedAddress && balances.length > 0 && (
        <>
          <AssetWrapper title="Assets" handleAddAccount={handleAddAccount}>
            {balances
              .map((balance) => ({
                ...balance,
                usdRate: balance.denom === 'ixo' ? usdRate : 1,
              }))
              .map((balance, key) => (
                <BalanceCard
                  key={`project-balance-${key}`}
                  count={balances.length}
                  selected={selected === key}
                  onSelect={(): void => setSelected(key)}
                  balance={balance}
                  locked={false}
                  subLabel={`USD ${(balance.usdRate * balance.amount).toFixed(
                    2,
                  )}`}
                  address={selectedAddress}
                />
              ))}
          </AssetWrapper>
          {transactions.length > 0 && (
            <AccountTransactionTable
              handleDownloadCSV={handleDownloadCSV}
              handleNewTransaction={handleNewTransaction}
              token={
                balances[selected].denom !== 'uixo'
                  ? balances[selected].denom
                  : 'ixo'
              }
              tableData={transactions
                .filter((tx) => tx.asset === balances[selected].denom)
                .reverse()}
            />
          )}
        </>
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
    </>
  )
}
export default Portfolio
