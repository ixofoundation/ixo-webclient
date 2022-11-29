import ActionIcon from 'assets/icons/Actions'
import AddPerson from 'assets/icons/AddPerson'
import Down from 'assets/icons/Down'
import Fuel from 'assets/icons/Fuel'
import Message from 'assets/icons/Message'
import Star from 'assets/icons/Star'
import Target from 'assets/icons/Target'
import Triangle from 'assets/icons/Triangle'
import Vote from 'assets/icons/Vote'
import { ModalWrapper } from 'common/components/Wrappers/ModalWrapper'
import { RootState } from 'common/redux/types'
import { getMinimalAmount } from 'common/utils/currency.utils'
import * as keplr from 'common/utils/keplr'
import { broadCastMessage as broadCast } from 'common/utils/keysafe'
import * as Toast from 'common/utils/Toast'
import { MsgDeposit } from 'cosmjs-types/cosmos/gov/v1beta1/tx'
import Long from 'long'
import { toggleAssistant } from 'modules/Account/Account.actions'
import * as accountSelectors from 'modules/Account/Account.selectors'
import { AgentRole, ToogleAssistantPayload, UserInfo } from 'modules/Account/types'
import { getBondDetail } from 'modules/BondModules/bond/bond.actions'
import CreateAgentContainer from 'modules/Entities/SelectedEntity/EntityImpact/EntityAgents/CreateAgent/CreateAgent.container'
import * as entitySelectors from 'modules/Entities/SelectedEntity/SelectedEntity.selectors'
import { Agent } from 'modules/Entities/types'
import { SummaryContainerConnected } from 'modules/EntityClaims/SubmitEntityClaim/SubmitEntityClaimFinal/SubmitEntityClaimFinal.container'
import { InstructionsContainerConnected } from 'modules/EntityClaims/SubmitEntityClaim/SubmitEntityClaimInstructions/SubmitEntityClaimInstructions.container'
import { selectPaymentCoins } from 'states/configs/configs.selectors'
import { PaymentCoins } from 'states/configs/configs.types'
import React, { Dispatch, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { NavLink, Route } from 'react-router-dom'
import Tooltip from '../../Tooltip/Tooltip'
import { ControlPanelSection } from '../ControlPanel.styles'
import { Widget } from '../types'
import { ActionLinksWrapper } from './Actions.styles'
import BuyModal from './BuyModal'
import CreatePaymentContractModal from './CreatePaymentContractModal'
import CreatePaymentTemplateModal from './CreatePaymentTemplateModal'
import DepositModal from './DepositModal'
import MakePaymentModal from './MakePaymentModal'
import MultiSendModal from './MultiSendModal'
import ShowAssistantPanel from './ShowAssistantPanel'
import StakeToVoteModal from './StakeToVoteModal'
import StakingModal from './StakingModal'
import SubmitProposalModal from './SubmitProposalModal'
import UpdateValidatorModal from './UpdateValidatorModal'
import WalletSelectModal from './WalletSelectModal'
import { useAccount } from 'modules/Account/Account.hooks'
import { SendModal, JoinModal, FuelEntityModal, VoteModal, SetWithdrawAddressModal } from 'components'
import { UpdateProjectStatus, WithdrawShare } from 'common/utils'
import { useSelectedEntity } from 'modules/Entities/SelectedEntity/SelectedEntity.hooks'

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
  ddoTags?: any[]
  widget: Widget
  showMore: boolean
  userAccountNumber?: string
  userSequence?: string
  userInfo?: UserInfo
  entityStatus?: string
  creatorDid?: string
  entityClaims?: any
  agents?: Agent[]
  paymentCoins?: PaymentCoins[]
  toggleShowMore: () => void
  toggleAssistant?: (param: ToogleAssistantPayload) => void
}

