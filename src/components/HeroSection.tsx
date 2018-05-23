import * as React from 'react';
import styled from 'styled-components';
import { Tabs } from './Tabs';
import { Statistic } from './Statistic';
const bg = require('../assets/images/heroBg.jpg');

const HeroContainer = styled.div`
	height:200px;
	background: ${props => props.theme.bg.darkBlue} url(${bg}) no-repeat center top;
	background-size: cover;
	margin:90px 0 60px;
	width: 100vw;
`;

const HeroInner = styled.div`
	position:relative;
	height:100%;
`;

const PositionController = styled.div`
	position: absolute;
    right: 0;
    bottom: calc(0% - 20px);
    z-index: 1;
`;

enum StatisticType {
	decimalAmount = 'DECIMAL',
	fraction = 'FRACTION',
	ixoAmount = 'IXO',
}

export interface Statistic {
	title: string;
	type?: StatisticType;
	amount: number | [number, number];
	descriptor?: string;
}

export interface Props {
	isProjectPage: boolean;
	statistics: Statistic[];
}

export const HeroSection: React.SFC<Props> = () => {
	return (
		<HeroContainer>
			<HeroInner className="container">
				<div className="row">
					<div className="col-md-6"><Statistic title={'test'} type={StatisticType.decimalAmount} amount={[1, 20]} descriptor={'test'}/></div>
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