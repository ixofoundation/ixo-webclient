import React from 'react'

interface Props {
  assistantPanelToggle: () => void
}

class ShowAssistantPanel extends React.Component<Props> {
  componentDidMount(): void {
    const { assistantPanelToggle } = this.props;
    assistantPanelToggle()
  }

  render(): JSX.Element {
    return null;
  }
}

export default ShowAssistantPanel;