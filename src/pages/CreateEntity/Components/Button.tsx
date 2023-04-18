import React, { useContext } from 'react'
import styled from 'styled-components'
import { SvgBox, theme } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { ReactComponent as AssistantIcon } from 'assets/images/icon-assistant.svg'
import { DashboardThemeContext } from 'components/Dashboard/Dashboard'
import { TTypographySize, TTypographyWeight } from 'components/Typography/Typography'

type TButtonVariant = 'primary' | 'secondary' | 'grey500' | 'grey700' | 'grey900'
type TButtonSize = 'lg' | 'md' | 'sm' | 'custom' | 'flex' | 'full'

const buttonColor = (variant: TButtonVariant, isDark: boolean): string => {
  switch (variant) {
    case 'primary':
    default:
      return theme.ixoWhite
    case 'secondary':
      return isDark ? theme.ixoWhite : theme.ixoBlack
  }
}
const buttonBgColor = (variant: TButtonVariant, disabled: boolean): string => {
  switch (variant) {
    case 'primary':
    default:
      return !disabled ? theme.ixoNewBlue : theme.ixoGrey300
    case 'secondary':
      return 'transparent'
    case 'grey500':
      return theme.ixoGrey500
    case 'grey700':
      return theme.ixoGrey700
    case 'grey900':
      return theme.ixoGrey900
  }
}
const buttonWidthHeight = (size: TButtonSize, width: number | undefined, height: number | undefined): string[] => {
  switch (size) {
    case 'lg':
    case 'md':
      return ['150px', '48px']
    case 'sm':
      return ['56px', '32px']
    case 'flex':
      return [width ? width + 'px' : 'auto', height ? height + 'px' : 'auto']
    case 'full':
      return [width ? width + 'px' : '100%', height ? height + 'px' : '100%']
    case 'custom':
    default:
      return [width + 'px', height + 'px']
  }
}

const StyledButton = styled.button<{
  variant: TButtonVariant
  size: TButtonSize
  width?: number
  height?: number
  isDark: boolean
  disabled: boolean
}>`
  border: none;
  ${(props): string => (props.variant === 'secondary' && `border: 1px solid ${props.theme.ixoNewBlue}`) || ''};
  outline: none;
  cursor: pointer;
  border-radius: 8px;

  width: ${(props): string => buttonWidthHeight(props.size, props.width, props.height)[0]};
  height: ${(props): string => buttonWidthHeight(props.size, props.width, props.height)[1]};

  display: flex;
  justify-content: center;
  align-items: center;

  color: ${(props): string => buttonColor(props.variant, props.isDark)};
  background: ${(props): string => buttonBgColor(props.variant, props.disabled)};

  letter-spacing: 0.3px;
  line-height: 100%;

  padding: 0.5rem 1rem;

  user-select: none;

  &:focus {
    outline: none;
  }

  &[disabled] {
    pointer-events: none;
    opacity: 0.5;
  }
`

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: TButtonVariant
  size?: TButtonSize
  width?: number
  height?: number
  disabled?: boolean
  loading?: boolean
  textSize?: TTypographySize
  textTransform?: string
  textWeight?: TTypographyWeight
  onClick?: () => void
  children?: React.ReactNode
}

const Button: React.FC<Props> = ({
  variant = 'primary',
  size = 'md',
  width,
  height,
  disabled = false,
  loading = false,
  textSize = 'xl',
  textTransform = 'uppercase',
  textWeight = 'medium',
  children,
  onClick,
  ...rest
}): JSX.Element => {
  const theme = useContext(DashboardThemeContext)

  return (
    <StyledButton
      variant={variant}
      size={size}
      width={width}
      height={height}
      disabled={disabled}
      isDark={theme.isDark}
      onClick={onClick && !loading ? onClick : undefined}
      {...rest}
    >
      {loading ? (
        <SvgBox color='currentColor'>
          <AssistantIcon />
        </SvgBox>
      ) : (
        <Typography
          weight={textWeight}
          size={textSize}
          color='inherit'
          transform={textTransform}
          style={{ letterSpacing: 0.3 }}
        >
          {children}
        </Typography>
      )}
    </StyledButton>
  )
}

export default Button
