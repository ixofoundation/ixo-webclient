import * as React from 'react';
import styled from 'styled-components';
import { spinner } from '../../lib/commonData';

const Container = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    margin-top: 10px;
	margin-bottom: 10px;
    height: 150px;
    background-color: ${props => props.theme.bg.blue};
    border-radius: 3px;
`;

export interface Props {
	info: string;
}

export const ImageSpinner: React.SFC<Props> = (props) => {
	return (
		<Container className="col-md-12"><img src={spinner()} width="50" alt={props.info} /></Container>
	);
};