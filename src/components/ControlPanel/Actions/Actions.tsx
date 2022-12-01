import ActionIcon from 'assets/icons/Actions'
import AddPerson from 'assets/icons/AddPerson'
import Down from 'assets/icons/Down'
import Fuel from 'assets/icons/Fuel'
import Message from 'assets/icons/Message'
import Star from 'assets/icons/Star'
import Target from 'assets/icons/Target'
import Triangle from 'assets/icons/Triangle'
import Vote from 'assets/icons/Vote'
import { ModalWrapper } from 'components/Wrappers/ModalWrapper'
import { RootState } from 'redux/types'
import { toggleAssistant } from 'redux/account/account.actions'
import { AgentRole, ToogleAssistantPayload } from 'redux/account/account.types'
import { getBondDetail } from 'redux/bond/bond.actions'
import CreateAgentContainer from 'modules/Entities/SelectedEntity/EntityImpact/EntityAgents/CreateAgent/CreateAgent.container'
import * as entitySelectors from 'redux/selectedEntity/selectedEntity.selectors'
import { Agent } from 'modules/Entities/types'
import { SummaryContainerConnected } from 'modules/EntityClaims/SubmitEntityClaim/SubmitEntityClaimFinal/SubmitEntityClaimFinal.container'
import { InstructionsContainerConnected } from 'modules/EntityClaims/SubmitEntityClaim/SubmitEntityClaimInstructions/SubmitEntityClaimInstructions.container'
import { selectPaymentCoins } from 'redux/configs/configs.selectors'
import { PaymentCoins } from 'redux/configs/configs.types'
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
import MakePaymentModal from './MakePaymentModal'
import ShowAssistantPanel from './ShowAssistantPanel'
import StakeToVoteModal from './StakeToVoteModal'
import StakingModal from './StakingModal'
import WalletSelectModal from './WalletSelectModal'
import {
  SendModal,
  JoinModal,
  FuelEntityModal,
  VoteModal,
  SetWithdrawAddressModal,
  SubmitProposalModal,
  DepositModal,
  UpdateValidatorModal,
  MultiSendModal,
} from 'components/Modals'
import { UpdateProjectStatus, WithdrawShare } from 'lib/protocol'
import { useSelectedEntity } from 'modules/Entities/SelectedEntity/SelectedEntity.hooks'
import { useAccount } from 'redux/account/account.hooks'

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
  const [submitProposalModalOpen, setSubmitProposalModalOpen] = useState(false)
  const [depositModalOpen, setDepositModalOpen] = useState(false)
  const [voteModalOpen, setVoteModalOpen] = useState(false)
  const [sendModalOpen, setSendModalOpen] = useState(false)
  const [updateValidatorModalOpen, setUpdateValidatorModalOpen] = useState(false)
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
          setSubmitProposalModalOpen(true)
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
          setUpdateValidatorModalOpen(true)
          return
        case 'fuel_my_entity':
          setFuelEntityModalOpen(true)
          return
        case 'join':
          setJoinModalOpen(true)
          setModalTitle('Apply to Join')
          return
        case 'multi_send':
          setMultiSendModalOpen(true)
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
      <SubmitProposalModal open={submitProposalModalOpen} setOpen={setSubmitProposalModalOpen} />
      <DepositModal open={depositModalOpen} setOpen={setDepositModalOpen} />
      <UpdateValidatorModal open={updateValidatorModalOpen} setOpen={setUpdateValidatorModalOpen} />
      <MultiSendModal open={multiSendModalOpen} setOpen={setMultiSendModalOpen} />
    </>
  )
}

const mapStateToProps = (state: RootState): any => ({
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
