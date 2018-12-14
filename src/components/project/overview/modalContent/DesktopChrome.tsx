import * as React from 'react';
import styled from 'styled-components';

const BorderBox = styled.div`
	border: 1px solid ${props => props.theme.ixoBlue};
	border-radius: 5px;
`;
export interface ParentProps {
	// title: string;
}

export const DesktopChrome: React.SFC<ParentProps> = (props) => {
	return (
		<div>
			<p>Desktop and chrome please.</p>
			<BorderBox>
				<h3><div><i className="icon-pending"/>t </div></h3>
			</BorderBox>
		</div>
	);
};