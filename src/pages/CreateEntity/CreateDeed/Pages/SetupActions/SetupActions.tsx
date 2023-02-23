import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { deviceWidth } from 'constants/device'
import { useCreateEntityState } from 'hooks/createEntity'
import { Button, PropertyBox } from 'pages/CreateEntity/Components'
import React, { useState } from 'react'
import { ReactComponent as PlusIcon } from 'assets/images/icon-plus.svg'
import { AddActionModal } from 'components/Modals'
import { DeedActionConfig, TDeedActionModel } from 'types/protocol'
import {
  SetupAuthzExecModal,
  SetupAuthzGrantModal,
  SetupBurnNFTModal,
  SetupExecuteSmartContractModal,
  SetupInstantiateSmartContractModal,
  SetupManageMembersModal,
  SetupManageSubDAOsModal,
  SetupManageTreasuryNFTsModal,
  SetupManageTreasuryTokensModal,
  SetupSpendModal,
  SetupStakingActionsModal,
  SetupTokenSwapModal,
  SetupTransferNFTModal,
  SetupUpdateContractAdminModal,
  SetupUpdateDAOInfoModal,
  SetupUpdateProposalSubmissionConfigModal,
  SetupUpdateVotingConfigModal,
  SetupValidatorActionsModal,
  SetupVoteOnAGovernanceProposalModal,
  SetupMigrateSmartContractModal,
  SetupMintModal,
  SetupWithdrawTokenSwapModal,
  SetupCustomModal,
} from 'components/Modals/AddActionModal'
import { useHistory, useParams } from 'react-router-dom'
import {
  makeAuthzAuthorizationAction,
  makeAuthzExecAction,
  makeBurnNftAction,
  makeCustomAction,
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
  makeSpendAction,
  makeStakeAction,
  makeTransferNFTAction,
  makeUpdateAdminAction,
  makeUpdateInfoAction,
  makeUpdatePreProposeConfigAction,
  makeUpdateVotingConfigAction,
  makeValidatorActions,
  makeWithdrawTokenSwapAction,
} from 'lib/protocol/proposal'
import { decodedMessagesString } from 'utils/messages'
import { CosmosMsgFor_Empty } from 'types/dao'
import SetupManageStorageItemsModal from 'components/Modals/AddActionModal/SetupManageStorageItemsModal'

