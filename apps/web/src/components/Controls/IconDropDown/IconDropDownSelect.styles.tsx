import { Box, BoxProps, Select, SelectProps } from '@mantine/core'
import { createStyles } from '@mantine/emotion'

// Container component
const useContainerStyles = createStyles((theme) => ({
  container: {
    position: 'relative',
    '& img': {
      width: '1.75rem',
      position: 'absolute',
      border: '1px solid transparent',
      borderRadius: '4px',
    },
  },
}))

export function Container(props: React.HTMLAttributes<HTMLDivElement>) {
  const { classes } = useContainerStyles()
  return <div className={classes.container} {...props} />
}

// SelectContainer component
interface SelectContainerProps extends SelectProps {
  active?: boolean
}

const useSelectContainerStyles = createStyles((theme, { active }: { active?: boolean }) => ({
  select: {
    background: '#e8edee',
    padding: active ? '0rem 3rem' : '0.475rem 0.5rem',
    borderRadius: '4px !important',
    width: '100%',
    border: 'none',
    color: active ? '#000' : theme.colors.gray[5],
    '&:focus': {
      outline: 'none',
    },
  },
}))

export function SelectContainer({ active, ...others }: SelectContainerProps) {
  const { classes } = useSelectContainerStyles({ active })
  return <Select classNames={{ input: classes.select }} {...others} />
}

// SelectLabelWrapper component
const useSelectLabelWrapperStyles = createStyles((theme) => ({
  wrapper: {
    background: 'white',
    color: theme.colors.blue[5],
  },
}))

export function SelectLabelWrapper(props: React.HTMLAttributes<HTMLDivElement>) {
  const { classes } = useSelectLabelWrapperStyles()
  return <div className={classes.wrapper} {...props} />
}