const Actions: React.FunctionComponent<Props> = ({
  widget: { title, controls },
  showMore,
  userAccountNumber,
  userSequence,
  userInfo,
  creatorDid,
  agents,
  toggleShowMore,
  toggleAssistant,
  paymentCoins,
}) => {
  const dispatch = useDispatch()
  const { signingClient, did, address } = useAccount()
  const { bondDid, did: projectDid, address: projectAddress, status } = useSelectedEntity()

  const [stakeModalOpen, setStakeModalOpen] = useState(false)
  const [stakeToVoteModalOpen, setStakeToVoteModalOpen] = useState(false)
  const [buyModalOpen, setBuyModalOpen] = useState(false)
  const [proposalModalOpen, setProposalModalOpen] = useState(false)
  const [depositModalOpen, setDepositModalOpen] = useState(false)
  const [voteModalOpen, setVoteModalOpen] = useState(false)
  const [sendModalOpen, setSendModalOpen] = useState(false)
  const [editValidatorModalOpen, setEditValidatorModalOpen] = useState(false)
  const [fuelEntityModalOpen, setFuelEntityModalOpen] = useState(false)
  const [joinModalOpen, setJoinModalOpen] = useState(false)
  const [multiSendModalOpen, setMultiSendModalOpen] = useState(false)
  const [setWithdrawAddressModalOpen, setSetWithdrawAddressModalOpen] = useState(false)

  const [walletModalOpen, setWalletModalOpen] = useState(false)
  const [availableWallets, setAvailableWallets] = useState(null)
  const [walletType, setWalletType] = useState(null)
  const [selectedAddress, setSelectedAddress] = useState(null)

  const [modalTitle, setModalTitle] = useState('')
  const [createPaymentTemplateModalOpen, setCreatePaymentTemplateModalOpen] = useState(false)
  const [createPaymentContractModalOpen, setCreatePaymentContractModalOpen] = useState(false)
  const [makePaymentModalOpen, setMakePaymentModalOpen] = useState(false)

  const visibleControls = controls.filter((control) => {
    switch (control.permissions[0].role) {
      case null:
        return true
      case 'user':
        return !!did
      case 'creator':
        return creatorDid === did
      case 'IA':
      case 'EA':
      case 'SA':
        return agents?.some((agent) => agent.did === did && agent.role === control.permissions[0].role)
      default:
        return false
    }
  })

  /**
   * @direct
   */
  const handleWithdrawShare = async (): Promise<void> => {
    const res = await WithdrawShare(signingClient, { did, address, bondDid })
    console.log('handleWithdrawShare', res)
  }

  const handleUpdateStatus = async (): Promise<void> => {
    let projectStatus = status
    if (!projectStatus) {
      projectStatus = 'CREATED'
      await UpdateProjectStatus(signingClient, {
        did,
        projectDid,
        projectAddress,
        status: projectStatus as 'CREATED' | 'PENDING' | 'FUNDED' | 'STARTED',
      })
    }
    if (projectStatus === 'CREATED') {
      projectStatus = 'PENDING'
      await UpdateProjectStatus(signingClient, {
        did,
        projectDid,
        projectAddress,
        status: projectStatus as 'CREATED' | 'PENDING' | 'FUNDED' | 'STARTED',
      })
    }
    if (projectStatus === 'PENDING') {
      projectStatus = 'FUNDED'
      await UpdateProjectStatus(signingClient, {
        did,
        projectDid,
        projectAddress,
        status: projectStatus as 'CREATED' | 'PENDING' | 'FUNDED' | 'STARTED',
      })
    }
    if (projectStatus === 'FUNDED') {
      projectStatus = 'STARTED'
      await UpdateProjectStatus(signingClient, {
        did,
        projectDid,
        projectAddress,
        status: projectStatus as 'CREATED' | 'PENDING' | 'FUNDED' | 'STARTED',
      })
    }
  }

  const handleSubmitProposal = (title: string, description: string, amount: number): void => {
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
            amount: getMinimalAmount(String(amount)),
            denom: 'uixo',
          },
        ],
        proposer: address,
      },
    }

    const fee = {
      amount: [{ amount: String(5000), denom: 'uixo' }],
      gas: String(200000),
    }

    broadCast(userInfo, userSequence as any, userAccountNumber as any, [msg], '', fee, () => {
      setProposalModalOpen(false)
    })
  }

  const handleDeposit = async (amount: number, proposalId: string): Promise<void> => {
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
                  amount: getMinimalAmount(String(amount)),
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
              amount: getMinimalAmount(String(amount)),
              denom: 'uixo',
            },
          ],
          depositor: address,
          proposal_id: proposalId,
        },
      }

      const fee = {
        amount: [{ amount: String(5000), denom: 'uixo' }],
        gas: String(200000),
      }

      broadCast(userInfo, userSequence as any, userAccountNumber as any, [msg], '', fee, () => {
        setDepositModalOpen(false)
      })
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

    broadCast(userInfo, userSequence as any, userAccountNumber as any, [msg], '', fee, () => {
      console.log('handleUpdateValidator')
    })
  }

  /**
   * @deprecated
   * @param walletType
   * @param accountAddress
   */
  const handleWalletSelect = (walletType: string, accountAddress: string): void => {
    setWalletType(walletType as any)
    setSelectedAddress(accountAddress as any)
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
        dispatch(getBondDetail(bondDid!) as any)
        setStakeToVoteModalOpen(true)
        setModalTitle('Stake to Vote')
        break
      case 'buy':
        dispatch(getBondDetail(bondDid!) as any)
        setBuyModalOpen(true)
        setModalTitle('Buy')
        break
      case 'multi_send':
        setMultiSendModalOpen(true)
        setModalTitle('Multi Send')
        break
      case 'modifywithdrawaddress':
        setSetWithdrawAddressModalOpen(true)
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
    const intent = control.parameters.find((param: any) => param?.name === 'intent')?.value

    const to = `/projects/${projectDid}/overview/action/${intent}`

    const interceptNavClick = async (e: any): Promise<void> => {
      switch (intent) {
        case 'update_status':
          handleUpdateStatus()
          break
        case 'stake':
          // setStakeModalOpen(true)
          setAvailableWallets(defaultWallets as any)
          setWalletModalOpen(true)
          return
        case 'stake_to_vote':
          // setStakeModalOpen(true)
          setAvailableWallets(defaultWallets as any)
          setWalletModalOpen(true)
          return
        case 'buy':
          dispatch(getBondDetail(bondDid!) as any)
          setBuyModalOpen(true)
          setModalTitle('Buy')
          return
        case 'withdraw':
          handleWithdrawShare()
          return
        case 'modifywithdrawaddress':
          setSetWithdrawAddressModalOpen(true)
          return
        case 'sell':
          // setSellModalOpen(true)
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
        case 'fuel_my_entity':
          setFuelEntityModalOpen(true)
          return
        case 'join':
          setJoinModalOpen(true)
          setModalTitle('Apply to Join')
          return
        case 'multi_send':
          // setMultiSendModalOpen(true)
          setAvailableWallets(defaultWallets as any)
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
          setAvailableWallets(defaultWallets as any)
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
          {/* {React.createElement(icons[control.icon], {
            fill: control.iconColor,
          })} */}
          {React.createElement(icons.Triangle, {
            fill: control.iconColor,
            stroke: control.iconColor,
          })}
          <span>{control.title}</span>
        </NavLink>
      </Tooltip>
    )
  }

  return (
    <>
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
      {/* <Route exact path={`/projects/:projectDID/overview/action/join`}>
        <CreateAgentContainer role={AgentRole.ServiceProvider} />
      </Route> */}
      <Route exact path={`/projects/:projectDID/overview/action/evaluator`}>
        <CreateAgentContainer role={AgentRole.Evaluator} />
      </Route>

      <Route exact path={`/projects/:projectDID/overview/action/help`}>
        <ShowAssistantPanel assistantPanelToggle={toggleAssistant as any} />
      </Route>
      <Route exact path={`/projects/:projectDID/overview/action/oracle`}>
        <ShowAssistantPanel assistantPanelToggle={toggleAssistant as any} />
      </Route>
      <Route exact path={`/projects/:projectDID/overview/action/rate`}>
        <ShowAssistantPanel assistantPanelToggle={toggleAssistant as any} />
      </Route>
      <ControlPanelSection key={title}>
        <h4>
          <div className='heading-icon'>
            <ActionIcon />
          </div>
          {title}
          {visibleControls.length > 4 && (
            <div onClick={toggleShowMore} className={`arrow-icon ${showMore ? 'active' : ''}`}>
              <Down width='16' fill='#A5ADB0' />
            </div>
          )}
        </h4>
        <ActionLinksWrapper>{visibleControls.slice(0, 4)?.map(handleRenderControl)}</ActionLinksWrapper>
        <div className={`show-more-container ${showMore ? 'show' : ''}`}>
          <ActionLinksWrapper>{visibleControls.slice(4)?.map(handleRenderControl)}</ActionLinksWrapper>
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
          walletType={walletType as any}
          accountAddress={selectedAddress as any}
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
          walletType={walletType as any}
          accountAddress={selectedAddress as any}
          handleMethodChange={setModalTitle}
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
          walletType={walletType as any}
          accountAddress={selectedAddress as any}
          handleMethodChange={setModalTitle}
        />
      </ModalWrapper>

      <ModalWrapper
        isModalOpen={buyModalOpen}
        header={{
          title: 'Buy',
          titleNoCaps: true,
          noDivider: true,
        }}
        handleToggleModal={(): void => setBuyModalOpen(false)}
      >
        <BuyModal />
      </ModalWrapper>
      <ModalWrapper isModalOpen={proposalModalOpen} handleToggleModal={(): void => setProposalModalOpen(false)}>
        <SubmitProposalModal handleSubmitProposal={handleSubmitProposal} />
      </ModalWrapper>
      <ModalWrapper isModalOpen={depositModalOpen} handleToggleModal={(): void => setDepositModalOpen(false)}>
        <DepositModal handleDeposit={handleDeposit} />
      </ModalWrapper>
      <ModalWrapper
        isModalOpen={editValidatorModalOpen}
        handleToggleModal={(): void => setEditValidatorModalOpen(false)}
      >
        <UpdateValidatorModal validatorAddress={address as any} handleUpdate={handleUpdateValidator} />
      </ModalWrapper>
      <ModalWrapper isModalOpen={multiSendModalOpen} handleToggleModal={(): void => setMultiSendModalOpen(false)}>
        <MultiSendModal walletType={walletType as any} />
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
        <WalletSelectModal handleSelect={handleWalletSelect} availableWallets={availableWallets as any} />
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
        <CreatePaymentTemplateModal entityDid={projectDid} paymentCoins={paymentCoins} />
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
        <CreatePaymentContractModal entityDid={projectDid} paymentCoins={paymentCoins} />
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
          entityDid={projectDid}
          walletType={walletType as any}
          accountAddress={selectedAddress as any}
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
      <SendModal open={sendModalOpen} setOpen={setSendModalOpen} />
      <JoinModal open={joinModalOpen} setOpen={setJoinModalOpen} />
      <FuelEntityModal open={fuelEntityModalOpen} setOpen={setFuelEntityModalOpen} />
      <VoteModal open={voteModalOpen} setOpen={setVoteModalOpen} />
      <SetWithdrawAddressModal open={setWithdrawAddressModalOpen} setOpen={setSetWithdrawAddressModalOpen} />
    </>
  )
}

const mapStateToProps = (state: RootState): any => ({
  userInfo: accountSelectors.selectUserInfo(state),
  userAccountNumber: accountSelectors.selectUserAccountNumber(state),
  userSequence: accountSelectors.selectUserSequence(state),
  ddoTags: entitySelectors.selectEntityDdoTags(state),
  creatorDid: entitySelectors.selectEntityCreator(state),
  entityClaims: entitySelectors.selectEntityClaims(state),
  agents: entitySelectors.selectEntityAgents(state),
  paymentCoins: selectPaymentCoins(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  toggleAssistant: (param: ToogleAssistantPayload): void => dispatch(toggleAssistant(param)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Actions)
