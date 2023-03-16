import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { deviceWidth } from 'constants/device'
import { useCreateEntityState } from 'hooks/createEntity'
import { Button } from 'pages/CreateEntity/Components'
import React from 'react'
import { TDeedActionModel } from 'types/protocol'
import { useHistory, useParams } from 'react-router-dom'
import { decodedMessagesString } from 'utils/messages'
import { SetupActionsForm } from './SetupActionsForm'
import { useMakeProposalAction } from 'hooks/proposal'
import { useAccount } from 'hooks/account'
import { contracts } from '@ixo/impactxclient-sdk'
import { useCurrentDaoGroup } from 'hooks/currentDao'
import { CosmosMsgForEmpty } from '@ixo/impactxclient-sdk/types/codegen/DaoProposalSingle.types'
import { fee } from 'lib/protocol/common'
import * as Toast from 'utils/toast'

const SetupActions: React.FC = () => {
  const history = useHistory()
  const { entityId, coreAddress } = useParams<{ entityId: string; coreAddress: string }>()
  const { deed, updateDeed } = useCreateEntityState()
  const { daoGroup } = useCurrentDaoGroup(coreAddress)
  const memberAddresses = daoGroup?.votingModule.members?.map(({ addr }) => addr)
  const {
    makeAuthzAuthorizationAction,
    makeAuthzExecAction,
    makeBurnNftAction,
    makeCustomAction,
    makeDaoAdminExecAction,
    makeExecuteAction,
    makeGovernanceVoteAction,
    makeInstantiateAction,
    makeManageCw20Action,
    makeManageCw721Action,
    makeManageMembersAction,
    makeManageStorageItemsAction,
    makeManageSubDaosAction,
    makeMigrateAction,
    makeMintAction,
    makePerformTokenSwapAction,
    makeSpendAction,
    makeStakeAction,
    makeTransferNFTAction,
    makeUpdateAdminAction,
    makeUpdateInfoAction,
    makeUpdatePreProposeConfigAction,
    makeUpdateVotingConfigAction,
    makeValidatorActions,
    makeWithdrawTokenSwapAction,
  } = useMakeProposalAction(coreAddress)
  const { address, cosmWasmClient, updateChooseWalletOpen } = useAccount()

  const name = deed?.name || ''
  const description = deed?.description || ''
  const actions = deed?.actions ?? []
  const validActions = actions.filter((item) => item.data)

  const handleValidate = () => {
    if (!address) {
      updateChooseWalletOpen(true)
      return false
    }
    if (!memberAddresses.includes(address)) {
      Toast.errorToast('You must be a member of the group')
      return false
    }
    return true
  }
  const handleBack = () => {
    history.push(`/create/entity/${entityId}/deed/${coreAddress}/setup-properties`)
  }
  const handleSubmit = async () => {
    if (!handleValidate()) {
      console.error(1)
      return
    }
    const wasmMessage: CosmosMsgForEmpty[] = validActions
      .map((validAction: TDeedActionModel) => {
        try {
          const { type, data } = validAction
          switch (type) {
            // Group Category
            case 'AuthZ Exec':
              return makeAuthzExecAction(data)
            case 'AuthZ Grant / Revoke':
              return makeAuthzAuthorizationAction(data)
            case 'Change Group Membership':
              return makeManageMembersAction(data)
            case 'Manage Subgroups':
              return makeManageSubDaosAction(data)
            case 'Manage Storage Items':
              return makeManageStorageItemsAction(data)
            case 'Update Info':
              return makeUpdateInfoAction(data)
            case 'Update Proposal Submission Config':
              return makeUpdatePreProposeConfigAction(data)
            case 'Update Voting Config':
              return makeUpdateVotingConfigAction(data)
            case 'DAO Admin Execute':
              // TODO: TBD ?
              return makeDaoAdminExecAction(data)
            case 'Vote on a Network Proposal':
              // TODO: TBD
              return makeGovernanceVoteAction('ixo12wgrrvmx5jx2mxhu6dvnfu3greamemnqfvx84a', data)

            // Smart Contracts Category
            case 'Execute Smart Contract':
              return makeExecuteAction(data)
            case 'Initiate Smart Contract':
              return makeInstantiateAction(data)
            case 'Migrate Smart Contract':
              return makeMigrateAction(data)
            case 'Update Contract Admin':
              return makeUpdateAdminAction(data)

            // Staking
            case 'Validator Actions':
              // TODO: validatorAddress ?
              return makeValidatorActions('ixovaloper1xz54y0ktew0dcm00f9vjw0p7x29pa4j5p9rwq6zerkytugzg27qsjdevsm', data)
            case 'Staking Actions':
              return makeStakeAction(data)

            // Custom
            case 'Custom':
              return makeCustomAction(data)

            // Token
            case 'Spend':
              return makeSpendAction(data)
            case 'Burn NFT':
              return makeBurnNftAction(data)
            case 'Mint':
              // TODO:
              return makeMintAction('ixo1g647t78y2ulqlm3lss8rs3d0spzd0teuwhdvnqn92tr79yltk9dq2h24za', data)
            case 'Manage Treasury NFTs':
              return makeManageCw721Action(entityId, data)
            case 'Manage Treasury Tokens':
              return makeManageCw20Action(entityId, data)
            case 'Transfer NFT':
              return makeTransferNFTAction(data)
            case 'Withdraw Token Swap':
              return makeWithdrawTokenSwapAction(data)
            case 'Token Swap':
              return makePerformTokenSwapAction(data)
            default:
              return undefined
          }
        } catch (e) {
          console.error(e)
          return undefined
        }
      })
      .filter(Boolean) as CosmosMsgForEmpty[]

    console.log('wasmMessage', decodedMessagesString(wasmMessage))

    const preProposalModuleAddress = daoGroup.proposalModule.preProposalContractAddress
    const daoProposalSingleClient = new contracts.DaoPreProposeSingle.DaoPreProposeSingleClient(
      cosmWasmClient,
      address,
      preProposalModuleAddress,
    )
    daoProposalSingleClient
      .propose({ msg: { propose: { description: description, msgs: wasmMessage, title: name } } }, fee)
      .then(({ transactionHash }) => {
        Toast.successToast(`Successfully published proposals`)
      })
      .catch((e) => {
        console.error(e)
        Toast.errorToast(e)
      })
  }

  return (
    <FlexBox width={'100%'} justifyContent='center'>
      <FlexBox direction='column' gap={15} width={deviceWidth.tablet + 'px'}>
        <FlexBox>
          <Typography variant='secondary' size='2xl'>
            The following {validActions.length} actions get executed when the proposal passes.
          </Typography>
        </FlexBox>

        <SetupActionsForm actions={actions} setActions={(actions) => updateDeed({ ...deed, actions })} />

        <FlexBox width='100%' justifyContent='flex-end' gap={4}>
          <Button variant='secondary' onClick={handleBack}>
            Back
          </Button>
          <Button disabled={!validActions.length} onClick={handleSubmit}>
            Submit
          </Button>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  )
}

export default SetupActions
