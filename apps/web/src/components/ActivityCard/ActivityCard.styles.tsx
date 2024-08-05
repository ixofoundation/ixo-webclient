import { Box, BoxProps } from '@mantine/core'
import { createStyles } from '@mantine/emotion'

interface ColorCodeProps extends BoxProps {
  backgroundColor?: string
  height?: string
}

const useStyles = createStyles((theme, { backgroundColor, height }: ColorCodeProps) => ({
  colorCode: {
    backgroundColor: backgroundColor || '#0C3549',
    height: height || '50%',
    width: '10px',
    position: 'absolute',
    left: '-5px',
    borderRadius: '5px',
    top: 0,
    bottom: 0,
    margin: 'auto 0',
  },
}))

export function ColorCode({ backgroundColor, height, ...others }: ColorCodeProps) {
  const { classes } = useStyles({ backgroundColor, height })

  return <Box className={classes.colorCode} {...others} />
}
