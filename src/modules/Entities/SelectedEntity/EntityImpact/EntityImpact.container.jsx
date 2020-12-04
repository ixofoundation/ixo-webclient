import { Moment } from 'moment'
import React from 'react'
import { connect } from 'react-redux'
import EntityHero from '../EntityHero/EntityHero'
import SideBar from './components/SideBar/SideBar'
import { DetailContainer, ContentContainer, EntityHeroContainer } from './EntityImpact.styles'
import * as entitySelectors from '../SelectedEntity.selectors'
import * as accountSelectors from 'modules/Account/Account.selectors'
import { getEntity } from '../SelectedEntity.actions'
import * as entityUtils from '../../Entities.utils'
import { AgentRole } from 'modules/Account/types'
import { Spinner } from 'common/components/Spinner'
import {Transition, animated} from 'react-spring/renderprops'
import FundingChat from 'modules/FundingChat/FundingChat.container'
import AssistantContext from 'common/contexts/Assistant'


class EntityImpact extends React.Component {
  state = {
    assistantPanelActive: false,
    width: '75%'
  }

  componentDidMount() {
    this.props.handleGetEntity(this.props.match.params.projectDID)
  }

  assistantPanelToggle = () => {
    const { assistantPanelActive } = this.state;

    this.setState({ assistantPanelActive: !assistantPanelActive })
    // Assistant panel shown
    if (!assistantPanelActive) {
      document.querySelector('body').classList.add('noScroll')
    } else {
      document.querySelector('body').classList.remove('noScroll')
    }
  }

  render() {
    const {
      match,
      children,
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
    } = this.props

    const { assistantPanelActive, width } = this.state;

    if (isLoading) {
      return <Spinner info="Loading Dashboard..." />
    }

    return (
      <AssistantContext.Provider value={{ active: assistantPanelActive }}>
          <DetailContainer>
            <div className="d-flex flex-grow-1" style={{ width }}>
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
              <ContentContainer>
                <EntityHeroContainer>
                  <EntityHero
                    type={type}
                    did={did}
                    name={name}
                    description={description}
                    dateCreated={dateCreated}
                    creatorName={creatorName}
                    location={country}
                    sdgs={sdgs}
                    isLoggedIn={isLoggedIn}
                    onlyTitle={true}
                    assistantPanelToggle={ this.assistantPanelToggle }
                  />
                </EntityHeroContainer>

                {children}
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

const mapStateToProps = state => ({
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
})

const mapDispatchToProps = dispatch => ({
  handleGetEntity: did => dispatch(getEntity(did)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EntityImpact)
