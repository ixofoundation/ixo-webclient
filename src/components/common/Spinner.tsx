import * as React from 'react';
import styled from 'styled-components';
import { spinner } from '../../lib/commonData';

const Container = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
		height:calc(100vh - 70px);
		background-color: ${props => props.theme.bg.blue};
`;

export interface Props {
	info: string;
}

export const Spinner: React.SFC<Props> = (props) => {
	return (
		<Container className="col-md-12"><img src={spinner()} width="50" alt={props.info} /></Container>
	);
};