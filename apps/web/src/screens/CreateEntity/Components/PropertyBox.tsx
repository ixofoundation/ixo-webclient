import Image from 'next/image'
import { Typography } from 'components/Typography'
import React, { ReactNode, useMemo } from 'react'
import { IconLock, IconTrash } from 'components/IconPaths'
import { Box, useMantineTheme } from '@mantine/core'
import { createStyles } from '@mantine/emotion'

interface StyleProps {
  disabled: boolean
  size: number
  status: 'hover' | 'full' | 'init' | 'req'
}

const useStyles = createStyles((theme, { disabled, size, status }: StyleProps) => ({
  wrapper: {
    position: 'relative',

    '& .action': {
      position: 'absolute',
      top: 6,
      right: 6,
      padding: 5,
      transform: 'translate(50%, -50%)',
      width: 24,
      height: 24,
      borderRadius: '50%',
      background: '#bcbfc0',

      display: 'none',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      transition: 'all 0.2s',

      '&:hover': {
        background: theme.colors.blue[5],
      },
    },

    '&:hover .action': {
      display: 'flex',
    },
  },

  body: {
    borderRadius: 8,
    width: size,
    height: size,
    pointerEvents: disabled ? 'none' : 'auto',
    padding: '0.5rem',

    backgroundColor:
      status === 'hover'
        ? theme.colors.blue[5]
        : status === 'full'
          ? theme.colors.dark[7]
          : status === 'req'
            ? theme.colors.gray[7]
            : theme.colors.gray[3],

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    gap: 10,
    transition: 'all 0.2s',
    cursor: 'pointer',

    '& > svg': {
      width: 42,
      height: 42,

      '& path': {
        fill: theme.white,
      },
    },

    '& > span': {
      textOverflow: 'ellipsis',
      maxWidth: '80%',
      overflow: 'hidden',
    },

    '&:hover': {
      background: theme.colors.blue[5],
    },
  },
}))

export interface Props {
  icon?: ReactNode
  required?: boolean
  inherited?: boolean
  set?: boolean
  label?: string
  size?: number
  disabled?: boolean
  hovered?: boolean
  noData?: boolean
  handleClick?: () => void
  handleRemove?: () => void
}

const PropertyBox: React.FC<Props> = ({
  icon = undefined,
  required = false,
  inherited = false,
  disabled = false,
  hovered = false,
  noData = false,
  set,
  label,
  size = 110,
  handleClick,
  handleRemove,
}): JSX.Element => {
  const theme = useMantineTheme()
  const status: 'hover' | 'full' | 'init' | 'req' = useMemo(() => {
    if (hovered) return 'hover'
    if (inherited) return 'full'
    if (disabled) return 'init'
    if (set) return 'full'
    if (required) return 'req'
    if (noData) return 'init'
    return 'req'
  }, [disabled, inherited, required, set, hovered, noData])

  const { classes } = useStyles({ disabled, size, status })

  return (
    <Box className={classes.wrapper}>
      {!inherited && !required && handleRemove && (
        <Box className='action' onClick={handleRemove}>
          <Image src={IconTrash} alt='Bin' width={5} height={5} color={theme.colors.blue[5]} />
        </Box>
      )}
      {inherited && (
        <Box className='action'>
          <Image src={IconLock} alt='Lock' width={5} height={5} color={theme.colors.blue[5]} />
        </Box>
      )}
      <Box className={classes.body} onClick={handleClick}>
        {icon && icon}
        {label && (
          <Typography size='md' weight='bold' color='white'>
            {label}
          </Typography>
        )}
      </Box>
    </Box>
  )
}

export default PropertyBox
