import * as React from 'react';
import styled from 'styled-components';

const Bar = styled.div`
	background: #E9E8E8;
	display: flex;
	justify-content: flex-start;
	width: 100%;
	height: 5px;
	border-radius: 2px;
	overflow: hidden;
`;

const Successful = styled.div`
	background: ${props => props.theme.graphGradient};
`;

const Rejected = styled.div`
	background: ${props => props.theme.red};
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
			<Rejected style={{width: rejectedWidth + 'px'}} />
		</Bar>
	);
};