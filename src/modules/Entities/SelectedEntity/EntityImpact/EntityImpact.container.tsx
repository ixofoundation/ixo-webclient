import { Moment } from 'moment'
import React, { Dispatch } from 'react'
import { connect } from 'react-redux'
import { RootState } from 'common/redux/types'
import { Agent, EntityType, EntityTypeStrategyMap } from '../../types'
import * as entitySelectors from '../SelectedEntity.selectors'
import * as accountSelectors from 'modules/Account/Account.selectors'
import { getEntity } from '../SelectedEntity.actions'
import * as entityUtils from '../../Entities.utils'
import { AgentRole } from 'modules/Account/types'
import { Spinner } from 'common/components/Spinner'
import { Redirect, Route } from 'react-router-dom'
import EntityImpactOverview from './Overview/Overview.container'
import EntityAgents from './EntityAgents/EntityAgents.container'
import ProjectAgents from 'components/project/agents/ProjectAgents'
import EntityClaims from './EntityClaims/EntityClaims.container'
import EvaluateClaim from './EvaluateClaim/EvaluateClaim.container'
import EntityToc from './EntityToc/EntityToc.container'
import { getClaimTemplate } from 'modules/EntityClaims/SubmitEntityClaim/SubmitEntityClaim.actions'
import * as submitEntityClaimSelectors from 'modules/EntityClaims/SubmitEntityClaim/SubmitEntityClaim.selectors'
// import { EntityClaimType } from 'modules/EntityClaims/types'
import Dashboard from 'common/components/Dashboard/Dashboard'
import EntityAnalytics from './Analytics/Analytics.container'
import VotingBond from './VotingBond/VotingBond.container'
// import Events from './Events/Events.container'
import EditEntity from '../EntityEdit/EditEntity.container'
import { fetchExistingEntity } from '../EntityEdit/EditTemplate/EditTemplate.action'
import { newEntity } from '../EntityEdit/EditEntity.actions'
import { selectEntityConfig } from 'modules/Entities/EntitiesExplorer/EntitiesExplorer.selectors'

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
  entityTypeMap: EntityTypeStrategyMap
  handleGetEntity: (did: string) => void
  handleNewEntity: (entityType: EntityType, forceNew: boolean) => void
  handleFetchExistingEntity: (did: string) => void,
  ddoTags?: any[]
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
      type,
      handleGetEntity,
      handleNewEntity,
      handleFetchExistingEntity
    } = this.props

    await handleNewEntity(type as EntityType, false)
    await handleFetchExistingEntity(did)
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
        title: this.props.entityTypeMap[type].plural,
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
      ddoTags
    } = this.props

    if (isLoading || isClaimTemplateLoading) {
      return <Spinner info="Loading Dashboard..." />
    }

    // const hasToc = EntityClaimType.TheoryOfChange === claimTemplateType
    const hasToc = "Theory Of Change" === claimTemplateType
    const showAgentLinks = entityUtils.isUserInRolesOfEntity(
      userDid,
      creatorDid,
      agents,
      [AgentRole.Owner],
    )

    const canStakeToVote = 
    ddoTags
      .find((ddoTag) => ddoTag.category === 'Project Type')
      ?.tags.some((tag) => tag === 'Candidate') &&
    ddoTags
      .find((ddoTag) => ddoTag.category === 'Stage')
      ?.tags.some((tag) => tag === 'Selection') &&
    ddoTags
      .find((ddoTag) => ddoTag.category === 'Sector')
      ?.tags.some((tag) => tag === 'Campaign')

    const routes = []
    routes.push({
      url: `/projects/${did}/detail`,
      icon: require('assets/img/sidebar/global.svg'),
      sdg: 'Dashboard',
      tooltip: 'Overview',
    })

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

    // debug-elite comment outed by elite 2021-1209 start
    // routes.push({
    //   url: `/projects/${did}/detail/events`,
    //   icon: require('assets/img/sidebar/events.svg'),
    //   sdg: 'Events',
    //   tooltip: `${type} Events`,
    // })
    // debug-elite comment outed by elite 2021-1209 end

    if (bondDid && canStakeToVote) {
      routes.push({
        url: `/projects/${did}/detail/voting`,
        icon: require('assets/img/sidebar/voting.svg'),
        sdg: 'Voting',
        tooltip: 'Voting Bond',
      })
    }

    if (bondDid && !canStakeToVote) {
      routes.push({
        url: `/projects/${did}/bonds/${bondDid}/detail`,
        icon: require('assets/img/sidebar/investment_icon.svg'),
        sdg: 'Investment',
        tooltip: 'Investment',
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
    if (userDid === creatorDid) {
      routes.push({
        url: `/projects/${did}/detail/${type.toLowerCase()}/edit`,
        icon: require('assets/img/sidebar/settings.svg'),
        sdg: 'Settings',
        tooltip: 'Settings',
        strict: true,
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

        {/* debug-elite comment outed by elite 2021-1209 start */}
        {/*
          <Route
          path={`/projects/:projectDID/detail/events`}
          component={Events}
          /> 
        */}
        {/* debug-elite comment outed by elite 2021-1209 end */}

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
        <Route exact path="/projects/:projectDID/detail/voting_bond">
          <Redirect to={`/projects/${did}/detail/voting`} />
        </Route>
        <Route
          path={`/projects/:projectDID/detail/:entityType/edit`}
          component={EditEntity}
        />
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
  entityTypeMap: selectEntityConfig(state),
  ddoTags: entitySelectors.selectEntityDdoTags(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleGetEntity: (did: string): void => dispatch(getEntity(did)),
  handleGetClaimTemplate: (templateDid): void =>
    dispatch(getClaimTemplate(templateDid)),
    handleNewEntity: (entityType: EntityType, forceNew: boolean): void =>
    dispatch(newEntity(entityType, forceNew)),
  handleFetchExistingEntity: (did: string): void => dispatch(fetchExistingEntity(did))
})

export default connect(mapStateToProps, mapDispatchToProps)(EntityImpact)
