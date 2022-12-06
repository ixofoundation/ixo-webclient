import React, { Dispatch } from 'react'
import { RootState } from 'redux/store'
import EditEntityBase, { EditEntityBaseProps } from '../Components/EditEntityBase/EditEntityBase'
import * as editEntityAdvancedSelectors from '../../../../../redux/editEntityAdvanced/editEntityAdvanced.selectors'
import * as editEntitySelectors from '../../../../../redux/editEntity/editEntity.selectors'
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
  addLiquidity,
  removeLiquidity,
  updateLiquidity,
  addKey,
  removeKey,
  updateKey,
  addService,
  removeService,
  updateService,
  addDataResource,
  removeDataResource,
  updateDataResource,
  addLinkedResourcesSection,
  removeLinkedResourcesSection,
  updateLinkedResources,
  validated,
  validationError,
} from '../../../../../redux/editEntityAdvanced/editEntityAdvanced.actions'
import { goToStep, editEntity } from '../../../../../redux/editEntity/editEntity.actions'
import { FormData } from 'components/JsonForm/types'
import FormCardWrapper from 'components/Wrappers/FormCardWrapper/FormCardWrapper'
import LinkedEntityCard from '../../../CreateEntity/CreateEntityAdvanced/Components/LinkedEntityCard/LinkedEntityCard'
import PaymentCard from '../../../CreateEntity/CreateEntityAdvanced/Components/PaymentCard/PaymentCard'
// import StakeCard from '../../../CreateEntity/CreateEntityAdvanced/components/StakeCard/StakeCard'
import NodeCard from '../../../CreateEntity/CreateEntityAdvanced/Components/NodeCard/NodeCard'
import LiquidityCard from '../../../CreateEntity/CreateEntityAdvanced/Components/LiquidityCard/LiquidityCard'
// import KeyCard from '../../../CreateEntity/CreateEntityAdvanced/components/KeyCard/KeyCard'
import ServiceCard from '../../../CreateEntity/CreateEntityAdvanced/Components/ServiceCard/ServiceCard'
// import DataResourceCard from './components/DataResourceCard/DataResourceCard'
import LinkedResourcesContentCard from '../../../CreateEntity/CreateEntityAdvanced/Components/LinkedResourcesContentCard/LinkedResourcesContentCard'

import {
  Node,
  LinkedEntity,
  Liquidity,
  Payment,
  Key,
  Service,
  DataResource,
  Stake,
  LinkedResourceContent,
} from 'redux/createEntityAdvanced/createEntityAdvanced.types'

interface Props extends EditEntityBaseProps {
  linkedEntities: LinkedEntity[]
  payments: Payment[]
  staking: Stake[]
  nodes: Node[]
  liquidity: Liquidity[]
  keys: Key[]
  services: Service[]
  dataResources: DataResource[]
  linkedResources: LinkedResourceContent[]
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
  handleAddLiquidity: () => void
  handleRemoveLiquidity: (id: string) => void
  handleUpdateLiquidity: (id: string, formData: FormData) => void
  handleAddKey: () => void
  handleRemoveKey: (id: string) => void
  handleUpdateKey: (id: string, formData: FormData) => void
  handleAddService: () => void
  handleRemoveService: (id: string) => void
  handleUpdateService: (id: string, formData: FormData) => void
  handleAddDataResource: () => void
  handleRemoveDataResource: (id: string) => void
  handleUpdateDataResource: (id: string, formData: FormData) => void
  handleAddLinkedResourcesSection: () => void
  handleRemoveLinkedResourcesSection: (id: string) => void
  handleUpdateLinkedResources: (id: string, formData: FormData) => void
  handleEditEntity: () => void
}

