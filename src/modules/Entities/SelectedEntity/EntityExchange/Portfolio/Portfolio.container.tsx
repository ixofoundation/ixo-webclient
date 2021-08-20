import React, { useState, useEffect } from 'react'
import ProjectAccount from 'pages/bond/accounts/components/ProjectAccount'
import ProjectAccountWrapper from 'pages/bond/accounts/components/ProjectAccountWrapper'
import { useSelector } from 'react-redux'
import { RootState } from 'common/redux/types'

// export interface Props {
// }

const Portfolio: React.FunctionComponent = () => {
  const [selected, setSelected] = useState(0)
  // const accounts = useSelector((state: RootState) => state.projectState.accountsInfo.accounts)
  const accounts = [0, 1, 2, 3, 4, 5, 6, 7]

  useEffect(() => {
    console.log('accounts', accounts)
  }, [accounts])
  return (
    <>
      {accounts.length > 0 && (
        <ProjectAccountWrapper>
          {accounts.map((account, key) => (
            <ProjectAccount
              key={`project-account-${key}`}
              count={7}
              selected={selected === 0}
              onSelect={(): void => setSelected(0)}
            ></ProjectAccount>
          ))}
        </ProjectAccountWrapper>
      )}
    </>
  )
}
export default Portfolio
