import React, { Dispatch, useState } from 'react'
import { Route, NavLink } from 'react-router-dom'
import AddPerson from 'assets/icons/AddPerson'
import Message from 'assets/icons/Message'
import Target from 'assets/icons/Target'
import Star from 'assets/icons/Star'
import Fuel from 'assets/icons/Fuel'
import Vote from 'assets/icons/Vote'
import ActionIcon from 'assets/icons/Actions'
import blocksyncApi from 'common/api/blocksync-api/blocksync-api'
import keysafe from 'common/keysafe/keysafe'
import { Widget } from '../types'
import { ControlPanelSection } from '../ControlPanel.styles'
import { ActionLinksWrapper } from './Actions.styles'
import FuelEntity from 'modules/Entities/FuelEntity/FuelEntity.container'
import { SummaryContainerConnected } from 'modules/EntityClaims/SubmitEntityClaim/SubmitEntityClaimFinal/SubmitEntityClaimFinal.container'
import Tooltip from '../../Tooltip/Tooltip'
import { InstructionsContainerConnected } from 'modules/EntityClaims/SubmitEntityClaim/SubmitEntityClaimInstructions/SubmitEntityClaimInstructions.container'
import CreateAgentContainer from 'modules/Entities/SelectedEntity/EntityImpact/EntityAgents/CreateAgent/CreateAgent.container'
import Down from 'assets/icons/Down'
import ShowAssistantPanel from './ShowAssistantPanel'
import { AgentRole } from 'modules/Account/types'
import { updateProjectStatusToStarted } from 'modules/Entities/SelectedEntity/SelectedEntity.actions'
import { connect } from 'react-redux'
import { RootState } from 'common/redux/types'
import { toggleAssistant } from 'modules/Account/Account.actions'
import * as entitySelectors from 'modules/Entities/SelectedEntity/SelectedEntity.selectors'
import { ToogleAssistantPayload } from 'modules/Account/types'
import { PDS_URL } from 'modules/Entities/types'
import * as accountSelectors from 'modules/Account/Account.selectors'
import Axios from 'axios'
import * as Toast from 'common/utils/Toast'
import { sortObject } from 'common/utils/transformationUtils'
import * as base58 from 'bs58'
import { UserInfo } from 'modules/Account/types'
import { ModalWrapper } from 'common/components/Wrappers/ModalWrapper'
import { getUIXOAmount } from 'common/utils/currency.utils'
import ShowVoteAssistant from './ShowVoteAssistant'
import DelegateModal from './DelegateModal'

interface IconTypes {
  [key: string]: any
}

const icons: IconTypes = {
  AddPerson,
  Message,
  Target,
  Star,
  Fuel,
  Vote,
}

interface Props {
  userDid: string
  entityDid: string
  bondDid?: string
  widget: Widget
  showMore: boolean
  userAddress?: string
  userAccountNumber?: string
  userSequence?: string
  userInfo?: UserInfo
  toggleShowMore: () => void
  toggleAssistant?: (param: ToogleAssistantPayload) => void
  handleUpdateProjectStatusToStarted?: (projectDid: string) => void
}

