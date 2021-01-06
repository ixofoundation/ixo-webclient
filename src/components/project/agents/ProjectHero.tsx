import * as React from 'react'
import { useSelector } from 'react-redux'

import { SDGArray } from 'lib/commonData'
import { toTitleCase } from 'common/utils/formatters'
import { MatchType, AgentRoles } from 'types/models'
import HeaderTabs from 'common/components/HeaderTabs/HeaderTabs'
import {
  SingleSDG,
  HeroInner,
  HeroContainer,
  Title,
  StyledFundingTitle,
  SDGIcon,
} from './ProjectHero.styles'

import { EntityType } from 'modules/Entities/types'
import { selectUserIsLoggedIn } from 'modules/Account/Account.selectors'
import { entityTypeMap } from 'modules/Entities/strategy-map'
import { useWindowSize } from 'common/hooks'
import { deviceWidth } from 'lib/commonData'
import CreateEntityDropDown from 'modules/Entities/CreateEntity/components/CreateEntityDropdown/CreateEntityDropdown'
import MediaQuery from 'react-responsive'

export interface Props {
  project: any
  match: any
  isDetail: boolean
  isClaim?: boolean
  hasCapability: (role: [AgentRoles]) => boolean
  onlyTitle?: boolean
  assistantPanelToggle?: () => void
  enableAssistantButton?: boolean
}

export const ProjectHero: React.SFC<Props> = ({
  project,
  match,
  isDetail,
  onlyTitle,
  assistantPanelToggle,
  enableAssistantButton = true,
}) => {
  const windowSize = useWindowSize()
  const isUserLoggedIn = useSelector(selectUserIsLoggedIn)
  const entityType = project.entityType
    ? (toTitleCase(project.entityType) as EntityType)
    : EntityType.Project

  const buttonsArray = [
    {
      iconClass: `icon-${entityType.toLowerCase()}`,
      linkClass: null,
      path: `/projects/${match.params.projectDID}/overview`,
      title: entityTypeMap[entityType].title,
    },
  ]

  if (entityType === EntityType.Project) {
    buttonsArray.push({
      iconClass: 'icon-dashboard',
      linkClass: null,
      path: `/projects/${match.params.projectDID}/detail`,
      title: 'DASHBOARD',
    })
  } else {
    buttonsArray.push({
      iconClass: 'icon-dashboard',
      linkClass: 'in-active',
      path: '/performace',
      title: 'DASHBOARD',
    })
  }

  if (isUserLoggedIn && project.bondDid) {
    buttonsArray.push({
      iconClass: 'icon-funding',
      linkClass: null,
      path: `/projects/${match.params.projectDID}/bonds/${project.bondDid}`,
      title: 'FUNDING',
    })
  } else {
    buttonsArray.push({
      iconClass: 'icon-funding',
      linkClass: 'in-active',
      path: '/funding',
      title: 'FUNDING',
    })
  }

  const renderSDGs = (): JSX.Element => {
    return (
      <>
        <SingleSDG
          href={'/'}
        >
          Explore Projects
        </SingleSDG>

        {project.sdgs.map((SDG, index) => {
          const goal = Math.floor(SDG)
          if (goal > 0 && goal <= SDGArray.length) {
            return (
              <SingleSDG
                target="_blank"
                href={SDGArray[goal - 1].url}
                key={index}
              >
                <SDGIcon className={`icon-down`} />
                {goal}. {SDGArray[goal - 1].title}
              </SingleSDG>
            )
          } else {
            return null
          }
        })}
      </>
    )
  }

  return (
    <React.Fragment>
      {onlyTitle && windowSize.width > deviceWidth.tablet && (
        <StyledFundingTitle>{project.title}</StyledFundingTitle>
      )}
      <HeroContainer className="container-fluid" onlyTitle={false}>
      {!onlyTitle && windowSize.width > deviceWidth.tablet && (
        <HeroInner className={`${isDetail && 'detailed'}`}>
          <div className="row">
            <div className="col-sm-12">
              {renderSDGs()}
              <Title>{project.title}</Title>
            </div>
          </div>
          </HeroInner>
        )}
        <MediaQuery minWidth={`${deviceWidth.desktop}px`}>
          <CreateEntityDropDown />
        </MediaQuery>
        <HeaderTabs
          buttons={buttonsArray}
          matchType={MatchType.strict}
          assistantPanelToggle={assistantPanelToggle}
          enableAssistantButton={enableAssistantButton}
          activeTabColor={entityTypeMap[entityType].themeColor}
        />
      </HeroContainer>
    </React.Fragment>
  )
}
