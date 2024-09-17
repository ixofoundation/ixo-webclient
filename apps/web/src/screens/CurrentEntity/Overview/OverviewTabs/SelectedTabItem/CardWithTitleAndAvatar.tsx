import { Avatar, Stack, Text } from '@mantine/core'
import React, { ReactNode } from 'react'
import GrayCard from './GrayCard'

const CardWithTitleAndAvatar = ({
  title,
  description,
  icon,
}: {
  title: React.ReactNode
  description: React.ReactNode
  icon?: ReactNode
}) => (
  <GrayCard align={'start'}>
    <Avatar alt={title?.toString()}>{icon}</Avatar>
    <Stack gap={0}>
      <Text fz={'md'}>{title}</Text>
      <Text c={'#9A9A9A'} fz={'xs'}>
        {description}
      </Text>
    </Stack>
  </GrayCard>
)

export default CardWithTitleAndAvatar
