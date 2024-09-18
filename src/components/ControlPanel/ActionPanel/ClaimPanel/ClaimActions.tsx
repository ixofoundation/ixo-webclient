import { Box, Button, ButtonProps, Text } from '@mantine/core'
import { FC } from 'react'
import { Link, useParams } from 'react-router-dom'

const ActionButton: FC<
  ButtonProps & {
    renderRoot?: (props: any) => JSX.Element
  }
> = (props) => <Button w='100%' radius={4} size='md' mt='md' {...props} />

const ClaimActions: FC = () => {
  const { entityId } = useParams<{ entityId: string }>()
  return (
    <Box mt={15} bg='#fff' p={20} style={{ borderRadius: 12 }}>
      <Text size='12px'>Claim Admin</Text>
      <ActionButton renderRoot={(props) => <Link to={`/entity/${entityId}/dashboard/agents`} {...props} />}>
        Manage agents
      </ActionButton>
      <ActionButton disabled>Manage Payments</ActionButton>
      <ActionButton disabled>Update Collection</ActionButton>
      <ActionButton disabled>End Claim Collection</ActionButton>
    </Box>
  )
}

export default ClaimActions
