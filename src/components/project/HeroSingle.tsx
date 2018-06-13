import * as React from 'react';
import styled from 'styled-components';
import { Tabs } from '../common/Tabs';
import { SDGArray, deviceWidth } from '../../lib/commonData';
import MediaQuery from 'react-responsive';
const bg = require('../../assets/images/heroBg.jpg');

const SingleSDG = styled.a`
	&&& {
		color: ${props => props.theme.fontBlue};
	}
	font-family: ${props => props.theme.fontRobotoCondensed};
	font-weight: 300;
	font-size: 14px;
	margin:0 10px 10px 0;
	display:inline-flex;
	align-items: center;
	text-decoration: none;
	cursor: pointer;

	i {
		font-size: 22px;
		margin-right: 8px;
	}

	i:before {
		width: 50px;
		display: inline-block;
	}

	@media (min-width: ${deviceWidth.tablet}px){
		i:before {
			width: auto;
		}		
	}

	&&&:hover, :hover i:before {
		color: ${props => props.theme.fontLightBlue};
	}
`;

const HeroInner = styled.div`
	
	padding-top: 90px;
	position:relative;
	height:100%;

	@media (min-width: ${deviceWidth.desktop + 1}px){
		padding-top: 150px;
	}	
`;

const TabsController = styled.div`
	position: fixed;
	display: flex;
	justify-content: flex-end;
	z-index: 11;
	top: 74px;
	right: 0;
	width: 100%;

	a:last-child {
		padding: 10px;
	}

	a:last-child i {
		margin: 0;
		font-size:22px;
	}

	@media (min-width: ${deviceWidth.tablet}px){
		top: 80px;
		left: auto;
		right: auto;
	}
`;

const HeroContainer = styled.div`
	background: url(${bg}) no-repeat center top;
	background-size: cover;
	margin:0;
	padding-bottom: 110px;
	width: 100vw;
	position: relative;	
`;

const ColLeft = styled.div`

`;

const ColRight = styled.div`
	color: white;
	font-weight: 300;

	p {
		margin-bottom: 0;
		line-height: 24px;
	}

	i {
		margin-right: 8px;
	}

	i:before {
		color: white;
	}
`;

const Title = styled.h1`
	color: white;
	font-size: 36px;
	margin-bottom:10px;
	font-family: ${props => props.theme.fontRobotoCondensed};

	@media (min-width: 600px) {
		font-size: 45px;
	}
`;

const Description = styled.p`
	color: white;
	font-size: 16px;
	margin-top:10px;
`;

export interface Props {
	projectTitle: string;
	SDGs: number[];
	description: string;
	dateCreated: string;
	owner: string;
	country: string;
	match: any;
}

export const HeroSingle: React.SFC<Props> = (props) => {
	return (
		<HeroContainer>
				<HeroInner className="container">
					<div className="row">
						<div className="col-12">
							<Title>{props.projectTitle}</Title>
						</div>
						<ColLeft className="col-lg-8 col-sm-12">
							{props.SDGs.map((SDG, index) => {
								const goal = Math.floor(SDG);
								return (
									<SingleSDG key={index}>
											<i className={`icon-${SDGArray[goal - 1].ico}`}/>
											{goal}. {SDGArray[goal - 1].title}
									</SingleSDG>
								);
							})}
							<Description>{props.description}</Description>
						</ColLeft>
						<ColRight className="col-lg-4 col-sm-12">
							<p><strong>Created:</strong> {props.dateCreated}</p>
							<p><strong>By:</strong> {props.owner}</p>
							<p>
								<i className="icon-location" />
								{props.country}
							</p>
						</ColRight>
					</div>
				</HeroInner>
				<TabsController>
				<MediaQuery minWidth={`${deviceWidth.desktop}px`}>
					<div className="container">
						<div className="row">
							<div className="offset-md-8" />
							<div className="col-md-4">
								<Tabs 
									buttons={[
										{ iconClass: 'icon-projects', path: `/projects/${props.match.params.projectDID}/home`, title: 'PROJECT' },
										{ iconClass: 'icon-statistics-graph', path: `/${props.match.params.projectDID}/dashboard`, title: 'DASHBOARD' },
										{ iconClass: 'icon-settings-large', path: '/global-statistics' }
									]}
								/>
							</div>
						</div>
					</div>
					</MediaQuery>
					<MediaQuery maxWidth={`${Number(deviceWidth.desktop) - 1}px`}>
						<Tabs 
							buttons={[
								{ iconClass: 'icon-projects', path: `/${props.match.params.projectID}/home`, title: 'PROJECT' },
								{ iconClass: 'icon-statistics-graph', path: `/${props.match.params.projectID}/stats`, title: 'DASHBOARD' },
								{ iconClass: 'icon-settings-large', path: '/global-statistics' }
							]}
						/>
					</MediaQuery>
				</TabsController>
		</HeroContainer>
	);
};