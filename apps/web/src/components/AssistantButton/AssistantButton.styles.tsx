import { Button, ButtonProps } from '@mantine/core'
import { createStyles } from '@mantine/emotion'

const useStyles = createStyles((theme) => ({
  assistantButton: {
    background: theme.colors.ixoNewBlue[6], // Assuming ixoNewBlue is defined in your theme
    borderRadius: '8px',
    width: '30px',
    height: '30px',
    cursor: 'pointer',
    border: 'none',
    position: 'relative',
    padding: 0,

    '& > div': {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
  },
}))

export function AssistantButton(props: ButtonProps) {
  const { classes } = useStyles()

  return <Button className={classes.assistantButton} {...props} />
}