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

const InstructionsToExecute: React.FC = () => {
  const { cosmWasmClient, address } = useAccount()
  const { linkedProposal } = useCurrentEntityLinkedEntity()
  const [actions, setActions] = useState<TProposalActionModel[]>([])
  const [selectedAction, setSelectedAction] = useState<TProposalActionModel | undefined>()
  const SetupModal = useMemo(() => {
    if (!selectedAction) {
      return undefined
    }
    try {
      return ProposalActionConfig[selectedAction.group].items[selectedAction.text].setupModal
    } catch (e) {
      return undefined
    }
  }, [selectedAction])

  console.log({ selectedAction })

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

                let key: string = Object.keys(encodedMessage)[0]
                const value: any = Object.values(encodedMessage)[0]

                if (key === 'update_config') {
                  if ('config' in value) {
                    key += '.config'
                  } else if ('deposit_info' in value) {
                    key += '.proposal'
                  } else if ('threshold' in value) {
                    key += '.voting'
                  }
                }

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
    return () => {
      setActions([])
    }
  }, [contractAddress, proposalId, cosmWasmClient, address])

  return (
    <FlexBox width='100%' direction='column' gap={5} px={5} pt={5} pb={9} background='white' borderRadius='4px'>
      <Typography variant='secondary' size='2xl'>
        Instructions to execute
      </Typography>
      <FlexBox gap={4}>
        {actions.map((action, index) => {
          const Icon = ProposalActionConfigMap[action.type!]?.icon
          return (
            <PropertyBox
              key={index}
              icon={Icon && <Icon />}
              label={action.text}
              set={action.data}
              handleClick={() => setSelectedAction(action)}
            />
          )
        })}
      </FlexBox>

      {SetupModal && (
        <SetupModal open={!!SetupModal} action={selectedAction} onClose={() => setSelectedAction(undefined)} />
      )}
    </FlexBox>
  )
}

export default InstructionsToExecute