class EditEntityAdvanced extends EditEntityBase<Props> {
  renderLinkedEntities = (): JSX.Element => {
    const { linkedEntities, handleUpdateLinkedEntity, handleAddLinkedEntity, handleRemoveLinkedEntity } = this.props

    return (
      <FormCardWrapper
        showAddSection={true}
        title='Linked Entities'
        onAddSection={handleAddLinkedEntity}
        addSectionText='Add Linked Entity'
        keyword='linkedEntities'
      >
        {linkedEntities.map((linkedEntity) => {
          this.cardRefs[linkedEntity.id] = React.createRef()

          const { id, entityId, type } = linkedEntity

          return (
            <LinkedEntityCard
              ref={this.cardRefs[linkedEntity.id]}
              key={id}
              entityId={entityId}
              type={type}
              handleUpdateContent={(formData): void => handleUpdateLinkedEntity(id, formData)}
              handleRemoveSection={(): void => handleRemoveLinkedEntity(id)}
              handleSubmitted={(): void => this.props.handleValidated(linkedEntity.id)}
              handleError={(errors): void => this.props.handleValidationError(linkedEntity.id, errors)}
            />
          )
        })}
      </FormCardWrapper>
    )
  }

  renderPayments = (): JSX.Element => {
    const { payments, handleUpdatePayment, handleAddPayment, handleRemovePayment } = this.props
    return (
      <FormCardWrapper
        showAddSection={true}
        title='Payments'
        onAddSection={handleAddPayment}
        addSectionText='Add Payment'
        keyword='fees'
      >
        {payments.map((payment) => {
          this.cardRefs[payment.id] = React.createRef()

          const { id, type, paymentId } = payment

          return (
            <PaymentCard
              ref={this.cardRefs[payment.id]}
              key={id}
              type={type}
              paymentId={paymentId}
              handleUpdateContent={(formData): void => handleUpdatePayment(id, formData)}
              handleRemoveSection={(): void => handleRemovePayment(id)}
              handleSubmitted={(): void => this.props.handleValidated(payment.id)}
              handleError={(errors): void => this.props.handleValidationError(payment.id, errors)}
            />
          )
        })}
      </FormCardWrapper>
    )
  }

  // renderStaking = (): JSX.Element => {
  //   const {
  //     staking,
  //     handleUpdateStake,
  //     handleAddStake,
  //     handleRemoveStake,
  //   } = this.props

  //   return (
  //     <FormCardWrapper
  //       showAddSection={true}
  //       title="Staking"
  //       addSectionText="Add Stake"
  //       onAddSection={handleAddStake}
  //       keyword="stake"
  //     >
  //       {staking.map((stake) => {
  //         this.cardRefs[stake.id] = React.createRef()

  //         const {
  //           id,
  //           type,
  //           stakeId,
  //           denom,
  //           stakeAddress,
  //           minStake,
  //           slashCondition,
  //           slashFactor,
  //           slashAmount,
  //           unbondPeriod,
  //         } = stake

  //         return (
  //           <StakeCard
  //             ref={this.cardRefs[stake.id]}
  //             key={id}
  //             type={type}
  //             stakeId={stakeId}
  //             denom={denom}
  //             stakeAddress={stakeAddress}
  //             minStake={minStake}
  //             slashCondition={slashCondition}
  //             slashFactor={slashFactor}
  //             slashAmount={slashAmount}
  //             unbondPeriod={unbondPeriod}
  //             handleUpdateContent={(formData): void =>
  //               handleUpdateStake(id, formData)
  //             }
  //             handleRemoveSection={(): void => handleRemoveStake(id)}
  //             handleSubmitted={(): void => this.props.handleValidated(stake.id)}
  //             handleError={(errors): void =>
  //               this.props.handleValidationError(stake.id, errors)
  //             }
  //           />
  //         )
  //       })}
  //     </FormCardWrapper>
  //   )
  // }

  renderNodes = (): JSX.Element => {
    const { nodes, handleUpdateNode, handleAddNode, handleRemoveNode } = this.props

    return (
      <FormCardWrapper
        showAddSection={true}
        title='Nodes'
        addSectionText='Add Node'
        onAddSection={handleAddNode}
        keyword='nodes'
      >
        {nodes.map((stake) => {
          this.cardRefs[stake.id] = React.createRef()

          const { id, type, nodeId, serviceEndpoint } = stake

          return (
            <NodeCard
              ref={this.cardRefs[stake.id]}
              key={id}
              type={type}
              nodeId={nodeId}
              removable={nodes.length > 1}
              serviceEndpoint={serviceEndpoint!}
              handleUpdateContent={(formData): void => handleUpdateNode(id, formData)}
              handleRemoveSection={(): void => handleRemoveNode(id)}
              handleSubmitted={(): void => this.props.handleValidated(stake.id)}
              handleError={(errors): void => this.props.handleValidationError(stake.id, errors)}
            />
          )
        })}
      </FormCardWrapper>
    )
  }

