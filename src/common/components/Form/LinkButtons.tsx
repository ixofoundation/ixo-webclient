import * as React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const BaseButton = styled(Link)`
  position: relative;
  border-radius: 2px;
  color: white;
  font-size: 15px;
  font-weight: 300;
  text-transform: uppercase;
  padding: 10px 20px;
  margin-bottom: 10px;
  font-family: ${
    /* eslint-disable-line */ (props) => props.theme.secondaryFontFamily
  };
  letter-spacing: 0.3px;
  line-height: 20px;
  text-align: center;
  display: block;
  transition: all 0.3s ease;
`

const EnabledGradient = styled(BaseButton)`
  background: ${
    /* eslint-disable-line */ (props) => props.theme.bg.gradientButton
  };
  &&& {
    color: ${
      /* eslint-disable-line */ (props) => props.theme.fontDarkBlueButtonNormal
    };
  }
  font-family: ${
    /* eslint-disable-line */ (props) => props.theme.secondaryFontFamily
  };
  cursor: pointer;

  :hover {
    &&& {
      color: ${
        /* eslint-disable-line */ (props) => props.theme.fontBlueButtonHover
      };
    }
    text-decoration: none;
  }
`

const EnabledDark = styled(BaseButton)`
  background: #002d42;
  &&& {
    color: ${
      /* eslint-disable-line */ (props) => props.theme.fontDarkBlueButtonNormal
    };
  }
  border: 1px solid ${/* eslint-disable-line */ (props) => props.theme.ixoBlue};
  cursor: pointer;

  :hover {
    &&& {
      color: ${
        /* eslint-disable-line */ (props) => props.theme.fontBlueButtonHover
      };
    }
    background: ${
      /* eslint-disable-line */ (props) => props.theme.bg.darkButton
    };
    text-decoration: none;
  }
`

const Disabled = styled(BaseButton)`
  &&& {
    color: ${/* eslint-disable-line */ (props) => props.theme.ixoBlue};
  }
  border: 1px solid ${/* eslint-disable-line */ (props) => props.theme.ixoBlue};
  opacity: 0.4;
  cursor: default;

  :hover {
    &&& {
      color: ${/* eslint-disable-line */ (props) => props.theme.ixoBlue};
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
}

export interface Props {
  onClick?: (event: any) => void
  type: ButtonTypes
  disabled?: boolean
  plus?: true
  to: string
}

export const LinkButton: React.SFC<Props> = (props) => {
  const renderPlus = (): JSX.Element => {
    if (props.plus) {
      return <Plus>+ </Plus>
    }
    return <></>
  }

  if (props.disabled) {
    return (
      <Disabled to="">
        {renderPlus()} {props.children}
      </Disabled>
    )
  } else {
    if (props.type === ButtonTypes.gradient) {
      return (
        <EnabledGradient onClick={props.onClick} to={props.to}>
          {renderPlus()} {props.children}
        </EnabledGradient>
      )
    } else {
      return (
        <EnabledDark onClick={props.onClick} to={props.to}>
          {renderPlus()} {props.children}
        </EnabledDark>
      )
    }
  }
}
