import React, { Dispatch } from 'react'
import { RootState } from 'src/common/redux/types'
import * as createEntityAdvancedSelectors from './CreateEntityAdvanced.selectors'
import {
  LinkedEntity,
  Payment,
  Stake,
  Node,
  Fund,
  Key,
  Service,
  DataResource,
} from './types'
import { connect } from 'react-redux'
import {
  addLinkedEntity,
  removeLinkedEntity,
  updateLinkedEntity,
  addPayment,
  removePayment,
  updatePayment,
  addStake,
  removeStake,
  updateStake,
  addNode,
  removeNode,
  updateNode,
  addFund,
  removeFund,
  updateFund,
  addKey,
  removeKey,
  updateKey,
  addService,
  removeService,
  updateService,
  addDataResource,
  removeDataResource,
  updateDataResource,
} from './CreateEntityAdvanced.actions'
import { FormData } from 'src/common/components/JsonForm/types'
import FormCardWrapper from 'src/common/components/Wrappers/FormCardWrapper/FormCardWrapper'
import LinkedEntityCard from './components/LinkedEntityCard/LinkedEntityCard'
import PaymentCard from './components/PaymentCard/PaymentCard'
import StakeCard from './components/StakeCard/StakeCard'
import NodeCard from './components/NodeCard/NodeCard'
import FundCard from './components/FundCard/FundCard'
import KeyCard from './components/KeyCard/KeyCard'
import ServiceCard from './components/ServiceCard/ServiceCard'
import DataResourceCard from './components/DataResourceCard/DataResourceCard'

interface Props {
  linkedEntities: LinkedEntity[]
  payments: Payment[]
  staking: Stake[]
  nodes: Node[]
  funding: Fund[]
  keys: Key[]
  services: Service[]
  dataResources: DataResource[]
  handleAddLinkedEntity: () => void
  handleRemoveLinkedEntity: (id: string) => void
  handleUpdateLinkedEntity: (id: string, formData: FormData) => void
  handleAddPayment: () => void
  handleRemovePayment: (id: string) => void
  handleUpdatePayment: (id: string, formData: FormData) => void
  handleAddStake: () => void
  handleRemoveStake: (id: string) => void
  handleUpdateStake: (id: string, formData: FormData) => void
  handleAddNode: () => void
  handleRemoveNode: (id: string) => void
  handleUpdateNode: (id: string, formData: FormData) => void
  handleAddFund: () => void
  handleRemoveFund: (id: string) => void
  handleUpdateFund: (id: string, formData: FormData) => void
  handleAddKey: () => void
  handleRemoveKey: (id: string) => void
  handleUpdateKey: (id: string, formData: FormData) => void
  handleAddService: () => void
  handleRemoveService: (id: string) => void
  handleUpdateService: (id: string, formData: FormData) => void
  handleAddDataResource: () => void
  handleRemoveDataResource: (id: string) => void
  handleUpdateDataResource: (id: string, formData: FormData) => void
}

class CreateEntityAdvanced extends React.Component<Props> {
  renderLinkedEntities = (): JSX.Element => {
    const {
      linkedEntities,
      handleUpdateLinkedEntity,
      handleAddLinkedEntity,
      handleRemoveLinkedEntity,
    } = this.props

    return (
      <FormCardWrapper
        showAddSection={true}
        title="Linked Entities"
        onAddSection={handleAddLinkedEntity}
        addSectionText="Add Linked Entity"
      >
        {linkedEntities.map(linkedEntity => {
          const { id, entityId, type } = linkedEntity

          return (
            <LinkedEntityCard
              key={id}
              id={id}
              entityId={entityId}
              type={type}
              handleUpdate={handleUpdateLinkedEntity}
              handleRemoveSection={handleRemoveLinkedEntity}
            />
          )
        })}
      </FormCardWrapper>
    )
  }

