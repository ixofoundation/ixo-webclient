import * as React from 'react';
import styled from 'styled-components';
import { Button, ButtonTypes } from 'src/components/common/Buttons';
import { connect } from 'react-redux';
import { deviceWidth } from '../../../lib/commonData';
import { PublicSiteStoreState } from 'src/redux/public_site_reducer';
import Web3Proxy from 'src/redux/web3/util/Web3Proxy';
import * as Toast from '../../helpers/Toast';
import { Web3Acc } from 'src/types/models/web3';
import { FundingGauge } from './FundingGauge';

const FundingWrapper = styled.div`
	position: sticky;
	bottom:0;
	left:0;
	right:0;
	background: #00293e;
	color: white;
	height: 80px;
	z-index: 99;
	display: flex;
	box-shadow: 0px 0px 25px 0px rgba(0,0,0,0.25);
	border: 1px solid #0C3550;
	
	.container {
		display: flex;
		flex-direction: column;
	}

	.row {
		display: flex;
		flex: 1;
	}

	.row > div {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.row > div:first-child {
		border-right: 1px solid #033C50;	
	}

	ol {
		display: flex;
		flex: 1;
		justify-content: flex-end;
		width: 100%;
		align-items: center;
		margin: 0;

		li {
			margin: 0 30px;
			font-family: ${props => props.theme.fontRobotoCondensed};
			font-size: 15px;
			font-weight: 400;
			color: ${props => props.theme.fontBlue};
			opacity: 0.4;

			&.active {
				color: ${props => props.theme.fontLightBlue};
				opacity: 1;
			}
		}
	}

	.row > div:last-child {
		align-items: center;
		flex-direction: row;
		justify-content: flex-start;
	}
`;

const ButtonWrapper = styled.div`

	a {
		display: flex;
		justify-content: center;
		flex-direction: row;
		width: 240px;	
		position: relative;
		font-size: 15px;
		margin-bottom: 0;
		p {
			margin: 0;
		}
		
		i {
			right: 20px;
			transform: rotate(-90deg);
			position: absolute;
			top: 14px;
			font-size: 12px;
			font-weight: bold;
		}

		@media (min-width: ${deviceWidth.desktopLarge}px) {
			width: 290px;	
		}
	}
`;
export interface ParentProps {
	projectDid: string;
	projectURL: string;
	projectIxoRequired: number;
}

export interface State {
	web3error: string;
}

export interface StateProps {
	web3: any;
	error: any;
	ixo?: any;
	keysafe?: any;
}

export interface Props extends ParentProps, StateProps {}
export class Funding extends React.Component<Props, State> {

	state = {
		web3error: null
	};

	private account: Web3Acc = {
		address: null,
		balance: null
	};
	private projectWeb3 = null;
	private projectWalletAddress: string = null;
	
	componentDidMount() {
		if (this.props.web3 === null) {
			this.setState({web3error : this.props.error});
			
		} else {
			this.projectWeb3 = new Web3Proxy(this.props.web3);
			setInterval( this.handleCheckAccount, 1000);
		}
	}

	handleCheckAccount = () => {
		this.props.web3.eth.getAccounts((err: any, acc: any) => {
			if (!err) {
				if (acc[0]!) {
					this.setState({ web3error: null});
					this.account.address = acc[0];
					this.handleCheckIxoBalance();
				} else {
					this.setState({ web3error: 'SIGN IN TO METAMASK'});
				}
			}
		});
	}

	handleCheckEthBalance = () => {

		this.props.web3.eth.getAccounts((err: any, acc: any) => {
			if (!err) {
				this.props.web3.eth.getBalance(acc[0], (error, balance) => {
					if (!error) {
						this.account.balance = balance;
					}
				});
			}
		});
	}

	handleCheckIxoBalance = () => {

		this.projectWeb3.getIxoBalance(this.account.address).then((balance) => {
			this.account.balance = balance;
		});
	}

	handleCreateWallet = () => {
		this.projectWeb3.createEthProjectWallet(this.props.projectDid);
	}

	handleGetProjectWalletAddres = async () => {
		try {
			this.projectWalletAddress = await this.projectWeb3.getProjectWalletAddress(this.props.projectDid);
		} catch {
			console.log('couldnt retrieve wallet address');
		}
	}

	handleFundProjectWallet = async () => {
		await this.handleGetProjectWalletAddres();
		this.projectWeb3.fundEthProjectWallet(this.projectWalletAddress, this.account.address).then((txnHash) => {
			const statusObj = {
				projectDid: this.props.projectDid,
				status: 'PENDING',
				txnId: txnHash
			};
			this.handleUpdateProjectStatus(statusObj);
		});
	}

	handleUpdateProjectStatus = (statusData) => {

		this.props.keysafe.requestSigning(JSON.stringify(statusData), (error: any, signature: any) => {
			if (!error) {
				this.props.ixo.project.updateProjectStatus(statusData, signature, this.props.projectURL).then((res) => {
					if (res.error) {
						Toast.errorToast(res.error.message);
					} else {
						Toast.successToast(`Successfully updated project status to funding`);
					}
				});
			} else {
				Toast.errorToast('PDS is not responding');
			}
		}, 'base64');
	}

	handleCompleteProject = async () => {
		if (!this.projectWalletAddress!) {
			console.log('need to retrieve address');
			await this.handleGetProjectWalletAddres();
			console.log('wallet is: ', this.projectWalletAddress);
			const statusObj = {
				projectDid: this.props.projectDid,
				status: 'STOPPED'
			};
			this.handleUpdateProjectStatus(statusObj);
		} else {
			console.log(this.projectWalletAddress);
		}
	}

	render() {
		return (
			<FundingWrapper className="container-fluid">
					<div className="row">
						<div className="col-md-6">
							{/* {this.projectWeb3 && */}
								<ol>
									<li>SETUP</li>
									<li className="active">FUEL</li>
									<li onClick={this.handleCheckIxoBalance}>Check IXO balance</li>
									<li onClick={this.handleCreateWallet}>Create Project Wallet</li>
									<li onClick={this.handleGetProjectWalletAddres}>Get Project Wallet Address</li>
									<li onClick={this.handleFundProjectWallet}>Fund Project Wallet</li>
									<li onClick={this.handleCompleteProject}>Complete Project</li>
								</ol>
							{/* } */}
						</div>
						<div className="col-md-6">
							<FundingGauge web3error={this.state.web3error} account={this.account} requiredIxo={this.props.projectIxoRequired} />
							<ButtonWrapper>
								<Button type={ButtonTypes.dark} disabled={true}><p>Launch your project</p> <i className="icon-down" /></Button>
							</ButtonWrapper>
						</div>
					</div>
			</FundingWrapper>
		);
	}
}

function mapStateToProps(state: PublicSiteStoreState, ownProps: ParentProps) {
	return {
		web3: state.web3Store.web3,
		keysafe: state.keysafeStore.keysafe,
		ixo: state.ixoStore.ixo,
		projectDid: ownProps.projectDid,
		projectURL: ownProps.projectURL,
		projectIxoRequired: ownProps.projectIxoRequired,
		error: state.web3Store.error
	};
}

export const FundingContainer = connect(
	mapStateToProps
)(Funding as any);
