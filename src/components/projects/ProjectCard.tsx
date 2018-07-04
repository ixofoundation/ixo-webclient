import * as React from 'react';
import { SDGArray, deviceWidth } from '../../lib/commonData';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ProgressBar } from '../common/ProgressBar';
import { excerptText } from '../../utils/formatters';

const placeholder = require('../../assets/images/ixo-placeholder-large.jpg');

const Title = styled.h3`
    font-weight: 400;
    font-size: 21px;
    box-sizing: border-box;
    margin: 12px 0;
	color: ${props => props.theme.fontDarkGrey};
    line-height: 1.2;
`;

const Owner = styled.p`
	font-size: 11px;
	margin-bottom: 15px;
`;

const Description = styled.div`
	height: 100%;
    width: 100%;
    background: rgba(0,0,0,0.5);
    margin: 0;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    padding: 40px 20px 10px;
	text-align: left;
	transition: opacity 0.5s ease;

	@media (min-width: ${deviceWidth.desktop}px){
		opacity: 0;
	}

	p {
		font-size: 13px;
		color: white;
		position:relative;
		top: -15px;

		transition: top 0.6s ease;
	}
`;

const Progress = styled.p`
	font-size: 23px;
	font-weight: lighter;
	margin:15px 0 0;
`;

const Impact = styled.p`
	font-size: 13px;
	font-weight: 400;
`;

const SDGs = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-content: flex-start;
	justify-content: flex-end;
`;

const CardTop = styled.div`
	border-radius:2px 2px 0 0;
	padding: 10px;
	height: 240px;
	box-shadow: 0 8px 16px -2px rgba(0,0,0,0.03);
	background-size: 100%;
	background-repeat: no-repeat;
	background-position: center top;

	transition: background-size 0.3s ease;

	position:relative;

	@media (min-width: ${deviceWidth.mobile}px){
		height: 170px;
	}

	:before {
		content: "";
		position: absolute;
		width: 100%;
		height: 33%;
		top: 0;
		left: 0;
		background: linear-gradient(180deg,rgba(0,0,0,0.33) 0%,rgba(0,0,0,0) 100%);
	}

	i {
		position: relative;
		z-index: 1;
	}
	i:before {
		color: white;
		font-size: 20px;
		margin: 10px 5px;
		display: inline-flex;
	}
`;

const CardBottom = styled.div`
	border-radius: 0 0 2px 2px;
	padding: 20px 14px;
	background: white;

	p {
        font-weight:300;
		color: ${props => props.theme.fontDarkGrey};
    }
`;

const CardContainer = styled.div`
	margin-bottom: 34px;
`;

const ProjectLink = styled(Link) `
	display: block;
	box-shadow: 0px 10px 25px 0px rgba(0,0,0,0);
	background: white;
	height:100%;
	border: 1px solid #E2E2E2;

	transition: box-shadow 0.3s ease;

	:hover {
		box-shadow: 0px 10px 25px 0px rgba(0,0,0,0.15);
		text-decoration:none;
	}

	:hover ${CardTop} {
		background-size: 105%;
	}

	:hover ${Description} {
		opacity: 1;
	}

	:hover ${Description} p {
		top: 0;
	}
`;

export interface Props {
	project: any;
	did: string;
	ixo?: any;
}

export interface States {
	imageLink: string;
	imageLoaded: boolean;
}

export class ProjectCard extends React.Component<Props, States> {

	state = {
		imageLink: placeholder,
		imageLoaded: false
	};
	
	fetchImage = (imageLink: string, pdsURL: string) => {
		if (imageLink && imageLink !== '') {
			if (this.props.ixo && !this.state.imageLoaded) {
				this.setState({imageLoaded: true});
				this.props.ixo.project.fetchPublic(imageLink, pdsURL).then((res: any) => {
					let imageSrc = 'data:' + res.contentType + ';base64,' + res.data;
					this.setState({ imageLink: imageSrc });
				});
			}
		}
	}

	componentDidUpdate() {
		this.fetchImage(this.props.project.imageLink, this.props.project.serviceEndpoint);
	}

	render() {
		return (
			<CardContainer className="col-10 offset-1 col-xl-4 col-md-6 col-sm-10 offset-sm-1 offset-md-0">
				<ProjectLink to={{pathname: `/projects/${this.props.did}/overview`, state: { project: this.props.project, did: this.props.did } }}>
					<CardTop style={{backgroundImage: `url(${this.state.imageLink})`}}>
						<SDGs>
						{this.props.project.sdgs.map((SDG, SDGi) => {
							return (
							<i key={SDGi} className={`icon-sdg-${SDGArray[Math.floor(SDG) - 1].ico}`} />
							);
						})}
						</SDGs>
						<Description><p>{excerptText(this.props.project.shortDescription, 20)}</p></Description>
					</CardTop>
					<CardBottom>
						<Title>{excerptText(this.props.project.title, 10)}</Title>
						<Owner>By {this.props.project.ownerName}</Owner>
						<ProgressBar total={this.props.project.requiredClaims} approved={this.props.project.claimStats.currentSuccessful} rejected={this.props.project.claimStats.currentRejected}/>
						<Progress>{this.props.project.claimStats.currentSuccessful} / <strong>{this.props.project.requiredClaims}</strong></Progress>
						<Impact>{this.props.project.impactAction}</Impact>
					</CardBottom>
				</ProjectLink>
			</CardContainer>
		);
	}
}