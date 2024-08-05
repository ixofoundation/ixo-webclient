import React from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import DashboardPage from './Dashboard/Dashboard'
import OverviewPage from './Overview/Overview'
import TreasuryPage from './Treasury/Treasury'
import ProposalOverviewPage from './Proposal/Overview'
import TransferEntity from 'screens/TransferEntity'

const CurrentEntityPage: React.FC = (): JSX.Element => {
  const { state } = useLocation()

  return (
    <Routes>
      <Route
        index
        element={<Navigate to={state?.collectionName ? `overview?collection=${state.collectionName}` : 'overview'} />}
      />
      <Route path='overview/*' element={<OverviewPage />} />
      <Route path='dashboard/*' element={<DashboardPage />} />
      <Route path='treasury/*' element={<TreasuryPage />} />
      <Route path='overview/proposal/:deedId' element={<ProposalOverviewPage />} />
      <Route path='transfer/*' element={<TransferEntity />} />
    </Routes>
  )
}

export default CurrentEntityPage
