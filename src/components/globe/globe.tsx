import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const TextBlock = styled.div`
	position: absolute;
	top: 50%;
	z-index: 1;
	left: 65px;
	pointer-events: none;
	a {
		pointer-events: auto;
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

interface State {
	ratio: number;
}

interface ParentProps {
}

export class Globe extends React.Component<ParentProps, State> {

	state = {
		ratio: 0
	};
	
	componentDidMount() {
		this.handleResize();
		window.addEventListener('resize', this.handleResize);
	}

	handleResize = () => {
		const width = window.innerWidth;
		const height = window.innerHeight - 210;
		this.setState({ratio : height / width * 100});
	}

	render() {
		const Container = styled.div`
			position: relative;
			height: 0;
			overflow: hidden;
			padding-bottom: ${this.state.ratio}%;

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
				<iframe src={location.protocol + '//' + location.hostname + ':3001'} />
			</Container>
		);
	}
}