// https://docs.microsoft.com/en-us/bingmaps/v8-web-control/map-control-concepts/well-known-text-examples/well-known-text-read-example

import React from 'react'
import PropTypes from 'prop-types'

import Microsoft from '@pnnl/react-bingmaps'

const WellKnownTextReadExample = ({
  width,
  height,
  ...props
}) => {
  const pin = Microsoft.Maps.WellKnownText.useRead('POINT(-122.34009 47.60995)');

  return (
    <div style={{ width, height, }}>
      <Microsoft.Maps.Map center={{ latitude: 47.6, longitude: -122.34, }} {...props}>
        {
          pin ? (
            <Microsoft.Maps.IPrimitive shape={pin} />
          ) : null
        }
      </Microsoft.Maps.Map>
    </div>
  );
}

WellKnownTextReadExample.propTypes = {
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
}

WellKnownTextReadExample.defaultProps = {
  width: 600,
  height: 400,
}

export default React.memo(WellKnownTextReadExample)
