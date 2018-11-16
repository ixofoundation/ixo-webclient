import * as React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { PublicSiteStoreState } from 'src/redux/public_site_reducer';
import Web3Proxy from 'src/redux/web3/util/Web3Proxy';
import * as Toast from '../../helpers/Toast';
import { Web3Acc } from 'src/types/models/web3';
import { FundingGauge } from './FundingGauge';
import { FundingButton } from './FundingButton';
import { Fragment } from 'react';
import { ModalWrapper } from 'src/components/common/ModalWrapper';
import { successToast, errorToast } from '../../helpers/Toast';

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
			// font-size: 15px;
			font-size: 12px;
			font-weight: 400;
			// color: props => props.theme.fontBlue;
			color: ${props => props.theme.fontLightBlue};
			// opacity: 0.4;

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

const CubeFront = styled.div`
	
	width: 320px;
	height: 200px;
	backface-visibility: hidden;
	transform: rotateX(0deg) translate3d(0, 0, 100px);
	box-shadow: 0px 0px 20px 0px ${props => props.theme.ixoBlue};
	background: ${props => props.theme.bg.lightBlue};

	transition: all 0.5s ease;
`;

const CubeTop = styled.div`
	background: ${props => props.theme.bg.blue};
	width: 320px;
	height: 200px;
	transform: rotateX(-90deg) translate3d(0, 0, -100px);
	backface-visibility: hidden;
	box-shadow: 0px 0px 20px 0px ${props => props.theme.ixoBlue};

	transition: all 0.5s ease;
`;

