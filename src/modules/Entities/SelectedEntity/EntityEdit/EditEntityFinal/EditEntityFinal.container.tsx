import React, { Dispatch } from 'react'
import { connect, useSelector } from 'react-redux'
import { RootState } from 'common/redux/types'
import StatusMessage, {
  MessageType,
} from 'common/components/StatusMessage/StatusMessage'
import { editEntity } from '../EditEntity.actions'
import * as editEntitySelectors from '../EditEntity.selectors'
import { EntityType } from '../../../types'
import { Container } from './EditEntityFinal.styles'
import { selectEntityConfig } from 'modules/Entities/EntitiesExplorer/EntitiesExplorer.selectors'

interface Props {
  entityType: EntityType
  creating: boolean
  edited: boolean
  error: boolean
  handleEditEntity: () => void
}

const EditEntityFinal: React.FunctionComponent<Props> = ({
  creating,
  edited,
  error,
  entityType,
  handleEditEntity,
}) => {
  const entityTypeMap = useSelector(selectEntityConfig)
  const entityTitle = entityTypeMap[entityType].title

  return (
    <Container>
      {creating && (
        <StatusMessage
          message={`Updating ${entityTitle}...`}
          messageType={MessageType.Sending}
          repeatPulse={true}
        />
      )}
      {edited && (
        <StatusMessage
          message={`Successfully Updated ${entityTitle}`}
          messageType={MessageType.Success}
          repeatPulse={false}
        >
          <a
            className="close-button"
            href={`/entities/select?type=${entityType}&amp;sector=all&amp`}
          >
            View in Explorer
          </a>
        </StatusMessage>
      )}
      {error && (
        <StatusMessage
          message="Oops, an error occurred"
          messageType={MessageType.Error}
          repeatPulse={false}
        >
          <div className="error">{error}</div>
          <button onClick={handleEditEntity}>Try Again</button>
        </StatusMessage>
      )}
    </Container>
  )
}

const mapStateToProps = (state: RootState): any => ({
  entityType: editEntitySelectors.selectEntityType(state),
  creating: editEntitySelectors.selectCreating(state),
  edited: editEntitySelectors.selectEdited(state),
  error: editEntitySelectors.selectError(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleEditEntity: (): void => dispatch(editEntity()),
})

export const EditEntityFinalConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditEntityFinal)
