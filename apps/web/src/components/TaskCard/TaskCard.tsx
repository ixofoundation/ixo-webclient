import { useWallet } from '@ixo-webclient/wallet-connector'
import { IidDocument } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/iid'
import { Box, Button, ButtonProps, Card, Flex, MantineStyleProps, Text } from '@mantine/core'
import { useGetUserGranteeRole } from 'hooks/claim'
import { TEntityModel } from 'types/entities'

const roleNames = {
  SA: 'Agent',
}

type TaskCardProps = {
  task: any
  iid?: IidDocument
  buttonProps?: ButtonProps
  w?: MantineStyleProps['w']
  active?: boolean
  onClick?: () => void
  entity: TEntityModel
}
const TaskCard = ({ task, iid, buttonProps, w = 400, active, onClick, entity }: TaskCardProps) => {
  const { wallet } = useWallet()

  const userRole = useGetUserGranteeRole(
    wallet?.address ?? '',
    entity.owner,
    entity.accounts,
    entity.verificationMethod,
    task?.collection?.id,
  )

  const role = userRole ? roleNames[userRole as any] : 'No Role'

  return (
    <Card
      shadow='md'
      radius='md'
      w={w}
      style={{ ...(active && { border: '2px solid #00D2FF' }) }}
      styles={{
        root: {
          cursor: 'pointer',
          ':hover': {
            boxShadow: '150px 150px 100px 100px rgba(0, 0, 0, 1)',
          },
        },
        section: {
          ':hover': {
            boxShadow: '150px 150px 100px 100px rgba(0, 0, 0, 1)',
            padding: 10,
          },
        },
      }}
      onClick={onClick}
    >
      <Card.Section px='md' pt='md' pos='relative'>
        <Flex
          style={{ borderRadius: '10px' }}
          h={250}
          w={'100%'}
          bg='linear-gradient(135deg, #56BBBB 0%, #275555 100%)'
        />
        {!userRole && (
          <Box pos='absolute' bottom='0' left='0' right='0' bg='rgba(255,255,255,0.5)' mx='md' p='md'>
            <Text c='white'>Apply to Submit Claims</Text>
          </Box>
        )}
      </Card.Section>
      <Card.Section p='md'>
        <Flex w='100%' bg='#F9F9F9' p='sm' style={{ borderRadius: '10px' }}>
          <Box>
            <Text>{task?.profile?.name}</Text>
            <Text c='dimmed'>{role}</Text>
          </Box>
        </Flex>
      </Card.Section>
      {buttonProps && (
        <Card.Section p='md'>
          <Button {...buttonProps} />
        </Card.Section>
      )}
    </Card>
  )
}

export default TaskCard
