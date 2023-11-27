import { FlexBox } from 'components/App/App.styles'
import { useRef } from 'react'
import Map, { Layer, Source, MapRef, GeoJSONSource, LayerProps } from 'react-map-gl'
import styled from 'styled-components'

const Container = styled(FlexBox)`
  width: 100%;
  height: 100%;
  minheight: 300px;

  .mapboxgl-control-container {
    display: none;
  }
`

const clusterLayer: LayerProps = {
  id: 'clusters',
  type: 'circle',
  source: 'earthquakes',
  filter: ['has', 'point_count'],
  paint: {
    'circle-color': ['step', ['get', 'point_count'], '#51bbd6', 100, '#f1f075', 750, '#f28cb1'],
    'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40],
  },
}

const clusterCountLayer: LayerProps = {
  id: 'cluster-count',
  type: 'symbol',
  source: 'earthquakes',
  filter: ['has', 'point_count'],
  layout: {
    'text-field': '{point_count_abbreviated}',
    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    'text-size': 12,
  },
}

const unclusteredPointLayer: LayerProps = {
  id: 'unclustered-point',
  type: 'circle',
  source: 'earthquakes',
  filter: ['!', ['has', 'point_count']],
  paint: {
    'circle-color': '#11b4da',
    'circle-radius': 4,
    'circle-stroke-width': 1,
    'circle-stroke-color': '#fff',
  },
}

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZ3JlZ29yeWl4bzQ1IiwiYSI6ImNscGhlMnJkNzAyODMyam81MmphdzUyangifQ.jsNbHzDlWGY6xefsRYvc5A'

const ClaimLocation = () => {
  const mapRef = useRef<MapRef>(null)

  const onClick = (event: any) => {
    const feature = event.features[0]
    const clusterId = feature.properties.cluster_id

    const mapboxSource = mapRef.current?.getSource('earthquakes') as GeoJSONSource

    mapboxSource?.getClusterExpansionZoom(clusterId, (err, zoom) => {
      if (err) {
        return
      }

      mapRef.current?.easeTo({
        center: feature.geometry.coordinates,
        zoom,
        duration: 500,
      })
    })
  }

  return (
    <Container>
      <Map
        initialViewState={{
          latitude: 40.67,
          longitude: -103.59,
          zoom: 3,
        }}
        mapStyle='mapbox://styles/mapbox/dark-v9'
        mapboxAccessToken={MAPBOX_TOKEN}
        interactiveLayerIds={[clusterLayer.id || '']}
        onClick={onClick}
        ref={mapRef}
      >
        <Source
          id='earthquakes'
          type='geojson'
          data='https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson'
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={50}
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
        </Source>
      </Map>
    </Container>
  )
}

export default ClaimLocation
