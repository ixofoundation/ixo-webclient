import { ReactNode } from 'react'
import { Box, BoxProps } from '@mantine/core'
import { createStyles } from '@mantine/emotion'

interface ExpandProps extends BoxProps {
  expanded: boolean
  children?: ReactNode
}

const useStyles = createStyles((theme, { expanded }: ExpandProps) => ({
  expandContainer: {
    width: '100%',
    flexFlow: 'row wrap',
    maxHeight: 0,
    display: 'flex',
    overflow: 'hidden',
    transition: 'max-height 0s ease-out',
    opacity: 0,
    ...(expanded && {
      overflow: 'initial',
      transition: 'max-height 1.75s ease-out, opacity 0.5s',
      opacity: 1,
      maxHeight: '300px',
    }),
  },
}))

const Expand = ({ expanded = false, children, ...others }: ExpandProps) => {
  const { classes } = useStyles({ expanded })

  return (
    <Box className={classes.expandContainer} {...others}>
      {children}
    </Box>
  )
}

export default Expand
