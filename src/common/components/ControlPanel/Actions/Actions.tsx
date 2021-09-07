import React, { Dispatch, useState, useCallback, useEffect } from 'react'
import Long from 'long'
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
import * as keplr from 'common/utils/keplr'
import { sortObject } from 'common/utils/transformationUtils'
import * as base58 from 'bs58'
import { UserInfo } from 'modules/Account/types'
import { ModalWrapper } from 'common/components/Wrappers/ModalWrapper'
import { getUIXOAmount } from 'common/utils/currency.utils'
import DelegateModal from './DelegateModal'
import BuyModal from './BuyModal'
import SellModal from './SellModal'
import SubmitProposalModal from './SubmitProposalModal'
import DepositModal from './DepositModal'
import VoteModal from './VoteModal'
import SendModal from './SendModal'
import UpdateValidatorModal from './UpdateValidatorModal'
import { MsgDelegate } from 'cosmjs-types/cosmos/staking/v1beta1/tx'
import { MsgVote } from 'cosmjs-types/cosmos/gov/v1beta1/tx'

declare const window: any
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
  const [buyModalOpen, setBuyModalOpen] = useState(false)
  const [sellModalOpen, setSellModalOpen] = useState(false)
  const [proposalModalOpen, setProposalModalOpen] = useState(false)
  const [depositModalOpen, setDepositModalOpen] = useState(false)
  const [voteModalOpen, setVoteModalOpen] = useState(false)
  const [sendModalOpen, setSendModalOpen] = useState(false)
  const [editValidatorModalOpen, setEditValidatorModalOpen] = useState(false)
  const [canEditValidator, setCanEditValidator] = useState(false)

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_GAIA_URL}/staking/validators`).then(
      response => {
        setCanEditValidator(
          response.data.result.findIndex(
            validator => validator.operator_address === userAddress,
          ) !== -1,
        )
      },
    )
  })

  const visibleControls = controls.filter(
    control =>
      control.permissions[0].role !== 'user' || userDid || window.keplr,
  )

  const broadCastMessage = useCallback(
    msg => {
      const payload = {
        msgs: [msg],
        chain_id: process.env.REACT_APP_CHAIN_ID,
        fee: {
          amount: [{ amount: String(5000), denom: 'uixo' }],
          gas: String(200000),
        },
        memo: '',
        account_number: String(userAccountNumber),
        sequence: String(userSequence),
      }

      const pubKey = base58.decode(userInfo.didDoc.pubKey).toString('base64')

      keysafe.requestSigning(
        JSON.stringify(sortObject(payload)),
        (error: any, signature: any) => {
          Axios.post(`${process.env.REACT_APP_GAIA_URL}/txs`, {
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
          }).then(response => {
            if (response.data.txhash) {
              Toast.successToast(`Transaction Successful`)
              if (response.data.code === 4) {
                Toast.errorToast(`Transaction Failed`)
                return
              }

              return
            }

            Toast.errorToast(`Transaction Failed`)
          })
        },
        'base64',
      )
    },
    [userInfo, userSequence, userAccountNumber],
  )

  const handleDelegate = async (amount: number, validatorAddress: string) => {
    try {
      const [accounts, offlineSigner] = await keplr.connectAccount()
      const address = accounts[0].address
      const client = await keplr.initStargateClient(offlineSigner)

      const payload = {
        msgAny: {
          typeUrl: '/cosmos.staking.v1beta1.MsgDelegate',
          value: MsgDelegate.fromPartial({
            amount: {
              amount: getUIXOAmount(String(amount)),
              denom: 'uixo',
            },
            delegatorAddress: address,
            validatorAddress: validatorAddress,
          }),
        },
        chain_id: process.env.REACT_APP_CHAIN_ID,
        fee: {
          amount: [{ amount: String(5000), denom: 'uixo' }],
          gas: String(200000),
        },
        memo: '',
      }

      try {
        const result = await keplr.sendTransaction(client, address, payload)
        if (result) {
          Toast.successToast(`Transaction Successful`)
        } else {
          Toast.errorToast(`Transaction Failed`)
        }
      } catch (e) {
        Toast.errorToast(`Transaction Failed`)
        throw e
      }
    } catch (e) {
      if (!userDid) return
      const msg = {
        type: 'cosmos-sdk/MsgDelegate',
        value: {
          amount: {
            amount: getUIXOAmount(String(amount)),
            denom: 'uixo',
          },
          delegator_address: userAddress,
          validator_address: validatorAddress,
        },
      }

      broadCastMessage(msg)
    }
  }

  const handleBuy = (amount: number) => {
    const msg = {
      type: 'bonds/MsgBuy',
      value: {
        buyer_did: userDid,
        amount: {
          amount: getUIXOAmount(String(amount)),
          denom: 'uixo',
        },
        max_prices: [{ amount: String('1000000'), denom: 'uixo' }],
        bond_did: bondDid,
      },
    }

    broadCastMessage(msg)
  }

  const handleSell = (amount: number) => {
    const payload = {
      msgs: [
        {
          type: 'bonds/MsgSell',
          value: {
            seller_did: userDid,
            amount: {
              amount: getUIXOAmount(String(amount)),
              denom: 'uixo',
            },
            bond_did: bondDid,
          },
        },
      ],
      chain_id: process.env.REACT_APP_CHAIN_ID,
      fee: {
        amount: [{ amount: String(5000), denom: 'uixo' }],
        gas: String(200000),
      },
      memo: '',
      account_number: String(userAccountNumber),
      sequence: String(userSequence),
    }
    const pubKey = base58.decode(userInfo.didDoc.pubKey).toString('base64')

    keysafe.requestSigning(
      JSON.stringify(sortObject(payload)),
      (error: any, signature: any) => {
        Axios.post(`${process.env.REACT_APP_GAIA_URL}/txs`, {
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
        }).then(response => {
          if (response.data.txhash) {
            Toast.successToast(`Transaction Successful`)
            if (response.data.code === 4) {
              Toast.errorToast(`Transaction Failed`)
              return
            }
            setBuyModalOpen(false)
            return
          }

          Toast.errorToast(`Transaction Failed`)
        })
      },
      'base64',
    )
  }

  const handleWithdraw = () => {
    const msg = {
      type: 'bonds/MsgWithdrawShare',
      value: {
        recipient_did: userDid,
        bond_did: bondDid,
      },
    }

    broadCastMessage(msg)
  }

  const handleSend = (amount: number, receiverAddress: string) => {
    const msg = {
      type: 'cosmos-sdk/MsgSend',
      value: {
        amount: [
          {
            amount: getUIXOAmount(String(amount)),
            denom: 'uixo',
          },
        ],
        from_address: userAddress,
        to_address: receiverAddress,
      },
    }

    broadCastMessage(msg)
  }

  const handleSubmitProposal = (
    title: string,
    description: string,
    amount: number,
  ) => {
    const msg = {
      type: 'cosmos-sdk/MsgSubmitProposal',
      value: {
        content: {
          type: 'cosmos-sdk/ParameterChangeProposal',
          value: {
            title,
            description,
            changes: [
              {
                subspace: 'mint',
                key: 'InflationMax',
                value: '"0.200000000000000000"',
              },
              {
                subspace: 'mint',
                key: 'InflationMin',
                value: '"0.200000000000000000"',
              },
              {
                subspace: 'mint',
                key: 'InflationRateChange',
                value: '"0.000000000000000000"',
              },
            ],
          },
        },
        initial_deposit: [
          {
            amount: getUIXOAmount(String(amount)),
            denom: 'uixo',
          },
        ],
        proposer: userAddress,
      },
    }

    broadCastMessage(msg)
  }

  const handleDeposit = (amount: number, proposalId: string) => {
    const msg = {
      type: 'cosmos-sdk/MsgDeposit',
      value: {
        amount: [
          {
            amount: getUIXOAmount(String(amount)),
            denom: 'uixo',
          },
        ],
        depositor: userAddress,
        proposal_id: proposalId,
      },
    }

    broadCastMessage(msg)
  }

  const handleVote = async (proposalId: string, answer: number) => {
    try {
      const [accounts, offlineSigner] = await keplr.connectAccount()
      const address = accounts[0].address
      const client = await keplr.initStargateClient(offlineSigner)

      const payload = {
        msgAny: {
          typeUrl: '/cosmos.gov.v1beta1.MsgVote',
          value: MsgVote.fromPartial({
            proposalId: Long.fromString(proposalId),
            voter: address,
            option: answer,
          }),
        },
        chain_id: process.env.REACT_APP_CHAIN_ID,
        fee: {
          amount: [{ amount: String(5000), denom: 'uixo' }],
          gas: String(200000),
        },
        memo: '',
      }

      try {
        const result = await keplr.sendTransaction(client, address, payload)
        if (result) {
          Toast.successToast(`Transaction Successful`)
        } else {
          Toast.errorToast(`Transaction Failed`)
        }
      } catch (e) {
        Toast.errorToast(`Transaction Failed`)
        throw e
      }
    } catch (e) {
      if (!userDid) return
      const msg = {
        type: 'cosmos-sdk/MsgVote',
        value: {
          option: Number(answer),
          proposal_id: proposalId,
          voter: userAddress,
        },
      }

      broadCastMessage(msg)
    }
  }

  const handleUpdateValidator = (
    validatorAddress: string,
    moniker: string,
    identity: string,
    website: string,
    details: string,
    minDelegation: string,
    commissionRate: string,
  ) => {
    const msg = {
      type: 'cosmos-sdk/MsgEditValidator',
      value: {
        description: {
          moniker,
          identity,
          website,
          details,
        },
        validator_address: validatorAddress,
        commission_rate: String(commissionRate),
        min_self_delegation: String(minDelegation),
      },
    }

    broadCastMessage(msg)
  }

  const handleRenderControl = (control: any): JSX.Element => {
    const intent = control.parameters.find(param => param?.name === 'intent')
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
        case 'buy':
          setBuyModalOpen(true)
          return
        case 'withdraw':
          handleWithdraw()
          return
        case 'sell':
          setSellModalOpen(true)
          return
        case 'proposal':
          setProposalModalOpen(true)
          return
        case 'deposit':
          setDepositModalOpen(true)
          return
        case 'relayer_vote':
          setVoteModalOpen(true)
          return
        case 'send':
          setSendModalOpen(true)
          return
        case 'edit':
          setEditValidatorModalOpen(true)
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

    if (intent === 'buy') {
      if (!bondDid) {
        return null
      }
    }

    if (intent === 'edit') {
      if (!canEditValidator) {
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
        path='/projects/:projectDID/overview/action/new_claim/summary'
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
      {/* <Route
        exact
        path={`/projects/:projectDID/overview/action/relayer_vote`}
        component={ShowVoteAssistant}
      /> */}
      <ControlPanelSection key={title}>
        <h4>
          <div className='heading-icon'>
            <ActionIcon />
          </div>
          {title}
          {visibleControls.length > 4 && (
            <div
              onClick={toggleShowMore}
              className={`arrow-icon ${showMore ? 'active' : ''}`}
            >
              <Down width='16' fill='#A5ADB0' />
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
      <ModalWrapper
        isModalOpen={buyModalOpen}
        handleToggleModal={(): void => setBuyModalOpen(false)}
      >
        <BuyModal handleBuy={handleBuy} />
      </ModalWrapper>
      <ModalWrapper
        isModalOpen={sellModalOpen}
        handleToggleModal={(): void => setSellModalOpen(false)}
      >
        <SellModal handleSell={handleSell} />
      </ModalWrapper>
      <ModalWrapper
        isModalOpen={proposalModalOpen}
        handleToggleModal={(): void => setProposalModalOpen(false)}
      >
        <SubmitProposalModal handleSubmitProposal={handleSubmitProposal} />
      </ModalWrapper>
      <ModalWrapper
        isModalOpen={depositModalOpen}
        handleToggleModal={(): void => setDepositModalOpen(false)}
      >
        <DepositModal handleDeposit={handleDeposit} />
      </ModalWrapper>
      <ModalWrapper
        isModalOpen={voteModalOpen}
        handleToggleModal={(): void => setVoteModalOpen(false)}
      >
        <VoteModal handleVote={handleVote} />
      </ModalWrapper>
      <ModalWrapper
        isModalOpen={sendModalOpen}
        handleToggleModal={(): void => setSendModalOpen(false)}
      >
        <SendModal handleSend={handleSend} />
      </ModalWrapper>
      <ModalWrapper
        isModalOpen={editValidatorModalOpen}
        handleToggleModal={(): void => setEditValidatorModalOpen(false)}
      >
        <UpdateValidatorModal
          validatorAddress={userAddress}
          handleUpdate={handleUpdateValidator}
        />
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
