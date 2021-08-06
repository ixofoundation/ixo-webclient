import React, { Dispatch } from 'react'
import { connect } from 'react-redux'
import { RootState } from 'common/redux/types'
import * as entitySelectors from './SelectedEntity.selectors'
import { getEntity } from './SelectedEntity.actions'
import { Spinner } from 'common/components/Spinner'
import { Route, Switch } from 'react-router-dom'
import SubmitEntityClaim from 'modules/EntityClaims/SubmitEntityClaim/SubmitEntityClaim.container'
import EntityOverview from 'modules/Entities/SelectedEntity/EntityOverview/EntityOverview.container'
import EntityImpact from 'modules/Entities/SelectedEntity/EntityImpact/EntityImpact.container'
import BondRoutes from 'routes/BondRoutes'

interface Props {
  match: any
  isLoading: boolean
  handleGetEntity: (did: string) => void
  handleGetClaimTemplate: (templateDid: string) => void
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
    this.setState({ assistantPanelActive: !assistantPanelActive })
  }

  render(): JSX.Element {
    const { isLoading } = this.props

    if (isLoading) {
      return <Spinner info="Loading Entity..." />
    }
    return (
      <Switch>
        <Route
          exact
          path="/projects/:projectDID/overview/claims/new_claim/:claimTemplateDid"
          component={SubmitEntityClaim}
        />

        <Route
          path="/projects/:projectDID/overview"
          component={EntityOverview}
        />
        <Route path="/projects/:projectDID/detail" component={EntityImpact} />
        <Route
          path="/projects/:projectDID/bonds/:bondDID"
          component={BondRoutes}
        />
      </Switch>
    )
  }
}

const mapStateToProps = (state: RootState): any => ({
  isLoading: entitySelectors.entityIsLoading(state),
  claimTemplateId: entitySelectors.selectEntityClaimTemplateId(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleGetEntity: (did: string): void => dispatch(getEntity(did)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EntityLayout)
