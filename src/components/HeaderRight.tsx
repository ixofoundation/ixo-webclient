import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const xIcon = require('../assets/images/x-icon.png');

const Inner = styled.div`
	position:relative;
	z-index:2;
	background:black;
`;

const ArrowDown = styled.div`
	border: solid white;
	border-width: 0 3px 3px 0;
	display: inline-block;
	padding: 6px;
	transform: rotate(45deg);
	margin-left:20px;
	margin-bottom:5px;
`;

const IXO = styled.div`
	font-size:35px;
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
`;

const MenuTop = styled.div`
	background-color: #002233;
	padding:13px 26px;
	font-size:18px;

	p {
		font-size: 14px;
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
		font-size:18px;
		margin-bottom:0;
		display: flex;
		justify-content: space-between;
		z-index:2;
		position:relative;
		letter-spacing:0.3px
	}
`;

const AccDID = styled.div`
	font-weight:300;
	font-size:13px;
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
	}

	span {
		color: #024e67;
		cursor:pointer;
		display:inline-block;
	}

	span:hover {
		color: #3ea2c0;
		font-weight: bold;
	}
`;	

interface HeaderRightProps {
	selectedServer: string;
	did: string;
	renderStatusIndicator: () => JSX.Element;
	handleServerChange: (event: any) => void;
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
					<div>
						{this.props.renderStatusIndicator()}
						<select value={this.props.selectedServer} onChange={this.props.handleServerChange}>
							<option value="https://ixo-node.herokuapp.com">Production
								Server
								</option>
							<option value="http://localhost:5000">Development Server</option>
						</select>
						<IXO><img src={xIcon} alt="IXO" /> 0.567</IXO>
					</div>
						{(this.props.did) &&
							<UserBox onClick={this.toggleMenu} >
								<h3>Michael <ArrowDown /></h3>
							</UserBox>
						}
				</Inner>
				<UserMenu className={this.state.showMenu ? 'visible' : ''}>
						<MenuTop>
							<h3>Michael <Link to="/">COG</Link></h3>
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