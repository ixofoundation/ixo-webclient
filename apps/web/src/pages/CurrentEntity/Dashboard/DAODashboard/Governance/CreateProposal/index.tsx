import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SetupProposalInfo from './SetupProposalInfo'
import SetupProposalPage from './SetupProposalPage'
import { SetupActions } from './SetupProposalActions'
import { ReviewProposal } from './ReviewProposal'

const CreateProposal: React.FC = () => {
  return (
    <Routes>
      <Route index element={<Navigate to={`info`} />} />
      <Route path='info' Component={SetupProposalInfo} />
      <Route path='page' Component={SetupProposalPage} />
      <Route path='action' Component={SetupActions} />
      <Route path='review' Component={ReviewProposal} />
    </Routes>
  )
}

export default CreateProposal
