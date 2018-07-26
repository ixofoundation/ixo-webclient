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

	path {
		outline: none!important;
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
		return (
			<MapWrapper>
				<ComposableMap style={{ width: '100%' }}>
					<ZoomableGroup zoom={1}>
					<Geographies geography={geographyPaths}>
					{(geographies, projection) => geographies.map((geography, index) => (
						<Geography
							key={index}
							geography={geography}
							projection={projection}
							style={{
								default: {
									fill: '#053c53',
									stroke: '#49BFE0',
									strokeWidth: 0.1,
									outline: 'none',
								},
								hover:   { fill: '#49BFE0' },
								pressed: { fill: '#000' },
							}}
						/>
					))}
					</Geographies>
					<Markers >
						{this.props.markers.map( (value: LatLng, i: number) => {
							return (
								<Marker 
										key={i}
										marker={{ coordinates: [ value.lon(), value.lat() ] }}
										style={{
											default: { fill: '49BFE0' },
											hover:   { fill: '#FFF' },
											pressed: { fill: '#000' },
										}
										}
								>
									<circle cx={0} cy={0} r={10} filter="url(#glow)"/>
									<defs>
										<filter id="glow" width="180%" height="180%" filterUnits="userSpaceOnUse">
											<feGaussianBlur in="SourceGraphic"  stdDeviation="10"/> {/* stdDeviation is how much to blur */}
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