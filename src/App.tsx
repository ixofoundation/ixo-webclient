require('dotenv').config();
import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { HeaderConnected } from './components/header/HeaderContainer';
import Footer from './components/footer/FooterContainer';
import { PublicSiteStoreState } from './redux/public_site_reducer';
import styled, { ThemeProvider } from 'styled-components';
import { initIxo } from './redux/ixo/ixo_action_creators';
import { initKeysafe } from './redux/keysafe/keysafe_action_creators';
import { UserInfo } from './types/models';
import { initUserInfo } from './redux/login/login_action_creators';
import ScrollToTop from './components/common/ScrollToTop';
import './assets/icons.css';

import 'react-toastify/dist/ReactToastify.min.css';
import { Routes } from './components/Routes';
import { Spinner } from './components/common/Spinner';
import { ToastContainer } from 'react-toastify';
import * as ReactGA from 'react-ga';
import { explorerSocket } from './components/helpers/explorerSocket';

ReactGA.initialize('UA-106630107-5');

ReactGA.pageview(window.location.pathname + window.location.search);

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

// END OF THEME DECLARATION, CSS FOR COMPONENT BELOW
const Container = styled.div`

	display: flex;
	flex-flow: column;
	min-height: 100%;
	font-family: roboto;

	h1, h2, h3, h4, h5, p, a {
	}
	font-weight: 300;
`;

const ContentWrapper = styled.main`
	display: flex;
	flex-direction: column;
	flex: 1;
`;

export namespace App {
	export interface State {
		loginError: string;
		error: any;
		errorInfo: any;
		onLoginInitCalled: boolean;
	}

	export interface StateProps {
		ixo?: any;
		pingError?: string;
		pingResult?: string;
		keysafe?: any;
		userInfo: UserInfo;
		location: any;
		history: any;
		match: any;
	}
	export interface DispatchProps {
		onIxoInit: () => void;
		onKeysafeInit: () => void;
		onLoginInit: (keysafe: any, ixo: any) => void;
	}
	export interface Props extends StateProps, DispatchProps {}
}

explorerSocket.on('did created', function (data: any) {
	console.log('did created');
	console.log(data);
});

explorerSocket.on('did updated', function (data: any) {
	console.log('did updated');
	console.log(data);
});

class App extends React.Component<App.Props, App.State> {

	state = {
		loginError: null,
		isProjectPage: false,
		errorInfo: null, 
		error: null,
		onLoginInitCalled: false
	};

	componentDidUpdate(prevProps: App.Props) {

		if (this.props.ixo !== null && this.props.keysafe !== null && this.props.userInfo === null && this.state.onLoginInitCalled === false) {
			this.props.onLoginInit(this.props.keysafe, this.props.ixo);
			this.setState({onLoginInitCalled: true});
		}
	}

	static getDerivedStateFromProps(nextProps: any) {
		if (nextProps.userInfo && !nextProps.userInfo.ledgered) {
			if (!(nextProps.location.pathname === '/register')) {
				nextProps.history.push('/register');
			}
		}
	}

	componentDidMount() {
		this.props.onIxoInit();
		this.props.onKeysafeInit();
	}

	handlePingExplorer = () => {
		return new Promise((resolve, reject) => {
			const t0 = performance.now();
			if ( this.props.ixo ) {
				this.props.ixo.network.pingIxoExplorer().then(result => {
					if (result === 'API is running') {
						const t1 = performance.now();
						resolve(Math.trunc(t1 - t0));
					} else {
						reject(0);
					}
					})
					.catch(error => {
						reject(0);
					});
			
			} else {
				reject(0);
			}
		});
	}

	render() {

		return (
			<ThemeProvider theme={theme}> 
				<ScrollToTop>
					<Container>
						<HeaderConnected pingIxoExplorer={this.handlePingExplorer} simpleHeader={false} userInfo={this.props.userInfo} refreshProjects={() => console.log('clicked')} />
							<ToastContainer hideProgressBar={true} />
							<ContentWrapper>
								{this.props.ixo !== null ? 
									<Routes /> : 
									<Spinner info={'Loading ixo.world...'}/>
								}
							</ContentWrapper>
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
			dispatch(initIxo(process.env.REACT_APP_BLOCKCHAIN_NODE_URL, process.env.REACT_APP_BLOCK_SYNC_URL));
		},
		onKeysafeInit: () => {
			dispatch(initKeysafe());
		},
		onLoginInit: (keysafe: any, ixo: any) => {
			dispatch(initUserInfo(keysafe, ixo));
		}
	};
}

export const AppConnected = withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(App as any) as any);
