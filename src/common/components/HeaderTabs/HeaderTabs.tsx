import * as React from 'react'
import { Tabs, Button } from '../Tabs/Tabs'
import { MatchType } from '../../../types/models'
import { PositionController } from './HeaderTabs.styles'
import { toggleAssistant } from 'modules/Account/Account.actions'
import { ToogleAssistantPayload } from 'modules/Account/types'
import { connect } from 'react-redux'
import { RootState } from 'common/redux/types'

export interface Props {
  buttons: Button[]
  matchType?: any
  activeTabColor?: string
  assistantPanelToggle?: () => void
  toggleAssistant?: (param: ToogleAssistantPayload) => void
  enableAssistantButton?: boolean
  assistantFixed?: boolean
}

const HeaderTabs: React.FunctionComponent<Props> = ({
  buttons,
  matchType,
  activeTabColor,
  toggleAssistant,
  enableAssistantButton,
  assistantFixed = false,
}): JSX.Element => {
  return (
    <PositionController>
      <Tabs
        activeTabColor={activeTabColor}
        buttons={buttons}
        matchType={matchType || MatchType.exact}
        assistantPanelToggle={() => toggleAssistant({ fixed: assistantFixed })}
        enableAssistantButton={enableAssistantButton}
      />
    </PositionController>
  )
}

const mapStateToProps = (state: RootState): Record<string, any> => ({})

const mapDispatchToProps = (dispatch: any): any => ({
  toggleAssistant: (param: ToogleAssistantPayload): void => {
    dispatch(toggleAssistant(param))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderTabs)
