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
import EntityExchange from 'modules/Entities/SelectedEntity/EntityExchange/EntityExchange.container'
import EntityEconomy from 'modules/Entities/SelectedEntity/EntityEconomy/EntityEconomy.container'

interface Props {
  match: any
  isLoading: boolean
  handleGetEntity: (did: string) => void
  handleGetClaimTemplate: (templateDid: string) => void
}

const EntityLayout: React.FunctionComponent<Props> = ({
  match,
  isLoading,
  handleGetEntity,
  handleGetClaimTemplate,
}) => {
  const {
    params: { projectDID: did },
  } = match

  React.useEffect(() => {
    handleGetEntity(did)
  }, [did])

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

      <Route path="/projects/:projectDID/overview" component={EntityOverview} />
      <Route path="/projects/:projectDID/detail" component={EntityImpact} />
      <Route path="/projects/:projectDID/exchange" component={EntityExchange} />
      <Route path="/projects/:projectDID/economy" component={EntityEconomy} />
      <Route
        path="/projects/:projectDID/bonds/:bondDID"
        component={BondRoutes}
      />
    </Switch>
  )
}

const mapStateToProps = (state: RootState): any => ({
  isLoading: entitySelectors.entityIsLoading(state),
  claimTemplateId: entitySelectors.selectEntityClaimTemplateId(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleGetEntity: (did: string): void => dispatch(getEntity(did)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EntityLayout)
