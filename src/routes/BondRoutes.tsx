import React, { useEffect, Dispatch, useMemo } from 'react'
import { Redirect, Route, RouteComponentProps, withRouter } from 'react-router-dom'
import { Overview } from 'pages/bond/overview'
import { Outcomes } from 'pages/bond/outcomes'
import ProjectAgents from 'components/project/agents/ProjectAgents'
import Dashboard from 'common/components/Dashboard/Dashboard'
import { clearBond, getBondDetail } from 'modules/BondModules/bond/bond.actions'
import * as bondSelectors from 'modules/BondModules/bond/bond.selectors'
import { connect, useDispatch, useSelector } from 'react-redux'
import { RootState } from 'common/redux/types'
import { Spinner } from 'common/components/Spinner'
import * as entitySelectors from 'modules/Entities/SelectedEntity/SelectedEntity.selectors'
import { selectEntityConfig } from 'modules/Entities/EntitiesExplorer/EntitiesExplorer.selectors'
import EditEntity from 'modules/Entities/SelectedEntity/EntityEdit/EditEntity.container'
import EntityClaims from 'modules/Entities/SelectedEntity/EntityImpact/EntityClaims/EntityClaims.container'
import EvaluateClaim from 'modules/Entities/SelectedEntity/EntityImpact/EvaluateClaim/EvaluateClaim.container'
import { AgentRole } from 'modules/Account/types'

interface Props extends RouteComponentProps {
  match: any
  bondName: string
  entityName: string
  entityDid: string
  entityType: string
  bondDid: string
  investmentDid: string
  handleGetBond: (bondDid: string) => void
}

export const BondRoutes: React.FunctionComponent<Props> = ({
  match,
  bondName,
  bondDid,
  entityName,
  entityDid,
  entityType,
  handleGetBond,
}) => {
  const dispatch = useDispatch()
  const entityTypeMap = useSelector(selectEntityConfig)
  const userRole = useSelector(entitySelectors.selectUserRole)
  const canShowSettings = useMemo(() => userRole === AgentRole.Owner, [userRole])
  const canShowAgents = useMemo(() => userRole === AgentRole.Owner, [userRole])
  const canShowClaims = useMemo(
    () =>
      userRole === AgentRole.Owner ||
      userRole === AgentRole.Investor ||
      userRole === AgentRole.ServiceProvider ||
      userRole === AgentRole.Evaluator,
    [userRole],
  )

  useEffect(() => {
    handleGetBond(bondDid)
    return (): void => {
      dispatch(clearBond())
    }
    // eslint-disable-next-line
  }, [bondDid])

  if (bondName) {
    const baseRoutes = [
      {
        url: `/entities/select?type=${entityType}&sector=all`,
        icon: '',
        sdg: `Explore ${entityType}s`,
        tooltip: '',
      },
      {
        url: `/projects/${entityDid}/overview`,
        icon: '',
        sdg: entityName,
        tooltip: '',
      },
      {
        url: window.location.pathname,
        icon: '',
        sdg: `DASHBOARD`,
        tooltip: '',
      },
    ]

    const routes = [
      {
        url: `${match.url}/overview`,
        icon: require('assets/img/sidebar/global.svg'),
        sdg: 'overview',
        tooltip: 'Overview',
      },
      {
        url: `${match.url}/outcomes`,
        icon: require('assets/img/sidebar/outcomes.svg'),
        sdg: 'outcomes',
        tooltip: 'OUTCOMES',
      },
      {
        url: `${match.url}/agents`,
        icon: require('assets/img/sidebar/profile.svg'),
        sdg: 'agents',
        tooltip: 'AGENTS',
        disable: !canShowAgents,
      },
      {
        url: `${match.url}/claims`,
        icon: require('assets/img/sidebar/claim.svg'),
        sdg: 'claims',
        tooltip: 'CLAIMS',
        disable: !canShowClaims,
      },
      {
        url: `${match.url}/edit/${entityType}`,
        icon: require('assets/img/sidebar/settings.svg'),
        sdg: 'settings',
        tooltip: 'SETTINGS',
        strict: true,
        disable: !canShowSettings,
      },
    ]

    const tabs = [
      {
        iconClass: `icon-${entityType.toLowerCase()}`,
        linkClass: null,
        path: `/projects/${entityDid}/overview`,
        title: entityTypeMap[entityType].title,
        tooltip: `View ${entityType} Page`,
      } as any,
    ]

    tabs.push({
      iconClass: 'icon-dashboard',
      linkClass: 'in-active',
      path: `/projects/${entityDid}/bonds/${bondDid}`,
      title: 'DASHBOARD',
      tooltip: `${entityType} Management`,
    })

    // const fundingTabUrl =
    //   entityType === EntityType.Investment
    //     ? `/projects/${entityDid}/bonds/${bondDid}`
    //     : `/projects/${entityDid}/bonds/${bondDid}/accounts`
    const fundingTabUrl = `/projects/${entityDid}/funding`

    if (bondDid) {
      tabs.push({
        iconClass: 'icon-funding',
        linkClass: '',
        path: fundingTabUrl,
        title: 'FUNDING',
        tooltip: `${entityType} Funding`,
      })
    } else {
      tabs.push({
        iconClass: 'icon-funding',
        linkClass: 'restricted',
        path: fundingTabUrl,
        title: 'FUNDING',
        tooltip: `${entityType} Funding`,
      })
    }

    const pathname = window.location.pathname
    const theme = pathname.includes(`/detail/claims`) ? 'light' : 'dark'

    return (
      <Dashboard
        theme={theme}
        title={entityName}
        subRoutes={routes}
        baseRoutes={baseRoutes}
        tabs={tabs}
        entityType={entityType}
      >
        <Route exact path={`/projects/:projectDID/bonds/:bondDID/detail`}>
          <Redirect to={`${match.url}/overview`} />
        </Route>
        <Route exact path={`/projects/:projectDID/bonds/:bondDID/detail/overview`} component={Overview} />
        <Route exact path={`/projects/:projectDID/bonds/:bondDID/detail/outcomes`} component={Outcomes} />
        <Route exact path={`/projects/:projectDID/bonds/:bondDID/detail/agents`} component={ProjectAgents} />
        <Route exact path={`/projects/:projectDID/bonds/:bondDID/detail/claims`} component={EntityClaims} />
        <Route exact path={`/projects/:projectDID/bonds/:bondDID/detail/claims/:claimId`} component={EvaluateClaim} />
        <Route path={`/projects/:projectDID/bonds/:bondDID/detail/edit/:entityType`} component={EditEntity} />
      </Dashboard>
    )
  }

  return <Spinner info='Loading Bond...' />
}

const mapStateToProps = (state: RootState): any => ({
  bondName: bondSelectors.selectBondName(state),
  entityName: entitySelectors.selectEntityName(state),
  entityDid: entitySelectors.selectEntityDid(state),
  entityType: entitySelectors.selectEntityType(state),
  bondDid: entitySelectors.selectEntityBondDid(state),
  entityCreatorDid: entitySelectors.selectEntityCreator(state),
  investmentDid: entitySelectors.selectEntityInvestmentDid(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleGetBond: (bondDid: string): void => dispatch(getBondDetail(bondDid)),
})

const BondsWrapperConnected = withRouter(connect(mapStateToProps, mapDispatchToProps)(BondRoutes)) as any

export default BondsWrapperConnected
