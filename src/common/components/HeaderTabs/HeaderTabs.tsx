import * as React from 'react'
import { Tabs, Button } from '../Tabs/Tabs'
import { MatchType } from '../../../types/models'
import { PositionController } from './HeaderTabs.styles'

export interface Props {
  buttons: Button[]
  matchType?: any
  activeTabColor?: string
  assistantPanelToggle?: () => void
  enableAssistantButton?: boolean
}

const HeaderTabs: React.FunctionComponent<Props> = ({
  buttons,
  matchType,
  activeTabColor,
  assistantPanelToggle,
  enableAssistantButton
}): JSX.Element => {

  return (
    <PositionController>
      <Tabs
        activeTabColor={activeTabColor}
        buttons={buttons}
        matchType={matchType || MatchType.exact}
        assistantPanelToggle={assistantPanelToggle}
        enableAssistantButton={enableAssistantButton}
      />
    </PositionController>
  )
}

export default HeaderTabs
