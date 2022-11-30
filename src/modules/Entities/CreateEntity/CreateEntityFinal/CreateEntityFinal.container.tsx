import React, { Dispatch } from 'react'
import { connect, useSelector } from 'react-redux'
import { RootState } from 'redux/types'
import StatusMessage, { MessageType } from 'components/StatusMessage/StatusMessage'
import { createEntity } from '../../../../redux/createEntityOld/createEntity.actions'
import * as createEntitySelectors from '../../../../redux/createEntityOld/createEntity.selectors'
import { EntityType } from '../../types'
import { Container } from './CreateEntityFinal.styles'
import { selectEntityConfig } from 'redux/entitiesExplorer/entitiesExplorer.selectors'

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

  const splashIsRootRoute = React.useMemo(() => !!entityTypeMap?.route?.splashIsRootRoute, [entityTypeMap])

  return (
    <Container>
      {creating && (
        <StatusMessage message={`Creating ${entityTitle}...`} messageType={MessageType.Sending} repeatPulse={false} />
      )}
      {created && (
        <StatusMessage
          message={`Successfully Created your ${entityTitle}`}
          messageType={MessageType.Success}
          repeatPulse={false}
        >
          <a
            className='close-button'
            href={splashIsRootRoute ? `/explore?filter=${entityType}` : `/filter=${entityType}`}
          >
            View in Explorer
          </a>
        </StatusMessage>
      )}
      {error && (
        <StatusMessage message='Oops, an error occurred' messageType={MessageType.Error} repeatPulse={false}>
          <div className='error'>{error}</div>
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

export const CreateEntityFinalConnected = connect(mapStateToProps, mapDispatchToProps)(CreateEntityFinal)
