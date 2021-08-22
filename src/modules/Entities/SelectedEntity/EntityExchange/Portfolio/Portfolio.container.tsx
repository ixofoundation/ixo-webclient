import React, { useState, useEffect } from 'react'
import AccountCard from 'pages/bond/accounts/components/ProjectAccount'
import AccountWrapper from 'pages/bond/accounts/components/ProjectAccountWrapper'
import AccountTransactionTable from 'modules/BondModules/BondAccountTable'
// import { useSelector } from 'react-redux'
// import { RootState } from 'common/redux/types'

const Portfolio: React.FunctionComponent = () => {
  const [selected, setSelected] = useState(0)
  // const accounts = useSelector((state: RootState) => state.projectState.accountsInfo.accounts)
  const accounts = [0, 1, 2, 3, 4, 5, 6, 7]

  const handleAddAccount = (e) => {
    console.log('handleAddAccount', e)
  }
  const handleDownloadCSV = () => {
    console.log('handleDownloadCSV')
  }
  const handleNewTransaction = () => {
    console.log('handleNewTransaction')
  }

  useEffect(() => {
    console.log('accounts', accounts)
  }, [accounts])
  return (
    <>
      {accounts.length > 0 && (
        <>
          <AccountWrapper title='Assets' handleAddAccount={handleAddAccount}>
            {accounts.map((account, key) => (
              <AccountCard
                key={`project-account-${key}`}
                count={7}
                selected={selected === 0}
                onSelect={(): void => setSelected(0)}
              ></AccountCard>
            ))}
          </AccountWrapper>
          <AccountTransactionTable
            handleDownloadCSV={handleDownloadCSV}
            handleNewTransaction={handleNewTransaction}
          />
        </>
      )}
    </>
  )
}
export default Portfolio
