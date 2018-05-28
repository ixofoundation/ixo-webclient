import * as React from 'react';
import styled from 'styled-components';
import { Tabs } from './Tabs';
import { SDGArray } from '../lib/commonData';

const bg = require('../assets/images/heroBg.jpg');

const StatisticContainer = styled.div`

	height: 100%;
	align-items: center;
	display: flex;
	padding: 0;
	justify-content: center;

	> div {
		height: auto;
		width: 100%;
	}

`;

const SingleSDG = styled.div`
	color: ${props => props.theme.fontBlue};
`;

const HeroInner = styled.div`
	position:relative;
	height:100%;

	> .row {
		justify-content: center;
		align-items: center;
		height:100%;
	}

	${StatisticContainer}{
		transition: transform 0.3s ease;
	}

`;

const PositionController = styled.div`
	position: absolute;
	right: 0;
	top:-10px;
	
    z-index: 1;
`;

const HeroContainer = styled.div`
	background: url(${bg}) no-repeat center top;
	background-size: cover;
	margin:0 0 60px;
	width: 100vw;
	position: relative;
	z-index:10;
	cursor:pointer;

	:before {
		position: absolute;
		content:" ";
		top:0;
		left:0;
		width:100%;
		height:100%;
		z-index:0;
		transition: background 0.3s ease;

		background-color: rgba(3,60,80,0);
	}

	:hover:before {
		background-color: rgba(3,60,80,0.6);
	}
	
`;

export interface Props {
	projectTitle: string;
	SDGs: number[];
	description: string;
	dateCreated: string;
	owner: string;
	country: string;
}

export const HeroSingle: React.SFC<Props> = (props) => {
	return (
		<HeroContainer>
				<HeroInner className="container">
					<div className="row">
						<div className="col-8">
							<h1>{props.projectTitle}</h1>
							{props.SDGs.map((SDG, index) => {
								return (
									<SingleSDG key={index}>
										<p>
											<i className={`icon-${SDGArray[SDG - 1].ico}`}/>
											{SDGArray[SDG - 1].title}
										</p>
									</SingleSDG>
								);
							})}
							<p>{props.description}</p>
						</div>
						<div className="col-4">
							<p>Created: {props.dateCreated}</p>
							<p>By: {props.owner}</p>
							<p>
								<i className="icon-location" />
								{props.country}
							</p>
						</div>
					</div>
					<PositionController>
						<Tabs 
							buttons={[
								{ iconClass: 'icon-projects', path: '/:projectID/home', title: 'PROJECT' },
								{ iconClass: 'icon-statistics-graph', path: '/:projectID/stats', title: 'DASHBOARD' },
								{ iconClass: 'icon-settings-large', path: '/global-statistics' }
							]}
						/>
					</PositionController>
				</HeroInner>
		</HeroContainer>
	);
};