import * as React from 'react';
import { ProgressBar } from './ProgressBar';
import { imgArray, deviceWidth } from '../lib/commonData';
import styled from 'styled-components';
import { SingleStatistic } from './SingleStatistic';
import { Statistic } from '../types/models';

const founderLogo = require('../assets/images/founder-logo.png');

const OverviewContainer = styled.section`

	margin-top: -86px;
	background: ${props => props.theme.bg.lightGrey};
	color: white;
	padding-bottom: 40px;

	img {
		width: 100%;
		box-shadow: 0px 10px 35px 0px rgba(0,0,0,0.25);
		margin-bottom: 22px;
	}
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
	padding: 24px 15px 15px;
	box-shadow: 0px 15px 35px 0px rgba(0,0,0,0.35);
	margin-bottom: 35px;

	hr {
		height: 1px;
		border-radius: 2px;
		background-color: #033C50;}
	}
`;

const Claims = styled.h4`
	font-weight: 100;
	font-size: 30px;
	margin: 15px 0 0;
	line-height: 1;

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

const ImpactAction = styled.p`
	font-size: 18px;
	margin-bottom:10px;
`;

const Disputed = styled.p`
	font-size: 14px;
	margin: 0;
	font-weight: 100;

	strong {
		font-weight: bold;
	}
`;

const Text = styled.div`
	color: ${props => props.theme.fontDarkGrey};
	font-size: 16px;
	line-height: 30px;
`;

const Social = styled.div`

	margin: 10px 0 20px;
    display: flex;
	justify-content: space-evenly;
	
	@media (min-width:${deviceWidth.tablet}px){
		margin-top: 10px;
		display: block;
	}

	i {
		font-size: 17px;
		margin-right: 28px;

		transition: transform 0.3s ease;
	}

	i:before {
		color: ${props => props.theme.fontDarkGrey};
	}

	i:hover:before {
		cursor: pointer;
		color: ${props => props.theme.darkGrey};
	}
`;

const Button = styled.button`
	border: 1px solid #B8B8B8;
    color: ${props => props.theme.fontGrey};
    font-size: 16px;
    text-transform: uppercase;
    padding: 10px 20px;
    background: none;
    margin-bottom: 10px;
	width: 100%;
	font-family: ${props => props.theme.fontRobotoCondensed};
	font-weight: 500;
	
	transition: all 0.3s ease;
	cursor: pointer;

	:hover {
		color: white;
		background: #B8B8B8;
	}

	:hover i:before {
		color: white;
	}

	i {
		font-size: 21px;
		position: relative;
		top: 3px;
		margin-right: 10px;
	}

	i:before {
		transition: color 0.3s ease;
	}
`;

const BlueButton = styled(Button)`
	border: 1px solid ${props => props.theme.ixoBlue};
    color: white;
	font-weight: 300;
	font-size: 15px;

	:hover {
		color: ${props => props.theme.fontBlue};
		background: none;
	}
`;

const FounderContainer = styled.section`
	padding: 50px 0;
`;

const IconText = styled.p`

`;

const Founder = styled.div`
	background: white;

	h3, h4 {
		font-family: ${props => props.theme.fontRobotoCondensed};
	}

	h3 {
		font-size: 30px;
	}

	h4 {
		font-size: 16px;
		color: ${props => props.theme.darkGrey};
	}
	
	img {
		margin-top: 20px;
	}

	${IconText} {
		margin-top: 10px;
		color: #333C4E;
		font-size: 14px;
		font-family: ${props => props.theme.fontRoboto};

		span {
			display: block;
			margin:0 15px 10px 0;
		}

		@media (min-width:400px) {
			span {
				display: inline;
			}
		}

		i {
			margin-right: 5px;
		}
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
							<Text>
								<p>Like other rural areas in Africa, the water supply and sanitation infrastructure in Togo is poor,
								which in turn results in illnesses as a result of hygiene deficits. The German Red Cross is cooperating
								with the Togolese Red Cross (TRC) in the Maritime region to improve drinking water supplies as well as
								hygiene and sewage water systems.
								</p>
								<p>
								In rural areas access to clean drinking water is often non-existent or subject to restrictions. Most people seek relief in nature or
								use the "flying toilet"(open defecation in a plastic bag). Every year people die of hygiene-related illnesses such as cholera,
								typhoid and other pathogens which cause diarrhoea. Working together with the TRC and the responsible ministry in an EU-funded
								project, the GRC is improving the water supply in 60 villages by drilling new wells or repairing wells. Training in hygiene
								and education in the communities, in particular in the "Mother Clubs" and women's groups, initiated by the GRC and the TRC, has been successful. 
								</p>
							</Text>
							<Social>
								<i className="icon-instagram-logo" />
								<i className="icon-twitter-logo-silhouette"/>
								<i className="icon-facebook-logo"/>
								<i className="icon-world-url"/>
							</Social>
						</div>
						<div className="col-md-4">
							<Sidebar>
								<BarContainer><DarkBar total={20} approved={7} rejected={1} /></BarContainer>
								<Claims>567/<strong>1,298</strong></Claims>
								<ImpactAction>successful water systems built</ImpactAction>
								<Disputed><strong>4</strong> disputed claims</Disputed>
								<hr />
								<div className="row">
									{props.statistics.map((statistic, index) => {
										return (
											<StatisticsContainer className="col-md-6 col-lg-4 col-4" key={index}>
												<SingleStatistic type={props.statistics[index].type} amount={props.statistics[index].amount} descriptor={props.statistics[index].descriptor}/>
											</StatisticsContainer>
										);
									})}
								</div>
								<BlueButton>INVEST IN THIS PROJECT</BlueButton>
								<BlueButton>BECOME AN EVALUATOR</BlueButton>
								<BlueButton>BECOME A SERVICE PROVIDER</BlueButton>
							</Sidebar>
							<Button><i className="icon-favourites"/>SAVE TO FAVOURITES</Button>
							<Button><i className="icon-share"/>SHARE THIS PROJECT</Button>
						</div>
					</div>
				</div>
			</OverviewContainer>
			<FounderContainer className="container-fluid">
				<div className="container">
					<Founder className="row">
						<div className="col-md-8">
							<h4>Project Founder</h4>
							<h3>Water for Africa</h3>
							<Text>We believe that a sustained programme of investment will enable communities in Africa to develop,
								become self reliant and so break the cycle of dependency and short term aid.</Text>
							<IconText>
								<span><i className="icon-location"/>United Kingdom</span>
								<span><i className="icon-url"/>waterforafrica.co.uk</span>
							</IconText>
						</div>
						<div className="col-md-4">
							<img src={founderLogo} alt="Water for Africa lgoo"/>
						</div>
					</Founder>
				</div>
			</FounderContainer>
		</div>

	);
};