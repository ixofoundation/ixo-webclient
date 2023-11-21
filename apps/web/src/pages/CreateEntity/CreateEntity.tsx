import React, { useEffect } from 'react'
import { Navigate, Route, useLocation, useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const { stepNo, breadCrumbs, title, subtitle } = useCreateEntityState()
  const { getStrategyAndStepByPath } = useCreateEntityStrategy()
  const { strategy } = getStrategyAndStepByPath(pathname)
  const entityType = strategy?.entityType

  useEffect(() => {
    if (entityType && stepNo) {
      const { steps } = CreateEntityStrategyMap[entityType]
      steps[stepNo]?.url && navigate(steps[stepNo].url)
    }
    // eslint-disable-next-line
  }, [stepNo, entityType])

  return (
    <CreateEntityLayout title={title} subtitle={subtitle} breadCrumbs={breadCrumbs}>
      <Route path={`/create/entity/protocol`} element={<CreateProtocol/>} />
      <Route path={`/create/entity/asset`} element={<CreateAsset/>} />
      <Route path={`/create/entity/investment`} element={<CreateInvestment/>} />
      <Route path={`/create/entity/claim`} element={<CreateClaim/>} />
      <Route path={`/create/entity/dao`} element={<CreateDAO/>} />
      <Route path={`/create/entity/project`} element={<CreateProject/>} />
      <Route path={`/create/entity/oracle`} element={<CreateOracle/>} />
      <Route path={`/create/entity/deed/:entityId/:coreAddress`} element={<CreateProposal/>} />
      <Route path='/create/entity'>
        <Navigate to={`/create/entity/protocol`} />
      </Route>
    </CreateEntityLayout>
  )
}

export default CreateEntity
