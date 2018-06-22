import * as React from 'react';
import styled from 'styled-components';

const BaseButton = styled.a`
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

const EnabledDarkPrimaryButtonComponent = BaseButton.extend`
	background: ${props => props.theme.bg.gradientButton};
	&&&{ color: ${props => props.theme.fontDarkBlueButtonNormal} };
	font-family: ${props => props.theme.fontRobotoCondensed};
	cursor: pointer;

	:hover {
		&&&{ color: ${props => props.theme.fontBlueButtonHover} }
		text-decoration: none;
	}
`;

const EnabledDarkSecondaryButtonComponent = BaseButton.extend`
	background: ${props => props.theme.bg.darkButton};
	&&&{ color: ${props => props.theme.fontDarkBlueButtonNormal} };
	border: 1px solid ${props => props.theme.ixoBlue};
	cursor: pointer;
	
	:hover {
		&&&{ color: ${props => props.theme.fontBlueButtonHover} }
		text-decoration: none;
	}
`;

const DisabledDarkButtonComponent = BaseButton.extend`
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