  renderLiquidity = (): JSX.Element => {
    const { liquidity, handleUpdateLiquidity, handleAddLiquidity, handleRemoveLiquidity } = this.props

    return (
      <FormCardWrapper
        showAddSection={true}
        title='Liquidity'
        addSectionText='Add a Liquidity Source'
        onAddSection={handleAddLiquidity}
        keyword='liquidity'
      >
        {liquidity.map((elem) => {
          this.cardRefs[elem.id] = React.createRef()

          const { id, source, liquidityId } = elem

          return (
            <LiquidityCard
              ref={this.cardRefs[id]}
              key={id}
              source={source}
              liquidityId={liquidityId}
              handleUpdateContent={(formData): void => handleUpdateLiquidity(id, formData)}
              handleRemoveSection={(): void => handleRemoveLiquidity(id)}
              handleSubmitted={(): void => this.props.handleValidated(id)}
              handleError={(errors): void => this.props.handleValidationError(id, errors)}
            />
          )
        })}
      </FormCardWrapper>
    )
  }

  // renderKeys = (): JSX.Element => {
  //   const { keys, handleUpdateKey, handleAddKey, handleRemoveKey } = this.props

  //   return (
  //     <FormCardWrapper
  //       showAddSection={true}
  //       title="Keys"
  //       onAddSection={handleAddKey}
  //       addSectionText="Add Key"
  //       keyword="keys"
  //     >
  //       {keys.map((key) => {
  //         this.cardRefs[key.id] = React.createRef()

  //         const {
  //           id,
  //           purpose,
  //           type,
  //           keyValue,
  //           signature,
  //           controller,
  //           dateCreated,
  //           dateUpdated,
  //         } = key

  //         return (
  //           <KeyCard
  //             ref={this.cardRefs[key.id]}
  //             key={id}
  //             purpose={purpose}
  //             type={type}
  //             keyValue={keyValue}
  //             signature={signature}
  //             controller={controller}
  //             dateCreated={dateCreated}
  //             dateUpdated={dateUpdated}
  //             handleUpdateContent={(formData): void =>
  //               handleUpdateKey(id, formData)
  //             }
  //             handleRemoveSection={(): void => handleRemoveKey(id)}
  //             handleSubmitted={(): void => this.props.handleValidated(key.id)}
  //             handleError={(errors): void =>
  //               this.props.handleValidationError(key.id, errors)
  //             }
  //           />
  //         )
  //       })}
  //     </FormCardWrapper>
  //   )
  // }

  renderServices = (): JSX.Element => {
    const { services, handleUpdateService, handleAddService, handleRemoveService } = this.props

    return (
      <FormCardWrapper
        showAddSection={true}
        title='Services'
        onAddSection={handleAddService}
        addSectionText='Add Service'
        keyword='service'
      >
        {services.map((service) => {
          this.cardRefs[service.id] = React.createRef()

          const { id, type, shortDescription, serviceEndpoint, publicKey, properties, serviceId } = service

          return (
            <ServiceCard
              ref={this.cardRefs[service.id]}
              key={id}
              type={type}
              serviceId={serviceId}
              shortDescription={shortDescription}
              serviceEndpoint={serviceEndpoint}
              publicKey={publicKey}
              properties={properties}
              handleUpdateContent={(formData): void => handleUpdateService(id, formData)}
              handleRemoveSection={(): void => handleRemoveService(id)}
              handleSubmitted={(): void => this.props.handleValidated(service.id)}
              handleError={(errors): void => this.props.handleValidationError(service.id, errors)}
            />
          )
        })}
      </FormCardWrapper>
    )
  }

