import { Box, BoxProps } from '@mantine/core'
import { createStyles } from '@mantine/emotion'
import { ReactNode } from 'react'

interface ConnectButtonProps extends BoxProps {
  disabled?: boolean
  children?: ReactNode
}

const useStyles = createStyles((theme, { disabled }: ConnectButtonProps) => ({
  connectButton: {
    border: '1px solid currentColor',
    borderRadius: 8,
    width: 100,
    height: 36,
    background: 'none',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    ...(disabled && { pointerEvents: 'none' }),
  },
}))

export function ConnectButton({ children, disabled, ...others }: ConnectButtonProps) {
  const { classes } = useStyles({ disabled })

  return (
    <Box className={classes.connectButton} {...others}>
      {children}
    </Box>
  )
}
