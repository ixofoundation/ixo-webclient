import Image from 'next/image'
import { Typography } from 'components/Typography'
import React, { ReactNode } from 'react'
import { FlexProps, useMantineTheme, Flex } from '@mantine/core'
import { IconExpandAlt } from 'components/IconPaths'

interface Props extends FlexProps {
  icon?: string
  iconNode?: JSX.Element
  label: string
  actionIcon?: JSX.Element
  onAction?: () => void
  children?: ReactNode
}

const Card: React.FC<Props> = ({ icon, label, actionIcon, onAction, children, iconNode, ...rest }): JSX.Element => {
  const theme = useMantineTheme()
  return (
    <Flex
      direction='column'
      w={'100%'}
      h='100%'
      style={{ background: '#152B3F', borderRadius: '4px' }}
      p={5}
      gap={6}
      {...rest}
    >
      {/* Card Header */}
      <Flex w='100%' align='center' justify='space-between'>
        <Flex align='center' gap={2}>
          {icon && <Image src={icon} alt='Icon' width={4.5} height={4.5} />}
          {iconNode && iconNode}
          <Typography variant='secondary' color='white' size='lg'>
            {label}
          </Typography>
        </Flex>
        {onAction && <Image src={IconExpandAlt} alt='Expand' width={5} height={5} color={theme.colors.blue[9]} />}
      </Flex>
      {children}
    </Flex>
  )
}

export default Card
