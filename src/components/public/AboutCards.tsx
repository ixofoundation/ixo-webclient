import * as React from 'react';
import styled from 'styled-components';

const MattersRight = styled.div`
	display: flex;
	justify-content: left;
	flex-wrap: wrap;
	position: relative;
	top: -50px;
	width: 85%;
	.sdg-icon {
		background: #036C93;
		font-size: 45px;
		width: 117px;
		height: 118px;
		margin: 10px;
		cursor: pointer;
		position: relative;
		-webkit-transition: all 0.5s ease-out;
		-moz-transition: all 0.5s ease-out;
		-o-transition: all 0.5s ease-out;
		transition: all 0.5s ease-out;
	}
	.sdg-icon:hover {
		i:before {
			color: white;
		}
		&.nopoverty {
			background: #D33A44;
		}
		&.zerohunger {
			background: #DFA551;
		}
		&.goodhealth {
			background: #629E51;
		}
		&.qualityeducation {
			background: #B73336;
		}
		&.generequality {
			background: #DD4F3A;
		}
		&.cleanwater {
			background: #5CBDE2;
		}
		&.affordableenergy {
			background: #F3C546;
		}
		&.decentwork {
			background: #962B45;
		}
		&.industry {
			background: #E17240;
		}
		&.reduced {
			background: #CE3481;
		}
		&.consumption {
			background: #B88E40;
		}
		&.climateaction {
			background: #507D4C;
		}
		&.lifebelowwater {
			background: #4896CF;
		}
		&.lifeonland {
			background: #72B757;
		}
		&.peace {
			background: #31699B
		}
		&.partnership {
			background: #244868;
		}
		.hover-text {
			display: block;
		}
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100%;
		justify-content: space-around;
	}
	.hover-text {
		display: none;
		text-transform: uppercase;
		font-size: 12px;
		line-height: 12px;
		color: white;
		text-align: center;
	}
	.sdg-tooltip {
		display: none;
		width: 340px;
		background-color: #001A27;
		font-size: 11px;
		color: white;
		text-align: center;
		padding: 5px 10px;
		bottom: 125%;
		left: calc(50% - 175px);
		border-radius: 10px; /* This defines tooltip text position */
		position: relative;
		z-index: 1;
	}
	.sdg-tooltip::after {
		border-color: #001A27 rgba(0, 0, 0, 0) rgba(0, 0, 0, 0);
		border-style: solid;
		border-width: 7px;
		bototm: 160px;
		content: "";
		display: block;
		height: 0;
		left: calc(50% - 7px);
		position: absolute;
		width: 0;
		margin-top: 5px;
		-webkit-transform: rotate(0deg);
		-moz-transform: rotate(0deg);
		-o-transform: rotate(0deg);
		-ms-transform: rotate(0deg);
		transform: rotate(0deg);
	}
	.sdg-icon:hover {
		.sdg-tooltip {
			display: block;
		}
	}
`;
const Icon = styled.div`

`;

const sdgIcons = [
	{
		class: 'nopoverty',
		title: 'No Poverty',
		tooltip: 'End poverty in all its forms everywhere',
		bgColor: '#D33A44'
	},
	{
		class: 'zerohunger',
		title: 'Zero Hunger',
		tooltip: 'End hunger, achieve food security and improved nutrition and promote sustainable agriculture',
		bgColor: '#DFA551'
	},
	{
		class: 'goodhealth',
		title: 'Good Health and Well-Being',
		tooltip: 'Ensure healthy lives and promote well-being for all at all ages',
		bgColor: '#629E51'
	},
	{
		class: 'qualityeducation',
		title: 'Quality Education',
		tooltip: 'Ensure inclusive and equitable quality educaton and promote lifelong learning opportunities for all',
		bgColor: '#DFA551'
	},
	{
		class: 'generequality',
		title: 'Gender Equality',
		tooltip: 'Achieve gender equality and power all women and girls',
		bgColor: '#DD4F3A'
	},
	{
		class: 'cleanwater',
		title: 'Clean Water and Sanitation',
		tooltip: 'Ensure availability and sustainable management of water and sanitation for all',
		bgColor: '#5CBDE2'
	},
	{
		class: 'affordableenergy',
		title: 'Affordable and Clean Energy',
		tooltip: 'Ensure access to affordable, reliable, sustainable and modern energy for all',
		bgColor: '#F3C546'
	},
	{
		class: 'decentwork',
		title: 'Decent Work and Economic Growth',
		tooltip: 'Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all',
		bgColor: '#962B45'
	},
	{
		class: 'industry',
		title: 'Industry, Innovation and Infrastructure',
		tooltip: 'Build resilient infrastructure, promote inclusive and sustainable industrialization and fost innovation',
		bgColor: '#E17240'
	},
	{
		class: 'reduced',
		title: 'Reduced Inequalities',
		tooltip: 'Reduce inequality within and among countries',
		bgColor: '#CE3481'
	},
	{
		class: 'reduced',
		title: 'Sustainable Cities and Communities',
		tooltip: 'Make cities and human settlements inclusive, safe, resilient and sustainable',
		bgColor: '#EBA046'
	},
	{
		class: 'consumption',
		title: 'Responsible Consumption and Production',
		tooltip: 'Ensure sustainable consumption and production patterns',
		bgColor: '#B88E40'
	},
	{
		class: 'climateaction',
		title: 'Climate Action',
		tooltip: 'Take urgent action to combat climate change and it\'s impacts*',
		bgColor: '#507D4C'
	},
	{
		class: 'lifebelowwater',
		title: 'Life Below Water',
		tooltip: 'Conserve and sustainably use the oceans, seas and marine resources for sustainable development',
		bgColor: '#4896CF'
	},
	{
		class: 'lifeonland',
		title: 'Life On Land',
		tooltip: 'Protect, restore and promote sustainable use of terrestrial ecosystems, sustainably manage forests, combat desertification, and halt and reverse land degradation and halt biodiversity loss',
		bgColor: '#72B757'
	},
	{
		class: 'peace',
		title: 'Peace, Justice and Strong Institutions',
		tooltip: 'Promote peaceful and inclusive societies for sustainable development, provide access to justice for all and build effective, accountable and inclusive institutions at all levels',
		bgColor: '#31699B'
	},
	{
		class: 'partnership',
		title: 'Partnership for the Goals',
		tooltip: 'Strengthen the means of implementation and revitalize the global partnership for sustainable development',
		bgColor: '#244868'
	},
];

const renderIcons = (
	sdgIcons.map(icon => {
		return (
			<Icon key={icon.class}>
				<div className={'sdg-icon ' + icon.class}>
					<div className="content">
						<i className={'icon-sdg-' + icon.class} />
						<p className="hover-text">{icon.title}</p>
					</div>
					<div className="sdg-tooltip">{icon.tooltip}</div>
				</div>
			</Icon>
		);
	})
);

export interface ParentProps { }

export const AboutCards: React.SFC<ParentProps> = (props) => {
	return (
		<MattersRight>
			{renderIcons}
		</MattersRight>
	);
};

export default AboutCards;