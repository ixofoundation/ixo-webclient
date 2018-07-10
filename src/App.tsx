require('dotenv').config();
import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { HeaderConnected } from './components/header/HeaderContainer';
import Footer from './components/footer/FooterContainer';
import { PublicSiteStoreState } from './redux/public_site_reducer';
import { Routes } from './components/Routes';
import { Spinner } from './components/common/Spinner';
import styled, { ThemeProvider } from 'styled-components';
import { initIxo } from './redux/ixo/ixo_action_creators';
import { initKeysafe } from './redux/keysafe/keysafe_action_creators';
import { UserInfo } from './types/models';
import { initUserInfo } from './redux/login/login_action_creators';
import ScrollToTop from './components/common/ScrollToTop';
import { ToastContainer } from 'react-toastify';
import './assets/icons.css';
import * as Toast from './components/helpers/Toast';

import 'react-toastify/dist/ReactToastify.min.css';
// THEME DECLARATION BELOW

const theme = {
	ixoBlue: '#49BFE0', // button borders, small hero numbers, SDG numbers
	ixoOrange: '#F89D28',
	bg: {
		blue: '#002233', // dashboard background
		green: '#5AB946',
		darkBlue: '#01151F', // Tooltips background
		lightBlue: '#017492', // active button background for tabs on hero section
		lightGrey: '#F6F6F6', // light background for projects list
		gradientBlue: 'linear-gradient(to bottom, #012639 0%,#002d42 100%)', // background for widgets (charts, graphs, tabs, etc.)
		gradientDarkBlue: 'linear-gradient(180deg, #038FB8 0%, #036C93 100%)', // claims
		gradientButton: 'linear-gradient(to bottom, #03D0FB 0%, #016480 100%)',
		gradientButtonGreen: 'linear-gradient(180deg, #5AB946 0%, #339F1C 100%)',
		gradientButtonRed: 'linear-gradient(180deg, #C5202D 0%, #AB101C 100%)',
		darkButton: '#0C3550',
		gradientWhite: 'linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 100%)'
	},
	fontBlueButtonNormal: 'white',
	fontBlueButtonHover: '#83D9F2',
	fontDarkBlueButtonNormal: 'white',
	fontDarkBlueButtonHover: '#00D2FF',
	fontBlue: '#49BFE0', // Same as ixoBlue
	fontDarkBlue: '#013C4F',
	fontDarkGrey: '#282828',
	fontLightBlue: '#83D9F2', // big hero section numbers, widgets big numbers
	fontGrey: '#282828', // generally text on white background
	fontRoboto: 'Roboto, sans-serif',
	fontRobotoCondensed: 'Roboto Condensed, sans-serif',
	grey: '#E9E8E8', // borders for project list cards, progress bar background on projects list
	darkGrey: '#656969', // "load more projects" button on project list
	lightGrey: '#B6B6B6',
	widgetBorder: '#0C3550', // border color for graphs/ charts, etc.
	graphGradient: 'linear-gradient(to right, #016480 0%, #03d0FE 100%)', // gradient fill for graphs/bars/charts
	red: '#E2223B'
};

const Inner = styled.div`

`;

// END OF THEME DECLARATION, CSS FOR COMPONENT BELOW
const Container = styled.div`

	h1, h2, h3, h4, h5, p, a {
	}
	font-weight: 300;
	
	${Inner} {
		opacity: 0;
		transition: opacity 2s ease;
	}
	
	${Inner}.loaded {
		opacity: 1;
	}
`;

export namespace App {
	export interface State {
		projectList: any;
		loginError: String;
		error: any;
		errorInfo: any;
		loaded: boolean;
	}

	export interface StateProps {
		ixo?: any;
		pingError?: String;
		pingResult?: String;
		keysafe?: any;
		userInfo: UserInfo;
		location: any;
		history: any;
		match: any;
	}
	export interface DispatchProps {
		onIxoInit: () => void;
		onKeysafeInit: () => void;
		onLoginInit: (keysafe: any) => void;
	}
	export interface Props extends StateProps, DispatchProps {}
}

