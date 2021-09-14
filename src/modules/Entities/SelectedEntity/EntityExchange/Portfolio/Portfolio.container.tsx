import React, { useState, useEffect } from 'react'
import {
  getAccount,
  getTransactionsByAsset,
  toggleAssistant,
} from 'modules/Account/Account.actions'
import BalanceCard from 'pages/bond/accounts/components/ProjectAccount'
import AssetWrapper from 'pages/bond/accounts/components/ProjectAccountWrapper'
import AccountTransactionTable from 'modules/BondModules/BondAccountTable'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'common/redux/types'
import { getBalanceNumber } from 'common/utils/currency.utils'
import BigNumber from 'bignumber.js'

const Portfolio: React.FunctionComponent = () => {
  const dispatch = useDispatch()
  const {
    address: accountAddress,
    balances,
    transactionsByAsset,
  } = useSelector((state: RootState) => state.account)
  const [selected, setSelected] = useState(0)

  const handleAddAccount = (e) => {
    console.log('handleAddAccount', e)
    dispatch(
      toggleAssistant({
        fixed: true,
        intent: `/add_account`,
      }),
    )
  }
  const handleDownloadCSV = () => {
    console.log('handleDownloadCSV')
  }
  const handleNewTransaction = () => {
    console.log('handleNewTransaction')
    dispatch(
      toggleAssistant({
        fixed: true,
        intent: `/new_transaction{ "trigger":"proto_msg", "type":"cosmos-sdk/MsgSend", "denom":"uixo","wallet_address":"ixo1yq3jv9fvq9azpt6xsqlf3vnfcw32s8jtx57vjt" }`,
      }),
    )
  }

  useEffect(() => {
    dispatch(
      toggleAssistant({
        forceClose: true,
        fixed: true,
        intent: `/my_portfolio{ "source":"app.ixoworld" }`,
      }),
    )
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    accountAddress && dispatch(getAccount(accountAddress))
    // eslint-disable-next-line
  }, [accountAddress])

  useEffect(() => {
    if (balances.length > 0) {
      dispatch(
        getTransactionsByAsset(
          accountAddress,
          balances.map((balance) => balance.denom),
        ),
      )
      setSelected(0)
    }
    // eslint-disable-next-line
  }, [balances])

  useEffect(() => {
    console.log(
      'transactionsByAsset',
      transactionsByAsset,
      transactionsByAsset.length,
      transactionsByAsset.length > 0,
    )
  }, [transactionsByAsset])

  return (
    <>
      {balances.length > 0 && (
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
    </>
  )
}
export default Portfolio
