import * as React from 'react';
import styled from 'styled-components';

export interface ParentProps {
	title: string;
}

export const Globe: React.SFC<ParentProps> = (props) => {

	const origin = location.origin;
	const width = window.innerWidth;
	const height = window.innerHeight - 213;

	const ratio = (height / width * 100);

	const Container = styled.div`
		position: relative;
		height: 0;
		overflow: hidden;
		padding-bottom: ${ratio}%;

		iframe {
			position: absolute;
			top:0;
			left: 0;
			width: 100%;
			height: 100%;
			border: 0;
		}
	`;

	return (
		<Container>
			<iframe src={origin + '/ixoearth/index.html'} />
		</Container>
	);
};