  // renderDataResources = (): JSX.Element => {
  //   const {
  //     dataResources,
  //     handleUpdateDataResource,
  //     handleAddDataResource,
  //     handleRemoveDataResource,
  //   } = this.props

  //   return (
  //     <FormCardWrapper
  //       showAddSection={true}
  //       title="Data"
  //       addSectionText="Add a Data Resource"
  //       onAddSection={handleAddDataResource}
  //       keyword="data"
  //     >
  //       {dataResources.map((dataResource) => {
  //         this.cardRefs[dataResource.id] = React.createRef()

  //         const { id, type, dataId, serviceEndpoint, properties } = dataResource

  //         return (
  //           <DataResourceCard
  //             ref={this.cardRefs[dataResource.id]}
  //             key={id}
  //             type={type}
  //             dataId={dataId}
  //             serviceEndpoint={serviceEndpoint}
  //             properties={properties}
  //             handleUpdateContent={(formData): void =>
  //               handleUpdateDataResource(id, formData)
  //             }
  //             handleRemoveSection={(): void => handleRemoveDataResource(id)}
  //             handleSubmitted={(): void =>
  //               this.props.handleValidated(dataResource.id)
  //             }
  //             handleError={(errors): void =>
  //               this.props.handleValidationError(dataResource.id, errors)
  //             }
  //           />
  //         )
  //       })}
  //     </FormCardWrapper>
  //   )
  // }

  renderLinkedResourcesSections = (): JSX.Element => {
    const {
      linkedResources,
      handleAddLinkedResourcesSection,
      handleRemoveLinkedResourcesSection,
      handleUpdateLinkedResources,
      handleValidated,
      handleValidationError,
    } = this.props

    return (
      <FormCardWrapper
        title='Linked Resources'
        description={null!}
        showAddSection
        onAddSection={handleAddLinkedResourcesSection}
        keyword='linkedResource'
      >
        <div className='mt-4' />
        {linkedResources.map((section) => {
          this.cardRefs[section.id] = React.createRef()

          const { id } = section

          return (
            <LinkedResourcesContentCard
              ref={this.cardRefs[section.id]}
              key={id}
              {...section}
              uploadingResource={false}
              handleUpdateContent={(formData): void => {
                handleUpdateLinkedResources(id, formData)
              }}
              handleRemoveSection={(): void => handleRemoveLinkedResourcesSection(id)}
              handleSubmitted={(): void => handleValidated(section.id)}
              handleError={(errors): void => handleValidationError(section.id, errors)}
            />
          )
        })}
      </FormCardWrapper>
    )
  }

  onBack = (): void => {
    const { entityType, step, handleGoToStep } = this.props

    handleGoToStep(this.getPreviousStep(entityType, step))
  }

  onSubmitted = (): void => {
    this.props.handleEditEntity()
  }

  render(): JSX.Element {
    const {
      linkedEntities,
      payments,
      // staking,
      nodes,
      liquidity,
      // keys,
      services,
      // dataResources,
      linkedResources,
    } = this.props

    const identifiers: string[] = []

    linkedEntities.forEach((section) => {
      identifiers.push(section.id)
    })
    payments.forEach((section) => {
      identifiers.push(section.id)
    })
    // staking.forEach((section) => {
    //   identifiers.push(section.id)
    // })
    nodes.forEach((section) => {
      identifiers.push(section.id)
    })
    liquidity.forEach((section) => {
      identifiers.push(section.id)
    })
    // keys.forEach((section) => {
    //   identifiers.push(section.id)
    // })
    services.forEach((section) => {
      identifiers.push(section.id)
    })
    // dataResources.forEach((section) => {
    //   identifiers.push(section.id)
    // })
    linkedResources.forEach((section) => {
      identifiers.push(section.id)
    })

    return (
      <>
        {this.renderLinkedEntities()}
        {this.renderPayments()}
        {/* {this.renderStaking()} */}
        {this.renderNodes()}
        {this.renderLiquidity()}
        {/* {this.renderKeys()} */}
        {this.renderServices()}
        {/* {this.renderDataResources()} */}
        {this.renderLinkedResourcesSections()}
        {this.renderButtonGroup(identifiers, true)}
      </>
    )
  }
}

