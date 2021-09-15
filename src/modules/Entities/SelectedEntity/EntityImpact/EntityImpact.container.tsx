import { Moment } from 'moment'
import React, { Dispatch } from 'react'
import { connect } from 'react-redux'
import { RootState } from 'common/redux/types'
import { Agent, EntityType } from '../../types'
import * as entitySelectors from '../SelectedEntity.selectors'
import * as accountSelectors from 'modules/Account/Account.selectors'
import { getEntity } from '../SelectedEntity.actions'
import * as entityUtils from '../../Entities.utils'
import { AgentRole } from 'modules/Account/types'
import { Spinner } from 'common/components/Spinner'
import { Route } from 'react-router-dom'
import EntityImpactOverview from './Overview/Overview.container'
import EntityAgents from './EntityAgents/EntityAgents.container'
import ProjectAgents from 'components/project/agents/ProjectAgents'
import EntityClaims from './EntityClaims/EntityClaims.container'
import EvaluateClaim from './EvaluateClaim/EvaluateClaim.container'
import EntityToc from './EntityToc/EntityToc.container'
import { getClaimTemplate } from 'modules/EntityClaims/SubmitEntityClaim/SubmitEntityClaim.actions'
import * as submitEntityClaimSelectors from 'modules/EntityClaims/SubmitEntityClaim/SubmitEntityClaim.selectors'
import { EntityClaimType } from 'modules/EntityClaims/types'
import Dashboard from 'common/components/Dashboard/Dashboard'
import { entityTypeMap } from 'modules/Entities/strategy-map'
import EntityAnalytics from './Analytics/Analytics.container'
import VotingBond from './VotingBond/VotingBond.container'
import Events from './Events/Events.container'

interface Props {
  match: any
  location: any
  type: EntityType
  did: string
  name: string
  description: string
  dateCreated: Moment
  creatorName: string
  sdgs: string[]
  userDid: string
  agents: Agent[]
  country: string
  creatorDid: string
  isLoggedIn: boolean
  isLoading: boolean
  claimTemplateId: string
  isClaimTemplateLoading: boolean
  claimTemplateType: string
  bondDid: string
  analytics: any[]
  handleGetEntity: (did: string) => void
}

class EntityImpact extends React.Component<Props> {
  state = {
    assistantPanelActive: false,
    width: '75%',
  }

  async componentDidMount(): Promise<any> {
    const {
      match: {
        params: { projectDID: did },
      },
      handleGetEntity,
    } = this.props

    await handleGetEntity(did)
  }

  assistantPanelToggle = (): void => {
    const { assistantPanelActive } = this.state

    this.setState({ assistantPanelActive: !assistantPanelActive })
    // Assistant panel shown
    if (!assistantPanelActive) {
      document?.querySelector('body')?.classList?.add('noScroll')
    } else {
      document?.querySelector('body')?.classList.remove('noScroll')
    }
  }

  componentWillUnmount(): void {
    document?.querySelector('body')?.classList.remove('noScroll')
  }

  getTabButtons(): any[] {
    const { did, type, creatorDid, isLoggedIn, bondDid, userDid } = this.props

    const tabs = [
      {
        iconClass: `icon-${type.toLowerCase()}`,
        linkClass: null,
        path: `/`,
        title: entityTypeMap[type].plural,
        tooltip: `Explorer all ${type}`,
      },
    ]

    if (type === EntityType.Project) {
      tabs.push({
        iconClass: 'icon-dashboard',
        linkClass: null,
        path: `/projects/${did}/detail`,
        title: 'DASHBOARD',
        tooltip: `${type} Management`,
      })
    } else {
      tabs.push({
        iconClass: 'icon-dashboard',
        linkClass: 'in-active',
        path: '/performace',
        title: 'DASHBOARD',
        tooltip: `${type} Management`,
      })
    }

    if (bondDid) {
      if (isLoggedIn) {
        tabs.push({
          iconClass: 'icon-funding',
          linkClass: '',
          path: `/projects/${did}/bonds/${bondDid}`,
          title: 'FUNDING',
          tooltip: `${type} Funding`,
        })
      } else {
        if (creatorDid !== userDid) {
          tabs.push({
            iconClass: 'icon-funding',
            linkClass: 'restricted',
            path: `/projects/${did}/bonds/${bondDid}`,
            title: 'FUNDING',
            tooltip: `${type} Funding`,
          })
        } else {
          tabs.push({
            iconClass: 'icon-funding',
            linkClass: '',
            path: `/projects/${did}/bonds/${bondDid}`,
            title: 'FUNDING',
            tooltip: `${type} Funding`,
          })
        }
      }
    } else {
      tabs.push({
        iconClass: 'icon-funding',
        linkClass: 'restricted',
        path: `/projects/${did}/bonds/${bondDid}`,
        title: 'FUNDING',
        tooltip: `${type} Funding`,
      })
    }

    return tabs
  }

