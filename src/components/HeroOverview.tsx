import * as React from 'react';
import styled from 'styled-components';
import { Tabs } from './Tabs';
import { SingleStatistic } from './SingleStatistic';
import { Statistic } from '../types/models';
import { deviceWidth } from '../lib/commonData';

const bg = require('../assets/images/heroBg.jpg');

const ContainerInner = styled.div`
	height: auto;
	width: 100%;
	transition: border-left 0.3s ease;

	> div {
		transition: transform 0.3s ease;
	}
`;

const StatisticContainer = styled.div`

	width: 100%;
	align-items: center;
	display: flex;
	padding: 0;
	justify-content: center;

	@media (min-width: ${deviceWidth.tablet}px) {
		${ContainerInner} {
			border-left: 1px solid rgba(73,191,224,0.3);
		}
	}

	:first-child > div {
		border-left:0;
	}
`;

const HeroInner = styled.div`
	height:100%;

	> .row {
		justify-content: center;
		align-items: center;
		height:100%;
	}
	
	> .row:hover ${ContainerInner} {
		border-left: 1px solid rgba(73,191,224,0);
	}

	> .row:hover ${ContainerInner} > div{
		transform: scale(0.95);
	}
	
`;

const PositionController = styled.div`
	position: absolute;
	right: 0;
	bottom: calc(0% - 20px);

    z-index: 1;
`;

const HeroContainer = styled.div`
	background: url(${bg}) no-repeat center top;
	background-size: cover;
	margin:0 0 60px;
	width: 100vw;
	cursor:pointer;
	position:relative;
	
	${HeroInner}:before {
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

	${HeroInner}:hover:before {
		background-color: rgba(3,60,80,0.6);
	}
	
	@media (min-width: ${deviceWidth.tablet}px) {
		height:200px;
	}
`;

export interface ProjectHeaderData {
	title: string;
	SDGs: number[];
	description: string;
	dateCreated: string;
	country: string;
}

export interface Props {
	statistics?: Statistic[];
	projectData?: ProjectHeaderData;
}

export const HeroOverview: React.SFC<Props> = (props) => {

	return (
		<HeroContainer>
				<HeroInner className="container">
					<div className="row">
						{props.statistics.map((statistic, index) => {
							return (
								<StatisticContainer key={index} className="col-md-3 col-sm-6 col-6">
									<ContainerInner>
										<SingleStatistic title={statistic.title} type={statistic.type} amount={statistic.amount} descriptor={statistic.descriptor}/>
									</ContainerInner>
								</StatisticContainer>
							);
						})}
					</div>
				</HeroInner>
				<div className="container">
						<div className="row">
						<div className="col-md-12">
						<PositionController>
						<Tabs 
							buttons={[
								{ iconClass: 'icon-projects', path: '/', title: 'PROJECTS' },
								{ iconClass: 'icon-statistics-graph', path: '/global-statistics', title: 'IMPACTS' }
							]}
						/>
					</PositionController>
						</div>
					</div>
				</div>
		</HeroContainer>
	);
};