import { FlexBox } from 'components/App/App.styles'
import { PropertyBox } from 'pages/CreateEntity/Components'
import React, { useState } from 'react'
import { ProposalActionConfig, TProposalActionModel } from 'types/protocol'
import { ReactComponent as PlusIcon } from 'assets/images/icon-plus.svg'

import { AddActionModal } from 'components/Modals'
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
  SetupManageStorageItemsModal,
  SetupDAOAdminExecuteModal,
  SetupEditEntityModal,
} from 'components/Modals/AddActionModal'

interface Props {
  actions: TProposalActionModel[]
  setActions: (actions: TProposalActionModel[]) => void
}

const SetupActionsForm: React.FC<Props> = ({ actions, setActions }): JSX.Element => {
  const [openAddActionModal, setOpenAddActionModal] = useState(false)
  const [selectedAction, setSelectedAction] = useState<TProposalActionModel | undefined>()

  const handleAddAction = (action: TProposalActionModel): void => {
    setActions([...actions, action])
    setSelectedAction(action)
  }
  const handleRemoveAction = (id: string): void => {
    setActions([...actions].filter((item) => item.id !== id))
  }
  const handleUpdateAction = (action: TProposalActionModel): void => {
    setActions(actions.map((item, i) => (item.id === action.id ? action : item)))
  }

  return (
    <>
      <FlexBox gap={5} flexWrap='wrap'>
        {actions.map((item) => {
          const Icon = ProposalActionConfig[item.group].items[item.text].icon
          return (
            <PropertyBox
              key={item.id}
              icon={<Icon />}
              label={item.text}
              set={item.data}
              handleClick={() => setSelectedAction(item)}
              handleRemove={() => handleRemoveAction(item.id)}
            />
          )
        })}
        <PropertyBox icon={<PlusIcon />} noData handleClick={(): void => setOpenAddActionModal(true)} />
      </FlexBox>
      <AddActionModal open={openAddActionModal} onClose={() => setOpenAddActionModal(false)} onAdd={handleAddAction} />
      {selectedAction?.text === 'AuthZ Exec' && (
        <SetupAuthzExecModal
          open={selectedAction?.text === 'AuthZ Exec'}
          action={selectedAction}
          onSubmit={handleUpdateAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.text === 'AuthZ Grant / Revoke' && (
        <SetupAuthzGrantModal
          open={selectedAction?.text === 'AuthZ Grant / Revoke'}
          action={selectedAction}
          onSubmit={handleUpdateAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.text === 'Mint' && (
        <SetupMintModal
          open={selectedAction?.text === 'Mint'}
          action={selectedAction}
          onSubmit={handleUpdateAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.text === 'Burn NFT' && (
        <SetupBurnNFTModal
          open={selectedAction?.text === 'Burn NFT'}
          action={selectedAction}
          onSubmit={handleUpdateAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.text === 'Execute Smart Contract' && (
        <SetupExecuteSmartContractModal
          open={selectedAction?.text === 'Execute Smart Contract'}
          action={selectedAction}
          onSubmit={handleUpdateAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.text === 'Initiate Smart Contract' && (
        <SetupInstantiateSmartContractModal
          open={selectedAction?.text === 'Initiate Smart Contract'}
          action={selectedAction}
          onSubmit={handleUpdateAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.text === 'Migrate Smart Contract' && (
        <SetupMigrateSmartContractModal
          open={selectedAction?.text === 'Migrate Smart Contract'}
          action={selectedAction}
          onSubmit={handleUpdateAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.text === 'Change Group Membership' && (
        <SetupManageMembersModal
          open={selectedAction?.text === 'Change Group Membership'}
          action={selectedAction}
          onSubmit={handleUpdateAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.text === 'Manage Subgroups' && (
        <SetupManageSubDAOsModal
          open={selectedAction?.text === 'Manage Subgroups'}
          action={selectedAction}
          onSubmit={handleUpdateAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.text === 'Manage Treasury NFTs' && (
        <SetupManageTreasuryNFTsModal
          open={selectedAction?.text === 'Manage Treasury NFTs'}
          action={selectedAction}
          onSubmit={handleUpdateAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.text === 'Manage Treasury Tokens' && (
        <SetupManageTreasuryTokensModal
          open={selectedAction?.text === 'Manage Treasury Tokens'}
          action={selectedAction}
          onSubmit={handleUpdateAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.text === 'Spend' && (
        <SetupSpendModal
          open={selectedAction?.text === 'Spend'}
          action={selectedAction}
          onSubmit={handleUpdateAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.text === 'Staking Actions' && (
        <SetupStakingActionsModal
          open={selectedAction?.text === 'Staking Actions'}
          action={selectedAction}
          onSubmit={handleUpdateAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.text === 'Token Swap' && (
        <SetupTokenSwapModal
          open={selectedAction?.text === 'Token Swap'}
          action={selectedAction}
          onSubmit={handleUpdateAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.text === 'Transfer NFT' && (
        <SetupTransferNFTModal
          open={selectedAction?.text === 'Transfer NFT'}
          action={selectedAction}
          onSubmit={handleUpdateAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.text === 'Update Contract Admin' && (
        <SetupUpdateContractAdminModal
          open={selectedAction?.text === 'Update Contract Admin'}
          action={selectedAction}
          onSubmit={handleUpdateAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.text === 'Update Info' && (
        <SetupUpdateDAOInfoModal
          open={selectedAction?.text === 'Update Info'}
          action={selectedAction}
          onSubmit={handleUpdateAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.text === 'Update Proposal Submission Config' && (
        <SetupUpdateProposalSubmissionConfigModal
          open={selectedAction?.text === 'Update Proposal Submission Config'}
          action={selectedAction}
          onSubmit={handleUpdateAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.text === 'Update Voting Config' && (
        <SetupUpdateVotingConfigModal
          open={selectedAction?.text === 'Update Voting Config'}
          action={selectedAction}
          onSubmit={handleUpdateAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.text === 'Validator Actions' && (
        <SetupValidatorActionsModal
          open={selectedAction?.text === 'Validator Actions'}
          action={selectedAction}
          onSubmit={handleUpdateAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.text === 'Vote on a Network Proposal' && (
        <SetupVoteOnAGovernanceProposalModal
          open={selectedAction?.text === 'Vote on a Network Proposal'}
          action={selectedAction}
          onSubmit={handleUpdateAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.text === 'Withdraw Token Swap' && (
        <SetupWithdrawTokenSwapModal
          open={selectedAction?.text === 'Withdraw Token Swap'}
          action={selectedAction}
          onSubmit={handleUpdateAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.text === 'Custom' && (
        <SetupCustomModal
          open={selectedAction?.text === 'Custom'}
          action={selectedAction}
          onSubmit={handleUpdateAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.text === 'Manage Storage Items' && (
        <SetupManageStorageItemsModal
          open={selectedAction?.text === 'Manage Storage Items'}
          action={selectedAction}
          onSubmit={handleUpdateAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.text === 'DAO Admin Execute' && (
        <SetupDAOAdminExecuteModal
          open={selectedAction?.text === 'DAO Admin Execute'}
          action={selectedAction}
          onSubmit={handleUpdateAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.text === 'Edit Entity' && (
        <SetupEditEntityModal
          open={selectedAction?.text === 'Edit Entity'}
          action={selectedAction}
          onSubmit={handleUpdateAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
    </>
  )
}

export default SetupActionsForm
