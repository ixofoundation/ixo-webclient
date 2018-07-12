import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
	background: ${props => props.theme.bg.gradientBlue};
	border: 1px solid ${props => props.theme.widgetBorder};
	padding: 10px 20px;
	box-shadow: 0 2px 10px 0 rgba(0,0,0,0.18);
	margin: 15px 0;
	transform-origin: center;

	transition: box-shadow 0.3s ease, transform 0.3s ease;

	h3 {
		font-family: ${props => props.theme.fontRobotoCondensed};
		font-weight: normal;
		font-size: 19px;
	}
`;

const FlexContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;

const WrappedLink = styled(Link)`

	color: white;

	p, a, i, h3 {
	}
	
	i {
		font-size: 20px;
		transition: transform 0.3s ease;
	}
	
	:hover {
		text-decoration: none;
		color: white;
	}

	:hover ${Container} {
		box-shadow: 0 10px 20px 0 rgba(0,0,0,0.5);
	}

	:hover p, :hover h3, :hover a, :hover i {
	}

	:hover i {
		transform: scale(1.1);
	}
	.decimal {
		color: ${props => props.theme.fontLightBlue};
	}
`;

export interface ParentProps {
	title?: string;
	link?: boolean;
	path?: string;
	linkIcon?: string;
}

export const WidgetWrapper: React.SFC<ParentProps> = ({title, link, path, linkIcon, children}) => {

	if (link) {
		return (
			<WrappedLink to={path}>
				<Container className="container-fluid">
					<FlexContainer>
						{title && <h3>{title}</h3>}
						{linkIcon && <i className={linkIcon}/>}
					</FlexContainer>
					{children}
				</Container>
			</WrappedLink>
		);
	} else {
		return (
			<Container className="container-fluid">
				<FlexContainer>
					{title && <h3>{title}</h3>}
				</FlexContainer>
				{children}
			</Container>
		);
	}
};