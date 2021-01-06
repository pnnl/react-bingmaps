// https://docs.microsoft.com/en-us/bingmaps/v8-web-control/map-control-concepts/layers/basic-tile-layer-example

import React from 'react'
import PropTypes from 'prop-types'

import Microsoft from '@pnnl/react-bingmaps'

const BasicTileLayerExample = ({
  width,
  height,
  ...props
}) => {
  const bounds = Microsoft.Maps.LocationRect.useFromEdges(35.176, -101.065, 14.01, -80.538);

  const mercator = {
    bounds,
    uriConstructor: 'https://bingmapsisdk.blob.core.windows.net/katrinatiles/{quadkey}.png',
    minZoom: 1,
    maxZoom: 10,
  };

  return (
    <div style={{ width, height, }}>
      <Microsoft.Maps.Map center={{ latitude: 25, longitude: -90, }} zoom={5} mapTypeId="aerial" {...props}>
        <Microsoft.Maps.TileLayer mercator={mercator} />
      </Microsoft.Maps.Map>
    </div>
  );
}

BasicTileLayerExample.propTypes = {
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
}

BasicTileLayerExample.defaultProps = {
  width: 600,
  height: 400,
}

export default React.memo(BasicTileLayerExample)
