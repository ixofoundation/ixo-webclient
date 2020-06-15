import React, { Dispatch } from 'react'
import { connect } from 'react-redux'
import { RootState } from 'src/common/redux/types'

interface State {
  showInstructions: boolean
}

class SubmitEntityClaim extends React.Component<{}, State> {
  render(): JSX.Element {
    return <div>Main screen here</div>
  }
}

const mapStateToProps = (state: RootState): Record<string, any> => ({})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({})

export const SubmitEntityClaimConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubmitEntityClaim)
