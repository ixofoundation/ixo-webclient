import * as React from 'react';
import styled from 'styled-components';
import { Tabs } from './Tabs';
import { SingleStatistic } from './SingleStatistic';
import { Statistic } from '../types/models';
import '../utils/mediaBreakpoints';
import { deviceWidth } from '../utils/mediaBreakpoints';

const bg = require('../assets/images/heroBg.jpg');

const HeroContainer = styled.div`
	background: url(${bg}) no-repeat center top;
	background-size: cover;
	margin:74px 0 60px;
	width: 100vw;
	position: relative;
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
	
	@media (min-width: ${deviceWidth.tablet}px) {
		height:200px;
		margin:90px 0 60px;
	}
`;

const HeroInner = styled.div`
	position:relative;
	height:100%;

	> .row {
		justify-content: center;
		align-items: center;
		height:100%;
	}
`;

const PositionController = styled.div`
	position: absolute;
    right: 0;
    bottom: calc(0% - 20px);
    z-index: 1;
`;

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

	@media (min-width: ${deviceWidth.tablet}) {
		border-left: 1px solid rgba(73,191,224,0.3);
	}

	:first-child > div {
		border-left:0;
	}
`;

export interface Props {
	isProjectPage: boolean;
	statistics: Statistic[];
}

export const HeroSection: React.SFC<Props> = (props) => {
	return (
		<HeroContainer>
			<HeroInner className="container">
				<div className="row">
				{props.statistics.map((statistic, index) => {
					return (
						<StatisticContainer key={index} className="col-md-3 col-sm-6 col-6">
							<SingleStatistic title={statistic.title} type={statistic.type} amount={statistic.amount} descriptor={statistic.descriptor}/>
						</StatisticContainer>
					);
				})}
				</div>
				<PositionController>
					<Tabs 
						buttons={[
							{ iconClass: 'icon-projects', path: '/', title: 'PROJECTS' },
							{ iconClass: 'icon-statistics-graph', path: '/global-statistics', title: 'IMPACTS' }
						]}
					/>
				</PositionController>
			</HeroInner>
		</HeroContainer>
	);
};