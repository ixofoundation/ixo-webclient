import * as React from 'react';
import styled from 'styled-components';
import { getCountryName } from '../../../utils/formatters';

const Text = styled.div`
	color: ${props => props.theme.fontDarkGrey};
	font-size: 16px;
	line-height: 30px;
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
			color: #4c4c4c;
		}

		i:before {
			color: #4c4c4c;
		}

		&{
			color: #333C4E;
		}
	}
`;

export interface Founder {
	logoLink?: string;
	name?: string;
	shortDescription?: string;
	countryOfOrigin?: string;
	websiteURL?: string;
}

export interface ParentProps {
	founder: Founder;
}

export const ProjectFounder: React.SFC<ParentProps> = ({founder}) => {

	const renderLogo = () => {
		if (founder.logoLink !== '') {
			return <img src={founder.logoLink} alt=""/>;
		} else {
			return <span />;
		}
	};

	return (
		<FounderContainer className="container-fluid">
			<div className="container">
				<Founder className="row">
					<div className="col-md-8">
						{founder.name && <h4>Project Founder</h4>}
						<h3>{founder.name}</h3>
						<Text>{founder.shortDescription}</Text>
						<IconText>
							{founder.countryOfOrigin && <span><i className="icon-location"/>{getCountryName(founder.countryOfOrigin)}</span>}
							{founder.websiteURL && <span><i className="icon-world"/><a href={founder.websiteURL} target="_blank">{founder.websiteURL}</a></span>}
						</IconText>
					</div>
					<div className="col-md-4">
						{renderLogo()}
					</div>
				</Founder>
			</div>
		</FounderContainer>
	);
};