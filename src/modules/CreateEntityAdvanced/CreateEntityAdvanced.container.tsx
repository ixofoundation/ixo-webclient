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
  updateLinkedEntity,
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
  updateKey,
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

interface Props {
  linkedEntity: LinkedEntity
  payment: Payment
  staking: Stake[]
  nodes: Node[]
  funding: Fund[]
  key: Key
  service: Service
  dataResources: DataResource[]
  handleUpdateLinkedEntity: (formData: FormData) => void
  handleUpdatePayment: (formData: FormData) => void
  handleAddStake: () => void
  handleRemoveStake: (id: string) => void
  handleUpdateStake: (id: string, formData: FormData) => void
  handleAddNode: () => void
  handleRemoveNode: (id: string) => void
  handleUpdateNode: (id: string, formData: FormData) => void
  handleAddFund: () => void
  handleRemoveFund: (id: string) => void
  handleUpdateFund: (id: string, formData: FormData) => void
  handleUpdateKey: (formData: FormData) => void
  handleUpdateService: (formData: FormData) => void
  handleAddDataResource: () => void
  handleRemoveDataResource: (id: string) => void
  handleUpdateDataResource: (id: string, formData: FormData) => void
}

class CreateEntityAdvanced extends React.Component<Props> {
  renderLinkedEntity = (): JSX.Element => {
    const { linkedEntity, handleUpdateLinkedEntity } = this.props

    const { entityId, type } = linkedEntity

    return (
      <FormCardWrapper showAddSection={false} title="Linked Entities">
        <LinkedEntityCard
          entityId={entityId}
          type={type}
          handleUpdate={handleUpdateLinkedEntity}
        />
      </FormCardWrapper>
    )
  }

  renderPayment = (): JSX.Element => {
    const { payment, handleUpdatePayment } = this.props

    const { type, paymentId, denomination, maxAmount, maxUnits } = payment

    return (
      <FormCardWrapper showAddSection={false} title="Payments">
        <PaymentCard
          type={type}
          paymentId={paymentId}
          denomination={denomination}
          maxAmount={maxAmount}
          maxUnits={maxUnits}
          handleUpdate={handleUpdatePayment}
        />
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

  render(): JSX.Element {
    return (
      <>
        {this.renderLinkedEntity()}
        {this.renderPayment()}
        {this.renderStaking()}
      </>
    )
  }
}

const mapStateToProps = (state: RootState): any => ({
  linkedEntity: createEntityAdvancedSelectors.selectLinkedEntity(state),
  payment: createEntityAdvancedSelectors.selectPayment(state),
  staking: createEntityAdvancedSelectors.selectStaking(state),
  nodes: createEntityAdvancedSelectors.selectNodes(state),
  funding: createEntityAdvancedSelectors.selectFunding(state),
  key: createEntityAdvancedSelectors.selectKey(state),
  service: createEntityAdvancedSelectors.selectService(state),
  dataResources: createEntityAdvancedSelectors.selectDataResources(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleUpdateLinkedEntity: (formData: FormData): void =>
    dispatch(updateLinkedEntity(formData)),
  handleUpdatePayment: (formData: FormData): void =>
    dispatch(updatePayment(formData)),
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
  handleUpdateKey: (formData: FormData): void => dispatch(updateKey(formData)),
  handleUpdateService: (formData: FormData): void =>
    dispatch(updateService(formData)),
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
