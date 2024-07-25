import { IidDocument } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/iid'
import { Box, Button, ButtonProps, Card, Flex, MantineStyleProps, Text } from '@mantine/core'
import { getUserRole } from 'utils/claims/getRole'

type TaskCardProps = {
  task: any
  iid: IidDocument
  buttonProps?: ButtonProps
  w?: MantineStyleProps['w']
}
const TaskCard = ({ task, iid, buttonProps, w = 400 }: TaskCardProps) => {
  const role = getUserRole({ userLinkedResources: iid.linkedResource, collectionId: task.id })
  return (
    <Card
      shadow='md'
      radius='md'
      w={w}
      styles={{
        root: {
          cursor: 'pointer',
          ':hover': {
            boxShadow: '150px 150px 100px 100px rgba(0, 0, 0, 1)',
            backgroundColor: 'red',
          },
        },
        section: {
          ':hover': {
            boxShadow: '150px 150px 100px 100px rgba(0, 0, 0, 1)',
            backgroundColor: 'red',
            padding: 10,
          },
        },
      }}
    >
      <Card.Section px='md' pt='md' pos='relative'>
        <Flex style={{ borderRadius: '10px' }} h={250} w={"100%"} bg='linear-gradient(135deg, #56BBBB 0%, #275555 100%)' />
        <Box pos='absolute' bottom='0' left='0' right='0' bg='rgba(255,255,255,0.5)' mx='md' p='md'>
          <Text c='white'>Apply to Submit Claims</Text>
        </Box>
      </Card.Section>
      <Card.Section p='md'>
        <Flex w='100%' bg='#F9F9F9' p='sm' style={{ borderRadius: '10px' }}>
          <Box>
            <Text>{task?.profile?.name}</Text>
            <Text c='dimmed'>{role ?? 'No Role'}</Text>
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
