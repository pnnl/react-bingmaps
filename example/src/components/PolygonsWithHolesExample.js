// https://docs.microsoft.com/en-us/bingmaps/v8-web-control/map-control-concepts/map-shapes-polylines-and-polygons/polygons-with-holes-example

import React from 'react'
import PropTypes from 'prop-types'

import Microsoft from '@pnnl/react-bingmaps'

const PolygonWithHole = (props) => {
  const map = React.useContext(Microsoft.Maps.MapContext);

  const rings = React.useMemo(() => {
    if (map) {
      const center = map.getCenter();

      const exteriorRing = [
        center,
        {
          latitude: center.latitude - 0.5,
          longitude: center.longitude - 1,
        },
        {
          latitude: center.latitude - 0.5,
          longitude: center.longitude + 1,
        },
        center,
      ];

      const interiorRing = [
        {
          latitude: center.latitude - 0.2,
          longitude: center.longitude,
        },
        {
          latitude: center.latitude - 0.4,
          longitude: center.longitude + 0.5,
        },
        {
          latitude: center.latitude - 0.4,
          longitude: center.longitude - 0.5,
        },
        {
          latitude: center.latitude - 0.2,
          longitude: center.longitude,
        },
      ];

      return [exteriorRing, interiorRing];
    } else {
      return undefined;
    }
  }, [map]);

  if (rings) {
    return (
      <Microsoft.Maps.Polygon rings={rings} {...props} />
    );
  } else {
    return null;
  }
}

const PolygonsWithHolesExample = ({
  width,
  height,
  ...props
}) => {
  return (
    <div style={{ width, height, }}>
      <Microsoft.Maps.Map {...props}>
        <PolygonWithHole fillColor="rgba(0, 255, 0, 0.5)" strokeColor="red" strokeThickness={2} />
      </Microsoft.Maps.Map>
    </div>
  );
}

PolygonsWithHolesExample.propTypes = {
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
}

PolygonsWithHolesExample.defaultProps = {
  width: 600,
  height: 400,
}

export default React.memo(PolygonsWithHolesExample)
