import React from 'react'
import PropTypes from 'prop-types'

import Microsoft from '../hooks-custom/Microsoft'

import {
  useLayerCollection,
} from './Layer'

const TileLayer = React.forwardRef(({
  downloadTimeout,
  enableCors,
  mercator,
  opacity,
  useCredentialsForCORS,
  visible,
  zIndex,
}, ref) => {
  const tileLayer = Microsoft.Maps.TileLayer.useConstructor({
    downloadTimeout,
    enableCors,
    mercator,
    opacity,
    useCredentialsForCORS,
    visible,
    zIndex,
  });

  React.useImperativeHandle(ref, () => tileLayer, [
    tileLayer,
  ]);

  useLayerCollection(tileLayer);

  return null;
})

TileLayer.propTypes = {
  downloadTimeout: PropTypes.number,
  enableCors: PropTypes.bool,
  mercator: PropTypes.shape({
    bounds: PropTypes.shape({
      center: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
      }).isRequired,
      height: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
    }),
    maxZoom: PropTypes.number,
    minZoom: PropTypes.number,
    uriConstructor: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]).isRequired,
  }).isRequired,
  opacity: PropTypes.number,
  useCredentialsForCORS: PropTypes.bool,
  visible: PropTypes.bool.isRequired,
  zIndex: PropTypes.number,
}

TileLayer.defaultProps = {
  downloadTimeout: undefined,
  enableCors: undefined,
  mercator: {
    uriConstructor: undefined,
  },
  opacity: undefined,
  useCredentialsForCORS: undefined,
  visible: true,
  zIndex: undefined,
}

export default React.memo(TileLayer)