const mapStateToProps = (state: RootState): any => ({
  step: editEntitySelectors.selectStep(state),
  entityType: editEntitySelectors.selectEntityType(state),
  linkedEntities: editEntityAdvancedSelectors.selectLinkedEntities(state),
  payments: editEntityAdvancedSelectors.selectPayments(state),
  staking: editEntityAdvancedSelectors.selectStaking(state),
  nodes: editEntityAdvancedSelectors.selectNodes(state),
  liquidity: editEntityAdvancedSelectors.selectLiquidity(state),
  keys: editEntityAdvancedSelectors.selectKeys(state),
  services: editEntityAdvancedSelectors.selectServices(state),
  dataResources: editEntityAdvancedSelectors.selectDataResources(state),
  linkedResources: editEntityAdvancedSelectors.selectLinkedResources(state),
  validationComplete: editEntityAdvancedSelectors.selectValidationComplete(state),
  validated: editEntityAdvancedSelectors.selectValidated(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleAddLinkedEntity: (): void => dispatch(addLinkedEntity()),
  handleRemoveLinkedEntity: (id: string): void => dispatch(removeLinkedEntity(id)),
  handleUpdateLinkedEntity: (id: string, formData: FormData): void => dispatch(updateLinkedEntity(id, formData)),
  handleAddPayment: (): void => dispatch(addPayment()),
  handleRemovePayment: (id: string): void => dispatch(removePayment(id)),
  handleUpdatePayment: (id: string, formData: FormData): void => dispatch(updatePayment(id, formData)),
  handleAddStake: (): void => dispatch(addStake()),
  handleRemoveStake: (id: string): void => dispatch(removeStake(id)),
  handleUpdateStake: (id: string, formData: FormData): void => dispatch(updateStake(id, formData)),
  handleAddNode: (): void => dispatch(addNode()),
  handleRemoveNode: (id: string): void => dispatch(removeNode(id)),
  handleUpdateNode: (id: string, formData: FormData): void => dispatch(updateNode(id, formData)),
  handleAddLiquidity: (): void => dispatch(addLiquidity()),
  handleRemoveLiquidity: (id: string): void => dispatch(removeLiquidity(id)),
  handleUpdateLiquidity: (id: string, formData: FormData): void => dispatch(updateLiquidity(id, formData)),
  handleAddKey: (): void => dispatch(addKey()),
  handleRemoveKey: (id: string): void => dispatch(removeKey(id)),
  handleUpdateKey: (id: string, formData: FormData): void => dispatch(updateKey(id, formData)),
  handleAddService: (): void => dispatch(addService()),
  handleRemoveService: (id: string): void => dispatch(removeService(id)),
  handleUpdateService: (id: string, formData: FormData): void => dispatch(updateService(id, formData)),
  handleAddDataResource: (): void => dispatch(addDataResource()),
  handleRemoveDataResource: (id: string): void => dispatch(removeDataResource(id)),
  handleUpdateDataResource: (id: string, formData: FormData): void => dispatch(updateDataResource(id, formData)),
  handleAddLinkedResourcesSection: (): void => dispatch(addLinkedResourcesSection()),
  handleRemoveLinkedResourcesSection: (id: string): void => dispatch(removeLinkedResourcesSection(id)),
  handleUpdateLinkedResources: (id: string, formData: FormData): void => dispatch(updateLinkedResources(id, formData)),
  handleValidated: (identifier: string): void => dispatch(validated(identifier)),
  handleValidationError: (identifier: string, errors: string[]): void => dispatch(validationError(identifier, errors)),
  handleGoToStep: (step: number): void => dispatch(goToStep(step)),
  handleEditEntity: (): void => dispatch(editEntity()),
})

export const EditEntityAdvancedConnected = connect(mapStateToProps, mapDispatchToProps)(EditEntityAdvanced)
