import React from 'react'
import { ToogleAssistantPayload } from 'modules/Account/types'

interface Props {
  assistantPanelToggle: (param: ToogleAssistantPayload) => void
}

class ShowAssistantPanel extends React.Component<Props> {
  componentDidMount(): void {
    const { assistantPanelToggle } = this.props
    assistantPanelToggle({ fixed: true })
  }

  render(): JSX.Element {
    return <div />
  }
}

export default ShowAssistantPanel
