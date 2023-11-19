import React from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from 'react-simple-maps';

const DATA = [
  { coordinates: [-118.2437, 34.0522], size: 50 },
  { coordinates: [-74.0060, 40.7128], size: 30 },
  { coordinates: [-122.4194, 37.7749], size: 70 },
];

const USA_GEO_URL = "https://raw.githubusercontent.com/topojson/us-atlas/master/countries/us.json";

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

const GeographicalDistribution = () => {
  return (
    <div>
      <ComposableMap
        projectionConfig={{
          scale: 1070,
          rotation: [-11,0,0],
        }}
        width={980}
        height={551}
        style={{ width: '100%', height: 'auto' }}
      >
        <Geographies geography={USA_GEO_URL}>
          {({ geographies }) =>
            geographies.map(geo => (
              <Geography key={geo.rsmKey} geography={geo} />
            ))
          }
        </Geographies>

        {DATA.map((marker, i) => (
          <Marker key={i} coordinates={marker.coordinates}>
            <circle r={marker.size} fill="#FF6347" />
          </Marker>
        ))}
      </ComposableMap>
    </div>
  );
};

export default GeographicalDistribution;
