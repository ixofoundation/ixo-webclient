import { ActionIcon, Badge, Card, Flex, Text } from '@mantine/core'
import { ReactNode } from 'react'
import { LiaCheckSolid, LiaEdit } from 'react-icons/lia'

type ActionCardProps = {
  title: string
  icon: ReactNode
  children: ReactNode
  noPadding?: boolean
  isEditing?: boolean
  onClose?: () => void
  onOpen?: () => void
  closingLabel?: string
  editable?: boolean
}

const ActionCard = ({
  title,
  icon,
  children,
  noPadding,
  isEditing,
  onClose,
  onOpen,
  closingLabel,
  editable = true,
}: ActionCardProps) => {
  const childrenProps = { ...(!noPadding && { p: 'md', pt: 4 }) }

  const editActions = () => {
    return isEditing ? (
      <Flex align='center'>
        <Text mr={8} c='dimmed'>
          {closingLabel}
        </Text>
        <Badge color='#F6F6F6' c='blue' size='lg'>
          <ActionIcon variant='unstyled' bg='transparent' onClick={onClose} styles={{ root: { outlineStyle: 'none' } }}>
            <LiaCheckSolid fill='green' />
          </ActionIcon>
        </Badge>
      </Flex>
    ) : (
      <Badge color='#F6F6F6' c='blue' size='lg'>
        <ActionIcon variant='unstyled' bg='transparent' onClick={onOpen} styles={{ root: { outlineStyle: 'none' } }}>
          <LiaEdit fill='#00D2FF' />
        </ActionIcon>
      </Badge>
    )
  }
  return (
    <Card shadow='md' radius='md' w='100%'>
      <Card.Section px='md' pt='md' mb={4} display={'flex'} styles={{ section: { justifyContent: 'space-between' } }}>
        <Badge color='#F6F6F6' leftSection={icon} c='blue' size='lg'>
          {title}
        </Badge>
        {editable && editActions()}
      </Card.Section>
      <Card.Section {...childrenProps}>{children}</Card.Section>
    </Card>
  )
}

export default ActionCard
