import React, { Dispatch } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { SubmitEntityClaimConnected } from '../SubmitEntityClaim/SubmitEntityClaim.container'
import { getEntity } from './SelectedEntity.actions'

interface Props {
  match: any
  handleGetEntity: (entityDid: string) => void
}

class SelectedEntity extends React.Component<Props, {}> {
  componentDidMount(): void {
    const {
      match: {
        params: { entityDid },
      },
      handleGetEntity,
    } = this.props

    handleGetEntity(entityDid)
  }

  render(): JSX.Element {
    // TODO - place ALL /entity/:entityDid paths here
    return (
      <>
        <Route
          exact
          path={`/entity/:entityDid/claims/new-claim`}
          component={SubmitEntityClaimConnected}
        />
      </>
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleGetEntity: (entityDid): void => dispatch(getEntity(entityDid)),
})

export const SelectedEntityContainerConnected = connect(
  null,
  mapDispatchToProps,
)(SelectedEntity)
