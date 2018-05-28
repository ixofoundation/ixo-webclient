import * as React from 'react';
import styled from 'styled-components';
import { Tabs } from './Tabs';
import { SDGArray, deviceWidth } from '../lib/commonData';

const bg = require('../assets/images/heroBg.jpg');

const SingleSDG = styled.a`
	&&& {
		color: ${props => props.theme.fontBlue};
	}

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

	@media (min-width: ${deviceWidth.tablet}){
		i:before {
			width: auto;
		}		
	}

	&&&:hover, :hover i:before {
		color: ${props => props.theme.fontLightBlue};
	}
`;

const HeroInner = styled.div`
	
	padding-top: 60px;
	position:relative;
	height:100%;

	@media (min-width: ${deviceWidth.desktop}px){
		padding-top: 150px;
	}	
`;

const PositionController = styled.div`
	position: fixed;
	top: 80px;
	display: flex;
	justify-content: flex-end;
    z-index: 11;
`;

const HeroContainer = styled.div`
	background: url(${bg}) no-repeat center top;
	background-size: cover;
	margin:0;
	padding-bottom: 140px;
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
								return (
									<SingleSDG key={index}>
											<i className={`icon-${SDGArray[SDG - 1].ico}`}/>
											{SDG}. {SDGArray[SDG - 1].title}
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
					<PositionController className="container">
						<Tabs 
							buttons={[
								{ iconClass: 'icon-projects', path: `/${props.match.params.projectID}/home`, title: 'PROJECT' },
								{ iconClass: 'icon-statistics-graph', path: `/${props.match.params.projectID}/stats`, title: 'DASHBOARD' },
								{ iconClass: 'icon-settings-large', path: '/global-statistics' }
							]}
						/>
					</PositionController>
				</HeroInner>
		</HeroContainer>
	);
};