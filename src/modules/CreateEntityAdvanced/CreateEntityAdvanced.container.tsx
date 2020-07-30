import React from 'react'
import { RootState } from 'src/common/redux/types'
import * as createEntityAdvancedSelectors from './CreateEntityAdvanced.selectors'
import { LinkedEntity } from './types'
import { connect } from 'react-redux'

interface Props {
  linkedEntity: LinkedEntity
}

class CreateEntityAdvanced extends React.Component<Props> {
  render(): JSX.Element {
    return <></>
  }
}

const mapStateToProps = (state: RootState): any => ({
  linkedEntity: createEntityAdvancedSelectors.selectLinkedEntity(state),
})

export const CreateEntityAdvancedConnected = connect(
  mapStateToProps,
  {},
)(CreateEntityAdvanced)
