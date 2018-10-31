import * as React from 'react';
import styled from 'styled-components';
import { Button, ButtonTypes } from 'src/components/common/Buttons';
import { connect } from 'react-redux';
import { deviceWidth } from '../../../lib/commonData';
import { PublicSiteStoreState } from 'src/redux/public_site_reducer';
import Web3Proxy from 'src/redux/web3/util/Web3Proxy';
import * as Toast from '../../helpers/Toast';

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

const IxoGauge = styled.div`
	font-family: ${props => props.theme.fontRobotoCondensed};
	color: white;
	font-size: 24px;
	line-height: 26px;
	font-weight: 400;
	margin-right: 30px;

	span {
		color: ${props => props.theme.fontLightBlue};
		font-weight: 300;
	}

	i:before {
		position: relative;
		top: 4px;
		color: ${props => props.theme.ixoBlue};
		font-size: 30px;
	}

	p {
		margin: 0;
		font-family: ${props => props.theme.fontRoboto};
		color: white;
		font-size: 15px;
		line-height: 1.5;
		text-align: right;
	}

	@media (min-width: ${deviceWidth.desktopLarge}px) {
		font-size: 32px;
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

	private accountBalance: any = null;
	private projectWeb3 = null;
	private projectWalletAddress: string = null;

	componentDidMount() {
		if (this.props.web3 === null) {
			console.log(this.props);
			this.setState({web3error : this.props.error});
		} else {
			this.projectWeb3 = new Web3Proxy(this.props.web3);
		}
	}

	handleCheckBalance = () => {

		this.props.web3.eth.getAccounts((err: any, acc: any) => {
			if (!err) {
				this.props.web3.eth.getBalance(acc[0], (error, balance) => {
					if (!error) {
						this.accountBalance = balance;
						console.log(this.accountBalance);
					}
				});
			}
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
		this.projectWeb3.fundEthProjectWallet(this.projectWalletAddress).then((txnHash) => {
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
					if (res.error !== undefined) {
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

	handleRenderGauge = () => {
		if (this.state.web3error === null) {
			return (
				<React.Fragment>
					<div>
						<i className="icon-ixo-x" />
						IXO 2698<span>/3000</span>
					</div>
					<p>fuel needed</p>
				</React.Fragment>
			);
		} else {
			return <h3>{this.state.web3error} and hit refresh</h3>;
		}
	}
	render() {
		return (
			<FundingWrapper className="container-fluid">
					<div className="row">
						<div className="col-md-6">
							{this.projectWeb3 &&
								<ol>
									<li>SETUP</li>
									<li className="active">FUEL</li>
									<li onClick={this.handleCheckBalance}>Check balance</li>
									<li onClick={this.handleCreateWallet}>Create Project Wallet</li>
									<li onClick={this.handleGetProjectWalletAddres}>Get Project Wallet Address</li>
									<li onClick={this.handleFundProjectWallet}>Fund Project Wallet</li>
								</ol>
							}
						</div>
						<div className="col-md-6">
							<IxoGauge>
								{this.handleRenderGauge()}
							</IxoGauge>
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
		error: state.web3Store.error
	};
}

export const FundingContainer = connect(
	mapStateToProps
)(Funding as any);
