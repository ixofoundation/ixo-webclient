import React, { Dispatch } from 'react'
import { RouteProps } from 'react-router'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

import Assistant, {
  startAssistant,
} from 'common/components/Assistant/Assistant'
import FuelEntityConfirmOrder from './components/FuelEntityConfirmOrder/FuelEntityConfirmOrder'
import { RootState } from 'common/redux/types'
import * as fuelEntitySelectors from './FuelEntity.selectors'
import { getOrder, confirmOrder, cancelOrder } from './FuelEntity.actions'
import BackIcon from 'assets/icons/Back'
import ChatbotIcon from 'assets/icons/Chatbot'
import StatusMessage, {
  MessageType,
} from 'common/components/StatusMessage/StatusMessage'

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
