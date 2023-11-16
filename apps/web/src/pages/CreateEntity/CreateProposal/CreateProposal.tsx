import React, { useEffect } from 'react'
import { Redirect, Route, RouteComponentProps, useParams, useRouteMatch } from 'react-router-dom'
import { useCreateEntityState } from 'hooks/createEntity'
import useCurrentEntity, { useCurrentEntityDAOGroup, useCurrentEntityProfile } from 'hooks/currentEntity'
import {
  SetupTargetGroup,
  SetupInfo as SetupProposalInfo,
  SetupPageContent,
  SetupActions,
  SetupProperties as SetupProposalProperties,
  ReviewProposal,
} from './Pages'
import { useQuery } from 'hooks/window'
import { useAppSelector } from 'redux/hooks'
import { selectEntityById } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { TEntityModel } from 'types/entities'

const CreateProposal: React.FC<Pick<RouteComponentProps, 'match'>> = ({ match }): JSX.Element => {
  const { entityId, coreAddress } = useParams<{ entityId: string; coreAddress: string }>()
  const { getQuery } = useQuery()
  const join = getQuery('join')

  const { updateEntity } = useCurrentEntity()
  const { daoGroup } = useCurrentEntityDAOGroup(coreAddress)
  const { name: entityName } = useCurrentEntityProfile()
  const { updateBreadCrumbs, updateEntityType, updateTitle, updateSubtitle } = useCreateEntityState()
  const isSetupTargetRoute = useRouteMatch('/create/entity/deed/:entityId/:coreAddress/select')
  const isSetupInfoRoute = useRouteMatch('/create/entity/deed/:entityId/:coreAddress/info')
  const isSetupPageRoute = useRouteMatch('/create/entity/deed/:entityId/:coreAddress/page')
  const isSetupPropertiesRoute = useRouteMatch('/create/entity/deed/:entityId/:coreAddress/property')
  const isSetupActionsRoute = useRouteMatch('/create/entity/deed/:entityId/:coreAddress/action')
  const isReviewRoute = useRouteMatch('/create/entity/deed/:entityId/:coreAddress/review')
  const selectedEntity: TEntityModel | undefined = useAppSelector(selectEntityById(entityId))

  useEffect(() => {
    updateEntityType('deed')
    updateBreadCrumbs([
      { text: entityName || entityId, link: `/entity/${entityId}/dashboard` },
      { text: daoGroup?.config.name || 'Governance', link: `/entity/${entityId}/dashboard/governance` },
    ])
    updateTitle('Create a Proposal')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [daoGroup?.config.name, entityName])

  useEffect(() => {
    if (isSetupTargetRoute?.isExact) {
      updateSubtitle('Select the Target Group')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSetupTargetRoute?.isExact])
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
  useEffect(() => {
    if (isReviewRoute?.isExact) {
      updateSubtitle('Review and Submit')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReviewRoute?.isExact])

  useEffect(() => {
    if (selectedEntity) {
      updateEntity(selectedEntity)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEntity])

  return (
    <>
      <Route exact path={'/create/entity/deed/:entityId/:coreAddress/select'} component={SetupTargetGroup} />
      <Route exact path={'/create/entity/deed/:entityId/:coreAddress/info'} component={SetupProposalInfo} />
      <Route exact path={'/create/entity/deed/:entityId/:coreAddress/page'} component={SetupPageContent} />
      <Route exact path={'/create/entity/deed/:entityId/:coreAddress/property'} component={SetupProposalProperties} />
      <Route exact path={'/create/entity/deed/:entityId/:coreAddress/action'} component={SetupActions} />
      <Route exact path={'/create/entity/deed/:entityId/:coreAddress/review'} component={ReviewProposal} />

      <Route exact path={`/create/entity/deed/:entityId/:coreAddress`}>
        {join === 'true' ? (
          <Redirect to={`/create/entity/deed/${entityId}/${coreAddress}/select?join=true`} />
        ) : (
          <Redirect to={`/create/entity/deed/${entityId}/${coreAddress}/info`} />
        )}
      </Route>
    </>
  )
}

export default CreateProposal
