import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	background: ${props => props.theme.bg.gradientBlue};
	border: 1px solid ${props => props.theme.widgetBorder};
	padding: 10px 20px;
	box-shadow: 0 2px 10px 0 rgba(0,0,0,0.18);
	margin: 15px 0;
	
	p, h3, a {
		color: white;
	}

	h3 {
		font-family: ${props => props.theme.fontRobotoCondensed};
		font-weight: normal;
		font-size: 19px;
	}
`;

export interface ParentProps {
	title?: string;
}

export const WidgetWrapper: React.SFC<ParentProps> = ({title, children}) => {
	return (
		<Container className="container-fluid">
		<h3>{title}</h3>
			{children}
		</Container>
	);
};