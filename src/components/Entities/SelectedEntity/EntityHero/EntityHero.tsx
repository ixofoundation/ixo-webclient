import * as React from 'react'
import { Moment } from 'moment'
import { useAppSelector } from 'redux/hooks'
import { getCountryName } from 'utils/formatters'
import { MatchType } from '../../../../types/models'
import HeaderTabs from 'components/HeaderTabs/HeaderTabs'
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
import availableFlags from 'data/availableFlags.json'
import { EntityType } from 'types/entities'
import { Route } from 'react-router-dom'
import RightIcon from 'assets/icons/Right'
import { selectEntityBondDid } from 'redux/selectedEntity/selectedEntity.selectors'
import { selectEntityConfig } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { requireCheckDefault } from 'utils/images'

interface Props {
  type: EntityType
  did: string
  name: string
  description: string
  dateCreated: Moment
  creatorName: string
  creatorLogo: string
  location: string
  sdgs: string[]
  onlyTitle: boolean
  assistantPanelToggle?: () => void
  enableAssistantButton?: boolean
  light?: boolean
  assistantFixed?: boolean
}

const EntityHero: React.FunctionComponent<Props> = ({
  name,
  description,
  type,
  did,
  location,
  dateCreated,
  onlyTitle,
  creatorName,
  creatorLogo,
  enableAssistantButton = true,
  light = false,
  assistantFixed = false,
  assistantPanelToggle,
}) => {
  const bondDid = useAppSelector(selectEntityBondDid)
  const entityTypeMap = useAppSelector(selectEntityConfig)

  const entityTitlePlural = React.useMemo(() => {
    return entityTypeMap[type]?.plural ?? ''
  }, [entityTypeMap, type])

  const getFlagURL = (projectLocation: string): string => {
    if (availableFlags.availableFlags.includes(location)) {
      return `url(${requireCheckDefault(require(`assets/images/country-flags/${projectLocation.toLowerCase()}.svg`))})`
    } else if (location === 'AA') {
      return `url(${requireCheckDefault(require('assets/images/country-flags/global.svg'))})`
    }

    return ''
  }

  const splashIsRootRoute = React.useMemo(() => !!entityTypeMap?.route?.splashIsRootRoute, [entityTypeMap])

  const renderNavs = (): JSX.Element => {
    return (
      <>
        <SingleNav to={splashIsRootRoute ? '/explore' : '/'} light={light ? 1 : 0}>
          Explore {entityTitlePlural}
          <RightIcon />
        </SingleNav>
        <SingleNav to={`/projects/${did}/overview`} light={light ? 1 : 0}>
          {name}
          <RightIcon />
        </SingleNav>
        <Route path={`/projects/:projectDID/detail/overview`}>
          <SingleNav to={`/projects/${did}/detail/overview`} light={light ? 1 : 0}>
            Dashboard
            <RightIcon />
          </SingleNav>
        </Route>
        <Route exact path={`/projects/:projectDID/detail/agents`}>
          <SingleNav to={`/projects/${did}/detail/agents`} light={light ? 1 : 0}>
            Agents
            <RightIcon />
          </SingleNav>
        </Route>
        <Route exact path={`/projects/:projectDID/detail/toc`}>
          <SingleNav to={`/projects/${did}/detail/toc`} light={light ? 1 : 0}>
            Theory of Change
            <RightIcon />
          </SingleNav>
        </Route>
        <Route exact path={`/projects/:projectDID/detail/claims`}>
          <SingleNav to={`/projects/${did}/detail/claims`} light={light ? 1 : 0}>
            Claims
            <RightIcon />
          </SingleNav>
        </Route>
        <Route path={`/projects/:projectDID/bonds`}>
          <SingleNav to={`/projects/${did}/bonds/${bondDid}/payments`} light={light ? 1 : 0}>
            Funds
            <RightIcon />
          </SingleNav>
        </Route>
        <Route path={`/projects/:projectDID/bonds/:bondDID/accounts`}>
          <SingleNav to={`/projects/${did}/bonds/${bondDid}/accounts`} light={light ? 1 : 0}>
            Accounts
            <RightIcon />
          </SingleNav>
        </Route>
        <Route path={`/projects/:projectDID/bonds/:bondDID/events`}>
          <SingleNav to={`/projects/${did}/bonds/${bondDid}/events`} light={light ? 1 : 0}>
            Events
            <RightIcon />
          </SingleNav>
        </Route>
        <Route path={`/projects/:projectDID/bonds/:bondDID/investment`}>
          <SingleNav to={`/projects/${did}/bonds/${bondDid}/investment`} light={light ? 1 : 0}>
            Investment
            <RightIcon />
          </SingleNav>
        </Route>
        <Route path={`/projects/:projectDID/bonds/:bondDID/payments`}>
          <SingleNav to={`/projects/${did}/bonds/${bondDid}/payments`} light={light ? 1 : 0}>
            Payments
            <RightIcon />
          </SingleNav>
        </Route>
      </>
    )
  }

  return (
    <>
      <HeroContainer onlyTitle={onlyTitle} light={light ? 1 : 0}>
        <HeroInner className='detailed'>
          <div className='row'>
            <div className='col-sm-12'>
              {renderNavs()}
              <Title light={light ? 1 : 0}>{name}</Title>
              {!onlyTitle && (
                <>
                  <Description>{description}</Description>
                  <HeroInfoItemsWrapper>
                    <HeroInfoItem>
                      <CalendarSort fill='#A5ADB0' />
                      <span>{dateCreated.format('d MMM ‘YY')}</span>
                    </HeroInfoItem>
                    <HeroInfoItem>
                      <img alt='' src={creatorLogo} width='20px' height='20px' />
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
              )}
            </div>
          </div>
        </HeroInner>
        <HeaderTabs
          matchType={MatchType.strict}
          assistantPanelToggle={assistantPanelToggle}
          enableAssistantButton={enableAssistantButton}
          activeTabColor={entityTypeMap[type].themeColor}
          assistantFixed={assistantFixed}
        />
      </HeroContainer>
    </>
  )
}

export default EntityHero
