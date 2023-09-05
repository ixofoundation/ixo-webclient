import * as React from 'react'
import { Tabs } from '../Tabs/Tabs'
import { MatchType } from 'types/models'
import { PositionController } from './HeaderTabs.styles'
import { toggleAssistant } from 'redux/account/account.actions'
import { ToogleAssistantPayload } from 'redux/account/account.types'
import { connect } from 'react-redux'
import { EntityType } from 'types/entities'
import { HeaderTab } from 'components/Dashboard/types'
import { useEntityConfig } from 'hooks/configs'
import useCurrentEntity, { useCurrentEntityCreator } from 'hooks/currentEntity'
import { useParams } from 'react-router-dom'
import { useAccount } from 'hooks/account'

interface Props {
  matchType?: any
  activeTabColor?: string
  assistantPanelToggle?: () => void
  toggleAssistant?: (param: ToogleAssistantPayload) => void
  enableAssistantButton?: boolean
  assistantFixed?: boolean
  buttons?: HeaderTab[]
}

const HeaderTabs: React.FunctionComponent<Props> = ({
  matchType,
  activeTabColor,
  toggleAssistant,
  enableAssistantButton,
  assistantFixed = false,
  buttons,
}): JSX.Element => {
  const { entityId } = useParams<{ entityId: string }>()
  const { title } = useEntityConfig()
  const entityConfig = useEntityConfig()
  const { entityType } = useCurrentEntity()
  const { id: creatorDid } = useCurrentEntityCreator()
  const { did: userDid, registered } = useAccount()

  console.log({ entityConfig })

  const buttonsArray = React.useMemo(() => {
    if (buttons) {
      return buttons
    }

    const fundingPageUrl = `/projects/${entityId}/funding`

    const buttonArr: HeaderTab[] = [
      {
        iconClass: `icon-${entityType!.split('/')[0].toLowerCase()}`,
        path: `/projects/${entityId}/overview`,
        title: entityType,
        tooltip: `${title} Overview`,
      },
    ]

    // const isLaunchPad = checkIsLaunchpadFromApiListedEntityData(ddoTags ?? [])

    if (entityType === EntityType.Project) {
      buttonArr.push({
        iconClass: 'icon-dashboard',
        path: `/projects/${entityId}/detail`,
        title: 'DASHBOARD',
        tooltip: `${title} Management`,
      })
    } else {
      buttonArr.push({
        iconClass: 'icon-dashboard',
        linkClass: 'in-active',
        path: '/performace',
        title: 'DASHBOARD',
        tooltip: `${title} Management`,
      })
    }

    buttonArr.push({
      iconClass: 'icon-exchange',
      path: `/exchange/trade/${entityId}`,
      title: 'EXCHANGE',
      tooltip: `Asset Exchange`,
    })

    if (entityType === 'TODO: ') {
      buttonArr.push({
        iconClass: 'icon-funding',
        linkClass: 'restricted',
        path: fundingPageUrl,
        title: 'FUNDING',
        tooltip: `${title} Funding`,
      })
    }

    return buttonArr
    // eslint-disable-next-line
  }, [entityId, entityType, userDid, creatorDid, buttons, registered])

  return (
    <PositionController>
      <Tabs
        activeTabColor={activeTabColor}
        buttons={buttonsArray}
        matchType={matchType || MatchType.exact}
        assistantPanelToggle={(): void => toggleAssistant!({ fixed: assistantFixed })}
        enableAssistantButton={enableAssistantButton!}
      />
    </PositionController>
  )
}

const mapDispatchToProps = (dispatch: any): any => ({
  toggleAssistant: (param: ToogleAssistantPayload): void => {
    dispatch(toggleAssistant(param))
  },
})

export default connect(undefined, mapDispatchToProps)(HeaderTabs)
