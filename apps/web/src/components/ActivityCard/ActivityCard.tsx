import { Typography } from 'components/Typography'
import { ColorCode } from './ActivityCard.styles'
import { Flex } from '@mantine/core'

export type ActivityCardProps = {
  name: string
  quantity: string
  createdAt: string
}

export const ActivityCard = ({ name, quantity, createdAt }: ActivityCardProps) => {
  const colorCode = '#00D2FF'
  return (
    <Flex bg='#002D42' w='100%' p={4} style={{ borderRadius: '4px' }} pos='relative' justify='space-between'>
      <ColorCode backgroundColor={colorCode} />
      <Flex direction='column'>
        <Typography>{name}</Typography>
        <Typography>{quantity}</Typography>
      </Flex>
      <Flex>
        <Typography>{createdAt}</Typography>
      </Flex>
    </Flex>
  )
}
