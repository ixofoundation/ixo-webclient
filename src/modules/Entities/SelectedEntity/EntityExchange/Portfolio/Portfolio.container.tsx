import React, { useState, useEffect } from 'react'
import { toggleAssistant } from 'modules/Account/Account.actions'
import AccountCard from 'pages/bond/accounts/components/ProjectAccount'
import AccountWrapper from 'pages/bond/accounts/components/ProjectAccountWrapper'
import AccountTransactionTable from 'modules/BondModules/BondAccountTable'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'common/redux/types'

const Portfolio: React.FunctionComponent = () => {
  const dispatch = useDispatch()
  const { address: accountAddress } = useSelector((state: RootState) => state.account)
  const [selected, setSelected] = useState(0)

  const handleAddAccount = (e) => {
    console.log('handleAddAccount', e)
    dispatch(
      toggleAssistant({
        fixed: true,
        intent: `/add_account`
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
        intent: `/new_transaction{ "trigger":"proto_msg", "type":"cosmos-sdk/MsgSend", "denom":"uixo","wallet_address":"ixo1yq3jv9fvq9azpt6xsqlf3vnfcw32s8jtx57vjt" }`
      }),
    )
  }
  const getBalances = (accountAddress) => {

  }

  useEffect(() => {
    dispatch(
      toggleAssistant({
        forceClose: true,
        fixed: true,
        intent: `/my_portfolio{ "source":"app.ixoworld" }`
      }),
    )
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
  }, [accountAddress])

  return (
    <>
      {/* {accounts.length > 0 && (
        <>
          <AccountWrapper title='Assets' handleAddAccount={handleAddAccount}>
            {accounts.map((account, key) => (
              <AccountCard
                key={`project-account-${key}`}
                count={accounts.length}
                selected={selected === key}
                onSelect={(): void => setSelected(key)}
              ></AccountCard>
            ))}
          </AccountWrapper>
          <AccountTransactionTable
            handleDownloadCSV={handleDownloadCSV}
            handleNewTransaction={handleNewTransaction}
          />
        </>
      )} */}
    </>
  )
}
export default Portfolio
