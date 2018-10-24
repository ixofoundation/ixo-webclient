import * as React from 'react';
import styled from 'styled-components';

const FundingWrapper = styled.div`
	position: fixed;
	bottom:0;
	left:0;
	right:0;
	background: #00293e;
	color: white;
	height: 80px;
	z-index: 99;
	display: flex;

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

		li {
			margin: 0 15px;
		}
	}

	.row > div:last-child {
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
			<FundingWrapper>
				<div className="container">
					<div className="row">
						<div className="col-md-6">
							<ol>
								<li>SETUP</li>
								<li>FUEL</li>
							</ol>
						</div>
						<div className="col-md-6">
							IXO
						</div>
					</div>
				</div>
			</FundingWrapper>
		);
	}
}