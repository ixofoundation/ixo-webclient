import React, { useState, useEffect } from 'react'
import { getTransactionsByAsset } from 'modules/Account/Account.actions'
import Axios from 'axios'
import BalanceCard from 'pages/bond/accounts/components/ProjectAccount'
import AssetWrapper from 'pages/bond/accounts/components/ProjectAccountWrapper'
import AccountTransactionTable from 'modules/BondModules/BondAccountTable'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'common/redux/types'
import { getBalanceNumber } from 'common/utils/currency.utils'
import BigNumber from 'bignumber.js'
import {
  changePortfolioAsset,
  changeSelectedAccountAddress,
} from '../EntityExchange.actions'
import { ModalWrapper } from 'common/components/Wrappers/ModalWrapper'
import WalletSelectModal from 'common/components/ControlPanel/Actions/WalletSelectModal'
import { apiCurrencyToCurrency } from 'modules/Account/Account.utils'
import { Currency } from 'types/models'
import SendModal from 'common/components/ControlPanel/Actions/SendModal'

const Portfolio: React.FunctionComponent = () => {
  const dispatch = useDispatch()
  const { transactionsByAsset, usdRate } = useSelector(
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
    console.log('selectedAddress', selectedAddress)
    if (selectedAddress) {
      getBalances(selectedAddress).then(({ balances }) => {
        setBalances(balances)
      })
    }
    // eslint-disable-next-line
  }, [selectedAddress])

  useEffect(() => {
    console.log('balances', balances)
    if (balances.length > 0) {
      dispatch(
        getTransactionsByAsset(
          selectedAddress,
          balances.map((balance) => balance.denom),
        ),
      )
      setSelected(0)
      dispatch(changePortfolioAsset(balances[0].denom))
    }
    // eslint-disable-next-line
  }, [balances])

  useEffect(() => {
    if (balances.length > 0) {
      dispatch(changePortfolioAsset(balances[selected].denom))
    }
  }, [selected])

  useEffect(() => {
    console.log('transactionsByAsset', transactionsByAsset)
  }, [transactionsByAsset])

  return (
    <>
      {selectedAddress && balances.length > 0 && (
        <>
          <AssetWrapper title="Assets" handleAddAccount={handleAddAccount}>
            {balances
              .map((balance) => {
                if (balance.denom === 'uixo') {
                  return {
                    denom: 'IXO',
                    amount: Number(
                      getBalanceNumber(new BigNumber(balance.amount)).toFixed(
                        0,
                      ),
                    ),
                    usdRate,
                  }
                }
                return {
                  denom: balance.denom.toUpperCase(),
                  amount: Number(balance.amount.toFixed(0)),
                  usdRate: 1,
                }
              })
              .map((balance, key) => {
                return (
                  <BalanceCard
                    key={`project-balance-${key}`}
                    count={balances.length}
                    selected={selected === key}
                    onSelect={(): void => setSelected(key)}
                    balance={balance}
                    locked={false}
                    subLabel={`USD ${balance.usdRate.toFixed(2)}`}
                  ></BalanceCard>
                )
              })}
          </AssetWrapper>
          {transactionsByAsset.length > 0 && (
            <AccountTransactionTable
              handleDownloadCSV={handleDownloadCSV}
              handleNewTransaction={handleNewTransaction}
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
        <WalletSelectModal handleSelect={handleWalletSelect} />
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
