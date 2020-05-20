import * as React from 'react'
import { Tabs, Button } from '../Tabs/Tabs'
import { MatchType } from '../../../types/models'
import { PositionController } from './HeaderTabs.styles'

export interface Props {
  buttons: Button[]
  matchType?: any
  activeTabColor?: string
}

const HeaderTabs: React.FunctionComponent<Props> = ({
  buttons,
  matchType,
  activeTabColor,
}): JSX.Element => {
  return (
    <PositionController>
      <Tabs
        activeTabColor={activeTabColor}
        buttons={buttons}
        matchType={matchType || MatchType.exact}
      />
    </PositionController>
  )
}

export default HeaderTabs
