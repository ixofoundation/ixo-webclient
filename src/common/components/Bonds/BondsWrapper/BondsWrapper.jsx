import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { animated } from 'react-spring'
import {flowRight as compose} from 'lodash'
import './BondsWrapper.scss'
import AssistantContext from 'common/contexts/Assistant'
import FundingChat from 'modules/FundingChat/FundingChat.container'
import BondsSidebar from '../BondsSidebar/BondsSidebar'
import { Spinner } from '../../Spinner'
import { RootState } from '../../../redux/types'
import { getEntity } from 'modules/Entities/SelectedEntity/SelectedEntity.actions'
import EntityHero from 'modules/Entities/SelectedEntity/EntityHero/EntityHero'
import * as entitySelectors from 'modules/Entities/SelectedEntity/SelectedEntity.selectors'
import * as accountSelectors from 'modules/Account/Account.selectors'
import { useAssistant } from 'common/hooks'


export const BondsWrapper = ({
  match,
  isLoading,
  did,
  bondDid,
  children,
  handleGetEntity,
  ...props
}) => {
  useEffect(() => handleGetEntity(match.params.projectDID), [])

  const {assistantActive, toggleAssistant, resizeMain, resizeAssistant}
    = useAssistant(match.path.endsWith('/assistant'))

  return <>
    <AssistantContext.Provider value={{ active: assistantActive }}>
      <div style={{ display: 'flex', flex: 1 }}>
        <animated.div style={resizeMain}>
          {isLoading
            ? <Spinner info='Loading...' />

            : <div className='BondsWrapper'>
                <BondsSidebar projectDID={did} bondDID={bondDid} />

                <div className='pane'>
                  <EntityHero
                    did={did}
                    onlyTitle
                    assistantPanelToggle={toggleAssistant}
                    bondDid={bondDid}
                    {...props}
                  />

                  {children}
                </div>
              </div>}
        </animated.div>

        <animated.div style={resizeAssistant}>
          {assistantActive && (
            <FundingChat
              match={match}
              assistantPanelToggle={toggleAssistant}
            />
          )}
        </animated.div>
      </div>
    </AssistantContext.Provider>
  </>
}

const mapStateToProps = state => ({
  did: entitySelectors.selectEntityDid(state),
  name: entitySelectors.selectEntityName(state),
  bondDid: entitySelectors.selectEntityBondDid(state),
  type: entitySelectors.selectEntityType(state),
  dateCreated: entitySelectors.selectEntityDateCreated(state),
  creatorName: entitySelectors.selectEntityCreatorName(state),
  description: entitySelectors.selectEntityDescription(state),
  sdgs: entitySelectors.selectEntitySdgs(state),
  location: entitySelectors.selectEntityLocation(state),
  isLoading: entitySelectors.entityIsLoading(state),
  isLoggedIn: accountSelectors.selectUserIsLoggedIn(state),
})

const mapDispatchToProps = dispatch => ({
  handleGetEntity: did => dispatch(getEntity(did)),
})

export const BondsWrapperConnected =
  compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
  )(
    BondsWrapper
  )
