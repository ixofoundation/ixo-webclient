import * as React from 'react';
import {
	ComposableMap,
	ZoomableGroup,
	Geographies,
	Geography,
	Markers,
	Marker,
	Lines,
	Line,
} from 'react-simple-maps';
import styled from 'styled-components';

const MapWrapper = styled.div`

	:hover {
		cursor: grab;
	}

	:active {
		cursor: grabbing;
	}

	path:focus {
		outline: none!important;
	}
	g.rsm-marker {
    	outline-width: 0px;
	}
`;

const geographyPaths = require('../../lib/maps/world-50m-simplified.json');

export class LatLng {
	coordinate = null;
	constructor(lat: number, lon: number) {
		this.coordinate = {lat: lat, lon: lon};
	}

	lon() {
		return this.coordinate.lon;
	}

	lat() {
		return this.coordinate.lat;
	}
}

export interface ParentProps {
	markers: LatLng[];
}

export class WorldMap extends React.Component<ParentProps> {

	render() {

		const countryProps = {
			fill: '#053c53',
			stroke: '#337a8e',
			strokeWidth: 0.3,
			outline: 'none!important',
		};

		const markerProps = {
			fill: '#49BFE0'
		};

		return (
			<MapWrapper>
				<ComposableMap style={{ width: '100%', outline: 'none!important', maxHeight: '330px' }}>
					<ZoomableGroup zoom={3}>
					<Geographies geography={geographyPaths}>
					{(geographies, projection) => geographies.map((geography, index) => (
						<Geography
							key={index}
							geography={geography}
							projection={projection}
							style={{
								default: countryProps,
								hover:   countryProps,
								pressed: countryProps,
							}}
						/>
					))}
					</Geographies>
					<Markers style={{outlineWidth: '0px'}}>
						{this.props.markers.map( (value: LatLng, i: number) => {
							return (
								<Marker 
										key={i}
										marker={{ coordinates: [ value[0], value[1] ] }}
										style={{
											default: markerProps,
											hover:   markerProps,
											pressed: markerProps,
											outline: 'none!important',
											outlineWidth: '0px'
										}
										}
								>
									<circle cx={0} cy={0} r={3} filter="url(#glow)"/>
									<defs>
										<filter id="glow" width="180%" height="180%" filterUnits="userSpaceOnUse">
											<feGaussianBlur in="SourceGraphic"  stdDeviation="5"/> {/* stdDeviation is how much to blur */}
											<feComponentTransfer>
											<feFuncA type="linear" slope="3"/> {/* slope is the opacity of the shadow */}
											</feComponentTransfer>
											<feMerge> 
												<feMergeNode/>
												<feMergeNode in="SourceGraphic"/>
											</feMerge>
										</filter>
									</defs>
								</Marker>
							);
						})}
					</Markers>
					<Lines>
						<Line />
					</Lines>
					</ZoomableGroup>
				</ComposableMap>
			</MapWrapper>
		);
	}
}