import React, { Dispatch } from 'react'
import { connect } from 'react-redux'
import CreateEntityBase, {
  CreateEntityBaseProps,
} from '../CreateEntity/components/CreateEntityBase/CreateEntityBase'
import { RootState } from 'common/redux/types'
import * as createEntitySelectors from '../CreateEntity/CreateEntity.selectors'
import { goToStep } from '../CreateEntity/CreateEntity.actions'

interface Props extends CreateEntityBaseProps {}

class CreateEntityClaims extends CreateEntityBase<Props> {
  onSubmitted = (): void => {
    const { entityType, step } = this.props

    this.props.handleGoToStep(this.getNextStep(entityType, step))
  }

  onBack = (): void => {
    const { entityType, step } = this.props

    this.props.handleGoToStep(this.getPreviousStep(entityType, step))
  }

  render() {
    return <> {this.renderButtonGroup([], true)}</>
  }
}

const mapStateToProps = (state: RootState): any => ({
  validated: true,
  validationComplete: true,
  step: createEntitySelectors.selectStep(state),
  entityType: createEntitySelectors.selectEntityType(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleGoToStep: (step: number): void => dispatch(goToStep(step)),
})

export const CreateEntityClaimsConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateEntityClaims)
