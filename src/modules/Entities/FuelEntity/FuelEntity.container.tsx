import React, { Dispatch } from 'react'
import { RouteProps } from 'react-router'
import { connect } from 'react-redux'
import { RootState } from 'common/redux/types'

interface Props {
  assistantPanelToggle: () => void
}

class FuelEntity extends React.Component<Props & RouteProps> {
  constructor(props: any) {
    super(props)
  }

  componentDidMount(): void {
    const { assistantPanelToggle } = this.props;

    assistantPanelToggle()
  }

  render(): JSX.Element {
    return null;
  }
}

const mapStateToProps = (state: RootState): any => ({
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(FuelEntity)
