import * as React from 'react';
import styled from 'styled-components';
import { Tabs } from './Tabs';
const bg = require('../assets/images/heroBg.jpg');

const PositionController = styled.div`
	position: absolute;
    right: 0;
    bottom: calc(0% - 20px);
    z-index: 1;
`;

const HeroContainer = styled.div`
	height:200px;
	background: ${props => props.theme.bg.darkBlue} url(${bg}) no-repeat center top;
	background-size: cover;
	margin-top:90px;
	width: 100vw;
`;

const HeroInner = styled.div`
	position:relative;
	height:100%;
`;

export interface Props {
	isProjectPage: boolean;
}

export const HeroSection: React.SFC<Props> = () => {
	return (
		<HeroContainer>
			<HeroInner className="container">
				<div className="row">
					<p>test</p>
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