import { Button as MantineButton, ButtonProps as MantineButtonProps } from '@mantine/core'
import { createStyles } from '@mantine/emotion'

interface ButtonProps extends MantineButtonProps {
  textColor?: string
  borderColor?: string
  buttonBackground?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  active?: boolean
}

const useStyles = createStyles((theme, props: ButtonProps) => {
  const getButtonSize = (size: string) => {
    const sizes = {
      xs: { padding: '0.15rem 0.3rem', fontSize: '0.15rem' },
      sm: { padding: '0.5rem 0.5rem', fontSize: '0.5rem' },
      md: { padding: '0.5rem 1rem', fontSize: '0.5rem' },
      lg: { padding: '1rem 2.5rem', fontSize: '1rem' },
      xl: { padding: '2.5rem 3rem', fontSize: '2.5rem' },
    }
    return sizes[size as keyof typeof sizes] || sizes.md
  }

  return {
    button: {
      ...getButtonSize(props.size || 'md'),
      border: `2px solid ${props.active && props.borderColor ? props.borderColor : props.buttonBackground}`,
      borderRadius: '3px',
      color: props.textColor || 'white',
      background: props.buttonBackground || theme.colors.blue[6],
    },
  }
})

export function Button({ children, ...props }: ButtonProps) {
  const { classes } = useStyles(props)

  return (
    <MantineButton className={classes.button} {...props}>
      {children}
    </MantineButton>
  )
}
