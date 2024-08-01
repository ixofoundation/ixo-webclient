import { Badge, Card } from '@mantine/core'
import { ReactNode } from 'react'

type ActionCardProps = {
  title: string
  icon: ReactNode
  children: ReactNode
  noPadding?: boolean
}

const ActionCard = ({ title, icon, children, noPadding }: ActionCardProps) => {
  const childrenProps = { ...(!noPadding && { p: 'md', pt: 4 }) }
  return (
    <Card shadow='md' radius='md' w='100%'>
      <Card.Section px='md' pt='md'>
        <Badge color='#F6F6F6' leftSection={icon} c='blue' size='lg'>
          {title}
        </Badge>
      </Card.Section>
      <Card.Section {...childrenProps}>{children}</Card.Section>
    </Card>
  )
}

export default ActionCard
