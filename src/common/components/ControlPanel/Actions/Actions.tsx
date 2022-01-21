import React, { Dispatch, useState, useEffect } from 'react'
import Long from 'long'
import { Route, NavLink } from 'react-router-dom'
import AddPerson from 'assets/icons/AddPerson'
import Message from 'assets/icons/Message'
import Target from 'assets/icons/Target'
import Star from 'assets/icons/Star'
import Fuel from 'assets/icons/Fuel'
import Vote from 'assets/icons/Vote'
import Triangle from 'assets/icons/Triangle'
import ActionIcon from 'assets/icons/Actions'
import blocksyncApi from 'common/api/blocksync-api/blocksync-api'
import keysafe from 'common/keysafe/keysafe'
import { Widget } from '../types'
import { ControlPanelSection } from '../ControlPanel.styles'
import { ActionLinksWrapper } from './Actions.styles'
import { SummaryContainerConnected } from 'modules/EntityClaims/SubmitEntityClaim/SubmitEntityClaimFinal/SubmitEntityClaimFinal.container'
import Tooltip from '../../Tooltip/Tooltip'
import { InstructionsContainerConnected } from 'modules/EntityClaims/SubmitEntityClaim/SubmitEntityClaimInstructions/SubmitEntityClaimInstructions.container'
import CreateAgentContainer from 'modules/Entities/SelectedEntity/EntityImpact/EntityAgents/CreateAgent/CreateAgent.container'
import Down from 'assets/icons/Down'
import ShowAssistantPanel from './ShowAssistantPanel'
import { AgentRole } from 'modules/Account/types'
import { updateProjectStatusToStarted } from 'modules/Entities/SelectedEntity/SelectedEntity.actions'
import { connect, useDispatch, useSelector } from 'react-redux'
import { RootState } from 'common/redux/types'
import { toggleAssistant } from 'modules/Account/Account.actions'
import * as entitySelectors from 'modules/Entities/SelectedEntity/SelectedEntity.selectors'
import { ToogleAssistantPayload } from 'modules/Account/types'
import { PDS_URL } from 'modules/Entities/types'
import * as accountSelectors from 'modules/Account/Account.selectors'
import Axios from 'axios'
import * as Toast from 'common/utils/Toast'
import * as keplr from 'common/utils/keplr'
import { broadCastMessage as broadCast } from 'common/utils/keysafe'
import { UserInfo } from 'modules/Account/types'
import { ModalWrapper } from 'common/components/Wrappers/ModalWrapper'
import { getUIXOAmount } from 'common/utils/currency.utils'
import StakingModal from './StakingModal'
import SellModal from './SellModal'
import SubmitProposalModal from './SubmitProposalModal'
import DepositModal from './DepositModal'
import VoteModal from './VoteModal'
import SendModal from './SendModal'
import UpdateValidatorModal from './UpdateValidatorModal'
import MultiSendModal from './MultiSendModal'
import { MsgVote } from 'cosmjs-types/cosmos/gov/v1beta1/tx'
import { MsgDeposit } from 'cosmjs-types/cosmos/gov/v1beta1/tx'
import FuelEntityModal from './FuelEntityModal'
import JoinModal from './JoinModal'
import { Currency } from 'types/models'
import WalletSelectModal from './WalletSelectModal'
import ModifyWithdrawAddressModal from './ModifyWithdrawAddressModal'
import { getEntities } from 'modules/Entities/EntitiesExplorer/EntitiesExplorer.actions'
import { tokenBalance } from 'modules/Account/Account.utils'
import StakeToVoteModal from './StakeToVoteModal'
import BuyModal from './BuyModal'
import { getBalances } from 'modules/BondModules/bond/bond.actions'
import CreatePaymentTemplateModal from './CreatePaymentTemplateModal'
import CreatePaymentContractModal from './CreatePaymentContractModal'
import MakePaymentModal from './MakePaymentModal'

declare const window: any
interface IconTypes {
  [key: string]: any
}

const defaultWallets = ['keysafe', 'keplr']

const icons: IconTypes = {
  AddPerson,
  Message,
  Target,
  Star,
  Fuel,
  Vote,
  Triangle,
}

