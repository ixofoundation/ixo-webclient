import * as React from 'react'
import { Moment } from 'moment'
import { useSelector } from 'react-redux'
import { getCountryName } from 'common/utils/formatters'
import { MatchType } from '../../../../types/models'
import HeaderTabs from 'common/components/HeaderTabs/HeaderTabs'
import {
  SingleNav,
  HeroInner,
  Flag,
  HeroContainer,
  HeroInfoItemsWrapper,
  HeroInfoItem,
  Title,
  Description,
} from './EntityHero.styles'
import CalendarSort from 'assets/icons/CalendarSort'
import availableFlags from 'lib/json/availableFlags.json'
import { EntityType } from 'modules/Entities/types'
import { entityTypeMap } from 'modules/Entities/strategy-map'
import { deviceWidth } from 'lib/commonData'
import IxoCircle from 'assets/images/ixo-circle.png'
import MediaQuery from 'react-responsive'
import CreateEntityDropDown from '../../CreateEntity/components/CreateEntityDropdown/CreateEntityDropdown'
import { selectEntityBondDid } from 'modules/Entities/SelectedEntity/SelectedEntity.selectors'
import { Route } from 'react-router-dom'
import RightIcon from 'assets/icons/Right'

interface Props {
  type: EntityType
  did: string
  name: string
  description: string
  dateCreated: Moment
  creatorName: string
  location: string
  sdgs: string[]
  isLoggedIn: boolean
  onlyTitle: boolean
  assistantPanelToggle?: () => void
  enableAssistantButton?: boolean
  light?: boolean
  bondDid?: string
}

const EntityHero: React.FunctionComponent<Props> = ({
  name,
  description,
  creatorName,
  type,
  did,
  location,
  dateCreated,
  isLoggedIn,
  onlyTitle,
  assistantPanelToggle,
  enableAssistantButton = true,
  light = false,
}) => {
  const bondDid = useSelector(selectEntityBondDid)

  const buttonsArray = [
    {
      iconClass: `icon-${type.toLowerCase()}`,
      linkClass: null,
      path: `/projects/${did}/overview`,
      title: entityTypeMap[type].title,
    },
  ]

  if (type === EntityType.Project) {
    buttonsArray.push({
      iconClass: 'icon-dashboard',
      linkClass: null,
      path: `/projects/${did}/detail`,
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
  console.log('isLoggedIn && bondDid', isLoggedIn, bondDid)
  if (isLoggedIn && bondDid) {
    buttonsArray.push({
      iconClass: 'icon-funding',
      linkClass: null,
      path: `/projects/${did}/bonds/${bondDid}`,
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

  const getFlagURL = (projectLocation: string): string => {
    if (availableFlags.availableFlags.includes(location)) {
      return `url(${require(`../../../../assets/images/country-flags/${projectLocation.toLowerCase()}.svg`)})`
    } else if (location === 'AA') {
      return `url(${require('../../../../assets/images/country-flags/global.svg')})`
    }

    return ''
  }

  const renderNavs = (): JSX.Element => {
    return (
      <>
      <SingleNav
        to="/"
        light={light }
      >
        EXPLORE PROJECTS
        <RightIcon />
      </SingleNav>
      <SingleNav
        to={`/projects/${did}/overview`}
        light={light }
      >
        { name }
        <RightIcon />
      </SingleNav>
      <Route
        path={`/projects/:projectDID/detail`}
      >
        <SingleNav
          to={`/projects/${did}/detail`}
          light={light }
        >
          Dashboard
          <RightIcon />
        </SingleNav>
      </Route>
      <Route
        exact
        path={`/projects/:projectDID/detail/agents`}
      >
        <SingleNav
          to={`/projects/${did}/detail/agents`}
          light={light }
        >
          Agents
          <RightIcon />
        </SingleNav>
      </Route>
      <Route
        exact
        path={`/projects/:projectDID/detail/claims`}
      >
        <SingleNav
          to={`/projects/${did}/detail/claims`}
          light={light }
        >
          Claims
          <RightIcon />
        </SingleNav>
      </Route>
      <Route
        path={`/projects/:projectDID/bonds`}
      >
        <SingleNav
          to={`/projects/${did}/bonds/${bondDid}/payments`}
          light={light}
        >
          Funds
          <RightIcon />
        </SingleNav>
      </Route>
      <Route
        path={`/projects/:projectDID/bonds/:bondDID/accounts`}
      >
        <SingleNav
          to={`/projects/${did}/bonds/${bondDid}/accounts`}
          light={light}
        >
          Accounts
          <RightIcon />
        </SingleNav>
      </Route>
      <Route
        path={`/projects/:projectDID/bonds/:bondDID/events`}
      >
        <SingleNav
          to={`/projects/${did}/bonds/${bondDid}/events`}
          light={light}
        >
          Events
          <RightIcon />
        </SingleNav>
      </Route>
      <Route
        path={`/projects/:projectDID/bonds/:bondDID/investment`}
      >
        <SingleNav
          to={`/projects/${did}/bonds/${bondDid}/investment`}
          light={light}
        >
          Investment
          <RightIcon />
        </SingleNav>
      </Route>
      <Route
        path={`/projects/:projectDID/bonds/:bondDID/payments`}
      >
        <SingleNav
          to={`/projects/${did}/bonds/${bondDid}/payments`}
          light={light}
        >
          Payments
          <RightIcon />
        </SingleNav>
      </Route>
      </>
    )
  }

  return (
    <>
      <HeroContainer onlyTitle={onlyTitle}>
        <HeroInner className="detailed">
          <div className="row">
            <div className="col-sm-12">
              {renderNavs()}
              <Title>{name}</Title>
              {
                !onlyTitle && <>
                  <Description>{description}</Description>
                  <HeroInfoItemsWrapper>
                    <HeroInfoItem>
                      <CalendarSort fill="#A5ADB0" />
                      <span>{dateCreated.format('d MMM ‘YY')}</span>
                    </HeroInfoItem>
                    <HeroInfoItem>
                      <img src={IxoCircle} />
                      <span>{creatorName}</span>
                    </HeroInfoItem>
                    {location && (
                      <HeroInfoItem>
                        {getFlagURL(location) !== '' && (
                          <Flag
                            style={{
                              background: getFlagURL(location),
                            }}
                          />
                        )}
                        <span>{getCountryName(location)}</span>
                      </HeroInfoItem>
                    )}
                  </HeroInfoItemsWrapper>
                </>
              }
            </div>
          </div>
        </HeroInner>
        <MediaQuery minWidth={`${deviceWidth.desktop}px`}>
          <CreateEntityDropDown />
        </MediaQuery>
        <HeaderTabs
          buttons={buttonsArray}
          matchType={MatchType.strict}
          assistantPanelToggle={assistantPanelToggle}
          enableAssistantButton={enableAssistantButton}
          activeTabColor={entityTypeMap[type].themeColor}
        />
      </HeroContainer>
    </>
  )
}

export default EntityHero
