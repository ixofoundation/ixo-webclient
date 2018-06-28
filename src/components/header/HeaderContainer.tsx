import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { PublicSiteStoreState } from '../../redux/public_site_reducer';
import styled from 'styled-components';
// import { toast } from 'react-toastify';
import { HeaderLeft } from './HeaderLeft';
import { HeaderRight } from './HeaderRight';
import MediaQuery from 'react-responsive';
import { deviceWidth } from '../../lib/commonData';

const TopBar = styled.header`
	position: sticky;
	top: 0;
	padding: 0 15px;

	z-index: 9;
	background: black;

	&& {
		width: 100vw;
	}
`;

const StatusMessage = styled.div`
	opacity: 0;
	background: ${props => props.theme.bg.lightBlue};
	position: absolute;
	color: white;
	top: 15px;
	right: 0;
	width: 220px;
	padding: 10px;
	line-height: 1.2;
	font-size: 0.8em;
	border-radius: 10px;
	pointer-events: none;
	transition: opacity 0.3s ease;
	z-index: 9;

	p {
		margin: 0;
	}

	&:after {
		content: '';
		width: 0;
		height: 0;
		border-left: 10px solid transparent;
		border-right: 10px solid transparent;
		border-bottom: 10px solid ${props => props.theme.bg.lightBlue};
		position: absolute;
		top: -10px;
		right: 20px;
		pointer-events: none;
		transition: opacity 0.3s ease;
	}
`;

const Ping = styled.div`
	position: relative;
	width: 100%;

	&:hover {
		cursor: pointer;
	}

	&:hover ${StatusMessage}, &:hover ${StatusMessage} {
		opacity: 1;
	}
`;

const Light = styled.span`
	display: block;
	width: 100%;
	height: 4px;
	background: rgb(240, 0, 0);
	border-radius: 0 0 2px 2px;
	box-shadow: 0px 0px 5px 0px rgb(255, 0, 0);
`;

const LightLoading = Light.extend`
	box-shadow: 0px 0px 5px 0px rgba(255, 165, 0, 1);
	background: rgb(255, 165, 0);
	animation: flashing 1s infinite;

	@keyframes flashing {
		0% {
			box-shadow: 0px 0px 5px 0px rgba(255, 165, 0, 1);
		}
		50% {
			box-shadow: 0px 0px 5px 1px rgba(255, 200, 0, 1);
			background: rgb(255, 200, 0);
		}
		100% {
			box-shadow: 0px 0px 5px 0px rgba(255, 165, 0, 1);
		}
	}
`;

const LightReady = Light.extend`
	background: #5ab946;
	box-shadow: 0px 0px 5px 0px rgb(0, 255, 64);
`;
export interface State {
	isExplorerConnected: boolean;
	responseTime: number;
	copied: boolean;
}

export interface StateProps {
	ixo?: any;
	keysafe?: any;
}

export interface ParentProps {
	userInfo: any;
}
export interface Props extends StateProps, ParentProps {}

class Header extends React.Component<Props, State> {
	state = {
		isExplorerConnected: null,
		responseTime: 0,
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
		setInterval(this.handlePingExplorer, 5000);
	}

	componentDidUpdate(prevProps: Props) {
		if (prevProps.ixo !== this.props.ixo && this.props.ixo !== 0) {
			this.handlePingExplorer();
		}
	}

	handlePingExplorer = () => {
		const t0 = performance.now();

		this.props.ixo.network
			.pingIxoExplorer()
			.then(result => {
				if (result === 'API is running') {
					const t1 = performance.now();
					this.setState({ isExplorerConnected: true, responseTime: Math.trunc(t1 - t0) });
				} else {
					this.setState({ isExplorerConnected: false });
				}
			})
			.catch(error => {
				console.log(error);
			});
	}

	renderStatusIndicator = () => {
		return (
			<Ping>
				{this.renderLightIndicator()}
				<div className="d-none d-sm-block">{this.renderStatusMessage()}</div>
			</Ping>
		);
	}

	renderStatusMessage() {
		if (this.state.isExplorerConnected) {
			return (
				<StatusMessage>
					<p>Response time: {this.state.responseTime} ms</p>
				</StatusMessage>
			);
		} else {
			return (
				<StatusMessage>
					<p>
						IXO Explorer <br />not responding
					</p>
				</StatusMessage>
			);
		}
	}

	renderLightIndicator() {
		if (this.state.isExplorerConnected === null) {
			return <LightLoading />;
		} else if (this.state.isExplorerConnected) {
			return <LightReady />;
		} else {
			return <Light />;
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
							userInfo={this.props.userInfo}
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
		keysafe: state.keysafeStore.keysafe
	};
}

export const HeaderConnected = withRouter<Props & RouteComponentProps<{}>>(connect(mapStateToProps)(Header) as any);
