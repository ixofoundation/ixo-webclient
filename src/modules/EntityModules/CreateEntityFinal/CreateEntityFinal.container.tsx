import React, { Dispatch } from 'react'
import { connect } from 'react-redux'
import { RootState } from 'common/redux/types'
import StatusMessage, {
  MessageType,
} from 'common/components/StatusMessage/StatusMessage'
import { createEntity } from '../CreateEntity/CreateEntity.actions'
import * as createEntitySelectors from '../CreateEntity/CreateEntity.selectors'
import { EntityType } from '../Entities/types'
import { NavLink } from 'react-router-dom'
import { Container } from './CreateEntityFinal.styles'
// import {entityTypeMap} from '../Entities/strategy-map'

interface Props {
  entityType: EntityType
  handleCreateEntity: () => void
}

class CreateEntityFinal extends React.Component<Props> {
  render(): JSX.Element {
    return (
      <Container>
        <StatusMessage
          message="Creating Project..."
          messageType={MessageType.Sending}
          repeatPulse={true}
        >
          <NavLink className="close-button" to="/">
            View in Explorer
          </NavLink>
        </StatusMessage>
      </Container>
    )
  }
}

const mapStateToProps = (state: RootState): any => ({
  entityType: createEntitySelectors.selectEntityType(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleCreateEntity: (): void => dispatch(createEntity()),
})

export const CreateEntityFinalConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateEntityFinal)
