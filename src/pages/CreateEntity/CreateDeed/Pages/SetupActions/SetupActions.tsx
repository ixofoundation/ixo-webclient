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
} from 'components/Modals/AddActionModal'
import { useHistory, useParams } from 'react-router-dom'

const SetupActions: React.FC = () => {
  const history = useHistory()
  const { entityId } = useParams<{ entityId: string }>()
  const { deed, updateDeed } = useCreateEntityState()
  const [openAddActionModal, setOpenAddActionModal] = useState(false)
  const [selectedAction, setSelectedAction] = useState<TDeedActionModel | undefined>()
  const actions = deed?.actions ?? []
  const numOfValidActions = actions.filter((item) => item.data).length

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

  const onBack = () => {
    history.push(`/create/entity/${entityId}/deed/setup-properties`)
  }
  const onContinue = () => {
    //
  }

  return (
    <FlexBox width={'100%'} justifyContent='center'>
      <FlexBox direction='column' gap={15} width={deviceWidth.tablet + 'px'}>
        <FlexBox>
          <Typography variant='secondary' size='2xl'>
            {numOfValidActions} actions get executed when the proposal passes.
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
          <Button variant='secondary' onClick={onBack}>
            Back
          </Button>
          <Button onClick={onContinue}>Continue</Button>
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
    </FlexBox>
  )
}

export default SetupActions
