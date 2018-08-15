import * as React from 'react';
import styled from 'styled-components';
// import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';

const xIcon = require('../../assets/images/x-icon.png');

const Inner = styled.div`
	position:relative;
	z-index:2;
	background:black;

	font-family: ${props => props.theme.fontRobotoCondensed};
`;

const UserMenu = styled.div`
	position: fixed;
	top: -260px;
	width: 260px;
	right:0;
	z-index: 1;
	font-family: ${props => props.theme.fontRoboto};

	transition: top 0.5s ease;
`;

const UserBox = styled.div`
	width: 160px;
	height: 74px;
	padding: 0 10px 20px 10px;
	border-left: 1px solid #3C3D3D;
	position:relative;
	z-index: 2;
	display: flex;
	flex-direction: column;
	align-items: center;

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
		font-size: 18px;
		margin: 1px 0 0 10px;	
	}
`;

const BalanceContainer = styled.p`
	img {
		vertical-align: baseline;
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

// const MenuBottom = styled.div`
// 	background-color: #01151F;
// 	padding:20px 34px 30px;

// 	a {
// 		font-family: ${props => props.theme.fontRobotoCondensed};
// 		display: block;
// 		color: white;
// 		font-size: 17px;
// 		padding:10px 0;
// 	}

// 	a:hover {
// 		text-decoration:none;
// 		color: #49bfe0;
// 	}
// `;

const NoPadLeft = styled.div`
	padding-right:0;
	position:relative;
	z-index:2;

	${UserMenu}.visible {
		top:74px;
	}

	h3 {
		font-size:14px;
		margin-bottom:0;
		display: flex;
		justify-content: space-between;
		z-index:2;
		position:relative;
		letter-spacing:0.3px
		font-weight: 600;
		font-family: ${props => props.theme.fontRoboto};
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
`;
const StatusText = styled.p`
	color: white;
	text-transform: uppercase;
	font-size: 11px;
	margin: 5px auto 10px;
	font-weight: normal;
`;

const JoinLink = styled(Link)`
	color: white;
	text-decoration: none;

	:hover {
		text-decoration: none;
		color: white;
	}
`;	

interface HeaderRightProps {
	userInfo: any;
	renderStatusIndicator: () => JSX.Element;
	simple?: boolean;
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
		if (this.props.simple === true) {
			return <NoPadLeft className="col-md-6" />;
		} else {
			return (
				<NoPadLeft className="col-md-6">
					<Inner className="d-flex justify-content-end">
						{(this.props.userInfo === null) ?
							<JoinLink to="/register">
								<UserBox>
									<StatusBox>
										{this.props.renderStatusIndicator()}
										<StatusText>IXO EXPLORER STATUS</StatusText>
									</StatusBox>
									<h3><span>Join the Beta</span></h3>
								</UserBox>
							</JoinLink>
							:
							<UserBox onClick={this.toggleMenu}>
								<StatusBox>
									{this.props.renderStatusIndicator()}
									<StatusText>IXO EXPLORER STATUS</StatusText>
								</StatusBox>
								<h3><span>{this.props.userInfo.name}</span> <i className="icon-down" /></h3>
							</UserBox>
						}
					</Inner>
					<UserMenu className={this.state.showMenu ? 'visible' : ''} onMouseLeave={() => this.toggleMenu()}>
							<MenuTop>
								{/* <h3>{this.props.userInfo !== null && this.props.userInfo.name} <Link to="/"><i className="icon-settings"/></Link></h3> */}
								<h3>{this.props.userInfo !== null && this.props.userInfo.name}</h3>
									<AccDID >
										<p>{this.props.userInfo !== null && this.props.userInfo.didDoc.did}</p> 
										<CopyToClipboard text={this.props.userInfo !== null && this.props.userInfo.didDoc.did}>
											<span>Copy</span>
										</CopyToClipboard>
									</AccDID>
								<BalanceContainer><img src={xIcon} alt="IXO Icon" /> <strong>0</strong> ixo balance</BalanceContainer>
							</MenuTop>
							{/* <MenuBottom>
								<Link to="/my-projects">MY PROJECTS</Link>
								<Link to="/">FAVOURITES</Link>
							</MenuBottom> */}
						</UserMenu>
				</NoPadLeft>
			);
		}
	}
}