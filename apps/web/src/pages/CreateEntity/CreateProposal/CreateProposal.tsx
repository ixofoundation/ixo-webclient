import React, { useEffect } from 'react'
import { Navigate, Route, matchPath, useLocation, useParams } from 'react-router-dom'
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

const CreateProposal = (): JSX.Element => {
  const { entityId = "", coreAddress = ""} = useParams<{ entityId: string; coreAddress: string }>()
  const { getQuery } = useQuery()
  const join = getQuery('join')
  const { pathname } = useLocation()

  const { updateEntity } = useCurrentEntity()
  const { daoGroup } = useCurrentEntityDAOGroup(coreAddress)
  const { name: entityName } = useCurrentEntityProfile()
  const { updateBreadCrumbs, updateEntityType, updateTitle, updateSubtitle } = useCreateEntityState()
  const isSetupTargetRoute = matchPath({path: '/create/entity/deed/:entityId/:coreAddress/select', end: true}, pathname)
  const isSetupInfoRoute = matchPath({path: '/create/entity/deed/:entityId/:coreAddress/info', end: true}, pathname)
  const isSetupPageRoute = matchPath({path: '/create/entity/deed/:entityId/:coreAddress/page', end: true}, pathname)
  const isSetupPropertiesRoute = matchPath({path: '/create/entity/deed/:entityId/:coreAddress/property', end: true}, pathname)
  const isSetupActionsRoute = matchPath({path: '/create/entity/deed/:entityId/:coreAddress/action', end: true}, pathname)
  const isReviewRoute = matchPath({path: '/create/entity/deed/:entityId/:coreAddress/review', end: true}, pathname)
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
    if (isSetupTargetRoute) {
      updateSubtitle('Select the Target Group')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSetupTargetRoute])
  useEffect(() => {
    if (isSetupInfoRoute) {
      updateSubtitle('Proposal Info')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSetupInfoRoute])
  useEffect(() => {
    if (isSetupPageRoute) {
      updateSubtitle('Configure the proposal page')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSetupPageRoute])
  useEffect(() => {
    if (isSetupPropertiesRoute) {
      updateSubtitle('Configure the proposal settings')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSetupPropertiesRoute])
  useEffect(() => {
    if (isSetupActionsRoute) {
      updateSubtitle('Add actions')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSetupActionsRoute])
  useEffect(() => {
    if (isReviewRoute) {
      updateSubtitle('Review and Submit')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReviewRoute])

  useEffect(() => {
    if (selectedEntity) {
      updateEntity(selectedEntity)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEntity])

  return (
    <>
      <Route path={'/create/entity/deed/:entityId/:coreAddress/select'} element={<SetupTargetGroup/>} />
      <Route path={'/create/entity/deed/:entityId/:coreAddress/info'} element={<SetupProposalInfo/>} />
      <Route path={'/create/entity/deed/:entityId/:coreAddress/page'} element={<SetupPageContent/>} />
      <Route path={'/create/entity/deed/:entityId/:coreAddress/property'} element={<SetupProposalProperties/>} />
      <Route path={'/create/entity/deed/:entityId/:coreAddress/action'} element={<SetupActions/>} />
      <Route path={'/create/entity/deed/:entityId/:coreAddress/review'} element={<ReviewProposal/>} />

      <Route path={`/create/entity/deed/:entityId/:coreAddress`}>
        {join === 'true' ? (
          <Navigate to={`/create/entity/deed/${entityId}/${coreAddress}/select?join=true`} />
        ) : (
          <Navigate to={`/create/entity/deed/${entityId}/${coreAddress}/info`} />
        )}
      </Route>
    </>
  )
}

export default CreateProposal
