import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { HeaderConnected } from './components/header/HeaderContainer';
import { PublicSiteStoreState } from './redux/public_site_reducer';
import { Routes } from './components/Routes';
import { Spinner } from './components/common/Spinner';
import styled, { ThemeProvider } from 'styled-components';
import './assets/icons.css';
import { initIxo } from './redux/ixo/ixo_action_creators';
import { initKeysafe } from './redux/keysafe/keysafe_action_creators';

// THEME DECLARATION BELOW

const theme = {
	ixoBlue: '#49BFE0', // button borders, small hero numbers, SDG numbers
	ixoOrange: '#F89D28',
	bg: {
		blue: '#002233', // dashboard background
		darkBlue: '#01151F', // Tooltips background
		lightBlue: '#017492', // active button background for tabs on hero section
		lightGrey: '#F6F6F6', // light background for projects list
		gradientBlue: 'linear-gradient(to bottom, #012639 0%,#002d42 100%)', // background for widgets (charts, graphs, tabs, etc.)
		gradientButton: 'linear-gradient(180deg, #49BFE0 0%, #016480 100%)'
	},
	fontBlue: '#49BFE0', // Same as ixoBlue
	fontDarkBlue: '#013C4F', 
	fontDarkGrey: '#282828',
	fontLightBlue: '#83D9F2', // big hero section numbers, widgets big numbers
	fontGrey: '#282828', // generally text on white background
	fontRoboto: 'Roboto, sans-serif',
	fontRobotoCondensed: 'Roboto Condensed, sans-serif',
	grey: '#E9E8E8', // borders for project list cards, progress bar background on projects list
	darkGrey: '#656969', // "load more projects" button on project list
	widgetBorder: '#0C3549', // border color for graphs/ charts, etc.
	graphGradient: 'linear-gradient(to right, #016480 0%, #03d0FE 100%)', // gradient fill for graphs/bars/charts
	red: '#E2223B'
};

// END OF THEME DECLARATION, CSS FOR COMPONENT BELOW
const Container = styled.div`
	font-family: ${theme.fontRoboto};
	font-weight: 300;
`;

export namespace App {

	export interface State {
		projectList: any;
		userDid: string;
	}

	export interface StateProps {
		ixo?: any;
		pingError?: String;
		pingResult?: String;
		keysafe?: any;
	}
	export interface DispatchProps {
		onIxoInit: () => void;
		onKeysafeInit: () => void;
	}
	export interface Props extends StateProps, DispatchProps {
	}
}

class App extends React.Component<App.Props, App.State> {

	state = {
		projectList: [],
		userDid: null,
		isProjectPage: false
	};

	handleLoadProjects = () => {
		this.props.ixo.project.listProjects().then((response: any) => {
			// this.setState({ projectList: response.result });
		}).catch((error) => {
			console.error(error);
		});
	}

	refreshServiceAgentProjectList = () => {
		this.props.ixo.project.listProjectsByDidAndRole(this.state.userDid, 'SA').then((response: any) => {
			this.setState({ projectList: response.result });
		}).catch((error) => {
			console.error(error);
		});
	}

	refreshProjectList = () => {
		this.handleLoadProjects();
	}

	componentDidUpdate(prevProps: any) {
		if (this.props.ixo !== prevProps.ixo) {
			this.props.ixo.project.listProjects().then((response: any) => {
				this.setState({ projectList: response.result });
			}).catch((result: Error) => {
				console.log(result);
			});
		}

	}

	componentDidMount() {
		this.props.onIxoInit();
		this.props.onKeysafeInit();
	}

	renderProjectContent() {
		if (this.state.projectList.length === 0) {
			return <Spinner info="App: Loading Projects" />;
		} else if (this.props.ixo === null) {
			return <Spinner info="App: Loading IXO Module" />;
		} else {
			return (
				<Routes
					projectList={this.state.projectList}
				/>
			);
		}
}

	render() {
		return (
			<ThemeProvider theme={theme}>
				<Container>
					<HeaderConnected />
					{this.renderProjectContent()}
				</Container>
			</ThemeProvider>
		);
	}
}

function mapStateToProps(state: PublicSiteStoreState) {
	return {
		ixo: state.ixoStore.ixo,
		keysafe: state.keysafeStore.keysafe
	};
}

function mapDispatchToProps(dispatch: any): App.DispatchProps {
	return {
		onIxoInit: () => {
			dispatch(initIxo());
		},
		onKeysafeInit: () => {
			dispatch(initKeysafe());
		}
	};
}

export const AppConnected = withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(App as any) as any);