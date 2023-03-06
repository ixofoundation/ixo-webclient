import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { deviceWidth } from 'constants/device'
import { useCreateEntityState } from 'hooks/createEntity'
import { Button } from 'pages/CreateEntity/Components'
import React from 'react'
import { TDeedActionModel } from 'types/protocol'
import { useHistory, useParams } from 'react-router-dom'
import { decodedMessagesString } from 'utils/messages'
import { CosmosMsgFor_Empty } from 'types/dao'
import { SetupActionsForm } from './SetupActionsForm'
import { useMakeProposalAction } from 'hooks/proposal'
import { WasmExecuteTrx } from 'lib/protocol/cosmwasm'
import { useAccount } from 'hooks/account'

const SetupActions: React.FC = () => {
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
  } = useMakeProposalAction()
  const { signingClient, signer } = useAccount()

  const history = useHistory()
  const { entityId } = useParams<{ entityId: string }>()
  const { deed, updateDeed } = useCreateEntityState()
  const actions = deed?.actions ?? []
  const validActions = actions.filter((item) => item.data)

  const handleBack = () => {
    history.push(`/create/entity/${entityId}/deed/setup-properties`)
  }
  const handleSubmit = async () => {
    const wasmMessage: CosmosMsgFor_Empty[] = validActions
      .map((validAction: TDeedActionModel) => {
        try {
          const { type, data } = validAction
          switch (type) {
            case 'Spend':
              return makeSpendAction(data)
            case 'AuthZ Exec':
              return makeAuthzExecAction(entityId, data)
            case 'AuthZ Grant / Revoke':
              return makeAuthzAuthorizationAction(entityId, data)
            case 'Burn NFT':
              return makeBurnNftAction(data)
            case 'Mint':
              // TODO:
              return makeMintAction('ixo1g647t78y2ulqlm3lss8rs3d0spzd0teuwhdvnqn92tr79yltk9dq2h24za', data)
            case 'Execute Smart Contract':
              return makeExecuteAction(data)
            case 'Initiate Smart Contract':
              return makeInstantiateAction(data)
            case 'Manage Subgroups':
              return makeManageSubDaosAction(entityId, data)
            case 'Manage Treasury NFTs':
              return makeManageCw721Action(entityId, data)
            case 'Manage Treasury Tokens':
              return makeManageCw20Action(entityId, data)
            case 'Migrate Smart Contract':
              return makeMigrateAction(data)
            case 'Staking Actions':
              return makeStakeAction(data)
            case 'Transfer NFT':
              return makeTransferNFTAction(data)
            case 'Update Contract Admin':
              return makeUpdateAdminAction(data)
            case 'Update Proposal Submission Config':
              // TODO:
              return makeUpdatePreProposeConfigAction('preProposeAddress', data)
            case 'Update Voting Config':
              // TODO:
              return makeUpdateVotingConfigAction(entityId, 'proposalModuleAddress', data)
            case 'Vote on a Governance Proposal':
              // TODO:
              return makeGovernanceVoteAction('ixo12wgrrvmx5jx2mxhu6dvnfu3greamemnqfvx84a', data)
            case 'Withdraw Token Swap':
              return makeWithdrawTokenSwapAction(data)
            case 'Update Info':
              return makeUpdateInfoAction(entityId, data)
            case 'Custom':
              return makeCustomAction(data)
            case 'Change Group Membership':
              // TODO:
              return makeManageMembersAction('ixo12wgrrvmx5jx2mxhu6dvnfu3greamemnqfvx84a', data)
            case 'Manage Storage Items':
              return makeManageStorageItemsAction('ixo12wgrrvmx5jx2mxhu6dvnfu3greamemnqfvx84a', data)
            case 'Validator Actions':
              return makeValidatorActions('ixovaloper1xz54y0ktew0dcm00f9vjw0p7x29pa4j5p9rwq6zerkytugzg27qsjdevsm', data)
            case 'Token Swap':
              return makePerformTokenSwapAction(data)
            case 'DAO Admin Execute':
              return makeDaoAdminExecAction(data)
            default:
              return undefined
          }
        } catch (e) {
          console.error(e)
          return undefined
        }
      })
      .filter(Boolean) as CosmosMsgFor_Empty[]

    console.log('wasmMessage', decodedMessagesString(wasmMessage), wasmMessage)

    // const res = await WasmExecuteTrx(signingClient, signer, { msg: JSON.stringify(msg) })
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
