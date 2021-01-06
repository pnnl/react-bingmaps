import React from 'react'
import PropTypes from 'prop-types'

import Microsoft from '../hooks-custom/Microsoft'

import {
  useLayerCollection,
} from './Layer'

const AnimatedTileLayer = React.forwardRef(({
  autoPlay,
  frameRate,
  loadingScreen,
  maxTotalLoadTime,
  mercator,
  visible,
  onFrameLoaded,
  onFrameLoadedThrottleInterval,
  onPreLoadEnded,
  onPreLoadEndedThrottleInterval,
  onPreLoadStarted,
  onPreLoadStartedThrottleInterval,
  children,
  ...props
}, ref) => {
  const [animatedTileLayer, divRef] = Microsoft.Maps.AnimatedTileLayer.useConstructor({
    autoPlay,
    frameRate,
    loadingScreen,
    maxTotalLoadTime,
    mercator,
    visible,
  });

  React.useImperativeHandle(ref, () => animatedTileLayer, [
    animatedTileLayer,
  ]);

  Microsoft.Maps.Events.useAddHandler(animatedTileLayer, 'onFrameLoaded', onFrameLoaded, onFrameLoadedThrottleInterval);
  Microsoft.Maps.Events.useAddHandler(animatedTileLayer, 'preLoadEnded', onPreLoadEnded, onPreLoadEndedThrottleInterval);
  Microsoft.Maps.Events.useAddHandler(animatedTileLayer, 'preLoadStarted', onPreLoadStarted, onPreLoadStartedThrottleInterval);

  useLayerCollection(animatedTileLayer);

  return (
    <div ref={divRef} {...props}>{children}</div>
  );
})

AnimatedTileLayer.propTypes = {
  autoPlay: PropTypes.bool,
  frameRate: PropTypes.number,
  loadingScreen: PropTypes.shape({
    beneathLabels: PropTypes.bool,
    drawOrder: PropTypes.number,
  }),
  maxTotalLoadTime: PropTypes.number,
  mercator: PropTypes.arrayOf(PropTypes.shape({
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
  })).isRequired,
  visible: PropTypes.bool.isRequired,
  onFrameLoaded: PropTypes.func,
  onFrameLoadedThrottleInterval: PropTypes.number,
  onPreLoadEnded: PropTypes.func,
  onPreLoadEndedThrottleInterval: PropTypes.number,
  onPreLoadStarted: PropTypes.func,
  onPreLoadStartedThrottleInterval: PropTypes.number,
}

AnimatedTileLayer.defaultProps = {
  autoPlay: undefined,
  frameRate: undefined,
  loadingScreen: undefined,
  maxTotalLoadTime: undefined,
  mercator: [],
  visible: true,
  onFrameLoaded: undefined,
  onFrameLoadedThrottleInterval: undefined,
  onPreLoadEnded: undefined,
  onPreLoadEndedThrottleInterval: undefined,
  onPreLoadStarted: undefined,
  onPreLoadStartedThrottleInterval: undefined,
}

export default React.memo(AnimatedTileLayer)
