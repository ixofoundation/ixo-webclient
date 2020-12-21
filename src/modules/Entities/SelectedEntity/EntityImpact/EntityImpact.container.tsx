import { Moment } from 'moment'
import React, { Dispatch } from 'react'
import { connect } from 'react-redux'
import { RootState } from 'common/redux/types'
import { Agent, EntityType } from '../../types'
import EntityHero from '../EntityHero/EntityHero'
import SideBar from './components/SideBar/SideBar'
import { DetailContainer, ContentContainer, EntityHeroContainer } from './EntityImpact.styles'
import * as entitySelectors from '../SelectedEntity.selectors'
import * as accountSelectors from 'modules/Account/Account.selectors'
import { getEntity } from '../SelectedEntity.actions'
import * as entityUtils from '../../Entities.utils'
import { AgentRole } from 'modules/Account/types'
import { Spinner } from 'common/components/Spinner'
import { Route, matchPath } from 'react-router-dom'
import EntityImpactOverview from './Overview/Overview.container'
import EntityAgents from './EntityAgents/EntityAgents.container'
import ProjectAgents from 'components/project/agents/ProjectAgents'
import {Transition, animated} from 'react-spring/renderprops'
import FundingChat from 'modules/FundingChat/FundingChat.container'
import AssistantContext from 'common/contexts/Assistant'
import EntityClaims from './EntityClaims/EntityClaims.container'
import EvaluateClaim from './EvaluateClaim/EvaluateClaim.container'
import EntityToc from './EntityToc/EntityToc.container'
import { getClaimTemplate } from 'modules/EntityClaims/SubmitEntityClaim/SubmitEntityClaim.actions'
import * as submitEntityClaimSelectors from 'modules/EntityClaims/SubmitEntityClaim/SubmitEntityClaim.selectors'
import { EntityClaimType } from 'modules/EntityClaims/types'


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
  handleGetEntity: (did: string) => void
}

class EntityImpact extends React.Component<Props> {
  state = {
    assistantPanelActive: false,
    width: '75%'
  }

  async componentDidMount() {
    const {
      match: {
        params: { projectDID: did },
      },
      claimTemplateId,
      handleGetEntity,
    } = this.props

    await handleGetEntity(did)
  }

  assistantPanelToggle = ():void => {
    const { assistantPanelActive } = this.state;

    this.setState({ assistantPanelActive: !assistantPanelActive })
    // Assistant panel shown
    if (!assistantPanelActive) {
      document?.querySelector('body')?.classList?.add('noScroll')
    } else {
      document?.querySelector('body')?.classList.remove('noScroll')
    }
  }

  componentWillUnmount() {
    document?.querySelector('body')?.classList.remove('noScroll')
  }

  render(): JSX.Element {
    const {
      match,
      location,
      did,
      type,
      name,
      description,
      dateCreated,
      creatorName,
      sdgs,
      userDid,
      agents,
      country,
      creatorDid,
      isLoggedIn,
      isLoading,
      isClaimTemplateLoading,
      claimTemplateType
    } = this.props

    const { assistantPanelActive, width } = this.state;

    if (isLoading || isClaimTemplateLoading) {
      return <Spinner info="Loading Dashboard..." />
    }

    const light = !!matchPath(location.pathname, '/projects/:projectDID/detail/claims')
    const hasToc = EntityClaimType.TheoryOfChange === claimTemplateType
    const showAgentLinks = entityUtils.isUserInRolesOfEntity(
      userDid,
      creatorDid,
      agents,
      [AgentRole.Owner],
    )

    return (
      <AssistantContext.Provider value={{ active: assistantPanelActive }}>
          <DetailContainer>
            <div className="d-flex flex-grow-1" style={{ width }}>
              <SideBar
                did={did}
                match={match}
                location={location}
                showAgentLinks={showAgentLinks}
                hasToc={ hasToc }
              />
              <ContentContainer>
                <EntityHeroContainer light={ light }>
                  <EntityHero
                    type={type}
                    did={did}
                    name={name}
                    description={description}
                    dateCreated={dateCreated}
                    creatorName={creatorName}
                    location={country}
                    sdgs={sdgs}
                    loggedIn={isLoggedIn}
                    onlyTitle={true}
                    assistantPanelToggle={ this.assistantPanelToggle }
                    light={ light }
                  />
                </EntityHeroContainer>
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
                {
                  showAgentLinks &&
                    <Route
                      exact
                      path={`/projects/:projectDID/detail/agents`}
                      component={ProjectAgents}
                    />
                }
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
                {
                  hasToc &&
                    <Route
                      exact
                      path={`/projects/:projectDID/detail/toc`}
                      component={ EntityToc }
                    />
                }
              </ContentContainer>
            </div>
            <Transition
              native
              unique
              items={assistantPanelActive}
              from={{ width: '0%' }}
              enter={{ width: '25%' }}
              leave={{ width: '0%' }}
            >
              {
                assistantPanelActive => assistantPanelActive && (props =>
                <animated.div style={{background: '#F0F3F9', zIndex: 8, ...props,  }}>
                  {
                    <FundingChat
                      match={match}
                      assistantPanelToggle={this.assistantPanelToggle}
                    />
                  }
                </animated.div>)
              }
            </Transition>
          </DetailContainer>
      </AssistantContext.Provider>
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
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleGetEntity: (did: string): void => dispatch(getEntity(did)),
  handleGetClaimTemplate: (templateDid): void =>
    dispatch(getClaimTemplate(templateDid)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EntityImpact)
