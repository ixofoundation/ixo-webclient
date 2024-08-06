import React, { useMemo, useState } from 'react'
import { IconChevronDown } from '@tabler/icons-react'
import { TypeSelectionModal } from 'components/Modals'
import { Typography } from 'components/Typography'
import { Box, useMantineTheme } from '@mantine/core'
import { createStyles } from '@mantine/emotion'

const useStyles = createStyles(
  (theme, { filled, width, height }: { filled: boolean; width: string; height: string }) => ({
    selectWrapper: {
      position: 'relative',
      borderRadius: theme.radius.md,
      border: `1px solid ${theme.colors.blue[5]}`,
      width,
      height,
      transition: 'all 0.2s',
      cursor: 'pointer',
      background: theme.white,
    },
    label: {
      position: 'absolute',
      left: filled ? 7 : 10,
      transform: 'translateY(-50%)',
      top: filled ? 0 : '50%',
      pointerEvents: 'none',
      transition: 'all 0.2s',
      whiteSpace: 'nowrap',
      display: 'flex',
      alignItems: 'center',
      gap: 5,
      margin: 0,
      padding: filled ? '0 3px' : 0,
      lineHeight: 1,
      background: 'inherit',
    },
    value: {
      padding: '6px 10px',
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
  }),
)

interface Props {
  value: any
  label?: string
  width?: string
  height?: string
  handleChange: (value: any) => void
  options: string[]
}

const SelectWithModal: React.FC<Props> = ({
  value,
  label = '',
  width = '100%',
  height = '48px',
  handleChange,
  options,
  ...rest
}): JSX.Element => {
  const theme = useMantineTheme()
  const [openModal, setOpenModal] = useState(false)
  const filled = useMemo(() => !!value, [value])
  const { classes } = useStyles({ filled, width, height })

  return (
    <>
      <Box className={classes.selectWrapper} onClick={(): void => setOpenModal(true)} {...rest}>
        <Box className={classes.label}>
          <Typography
            weight={filled ? 'bold' : 'medium'}
            size={filled ? 'sm' : 'xl'}
            color={filled ? 'blue' : 'gray.5'}
          >
            {label}
          </Typography>
          {!value && <IconChevronDown size={16} color={theme.colors.gray[5]} />}
        </Box>
        <Box className={classes.value}>
          <Typography size='xl' weight='medium'>
            {value}
          </Typography>
        </Box>
      </Box>
      <TypeSelectionModal
        open={openModal}
        onClose={(): void => setOpenModal(false)}
        handleChange={handleChange}
        title={`Select the ${label}`}
        options={options}
      />
    </>
  )
}

export default SelectWithModal
