import { useWallet } from '@ixo-webclient/wallet-connector'
import { ixo } from '@ixo/impactxclient-sdk'
import { Box, Button, Text } from '@mantine/core'
import { useCurrentEntityAdminAccount } from 'hooks/currentEntity'
import { fee } from 'lib/protocol'
import { FC, useCallback, useState } from 'react'
import { ButtonProps } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { getEntityById } from 'redux/entities/entities.selectors'
import { useAppSelector } from 'redux/hooks'
import { errorToast, successToast } from 'utils/toast'

interface ClaimActionsProps {
  collectionId: string
}
const ClaimActions: FC<ClaimActionsProps> = ({ collectionId }) => {
  const { entityId } = useParams<{ entityId: string }>()

  return (
    <Box mt={15} bg='#fff' p={20} style={{ borderRadius: 12 }}>
      <Text size='12px'>Claim Admin</Text>
      <ActionButton renderRoot={(props) => <Link to={`/entity/${entityId}/dashboard/agents`} {...props} />}>
        Manage agents
      </ActionButton>
      <ActionButton disabled>Manage Payments</ActionButton>
      <ActionButton disabled>Update Collection</ActionButton>
      <EndClaimCollectionButton collectionId={collectionId} />
    </Box>
  )
}

export default ClaimActions

const EndClaimCollectionButton: FC<{
  collectionId: string
}> = ({ collectionId }) => {
  const { execute, close } = useWallet()
  const [mutationState, setMutationState] = useState<'idle' | 'pending' | 'success' | 'error'>('idle')
  const { entityId } = useParams<{ entityId: string }>()
  const { accounts } = useAppSelector(getEntityById(entityId ?? ''))

  const adminAddress = useCurrentEntityAdminAccount(accounts)

  const handleEndClaimCollection = useCallback(async () => {
    try {
      setMutationState('pending')
      await execute({
        data: {
          messages: [
            {
              typeUrl: '/ixo.claims.v1beta1.MsgUpdateCollectionState',
              value: ixo.claims.v1beta1.MsgUpdateCollectionState.fromPartial({
                adminAddress: adminAddress ?? '',
                state: ixo.claims.v1beta1.CollectionState.CLOSED,
                collectionId,
              }),
            },
          ],
          fee,
          memo: undefined,
        },
      })
      successToast('Success', 'Claim collection ended successfully')
    } catch (error) {
      setMutationState('error')
      let message = 'Failed to end claim collection'
      if (error instanceof Error) {
        message = error.message
      }
      errorToast('Failed', message, {
        type: 'error',
      })
    } finally {
      setMutationState('idle')
      close()
    }
  }, [adminAddress, close, collectionId, execute])
  return (
    <ActionButton
      disabled={mutationState !== 'idle' || !adminAddress}
      loading={mutationState === 'pending'}
      onClick={handleEndClaimCollection}
    >
      End Claim Collection
    </ActionButton>
  )
}

interface ActionButtonProps extends ButtonProps, React.ComponentPropsWithoutRef<'button'> {
  renderRoot?: (props: any) => JSX.Element
  loading?: boolean
}
const ActionButton: FC<ActionButtonProps> = (props) => <Button w='100%' radius={4} size='md' mt='md' {...props} />
