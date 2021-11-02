import React, { Dispatch } from 'react'
import { connect, useSelector } from 'react-redux'
import { RootState } from 'common/redux/types'
import StatusMessage, {
  MessageType,
} from 'common/components/StatusMessage/StatusMessage'
import { createEntity } from '../CreateEntity.actions'
import * as createEntitySelectors from '../CreateEntity.selectors'
import { EntityType } from '../../types'
import { NavLink } from 'react-router-dom'
import { Container } from './CreateEntityFinal.styles'
import { selectEntityConfig } from 'modules/Entities/EntitiesExplorer/EntitiesExplorer.selectors'

interface Props {
  entityType: EntityType
  creating: boolean
  created: boolean
  error: boolean
  handleCreateEntity: () => void
}

const CreateEntityFinal: React.FunctionComponent<Props> = ({
  creating,
  created,
  error,
  entityType,
  handleCreateEntity,
}) => {
  const entityTypeMap = useSelector(selectEntityConfig)
  const entityTitle = entityTypeMap[entityType].title

  return (
    <Container>
      {creating && (
        <StatusMessage
          message={`Creating ${entityTitle}...`}
          messageType={MessageType.Sending}
          repeatPulse={true}
        />
      )}
      {created && (
        <StatusMessage
          message={`Successfully Created ${entityTitle}`}
          messageType={MessageType.Success}
          repeatPulse={false}
        >
          <NavLink
            className="close-button"
            to={`/entities/select?type=${entityType}&amp;sector=all`}
          >
            View in Explorer
          </NavLink>
        </StatusMessage>
      )}
      {error && (
        <StatusMessage
          message="Oops, an error occurred"
          messageType={MessageType.Error}
          repeatPulse={false}
        >
          <div className="error">{error}</div>
          <button onClick={handleCreateEntity}>Try Again</button>
        </StatusMessage>
      )}
    </Container>
  )
}

const mapStateToProps = (state: RootState): any => ({
  entityType: createEntitySelectors.selectEntityType(state),
  creating: createEntitySelectors.selectCreating(state),
  created: createEntitySelectors.selectCreated(state),
  error: createEntitySelectors.selectError(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleCreateEntity: (): void => dispatch(createEntity()),
})

export const CreateEntityFinalConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateEntityFinal)
