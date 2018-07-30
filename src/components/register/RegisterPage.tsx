import * as React from 'react';
import styled from 'styled-components';
import { UserInfo } from '../../types/models';
import { connect } from 'react-redux';
import { PublicSiteStoreState } from '../../redux/public_site_reducer';
import { warningToast, errorToast, successToast } from '../helpers/Toast';
import { ModalWrapper } from '../common/ModalWrapper';
import { RegisterStatus } from './RegisterStatus';
import { AgentRoles } from '../../types/models';

const ModalContainer = styled.div`

`;

const LocalButton = styled.a`
	border: 1px solid #b8b8b8;
	&&& {
		color: ${props => props.theme.fontGrey};
	}
	font-size: 16px;
	text-transform: uppercase;
	padding: 10px 20px;
	background: none;
	margin-top: 10px;
	margin-bottom: 10px;
	width: 100%;
	font-family: ${props => props.theme.fontRobotoCondensed};
	font-weight: 500;
	display: inline-block;
	text-align: center;

	transition: all 0.3s ease;
	cursor: pointer;

	:hover {
		color: white;
		background: #b8b8b8;
	}

	:hover i:before {
		color: white;
	}

	i {
		font-size: 21px;
		position: relative;
		top: 3px;
		margin-right: 10px;
	}

	i:before {
		transition: color 0.3s ease;
	}
`;

export interface ParentProps {
	projectList?: any;
}

export interface State {
	didDoc: any;
	isModalOpen: boolean;
	hasKeySafe: boolean;
	hasDid: boolean;
	hasKYC: boolean;
	isDidLedgered: boolean;
}

export interface StateProps {
	ixo?: any;
	userInfo: UserInfo;
	keysafe: any;
}

export interface Props extends ParentProps, StateProps {}

class RegisterPage extends React.Component<Props, State> {

	state = {
		didDoc: null,
		isModalOpen: false,
		hasKeySafe: false,
		hasDid: false,
		hasKYC: false,
		isDidLedgered: false,
		};

	busyLedgering = false;

	toggleModal() {
		this.setState({isModalOpen: !this.state.isModalOpen});
	}

	renderModal() {
		return (
			<ModalContainer> 
				test
			</ModalContainer>
		);
	}

	checkState() {
		// If the user has a keysafe and but the hasKeySafe not set then set state
		if (this.props.keysafe && !this.state.hasKeySafe) {
			this.props.keysafe.getDidDoc((error, response) => {
				if (error) {
					errorToast('Please log into IXO Keysafe');
				} else {	
					let newDidDoc = {
							did: response.didDoc.did,
							pubKey: response.didDoc.pubKey,
							credentials: []
					};
					this.setState({hasKeySafe: true, hasDid: true, didDoc: newDidDoc });
				}
			});
		}
		// So has a client side didDoc, so lets check if it is ledgered
		if (this.props.ixo && this.state.didDoc && !this.state.hasKYC) {
			let ledgerDid = () => this.ledgerDid();
			this.props.ixo.user.getDidDoc(this.state.didDoc.did).then((didResponse: any) => {
				if (didResponse) {
					if (didResponse.credentials.length === 0) {
						// Has no KYC Credential (Should look at the detail here, but right now we only have one type of credential)
						this.setState({isDidLedgered: true, didDoc: didResponse, hasKYC: false});
					} else {
						this.setState({isDidLedgered: true, didDoc: didResponse, hasKYC: true});
					}
				}
			})
			.catch((err) => {
					// Did not ledgered
					ledgerDid();
			});
		}
		if (!this.state.hasKYC) {
			setTimeout(() => this.checkState(), 2000);
		}
	}

	componentDidMount() {
		setTimeout(() => this.checkState(), 2000);
	}

	ledgerDid = () => {
		if (this.state.didDoc && !this.busyLedgering) {
			let payload = {didDoc: this.state.didDoc};
			this.busyLedgering = true;
			this.props.keysafe.requestSigning(JSON.stringify(payload), (error, signature) => {
				if (!error) {
					this.props.ixo.user.registerUserDid(payload, signature).then((response: any) => {
						if (response.status === 200) {
							successToast('Did document was ledgered successfully');
						} else {
							errorToast('Unable to ledger did at this time');
						}
						this.busyLedgering = false;
					});
				} else {
					this.busyLedgering = false;
					console.log(error);
				}
			});
		} else {
			warningToast('Please log into the IXO Keysafe');
		}
	}

	render() {
		return (
			<div className="container-fluid">
			<ModalWrapper
				isModalOpen={this.state.isModalOpen}
				handleToggleModal={() => this.toggleModal()}
			>
				{this.renderModal()}
			</ModalWrapper>

				<h2>Your did has not been found on the IXO Blockchain</h2>
				<p>Please click below to add it. This will allow you to interact with projects on our platform</p>
				<LocalButton onClick={this.ledgerDid}>
					<i className="icon-favourites" />LEDGER DID
				</LocalButton>
				<br />
				<div>Project Founder</div>
				<br />
				<RegisterStatus role={AgentRoles.owners} hasKeySafe={this.state.hasKeySafe} hasKYC={this.state.hasKYC}/>
				<br />
				<br />
				<div>Service Provider</div>
				<br />
				<RegisterStatus role={AgentRoles.serviceProviders} hasKeySafe={this.state.hasKeySafe} hasKYC={this.state.hasKYC}/>
				<br />
				<br />
				<div>Evaluators</div>
				<br />
				<RegisterStatus role={AgentRoles.evaluators} hasKeySafe={this.state.hasKeySafe} hasKYC={this.state.hasKYC}/>
			</div>
		);
	}
}

function mapStateToProps(state: PublicSiteStoreState) {
	return {
		ixo: state.ixoStore.ixo,
		userInfo: state.loginStore.userInfo,
		keysafe: state.keysafeStore.keysafe
	};
}

export const RegisterConnected = connect<{}, {}, ParentProps>(mapStateToProps)(RegisterPage as any);
