import React, { useEffect } from 'react'
import { Redirect, Route, RouteComponentProps, useRouteMatch } from 'react-router-dom'
import { useCreateEntityState } from 'hooks/createEntity'
import { ReviewDeed, SelectCreationProcess, SetupDataCollection, SetupMetadata, SetupProperties } from './Pages'

const CreateDeed: React.FC<Pick<RouteComponentProps, 'match'>> = ({ match }): JSX.Element => {
  const { entityType, updateEntityType, updateTitle, updateSubtitle, updateBreadCrumbs } = useCreateEntityState()
  const isSelectProcessRoute = useRouteMatch(`/create/entity/${entityType}/process`)
  const isSetupMetadataRoute = useRouteMatch(`/create/entity/${entityType}/profile`)
  const isSetupDataCollectionRoute = useRouteMatch(`/create/entity/${entityType}/collection`)
  const isSetupPropertiesRoute = useRouteMatch(`/create/entity/${entityType}/property`)

  useEffect(() => {
    updateEntityType('protocol/deed')
    updateTitle('Deed Creation')
    updateBreadCrumbs([{ text: 'Protocol' }])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isSelectProcessRoute?.isExact) {
      updateSubtitle('New or Clone')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSelectProcessRoute?.isExact])
  useEffect(() => {
    if (isSetupMetadataRoute?.isExact) {
      updateSubtitle('Profile')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSetupMetadataRoute?.isExact])
  useEffect(() => {
    if (isSetupDataCollectionRoute?.isExact) {
      updateSubtitle('Data Collection Form')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSetupDataCollectionRoute?.isExact])
  useEffect(() => {
    if (isSetupPropertiesRoute?.isExact) {
      updateSubtitle('Configuration')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSetupPropertiesRoute?.isExact])

  return (
    <>
      <Route exact path={`${match.path}/process`} component={SelectCreationProcess} />
      <Route exact path={`${match.path}/profile`} component={SetupMetadata} />
      <Route exact path={`${match.path}/collection`} component={SetupDataCollection} />
      <Route exact path={`${match.path}/property`} component={SetupProperties} />
      <Route exact path={`${match.path}/review`} component={ReviewDeed} />

      <Route exact path={`${match.path}`}>
        <Redirect to={`${match.path}/process`} />
      </Route>
    </>
  )
}

export default CreateDeed