const Actions: React.FunctionComponent<Props> = ({
  widget: { title, controls },
  userDid,
  entityDid,
  showMore,
  bondDid,
  userAddress,
  userAccountNumber,
  userSequence,
  userInfo,
  toggleShowMore,
  toggleAssistant,
  handleUpdateProjectStatusToStarted,
}) => {
  const [delegateModalOpen, setDelegateModalOpen] = useState(false)

  const visibleControls = controls.filter(
    (control) => !(control.permissions[0].role === 'user' && !userDid),
  )

  const handleDelegate = (
    amount: number,
    validatorAddress: string,
    network: string,
  ) => {
    const payload = {
      msgs: [
        {
          type: 'cosmos-sdk/MsgDelegate',
          value: {
            amount: {
              amount: getUIXOAmount(String(amount)),
              denom: 'uixo',
            },
            delegator_address: userAddress,
            validator_address: validatorAddress,
          },
        },
      ],
      chain_id: network,
      fee: {
        amount: [{ amount: String(5000), denom: 'uixo' }],
        gas: String(200000),
      },
      memo: '',
      account_number: String(userAccountNumber),
      sequence: String(userSequence),
    }
    const pubKey = base58.decode(userInfo.didDoc.pubKey).toString('base64')

    const url =
      network === 'pandora-4'
        ? process.env.REACT_APP_GAIA_URL
        : 'https://impacthub.ixo.world'

    keysafe.requestSigning(
      JSON.stringify(sortObject(payload)),
      (error: any, signature: any) => {
        Axios.post(`${url}/txs`, {
          tx: {
            msg: payload.msgs,
            fee: payload.fee,
            signatures: [
              {
                account_number: payload.account_number,
                sequence: payload.sequence,
                signature: signature.signatureValue,
                pub_key: {
                  type: 'tendermint/PubKeyEd25519',
                  value: pubKey,
                },
              },
            ],
            memo: '',
          },
          mode: 'sync',
        }).then((response) => {
          if (response.data.txhash) {
            Toast.successToast(`Successfully funded`)
            setDelegateModalOpen(false)
            return
          }

          Toast.errorToast(`Invalid account id or wallet address`)
        })
      },
      'base64',
    )
  }

  const handleRenderControl = (control: any): JSX.Element => {
    const intent = control.parameters.find((param) => param?.name === 'intent')
      ?.value

    const to = `/projects/${entityDid}/overview/action/${intent}`

    const interceptNavClick = (e: any): void => {
      const projectDid = entityDid
      const ProjectDIDPayload: Record<string, any> = {
        projectDid: projectDid,
      }

      switch (intent) {
        case 'get_claim':
          keysafe.requestSigning(
            JSON.stringify(ProjectDIDPayload),
            async (error, signature) => {
              if (!error) {
                await blocksyncApi.claim
                  .listClaimsForProject(ProjectDIDPayload, signature, PDS_URL)
                  .then((response: any) => {
                    const wnd = window.open('about:blank', '', '_blank')
                    wnd.document.write(JSON.stringify(response))
                  })
              }
            },
            'base64',
          )

          e.preventDefault()
          return
        case 'update_status':
          handleUpdateProjectStatusToStarted(entityDid)
          break
        case 'delegate':
          setDelegateModalOpen(true)
          return
      }
      if (window.location.pathname.startsWith(to)) {
        e.preventDefault()
      }
    }

    if (control['@id'] === 'actionVote') {
      if (!bondDid) {
        return null
      }
    }

    return (
      <Tooltip text={control.tooltip} key={control['@id']}>
        <NavLink to={to} onClick={interceptNavClick}>
          {React.createElement(icons[control.icon], {
            fill: control.iconColor,
          })}
          {control.title}
        </NavLink>
      </Tooltip>
    )
  }

  return (
    <>
      <Route
        exact
        path={`/projects/:projectDID/overview/action/fuel_my_entity`}
      >
        <FuelEntity assistantPanelToggle={toggleAssistant} />
      </Route>
      <Route
        exact
        path="/projects/:projectDID/overview/action/new_claim/summary"
        component={SummaryContainerConnected}
      />
      <Route
        exact
        path={`/projects/:projectDID/overview/action/new_claim`}
        component={InstructionsContainerConnected}
      />
      <Route exact path={`/projects/:projectDID/overview/action/join`}>
        <CreateAgentContainer role={AgentRole.ServiceProvider} />
      </Route>
      <Route exact path={`/projects/:projectDID/overview/action/evaluator`}>
        <CreateAgentContainer role={AgentRole.Evaluator} />
      </Route>

      <Route exact path={`/projects/:projectDID/overview/action/help`}>
        <ShowAssistantPanel assistantPanelToggle={toggleAssistant} />
      </Route>
      <Route exact path={`/projects/:projectDID/overview/action/oracle`}>
        <ShowAssistantPanel assistantPanelToggle={toggleAssistant} />
      </Route>
      <Route exact path={`/projects/:projectDID/overview/action/rate`}>
        <ShowAssistantPanel assistantPanelToggle={toggleAssistant} />
      </Route>
      <Route
        exact
        path={`/projects/:projectDID/overview/action/relayer_vote`}
        component={ShowVoteAssistant}
      />
      <ControlPanelSection key={title}>
        <h4>
          <div className="heading-icon">
            <ActionIcon />
          </div>
          {title}
          {visibleControls.length > 4 && (
            <div
              onClick={toggleShowMore}
              className={`arrow-icon ${showMore ? 'active' : ''}`}
            >
              <Down width="16" fill="#A5ADB0" />
            </div>
          )}
        </h4>
        <ActionLinksWrapper>
          {visibleControls.slice(0, 4)?.map(handleRenderControl)}
        </ActionLinksWrapper>
        <div className={`show-more-container ${showMore ? 'show' : ''}`}>
          <ActionLinksWrapper>
            {visibleControls.slice(4)?.map(handleRenderControl)}
          </ActionLinksWrapper>
        </div>
      </ControlPanelSection>
      <ModalWrapper
        isModalOpen={delegateModalOpen}
        handleToggleModal={(): void => setDelegateModalOpen(false)}
      >
        <DelegateModal handleDelegate={handleDelegate} />
      </ModalWrapper>
    </>
  )
}

const mapStateToProps = (state: RootState): any => ({
  userInfo: accountSelectors.selectUserInfo(state),
  userAddress: accountSelectors.selectUserAddress(state),
  userAccountNumber: accountSelectors.selectUserAccountNumber(state),
  userSequence: accountSelectors.selectUserSequence(state),
  bondDid: entitySelectors.selectEntityBondDid(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleUpdateProjectStatusToStarted: (projectDid: string): void =>
    dispatch(updateProjectStatusToStarted(projectDid)),
  toggleAssistant: (param: ToogleAssistantPayload): void =>
    dispatch(toggleAssistant(param)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Actions)
