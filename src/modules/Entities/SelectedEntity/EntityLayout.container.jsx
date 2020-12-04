import React from 'react'
import { connect } from 'react-redux'
import * as entitySelectors from './SelectedEntity.selectors'
import { getEntity } from './SelectedEntity.actions'
import { Spinner } from 'common/components/Spinner'
import { Route, Switch } from 'react-router-dom'


class EntityLayout extends React.Component {
  state = {
    assistantPanelActive: false,
  }

  componentDidMount() {
    const {
      match: {
        params: { projectDID: did },
      },
      handleGetEntity,
    } = this.props

    handleGetEntity(did)
  }

  assistantPanelToggle = () => {
    const { assistantPanelActive } = this.state
    this.setState({assistantPanelActive: !assistantPanelActive})
  }

  render() {
    const {
      isLoading,
      children
    } = this.props

    if (isLoading) {
      return <Spinner info="Loading Entity..." />
    }

    return children
  }
}

const mapStateToProps = state => ({
  isLoading: entitySelectors.entityIsLoading(state),
})

const mapDispatchToProps = dispatch => ({
  handleGetEntity: did => dispatch(getEntity(did)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EntityLayout)
