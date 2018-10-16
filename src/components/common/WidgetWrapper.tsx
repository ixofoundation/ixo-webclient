import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export enum gridSizes {
	standard = 'NORMAL',
	double = 'DOUBLE',
}

export interface ParentProps {
	title?: string;
	link?: boolean;
	path?: string;
	linkIcon?: string;
	gridHeight?: gridSizes;
	padding?: boolean;
}

export const WidgetWrapper: React.SFC<ParentProps> = ({title, link, path, linkIcon, gridHeight, children, padding = true}) => {

	const Container = styled.div`
		background: ${props => props.theme.bg.gradientBlue};
		border: 1px solid ${props => props.theme.widgetBorder};
		padding: ${(padding && padding === true) ? '20px' : 0};
		box-shadow: 0 2px 10px 0 rgba(0,0,0,0.18);
		margin: 15px 0;
		transform-origin: center;
		display: flex;
		flex-direction: column;
		
		transition: box-shadow 0.3s ease, transform 0.3s ease;

		h3 {
			font-family: ${props => props.theme.fontRobotoCondensed};
			font-weight: normal;
			font-size: 19px;
		}
	`;

	const FlexTitle = styled.div`
		display: flex;
		justify-content: space-between;
		${(padding && padding === true) ? '' : 'position: absolute; top: 30px; left: 30px;'}
	`;

	const FlexContent = styled.div`
		display: flex;
		flex: 1 1 auto;
		flex-direction: column;
		justify-content: center;
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
	const setGridHeight = () => {
		if (!gridHeight || window.innerWidth < 576) {
			return 'none';
		} else if (gridHeight === gridSizes.standard) {
			return '330px';
		} else {
			return '660px';
		}
	};

	if (link) {
		return (
			<WrappedLink to={path}>
				<Container className="container-fluid" style={{minHeight: setGridHeight()}}>
					<FlexTitle>
						{title && <h3>{title}</h3>}
						{linkIcon && <i className={linkIcon}/>}
					</FlexTitle>
					<FlexContent>
						{children}
					</FlexContent>
				</Container>
			</WrappedLink>
		);
	} else {
		return (
			<Container className="container-fluid" style={{minHeight: setGridHeight()}}>
				<FlexTitle>
					{title && <h3>{title}</h3>}
				</FlexTitle>
				<FlexContent>
					{children}
				</FlexContent>
			</Container>
		);
	}
};