import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const TextBlock = styled.div`
	opacity: 0;
	position: absolute;
	top: 50%;
	z-index: 1;
	left: 65px;

	a {
		border: 1px solid ${props => props.theme.ixoBlue};
		width: 260px;
		display: block
		padding:8px 0;
		color: white;
		text-align: center;
		font-family: ${props => props.theme.fontRobotoCondensed};
		transition: background 0.3s ease;
		margin-right: 30px
	}

	a:hover {
		text-decoration: none;
		background: ${props => props.theme.bg.darkButton};
	}
`;

export interface ParentProps {
}

export class Globe extends React.Component<ParentProps> {

	state = {
	};

	// const origin = location.origin;
	width = window.innerWidth;
	height = window.innerHeight - 213;

	ratio = (this.height / this.width * 100);
	
	// componentDidMount() {
	// }

	render() {
		const Container = styled.div`
			position: relative;
			height: 0;
			overflow: hidden;
			padding-bottom: ${this.ratio}%;

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
				<TextBlock>
					<h2>The world of <span>IMPACT</span></h2>
					<h3>Count what matters. <br/> Value what counts</h3>
					<p>ixo provides a trusted global information network that is owned by everyone. Create your own impact projects on the ixo blockchain.
						Become a stake-holder in projects you believe in.</p>
					<Link to="/register">ENTER THE IXO WORLD</Link>
					<a href="https://ixo.world">SUBSCRIBE TO OUR NEWSLETTER</a>
				</TextBlock>
				<iframe src="/ixoearth/index.html" />
			</Container>
		);
	}
}