interface Props {
  userDid: string
  entityDid: string
  bondDid?: string
  ddoTags?: any[]
  widget: Widget
  showMore: boolean
  userAddress?: string
  userAccountNumber?: string
  userSequence?: string
  userInfo?: UserInfo
  userBalances?: Currency[]
  entityStatus?: string
  creatorDid?: string
  entityClaims?: any
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
  ddoTags,
  userAddress,
  userAccountNumber,
  userSequence,
  userInfo,
  // entityStatus,
  creatorDid,
  entityClaims,
  userBalances,
  toggleShowMore,
  toggleAssistant,
  handleUpdateProjectStatusToStarted,
}) => {
  const dispatch = useDispatch()
  const { entities } = useSelector((state: RootState) => state.entities)

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

  const canStake = ddoTags
    .find((ddoTag) => ddoTag.category === 'Cell Type')
    ?.tags.some((tag) => tag === 'Validator')

  const canUpdateStatus = creatorDid === userDid
  const canCredit =
    creatorDid === userDid && tokenBalance(userBalances, 'uixo').amount > 0

  const [canEditValidator, setCanEditValidator] = useState(false)
  const [canGovernance, setCanGovernance] = useState(false)

  const [stakeModalOpen, setStakeModalOpen] = useState(false)
  const [stakeToVoteModalOpen, setStakeToVoteModalOpen] = useState(false)
  const [buyModalOpen, setBuyModalOpen] = useState(false)
  const [sellModalOpen, setSellModalOpen] = useState(false)
  const [proposalModalOpen, setProposalModalOpen] = useState(false)
  const [depositModalOpen, setDepositModalOpen] = useState(false)
  const [voteModalOpen, setVoteModalOpen] = useState(false)
  const [sendModalOpen, setSendModalOpen] = useState(false)
  const [editValidatorModalOpen, setEditValidatorModalOpen] = useState(false)
  const [fuelEntityModalOpen, setFuelEntityModalOpen] = useState(false)
  const [joinModalOpen, setJoinModalOpen] = useState(false)
  const [multiSendModalOpen, setMultiSendModalOpen] = useState(false)
  const [
    modifyWithdrawAddressModalOpen,
    setModifyWithdrawAddressModalOpen,
  ] = useState(false)

  const [walletModalOpen, setWalletModalOpen] = useState(false)
  const [availableWallets, setAvailableWallets] = useState(null)
  const [walletType, setWalletType] = useState(null)
  const [selectedAddress, setSelectedAddress] = useState(null)

  const [modalTitle, setModalTitle] = useState('')
  const [
    createPaymentTemplateModalOpen,
    setCreatePaymentTemplateModalOpen,
  ] = useState(false)
  const [
    createPaymentContractModalOpen,
    setCreatePaymentContractModalOpen,
  ] = useState(false)
  const [makePaymentModalOpen, setMakePaymentModalOpen] = useState(false)

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_GAIA_URL}/staking/validators`).then(
      (response) => {
        setCanEditValidator(
          response.data.result.findIndex(
            (validator) => validator.operator_address === userAddress,
          ) !== -1,
        )
      },
    )
  })

  useEffect(() => {
    dispatch(getEntities())
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (entities && entities.length > 0 && entityClaims) {
      setCanGovernance(
        entityClaims.items
          .map((claim) => {
            const id = claim['@id']
            const claimEntity = entities.find((entity) => entity.did === id)
            if (claimEntity) {
              return claimEntity.ddoTags
                .find((ddoTag) => ddoTag.name === 'Stage') // Claim Type or Stage ?
                ?.tags.some((tag) => tag === 'Proposal')
            }
            return false
          })
          .some((can) => can),
      )

      return
    }

    setCanGovernance(
      ddoTags
        .find((ddoTag) => ddoTag.name === 'Stage')
        ?.tags.some((tag) => tag === 'Proposal'),
    )
    // eslint-disable-next-line
  }, [entities])

  const visibleControls = controls
    .filter(
      (control) =>
        control.permissions[0].role !== 'user' || userDid || window.keplr,
    )
    .filter((control) => {
      const intent = control.parameters.find((param) => param.name === 'intent')
        ?.value
      switch (intent) {
        case 'fuel_my_entity':
          if (!canCredit) {
            return false
          }
          break
        case 'update_status':
          if (!canUpdateStatus) {
            return false
          }
          break
        case 'buy':
        case 'sell':
        case 'withdraw':
        case 'relayer_vote':
          if (!bondDid) {
            return false
          }
          break
        case 'edit':
          if (!canEditValidator) {
            return false
          }
          break
        case 'stake':
          if (!canStake) {
            return false
          }
          break
        case 'stake_to_vote':
          if (!canStakeToVote) {
            return false
          }
          break
        case 'proposal':
        case 'deposit':
          if (!canGovernance) {
            return false
          }
          break
        case 'creat_payment_template':
        case 'creat_payment_contract':
        case 'make_payment':
          break
        default:
          break
      }
      return true
    })
  // debugger
  const handleSell = (amount: number): void => {
    const msg = {
      type: 'bonds/MsgSell',
      value: {
        seller_did: userDid,
        amount: {
          amount: getUIXOAmount(String(amount)),
          denom: 'uixo',
        },
        bond_did: bondDid,
      },
    }

    const fee = {
      amount: [{ amount: String(5000), denom: 'uixo' }],
      gas: String(200000),
    }

    broadCast(userInfo, userSequence, userAccountNumber, [msg], '', fee, () => {
      setSellModalOpen(false)
    })
  }

  const handleWithdraw = (): void => {
    const msg = {
      type: 'bonds/MsgWithdrawShare',
      value: {
        recipient_did: userDid,
        bond_did: bondDid,
      },
    }
    const fee = {
      amount: [{ amount: String(5000), denom: 'uixo' }],
      gas: String(200000),
    }

    broadCast(userInfo, userSequence, userAccountNumber, [msg], '', fee, () => {
      // setBuyModalOpen(false)
    })
  }

  const handleSubmitProposal = (
    title: string,
    description: string,
    amount: number,
  ): void => {
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

    const fee = {
      amount: [{ amount: String(5000), denom: 'uixo' }],
      gas: String(200000),
    }

    broadCast(userInfo, userSequence, userAccountNumber, [msg], '', fee, () => {
      setProposalModalOpen(false)
    })
  }

  const handleDeposit = async (
    amount: number,
    proposalId: string,
  ): Promise<void> => {
    try {
      const [accounts, offlineSigner] = await keplr.connectAccount()
      const address = accounts[0].address
      const client = await keplr.initStargateClient(offlineSigner)

      const payload = {
        msgs: [
          {
            typeUrl: '/cosmos.gov.v1beta1.MsgDeposit',
            value: MsgDeposit.fromPartial({
              proposalId: Long.fromString(proposalId),
              depositor: address,
              amount: [
                {
                  amount: getUIXOAmount(String(amount)),
                  denom: 'uixo',
                },
              ],
            }),
          },
        ],
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

      const fee = {
        amount: [{ amount: String(5000), denom: 'uixo' }],
        gas: String(200000),
      }

      broadCast(
        userInfo,
        userSequence,
        userAccountNumber,
        [msg],
        '',
        fee,
        () => {
          setDepositModalOpen(false)
        },
      )
    }
  }

  const handleVote = async (
    proposalId: string,
    answer: number,
  ): Promise<void> => {
    try {
      const [accounts, offlineSigner] = await keplr.connectAccount()
      const address = accounts[0].address
      const client = await keplr.initStargateClient(offlineSigner)

      const payload = {
        msgs: [
          {
            typeUrl: '/cosmos.gov.v1beta1.MsgVote',
            value: MsgVote.fromPartial({
              proposalId: Long.fromString(proposalId),
              voter: address,
              option: answer,
            }),
          },
        ],
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

      const fee = {
        amount: [{ amount: String(5000), denom: 'uixo' }],
        gas: String(200000),
      }

      broadCast(
        userInfo,
        userSequence,
        userAccountNumber,
        [msg],
        '',
        fee,
        () => {
          setVoteModalOpen(false)
        },
      )
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
  ): void => {
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

    const fee = {
      amount: [{ amount: String(5000), denom: 'uixo' }],
      gas: String(200000),
    }

    broadCast(userInfo, userSequence, userAccountNumber, [msg], '', fee, () => {
      console.log('handleUpdateValidator')
    })
  }

  const handleWalletSelect = (
    walletType: string,
    accountAddress: string,
  ): void => {
    setWalletType(walletType)
    setSelectedAddress(accountAddress)
    setWalletModalOpen(false)

    const intent = window.location.pathname.split('/').pop()
    switch (intent) {
      case 'send':
        setSendModalOpen(true)
        setModalTitle('Send')
        break
      case 'stake':
        setStakeModalOpen(true)
        setModalTitle('My Stake')
        break
      case 'stake_to_vote':
        dispatch(getBalances(bondDid))
        setStakeToVoteModalOpen(true)
        setModalTitle('Stake to Vote')
        break
      case 'buy':
        dispatch(getBalances(bondDid))
        setBuyModalOpen(true)
        setModalTitle('Buy')
        break
      case 'multi_send':
        setMultiSendModalOpen(true)
        setModalTitle('Multi Send')
        break
      case 'modifywithdrawaddress':
        setModifyWithdrawAddressModalOpen(true)
        setModalTitle('New Withdraw Address')
        break
      case 'fuel_my_entity':
        setFuelEntityModalOpen(true)
        setModalTitle('Credit')
        break
      case 'make_payment':
        setMakePaymentModalOpen(true)
        setModalTitle('Make a Payment')
        break
      default:
        break
    }
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
        case 'stake':
          // setStakeModalOpen(true)
          setAvailableWallets(defaultWallets)
          setWalletModalOpen(true)
          return
        case 'stake_to_vote':
          // setStakeModalOpen(true)
          setAvailableWallets(defaultWallets)
          setWalletModalOpen(true)
          return
        case 'buy':
          dispatch(getBalances(bondDid))
          setBuyModalOpen(true)
          setModalTitle('Buy')
          return
        case 'withdraw':
          handleWithdraw()
          return
        case 'modifywithdrawaddress':
          // setModifyWithdrawAddressModalOpen(true)
          setAvailableWallets(defaultWallets)
          setWalletModalOpen(true)
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
          // setSendModalOpen(true)
          setAvailableWallets(defaultWallets)
          setWalletModalOpen(true)
          return
        case 'edit':
          setEditValidatorModalOpen(true)
          return
        case 'fuel_my_entity':
          // setFuelEntityModalOpen(true)
          setAvailableWallets(['keysafe'])
          setWalletModalOpen(true)
          return
        case 'join':
          setJoinModalOpen(true)
          setModalTitle('Apply to Join')
          return
        case 'multi_send':
          // setMultiSendModalOpen(true)
          setAvailableWallets(defaultWallets)
          setWalletModalOpen(true)
          return
        case 'create_payment_template':
          setCreatePaymentTemplateModalOpen(true)
          setModalTitle('Create a Payment Template')
          return
        case 'create_payment_contract':
          setCreatePaymentContractModalOpen(true)
          setModalTitle('Create a Payment Contract')
          return
        case 'make_payment':
          setAvailableWallets(defaultWallets)
          setWalletModalOpen(true)
          return
      }
      if (window.location.pathname.startsWith(to)) {
        e.preventDefault()
      }
    }

    return (
      <Tooltip text={control.tooltip} key={control['@id']}>
        <NavLink to={to} onClick={interceptNavClick}>
          {React.createElement(icons[control.icon], {
            fill: control.iconColor,
          })}
          <span>{control.title}</span>
        </NavLink>
      </Tooltip>
    )
  }

  return (
    <>
      {/* <Route
        exact
        path={`/projects/:projectDID/overview/action/fuel_my_entity`}
      >
        <FuelEntity assistantPanelToggle={toggleAssistant} />
      </Route> */}
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
      {/* <Route exact path={`/projects/:projectDID/overview/action/join`}>
        <CreateAgentContainer role={AgentRole.ServiceProvider} />
      </Route> */}
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
        isModalOpen={stakeModalOpen}
        header={{
          title: modalTitle,
          titleNoCaps: true,
          noDivider: true,
        }}
        handleToggleModal={(): void => setStakeModalOpen(false)}
      >
        <StakingModal
          walletType={walletType}
          accountAddress={selectedAddress}
          handleStakingMethodChange={setModalTitle}
        />
        {/* <DelegateModal handleDelegate={handleDelegate} /> */}
      </ModalWrapper>
      <ModalWrapper
        isModalOpen={stakeToVoteModalOpen}
        header={{
          title: modalTitle,
          titleNoCaps: true,
          noDivider: true,
        }}
        handleToggleModal={(): void => setStakeToVoteModalOpen(false)}
      >
        <StakeToVoteModal
          walletType={walletType}
          accountAddress={selectedAddress}
          handleMethodChange={setModalTitle}
        />
      </ModalWrapper>
      <ModalWrapper
        isModalOpen={modifyWithdrawAddressModalOpen}
        header={{
          title: modalTitle,
          titleNoCaps: true,
          noDivider: true,
        }}
        handleToggleModal={(): void => setModifyWithdrawAddressModalOpen(false)}
      >
        <ModifyWithdrawAddressModal
          walletType={walletType}
          accountAddress={selectedAddress}
          // handleModifyWithdrawAddress={handleModifyWithdrawAddress}
        />
      </ModalWrapper>
      <ModalWrapper
        isModalOpen={stakeToVoteModalOpen}
        header={{
          title: modalTitle,
          titleNoCaps: true,
          noDivider: true,
        }}
        handleToggleModal={(): void => setStakeToVoteModalOpen(false)}
      >
        <StakeToVoteModal
          walletType={walletType}
          accountAddress={selectedAddress}
          handleMethodChange={setModalTitle}
        />
      </ModalWrapper>

      <ModalWrapper
        isModalOpen={buyModalOpen}
        header={{
          title: modalTitle,
          titleNoCaps: true,
          noDivider: true,
        }}
        handleToggleModal={(): void => setBuyModalOpen(false)}
      >
        <BuyModal
          walletType={'keysafe'}
          accountAddress={userAddress}
          handleMethodChange={setModalTitle}
        />
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
        header={{
          title: modalTitle,
          titleNoCaps: true,
          noDivider: true,
        }}
        handleToggleModal={(): void => setSendModalOpen(false)}
      >
        <SendModal
          walletType={walletType}
          accountAddress={selectedAddress}
          handleChangeTitle={setModalTitle}
        />
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
      <ModalWrapper
        isModalOpen={fuelEntityModalOpen}
        header={{
          title: modalTitle,
          titleNoCaps: true,
          noDivider: true,
        }}
        handleToggleModal={(): void => setFuelEntityModalOpen(false)}
      >
        <FuelEntityModal
          entityDid={entityDid}
          walletType={walletType}
          accountAddress={selectedAddress}
          handleChangeTitle={setModalTitle}
        />
      </ModalWrapper>
      <ModalWrapper
        isModalOpen={joinModalOpen}
        header={{
          title: modalTitle,
          titleNoCaps: true,
          noDivider: true,
        }}
        handleToggleModal={(): void => setJoinModalOpen(false)}
      >
        <JoinModal handleChangeTitle={setModalTitle} />
      </ModalWrapper>
      <ModalWrapper
        isModalOpen={multiSendModalOpen}
        handleToggleModal={(): void => setMultiSendModalOpen(false)}
      >
        <MultiSendModal walletType={walletType} />
      </ModalWrapper>

      <ModalWrapper
        isModalOpen={walletModalOpen}
        header={{
          title: 'Select Wallet',
          titleNoCaps: true,
          noDivider: true,
        }}
        handleToggleModal={(): void => setWalletModalOpen(false)}
      >
        <WalletSelectModal
          handleSelect={handleWalletSelect}
          availableWallets={availableWallets}
        />
      </ModalWrapper>
      <ModalWrapper
        isModalOpen={createPaymentTemplateModalOpen}
        header={{
          title: modalTitle,
          titleNoCaps: true,
          noDivider: true,
        }}
        handleToggleModal={(): void => setCreatePaymentTemplateModalOpen(false)}
      >
        <CreatePaymentTemplateModal />
      </ModalWrapper>
      <ModalWrapper
        isModalOpen={createPaymentContractModalOpen}
        header={{
          title: modalTitle,
          titleNoCaps: true,
          noDivider: true,
        }}
        handleToggleModal={(): void => setCreatePaymentContractModalOpen(false)}
      >
        <CreatePaymentContractModal />
      </ModalWrapper>
      <ModalWrapper
        isModalOpen={makePaymentModalOpen}
        header={{
          title: modalTitle,
          titleNoCaps: true,
          noDivider: true,
        }}
        handleToggleModal={(): void => setMakePaymentModalOpen(false)}
      >
        <MakePaymentModal
          entityDid={entityDid}
          accountAddress={selectedAddress}
          handleCreateTemplate={(): void => {
            setMakePaymentModalOpen(false)
            setModalTitle('Create a Payment Template')
            setCreatePaymentTemplateModalOpen(true)
          }}
          handleCreateContract={(): void => {
            setMakePaymentModalOpen(false)
            setModalTitle('Create a Payment Contract')
            setCreatePaymentContractModalOpen(true)
          }}
          handleCancelContract={(): void => {
            setMakePaymentModalOpen(false)
          }}
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
  userBalances: accountSelectors.selectUserBalances(state),
  ddoTags: entitySelectors.selectEntityDdoTags(state),
  entityStatus: entitySelectors.selectEntityStatus(state),
  creatorDid: entitySelectors.selectEntityCreator(state),
  entityClaims: entitySelectors.selectEntityClaims(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleUpdateProjectStatusToStarted: (projectDid: string): void =>
    dispatch(updateProjectStatusToStarted(projectDid)),
  toggleAssistant: (param: ToogleAssistantPayload): void =>
    dispatch(toggleAssistant(param)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Actions)
