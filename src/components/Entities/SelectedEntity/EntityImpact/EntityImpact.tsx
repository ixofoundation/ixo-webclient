import { Moment } from 'moment'
import React, { Dispatch } from 'react'
import { connect } from 'react-redux'
import { RootState } from 'redux/store'
import { Agent, EntityType, EntityTypeStrategyMap } from 'types/entities'
import * as entitySelectors from 'redux/selectedEntity/selectedEntity.selectors'
import * as accountSelectors from 'redux/account/account.selectors'
import { getEntity } from 'redux/selectedEntity/selectedEntity.actions'
import * as entityUtils from 'utils/entities'
import { AgentRole } from 'redux/account/account.types'
import { Spinner } from 'components/Spinner/Spinner'
import { Redirect, Route } from 'react-router-dom'
import EntityImpactOverview from './Overview/Overview'
import EntityAgents from './EntityAgents/EntityAgents'
import ProjectAgents from 'components/Project/Agents/ProjectAgents'
import EntityClaims from './EntityClaims/EntityClaims'
import EvaluateClaim from './EvaluateClaim/EvaluateClaim'
import EntityToc from './EntityToc/EntityToc'
import { getClaimTemplate } from 'redux/submitEntityClaim/submitEntityClaim.actions'
import * as submitEntityClaimSelectors from 'redux/submitEntityClaim/submitEntityClaim.selectors'
// import { EntityClaimType } from 'modules/EntityClaims/types'
import Dashboard from 'components/Dashboard/Dashboard'
import EntityAnalytics from './Analytics/Analytics'
import VotingBond from './VotingBond/VotingBond'
// import Events from './Events/Events.container'
import EditEntity from '../EntityEdit/EditEntity'
import { fetchExistingEntity } from 'redux/editEntityTemplate/editTemplate.action'
import { newEntity } from 'redux/editEntity/editEntity.actions'
import { selectEntityConfig } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { requireCheckDefault } from 'utils/images'

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
  handleFetchExistingEntity: (did: string) => void
  ddoTags?: any[]
  investmentDid: string
}

class EntityImpact extends React.Component<Props> {
  state = {
    assistantPanelActive: false,
    width: '75%',
  }

  componentDidMount(): void {
    const {
      match: {
        params: { projectDID: did },
      },
      handleGetEntity,
    } = this.props

    handleGetEntity(did)
  }

  assistantPanelToggle = (): void => {
    const { assistantPanelActive } = this.state

    this.setState({ assistantPanelActive: !assistantPanelActive })
    // Assistant panel shown
    if (!assistantPanelActive) {
      document?.querySelector('body')?.classList?.add('overflow-hidden')
    } else {
      document?.querySelector('body')?.classList.remove('overflow-hidden')
    }
  }

  componentWillUnmount(): void {
    document?.querySelector('body')?.classList.remove('overflow-hidden')
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
      // isClaimTemplateLoading,
      claimTemplateType,
      analytics,
      bondDid,
      ddoTags,
      investmentDid,
    } = this.props

    // if (isLoading || isClaimTemplateLoading) {
    if (isLoading) {
      return <Spinner info='Loading Dashboard...' />
    }

    // const hasToc = EntityClaimType.TheoryOfChange === claimTemplateType
    const hasToc = 'Theory Of Change' === claimTemplateType
    const showAgentLinks = entityUtils.isUserInRolesOfEntity(userDid, creatorDid, agents, [AgentRole.Owner])
    const claimVisible = entityUtils.isUserInRolesOfEntity(userDid, creatorDid, agents, [
      AgentRole.Owner,
      AgentRole.ServiceProvider,
      AgentRole.Evaluator,
    ])

    const isLaunchpad = entityUtils.checkIsLaunchpadFromApiListedEntityData(ddoTags!)

    const routes = []
    routes.push({
      url: `/projects/${did}/detail/overview`,
      icon: requireCheckDefault(require('assets/img/sidebar/global.svg')),
      sdg: 'Dashboard',
      tooltip: 'Overview',
    })

    if (showAgentLinks) {
      routes.push({
        url: `/projects/${did}/detail/agents`,
        icon: requireCheckDefault(require('assets/img/sidebar/profile.svg')),
        sdg: 'Agents',
        tooltip: 'Agents',
      })
    }

