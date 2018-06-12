import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { PublicSiteStoreState } from '../redux/public_site_reducer';
import { initIxo } from '../redux/ixo/ixo_action_creators';
import styled from 'styled-components';
// import { toast } from 'react-toastify';
import { HeaderLeft } from './HeaderLeft';
import { HeaderRight } from './HeaderRight';
import MediaQuery from 'react-responsive';
import { deviceWidth } from '../lib/commonData';
import { initKeysafe } from '../redux/keysafe/keysafe_action_creators';
import { ActiveProjectInit } from '../redux/activeProject/activeProject_action_creators';

const TopBar = styled.header`
	position: sticky;
	top:0;
	padding:0 15px;

    z-index:9;
    background:black;

    && {
        width:100vw;
    }
	
`;

const StatusMessage = styled.div`
    opacity:0; 
    background: rgba(0, 0, 0,0.7);
    position: absolute;
    color: white;
    top: 60px;
    right:0;
    width:220px;
    padding: 10px;
    line-height: 1.2;
    font-size: 0.8em;
    border-radius: 10px;
    pointer-events:none;
    transition:opacity 0.3s ease;
    z-index: 1;
    
    &:after {
        content: "";
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid rgba(0, 0, 0,0.7);
        position: absolute;
        top: -10px;
        right: 20px;
        pointer-events:none;
        transition:opacity 0.3s ease;
    }
`;

const Ping = styled.div`
	position:relative;
	width: 100%;

    &:hover {
        cursor:pointer;
    }

    &:hover ${StatusMessage},
    &:hover ${StatusMessage}{
      opacity:1;
    }
`;

const Light = styled.span`
	display: block;
	width: 100%;
	height: 4px;
	background: rgb(240, 0, 0);
	border-radius:0 0 2px 2px;
	box-shadow: 0px 0px 5px 0px rgb(255,0,0);	
`;

// const LightLoading = Light.extend`
//     box-shadow: 0px 0px 5px 0px rgba(255,165,0,1);
//     background:rgb(255, 165, 0);
//     animation: flashing 1s infinite;

//     @keyframes flashing {
//         0% {
//           box-shadow: 0px 0px 5px 0px rgba(255,165,0,1);
//         }
//         50% {
//           box-shadow: 0px 0px 5px 1px rgba(255,200,0,1);
//           background:rgb(255, 200, 0);
//         }
//         100% {
//           box-shadow: 0px 0px 5px 0px rgba(255,165,0,1);
//         }
//       }
// `;

const LightReady = Light.extend`
    background: #5ab946;
    box-shadow: 0px 0px 5px 0px rgb(0, 255, 64);
`;
export interface State {
	isServerConnected: boolean;
	initialDate: Date;
	responseTime: number;
	selectedServer: string;
	loginStatus: boolean;
	currDid: string;
	copied: boolean;
}

export interface StateProps {
	ixo?: any;
	keysafe?: any;
	activeProject?: any;
}

export interface DispatchProps {
	onIxoInit: () => void;
	onKeysafeInit: () => void;
	onActiveProjectInit: () => any;
}

export interface Props extends StateProps, DispatchProps {
}

class Header extends React.Component<Props, State> {

	state = {
		isServerConnected: false,
		initialDate: new Date(),
		responseTime: 0,
		selectedServer: 'https://ixo-node.herokuapp.com',
		loginStatus: false,
		currDid: '',
		copied: false
	};

	componentDidMount() {
		
		// const cachedServer = localStorage.getItem('server');
		// if (cachedServer) {
		// 	this.setState({selectedServer: cachedServer});
		// 	this.props.onIxoInit(cachedServer);
		// } else {
		// 	this.props.onIxoInit(this.state.selectedServer);
		// }
		this.props.onIxoInit();
		this.props.onKeysafeInit();
		this.props.onActiveProjectInit();
		console.log('ACTIVE PROJECT: ', this.props.activeProject);
		// setInterval(this.ping, 5000);
	}

	componentDidUpdate(prevProps: Props) {
		if (prevProps.ixo !== this.props.ixo) {
			// this.ping();
		}

		// if (prevProps.pingResult !== this.props.pingResult) {
		// 	if (this.props.pingResult === 'pong') {
		// 		const responseTime = Math.abs(new Date().getTime() - this.state.initialDate.getTime());
		// 		this.setState({
		// 			isServerConnected: true,
		// 			responseTime
		// 		});

		// 	} else {
		// 		this.setState({ isServerConnected: false });
		// 	}
		// }
	}

	renderStatusIndicator = () => {
		return (
			<Ping>
				{this.renderLightIndicator()}
				<div className="d-none d-sm-block">
					{this.renderStatusMessage()}
				</div>
			</Ping>
		);
	}

	renderStatusMessage() {
		if (this.state.isServerConnected) {
			return (
				<StatusMessage>
					<p>Response time: {this.state.responseTime} ms</p>
					<p>{this.state.selectedServer}</p>
				</StatusMessage>);
		} else {
			return (
				<StatusMessage>
					<p>{this.state.selectedServer} <br/>not responding</p>
				</StatusMessage>);
		}
	}

	renderLightIndicator() {
		if (this.state.isServerConnected) {
			return <LightReady />;
		// } else if (this.props.pingError === null) {
		// 	return <LightLoading />;
		} else {
			return <Light />;
		}
	}

	handleServerChange = (event) => {

		if (this.state.selectedServer !== event.target.value) {
			localStorage.setItem('server', event.target.value);
			this.setState({
				selectedServer: event.target.value,
				isServerConnected: false
			});
			this.props.onIxoInit();    
		}
	}

	render() {
		return (
			<TopBar className="container-fluid text-white">
				<div className="row">
					<HeaderLeft />
					<MediaQuery minWidth={`${deviceWidth.tablet}px`}>
						<HeaderRight 
							renderStatusIndicator={this.renderStatusIndicator}
							selectedServer={this.state.selectedServer}
							did={this.state.currDid}
						/>
					</MediaQuery>
				</div>
			</TopBar>
		);
	}
}

function mapStateToProps(state: PublicSiteStoreState): StateProps {
	return {
		ixo: state.ixoStore.ixo,
		keysafe: state.keysafeStore.keysafe,
		activeProject: state.activeProjectStore.activeProject
	};
}

function mapDispatchToProps(dispatch: any): DispatchProps {
	return {
		onIxoInit: () => {
			dispatch(initIxo());
		},
		onKeysafeInit: () => {
			dispatch(initKeysafe());
		},
		onActiveProjectInit: () => {
			dispatch(ActiveProjectInit());
		}
	};
}

export const HeaderConnected = withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(Header) as any);