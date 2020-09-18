import { Moment } from 'moment'
import React, { Dispatch } from 'react'
import { connect } from 'react-redux'
import { RootState } from 'common/redux/types'
import { Agent, EntityType } from '../../types'
import EntityHero from '../EntityHero/EntityHero'
import SideBar from './components/SideBar/SideBar'
import { DetailContainer } from './EntityImpact.styles'
import * as entitySelectors from '../SelectedEntity.selectors'
import * as accountSelectors from 'modules/Account/Account.selectors'
import { getEntity } from '../SelectedEntity.actions'
import * as entityUtils from '../../Entities.utils'
import { AgentRole } from 'modules/Account/types'
import { Spinner } from 'common/components/Spinner'
import { Route } from 'react-router-dom'
import EntityImpactOverview from './Overview/Overview.container'
import EntityAgents from './EntityAgents/EntityAgents.container'

interface Props {
  match: any
  location: any
  type: EntityType
  did: string
  name: string
  description: string
  bondDid: string
  dateCreated: Moment
  ownerName: string
  sdgs: string[]
  userDid: string
  agents: Agent[]
  country: string
  creatorDid: string
  isLoggedIn: boolean
  isLoading: boolean
  handleGetEntity: (did: string) => void
}

class EntityImpact extends React.Component<Props> {
  componentDidMount(): void {
    const {
      match: {
        params: { projectDID: did },
      },
      handleGetEntity,
    } = this.props

    handleGetEntity(did)
  }

  render(): JSX.Element {
    const {
      match,
      location,
      did,
      type,
      name,
      description,
      bondDid,
      dateCreated,
      ownerName,
      sdgs,
      userDid,
      agents,
      country,
      creatorDid,
      isLoggedIn,
      isLoading,
    } = this.props

    if (isLoading) {
      return <Spinner info="Loading Dashboard..." />
    }

    return (
      <>
        <EntityHero
          type={type}
          did={did}
          bondDid={bondDid}
          name={name}
          description={description}
          dateCreated={dateCreated}
          ownerName={ownerName}
          location={country}
          sdgs={sdgs}
          loggedIn={isLoggedIn}
          onlyTitle={false}
        />
        <DetailContainer>
          <SideBar
            did={did}
            match={match}
            location={location}
            showAgentLinks={entityUtils.isUserInRolesOfEntity(
              userDid,
              creatorDid,
              agents,
              [AgentRole.Owner],
            )}
          />
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
        </DetailContainer>
      </>
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
  ownerName: entitySelectors.selectEntityOwnerName(state),
  bondDid: entitySelectors.selectEntityBondDid(state),
  country: entitySelectors.selectEntityLocation(state),
  sdgs: entitySelectors.selectEntitySdgs(state),
  isLoggedIn: accountSelectors.selectUserIsLoggedIn(state),
  isLoading: entitySelectors.entityIsLoading(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleGetEntity: (did: string): void => dispatch(getEntity(did)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EntityImpact)