  renderPayments = (): JSX.Element => {
    const {
      payments,
      handleUpdatePayment,
      handleAddPayment,
      handleRemovePayment,
    } = this.props
    return (
      <FormCardWrapper
        showAddSection={true}
        title="Payments"
        onAddSection={handleAddPayment}
        addSectionText="Add Payment"
      >
        {payments.map(payment => {
          const {
            id,
            type,
            paymentId,
            denomination,
            maxAmount,
            maxUnits,
          } = payment

          return (
            <PaymentCard
              key={id}
              id={id}
              type={type}
              paymentId={paymentId}
              denomination={denomination}
              maxAmount={maxAmount}
              maxUnits={maxUnits}
              handleUpdate={handleUpdatePayment}
              handleRemoveSection={handleRemovePayment}
            />
          )
        })}
      </FormCardWrapper>
    )
  }

  renderStaking = (): JSX.Element => {
    const {
      staking,
      handleUpdateStake,
      handleAddStake,
      handleRemoveStake,
    } = this.props

    return (
      <FormCardWrapper
        showAddSection={true}
        title="Staking"
        addSectionText="Add Stake"
        onAddSection={handleAddStake}
      >
        {staking.map(stake => {
          const {
            id,
            type,
            stakeId,
            denomination,
            depositAddress,
            minStake,
            slashingCondition,
            slashFactor,
            maxSlashAmount,
            unbondingPeriod,
          } = stake

          return (
            <StakeCard
              key={id}
              id={id}
              type={type}
              stakeId={stakeId}
              denomination={denomination}
              depositAddress={depositAddress}
              minStake={minStake}
              slashingCondition={slashingCondition}
              slashFactor={slashFactor}
              maxSlashAmount={maxSlashAmount}
              unbondingPeriod={unbondingPeriod}
              handleUpdate={handleUpdateStake}
              handleRemoveSection={handleRemoveStake}
            />
          )
        })}
      </FormCardWrapper>
    )
  }

  renderNodes = (): JSX.Element => {
    const {
      nodes,
      handleUpdateNode,
      handleAddNode,
      handleRemoveNode,
    } = this.props

    return (
      <FormCardWrapper
        showAddSection={true}
        title="Nodes"
        addSectionText="Add Node"
        onAddSection={handleAddNode}
      >
        {nodes.map(stake => {
          const { id, type, nodeId } = stake

          return (
            <NodeCard
              key={id}
              id={id}
              type={type}
              nodeId={nodeId}
              handleUpdate={handleUpdateNode}
              handleRemoveSection={handleRemoveNode}
            />
          )
        })}
      </FormCardWrapper>
    )
  }

  renderFunding = (): JSX.Element => {
    const {
      funding,
      handleUpdateFund,
      handleAddFund,
      handleRemoveFund,
    } = this.props

    return (
      <FormCardWrapper
        showAddSection={true}
        title="Funding"
        addSectionText="Add a Funding Source"
        onAddSection={handleAddFund}
      >
        {funding.map(fund => {
          const { id, source, fundId } = fund

          return (
            <FundCard
              key={id}
              id={id}
              source={source}
              fundId={fundId}
              handleUpdate={handleUpdateFund}
              handleRemoveSection={handleRemoveFund}
            />
          )
        })}
      </FormCardWrapper>
    )
  }

  renderKeys = (): JSX.Element => {
    const { keys, handleUpdateKey, handleAddKey, handleRemoveKey } = this.props

    return (
      <FormCardWrapper
        showAddSection={true}
        title="Keys"
        onAddSection={handleAddKey}
        addSectionText="Add Key"
      >
        {keys.map(key => {
          const {
            id,
            purpose,
            type,
            denomination,
            controllerId,
            dateCreated,
            dateUpdated,
          } = key

          return (
            <KeyCard
              key={id}
              id={id}
              purpose={purpose}
              type={type}
              denomination={denomination}
              controllerId={controllerId}
              dateCreated={dateCreated}
              dateUpdated={dateUpdated}
              handleUpdate={handleUpdateKey}
              handleRemoveSection={handleRemoveKey}
            />
          )
        })}
      </FormCardWrapper>
    )
  }

  renderServices = (): JSX.Element => {
    const {
      services,
      handleUpdateService,
      handleAddService,
      handleRemoveService,
    } = this.props

    return (
      <FormCardWrapper
        showAddSection={true}
        title="Services"
        onAddSection={handleAddService}
        addSectionText="Add Service"
      >
        {services.map(service => {
          const {
            id,
            type,
            shortDescription,
            endpoint,
            publicKey,
            otherParams,
          } = service

          return (
            <ServiceCard
              key={id}
              id={id}
              type={type}
              shortDescription={shortDescription}
              endpoint={endpoint}
              publicKey={publicKey}
              otherParams={otherParams}
              handleUpdate={handleUpdateService}
              handleRemoveSection={handleRemoveService}
            />
          )
        })}
      </FormCardWrapper>
    )
  }

