import { Image, Stack, Text } from '@mantine/core'
import React from 'react'
import GrayCard from './GrayCard'

const CardWithTitleAndAvatar = ({
  title,
  description,
  icon,
}: {
  title: React.ReactNode
  description: React.ReactNode
  icon?: string
}) => (
  <GrayCard align={'start'}>
    <Image
      src={icon}
      alt={title?.toString()}
      h={24}
      w={24}
      mt={'0.5rem'}
      style={{
        objectFit: 'contain',
      }}
    />
    <Stack gap={0}>
      <Text fs={'16px'}>{title}</Text>
      <Text c={'#9A9A9A'} fs={'12px'}>
        {description}
      </Text>
    </Stack>
  </GrayCard>
)

export default CardWithTitleAndAvatar
