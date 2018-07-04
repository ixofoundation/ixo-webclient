import * as React from 'react';
import styled from 'styled-components';
import MediaQuery from 'react-responsive';
import { deviceWidth } from '../../lib/commonData';

const Container = styled.div`

`;

export interface State {

}

export interface ParentProps {

}

export default class Home extends React.Component<ParentProps, State> {

	render() {
		return (
			<Container className="container-fluid text-white">
				<div className="row">
					<div className="col-md-12">
						<MediaQuery minWidth={`${deviceWidth.tablet}px`}>
							test
						</MediaQuery>
					</div>
				</div>
			</Container>
		);
	}
}