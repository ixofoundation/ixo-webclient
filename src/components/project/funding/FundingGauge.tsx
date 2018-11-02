import * as React from 'react';
import styled from 'styled-components';
import { deviceWidth } from 'src/lib/commonData';
import { Web3Acc } from 'src/types/models/web3';

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

export interface ParentProps {
	web3error: string;
	account: Web3Acc;
}

export const FundingGauge: React.SFC<ParentProps> = (props) => {

	function handleRenderGauge() {
		if (props.web3error) {
			return <h3>{props.web3error}</h3>;
		}
		if (props.account.address!) {
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
			return null;
		}
	}
	return (
		<IxoGauge>
			{handleRenderGauge()}
		</IxoGauge>
	);
};