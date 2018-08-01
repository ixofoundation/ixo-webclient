import * as React from 'react';
import styled from 'styled-components';

const BaseButton = styled.a`
	position: relative;
	border-radius: 2px;
	color: white;
	font-size: 15px;
	font-weight: 300;
	text-transform: uppercase;
	padding: 10px 20px;
	margin-bottom: 10px;
	font-family: ${props => props.theme.fontRobotoCondensed};
	letter-spacing: 0.3px;	
	line-height: 20px;	
	text-align: center;
	display: block;
	transition: all 0.3s ease;
`;

const EnabledGradient = BaseButton.extend`
	background: ${props => props.theme.bg.gradientButton};
	&&&{ color: ${props => props.theme.fontDarkBlueButtonNormal} };
	font-family: ${props => props.theme.fontRobotoCondensed};
	cursor: pointer;

	:hover {
		&&&{ color: ${props => props.theme.fontBlueButtonHover} }
		text-decoration: none;
	}
`;

const EnabledDark = BaseButton.extend`
	background: #002d42;
	&&&{ color: ${props => props.theme.fontDarkBlueButtonNormal} };
	border: 1px solid ${props => props.theme.ixoBlue};
	cursor: pointer;
	
	:hover {
		&&&{ color: ${props => props.theme.fontBlueButtonHover} }
		background: ${props => props.theme.bg.darkButton};
		text-decoration: none;
	}
`;

const Disabled = BaseButton.extend`
	&&&{color: ${props => props.theme.ixoBlue} };
	border: 1px solid ${props => props.theme.ixoBlue};
	opacity: 0.4;
	cursor: default;
	
	:hover {
		&&&{ color: ${props => props.theme.ixoBlue} };
		text-decoration: none;
	}
`;

const Plus = styled.span`
	margin-right: 5px;
`;

export enum ButtonTypes {
	gradient = 'gradient',
	dark = 'dark',
}

export interface Props {
	onClick?: (event: any) => void;
	type: ButtonTypes;
	disabled?: boolean;
	plus?: true;
}

export const Button: React.SFC<Props> = (props) => {
	const renderPlus = () => {
		if ( props.plus ) {
			return <Plus>+ </Plus>;
		}
		return null;
	};

	if (props.disabled) {
		return (
			<Disabled >
				{renderPlus()} {props.children}
			</Disabled>
		);
	} else {
		if (props.type === ButtonTypes.gradient) {
			return (
				<EnabledGradient onClick={props.onClick} >
					{renderPlus()} {props.children}
				</EnabledGradient>
			);
		} else {
			return (
				<EnabledDark onClick={props.onClick} >
					{renderPlus()} {props.children}
				</EnabledDark>
			);
		}
	}
};