import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { PropertyBox } from 'screens/CreateEntity/Components'
import React, { useEffect, useMemo, useState } from 'react'
import { useAccount } from 'hooks/account'
import { contracts } from '@ixo/impactxclient-sdk'
import { useParams } from 'react-router-dom'
import { proposalMsgToActionConfig } from 'utils/dao'
import { TEntityModel, TProposalActionModel } from 'types/entities'
import { ProposalActionConfigMap } from 'constants/entity'
import { useEntityQuery } from 'generated/graphql'
import { apiEntityToEntity } from 'utils/entities'

const InstructionsToExecute: React.FC = () => {
  const { deedId = '' } = useParams<{ deedId: string }>()
  const { cwClient, address } = useAccount()
  const [fetchedEntity, setFetchedEntity] = useState<TEntityModel | null>(null)
  useEntityQuery({
    variables: {
      id: deedId,
    },
    skip: Boolean(fetchedEntity),
    onCompleted: (data) => {
      setFetchedEntity(data?.entity as any)
      apiEntityToEntity({ entity: data?.entity, cwClient }, (key, value) => {
        setFetchedEntity((entity: any) => ({ ...entity, [key]: value }))
      })
    },
  })
  const linkedProposal = useMemo(
    () => (fetchedEntity?.linkedEntity ?? []).find(({ type }) => type === 'deed'),
    [fetchedEntity],
  )
  const [actions, setActions] = useState<TProposalActionModel[]>([])
  const [selectedAction, setSelectedAction] = useState<TProposalActionModel | undefined>()
  const SetupModal = useMemo(() => {
    if (!selectedAction) {
      return undefined
    }
    try {
      return ProposalActionConfigMap[selectedAction.type!].setupModal
    } catch (e) {
      return undefined
    }
  }, [selectedAction])

  const [, contractAddress, proposalId] = useMemo(() => {
    if (!linkedProposal) {
      return []
    }
    const { id } = linkedProposal
    return id.split('#')
  }, [linkedProposal])

  useEffect(() => {
    if (contractAddress && proposalId && cwClient && address) {
      ;(async () => {
        const daoCoreClient = new contracts.DaoCore.DaoCoreQueryClient(cwClient, contractAddress)
        const [{ address: proposalModuleAddress }] = await daoCoreClient.proposalModules({})
        const daoProposalSingleClient = new contracts.DaoProposalSingle.DaoProposalSingleQueryClient(
          cwClient,
          proposalModuleAddress,
        )
        const proposal = await daoProposalSingleClient.proposal({ proposalId: Number(proposalId) })
        if (proposal) {
          const { msgs } = proposal.proposal
          const actions = msgs.map(proposalMsgToActionConfig).filter(Boolean)

          console.log({ proposal, msgs, actions })
          setActions(actions)
        }
      })()
    }
    return () => {
      setActions([])
    }
  }, [contractAddress, proposalId, cwClient, address])

  return (
    <FlexBox width='100%' $direction='column' $gap={5} px={5} pt={5} pb={9} background='white' $borderRadius='4px'>
      <Typography variant='secondary' size='2xl'>
        Instructions to execute
      </Typography>
      <FlexBox $gap={4}>
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
