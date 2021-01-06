// https://docs.microsoft.com/en-us/bingmaps/v8-web-control/map-control-concepts/layers/controlling-an-animatedtilelayer

import React from 'react'
import PropTypes from 'prop-types'

import Microsoft from '@pnnl/react-bingmaps'

const ControllingAnAnimatedTileLayerExample = ({
  width,
  height,
  ...props
}) => {
  const timestamps = ['900913-m50m', '900913-m45m', '900913-m40m', '900913-m35m', '900913-m30m', '900913-m25m', '900913-m20m', '900913-m15m', '900913-m10m', '900913-m05m', '900913'];

  const mercator = timestamps.map((timestamp) => {
    return {
      uriConstructor: `https://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/nexrad-n0q-${timestamp}/{zoom}/{x}/{y}.png`,
    };
  });

  const ref = React.useRef(null);

  const handlePauseButtonClick = (event) => {
    if (ref.current) {
      ref.current.pause();
    }
  };

  const handlePlayButtonClick = (event) => {
    if (ref.current) {
      ref.current.play();
    }
  };

  const handleStopButtonClick = (event) => {
    if (ref.current) {
      ref.current.stop();
    }
  };

  return (
    <>
      <div style={{ width, height, }}>
        <Microsoft.Maps.Map center={{ latitude: 39, longitude: -92, }} zoom={5} {...props}>
          <Microsoft.Maps.AnimatedTileLayer ref={ref} mercator={mercator} frameRate={500} />
        </Microsoft.Maps.Map>
      </div>
      <div>
        <input onClick={handlePauseButtonClick} type="button" value="Pause" />
        <input onClick={handlePlayButtonClick} type="button" value="Play" />
        <input onClick={handleStopButtonClick} type="button" value="Stop" />
      </div>
    </>
  );
}

ControllingAnAnimatedTileLayerExample.propTypes = {
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
}

ControllingAnAnimatedTileLayerExample.defaultProps = {
  width: 600,
  height: 400,
}

export default React.memo(ControllingAnAnimatedTileLayerExample)
