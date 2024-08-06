import React, { ReactNode } from 'react'
import { Box, Flex, Text } from '@mantine/core'
import { createStyles } from '@mantine/emotion'

export interface CardProps {
  title?: string
  children: ReactNode
  backgroundImage?: string
  icon?: ReactNode
  width?: string
  height?: string
  backgroundColor?: string
}

const useStyles = createStyles((theme, { width, height, backgroundColor }: Partial<CardProps>) => ({
  cardWrapper: {
    width,
    height,
    backgroundColor: backgroundColor || theme.colors.blue[9],
    border: `1px solid rgba(${theme.black}, 0.1)`,
    borderRadius: theme.radius.sm,
    boxShadow: `0 4px 6px rgba(${theme.black}, 0.01)`,
    padding: theme.spacing.md,
    display: 'flex',
    flexDirection: 'column',
  },
}))

export const Card: React.FC<CardProps> = ({ children, title, icon, ...props }) => {
  const { classes } = useStyles(props)

  return (
    <Box className={classes.cardWrapper}>
      <Flex align='center'>
        <Text c='white' size='24px'>
          {icon}
        </Text>
        <Text fw='bolder' size='24px' c='white' ml={6}>
          {title}
        </Text>
      </Flex>
      {children}
    </Box>
  )
}
