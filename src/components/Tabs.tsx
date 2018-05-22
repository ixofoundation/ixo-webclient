import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const TabsContainer = styled.div`
	background:${props => props.theme.bg.gradientBlue};
	border-radius:3px;
	display:inline-flex;

	a {
		color:white;
		font-weight:300;
		padding:10px 10px 10px 20px;
		display:flex;
		align-items: center;
		justify-content: center;
		text-decoration: none;
		border-right:${props => props.theme.bg.LightBlue};
	}

	a:hover {
		background: ${props => props.theme.bg.LightBlue};
	}

	a:hover img {
		color:red;
		background:red;
		fill: red;
	}

	img {
		padding:0 5px;
	}
`;

export interface Button {
	iconURL: string;
	title?: string;
	path: string;
}

export interface Props {
	buttons: Button[];
}

export const Tabs: React.SFC<Props> = (props) => {
	return (
		<TabsContainer>
			{props.buttons.map((button, index) => {
				return (
					<Link to={button.path} key={index}>
						{button.iconURL && <img src={button.iconURL} />}
						{button.title && button.title}
					</Link>
				);
			})}
		</TabsContainer>
	);
};