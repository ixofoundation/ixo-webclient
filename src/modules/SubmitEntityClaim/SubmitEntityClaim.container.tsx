import React, { Dispatch } from 'react'
import { connect } from 'react-redux'
import { RootState } from 'src/common/redux/types'
import { Instructions } from './components/Instructions/Instructions'

interface State {
  showInstructions: boolean
}

class SubmitEntityClaim extends React.Component<{}, State> {
  constructor(props) {
    super(props)
    this.state = {
      showInstructions: true,
    }
  }

  handleToggleInstructions = (): void => {
    this.setState({
      showInstructions: !this.state.showInstructions,
    })
  }

  render(): JSX.Element {
    return (
      <>
        {this.state.showInstructions && (
          <Instructions toggleInstructions={this.handleToggleInstructions} />
        )}
      </>
    )
  }
}

const mapStateToProps = (state: RootState): Record<string, any> => ({})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({})

export const SubmitEntityClaimConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubmitEntityClaim)
