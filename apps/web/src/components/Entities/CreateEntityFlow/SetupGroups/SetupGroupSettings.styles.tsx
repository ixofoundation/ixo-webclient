import { Box, BoxProps } from '@mantine/core'
import { createStyles } from '@mantine/emotion'
import PlusIconSvg from '/public/assets/images/icon-plus.svg'

const useStyles = createStyles((theme) => ({
  cardWrapper: {
    padding: '1.75rem',
    border: `1px solid ${theme.colors.blue[5]}`,
    borderRadius: '0.5rem',
    width: '100%',

    '& > div': {
      width: '100%',
    },

    '& input, & textarea': {
      fontWeight: 500,
      fontSize: '20px',
      lineHeight: '28px',
    },
  },

  plusIcon: {
    width: '1.5rem',
    height: '1.5rem',
    color: theme.colors.blue[5],

    '& path': {
      fill: theme.colors.blue[5],
    },
  },
}))

export function CardWrapper(props: BoxProps) {
  const { classes } = useStyles()
  return <Box className={classes.cardWrapper} {...props} />
}

interface PlusIconProps extends React.SVGProps<SVGSVGElement> {
  color?: string
}

export function PlusIcon({ color, ...props }: PlusIconProps) {
  const { classes } = useStyles()
  return <PlusIconSvg className={classes.plusIcon} style={{ color: color }} {...props} />
}
