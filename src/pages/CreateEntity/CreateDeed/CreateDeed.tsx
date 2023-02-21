import React, { useEffect } from 'react'
import { Route, RouteComponentProps, useParams } from 'react-router-dom'
import { useCreateEntityState, useCreateEntityStrategy } from 'hooks/createEntity'

const CreateDeed: React.FC<Pick<RouteComponentProps, 'match'>> = ({ match }): JSX.Element => {
  const { entityId } = useParams<{ entityId: string }>()
  const { getStrategyByEntityType } = useCreateEntityStrategy()
  const { updateBreadCrumbs, updateEntityType } = useCreateEntityState()
  const { steps } = getStrategyByEntityType('Deed')

  useEffect(() => {
    updateEntityType('Deed')
    updateBreadCrumbs([{ text: entityId, link: `/entity/${entityId}/dashboard` }, { text: 'Governance' }])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {Object.values(steps).map((step) => (
        <Route key={step.url} exact path={step.url} component={step.component} />
      ))}
    </>
  )
}

export default CreateDeed