  renderDataResources = (): JSX.Element => {
    const {
      dataResources,
      handleUpdateDataResource,
      handleAddDataResource,
      handleRemoveDataResource,
    } = this.props

    return (
      <FormCardWrapper
        showAddSection={true}
        title="Data"
        addSectionText="Add a Data Resource"
        onAddSection={handleAddDataResource}
      >
        {dataResources.map(dataResource => {
          const {
            id,
            type,
            dataId,
            resourceLocator,
            otherParams,
          } = dataResource

          return (
            <DataResourceCard
              key={id}
              id={id}
              type={type}
              dataId={dataId}
              resourceLocator={resourceLocator}
              otherParams={otherParams}
              handleUpdate={handleUpdateDataResource}
              handleRemoveSection={handleRemoveDataResource}
            />
          )
        })}
      </FormCardWrapper>
    )
  }

  render(): JSX.Element {
    return (
      <>
        {this.renderLinkedEntities()}
        {this.renderPayments()}
        {this.renderStaking()}
        {this.renderNodes()}
        {this.renderFunding()}
        {this.renderKeys()}
        {this.renderServices()}
        {this.renderDataResources()}
      </>
    )
  }
}

const mapStateToProps = (state: RootState): any => ({
  linkedEntities: createEntityAdvancedSelectors.selectLinkedEntities(state),
  payments: createEntityAdvancedSelectors.selectPayments(state),
  staking: createEntityAdvancedSelectors.selectStaking(state),
  nodes: createEntityAdvancedSelectors.selectNodes(state),
  funding: createEntityAdvancedSelectors.selectFunding(state),
  keys: createEntityAdvancedSelectors.selectKeys(state),
  services: createEntityAdvancedSelectors.selectServices(state),
  dataResources: createEntityAdvancedSelectors.selectDataResources(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleAddLinkedEntity: (): void => dispatch(addLinkedEntity()),
  handleRemoveLinkedEntity: (id: string): void =>
    dispatch(removeLinkedEntity(id)),
  handleUpdateLinkedEntity: (id: string, formData: FormData): void =>
    dispatch(updateLinkedEntity(id, formData)),
  handleAddPayment: (): void => dispatch(addPayment()),
  handleRemovePayment: (id: string): void => dispatch(removePayment(id)),
  handleUpdatePayment: (id: string, formData: FormData): void =>
    dispatch(updatePayment(id, formData)),
  handleAddStake: (): void => dispatch(addStake()),
  handleRemoveStake: (id: string): void => dispatch(removeStake(id)),
  handleUpdateStake: (id: string, formData: FormData): void =>
    dispatch(updateStake(id, formData)),
  handleAddNode: (): void => dispatch(addNode()),
  handleRemoveNode: (id: string): void => dispatch(removeNode(id)),
  handleUpdateNode: (id: string, formData: FormData): void =>
    dispatch(updateNode(id, formData)),
  handleAddFund: (): void => dispatch(addFund()),
  handleRemoveFund: (id: string): void => dispatch(removeFund(id)),
  handleUpdateFund: (id: string, formData: FormData): void =>
    dispatch(updateFund(id, formData)),
  handleAddKey: (): void => dispatch(addKey()),
  handleRemoveKey: (id: string): void => dispatch(removeKey(id)),
  handleUpdateKey: (id: string, formData: FormData): void =>
    dispatch(updateKey(id, formData)),
  handleAddService: (): void => dispatch(addService()),
  handleRemoveService: (id: string): void => dispatch(removeService(id)),
  handleUpdateService: (id: string, formData: FormData): void =>
    dispatch(updateService(id, formData)),
  handleAddDataResource: (): void => dispatch(addDataResource()),
  handleRemoveDataResource: (id: string): void =>
    dispatch(removeDataResource(id)),
  handleUpdateDataResource: (id: string, formData: FormData): void =>
    dispatch(updateDataResource(id, formData)),
})

export const CreateEntityAdvancedConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateEntityAdvanced)