  render(): JSX.Element {
    const {
      did,
      type,
      name,
      userDid,
      agents,
      creatorDid,
      isLoading,
      isClaimTemplateLoading,
      claimTemplateType,
      analytics,
      bondDid,
    } = this.props

    if (isLoading || isClaimTemplateLoading) {
      return <Spinner info="Loading Dashboard..." />
    }

    const hasToc = EntityClaimType.TheoryOfChange === claimTemplateType
    const showAgentLinks = entityUtils.isUserInRolesOfEntity(
      userDid,
      creatorDid,
      agents,
      [AgentRole.Owner],
    )
    const routes = [
      {
        url: `/projects/${did}/detail`,
        icon: require('assets/img/sidebar/global.svg'),
        sdg: 'Dashboard',
        tooltip: 'Overview',
      },
    ]
    if (showAgentLinks) {
      routes.push({
        url: `/projects/${did}/detail/agents`,
        icon: require('assets/img/sidebar/profile.svg'),
        sdg: 'Agents',
        tooltip: 'Agents',
      })
    }
    routes.push({
      url: `/projects/${did}/detail/claims`,
      icon: require('assets/img/sidebar/claim.svg'),
      sdg: 'Claims',
      tooltip: 'Claims',
    })

    routes.push({
      url: `/projects/${did}/detail/events`,
      icon: require('assets/img/sidebar/events.svg'),
      sdg: 'Events',
      tooltip: `${type} Events`,
    })

    if (bondDid) {
      routes.push({
        url: `/projects/${did}/detail/voting`,
        icon: require('assets/img/sidebar/voting.svg'),
        sdg: 'Voting',
        tooltip: 'Voting Bond',
      })
    }

    if (analytics.length) {
      routes.push({
        url: `/projects/${did}/detail/analytics`,
        icon: require('assets/img/sidebar/analytics.svg'),
        sdg: 'Analytics',
        tooltip: 'Analytics',
      })
    }
    if (hasToc) {
      routes.push({
        url: `/projects/${did}/detail/toc`,
        icon: require('assets/img/sidebar/toc.svg'),
        sdg: 'Theory of Change',
        tooltip: 'Theory of Change',
      })
    }

    const baseRoutes = [
      {
        url: `/`,
        icon: '',
        sdg: 'Explore Projects',
        tooltip: '',
      },
      {
        url: `/projects/${did}/overview`,
        icon: '',
        sdg: name,
        tooltip: '',
      },
    ]

    const pathname = window.location.pathname
    const theme =
      pathname.includes(`/projects/${did}/detail/claims`) ||
      pathname.includes(`/projects/${did}/detail/analytics`) ||
      pathname.includes(`/projects/${did}/detail/voting`) ||
      pathname.includes(`/projects/${did}/detail/events`)
        ? 'light'
        : 'dark'

    const tabs = this.getTabButtons()

    return (
      <Dashboard
        theme={theme}
        title={name}
        subRoutes={routes}
        baseRoutes={baseRoutes}
        tabs={tabs}
        entityType={type}
      >
        <Route
          exact
          path={`/projects/:projectDID/detail`}
          component={EntityImpactOverview}
        />
        <Route
          exact
          path={[`/projects/:projectDID/detail/service-providers`]}
          component={EntityAgents}
        />
        <Route
          exact
          path={`/projects/:projectDID/detail/evaluators`}
          component={EntityAgents}
        />
        <Route
          exact
          path={`/projects/:projectDID/detail/investors`}
          component={EntityAgents}
        />
        {showAgentLinks && (
          <Route
            exact
            path={`/projects/:projectDID/detail/agents`}
            component={ProjectAgents}
          />
        )}
        <Route
          exact
          path={`/projects/:projectDID/detail/claims`}
          component={EntityClaims}
        />
        <Route
          exact
          path={`/projects/:projectDID/detail/claims/:claimId`}
          component={EvaluateClaim}
        />
        {!!bondDid && (
          <Route
            path={`/projects/:projectDID/detail/voting`}
            component={VotingBond}
          />
        )}

        <Route
          path={`/projects/:projectDID/detail/events`}
          component={Events}
        />
        {!!analytics.length && (
          <Route
            exact
            path={`/projects/:projectDID/detail/analytics`}
            component={EntityAnalytics}
          />
        )}
        {hasToc && (
          <Route
            exact
            path={`/projects/:projectDID/detail/toc`}
            component={EntityToc}
          />
        )}
      </Dashboard>
    )
  }
}

const mapStateToProps = (state: RootState): any => ({
  did: entitySelectors.selectEntityDid(state),
  name: entitySelectors.selectEntityName(state),
  userDid: accountSelectors.selectUserDid(state),
  agents: entitySelectors.selectEntityAgents(state),
  description: entitySelectors.selectEntityDescription(state),
  type: entitySelectors.selectEntityType(state),
  creatorDid: entitySelectors.selectEntityCreator(state),
  dateCreated: entitySelectors.selectEntityDateCreated(state),
  creatorName: entitySelectors.selectEntityCreatorName(state),
  country: entitySelectors.selectEntityLocation(state),
  sdgs: entitySelectors.selectEntitySdgs(state),
  isLoggedIn: accountSelectors.selectUserIsLoggedIn(state),
  isLoading: entitySelectors.entityIsLoading(state),
  claimTemplateId: entitySelectors.selectEntityClaimTemplateId(state),
  isClaimTemplateLoading: submitEntityClaimSelectors.selectIsLoading(state),
  claimTemplateType: submitEntityClaimSelectors.selectClaimType(state),
  bondDid: entitySelectors.selectEntityBondDid(state),
  analytics: entitySelectors.selectEntityAnalytics(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleGetEntity: (did: string): void => dispatch(getEntity(did)),
  handleGetClaimTemplate: (templateDid): void =>
    dispatch(getClaimTemplate(templateDid)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EntityImpact)
