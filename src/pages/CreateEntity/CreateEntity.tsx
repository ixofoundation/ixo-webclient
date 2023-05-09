import React, { useEffect } from 'react'
import { Redirect, Route, useHistory } from 'react-router-dom'
import CreateAsset from './CreateAsset/CreateAsset'
import CreateInvestment from './CreateInvestment/CreateInvestment'
import CreateEntityLayout from './CreateEntityLayout/CreateEntityLayout'
import CreateClaim from './CreateClaim/CreateClaim'
import CreateDAO from './CreateDAO/CreateDAO'
import CreateProject from './CreateProject/CreateProject'
import CreateOracle from './CreateOracle/CreateOracle'
import CreateProposal from './CreateProposal/CreateProposal'
import CreateProtocol from './CreateProtocol/CreateProtocol'
import { useCreateEntityState, useCreateEntityStrategy } from 'hooks/createEntity'
import { CreateEntityStrategyMap } from 'redux/createEntity/strategy-map'

const CreateEntity: React.FC = (): JSX.Element => {
  const history = useHistory()
  const {
    location: { pathname },
  } = history

  console.log(11111, history)

  const { stepNo, breadCrumbs, title, subtitle, setRedirectTo } = useCreateEntityState()
  const { getStrategyAndStepByPath } = useCreateEntityStrategy()
  const { strategy } = getStrategyAndStepByPath(pathname)
  const entityType = strategy?.entityType

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (entityType && stepNo) {
      const { steps } = CreateEntityStrategyMap[entityType]
      steps[stepNo]?.url && history.push(steps[stepNo].url)
    }
    // eslint-disable-next-line
  }, [stepNo, entityType])

  return (
    <CreateEntityLayout title={title} subtitle={subtitle} breadCrumbs={breadCrumbs}>
      <Route strict path={`/create/entity/protocol`} component={CreateProtocol} />
      <Route strict path={`/create/entity/asset`} component={CreateAsset} />
      <Route strict path={`/create/entity/investment`} component={CreateInvestment} />
      <Route strict path={`/create/entity/claim`} component={CreateClaim} />
      <Route strict path={`/create/entity/dao`} component={CreateDAO} />
      <Route strict path={`/create/entity/project`} component={CreateProject} />
      <Route strict path={`/create/entity/oracle`} component={CreateOracle} />
      <Route strict path={`/create/entity/deed/:entityId/:coreAddress`} component={CreateProposal} />
      <Route exact path='/create/entity'>
        <Redirect to={`/create/entity/protocol`} />
      </Route>
    </CreateEntityLayout>
  )
}

export default CreateEntity
