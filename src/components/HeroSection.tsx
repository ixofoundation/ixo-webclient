import * as React from 'react';
import styled from 'styled-components';
const bg = require('../assets/images/heroBg.jpg');

const MenuContainer = styled.div`
	min-height:200px;
	background: url(${bg});
	margin-top:90px;
`;

export interface Props {
	isProjectPage: boolean;
}

export const HeroSection: React.SFC<Props> = () => {
	return (
		<MenuContainer className="container-fluid">
			<div className="row">
				<p>test</p>
			</div>
		</MenuContainer>
	);
};