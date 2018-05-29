import * as React from 'react';
import { ProgressBar } from './ProgressBar';
import { imgArray } from '../lib/commonData';
import styled from 'styled-components';
import { SingleStatistic } from './SingleStatistic';
import { Statistic } from '../types/models';

const OverviewContainer = styled.section`

	margin-top: -86px;
	background: ${props => props.theme.bg.lightGrey};
	color: white;

	img {
		width: 100%;
	}
`;

const FounderContainer = styled.section`

`;

const Founder = styled.div`
	background: white;
`;

const DarkBar = styled(ProgressBar)``;

const BarContainer = styled.div`

	div {
		height: 2px;
		background-color: #033C50;
	}

	div div {
		height: 4px;
		position: relative;
		top: -1px;
		z-index: 1;
	}
`;

const Sidebar = styled.div`
	background: ${props => props.theme.bg.gradientBlue};
	padding: 15px;

	hr {
		height: 1px;
		border-radius: 2px;
		background-color: #033C50;}
	}
`;

const Claims = styled.h4`
	font-weight: 300;
	font-size: 30px;
	margin-top: 15px;

	strong {
		font-weight: 500;
	}
`;

const StatisticsContainer = styled.div`

	div {
		padding: 0;
	}
	span {
		font-size: 15px;
	}
`;

export interface Props {
	statistics: Statistic[];
}

export const ProjectOverview: React.SFC<Props> = (props) => {
	return (
		<div>
			<OverviewContainer className="container-fluid">
				<div className="container">
					<div className="row">
						<div className="col-md-8">
							<img src={imgArray()[0]} />
						</div>
						<div className="col-md-4">
							<Sidebar>
								<BarContainer><DarkBar total={20} approved={7} rejected={1} /></BarContainer>
								<Claims>567/<strong>1,298</strong></Claims>
								<p>Successful water systems built</p>
								<p><strong>4</strong> disputed claims</p>
								<hr />
								<div className="row">
									{props.statistics.map((statistic, index) => {
										return (
											<StatisticsContainer className="col-md-4" key={index}>
												<SingleStatistic type={props.statistics[index].type} amount={props.statistics[index].amount} descriptor={props.statistics[index].descriptor}/>
											</StatisticsContainer>
										);
									})}
								</div>
							</Sidebar>
						</div>
					</div>
				</div>
			</OverviewContainer>
			<FounderContainer className="container-fluid">
				<div className="container">
					<Founder className="row">
						<div className="col-md-8">
							kindness
						</div>
						<div className="col-md-4">
							cerveza
						</div>
					</Founder>
				</div>
			</FounderContainer>
		</div>

	);
};