const LoadingCube = styled.div`
	width: 320px;
	height: 200px;
	border: 1px solid #ccc;
	background: rgba(255,255,255,0.8);
	box-shadow: inset 0 0 20px rgba(0,0,0,0.2);
	text-align: center;
	color: black;

	// animation: spincube 4s ease-in-out infinite;
	transform-style: preserve-3d;
	transform-origin: center center;
	transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
	backface-visibility: hidden;
	transition: transform 0.5s ease;
	:hover {
		transform: rotateX(90deg) rotateY(0deg) rotateZ(0deg);

		${CubeFront} {
			background: ${props => props.theme.bg.blue};
		}

		${CubeTop} {
			background: ${props => props.theme.bg.lightBlue};
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
	projectWalletAddress: string;
	account: Web3Acc;
	isModalOpen: boolean;
	creatingProjectWallet: boolean;
}

export interface StateProps {
	web3: any;
	error: any;
	ixo?: any;
	keysafe?: any;
	userInfo: any;
}

export interface Props extends ParentProps, StateProps {}
export class Funding extends React.Component<Props, State> {

	state = {
		isModalOpen: false,
		web3error: null,
		projectWalletAddress: null,
		account: {
			address: null,
			balance: null
		},
		creatingProjectWallet: false
	};

	private projectWeb3 = null;
	private checkInterval = null;

	componentDidMount() {
		if (this.props.web3 === null) {
			this.setState({web3error : this.props.error});
			
		} else {
			this.projectWeb3 = new Web3Proxy(this.props.web3);
			this.checkInterval = setInterval( this.handleCheckAccount, 3000);
		}
	}

	componentWillUnmount() {
		clearInterval(this.checkInterval);
	}

	handleCheckAccount = () => {
		this.props.web3.eth.getAccounts((err: any, acc: any) => {
			if (!err) {
				if (acc[0]!) {

					let tempAcc = Object.assign({}, this.state.account);
					tempAcc.address = acc[0];
					this.setState({ 
						web3error: null,
						account: tempAcc
					});
					this.handleCheckIxoBalance();
					this.handleGetProjectWalletAddres();
				} else {
					this.setState({ web3error: 'SIGN IN TO METAMASK'});
				}
			}
		});

		if ((this.state.projectWalletAddress !== null && this.state.projectWalletAddress !== '0x0000000000000000000000000000000000000000') && this.state.creatingProjectWallet === true) {
			this.setState({ creatingProjectWallet: false});
		}
	}

	handleCheckEthBalance = () => {

		this.props.web3.eth.getAccounts((err: any, acc: any) => {
			if (!err) {
				this.props.web3.eth.getBalance(acc[0], (error, balance) => {
					if (!error) {
						let tempAcc = Object.assign({}, this.state.account);
						tempAcc.balance = balance;
						this.setState({ 
							web3error: null,
							account: tempAcc
						});
					}
				});
			}
		});
	}

	handleCheckIxoBalance = () => {

		this.projectWeb3.getIxoBalance(this.state.account.address).then((balance) => {
			let tempAcc = Object.assign({}, this.state.account);
			tempAcc.balance = balance;
			this.setState({ 
				web3error: null,
				account: tempAcc
			});
		});
	}

	handleCreateWallet = () => {
		this.projectWeb3.createEthProjectWallet(this.props.projectDid).then((res, error) => {
			if (res === 'creating') {
				this.setState({ creatingProjectWallet: true});
			}
		});
	}

	handleGetProjectWalletAddres = async () => {
		try {
			this.setState({projectWalletAddress : await this.projectWeb3.getProjectWalletAddress(this.props.projectDid)});
		} catch {
			console.log('couldnt retrieve wallet address');
		}
	}

	handleFundProjectWallet = async () => {
		await this.handleGetProjectWalletAddres();

		const ixoToSend = this.props.projectIxoRequired * 100000000;
		// NEED TO CHECK IF this.props.projectIxoRequired is the amount it requires
		this.projectWeb3.fundEthProjectWallet(this.state.projectWalletAddress, this.state.account.address, ixoToSend).then((txnHash) => {
			console.log('ts hask:', txnHash);
			const statusObj = {
				projectDid: this.props.projectDid,
				status: 'PENDING',
				txnID: txnHash
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

	handleStartProject = async () => {
		if (this.state.projectWalletAddress! && this.state.projectWalletAddress !== '0x0000000000000000000000000000000000000000') {
			console.log('need to retrieve address');
			await this.handleGetProjectWalletAddres();
			console.log('wallet is: ', this.state.projectWalletAddress);
			const statusObj = {
				projectDid: this.props.projectDid,
				status: 'STARTED'
			};
			this.handleUpdateProjectStatus(statusObj);
		} else {
			console.log(this.state.projectWalletAddress);
		}
	}

	handleCompleteProject = async () => {
		if (this.state.projectWalletAddress! && this.state.projectWalletAddress !== '0x0000000000000000000000000000000000000000') {
			console.log('need to retrieve address');
			await this.handleGetProjectWalletAddres();
			console.log('wallet is: ', this.state.projectWalletAddress);
			const statusObj = {
				projectDid: this.props.projectDid,
				status: 'STOPPED'
			};
			this.handleUpdateProjectStatus(statusObj);
		} else {
			console.log(this.state.projectWalletAddress);
		}
	}

	handleWithdrawFunds = () => {
		if (this.props.userInfo!) {

			const payload = {
				data: {
					projectDid: this.props.projectDid,
					ethWallet: this.state.account.address,
					isRefund: true
				},
				senderDid: this.props.userInfo.didDoc.did
			};
			// need to add amount: ethAmt property for withdrawel

			this.props.keysafe.requestSigning(JSON.stringify(payload), (error, signature) => {
				if (!error) {
					this.props.ixo.project.payOutToEthWallet(payload, signature).then((response: any) => {
						if (response.code === 0) {
							successToast('Withdraw requested successfully');
						} else {
							errorToast('Unable to request a withdrawel at this time');
						}
					});
				} 
			}, 'base64');
		} else {
			errorToast('we not find your did');
		}
	}

	renderModalHeader = () => {
		return ({
			title: 'title',
			subtitle: 'test',
			icon: 'icon-ixo-x'
		});
	}

	renderModal = () => {
		return (
			<LoadingCube>
				<CubeFront>
					<p>Test text</p>
				</CubeFront>
				<CubeTop>
					<p>Test text</p>
				</CubeTop>
			</LoadingCube>
		);
	}

	toggleModal = (data: boolean) => {
		this.setState({isModalOpen: data});
	}

	render() {
		return (
			<Fragment>
				<ModalWrapper
					isModalOpen={this.state.isModalOpen}
					handleToggleModal={this.toggleModal}
					header={this.renderModalHeader()}
				>
					{this.renderModal()}
				</ModalWrapper>
				<FundingWrapper className="container-fluid">
						<div className="row">
							<div className="col-md-6">
								<ol>
									<li onClick={() => this.toggleModal(true)}>SETUP</li>
									<li className="active">FUEL</li>
									<li onClick={this.handleCheckIxoBalance}>Check IXO balance</li>
									<li onClick={this.handleCreateWallet}>Create Project Wallet</li>
									<li onClick={this.handleGetProjectWalletAddres}>Get Project Wallet Address</li>
									<li onClick={this.handleFundProjectWallet}>Fund Project Wallet</li>
									<li onClick={this.handleStartProject}>Start Project</li>
									<li onClick={this.handleCompleteProject}>Complete Project</li>
									<li onClick={this.handleWithdrawFunds}>Refund MEH</li>
								</ol>
							</div>
							<div className="col-md-6">
								<FundingGauge web3error={this.state.web3error} account={this.state.account} requiredIxo={this.props.projectIxoRequired} />
								<FundingButton 
									projectWalletAddress={this.state.projectWalletAddress}
									account={this.state.account}
									createProjectWallet={this.handleCreateWallet}
									requiredIxo={this.props.projectIxoRequired}
									web3error={this.state.web3error}
									creatingWallet={this.state.creatingProjectWallet}
								/>
							</div>
						</div>
				</FundingWrapper>
			</Fragment>
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
		error: state.web3Store.error,
		userInfo: state.loginStore.userInfo
	};
}

export const FundingContainer = connect(
	mapStateToProps
)(Funding as any);
