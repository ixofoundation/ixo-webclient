import * as React from 'react';
import { ProgressBar } from '../common/ProgressBar';
import { deviceWidth } from '../../lib/commonData';
import styled from 'styled-components';
import { SingleStatistic } from '../common/SingleStatistic';
import { Statistic, StatType, AgentRoles } from '../../types/models';
import { getCountryName } from '../../utils/formatters';
import { ModalWrapper } from '../common/ModalWrapper';
import { ProjectNewAgent } from './ProjectNewAgent';
import { UserInfo } from '../../types/models';
import { Button, ButtonTypes } from '../common/Buttons';

const placeholder = require('../../assets/images/ixo-placeholder-large.jpg');

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

const LocalButton = styled.a`
	border: 1px solid #B8B8B8;
    &&& {color: ${props => props.theme.fontGrey};}
    font-size: 16px;
    text-transform: uppercase;
    padding: 10px 20px;
    background: none;
    margin-bottom: 10px;
	width: 100%;
	font-family: ${props => props.theme.fontRobotoCondensed};
	font-weight: 500;
	display:inline-block;
	text-align: center;

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

export interface ParentProps {
	userInfo: UserInfo;
	project: any;
	id: string;
	isModalOpen: boolean;
	modalData: any;
	checkUserDid: () => boolean;
	createAgent: (agentData: any) => void;
	toggleModal: (data?: any, modalStatus?: boolean) => void;
	hasCapability: (Role: [AgentRoles]) => boolean;
	imageLink: string;
}

export const ProjectOverview: React.SFC<ParentProps> = (props) => {
	
	const {evaluators, serviceProviders, investors} = props.project.agentStats;
	const statistics: Statistic[] = [
		{type: StatType.decimal, descriptor: [{class: 'text', value: 'Investors'}], amount: investors},
		{type: StatType.decimal, descriptor: [{class: 'text', value: 'Evaluators'}], amount: evaluators},
		{type: StatType.decimal, descriptor: [{class: 'text', value: 'Service providers'}], amount: serviceProviders}
		];

	const submitAgent = (role: string, agentData: any) => {

		let agentCreateJson: any = {...agentData, role: role};
		props.createAgent(agentCreateJson);
		props.toggleModal({});
	};

	const renderModal = (data: any) => {
		let userName = '';
		if (props.userInfo) {
			userName = props.userInfo.name.valueOf();
		}
		return (
			<ProjectNewAgent 
				submitAgent={submitAgent}
				role={data.selectedRole}
				name={userName}
				projectTitle={props.project.title}
			/>
		);
	};

	const renderLogo = () => {
		if (props.project.founder.logoLink !== '') {
			return <img src={props.project.founder.logoLink} alt=""/>;
		} else {
			return <span />;
		}
	};
	
	const handleRenderInvestorButton = () => {
		if (props.hasCapability([AgentRoles.investors])) {
			return <Button type={ButtonTypes.dark} disabled={true}>You are an investor</Button>;
		} else {
			return (
			<Button 
				type={ButtonTypes.dark} 
				disabled={false}
				onClick={() => props.toggleModal({selectedRole: AgentRoles.investors}, true)}
			>Invest in this Project
			</Button>
			);
		} 
	};

	const handleRenderEvaluatorButton = () => {
		if (props.hasCapability([AgentRoles.evaluators])) {
			return <Button type={ButtonTypes.dark} disabled={true}>You are an evaluator</Button>;
		} else if (props.hasCapability([AgentRoles.serviceProviders])) {
			return '';
		} else {
			return (
				<Button 
					type={ButtonTypes.dark} 
					disabled={false}
					onClick={() => props.toggleModal({selectedRole: AgentRoles.evaluators}, true)}
				>Become an evaluator
				</Button>
			);
		} 
	};

	const handleRenderServiceProviderButton = () => {
		if (props.hasCapability([AgentRoles.serviceProviders])) {
			return <Button type={ButtonTypes.dark} disabled={true}>You are a service provider</Button>;
		} else if (props.hasCapability([AgentRoles.evaluators])) {
			return '';
		} else {
			return (
				<Button 
					type={ButtonTypes.dark} 
					disabled={false}
					onClick={() => props.toggleModal({selectedRole: AgentRoles.serviceProviders}, true)}
				>Become a Service Provider
				</Button>
			);
		} 
	};

	const onProjectImageNotFound = (evt) => {
		evt.target.src = placeholder;
	};
	
	return (
		<div>
			<ModalWrapper
				isModalOpen={props.isModalOpen}
				handleToggleModal={() => props.toggleModal({})}
			>
				{renderModal(props.modalData)}
			</ModalWrapper>
			<OverviewContainer className="container-fluid">
				<div className="container">
					<div className="row">
						<div className="col-md-8">
							<img src={props.imageLink} onError={onProjectImageNotFound}/>
							<Text>
								<p>{props.project.longDescription} 
								</p>
							</Text>
							<Social>
								<a><i className="icon-instagram-logo" /></a>
								<a><i className="icon-twitter-logo-silhouette"/></a>
								<a><i className="icon-facebook-logo"/></a>
								<a><i className="icon-world-url"/></a>
							</Social>
						</div>
						<div className="col-md-4">
							<Sidebar>
								<BarContainer>
									<DarkBar 
										total={props.project.requiredClaims}
										approved={props.project.claimStats.currentSuccessful}
										rejected={props.project.claimStats.currentRejected} 
									/>
								</BarContainer>
								<Claims>{props.project.claimStats.currentSuccessful}/<strong>{props.project.requiredClaims}</strong></Claims>
								<ImpactAction>{props.project.impactAction}</ImpactAction>
								<Disputed><strong>{props.project.claimStats.currentRejected}</strong> disputed claims</Disputed>
								<hr />
								<div className="row">
									{statistics.map((statistic, index) => {
										return (
											<StatisticsContainer className="col-md-6 col-lg-4 col-4" key={index}>
												<SingleStatistic type={statistics[index].type} amount={statistics[index].amount} descriptor={statistics[index].descriptor}/>
											</StatisticsContainer>
										);
									})}
								</div>
								{handleRenderInvestorButton()}
								{handleRenderEvaluatorButton()}
								{handleRenderServiceProviderButton()}
							</Sidebar>
							<LocalButton><i className="icon-heart"/>SAVE TO FAVOURITES</LocalButton>
							<LocalButton><i className="icon-share"/>SHARE THIS PROJECT</LocalButton>
						</div>
					</div>
				</div>
			</OverviewContainer>
			<FounderContainer className="container-fluid">
				<div className="container">
					<Founder className="row">
						<div className="col-md-8">
							<h4>Project Founder</h4>
							<h3>{props.project.founder.name}</h3>
							<Text>{props.project.founder.shortDescription}</Text>
							<IconText>
								<span><i className="icon-location"/>{getCountryName(props.project.founder.countryOfOrigin)}</span>
								<span><i className="icon-url"/><a href={props.project.founder.websiteURL} target="_blank">{props.project.founder.websiteURL}</a></span>
							</IconText>
						</div>
						<div className="col-md-4">
							{renderLogo()}
						</div>
					</Founder>
				</div>
			</FounderContainer>
		</div>

	);
};