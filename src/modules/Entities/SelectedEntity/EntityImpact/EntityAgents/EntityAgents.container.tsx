import { Spinner } from 'common/components/Spinner'
import React, { Dispatch } from 'react'
import { connect } from 'react-redux'
import { EntityAgent } from './types'
import ManageAgents from './components/MangeAgents/ManageAgents'
import { Loading } from '../EntityImpact.styles'
import { RootState } from 'common/redux/types'
import { getEntityAgents } from './EntityAgents.actions'
import * as entityAgentSelectors from './EntityAgents.selectors'
import { AgentRole } from 'modules/Account/types'
import { agentRoleMap } from 'modules/Account/strategy-map'
import EntityImpactLayout from '../EntityImpact.container'

interface Props {
  match: any
  location: any
  isFetching: boolean
  fetchError: string
  agents: EntityAgent[]
  handleGetEntityAgents: (entityDid: string, role: string) => void
}

const mapPathToRole = {
  'service-providers': [AgentRole.ServiceProvider],
  'investors': [AgentRole.Investor],
  'evaluators': [AgentRole.Evaluator],
}

class Agents extends React.Component<Props> {
  role: AgentRole

  componentDidMount(): void {
    const {
      match: {
        params: { projectDID: entityDid },
        path,
      },
      handleGetEntityAgents,
    } = this.props

    this.role =
      mapPathToRole[path.substring(path.lastIndexOf('/') + 1, path.length)]

    handleGetEntityAgents(entityDid, this.role)
  }

  render(): JSX.Element {
    const { match, isFetching, fetchError, agents } = this.props

    if (isFetching) {
      return <EntityImpactLayout match={match}>
        <Spinner info={`Loading Agents...`} />
      </EntityImpactLayout>
    }

    if (fetchError) {
      return (<EntityImpactLayout match={match}>
        <Loading className="container-fluid">
          <p>An error occurred: {fetchError}</p>
        </Loading>
      </EntityImpactLayout>)
    }

    const agentsForRole = agents
      ? Object.values(agents).filter((agent) => agent.role === this.role)
      : []

    if (agentsForRole.length > 0) {
      return (<EntityImpactLayout match={match}>
        <ManageAgents
          role={this.role}
          agents={agentsForRole}
          handleUpdateAgentStatus={(): void => null}
        />
      </EntityImpactLayout>)
    }

    return (<EntityImpactLayout match={match}>
      <Loading className="container-fluid">
        <p>
          There are currently no recorded {agentRoleMap[this.role].plural} on
          this project. <br />
          Check back soon or get involved yourself.
        </p>
      </Loading>
    </EntityImpactLayout>)
  }
}

const mapStateToProps = (state: RootState): any => ({
  isFetching: entityAgentSelectors.selectIsFetching(state),
  fetchError: entityAgentSelectors.selectFetchError(state),
  agents: entityAgentSelectors.selectEntityAgents(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleGetEntityAgents: (entityDid: string, role: AgentRole): void =>
    dispatch(getEntityAgents(entityDid, role)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Agents)
