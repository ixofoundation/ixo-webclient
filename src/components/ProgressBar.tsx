import * as React from 'react';
import styled from 'styled-components';

const Bar = styled.div`
	background: #E9E8E8;
	display: flex;
	justify-content: flex-start;
	width: 100%;
	height: 4px;
	border-radius: 2px;
`;

const Rejected = styled.div`
	&& {
		background-color: ${props => props.theme.red};
	}
	border-radius: 0 2px 2px 0;
	position: relative;
	left: -2px;
`;

const Successful = styled.div`
	&& {
		background: ${props => props.theme.graphGradient};
	}
	border-radius: 2px;
	position: relative;
	z-index: 1;
`;

export interface Props {
	total: number;
	approved: number;
	rejected: number;
}

export const ProgressBar: React.SFC<Props> = ({total, approved, rejected}) => {

	const approvedWidth = approved / total * 100;
	const rejectedWidth = rejected / total * 100;
	
	return (
		<Bar>
			<Successful style={{width: approvedWidth + 'px'}} />
			<Rejected style={{width: rejectedWidth + 2 + 'px'}} />
		</Bar>
	);
};