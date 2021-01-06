// https://www.bing.com/api/maps/mapcontrol/isdk?autoRedirect=false#simpleGroundOverlay+JS

import React from 'react'
import PropTypes from 'prop-types'

import Microsoft from '@pnnl/react-bingmaps'

const SimpleGroundOverlayExample = ({
  width,
  height,
  ...props
}) => {
  const bounds = Microsoft.Maps.LocationRect.useFromEdges(50, -126, 25, -66);

  return (
    <div style={{ width, height, }}>
      <Microsoft.Maps.Map center={{ latitude: 40, longitude: -98, }} zoom={4} {...props}>
        <Microsoft.Maps.GroundOverlay bounds={bounds} imageUrl="https://bingmapsisdk.blob.core.windows.net/isdksamples/us_counties.png" opacity={0.4} />
      </Microsoft.Maps.Map>
    </div>
  );
}

SimpleGroundOverlayExample.propTypes = {
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
}

SimpleGroundOverlayExample.defaultProps = {
  width: 600,
  height: 400,
}

export default React.memo(SimpleGroundOverlayExample)