const SetupActions: React.FC = () => {
  const history = useHistory()
  const { entityId } = useParams<{ entityId: string }>()
  const { deed, updateDeed } = useCreateEntityState()
  const [openAddActionModal, setOpenAddActionModal] = useState(false)
  const [selectedAction, setSelectedAction] = useState<TDeedActionModel | undefined>()
  const actions = deed?.actions ?? []
  const validActions = actions.filter((item) => item.data)

  const handleAddAction = (action: TDeedActionModel): void => {
    updateDeed({ ...deed, actions: [...actions, action] })
    setSelectedAction(action)
  }
  const handleRemoveAction = (id: string): void => {
    updateDeed({ ...deed, actions: [...actions].filter((item) => item.id !== id) })
  }
  const handleUpdateAction = (action: TDeedActionModel): void => {
    updateDeed({ ...deed, actions: actions.map((item, i) => (item.id === action.id ? action : item)) })
  }

  const handleBack = () => {
    history.push(`/create/entity/${entityId}/deed/setup-properties`)
  }
  const handleSubmit = () => {
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
            default:
              return undefined
          }
        } catch (e) {
          console.error(e)
          return undefined
        }
      })
      .filter(Boolean) as CosmosMsgFor_Empty[]

    console.log('wasmMessage', decodedMessagesString(wasmMessage))
  }

  return (
    <FlexBox width={'100%'} justifyContent='center'>
      <FlexBox direction='column' gap={15} width={deviceWidth.tablet + 'px'}>
        <FlexBox>
          <Typography variant='secondary' size='2xl'>
            DAO following {validActions.length} actions get executed when the proposal passes.
          </Typography>
        </FlexBox>

        <FlexBox gap={5} flexWrap='wrap'>
          {actions.map((item) => {
            const Icon = DeedActionConfig[item.group].items[item.type].icon
            return (
              <PropertyBox
                key={item.id}
                icon={<Icon />}
                label={item.type}
                set={item.data}
                handleClick={() => setSelectedAction(item)}
                handleRemove={() => handleRemoveAction(item.id)}
              />
            )
          })}
          <PropertyBox icon={<PlusIcon />} noData handleClick={(): void => setOpenAddActionModal(true)} />
        </FlexBox>

        <FlexBox width='100%' justifyContent='flex-end' gap={4}>
          <Button variant='secondary' onClick={handleBack}>
            Back
          </Button>
          <Button disabled={!validActions.length} onClick={handleSubmit}>
            Submit
          </Button>
        </FlexBox>
      </FlexBox>
      <AddActionModal open={openAddActionModal} onClose={() => setOpenAddActionModal(false)} onAdd={handleAddAction} />
      {selectedAction?.type === 'AuthZ Exec' && (
        <SetupAuthzExecModal
          open={selectedAction?.type === 'AuthZ Exec'}
          action={selectedAction}
          onSubmit={handleUpdateAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.type === 'AuthZ Grant / Revoke' && (
        <SetupAuthzGrantModal
          open={selectedAction?.type === 'AuthZ Grant / Revoke'}
          action={selectedAction}
          onSubmit={handleUpdateAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.type === 'Mint' && (
        <SetupMintModal
          open={selectedAction?.type === 'Mint'}
          action={selectedAction}
          onSubmit={handleUpdateAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.type === 'Burn NFT' && (
        <SetupBurnNFTModal
          open={selectedAction?.type === 'Burn NFT'}
          action={selectedAction}
          onSubmit={handleUpdateAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.type === 'Execute Smart Contract' && (
        <SetupExecuteSmartContractModal
          open={selectedAction?.type === 'Execute Smart Contract'}
          action={selectedAction}
          onSubmit={handleUpdateAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.type === 'Initiate Smart Contract' && (
        <SetupInstantiateSmartContractModal
          open={selectedAction?.type === 'Initiate Smart Contract'}
          action={selectedAction}
          onSubmit={handleUpdateAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.type === 'Migrate Smart Contract' && (
        <SetupMigrateSmartContractModal
          open={selectedAction?.type === 'Migrate Smart Contract'}
          action={selectedAction}
          onSubmit={handleUpdateAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.type === 'Change Group Membership' && (
        <SetupManageMembersModal
          open={selectedAction?.type === 'Change Group Membership'}
          action={selectedAction}
          onSubmit={handleUpdateAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.type === 'Manage Subgroups' && (
        <SetupManageSubDAOsModal
          open={selectedAction?.type === 'Manage Subgroups'}
          action={selectedAction}
          onSubmit={handleUpdateAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.type === 'Manage Treasury NFTs' && (
        <SetupManageTreasuryNFTsModal
          open={selectedAction?.type === 'Manage Treasury NFTs'}
          action={selectedAction}
          onSubmit={handleUpdateAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.type === 'Manage Treasury Tokens' && (
        <SetupManageTreasuryTokensModal
          open={selectedAction?.type === 'Manage Treasury Tokens'}
          action={selectedAction}
          onSubmit={handleUpdateAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.type === 'Spend' && (
        <SetupSpendModal
          open={selectedAction?.type === 'Spend'}
          action={selectedAction}
          onSubmit={handleUpdateAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.type === 'Staking Actions' && (
        <SetupStakingActionsModal
          open={selectedAction?.type === 'Staking Actions'}
          action={selectedAction}
          onSubmit={handleUpdateAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.type === 'Token Swap' && (
        <SetupTokenSwapModal
          open={selectedAction?.type === 'Token Swap'}
          action={selectedAction}
          onSubmit={handleUpdateAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.type === 'Transfer NFT' && (
        <SetupTransferNFTModal
          open={selectedAction?.type === 'Transfer NFT'}
          action={selectedAction}
          onSubmit={handleUpdateAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.type === 'Update Contract Admin' && (
        <SetupUpdateContractAdminModal
          open={selectedAction?.type === 'Update Contract Admin'}
          action={selectedAction}
          onSubmit={handleUpdateAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.type === 'Update Info' && (
        <SetupUpdateDAOInfoModal
          open={selectedAction?.type === 'Update Info'}
          action={selectedAction}
          onSubmit={handleUpdateAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.type === 'Update Proposal Submission Config' && (
        <SetupUpdateProposalSubmissionConfigModal
          open={selectedAction?.type === 'Update Proposal Submission Config'}
          action={selectedAction}
          onSubmit={handleUpdateAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.type === 'Update Voting Config' && (
        <SetupUpdateVotingConfigModal
          open={selectedAction?.type === 'Update Voting Config'}
          action={selectedAction}
          onSubmit={handleUpdateAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.type === 'Validator Actions' && (
        <SetupValidatorActionsModal
          open={selectedAction?.type === 'Validator Actions'}
          action={selectedAction}
          onSubmit={handleUpdateAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.type === 'Vote on a Governance Proposal' && (
        <SetupVoteOnAGovernanceProposalModal
          open={selectedAction?.type === 'Vote on a Governance Proposal'}
          action={selectedAction}
          onSubmit={handleUpdateAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.type === 'Withdraw Token Swap' && (
        <SetupWithdrawTokenSwapModal
          open={selectedAction?.type === 'Withdraw Token Swap'}
          action={selectedAction}
          onSubmit={handleUpdateAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.type === 'Custom' && (
        <SetupCustomModal
          open={selectedAction?.type === 'Custom'}
          action={selectedAction}
          onSubmit={handleUpdateAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.type === 'Manage Storage Items' && (
        <SetupManageStorageItemsModal
          open={selectedAction?.type === 'Manage Storage Items'}
          action={selectedAction}
          onSubmit={handleUpdateAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
    </FlexBox>
  )
}

export default SetupActions
