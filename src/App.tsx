import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { HeaderConnected } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { PublicSiteStoreState } from './redux/public_site_reducer';
import { Routes } from './components/Routes';
import styled, { ThemeProvider } from 'styled-components';
import { StatType } from './types/models';
import './assets/icons.css';

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
	},
	fontBlue: '#49BFE0', // Same as ixoBlue
	fontDarkBlue: '#013C4F', 
	fontLightBlue: '#83D9F2', // big hero section numbers, widgets big numbers
	fontGrey: '#282828', // generally text on white background
	grey: '#e2e22', // borders for project list cards, progress bar background on projects list
	darkGrey: '656969', // "load more projects" button on project list
	widgetBorder: '#0C3549', // border color for graphs/ charts, etc.
	graphGradient: 'linear-gradient(to bottom, #03d0FE 0%,#016480 100%)', // gradient fill for graphs/bars/charts
	red: '#E2223B'
};

// END OF THEME DECLARATION, CSS FOR COMPONENT BELOW
const Container = styled.div`
	font-family: 'Roboto Condensed', sans-serif;
`;

const Loading = styled.div`
	display:flex;
	justify-content:center;
	align-items:center;
	height:calc(100vh - 140px);
`;

const Unsuccessful = Loading;

export namespace App {

	export interface State {
		projectList: any;
		myProjectList: any;
		serviceAgentProjectList: any;
		did: string;
	}

	export interface StateProps {
		ixo?: any;
		pingError?: String;
		pingResult?: String;
	}

	export interface Props extends StateProps {
	}
}

class App extends React.Component<App.Props, App.State> {

	state = {
		projectList: [],
		myProjectList: [],
		serviceAgentProjectList: [],
		did: ''
	};

	metamaskAccountChecker = () => {
		if (this.state.did !== this.props.ixo.credentialProvider.getDid()) {
			this.setState({ did: this.props.ixo.credentialProvider.getDid() });
			this.refreshProjectList();
		}
	}

	refreshProjects = () => {
		this.props.ixo.project.listProjects().then((response: any) => {
			this.setState({ projectList: response.result });
		}).catch((error) => {
			console.error(error);
		});
	}

	refreshMyProjects = () => {
		const myProjectsList: any = this.state.projectList.filter((project) => {
			return project.owner.did === this.props.ixo.credentialProvider.getDid();
		});
		this.setState({ myProjectList: myProjectsList });
	}

	refreshServiceAgentProjectList = () => {
		this.props.ixo.project.listProjectsByDidAndRole(this.props.ixo.credentialProvider.getDid(), 'SA').then((response: any) => {
			this.setState({ serviceAgentProjectList: response.result });
		}).catch((error) => {
			console.error(error);
		});
	}

	refreshProjectList = () => {
		this.refreshProjects();
		this.refreshMyProjects();
		this.refreshServiceAgentProjectList();
	}

	componentDidMount() {
		setInterval(this.metamaskAccountChecker, 1000);
	}

	renderProjectContent() {
		if (this.props.ixo && !this.props.pingError) {
			return (
					<Routes
						projectList={this.state.projectList}
						myProjectList={this.state.myProjectList}
						serviceAgentProjectList={this.state.serviceAgentProjectList}
						refreshProjects={this.refreshProjectList}
					/>
			);
		} else if (this.props.pingError) {
			return <Unsuccessful className="col-md-12"><p>Error connecting to ixo server... Retrying...</p></Unsuccessful>;
		} else {
			return <Loading className="col-md-12"><p>Loading...</p></Loading>;
		}
}

	render() {
		return (
			<ThemeProvider theme={theme}>
				<Container>
					<HeaderConnected />
					<HeroSection 
						isProjectPage={false} 
						statistics={[
							{title: 'SERVICE PROVIDER',
							type: StatType.fraction,
							descriptor: [{class: 'text', value: 'test'}, {class: 'number', value: 2}, {class: 'text', value: 'test2'}],
							amount: [20, 1110]},
							{title: 'SERVICE PROVIDER',
							type: StatType.fraction,
							descriptor: [{class: 'text', value: 'test'}, {class: 'number', value: 2}, {class: 'text', value: 'test2'}],
							amount: [20, 1110]},
							{title: 'SERVICE PROVIDER',
							type: StatType.ixoAmount,
							descriptor: [{class: 'text', value: 'test'}, {class: 'number', value: 2}, {class: 'text', value: 'test2'}],
							amount: [20, 1110]},
							{title: 'SERVICE PROVIDER',
							type: StatType.decimal,
							descriptor: [{class: 'text', value: 'claims available: '}, {class: 'number', value: 2}],
							amount: [20, 1110]}
						]} 
					/>
					{this.renderProjectContent()}
				</Container>
			</ThemeProvider>
		);
	}
}

function mapStateToProps(state: PublicSiteStoreState) {
	return {
		ixo: state.ixoStore.ixo,
		pingError: state.pingStore.pingError,
		pingResult: state.pingStore.pingResult
	};
}

export default withRouter(connect<App.Props, App.State>(
	mapStateToProps
)(App) as any);