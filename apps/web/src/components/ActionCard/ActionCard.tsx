import { ReactNode } from 'react'
import { Card, Text, Badge, Avatar } from '@mantine/core'

type ActionCardProps = {
  title: string
  icon: ReactNode
  children: ReactNode
}

const ActionCard = ({ title, icon, children }: ActionCardProps) => {
  return (
    <Card shadow='md' radius='md' w='100%'>
      <Card.Section px='md' pt='md'>
        <Badge color='#F6F6F6' leftSection={icon} c="blue" size="lg">{title}</Badge>
      </Card.Section>
      <Card.Section p='md'>{children}</Card.Section>
    </Card>
  )
}

export default ActionCard
