import * as React from 'react';
import styled from 'styled-components';

const IconsContainer = styled.div`
	background: black;
	margin-top: 10px;
	
	i {
		font-size: 20px;
		display: inline-block;
		padding: 10px;
	}

	i:before {
		color: white;
	}
`;

export interface ParentProps {
	title: string;
}

export const Icons: React.SFC<ParentProps> = (props) => {
	return (
		<IconsContainer className="container">
			<div className="row">
				<div className="icon-col-md-12">
					<i className="icon-approved" />
					<i className="icon-approvetick" />
					<i className="icon-calendar" />
					<i className="icon-claims-active" />
					<i className="icon-claims" />
					<i className="icon-close" />
					<i className="icon-down" />
					<i className="icon-evaluators-active" />
					<i className="icon-evaluators" />
					<i className="icon-expand" />
					<i className="icon-export" />
					<i className="icon-facebook" />
					<i className="icon-favourite-active" />
					<i className="icon-github" />
					<i className="icon-heart" />
					<i className="icon-home-active" />
					<i className="icon-home" />
					<i className="icon-impacts" />
					<i className="icon-indicator-down" />
					<i className="icon-indicator-up" />
					<i className="icon-info" />
					<i className="icon-instagram" />
					<i className="icon-logo-ixo" />
					<i className="icon-ixosmall" />
					<i className="icon-location" />
					<i className="icon-medium" />
					<i className="icon-modal" />
					<i className="icon-pending" />
					<i className="icon-plus" />
					<i className="icon-projects" />
					<i className="icon-rejected" />
					<i className="icon-rejectedcross" />
					<i className="icon-sdg-affordableenergy" />
					<i className="icon-sdg-cleanwater" />
					<i className="icon-sdg-climateaction" />
					<i className="icon-sdg-consumption" />
					<i className="icon-sdg-decentwork" />
					<i className="icon-sdg-generequality" />
					<i className="icon-sdg-goodhealth" />
					<i className="icon-sdg-industry" />
					<i className="icon-sdg-lifebelowwater" />
					<i className="icon-sdg-lifeonland" />
					<i className="icon-sdg-nopoverty" />
					<i className="icon-sdg-partnership" />
					<i className="icon-sdg-peace" />
					<i className="icon-sdg-qualityeducation" />
					<i className="icon-sdg-reduced" />
					<i className="icon-sdg-zerohunger" />
					<i className="icon-search" />
					<i className="icon-serviceproviders-active" />
					<i className="icon-serviceproviders" />
					<i className="icon-settings-active" />
					<i className="icon-settings" />
					<i className="icon-share" />
					<i className="icon-success" />
					<i className="icon-telegram" />
					<i className="icon-trash" />
					<i className="icon-twitter" />
					<i className="icon-upload" />
					<i className="icon-world" />
				</div>
			</div>
		</IconsContainer>
	);
};