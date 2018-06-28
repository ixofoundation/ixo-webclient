import * as React from 'react';
import styled from 'styled-components';
import { UserInfo } from '../../types/models';
import { connect } from 'react-redux';
import { PublicSiteStoreState } from '../../redux/public_site_reducer';
import { warningToast, successToast, errorToast } from '../common/Toast';

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
}

export interface StateProps {
	ixo?: any;
	userInfo: UserInfo;
	keysafe: any;
}

export interface Props extends ParentProps, StateProps {}

class RegisterPage extends React.Component<Props, State> {
	componentDidMount() {
		if (this.props.keysafe) {
			this.props.keysafe.getDidDoc((error, response) => {
				this.setState({ didDoc: response });
			});
		}
	}

	ledgerDid = () => {
		if (this.state.didDoc) {
			this.props.keysafe.requestSigning(JSON.stringify(this.state.didDoc), (error, signature) => {
				if (!error) {
					this.props.ixo.user.registerUserDid(this.state.didDoc, signature).then((response: any) => {
						if (response.status === 200) {
							successToast('Did document was ledgerd successfully');
						} else {
							errorToast('Unable to ledger did at this time');
						}
					});
				} else {
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
				<LocalButton onClick={this.ledgerDid}>
					<i className="icon-favourites" />LEDGER DID
				</LocalButton>
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
