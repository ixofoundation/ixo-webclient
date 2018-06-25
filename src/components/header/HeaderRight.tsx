import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const xIcon = require('../../assets/images/x-icon.png');

const Inner = styled.div`
	position:relative;
	z-index:2;
	background:black;

	font-family: ${props => props.theme.fontRobotoCondensed};
`;

const IXO = styled.div`
	font-size:30px;
	line-height: 46px;
	
	img {
		width:25px;
		height:25px;
		margin-top:-6px;
	}
`;

const UserMenu = styled.div`
	position: fixed;
	top: -260px;
	width: 320px;
	right:0;
	z-index: 1;
	font-family: ${props => props.theme.fontRoboto};

	transition: top 0.5s ease;
`;

const UserBox = styled.div`
	height: 90px;
	width: 160px;
	display: flex;
	padding: 0 10px;
	align-items:center;
	justify-content:center;
	border-left: 1px solid #3C3D3D;
	position:relative;
	z-index: 2;

	transition: all 0.5s ease;

	:hover {
		cursor: pointer;
		background: #002233;
	}

	> p {
		margin-bottom: 0;
		text-align: center;
	}

	i {
		font-size: 11px;
		margin: 4px 15px 0;
	}
`;

const MenuTop = styled.div`
	background-color: #002233;
	padding:13px 26px;
	font-size:18px;

	p {
		font-size: 12px;
		margin:3px 0;
		line-height: 16px;
		font-weight:300;
	}

	img {
		width: 10px;
		height: 10px;
	}
`;

const MenuBottom = styled.div`
	background-color: #01151F;
	padding:20px 34px 30px;

	a {
		font-family: ${props => props.theme.fontRobotoCondensed};
		display: block;
		color: white;
		font-size: 17px;
		padding:10px 0;
	}

	a:hover {
		text-decoration:none;
		color: #49bfe0;
	}
`;

const NoPadLeft = styled.div`
	padding-right:0;
	position:relative;
	z-index:2;

	${UserMenu}.visible {
		top:90px;
	}

	h3 {
		font-size:16px;
		margin-bottom:0;
		display: flex;
		justify-content: space-between;
		z-index:2;
		position:relative;
		letter-spacing:0.3px
		font-weight: 300;
	}
`;

const AccDID = styled.div`
	padding:3px 6px;
	margin:6px 0px 5px -6px;
	background:#01151F;
	border-radius:8px;
	color: #3ea2c0;
	display:flex;
	justify-content:space-between;
	
	p {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		width:80%;
		margin:0;
		font-weight:300;
		font-size:10px;	
	}

	span {
		color: #024e67;
		cursor:pointer;
		display:inline-block;
		font-weight:300;
		font-size:10px;	
	}

	span:hover {
		color: #3ea2c0;
		font-weight: bold;
	}
`;	

const StatusBox = styled.div`
	text-align:center;
	width: 110px;
	margin-right: 20px;
`;
const StatusText = styled.p`
	color: white;
	text-transform: uppercase;
	font-size: 11px;
	margin: 5px auto 0;
	font-weight: normal;
`;

interface HeaderRightProps {
	selectedServer: string;
	did: string;
	renderStatusIndicator: () => JSX.Element;
}

interface State {
	showMenu: boolean;
}
export class HeaderRight extends React.Component<HeaderRightProps, State> {

	state = {
		showMenu: false
	};
	
	toggleMenu = () => {
		this.setState((prevState) => ({showMenu: !prevState.showMenu}));
	}

	render() {
		return (
			<NoPadLeft className="col-md-6">
				<Inner className="d-flex justify-content-end">
					<StatusBox>
						{this.props.renderStatusIndicator()}
						<StatusText>EXPLORER STATUS</StatusText>
						<IXO><img src={xIcon} alt="IXO" /> 0.567</IXO>
					</StatusBox>
						{(this.props.did) &&
							<UserBox onClick={this.toggleMenu} >
								<h3>Michael <i className="icon-arrow-dropdown-large" /></h3>
							</UserBox>
						}
				</Inner>
				<UserMenu className={this.state.showMenu ? 'visible' : ''}>
						<MenuTop>
							<h3>Michael <Link to="/"><i className="icon-settings-large"/></Link></h3>
								<AccDID >
									<p>{this.props.did}</p> 
									<CopyToClipboard text={this.props.did}>
										<span>Copy</span>
									</CopyToClipboard>
								</AccDID>
							<p><img src={xIcon} alt="IXO Icon" /> <strong>45.76</strong> ixo balance</p>
						</MenuTop>
						<MenuBottom>
							<Link to="/my-projects">MY PROJECTS</Link>
							<Link to="/">FAVOURITES</Link>
						</MenuBottom>
					</UserMenu>
			</NoPadLeft>
		);
	}
}