import { FlexBox } from 'components/App/App.styles'
import { PropertyBox } from 'pages/CreateEntity/Components'
import React, { useState } from 'react'
import { DeedActionConfig, TDeedActionModel } from 'types/protocol'
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
} from 'components/Modals/AddActionModal'

interface Props {
  actions: TDeedActionModel[]
  setActions: (actions: TDeedActionModel[]) => void
}

const SetupActionsForm: React.FC<Props> = ({ actions, setActions }): JSX.Element => {
  const [openAddActionModal, setOpenAddActionModal] = useState(false)
  const [selectedAction, setSelectedAction] = useState<TDeedActionModel | undefined>()

  const handleAddAction = (action: TDeedActionModel): void => {
    setActions([...actions, action])
    setSelectedAction(action)
  }
  const handleRemoveAction = (id: string): void => {
    setActions([...actions].filter((item) => item.id !== id))
  }
  const handleUpdateAction = (action: TDeedActionModel): void => {
    setActions(actions.map((item, i) => (item.id === action.id ? action : item)))
  }

  return (
    <>
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
      {selectedAction?.type === 'Vote on a Network Proposal' && (
        <SetupVoteOnAGovernanceProposalModal
          open={selectedAction?.type === 'Vote on a Network Proposal'}
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
      {selectedAction?.type === 'DAO Admin Execute' && (
        <SetupDAOAdminExecuteModal
          open={selectedAction?.type === 'DAO Admin Execute'}
          action={selectedAction}
          onSubmit={handleUpdateAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
    </>
  )
}

export default SetupActionsForm