class App extends React.Component<App.Props, App.State> {

	state = {
		projectList: null,
		loginError: null,
		isProjectPage: false,
		errorInfo: null, 
		error: null,
		loaded: false
	};

	componentDidUpdate(prevProps: any) {
		if (this.props.userInfo !== null && this.props.ixo !== null && this.props.keysafe !== null) {
			if (typeof this.props.userInfo.ledgered === 'undefined') {
				this.props.ixo.user.getDidDoc(this.props.userInfo.didDoc.did).then((response: any) => {
					if (response.error) {
						this.props.userInfo.ledgered = false;
						if (!(this.props.location.pathName === '/register')) {
							this.props.history.push('/register');
						}
					} else if (response.did) {
						this.props.userInfo.ledgered = true;
					}
				});
			}
		}

		if (this.props.ixo !== prevProps.ixo && !(this.props.location.pathName === '/register')) {
			this.props.ixo.project
				.listProjects()
				.then((response: any) => {
					let projectList = response.result;
					projectList.sort((a, b) => {return (a.data.createdOn < b.data.createdOn); });
					this.setState({ projectList: response.result });
				})
				.catch((result: Error) => {
					Toast.errorToast(result.message);
				});
		}
		if (this.props.keysafe !== null && this.props.userInfo === null) {
			this.props.onLoginInit(this.props.keysafe);
		}
	}

	load = () => {
		this.setState({ loaded: true });
	}
	componentDidMount() {
		this.props.onIxoInit();
		this.props.onKeysafeInit();
		setTimeout(this.load , 100);
	}

	componentDidCatch(error: any, info: any) {
		this.setState({ error: error, errorInfo: info });
	}

	/* renderRegisterPage() {
		return <Redirect push={true} to="/register" />;
	} */

	renderProjectContent() {
		if (this.state.projectList === null) {
			return <Spinner info="App: Loading Projects" />;
		} else if (this.props.ixo === null) {
			return <Spinner info="App: Loading IXO Module" />;
		} else {
			return <Routes projectList={this.state.projectList} />;
		}
	}

	render() {
		if (this.state.error !== null) {
			return (
				<div>
					<h3>React Error Component </h3>
					<p>{this.state.error}</p>
					<p>{this.state.errorInfo}</p>
				</div>
			);
		}
		if (this.props.match.path === '/comingsoon') {
			return (
				<ThemeProvider theme={theme}>
					<ScrollToTop>
						<Container>
							<HeaderConnected userInfo={this.props.userInfo} simpleHeader={true}/>
							<ToastContainer hideProgressBar={true} />
							{this.renderProjectContent()}
							<Footer simpleFooter={true}/>
						</Container>
					</ScrollToTop>
				</ThemeProvider>
			);
		}
		return (
			<ThemeProvider theme={theme}>
				<ScrollToTop>
					<Container>
						<HeaderConnected simpleHeader={false} userInfo={this.props.userInfo} />
						<ToastContainer hideProgressBar={true} />
						{this.renderProjectContent()}
						<Footer />
					</Container>
				</ScrollToTop>
			</ThemeProvider>
		);
	}
}

function mapStateToProps(state: PublicSiteStoreState) {
	return {
		ixo: state.ixoStore.ixo,
		keysafe: state.keysafeStore.keysafe,
		userInfo: state.loginStore.userInfo
	};
}

function mapDispatchToProps(dispatch: any): App.DispatchProps {
	return {
		onIxoInit: () => {
			dispatch(initIxo(process.env.REACT_APP_BLOCKCHAIN_IP, process.env.REACT_APP_BLOCK_SYNC_URL));
		},
		onKeysafeInit: () => {
			dispatch(initKeysafe());
		},
		onLoginInit: (keysafe: any) => {
			dispatch(initUserInfo(keysafe));
		}
	};
}

export const AppConnected = withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(App as any) as any);
