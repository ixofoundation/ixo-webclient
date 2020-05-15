import * as React from 'react'
import { Tabs } from '../Tabs/Tabs'
import { MatchType } from '../../../types/models'
import { PositionController } from './HeaderTabs.styles'

export interface Props {
  buttons: any[]
  matchType: any
}

const HeaderTabs = (props): JSX.Element => {
  return (
    <PositionController>
      <Tabs
        buttons={props.buttons}
        matchType={props.matchType || MatchType.exact}
      />
    </PositionController>
  )
}

export default HeaderTabs
