import Image from 'next/image'
import React, { useState } from 'react'
import { Typography } from 'components/Typography'
import { IconMinus, IconPlus } from 'components/IconPaths'
import { Box, Flex, TextInput, useMantineTheme } from '@mantine/core'
import { createStyles } from '@mantine/emotion'

const useStyles = createStyles(
  (theme, { direction, active }: { direction: 'row' | 'row-reverse'; active: boolean }) => ({
    wrapper: {
      position: 'relative',
      border: `1px solid ${theme.colors.blue[5]}`,
      borderRadius: theme.radius.md,
      padding: theme.spacing.xs,
    },
    label: {
      position: 'absolute',
      transform: 'translateY(-50%)',
      left: direction === 'row' ? '10px' : undefined,
      right: direction === 'row' ? undefined : '10px',
      top: active ? '0' : '50%',
      transition: 'top .2s',
      background: theme.white,
      zIndex: 1,
      pointerEvents: 'none',
    },
    input: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      left: direction === 'row' ? '10px' : undefined,
      right: direction === 'row' ? undefined : '10px',
      width: 'calc(100% - 100px)',
      height: '100%',
      border: 'none',
      textAlign: direction === 'row' ? 'left' : 'right',
      '&:focus': {
        outline: 'none',
      },
    },
    actionButtons: {
      position: 'absolute',
      transform: 'translateY(-50%)',
      top: '50%',
      left: direction === 'row' ? undefined : '10px',
      right: direction === 'row' ? '10px' : undefined,
    },
    actionButton: {
      lineHeight: 0,
      cursor: 'pointer',
      '& svg': {
        width: 30,
        height: 30,
        '& path': {
          fill: theme.colors.blue[5],
        },
      },
    },
  }),
)

interface Props {
  direction?: 'row' | 'row-reverse'
  label?: string
  width?: string
  height?: string
  disabled?: boolean
  value: number
  onChange: (value: number) => void
}

const NumberCounter: React.FC<Props> = ({
  width = '100%',
  height = 'auto',
  direction = 'row',
  label,
  value,
  disabled,
  onChange,
}): JSX.Element => {
  const theme = useMantineTheme()
  const [focused, setFocused] = useState(false)
  const active = value > 0 || focused
  const { classes } = useStyles({ direction, active })

  return (
    <Box className={classes.wrapper} style={{ width, height }}>
      {label && (
        <Box className={classes.label}>
          <Typography
            size={active ? 'sm' : 'xl'}
            weight={active ? 'bold' : 'medium'}
            color={active ? 'blue' : 'gray.7'}
          >
            {label}
          </Typography>
        </Box>
      )}

      <TextInput
        className={classes.input}
        type='text'
        pattern='[0-9]*'
        value={value}
        onChange={(event): void => onChange(Number(event.currentTarget.value || 0))}
        onFocus={(): void => setFocused(true)}
        onBlur={(): void => setFocused(false)}
        disabled={disabled}
      />

      <Flex className={classes.actionButtons} align='center' gap='xs'>
        <Box className={classes.actionButton} onClick={(): void => onChange(value + 1)}>
          <Image src={IconPlus} alt='Plus' width={30} height={30} />
        </Box>
        <Box className={classes.actionButton} onClick={(): void => onChange(Math.max(value - 1, 0))}>
          <Image src={IconMinus} alt='Minus' width={30} height={30} />
        </Box>
      </Flex>
    </Box>
  )
}

export default NumberCounter
