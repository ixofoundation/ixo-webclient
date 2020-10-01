import React, { Dispatch } from 'react'
import { connect } from 'react-redux'
import { RootState } from 'common/redux/types'
import * as entitySelectors from './SelectedEntity.selectors'
import { getEntity } from './SelectedEntity.actions'
import { Spinner } from 'common/components/Spinner'
import { Route } from 'react-router-dom'
import SubmitEntityClaim from 'modules/EntityClaims/SubmitEntityClaim/SubmitEntityClaim.container'
import EntityOverview from 'modules/Entities/SelectedEntity/EntityOverview/EntityOverview.container'

interface Props {
  match: any
  isLoading: boolean
  handleGetEntity: (did: string) => void
}

class EntityLayout extends React.Component<Props> {
  state = {
    assistantPanelActive: false,
  }

  componentDidMount(): void {
    const {
      match: {
        params: { projectDID: did },
      },
      handleGetEntity,
    } = this.props

    handleGetEntity(did)
  }

  assistantPanelToggle = (): void => {
    const { assistantPanelActive } = this.state
    this.setState({assistantPanelActive: !assistantPanelActive})
  }

  render(): JSX.Element {
    const {
      isLoading,
    } = this.props

    if (isLoading) {
      return <Spinner info="Loading Entity..." />
    }
    return (
      <>
        <Route
          exact
          path="/projects/:projectDID/overview/action/new_claim/form"
          component={SubmitEntityClaim}
        />

        <Route
          exact
          path="/projects/:projectDID/overview"
          component={EntityOverview}
        />
      </>
    )
    
  }
}

const mapStateToProps = (state: RootState): any => ({
  isLoading: entitySelectors.entityIsLoading(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleGetEntity: (did: string): void => dispatch(getEntity(did)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EntityLayout)
