import React, { useEffect } from 'react'
import { Route, RouteComponentProps, useParams, useRouteMatch } from 'react-router-dom'
import { useCreateEntityState, useCreateEntityStrategy } from 'hooks/createEntity'
import { useCurrentDaoGroup } from 'hooks/currentDao'

const CreateProposal: React.FC<Pick<RouteComponentProps, 'match'>> = ({ match }): JSX.Element => {
  const { entityId, coreAddress } = useParams<{ entityId: string; coreAddress: string }>()
  const { daoGroup } = useCurrentDaoGroup(coreAddress)
  const { getStrategyByEntityType } = useCreateEntityStrategy()
  const { updateBreadCrumbs, updateEntityType, updateTitle, updateSubtitle } = useCreateEntityState()
  const isSetupInfoRoute = useRouteMatch('/create/entity/deed/:entityId/:coreAddress/info')
  const isSetupPageRoute = useRouteMatch('/create/entity/deed/:entityId/:coreAddress/setup-page')
  const isSetupPropertiesRoute = useRouteMatch('/create/entity/deed/:entityId/:coreAddress/setup-properties')
  const isSetupActionsRoute = useRouteMatch('/create/entity/deed/:entityId/:coreAddress/setup-actions')
  const { steps } = getStrategyByEntityType('deed')

  useEffect(() => {
    updateEntityType('deed')
    updateBreadCrumbs([
      { text: entityId, link: `/entity/${entityId}/dashboard` },
      { text: daoGroup?.config.name || 'Governance', link: `/entity/${entityId}/dashboard/governance` },
    ])
    updateTitle('Governance Proposal creation')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [daoGroup?.config.name])

  useEffect(() => {
    if (isSetupInfoRoute?.isExact) {
      updateSubtitle('Proposal Info')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSetupInfoRoute?.isExact])
  useEffect(() => {
    if (isSetupPageRoute?.isExact) {
      updateSubtitle('Configure the proposal page')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSetupPageRoute?.isExact])
  useEffect(() => {
    if (isSetupPropertiesRoute?.isExact) {
      updateSubtitle('Configure the proposal settings')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSetupPropertiesRoute?.isExact])
  useEffect(() => {
    if (isSetupActionsRoute?.isExact) {
      updateSubtitle('Add actions')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSetupActionsRoute?.isExact])

  return (
    <>
      {Object.values(steps).map((step) => (
        <Route key={step.url} exact path={step.url} component={step.component} />
      ))}
    </>
  )
}

export default CreateProposal
