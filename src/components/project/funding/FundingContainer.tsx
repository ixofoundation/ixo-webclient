import * as React from 'react';
import styled from 'styled-components';
import { Button, ButtonTypes } from 'src/components/common/Buttons';
import { connect } from 'react-redux';
import { deviceWidth } from '../../../lib/commonData';
import { PublicSiteStoreState } from 'src/redux/public_site_reducer';
import Web3Proxy from 'src/redux/web3/util/Web3Proxy';
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
}

export interface State {

}

export interface StateProps {
	web3: any;
}

export interface Props extends ParentProps, StateProps {}
export class Funding extends React.Component<Props, State> {

	state = {

	};

	private accountBalance: any = null;

	componentDidMount() {
		const projectWeb3 = new Web3Proxy(this.props.web3);
		console.log(projectWeb3);
		// projectWeb3.createEthProjectWallet(this.props.projectDid);
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

	render() {
		return (
			<FundingWrapper className="container-fluid">
					<div className="row">
						<div className="col-md-6">
							<ol>
								<li>SETUP</li>
								<li className="active">FUEL</li>
								<li onClick={this.handleCheckBalance}>Check balance</li>
							</ol>
						</div>
						<div className="col-md-6">
							<IxoGauge>
								<div>
									<i className="icon-ixo-x" />
									IXO 2698<span>/3000</span>
								</div>
								<p>fuel needed</p>
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
		projectDid: ownProps.projectDid
	};
}

export const FundingContainer = connect(
	mapStateToProps
)(Funding as any);
