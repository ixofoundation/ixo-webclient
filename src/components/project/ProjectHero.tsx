import * as React from 'react';
import styled from 'styled-components';
import { Tabs } from '../common/Tabs';
import { SDGArray, deviceWidth } from '../../lib/commonData';
import MediaQuery from 'react-responsive';
import { Link, NavLink } from 'react-router-dom';
import { getCountryName, getIxoWorldRoute } from '../../utils/formatters';
import { MatchType, AgentRoles } from '../../types/models';
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
	
	padding-top: 80px;
	padding-bottom: 130px;
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
	z-index: 7;
	top: 74px;
	right: 0;
	width: 100%;

	@media (min-width: 1450px){
		top: 48px;
		z-index: 11;
	}
`;

const HeroContainer = styled.div`
	background: url(${bg}) no-repeat center top;
	background-size: cover;
	margin:0;
	position: relative;	

	.detailed {
		padding-bottom: 50px;
	}
`;

const ColLeft = styled.div`

`;

const ColRight = styled.div`
	color: white;
	font-weight: 200;
    display: flex;
    flex-direction: column;
	justify-content: center;
	
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
	line-height: 1;
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

const AddClaim = styled(Link)`
	color: white;
	display: inline-block;
	text-align: center;
	background: ${props => props.theme.bg.gradientButton};
	font-size: 15px;
	width: 288px;
	padding:10px 0;
	font-family: ${props => props.theme.fontRobotoCondensed};
	margin-right: 10px;

	:hover {
		text-decoration: none;
		color: white;
		background: ${props => props.theme.bg.lightBlue};;
	}
`;

const SubTextContainer = styled.div`
	margin-bottom: 20px;

	@media (min-width: ${deviceWidth.desktop}px) {
		margin-bottom: 0;
	}
`;

const SubNavItem = styled(NavLink).attrs({
		activeClassName: 'active',
	})`
	color: ${props => props.theme.fontBlue};
	font-family: ${props => props.theme.fontRobotoCondensed};
	font-weight: 300;
	font-size: 14px;
	text-transform: uppercase;

	&.active {
		color: white;
	}

	+ span  {
		color: ${props => props.theme.fontBlue};
		margin:0 10px;
	}
	:hover {
		color: white;
		text-decoration: none;
	}
`;

export interface Props {
	project: any;
	match: any;
	isDetail: boolean;
	isClaim?: boolean;
	hasCapability: (role: [AgentRoles]) => boolean;
}

export const ProjectHero: React.SFC<Props> = ({project, match, isDetail, hasCapability, isClaim}) => {

	const buttonsArray = [
		{ iconClass: 'icon-projects', path: `/projects/${match.params.projectDID}/overview`, title: 'PROJECT' },
		{ iconClass: 'icon-impacts', path: `/projects/${match.params.projectDID}/detail`, title: 'DASHBOARD' }
	];

	const handleSwitchDescription = () => {
		if (isClaim) {
			return (
				<SubTextContainer>
					<SubNavItem exact={true} to={`/homepage`}>HOME</SubNavItem> <span>|</span>
					<SubNavItem exact={true} to={`/projects/`}>PROJECTS</SubNavItem> <span>|</span>
					<SubNavItem exact={true} to={`/projects/${match.params.projectDID}/overview/`}>{project.title}</SubNavItem> <span>|</span>
					<SubNavItem to={`/projects/${match.params.projectDID}/detail/new-claim`}>SUBMIT CLAIM</SubNavItem>
				</SubTextContainer>
			);
		} else {
			return (
				<SubTextContainer>
					{project.sdgs.map((SDG, index) => {
						const goal = Math.floor(SDG);
						return (
							<SingleSDG href={getIxoWorldRoute('/about')} key={index}>
								<i className={`icon-sdg-${SDGArray[goal - 1].ico}`}/>
								{goal}. {SDGArray[goal - 1].title}
						</SingleSDG>
						);
					})}
				</SubTextContainer>
			);
		}
	};

	return (
		<HeroContainer className="container-fluid">
				<HeroInner className={`container ${isDetail && `detailed`}`}>
					<div className="row">
						<ColLeft className="col-lg-8 col-sm-12">
							<Title>{project.title}</Title>
							{handleSwitchDescription()}
							{!isDetail && <Description>{project.shortDescription}</Description>}
							{!isDetail && hasCapability([AgentRoles.serviceProviders]) && <AddClaim to={`/projects/${match.params.projectDID}/detail/new-claim`}>+ CAPTURE CLAIM</AddClaim>}
							{!isDetail && hasCapability([AgentRoles.evaluators]) && <AddClaim to={`/projects/${match.params.projectDID}/detail/claims`}>EVALUATE CLAIMS</AddClaim>}
						</ColLeft>
						<ColRight className="col-lg-4 col-sm-12">
							<p><strong>Created:</strong> {project.createdOn.split('T')[0]}</p>
							<p><strong>By:</strong> {project.ownerName}</p>
							<p>
								<i className="icon-location" />
								{getCountryName(project.projectLocation)}
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
									buttons={buttonsArray}
									matchType={MatchType.strict}
								/>
							</div>
						</div>
					</div>
					</MediaQuery>
					<MediaQuery maxWidth={`${Number(deviceWidth.desktop) - 1}px`}>
						<Tabs 
							buttons={buttonsArray}
							matchType={MatchType.strict}
						/>
					</MediaQuery>
				</TabsController>
		</HeroContainer>
	);
};