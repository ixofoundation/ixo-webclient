import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { PropertyBox } from 'pages/CreateEntity/Components'
import React, { useEffect, useMemo, useState } from 'react'
import { ProposalActionConfig, ProposalActionConfigMap, TProposalActionModel } from 'types/protocol'
import { parseEncodedMessage } from 'utils/messages'
import { useAccount } from 'hooks/account'
import { useCurrentEntityLinkedEntity } from 'hooks/currentEntity'
import { contracts } from '@ixo/impactxclient-sdk'
import { CosmosMsgForEmpty } from '@ixo/impactxclient-sdk/types/codegen/DaoProposalSingle.types'
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

const InstructionsToExecute: React.FC = () => {
  const { cosmWasmClient, address } = useAccount()
  const { linkedProposal } = useCurrentEntityLinkedEntity()
  const [actions, setActions] = useState<TProposalActionModel[]>([])
  const [selectedAction, setSelectedAction] = useState<TProposalActionModel | undefined>()

  const [, contractAddress, proposalId] = useMemo(() => {
    if (!linkedProposal) {
      return []
    }
    const { id } = linkedProposal
    return id.split('#')
  }, [linkedProposal])

  useEffect(() => {
    if (contractAddress && proposalId && cosmWasmClient && address) {
      ;(async () => {
        const daoCoreClient = new contracts.DaoCore.DaoCoreClient(cosmWasmClient, address, contractAddress)
        const [{ address: proposalModuleAddress }] = await daoCoreClient.proposalModules({})
        const daoProposalSingleClient = new contracts.DaoProposalSingle.DaoProposalSingleClient(
          cosmWasmClient,
          address,
          proposalModuleAddress,
        )
        const proposal = await daoProposalSingleClient.proposal({ proposalId: Number(proposalId) })
        if (proposal) {
          const { msgs } = proposal.proposal
          const actions = msgs
            .map((msg: CosmosMsgForEmpty, index) => {
              if ('wasm' in msg && 'execute' in msg.wasm && 'msg' in msg.wasm.execute) {
                const encodedMessage = parseEncodedMessage(msg.wasm.execute.msg)
                const key = Object.keys(encodedMessage)[0]
                const value = Object.values(encodedMessage)[0]

                const proposalActionDetail = ProposalActionConfigMap[`wasm.execute.${key}`]
                return {
                  ...proposalActionDetail,
                  data: value,
                  type: `wasm.execute.${key}`,
                  id: index,
                }
              }
              // TODO: else if ()
              return undefined
            })
            .filter(Boolean)

          console.log({ proposal, msgs, actions })
          setActions(actions)
        }
      })()
    }
  }, [contractAddress, proposalId, cosmWasmClient, address])

  return (
    <FlexBox width='100%' direction='column' gap={5} px={5} pt={5} pb={9} background='white' borderRadius='4px'>
      <Typography variant='secondary' size='2xl'>
        Instructions to execute
      </Typography>
      <FlexBox gap={4}>
        {actions.map((action, index) => {
          const Icon = ProposalActionConfig[action.group].items[action.text].icon
          return (
            <PropertyBox
              key={index}
              icon={<Icon />}
              label={action.text}
              set={action.data}
              handleClick={() => setSelectedAction(action)}
            />
          )
        })}
      </FlexBox>
      {selectedAction?.text === 'AuthZ Exec' && (
        <SetupAuthzExecModal
          open={selectedAction?.text === 'AuthZ Exec'}
          action={selectedAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.text === 'AuthZ Grant / Revoke' && (
        <SetupAuthzGrantModal
          open={selectedAction?.text === 'AuthZ Grant / Revoke'}
          action={selectedAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.text === 'Mint' && (
        <SetupMintModal
          open={selectedAction?.text === 'Mint'}
          action={selectedAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.text === 'Burn NFT' && (
        <SetupBurnNFTModal
          open={selectedAction?.text === 'Burn NFT'}
          action={selectedAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.text === 'Execute Smart Contract' && (
        <SetupExecuteSmartContractModal
          open={selectedAction?.text === 'Execute Smart Contract'}
          action={selectedAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.text === 'Initiate Smart Contract' && (
        <SetupInstantiateSmartContractModal
          open={selectedAction?.text === 'Initiate Smart Contract'}
          action={selectedAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.text === 'Migrate Smart Contract' && (
        <SetupMigrateSmartContractModal
          open={selectedAction?.text === 'Migrate Smart Contract'}
          action={selectedAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.text === 'Change Group Membership' && (
        <SetupManageMembersModal
          open={selectedAction?.text === 'Change Group Membership'}
          action={selectedAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.text === 'Manage Subgroups' && (
        <SetupManageSubDAOsModal
          open={selectedAction?.text === 'Manage Subgroups'}
          action={selectedAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.text === 'Manage Treasury NFTs' && (
        <SetupManageTreasuryNFTsModal
          open={selectedAction?.text === 'Manage Treasury NFTs'}
          action={selectedAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.text === 'Manage Treasury Tokens' && (
        <SetupManageTreasuryTokensModal
          open={selectedAction?.text === 'Manage Treasury Tokens'}
          action={selectedAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.text === 'Spend' && (
        <SetupSpendModal
          open={selectedAction?.text === 'Spend'}
          action={selectedAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.text === 'Staking Actions' && (
        <SetupStakingActionsModal
          open={selectedAction?.text === 'Staking Actions'}
          action={selectedAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.text === 'Token Swap' && (
        <SetupTokenSwapModal
          open={selectedAction?.text === 'Token Swap'}
          action={selectedAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.text === 'Transfer NFT' && (
        <SetupTransferNFTModal
          open={selectedAction?.text === 'Transfer NFT'}
          action={selectedAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.text === 'Update Contract Admin' && (
        <SetupUpdateContractAdminModal
          open={selectedAction?.text === 'Update Contract Admin'}
          action={selectedAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.text === 'Update Info' && (
        <SetupUpdateDAOInfoModal
          open={selectedAction?.text === 'Update Info'}
          action={selectedAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.text === 'Update Proposal Submission Config' && (
        <SetupUpdateProposalSubmissionConfigModal
          open={selectedAction?.text === 'Update Proposal Submission Config'}
          action={selectedAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.text === 'Update Voting Config' && (
        <SetupUpdateVotingConfigModal
          open={selectedAction?.text === 'Update Voting Config'}
          action={selectedAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.text === 'Validator Actions' && (
        <SetupValidatorActionsModal
          open={selectedAction?.text === 'Validator Actions'}
          action={selectedAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.text === 'Vote on a Network Proposal' && (
        <SetupVoteOnAGovernanceProposalModal
          open={selectedAction?.text === 'Vote on a Network Proposal'}
          action={selectedAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.text === 'Withdraw Token Swap' && (
        <SetupWithdrawTokenSwapModal
          open={selectedAction?.text === 'Withdraw Token Swap'}
          action={selectedAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.text === 'Custom' && (
        <SetupCustomModal
          open={selectedAction?.text === 'Custom'}
          action={selectedAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.text === 'Manage Storage Items' && (
        <SetupManageStorageItemsModal
          open={selectedAction?.text === 'Manage Storage Items'}
          action={selectedAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
      {selectedAction?.text === 'DAO Admin Execute' && (
        <SetupDAOAdminExecuteModal
          open={selectedAction?.text === 'DAO Admin Execute'}
          action={selectedAction}
          onClose={() => setSelectedAction(undefined)}
        />
      )}
    </FlexBox>
  )
}

export default InstructionsToExecute
