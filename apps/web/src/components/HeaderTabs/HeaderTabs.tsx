import * as React from 'react'
import { Tabs } from '../Tabs/Tabs'
import { MatchType } from 'types/models'
import { PositionController } from './HeaderTabs.styles'
import { HeaderTab } from 'components/Dashboard/types'
import { useEntityConfig } from 'hooks/configs'
import { useCurrentEntityCreator } from 'hooks/currentEntity'
import { useParams } from 'react-router-dom'
import { useAccount } from 'hooks/account'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { togglePanel } from 'redux/assistant/assistant.slice'
import { toRootEntityType } from 'utils/entities'
import { getEntityById } from 'redux/entitiesExplorer/entitiesExplorer.selectors'

interface Props {
  matchType?: any
  activeTabColor?: string
  assistantPanelToggle?: () => void
  enableAssistantButton?: boolean
  assistantFixed?: boolean
  buttons?: HeaderTab[]
}

const HeaderTabs: React.FunctionComponent<Props> = ({
  matchType,
  activeTabColor,
  enableAssistantButton,
  assistantFixed = false,
  buttons,
}): JSX.Element => {
  const dispatch = useAppDispatch()
  const { entityId = "" } = useParams<{ entityId: string }>()
  const { title } = useEntityConfig()
  const currentEntity = useAppSelector(getEntityById(entityId))
  const entityType = toRootEntityType(currentEntity.type)
  const { id: creatorDid } = useCurrentEntityCreator()
  const { did: userDid, registered } = useAccount()

  const buttonsArray = React.useMemo(() => {
    if (buttons) {
      return buttons
    }

    const buttonArr: HeaderTab[] = [
      {
        iconClass: `icon-${entityType!.split('/')[0].toLowerCase()}`,
        path: `/entity/${entityId}/overview`,
        title: entityType,
        tooltip: `${title} Overview`,
      },
    ]

    return buttonArr
    // eslint-disable-next-line
  }, [entityId, entityType, userDid, creatorDid, buttons, registered])

  return (
    <PositionController>
      <Tabs
        activeTabColor={activeTabColor}
        buttons={buttonsArray}
        matchType={matchType || MatchType.exact}
        assistantPanelToggle={(): void => {
          dispatch(togglePanel())
        }}
        enableAssistantButton={enableAssistantButton!}
      />
    </PositionController>
  )
}

export default HeaderTabs
