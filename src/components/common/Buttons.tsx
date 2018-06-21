import * as React from 'react';
import styled from 'styled-components';

const EnabledDarkPrimaryButtonComponent = styled.a`
	background: ${props => props.theme.bg.gradientButton};
	&&&{color: ${props => props.theme.fontBlueButtonNormal} };
	border-radius: 2px;
	font-size: 15px;
  text-transform: uppercase;
  padding: 10px 20px;
  margin-bottom: 10px;
	font-family: ${props => props.theme.fontRobotoCondensed};
	letter-spacing: 0.3px;	
	line-height: 20px;	
	text-align: center;
	display: flex;
	cursor: pointer;

	transition: all 0.3s ease;
	
	:hover {
		&&&{ color: ${props => props.theme.fontBlueButtonHover} }
		text-decoration: none;
	}
`;

const EnabledDarkSecondaryButtonComponent = styled.a`
	background: ${props => props.theme.bg.darkButton};
	&&&{color: ${props => props.theme.ixoBlue} };
	border: 1px solid ${props => props.theme.ixoBlue};
	border-radius: 2px;
	font-size: 15px;
  text-transform: uppercase;
  padding: 10px 20px;
  margin-bottom: 10px;
	font-family: ${props => props.theme.fontRobotoCondensed};
	letter-spacing: 0.3px;	
	line-height: 20px;	
	text-align: center;
	display: flex;
	cursor: pointer;

	transition: all 0.3s ease;
	
	:hover {
		&&&{ color: ${props => props.theme.fontBlueButtonHover} }
		text-decoration: none;
	}
`;

const DisabledDarkButtonComponent = styled.a`
	&&&{color: ${props => props.theme.ixoBlue} };
	border: 1px solid ${props => props.theme.ixoBlue};
	border-radius: 2px;
	font-size: 15px;
  text-transform: uppercase;
  padding: 10px 20px;
  margin-bottom: 10px;
	font-family: ${props => props.theme.fontRobotoCondensed};
	letter-spacing: 0.3px;	
	line-height: 20px;	
	text-align: center;
	display: flex;
	cursor: none;
	opacity: 0.4;

	transition: all 0.3s ease;
	
	:hover {
		&&&{ color: ${props => props.theme.ixoBlue} };
		text-decoration: none;
	}
`;

const Plus = styled.div`
	margin-right: 5px;
`;

export const buttonTypes = {
	PRIMARY: 'primary',
	SECONDARY: 'secondary',
};

export interface Props {
	value: string;
	onClick: (event: any) => void;
	type: string;
	disabled?: boolean;
	plus?: true;
}

export const DarkButton: React.SFC<Props> = (props) => {
	const renderPlus = () => {
		if ( props.plus ) {
			return <Plus>+ </Plus>;
		}
		return null;
	};

	if (props.disabled) {
		return (
			<DisabledDarkButtonComponent >
				{renderPlus()} {props.value}
			</DisabledDarkButtonComponent>
		);
	} else {
		if (props.type === buttonTypes.PRIMARY) {
			return (
				<EnabledDarkPrimaryButtonComponent onClick={props.onClick} >
					{renderPlus()} {props.value}
				</EnabledDarkPrimaryButtonComponent>
			);
		} else {
			return (
				<EnabledDarkSecondaryButtonComponent onClick={props.onClick} >
					{renderPlus()} {props.value}
				</EnabledDarkSecondaryButtonComponent>
			);
		}
	}
};