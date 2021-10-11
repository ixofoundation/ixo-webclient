import React, { useState, useEffect } from 'react'
import {
  getTransactionsByAsset,
  toggleAssistant,
} from 'modules/Account/Account.actions'
import Axios from 'axios'
import BalanceCard from 'pages/bond/accounts/components/ProjectAccount'
import AssetWrapper from 'pages/bond/accounts/components/ProjectAccountWrapper'
import AccountTransactionTable from 'modules/BondModules/BondAccountTable'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'common/redux/types'
import { getBalanceNumber } from 'common/utils/currency.utils'
import BigNumber from 'bignumber.js'
import { ModalWrapper } from 'common/components/Wrappers/ModalWrapper'
import WalletSelectModal from 'common/components/ControlPanel/Actions/WalletSelectModal'
import { apiCurrencyToCurrency } from 'modules/Account/Account.utils'
import { Currency } from 'types/models'
import SendModal from 'common/components/ControlPanel/Actions/SendModal'

const Portfolio: React.FunctionComponent = () => {
  const dispatch = useDispatch()
  const { transactionsByAsset } = useSelector(
    (state: RootState) => state.account,
  )
  const [selected, setSelected] = useState(0)
  const [sendModalOpen, setSendModalOpen] = useState<boolean>(false)
  const [walletModalOpen, setWalletModalOpen] = useState<boolean>(true)
  const [balances, setBalances] = useState<Currency[]>([])
  const [walletType, setWalletType] = useState(null)
  const [selectedAddress, setSelectedAddress] = useState(null)

  const handleWalletSelect = (
    walletType: string,
    accountAddress: string,
  ): void => {
    setWalletType(walletType)
    setSelectedAddress(accountAddress)
    setWalletModalOpen(false)
  }

  const handleAddAccount = (e): void => {
    console.log('handleAddAccount', e)
    dispatch(
      toggleAssistant({
        fixed: true,
        intent: `/add_account`,
      }),
    )
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
    }
    // eslint-disable-next-line
  }, [balances])

  return (
    <>
      {selectedAddress && balances.length > 0 && (
        <>
          <AssetWrapper title="Assets" handleAddAccount={handleAddAccount}>
            {balances.map((balance, key) => {
              let balance_ = { ...balance }
              if (balance.denom === 'uixo') {
                balance_ = {
                  denom: 'ixo',
                  amount: Number(
                    getBalanceNumber(new BigNumber(balance.amount)).toFixed(0),
                  ),
                }
              }
              return (
                <BalanceCard
                  key={`project-balance-${key}`}
                  count={balances.length}
                  selected={selected === key}
                  onSelect={(): void => setSelected(key)}
                  balance={balance_}
                  locked={false}
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
          title: 'Send',
          titleNoCaps: true,
          noDivider: true,
        }}
        handleToggleModal={(): void => setSendModalOpen(false)}
      >
        <SendModal walletType={walletType} accountAddress={selectedAddress} />
      </ModalWrapper>
    </>
  )
}
export default Portfolio
