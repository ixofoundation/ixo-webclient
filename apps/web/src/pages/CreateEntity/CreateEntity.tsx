import React, { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
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

const CreateEntityInit = () => {
  useEffect(() => {
    console.log("Create Entity init")
  },[])

  return <Navigate to="/protocol"/>
}

const CreateEntity: React.FC = (): JSX.Element => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const { stepNo, breadCrumbs, title, subtitle, entityType } = useCreateEntityState()
  const { getStrategyAndStepByPath } = useCreateEntityStrategy()
  const { strategy } = getStrategyAndStepByPath(pathname)

  console.log({entityType, stepNo})

  useEffect(() => {
    console.log("create entity running")
    if (entityType && stepNo) {
      console.log("running", {entityType, stepNo})
      const { steps } = CreateEntityStrategyMap[entityType]
      steps[stepNo]?.fullUrl && navigate(steps[stepNo]?.fullUrl ?? "/")
    }

  }, [stepNo, entityType, navigate])

  console.log("Create Entity")

  return (
    <CreateEntityLayout title={title} subtitle={subtitle} breadCrumbs={breadCrumbs}>
      <Routes>
        <Route index element={<CreateEntityInit/>} />
        <Route path={`/protocol`} element={<CreateProtocol />} />
        <Route path={`/asset`} element={<CreateAsset />} />
        <Route path={`/investment`} element={<CreateInvestment />} />
        <Route path={`/claim`} element={<CreateClaim />} />
        <Route path={`/dao/*`} element={<CreateDAO />} />
        <Route path={`/project`} element={<CreateProject />} />
        <Route path={`/oracle`} element={<CreateOracle />} />
        <Route path={`/deed/:entityId/:coreAddress`} element={<CreateProposal />} />
      </Routes>
    </CreateEntityLayout>
  )
}

export default CreateEntity
