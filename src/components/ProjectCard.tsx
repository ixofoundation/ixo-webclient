import * as React from 'react';
import { SDGArray } from '../lib/commonData';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ProgressBar } from './ProgressBar';
import { excerptText } from '../utils/formatters';

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
    opacity: 0;
    margin: 0;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    padding: 40px 20px 10px;
	text-align: left;
	transition: opacity 0.5s ease;

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
	height: 170px;
	box-shadow: 0 8px 16px -2px rgba(0,0,0,0.03);
	background-size: cover;
	background-repeat: no-repeat;
	position:relative;

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
	border: 1px solid #E2E2E2;
	border-top: 0;
	background: white;

	& p {
        font-weight:100;
		color: ${props => props.theme.fontDarkGrey};
    }
`;

const CardContainer = styled.div`
	margin-bottom: 34px;
`;

const ProjectLink = styled(Link) `
	display: block;
	box-shadow: 0px 10px 25px 0px rgba(0,0,0,0);

	transition: box-shadow 0.3s ease;

	:hover {
		box-shadow: 0px 10px 25px 0px rgba(0,0,0,0.15);
		text-decoration:none;
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
	bg: string;
}

export const ProjectCard: React.SFC<Props> = (props) => {
	return (
		<CardContainer className="col-12 col-xl-4 col-lg-3 col-md-4 col-sm-6 ">
			<ProjectLink to={{pathname: `/${props.project._id}/home`, state: props.project }}>
				<CardTop style={{background: `url(${props.bg}) no-repeat center top / cover`}}>
					<SDGs>
					{SDGArray.map((SDG, SDGi) => {
						if (SDGi > 4) { 
							return '';
						}
						return (
						<i key={SDGi} className={`icon-${SDGArray[Math.floor(Math.random() * 17)].ico}`} />
						);
					})}
					</SDGs>
					<Description><p>{excerptText(props.project.about, 20)}</p></Description>
				</CardTop>
				<CardBottom>
					<Title>{excerptText(props.project.name, 10)}</Title>
					<Owner>By {props.project.owner.name}</Owner>
					<ProgressBar total={20} approved={10} rejected={3}/>
					<Progress>50 / <strong>200</strong></Progress>
					<Impact>Trees planted</Impact>
				</CardBottom>
			</ProjectLink>
		</CardContainer>
	);
};