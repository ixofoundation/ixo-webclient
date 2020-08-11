import * as React from "react";
import styled from "styled-components";

const BaseButton = styled.a`
  position: relative;
  border-radius: 2px;
  color: white;
  font-size: 15px;
  font-weight: 400;
  text-transform: uppercase;
  padding: 10px 20px;
  margin-bottom: 10px;
  font-family: ${/* eslint-disable-line */ (props) =>
    props.theme.fontRobotoCondensed};
  letter-spacing: 0.3px;
  line-height: 20px;
  text-align: center;
  display: block;
  transition: all 0.3s ease;
`;

const EnabledGradient = styled(BaseButton)`
  background: ${/* eslint-disable-line */ (props) =>
    props.theme.bg.gradientButton};
  &&& {
    color: ${/* eslint-disable-line */ (props) =>
      props.theme.fontDarkBlueButtonNormal};
  }
  font-family: ${/* eslint-disable-line */ (props) =>
    props.theme.fontRobotoCondensed};
  cursor: pointer;

  :hover {
    &&& {
      color: ${/* eslint-disable-line */ (props) =>
        props.theme.fontBlueButtonHover};
    }
    text-decoration: none;
  }
`;

const EnabledDark = styled(BaseButton)`
  background: #002d42;
  &&& {
    color: ${/* eslint-disable-line */ (props) =>
      props.theme.fontDarkBlueButtonNormal};
  }
  border: 1px solid ${/* eslint-disable-line */ (props) => props.theme.ixoBlue};
  cursor: pointer;

  :hover {
    &&& {
      color: ${/* eslint-disable-line */ (props) =>
        props.theme.fontBlueButtonHover};
    }
    background: ${/* eslint-disable-line */ (props) =>
      props.theme.bg.darkButton};
    text-decoration: none;
  }
`;

const EnabledGreen = styled(BaseButton)`
  background: #5ab946;
  color: white;
`;

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
`;

const Plus = styled.span`
  margin-right: 5px;
`;

export enum ButtonTypes {
  gradient = "gradient",
  dark = "dark",
  green = "green",
}

export interface Props {
  onClick?: (event: any) => void;
  type: ButtonTypes;
  disabled?: boolean;
  plus?: true;
  href?: string;
  target?: string;
}

export const Button: React.SFC<Props> = (props) => {
  const renderPlus = (): JSX.Element => {
    if (props.plus) {
      return <Plus>+ </Plus>;
    }
    return <></>;
  };

  if (props.disabled) {
    return (
      <Disabled className="disabled">
        {renderPlus()} {props.children}
      </Disabled>
    );
  } else {
    if (props.type === ButtonTypes.gradient) {
      return (
        <EnabledGradient
          onClick={props.onClick}
          href={props.href}
          target={props.target}
          className="gradientButton"
        >
          {renderPlus()} {props.children}
        </EnabledGradient>
      );
    } else if (props.type === ButtonTypes.dark) {
      return (
        <EnabledDark
          onClick={props.onClick}
          href={props.href}
          target={props.target}
          className="darkButton"
        >
          {renderPlus()} {props.children}
        </EnabledDark>
      );
    } else {
      return (
        <EnabledGreen
          onClick={props.onClick}
          href={props.href}
          target={props.target}
          className="greenButton"
        >
          {renderPlus()} {props.children}
        </EnabledGreen>
      );
    }
  }
};
