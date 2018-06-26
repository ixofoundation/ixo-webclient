import * as React from 'react';
// import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { FooterLeft } from './FooterLeft';
import { FooterRight } from './FooterRight';

const BottomBar = styled.header`
	position: sticky;
	top:0;
	padding: 19px 54px 19px 54px;

	z-index:9;
	background:black;

	&& {
		width:100vw;
	}
`;

class Footer extends React.Component<{}> {
	render() {
		return (
			<BottomBar className="container-fluid text-white">
				<div className="row">
					<FooterLeft />
					<FooterRight />
				</div>
			</BottomBar>
		);
	}
}

export default Footer;