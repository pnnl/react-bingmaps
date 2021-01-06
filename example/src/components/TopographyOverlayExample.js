// https://docs.microsoft.com/en-us/bingmaps/v8-web-control/map-control-concepts/custom-overlays/topography-overlay

import React from 'react'
import PropTypes from 'prop-types'

import Microsoft from '@pnnl/react-bingmaps'

const ImageOverlay = ({
  bounds,
  imageAlt,
  imageUrl,
  onAdd,
  onLoad,
  onRemove,
}) => {
  const [left, setLeft] = React.useState(0);
  const [top, setTop] = React.useState(0);
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);

  const map = React.useContext(Microsoft.Maps.MapContext);

  const _bounds = Microsoft.Maps.useLocationRect(bounds);

  const pixelReference = Microsoft.Maps.usePixelReference('control');

  const handleMapViewChange = () => {
    if (_bounds && map) {
      const topLeft = map.tryLocationToPixel(_bounds.getNorthwest(), pixelReference);

      const bottomRight = map.tryLocationToPixel(_bounds.getSoutheast(), pixelReference);

      if (topLeft && bottomRight) {
        setLeft(topLeft.x);
        setTop(topLeft.y);
        setWidth(bottomRight.x - topLeft.x);
        setHeight(bottomRight.y - topLeft.y);
      }
    }
  };

  Microsoft.Maps.Events.useAddHandler(map, 'viewchange', handleMapViewChange);

  const handleCustomOverlayLoad = (...args) => {
    handleMapViewChange(...args);

    onLoad && onLoad.apply(this, ...args);
  };

  return (
    <Microsoft.Maps.CustomOverlay onAdd={onAdd} onLoad={handleCustomOverlayLoad} onRemove={onRemove}>
      <img alt={imageAlt} src={imageUrl} style={{ left, top, width, height, position: 'absolute', }} />
    </Microsoft.Maps.CustomOverlay>
  );
}

ImageOverlay.propTypes = {
  bounds: PropTypes.shape({
    center: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    }).isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  }).isRequired,
  imageAlt: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  onAdd: PropTypes.func,
  onLoad: PropTypes.func,
  onRemove: PropTypes.func,
}

ImageOverlay.defaultProps = {
  bounds: undefined,
  imageAlt: "",
  imageUrl: undefined,
  onAdd: undefined,
  onLoad: undefined,
  onRemove: undefined,
}

const TopographyOverlayExample = ({
  width,
  height,
  ...props
}) => {
  const bounds = Microsoft.Maps.LocationRect.useFromCorners({
    latitude: 40.5,
    longitude: -123.5,
  }, {
    latitude: 40,
    longitude: -123,
  });

  return (
    <div style={{ width, height, }}>
      <Microsoft.Maps.Map center={{ latitude: 40.25, longitude: -123.25, }} zoom={8} {...props}>
        {
          bounds ? (
            <ImageOverlay bounds={bounds} imageUrl="https://bingmapsisdk.blob.core.windows.net/isdksamples/topographicMap.gif" />
          ) : null
        }
      </Microsoft.Maps.Map>
    </div>
  );
}

TopographyOverlayExample.propTypes = {
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
}

TopographyOverlayExample.defaultProps = {
  width: 800,
  height: 600,
}

export default React.memo(TopographyOverlayExample)
