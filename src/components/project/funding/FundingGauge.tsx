import * as React from 'react';
import styled from 'styled-components';
import { deviceWidth } from 'src/lib/commonData';
import { Web3Acc } from 'src/types/models/web3';
import { Fragment } from 'react';

const MetaMaskLogo = require('../../../assets/images/metamask.svg');

const IxoGauge = styled.div`
	font-family: ${props => props.theme.fontRobotoCondensed};
	color: white;
	font-size: 24px;
	line-height: 26px;
	font-weight: 400;
	margin-right: 40px;
	min-width: 215px;
	text-align: right;

	span {
		color: ${props => props.theme.fontLightBlue};
		font-weight: 300;
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

const GaugeContainer = styled.div`
	position: relative;
`;

const ErrorWrapper = styled.div`
	display: flex;
	align-items: center;

	h3 {
		text-transform: uppercase;
		font-size: 19px;
		font-family: ${props => props.theme.fontRobotoCondensed};
		margin: 0;
		line-height: 1.1;
	}

	p {
		margin: 0;
		text-align: left;
		line-height: 1.1;
	}

	img {
		margin: 0 15px 0 5px;
	}
`;

const IxoX = styled.i`
	:before {
		position: relative;
		top: 4px;
		color: ${props => props.theme.ixoBlue};
		font-size: 30px;
	}
`;

const CheckIcon = styled.i`
	position: absolute;
	top: 13px;
	right: -22px;
	width: 16px;
	height: 16px;
    background: white;
	border-radius: 50%;
	
	:before {
		color: ${props => props.theme.bg.green};
		font-size: 18px;
		position: absolute;
		top: 0;
		right: 0;
		line-height: 1;
	}
`;
export interface ParentProps {
	web3error: string;
	account: Web3Acc;
	requiredIxo: number;
}

export const FundingGauge: React.SFC<ParentProps> = (props) => {

	function handleRenderGauge() {
		if (props.web3error) {
			return (
				<ErrorWrapper>
					<div>
						<img src={MetaMaskLogo} />
					</div>
					<div>
						<h3>{props.web3error}</h3>
						<p>to fuel your project</p>
					</div>
				</ErrorWrapper>
			);
		}
		if (props.account.address!) {
			const balance = (props.account.balance / 100000000).toFixed(2);
			return (
				<Fragment>
					<GaugeContainer>
						<IxoX className="icon-ixo-x" />
						{balance}<span>/{props.requiredIxo} IXO</span>
						{Number(balance) >= props.requiredIxo && <CheckIcon className="icon-registration-yes" />}
					</GaugeContainer>
					<p>fuel needed</p>
				</Fragment>
			);
		} else {
			return null;
		}
	}
	return (
		<IxoGauge>
			{handleRenderGauge()}
		</IxoGauge>
	);
};