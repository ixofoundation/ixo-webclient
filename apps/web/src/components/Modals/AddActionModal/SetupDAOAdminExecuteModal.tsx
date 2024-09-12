import React, { useEffect, useMemo, useState } from 'react'
import { FlexBox } from 'components/CoreEntry/App.styles'
import { AccountValidStatus, Input } from 'screens/CreateEntity/Components'
import { TProposalActionModel } from 'types/entities'
import SetupActionModalTemplate from './SetupActionModalTemplate'
import { CosmosMsgFor_Empty } from 'types/dao'
import { Typography } from 'components/Typography'
import { useMakeProposalAction } from 'hooks/proposal'
import { SetupActionsForm } from 'screens/CurrentEntity/Dashboard/DAODashboard/Governance/CreateProposal/SetupProposalActions/SetupActionsForm'

export const TYPE_URL_MSG_GRANT = '/cosmos.authz.v1beta1.MsgGrant'
export const TYPE_URL_MSG_REVOKE = '/cosmos.authz.v1beta1.MsgRevoke'
export const TYPE_URL_GENERIC_AUTHORIZATION = '/cosmos.authz.v1beta1.GenericAuthorization'

export type DaoAdminExecData = {
  coreAddress: string
  msgs: CosmosMsgFor_Empty[]

  // Interal action data so that errors are added to main form.
  _actions?: TProposalActionModel[]
}

const initialState: DaoAdminExecData = {
  coreAddress: '',
  msgs: [],
  _actions: [],
}

interface Props {
  open: boolean
  action: TProposalActionModel
  onClose: () => void
  onSubmit?: (data: any) => void
}

const SetupDAOAdminExecuteModal: React.FC<Props> = ({ open, action, onClose, onSubmit }): JSX.Element => {
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
  } = useMakeProposalAction('groupAddress', {})
  // TODO: check above params passed to useMakeProposalAction
  const [formData, setFormData] = useState<DaoAdminExecData>(initialState)
  const validActions = (formData._actions ?? []).filter((item) => item.data)
  const daoAddress = 'ixo1xc798xnhp7yy9mpp80v3tsxppw8qk0y9atm965'

  const validate = useMemo(() => !!formData.coreAddress && (formData._actions ?? []).length > 0, [formData])

  useEffect(() => {
    setFormData(action?.data ?? initialState)
  }, [action])

  const handleUpdateFormData = (key: string, value: any) => {
    onSubmit && setFormData((data: any) => ({ ...data, [key]: value }))
  }

  const handleConfirm = () => {
    const wasmMessage: CosmosMsgFor_Empty[] = validActions
      .map((validAction: TProposalActionModel) => {
        try {
          const { type, data } = validAction
          switch (type) {
            case 'Spend':
              return makeSpendAction(data)
            case 'AuthZ Exec':
              return makeAuthzExecAction(data)
            case 'AuthZ Grant / Revoke':
              return makeAuthzAuthorizationAction(data)
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
              return makeManageSubDaosAction(data)
            case 'Manage Treasury NFTs':
              return makeManageCw721Action(daoAddress, data)
            case 'Manage Treasury Tokens':
              return makeManageCw20Action(daoAddress, data)
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
              return makeUpdatePreProposeConfigAction(data)
            case 'Update Voting Config':
              // TODO:
              return makeUpdateVotingConfigAction(data)
            case 'Vote on a Network Proposal':
              // TODO:
              return makeGovernanceVoteAction('ixo12wgrrvmx5jx2mxhu6dvnfu3greamemnqfvx84a', data)
            case 'Withdraw Token Swap':
              return makeWithdrawTokenSwapAction(data)
            case 'Update Info':
              return makeUpdateInfoAction(data)
            case 'Custom':
              return makeCustomAction(data)
            case 'Change Group Membership':
              // TODO:
              return makeManageMembersAction(data, '')
            case 'Manage Storage Items':
              return makeManageStorageItemsAction(data)
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

    console.log('wasmMessage', wasmMessage)

    handleUpdateFormData('msgs', wasmMessage)
    onSubmit && onSubmit({ ...action, data: { ...formData, msgs: wasmMessage } })
    onClose()
  }

  return (
    <SetupActionModalTemplate
      open={open}
      action={action}
      onClose={onClose}
      onSubmit={onSubmit && handleConfirm}
      validate={validate}
    >
      <FlexBox $direction='column' width='100%' $gap={2}>
        <FlexBox width='100%' $gap={4}>
          <Input
            name='core_address'
            placeholder='Enter Address'
            inputValue={formData.coreAddress}
            handleChange={(value) => handleUpdateFormData('coreAddress', value)}
          />
          <AccountValidStatus address={formData.coreAddress} style={{ flex: '0 0 48px' }} />
        </FlexBox>
      </FlexBox>

      {formData.coreAddress && (
        <>
          <FlexBox width='100%'>
            <Typography size='xl'>The following actions will be executed when the proposal passes:</Typography>
          </FlexBox>

          <SetupActionsForm
            actions={formData._actions ?? []}
            setActions={(actions) => handleUpdateFormData('_actions', actions)}
          />
        </>
      )}
    </SetupActionModalTemplate>
  )
}

export default SetupDAOAdminExecuteModal
