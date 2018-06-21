import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	padding:40px;
	background: ${props => props.theme.bg.blue};
	color: white;
`;
export const ProjectDetailWrapper: React.SFC<{}> = ({children}) => {
	return (
		<Container className="container-fluid">
			{children}
		</Container>
	);
};