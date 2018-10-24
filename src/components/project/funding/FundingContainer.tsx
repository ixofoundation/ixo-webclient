import * as React from 'react';
import styled from 'styled-components';
import { Button, ButtonTypes } from 'src/components/common/Buttons';

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
	font-size: 32px;
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


`;

const ButtonWrapper = styled.div`
	max-width: 300px;

	a {
		display: flex;
		justify-content: center;
		flex-direction: row;
		width: 300px;	
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
			top: 12px;
			font-size: 12px;
			font-weight: bold;
		}
	}
`;
export interface ParentProps {
	
}

export interface State {

}

export class FundingContainer extends React.Component<ParentProps, State> {

	state = {

	};

	render() {
		return (
			<FundingWrapper className="container-fluid">
					<div className="row">
						<div className="col-md-6">
							<ol>
								<li>SETUP</li>
								<li className="active">FUEL</li>
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