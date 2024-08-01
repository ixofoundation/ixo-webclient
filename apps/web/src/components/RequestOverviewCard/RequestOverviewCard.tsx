import { truncateString } from '@ixo-webclient/utils'
import { IidDocument } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/iid'
import { Avatar, Box, Button, ButtonProps, Card, Flex, MantineStyleProps, Text } from '@mantine/core'
import { useClaimTableData } from 'hooks/claims/useClaimTableData'
import { TEntityModel } from 'types/entities'
import { displayFiatAmount } from 'utils/currency'


type TaskCardProps = {
  task?: any
  iid?: IidDocument
  buttonProps?: ButtonProps
  w?: MantineStyleProps['w']
  h?: MantineStyleProps['h']
  active?: boolean
  onClick?: () => void
  entity: TEntityModel
}
const RequestOverviewCard = ({ task, buttonProps, w = 400, h = 320, active, onClick, entity }: TaskCardProps) => {
  const {  totals } = useClaimTableData({ entityId: entity.id })

  return (
    <Card
      shadow='md'
      radius='md'
      h={h}
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
          h={200}
          w={'100%'}
          bg='linear-gradient(135deg, #56BBBB 0%, #275555 100%)'
        />

        <Box pos='absolute' bottom='0' left='0' right='0' bg='rgba(255,255,255,0.5)' mx='md' p='md'>
          <Text c='white'>{`${totals.total.count} Tasks`}</Text>
          <Text c='white'>{`${displayFiatAmount(totals.total.reward, "$")} total`}</Text>
        </Box>
      </Card.Section>
      <Card.Section p='md'>
        <Flex w='100%' bg='#F9F9F9' p='sm' style={{ borderRadius: '10px' }} justify={"space-between"} align={"center"}>
          <Box>
            <Text>{truncateString(entity?.profile?.name ?? '', 30, { ellipsisPos: 'center' })}</Text>
            <Text c='dimmed'>{truncateString(entity.profile?.brand ?? '', 20, { ellipsisPos: 'center' })}</Text>
          </Box>
          <Avatar src={entity.profile?.logo} />
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

export default RequestOverviewCard
