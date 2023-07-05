import * as React from 'react'
import styled from 'styled-components'

const BaseButton = styled.a`
  position: relative;
  border-radius: 2px;
  color: white;
  font-size: 15px;
  font-weight: 400;
  text-transform: uppercase;
  padding: 10px 20px;
  margin-bottom: 10px;
  font-family: ${(props) => props.theme.secondaryFontFamily};
  letter-spacing: 0.3px;
  line-height: 20px;
  text-align: center;
  display: block;
  transition: all 0.3s ease;
`

const EnabledGradient = styled(BaseButton)`
  background: ${(props) => props.theme.bg.gradientButton};
  &&& {
    color: white;
  }
  font-family: ${(props) => props.theme.secondaryFontFamily};
  cursor: pointer;

  :hover {
    &&& {
      color: ${(props) => props.theme.ixoNewBlue};
    }
    text-decoration: none;
  }
`

const EnabledDark = styled(BaseButton)`
  background: #002d42;
  &&& {
    color: white;
  }
  border: 1px solid ${(props): string => props.theme.ixoNewBlue};
  cursor: pointer;

  :hover {
    &&& {
      color: ${(props) => props.theme.ixoNewBlue};
    }
    background: ${(props) => props.theme.bg.darkButton};
    text-decoration: none;
  }
`

const EnabledGreen = styled(BaseButton)`
  background: #5ab946;
  color: white;
`

const EnabledLight = styled(BaseButton)`
  border: 1px solid #fff;
  background: white !important;
  color: #143f54 !important;
  font-weight: 700;
`

const Disabled = styled(BaseButton)`
  &&& {
    color: ${(props) => props.theme.ixoNewBlue};
  }
  border: 1px solid ${(props) => props.theme.ixoNewBlue};
  opacity: 0.4;
  cursor: default;

  :hover {
    &&& {
      color: ${(props) => props.theme.ixoNewBlue};
    }
    text-decoration: none;
  }
`

const Plus = styled.span`
  margin-right: 5px;
`

export enum ButtonTypes {
  gradient = 'gradient',
  dark = 'dark',
  green = 'green',
  light = 'light',
}

export interface Props {
  onClick?: (event: any) => void
  type: ButtonTypes
  disabled?: boolean
  inactive?: boolean
  plus?: true
  href?: string
  target?: string
  className?: string
}

export const Button: React.FunctionComponent<Props> = (props) => {
  const renderPlus = (): JSX.Element => {
    if (props.plus) {
      return <Plus>+ </Plus>
    }
    return <></>
  }

  if (props.disabled) {
    return (
      <Disabled className='disabled'>
        {renderPlus()} {props.children}
      </Disabled>
    )
  } else if (props.inactive) {
    return (
      <Disabled className='disabled' onClick={props.onClick}>
        {renderPlus()} {props.children}
      </Disabled>
    )
  } else {
    if (props.type === ButtonTypes.light) {
      return (
        <EnabledLight onClick={props.onClick} href={props.href} target={props.target} className={props.className}>
          {renderPlus()} {props.children}
        </EnabledLight>
      )
    } else if (props.type === ButtonTypes.gradient) {
      return (
        <EnabledGradient
          onClick={props.onClick}
          href={props.href}
          target={props.target}
          className={props.className + ' gradientButton'}
        >
          {renderPlus()} {props.children}
        </EnabledGradient>
      )
    } else if (props.type === ButtonTypes.dark) {
      return (
        <EnabledDark
          onClick={props.onClick}
          href={props.href}
          target={props.target}
          className={props.className + ' darkButton'}
        >
          {renderPlus()} {props.children}
        </EnabledDark>
      )
    } else {
      return (
        <EnabledGreen
          onClick={props.onClick}
          href={props.href}
          target={props.target}
          className={props.className + ' greenButton'}
        >
          {renderPlus()} {props.children}
        </EnabledGreen>
      )
    }
  }
}
