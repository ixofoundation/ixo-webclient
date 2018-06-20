import * as React from 'react';
import styled from 'styled-components';

const BannerLeft = styled.div`
	width: 100%;
`;
const BannerRight = styled.div`
	width: 100%;
`;
export interface ParentProps { }

export const HomeBanner: React.SFC<ParentProps> = (props) => {
	return (
		<div className="col-md-12">
			<div className="col-md-6">
				<BannerLeft>
					<img src="" alt="" />
				</BannerLeft>
			</div>
			<div className="col-md-6">
				<BannerRight>
					<div className="row">
						<h2>What counts</h2>
						<h5>Impact Data: Trust, Measure & Accountability</h5>
						<p>ixo provides a trusted global information network that is owned by everyone. </p>
						<button>start your own impact project</button>
					</div>
				</BannerRight>
			</div>
		</div>
	);
};