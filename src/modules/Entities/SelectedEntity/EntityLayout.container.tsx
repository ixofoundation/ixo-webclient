import React, { Dispatch } from 'react'
import { connect } from 'react-redux'
import { RootState } from 'redux/types'
import * as entitySelectors from '../../../redux/selectedEntity/selectedEntity.selectors'
import { getEntity } from '../../../redux/selectedEntity/selectedEntity.actions'
import { Spinner, ProjectLoadingError } from 'components/Spinner'
import { Redirect, Route, Switch } from 'react-router-dom'
import SubmitEntityClaim from 'modules/EntityClaims/SubmitEntityClaim/SubmitEntityClaim.container'
import EntityOverview from 'modules/Entities/SelectedEntity/EntityOverview/EntityOverview.container'
import EntityImpact from 'modules/Entities/SelectedEntity/EntityImpact/EntityImpact.container'
import BondRoutes from 'routes/BondRoutes'
import FundRoutes from 'routes/InvestmentRoutes'
import EntityExchange from 'modules/Entities/SelectedEntity/EntityExchange/EntityExchange.container'
import EntityEconomy from 'modules/Entities/SelectedEntity/EntityEconomy/EntityEconomy.container'

interface Props {
  match: any
  isLoading: boolean
  error: string
  handleGetEntity: (did: string) => void
  handleGetClaimTemplate: (templateDid: string) => void
}

const EntityLayout: React.FunctionComponent<Props> = ({
  match,
  error,
  isLoading,
  handleGetEntity,
  // handleGetClaimTemplate,
}) => {
  const {
    params: { projectDID: did },
  } = match

  React.useEffect(() => {
    handleGetEntity(did)
    // eslint-disable-next-line
  }, [did])

  if (isLoading) {
    if (error) {
      return <ProjectLoadingError error={error} />
    }
    return <Spinner info='Loading Entity...' />
  }

  return (
    <Switch>
      <Route exact path='/projects/:projectDID'>
        <Redirect to={`/projects/${did}/overview`} />
      </Route>

      <Route
        exact
        path='/projects/:projectDID/overview/claims/new_claim/:claimTemplateDid'
        component={SubmitEntityClaim}
      />
      <Route path='/projects/:projectDID/overview' component={EntityOverview} />
      <Route path='/projects/:projectDID/detail' component={EntityImpact} />
      <Route path='/projects/:projectDID/voting' component={EntityImpact} />
      <Route path='/projects/:projectDID/exchange' component={EntityExchange} />
      <Route path='/projects/:projectDID/economy' component={EntityEconomy} />
      <Route path='/projects/:projectDID/funding' component={FundRoutes} />
      <Route path='/projects/:projectDID/bonds/:bondDID/detail' component={BondRoutes} />
    </Switch>
  )
}

const mapStateToProps = (state: RootState): any => ({
  isLoading: entitySelectors.entityIsLoading(state),
  error: entitySelectors.selectEntityLoadingError(state),
  claimTemplateId: entitySelectors.selectEntityClaimTemplateId(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleGetEntity: (did: string): void => dispatch(getEntity(did)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EntityLayout)
