import React, { useState, Fragment } from 'react'

import BondAccountTable from 'modules/BondModules/BondAccountTable'
import ProjectAccountWrapper from './components/ProjectAccountWrapper'
import ProjectAccount from './components/ProjectAccount'

import { BondsWrapperConnected as BondsWrapper } from 'common/components/Investment/Wrapper'

export const Accounts = ({ match }) => {
  const [selected, setSelected] = useState(0)
  return (
    <BondsWrapper match={match}>
      <ProjectAccountWrapper>
        <ProjectAccount count={7} selected={selected === 0} onSelect={() => setSelected(0)}></ProjectAccount>
        <ProjectAccount count={7} selected={selected === 1} onSelect={() => setSelected(1)}></ProjectAccount>
        <ProjectAccount count={7} selected={selected === 2} onSelect={() => setSelected(2)}></ProjectAccount>
        <ProjectAccount count={7} selected={selected === 3} onSelect={() => setSelected(3)}></ProjectAccount>
        <ProjectAccount count={7} selected={selected === 4} onSelect={() => setSelected(4)}></ProjectAccount>
        <ProjectAccount count={7} selected={selected === 5} onSelect={() => setSelected(5)}></ProjectAccount>
        <ProjectAccount count={7} selected={selected === 6} onSelect={() => setSelected(6)}></ProjectAccount>
      </ProjectAccountWrapper>
      <BondAccountTable />
    </BondsWrapper>
  )
}
