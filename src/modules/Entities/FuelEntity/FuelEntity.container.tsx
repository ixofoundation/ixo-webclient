import React, { Dispatch } from 'react'
import { RouteProps } from 'react-router'
import { connect } from 'react-redux'
import { RootState } from 'common/redux/types'

interface Props {
  assistantPanelToggle: (intent: string) => void
}

class FuelEntity extends React.Component<Props & RouteProps> {
  constructor(props: any) {
    super(props)
  }

  componentDidMount(): void {
    const { assistantPanelToggle } = this.props;

    assistantPanelToggle('/fuel_my_entity{"msg_type":"msgSend","entity_type":"Project","entity_id": "did:ixo:4ZhPNsUaKNvsopFmBiy9R5","denom":"ixo"')
    //assistantPanelToggle('/entity_status{"msg_type":"msgUpdateProjectStatus","entity_type":"Project","entity_id": "did:ixo:4ZhPNsUaKNvsopFmBiy9R5"}')
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
