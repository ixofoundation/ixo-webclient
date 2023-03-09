import { LinkedResource } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { Spinner } from 'components/Spinner/Spinner'
import { cellNodeChainMapping, chainNetwork } from 'hooks/configs'
import useCurrentEntity from 'hooks/useCurrentEntity'
import NotFound from 'pages/Error/NotFound'
import React, { useEffect, useState } from 'react'
import { Redirect, Route, Switch, useParams } from 'react-router-dom'
import { validateEntityDid } from 'utils/validation'
import DashboardPage from './Dashboard/Dashboard'
import { Overview } from './Overview'

const CurrentEntityPage: React.FC = (): JSX.Element | null => {
  const { entityId } = useParams<{ entityId: string; groupId: string }>()
  const {
    entityType,
    linkedResource,
    getEntityByDid,
    updateEntityProfile,
    updateEntityCreator,
    updateEntityAdministrator,
    updateEntityPage,
    updateEntityTags,
  } = useCurrentEntity()
  const [fetchingError, setFetchingError] = useState('')

  console.log('entityType', entityType)

  useEffect(() => {
    if (validateEntityDid(entityId)) {
      setFetchingError('')
      getEntityByDid(entityId).catch(setFetchingError)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entityId])

  useEffect(() => {
    if (linkedResource.length > 0) {
      linkedResource.forEach((item: LinkedResource) => {
        const { id, serviceEndpoint } = item
        switch (id) {
          case '{id}#profile':
            fetch(serviceEndpoint)
              .then((response) => response.json())
              .then((response) => {
                updateEntityProfile(response)
              })
            break
          case '{id}#creator': {
            const [, ...paths] = serviceEndpoint.split('/')
            fetch([cellNodeChainMapping[chainNetwork], ...paths].join('/'))
              .then((response) => response.json())
              .then((response) => response.credentialSubject)
              .then((credentialSubject) => {
                updateEntityCreator(credentialSubject)
              })
            break
          }
          case '{id}#administrator': {
            const [, ...paths] = serviceEndpoint.split('/')
            fetch([cellNodeChainMapping[chainNetwork], ...paths].join('/'))
              .then((response) => response.json())
              .then((response) => response.credentialSubject)
              .then((credentialSubject) => {
                updateEntityAdministrator(credentialSubject)
              })
            break
          }
          case '{id}#page': {
            const [, ...paths] = serviceEndpoint.split('/')
            fetch([cellNodeChainMapping[chainNetwork], ...paths].join('/'))
              .then((response) => response.json())
              .then((page) => {
                console.log('{id}#page', page)
                updateEntityPage(page)
              })
            break
          }
          case '{id}#tags': {
            const [, ...paths] = serviceEndpoint.split('/')
            fetch([cellNodeChainMapping[chainNetwork], ...paths].join('/'))
              .then((response) => response.json())
              .then((ddoTags) => {
                updateEntityTags(ddoTags)
              })
            break
          }
          default:
            break
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [linkedResource])

  if (!entityType) {
    if (!fetchingError) {
      return <Spinner info='Loading Entity...' />
    }
    return <NotFound />
  }

  return (
    <Switch>
      <Route path='/entity/:entityId/overview' component={Overview} />
      <Route path='/entity/:entityId/dashboard' component={DashboardPage} />

      <Route exact path='/entity/:entityId'>
        <Redirect to={`/entity/${entityId}/overview`} />
      </Route>
    </Switch>
  )
}

export default CurrentEntityPage
