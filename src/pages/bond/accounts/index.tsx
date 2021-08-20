import React, { FunctionComponent, useState, useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import BondAccountTable from 'modules/BondModules/BondAccountTable'
import ProjectAccountWrapper from './components/ProjectAccountWrapper'
import ProjectAccount from './components/ProjectAccount'
import { selectPathnameProps } from 'modules/Router/router.selector'
import { getProjectAccounts } from 'pages/bond/store/actions'
import { selectAccounts, selectAccountLoadingState } from '../store/selector'
import { Spinner } from 'common/components/Spinner'

export const Accounts: FunctionComponent<any> = ({ match }) => {
  const dispatch = useDispatch()
  const pathName = useSelector(selectPathnameProps)
  const accounts = useSelector(selectAccounts)
  const accountLoadingState = useSelector(selectAccountLoadingState)
  const projectDID = pathName.split('/')[2]

  useEffect(() => {
    dispatch(getProjectAccounts(projectDID))
    // eslint-disable-next-line
  }, [])

  const [selected, setSelected] = useState(0)
  
  const handleAddAccount = (e) => {
    console.log('handleAddAccount', e)
  }

  if (accountLoadingState) return <Spinner info="Loading accounts..." />
  return (
    <Fragment>
      <ProjectAccountWrapper title='Project Accounts' handleAddAccount={handleAddAccount}>
        {accounts.map((account, key) => (
          <ProjectAccount
            key={`project-account-${key}`}
            count={7}
            selected={selected === 0}
            onSelect={(): void => setSelected(0)}
          ></ProjectAccount>
        ))}
      </ProjectAccountWrapper>
      <BondAccountTable />
    </Fragment>
  )
}
