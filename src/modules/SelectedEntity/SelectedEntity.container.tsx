import React from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { SubmitEntityClaimConnected } from '../SubmitEntityClaim/SubmitEntityClaim.container'

class SelectedEntity extends React.Component {
  render() {
    return (
      <Route
        exact
        path={`/entity/:projectDID/claims/new-claim`}
        component={SubmitEntityClaimConnected}
      />
    )
  }
}
