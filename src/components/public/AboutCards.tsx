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
		-webkit-transition: all 0.5s ease-out;
		-moz-transition: all 0.5s ease-out;
		-o-transition: all 0.5s ease-out;
		transition: all 0.5s ease-out;
	}
	.sdg-icon:hover {
		.icon-no-poverty::before {
			color: white;
		}
		.icon-zero-hunger::before {
			color: white;
		}
		.icon-good-health::before {
			color: white;
		}
		.icon-quality-education::before {
			color: white;
		}
		.icon-gender-equality::before {
			color: white;
		}
		.icon-clean-water::before {
			color: white;
		}
		&.no-poverty {
			background: #D33A44;
		}
		&.zero-hunger {
			background: #DFA551;
		}
		&.good-health {
			background: #629E51;
		}
		&.quality-education {
			background: #B73336;
		}
		&.gender-equality {
			background: #DD4F3A;
		}
		&.clean-water {
			background: #5CBDE2;
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
		width: 250px;
		background-color: #001A27;
		font-size: 11px;
		color: white;
		text-align: center;
		padding: 10px 10px 0;
		top: -136%;
		left: calc(50% - 125px);
		border-radius: 10px; /* This defines tooltip text position */
		position: relative;
		z-index: 1;
	}
	.sdg-tooltip::after {
		border-color: #001A27 rgba(0, 0, 0, 0) rgba(0, 0, 0, 0);
		border-style: solid;
		border-width: 7px;
		top: 14px;
		content: "";
		display: block;
		height: 0;
		left: calc(50% - 7px);
		position: relative;
		width: 0;
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

export interface ParentProps { }

export const AboutCards: React.SFC<ParentProps> = (props) => {
	return (
		<MattersRight>
			<Icon>
				<div className="sdg-icon no-poverty">
					<div className="content">
						<i className="icon-no-poverty" />
						<p className="hover-text">No <br />Poverty</p>
					</div>
					<div className="sdg-tooltip">End poverty in all its forms everywhere</div>
				</div>
			</Icon>
			<Icon>
				<div className="sdg-icon zero-hunger">
					<div className="content">
						<i className="icon-zero-hunger" />
						<p className="hover-text">Zero Hunger</p>
					</div>
					<div className="sdg-tooltip">End hunger, achieve food security and improved nutrition and promote sustainable agriculture</div>
				</div>
			</Icon>
			<Icon>
				<div className="sdg-icon good-health">
					<div className="content">
						<i className="icon-good-health" />
						<p className="hover-text">Good Health and Well-Being</p>
					</div>
					<div className="sdg-tooltip">Ensure healthy lives and promote well-being for all at all ages</div>
				</div>
			</Icon>
			<Icon>
				<div className="sdg-icon quality-education">
					<div className="content">
						<i className="icon-quality-education" />
						<p className="hover-text">Quality <br />Education</p>
					</div>
					<div className="sdg-tooltip">Ensure inclusive and equitable quality educaton and promote lifelong learning opportunities for all</div>
				</div>
			</Icon>
			<Icon>
				<div className="sdg-icon gender-equality">
					<div className="content">
						<i className="icon-gender-equality" />
						<p className="hover-text">Gender <br />Equality</p>
					</div>
					<div className="sdg-tooltip">Achieve gender equality and power all women and girls</div>
				</div>
			</Icon>
			<Icon>
				<div className="sdg-icon clean-water">
					<div className="content">
						<i className="icon-clean-water" />
						<p className="hover-text">Clean Water and Sanitation</p>
					</div>
					<div className="sdg-tooltip">Ensure availability and sustainable management of water and sanitation for all</div>
				</div>
			</Icon>
			<Icon>
				<div className="sdg-icon sdg-nopoverty">
					<div className="sdg-tooltip">Ensure access to affordable, reliable, sustainable and modern energy for all</div>
				</div>
			</Icon>
			<Icon>
				<div className="sdg-icon sdg-nopoverty">
					<div className="sdg-tooltip">Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all</div>
				</div>
			</Icon>
			<Icon>
				<div className="sdg-icon sdg-nopoverty">
					<div className="sdg-tooltip">Build resilient infrastructure, promote inclusive and sustainable industrialization and fost innovation</div>
				</div>
			</Icon>
			<Icon>
				<div className="sdg-icon sdg-nopoverty">
					<div className="sdg-tooltip">Reduce inequality within and among countries</div>
				</div>
			</Icon>
			<Icon>
				<div className="sdg-icon sdg-nopoverty">
					<div className="sdg-tooltip">Make cities and human settlements inclusive, safe, resilient and sustainable</div>
				</div>
			</Icon>
			<Icon>
				<div className="sdg-icon sdg-nopoverty">
					<div className="sdg-tooltip">Ensure sustainable consumption and production patterns</div>
				</div>
			</Icon>
			<Icon>
				<div className="sdg-icon sdg-nopoverty">
					<div className="sdg-tooltip">Take urgent action to combat climate change and it's impacts*</div>
				</div>
			</Icon>
			<Icon>
				<div className="sdg-icon sdg-nopoverty">
					<div className="sdg-tooltip">Conserve and sustainably use the oceans, seas and marine resources for sustainable development</div>
				</div>
			</Icon>
			<Icon>
				<div className="sdg-icon sdg-nopoverty">
					<div className="sdg-tooltip">Protect, restore and promote sustainable use of terrestrial ecosystems, sustainably manage forests, combat desertification, and halt and reverse land degradation and halt biodiversity loss</div>
				</div>
			</Icon>
			<Icon>
				<div className="sdg-icon sdg-nopoverty">
					<div className="sdg-tooltip">Promote peaceful and inclusive societies for sustainable development, provide access to justice for all and build effective, accountable and inclusive institutions at all levels</div>
				</div>
			</Icon>
			<Icon>
				<div className="sdg-icon sdg-nopoverty">
					<div className="sdg-tooltip">Strengthen the means of implementation and revitalize the global partnership for sustainable development</div>
				</div>
			</Icon>
		</MattersRight>
	);
};

export default AboutCards;