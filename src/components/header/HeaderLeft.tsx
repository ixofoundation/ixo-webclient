import * as React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Fragment } from 'react';
import { deviceWidth } from '../../lib/commonData';
import MediaQuery from 'react-responsive';
import { getIxoWorldRoute } from '../../utils/formatters';
//import { ProjectsHero } from '../projects/ProjectsHero';


const ixoLogo = require('../../assets/images/ixo-logo.svg');

const HeaderLink = styled(NavLink)`
	color: white;
	font-family: ${props => props.theme.fontRobotoCondensed};
	font-weight: 400;
	letter-spacing: 1px;
	text-transform: uppercase;
	border:1px solid #49bfe0;
	border-radius:3px;
	padding:5px 10px 5px;
	margin:0 10px 10px;
	font-size: 16px;

	:first-child {
		border:1px solid #49bfe0;
		font-weight: 400;
	}

	&:first-child.active {
		color: ${props => props.theme.fontBlueButtonHover};
		font-weight: 400;
	}

	transition:border 0.3s ease;

	:hover {
		text-decoration:none;
		&&{color: ${props => props.theme.fontBlue};}}
	}

	@media (min-width: ${deviceWidth.desktop}px) {
		margin:0 10px;
		font-size: 13px;	
	}
`;

const MenuHeaderContainer = styled.div`
	display: flex;
	justify-content: flex-start;
	padding-bottom: 5px;
	:hover {
		background: #012233;
	}
`;

const MenuHeaderLink = styled(HeaderLink)`
	border: 0px solid #000000;
`;

const HeaderAnchor = styled.a`
	color: white;
	font-family: ${props => props.theme.fontRobotoCondensed};
	font-size: 13px;
	font-weight: 400;
	letter-spacing: 1px;
	text-transform: uppercase;
	border-radius:3px;
	padding:5px 10px 5px;
	margin: 0 10px;

	transition:border 0.3s ease;

	:hover {
 		text-decoration:none;
 		&&{color: ${props => props.theme.fontBlue};}}
	}
`;

const MenuHeaderAnchor = styled(HeaderAnchor)`
	border: 0px solid #000000;
	padding: 5px 0px 5px;
	display: block;
	:hover {
		background: #012233;
	}

	font-size: 16px;	
	margin: 3px 10px;
`;

const Main = styled.div`
	padding:15px 20px;
	justify-content: flex-end;
	
	a:first-child {
		margin-right: auto;
	}

	@media (min-width:${deviceWidth.tablet}px){
		justify-content: flex-start;

		a:first-child {
			margin-right: inherit;
		}
	}

	a {
		text-decoration: none;
	}
`;

const IXOLogo = styled.img`
	margin-top: -6px;

	@media (min-width: 430px) {
		margin-right:60px;
	}
`;

const NavItems = styled.div`
	display: flex;
	justify-content: flex-end;
	flex: 1;
	margin-right: 10px;

	@media( min-width: ${deviceWidth.desktop}px) {
		display: block;
		margin-right: 0px;
	}
`;

const Menu = styled.div`
	${HeaderLink} {
		display: block;
	}
	@media( min-width: ${deviceWidth.desktop}px) {
		max-width: none;
		position: relative;
		top: auto;
		opacity: 1;
		right: auto
		background: none;
		pointer-events: auto;
		${HeaderLink} {
			display: inline;
		}
	}
`;

const MobileMenu = Menu.extend`
	&.openMenu {
		top: 64px;
		opacity: 1;
		pointer-events: auto;
	}
	transition: all 0.8s ease;
	position: absolute;
	top: -100%;
	opacity: 0;
	right: 0;
	background: #002C41;
	width: 100%;
	padding: 30px 2px 20px 30px;
	pointer-events: none;
	z-index: 1;
	border-radius: 0 0 5px 5px;
`;

const Burger = styled.div`
	position: relative;

	@media( min-width: ${deviceWidth.desktop}px) {
		display: none;
	}
	.bar1, .bar2, .bar3 {
		width: 35px;
		height: 2px;
		background-color: #FFF;
		margin: 6px 0;
		transition: 0.4s;
	}
	.change .bar1 {
		transform: rotate(-45deg) translate(-6px, 6px);
		transform-origin: center;
	}
	.change .bar2 {opacity: 0;}
	.change .bar3 {
		transform: rotate(45deg) translate(-6px, -6px);
		transform-origin: center;
	}
`;



export interface ParentProps {
	refreshProjects: Function;
	simple: boolean;
}

export class HeaderLeft extends React.Component<ParentProps> {

	state = {
		menuOpen: false
	};

	handleBurgerClick = () => {
		this.setState({ menuOpen : !this.state.menuOpen});
	}

	getMenuItems = (inHeader: boolean) => {
		/* <HeaderBorderLink exact={true} to={{ pathname: `/projects/did:ixo:fGcCu1UjtSB9XXVAcHtou/overview`, state: {featured: true} }}>Apply</HeaderBorderLink> */
		/* {process.env.REACT_APP_FEATURED_PROJECT && <HeaderBorderLink exact={true} to={`/projects/${process.env.REACT_APP_FEATURED_PROJECT}/overview`}>Apply</HeaderBorderLink>} */
		if (inHeader) {
			return (
				<Fragment>
					<HeaderLink exact={true} onClick={() => this.props.refreshProjects} to="/">Explore</HeaderLink>
					<HeaderAnchor href={getIxoWorldRoute('/membership')}>Membership</HeaderAnchor>
					<HeaderAnchor href={getIxoWorldRoute('/subscribe')}>Subscribe</HeaderAnchor>
					<HeaderAnchor href={getIxoWorldRoute('/ecosystem')}>Ecosystem</HeaderAnchor>
				</Fragment>
			);
		} else {
			return (
				<Fragment>
					<MenuHeaderContainer>
						<MenuHeaderLink exact={true} onClick={() => this.props.refreshProjects} to="/">Explore</MenuHeaderLink>
					</MenuHeaderContainer>
					<MenuHeaderContainer>
						<MenuHeaderAnchor href={getIxoWorldRoute('/membership')}>Membership</MenuHeaderAnchor>
					</MenuHeaderContainer>
					<MenuHeaderContainer>
						<MenuHeaderAnchor href={getIxoWorldRoute('/ecosystem')}>Ecosystem</MenuHeaderAnchor>
					</MenuHeaderContainer>
				</Fragment>
			);
		}
	}

	render() {
		return (
			<Fragment>
				<Main className="col-md-12 col-lg-8 d-flex align-items-center">
					<div>
					<a href={getIxoWorldRoute('')}><IXOLogo alt="IXO Logo" src={ixoLogo}/></a>
					</div>
					<NavItems>
						<Burger onClick={this.handleBurgerClick} >
							<div className={this.state.menuOpen === true ? 'change' : ''}>
								<div className="bar1"/>
								<div className="bar2"/>
								<div className="bar3"/>
							</div>
						</Burger>
						<MediaQuery minWidth={`${deviceWidth.desktop}px`}>
							<Menu>
								{this.getMenuItems(true)}
							</Menu>
						</MediaQuery>
					</NavItems>

				
				</Main> 
				<MediaQuery maxWidth={`991px`}>
					<MobileMenu className={this.state.menuOpen === true ? 'openMenu' : ''}>
								{this.getMenuItems(false)}
					</MobileMenu>
				</MediaQuery>
				
			</Fragment>
		);
	}
}