    if (claimVisible) {
      routes.push({
        url: `/projects/${did}/detail/claims`,
        icon: requireCheckDefault(require('assets/img/sidebar/claim.svg')),
        sdg: 'Claims',
        tooltip: 'Claims',
      })
    }

    // debug-elite comment outed by elite 2021-1209 start
    // routes.push({
    //   url: `/projects/${did}/detail/events`,
    //   icon: requireCheckDefault(require('assets/img/sidebar/events.svg')),
    //   sdg: 'Events',
    //   tooltip: `${type} Events`,
    // })
    // debug-elite comment outed by elite 2021-1209 end

    if (bondDid && isLaunchpad) {
      routes.push({
        url: `/projects/${did}/voting`,
        icon: requireCheckDefault(require('assets/img/sidebar/voting.svg')),
        sdg: 'Voting',
        tooltip: 'Voting Bond',
      })
    }

    if (bondDid && !isLaunchpad) {
      routes.push({
        url: `/projects/${investmentDid}/overview`,
        icon: requireCheckDefault(require('assets/img/sidebar/investment_icon.svg')),
        sdg: 'Investment',
        tooltip: 'Investment',
      })
    }

    if (analytics.length) {
      routes.push({
        url: `/projects/${did}/detail/analytics`,
        icon: requireCheckDefault(require('assets/img/sidebar/analytics.svg')),
        sdg: 'Analytics',
        tooltip: 'Analytics',
      })
    }
    if (hasToc) {
      routes.push({
        url: `/projects/${did}/detail/toc`,
        icon: requireCheckDefault(require('assets/img/sidebar/toc.svg')),
        sdg: 'Theory of Change',
        tooltip: 'Theory of Change',
      })
    }
    if (userDid === creatorDid) {
      routes.push({
        url: `/projects/${did}/detail/${type.toLowerCase()}/edit`,
        icon: requireCheckDefault(require('assets/img/sidebar/settings.svg')),
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
      pathname.includes(`/projects/${did}/voting`) ||
      pathname.includes(`/projects/${did}/detail/events`)
        ? 'light'
        : 'dark'

    return (
      <Dashboard theme={theme} title={name} subRoutes={routes} baseRoutes={baseRoutes} entityType={type}>
        <Route exact path={`/projects/:projectDID/detail/overview`} component={EntityImpactOverview} />
        <Route exact path={[`/projects/:projectDID/detail/service-providers`]} component={EntityAgents} />
        <Route exact path={`/projects/:projectDID/detail/evaluators`} component={EntityAgents} />
        <Route exact path={`/projects/:projectDID/detail/investors`} component={EntityAgents} />
        {showAgentLinks && <Route exact path={`/projects/:projectDID/detail/agents`} component={ProjectAgents} />}
        <Route exact path={`/projects/:projectDID/detail/claims`} component={EntityClaims} />
        <Route exact path={`/projects/:projectDID/detail/claims/:claimId`} component={EvaluateClaim} />
        {!!bondDid && <Route path={`/projects/:projectDID/voting`} component={VotingBond} />}

        {/* debug-elite comment outed by elite 2021-1209 start */}
        {/*
          <Route
          path={`/projects/:projectDID/detail/events`}
          component={Events}
          />
        */}
        {/* debug-elite comment outed by elite 2021-1209 end */}

        {!!analytics.length && (
          <Route exact path={`/projects/:projectDID/detail/analytics`} component={EntityAnalytics} />
        )}
        {hasToc && <Route exact path={`/projects/:projectDID/detail/toc`} component={EntityToc} />}
        <Route exact path='/projects/:projectDID/detail'>
          <Redirect to={`/projects/${did}/detail/overview`} />
        </Route>
        <Route path={`/projects/:projectDID/detail/:entityType/edit`} component={EditEntity} />
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
  investmentDid: entitySelectors.selectEntityInvestmentDid(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleGetEntity: (did: string): void => dispatch(getEntity(did)),
  handleGetClaimTemplate: (templateDid: any): void => dispatch(getClaimTemplate(templateDid)),
  handleNewEntity: (entityType: EntityType, forceNew: boolean): void => dispatch(newEntity(entityType, forceNew)),
  handleFetchExistingEntity: (did: string): void => dispatch(fetchExistingEntity(did)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EntityImpact)
