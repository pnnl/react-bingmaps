import React from 'react'
import PropTypes from 'prop-types'

import Microsoft from '../hooks-custom/Microsoft'

import {
  useLayerCollection,
} from './Layer'

const GroundOverlay = React.forwardRef(({
  backgroundColor,
  beneathLabels,
  bounds,
  imageUrl,
  opacity,
  rotation,
  visible,
}, ref) => {
  const groundOverlay = Microsoft.Maps.GroundOverlay.useConstructor({
    backgroundColor,
    beneathLabels,
    bounds,
    imageUrl,
    opacity,
    rotation,
    visible,
  });

  React.useImperativeHandle(ref, () => groundOverlay, [
    groundOverlay,
  ]);

  useLayerCollection(groundOverlay);

  return null;
})

GroundOverlay.propTypes = {
  backgroundColor: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      a: PropTypes.number.isRequired,
      r: PropTypes.number.isRequired,
      g: PropTypes.number.isRequired,
      b: PropTypes.number.isRequired,
    }),
  ]),
  beneathLabels: PropTypes.bool.isRequired,
  bounds: PropTypes.shape({
    center: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    }).isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  }),
  imageUrl: PropTypes.string.isRequired,
  opacity: PropTypes.number,
  rotation: PropTypes.number,
  visible: PropTypes.bool.isRequired,
}

GroundOverlay.defaultProps = {
  backgroundColor: undefined,
  beneathLabels: true,
  bounds: undefined,
  imageUrl: undefined,
  opacity: undefined,
  rotation: undefined,
  visible: true,
}

export default React.memo(GroundOverlay)
