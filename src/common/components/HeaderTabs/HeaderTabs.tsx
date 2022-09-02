import * as React from 'react'
import { Tabs } from '../Tabs/Tabs'
import { MatchType } from '../../../types/models'
import { PositionController } from './HeaderTabs.styles'
import { toggleAssistant } from 'modules/Account/Account.actions'
import { ToogleAssistantPayload } from 'modules/Account/types'
import { connect, useSelector } from 'react-redux'
import { RootState } from 'common/redux/types'
import * as entitySelectors from 'modules/Entities/SelectedEntity/SelectedEntity.selectors'
import * as accountSelectors from 'modules/Account/Account.selectors'
import { selectEntityBondDid } from 'modules/Entities/SelectedEntity/SelectedEntity.selectors'
import { EntityType } from 'modules/Entities/types'
import { selectEntityConfig } from 'modules/Entities/EntitiesExplorer/EntitiesExplorer.selectors'

export interface Props {
  matchType?: any
  activeTabColor?: string
  assistantPanelToggle?: () => void
  toggleAssistant?: (param: ToogleAssistantPayload) => void
  enableAssistantButton?: boolean
  assistantFixed?: boolean
  entityType?: string
  isLoggedIn?: boolean
  entityDid?: string
  bondDid?: string
  creatorDid?: string
  userDid?: string
  buttons?: any[]
  ddoTags?: any[]
}

const HeaderTabs: React.FunctionComponent<Props> = ({
  matchType,
  activeTabColor,
  toggleAssistant,
  enableAssistantButton,
  assistantFixed = false,
  entityType,
  isLoggedIn,
  bondDid,
  entityDid,
  creatorDid,
  userDid,
  buttons,
  ddoTags,
}): JSX.Element => {
  const entityTypeMap = useSelector(selectEntityConfig)
  const entityTitle = entityTypeMap[entityType]?.title ?? ''

  const buttonsArray = React.useMemo(() => {
    if (buttons) {
      return buttons
    }

    const fundingPageUrl = `/projects/${entityDid}/funding`

    const buttonArr = [
      {
        iconClass: `icon-${entityType.toLowerCase()}`,
        linkClass: null,
        path: `/projects/${entityDid}/overview`,
        title: entityTitle,
        tooltip: `${entityTitle} Overview`,
      },
    ]

    const isLaunchPad =
      (ddoTags
        .find((ddoTag) => ddoTag.category === 'Project Type')
        ?.tags.some((tag) => tag === 'Candidate') ||
        ddoTags
          .find((ddoTag) => ddoTag.category === 'DAO Type')
          ?.tags.some((tag) => tag === 'Candidate') ||
        ddoTags
          .find((ddoTag) => ddoTag.category === 'Oracle Type')
          ?.tags.some((tag) => tag === 'Candidate')) &&
      ddoTags
        .find((ddoTag) => ddoTag.category === 'Stage')
        ?.tags.some((tag) => tag === 'Selection')

    if (entityType === EntityType.Project || entityType === EntityType.Dao) {
      buttonArr.push({
        iconClass: 'icon-dashboard',
        linkClass: null,
        path: `/projects/${entityDid}/detail`,
        title: 'DASHBOARD',
        tooltip: `${entityTitle} Management`,
      })
    } else if (entityType === EntityType.Investment && bondDid) {
      buttonArr.push({
        iconClass: 'icon-dashboard',
        linkClass: null,
        path: `/projects/${entityDid}/bonds/${bondDid}/detail`,
        title: 'DASHBOARD',
        tooltip: `${entityTitle} Management`,
      })
    } else {
      buttonArr.push({
        iconClass: 'icon-dashboard',
        linkClass: 'in-active',
        path: '/performace',
        title: 'DASHBOARD',
        tooltip: `${entityTitle} Management`,
      })
    }

    if (entityType === EntityType.Asset) {
      buttonArr.push({
        iconClass: 'icon-exchange',
        linkClass: null,
        path: `/projects/${entityDid}/exchange`,
        title: 'EXCHANGE',
        tooltip: `${entityTitle} Exchange`,
      })
    } else if (bondDid) {
      if (isLoggedIn) {
        if (isLaunchPad) {
          buttonArr.push({
            iconClass: 'icon-voting',
            linkClass: null,
            path: `/projects/${entityDid}/voting`,
            title: 'VOTING',
            tooltip: `${entityTitle} Voting`,
          })
        } else {
          buttonArr.push({
            iconClass: 'icon-funding',
            linkClass: null,
            path: fundingPageUrl,
            title: 'FUNDING',
            tooltip: `${entityTitle} Funding`,
          })
        }
      } else {
        if (creatorDid !== userDid) {
          buttonArr.push({
            iconClass: 'icon-funding',
            linkClass: 'restricted',
            path: fundingPageUrl,
            title: 'FUNDING',
            tooltip: `${entityTitle} Funding`,
          })
        } else {
          buttonArr.push({
            iconClass: 'icon-funding',
            linkClass: '',
            path: fundingPageUrl,
            title: 'FUNDING',
            tooltip: `${entityTitle} Funding`,
          })
        }
      }
    } else {
      buttonArr.push({
        iconClass: 'icon-funding',
        linkClass: 'restricted',
        path: fundingPageUrl,
        title: 'FUNDING',
        tooltip: `${entityTitle} Funding`,
      })
    }

    return buttonArr
    // eslint-disable-next-line
  }, [
    entityDid,
    entityType,
    bondDid,
    userDid,
    creatorDid,
    buttons,
    ddoTags,
    isLoggedIn,
  ])

  return (
    <PositionController>
      <Tabs
        activeTabColor={activeTabColor}
        buttons={buttonsArray}
        matchType={matchType || MatchType.exact}
        assistantPanelToggle={(): void =>
          toggleAssistant({ fixed: assistantFixed })
        }
        enableAssistantButton={enableAssistantButton}
      />
    </PositionController>
  )
}

const mapStateToProps = (state: RootState): Record<string, any> => ({
  entityType: entitySelectors.selectEntityType(state),
  isLoggedIn: accountSelectors.selectUserIsLoggedIn(state),
  bondDid: selectEntityBondDid(state),
  entityDid: entitySelectors.selectEntityDid(state),
  creatorDid: entitySelectors.selectEntityCreator(state),
  userDid: accountSelectors.selectUserDid(state),
  ddoTags: entitySelectors.selectEntityDdoTags(state),
})

const mapDispatchToProps = (dispatch: any): any => ({
  toggleAssistant: (param: ToogleAssistantPayload): void => {
    dispatch(toggleAssistant(param))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderTabs)
