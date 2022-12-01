import React, { FunctionComponent, useState, Fragment } from 'react'

import BondAccountTable from 'components/Bonds/BondAccountTable/BondAccountTable'
import ProjectAccountWrapper from './Components/ProjectAccountWrapper'
import ProjectAccount from './Components/ProjectAccount'

export const Accounts: FunctionComponent<any> = ({ match }) => {
  const [selected, setSelected] = useState(0)
  return (
    <Fragment>
      <ProjectAccountWrapper>
        <ProjectAccount count={7} selected={selected === 0} onSelect={(): void => setSelected(0)}></ProjectAccount>
        <ProjectAccount count={7} selected={selected === 1} onSelect={(): void => setSelected(1)}></ProjectAccount>
        <ProjectAccount count={7} selected={selected === 2} onSelect={(): void => setSelected(2)}></ProjectAccount>
        <ProjectAccount count={7} selected={selected === 3} onSelect={(): void => setSelected(3)}></ProjectAccount>
        <ProjectAccount count={7} selected={selected === 4} onSelect={(): void => setSelected(4)}></ProjectAccount>
        <ProjectAccount count={7} selected={selected === 5} onSelect={(): void => setSelected(5)}></ProjectAccount>
        <ProjectAccount count={7} selected={selected === 6} onSelect={(): void => setSelected(6)}></ProjectAccount>
      </ProjectAccountWrapper>
      <BondAccountTable />
    </Fragment>
  )
}
