// import * as React from 'react';
// // import * as d3 from 'd3';
// import { scaleLinear } from 'd3-scale';

// export interface ParentProps {

// }

// export interface State {
// 	SDGData: any;
// }

// function toDegrees(rad: any) {
// 	let deg = rad * 180 / Math.PI;
// 	return deg > 359 ? deg % 360 : deg;
// }

// export class Sunburst extends React.Component<ParentProps, State> {

// 	state = {
// 		SDGData: 'Waiting for data...'
// 	};

// 	componentDidMount() {

// 		fetch('https://ixo-sdg.herokuapp.com/goals?ids=5,12&targets=true&indicators=true&includeMetadata=false').then((response) => {
// 		if (response.ok) {
// 			response.json().then(json => {
// 				this.setState({SDGData: json.data});
// 			});
// 		}
// 		}).catch((error) => {
// 			console.log(error);
// 		});
// 	}

// 	handleMouseOver(e: any) {
// 		let path = e.target.getAttribute('data-path'),
// 			name = e.target.getAttribute('data-name'),
// 			size = e.target.getAttribute('data-value'),
// 			total = this.svg.getAttribute('data-total'),
// 			slices = this.svg.querySelectorAll(`path.slice:not([data-path^='${path}'])`);

// 		let i = -1,
// 			n = slices.length;

// 		while (++i < n) { slices[i].style.opacity = '0.3'; }

// 		this.details.textContent = name;
// 		this.percentage.textContent = `${(size * 100 / total).toFixed(2)}%`;
// 	},
// 	handleMouseOut(e) {
// 		let slices = this.svg.querySelectorAll('path.slice');

// 		let i = -1,
// 			n = slices.length;

// 		while(++i < n) { slices[i].style.opacity = '1'; }

// 		this.details.textContent = '';
// 		this.percentage.textContent = '';
// 	}
// 	render() {
// 	let width = 600,
// 		height = 600,
// 		radius = 400,
// 		donutRadius = 100,
// 		transform = `translate(${width * 0.45},${0.55 * height})`,
// 		slices = utils.flatten(utils.findSum(data)),
// 		// slices = utils.findSum(data),
// 		scale = scaleLinear().domain([0, slices[0].size]).range([0, 2 * Math.PI]),
// 		shape = arc(),
// 		depth = utils.depth(data);

// 	let currentStartAngle = 0,
// 		currentLevel = 1,
// 		arcWidth = (radius - donutRadius)/depth,
// 		levelStartAngle = [0];

// 	return (
// 		<svg ref={(c) => this.svg = c} viewBox={`0 0 ${width} ${height}`} data-total={slices[0].size}>
// 			<g transform={transform}>
// 			{slices.map((slice, i) => {
// 				let { level, size, name} = slice,
// 					startAngle = currentStartAngle,
// 					endAngle = startAngle + scale(slice.size),
// 					innerRadius = (slice.level - 1) * arcWidth,
// 					outerRadius = innerRadius + arcWidth;

// 				if (slices[i + 1] && (slices[i + 1].level <= level)) {
// 					currentStartAngle = endAngle;
// 				}
// 				currentLevel = slice.level;
// 				return (
// 					<path 
// 						key={i}
// 						className="slice"
// 						data-path={slice.path}
// 						data-value={slice.size}
// 						data-name={slice.name}
// 						display={i === 0 ? 'none' : 'inline'}
// 						fill={rmc.getColor()} d={shape({
// 							startAngle,
// 							endAngle,
// 							innerRadius,
// 							outerRadius
// 						})} onMouseOver={this.handleMouseOver}
// 						onMouseOut={this.handleMouseOut}>
// 						<title>{`${slice.name}\n${slice.size}`}</title>
// 						</path>
// 				);
// 			})}
// 			</g>
// 			<text transform={transform} ref={(c) => this.details = c}
// 				textAnchor="middle" className="details" dy={-10}/>
// 			<text transform={transform} ref={(c) => this.percentage = c}
// 				textAnchor="middle" className="details-percentage" dy={10}/>
// 		</svg>
// 	);
// 	}
// 	})
// }