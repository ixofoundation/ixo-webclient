import React, { useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom'
import CreateAsset from './CreateAsset/CreateAsset'
import CreateInvestment from './CreateInvestment/CreateInvestment'
import CreateEntityLayout from './CreateEntityLayout/CreateEntityLayout'
import CreateClaim from './CreateClaim/CreateClaim'
import CreateDAO from './CreateDAO/CreateDAO'
import CreateProject from './CreateProject/CreateProject'
import CreateOracle from './CreateOracle/CreateOracle'
import CreateProposal from './CreateProposal/CreateProposal'
import { useAccount } from 'hooks/account'
import CreateProtocol from './CreateProtocol/CreateProtocol'

const CreateEntity: React.FC = (): JSX.Element => {
  const { address, updateChooseWalletOpen } = useAccount()

  useEffect(() => {
    if (!address) {
      updateChooseWalletOpen(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address])

  return (
    <CreateEntityLayout>
      <Route strict path={`/create/entity/protocol`} component={CreateProtocol} />
      <Route strict path={`/create/entity/asset`} component={CreateAsset} />
      <Route strict path={`/create/entity/investment`} component={CreateInvestment} />
      <Route strict path={`/create/entity/claim`} component={CreateClaim} />
      <Route strict path={`/create/entity/dao`} component={CreateDAO} />
      <Route strict path={`/create/entity/project`} component={CreateProject} />
      <Route strict path={`/create/entity/oracle`} component={CreateOracle} />
      <Route strict path={`/create/entity/:entityId/proposal/:coreAddress`} component={CreateProposal} />
      <Route exact path='/create/entity'>
        <Redirect to={`/create/entity/protocol`} />
      </Route>
    </CreateEntityLayout>
  )
}

export default CreateEntity
