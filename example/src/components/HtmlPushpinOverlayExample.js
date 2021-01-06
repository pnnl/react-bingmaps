// https://docs.microsoft.com/en-us/bingmaps/v8-web-control/map-control-concepts/custom-overlays/html-pushpin-overlay

import React from 'react'
import PropTypes from 'prop-types'

import Microsoft from '@pnnl/react-bingmaps'

const HtmlPushpin = ({
  anchor,
  htmlContent,
  location,
}) => {
  const ref = React.useCallback((node) => {
    if (node) {
      node.innerHTML = htmlContent;
    }
  }, [htmlContent]);

  const _anchor = Microsoft.Maps.usePoint(anchor);

  const _location = Microsoft.Maps.useLocation(location);

  const _pixelReference = Microsoft.Maps.usePixelReference('control');

  const map = React.useContext(Microsoft.Maps.MapContext);

  const reducer = (topLeft, action) => {
    switch (action.type) {
      case 'viewchange':
        return (map && _location) ? map.tryLocationToPixel(_location, _pixelReference) : undefined;
      default:
        throw new Error();
    }
  };

  const topLeft = React.useMemo(() => (map && _location) ? map.tryLocationToPixel(_location, _pixelReference) : undefined, [map, _location, _pixelReference]);

  const [_topLeft, dispatch] = React.useReducer(reducer, undefined);

  Microsoft.Maps.Events.useAddHandler(map, 'viewchange', () => dispatch({ type: 'viewchange', payload: undefined, }));

  const left = React.useMemo(() => (_anchor && (topLeft || _topLeft)) ? ((_topLeft ? _topLeft.x : topLeft.x) - _anchor.x) : undefined, [_anchor, topLeft, _topLeft]);

  const top = React.useMemo(() => (_anchor && (topLeft || _topLeft)) ? ((_topLeft ? _topLeft.y : topLeft.y) - _anchor.y) : undefined, [_anchor, topLeft, _topLeft]);

  if (left && top) {
    return (
      <div ref={ref} style={{ position: 'absolute', left, top, }}></div>
    );
  } else {
    return null;
  }
}

HtmlPushpin.propTypes = {
  anchor: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  htmlContent: PropTypes.string.isRequired,
  location: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }).isRequired,
}

HtmlPushpin.defaultProps = {
  anchor: undefined,
  htmlContent: undefined,
  location: undefined,
}

const HtmlPushpinLayer = ({
  children,
}) => {
  return (
    <Microsoft.Maps.CustomOverlay beneathLabels={false} style={{ position: 'absolute', left: 0, top: 0, }}>{children}</Microsoft.Maps.CustomOverlay>
  );
}

HtmlPushpinLayer.propTypes = {}

HtmlPushpinLayer.defaultProps = {}

const HtmlPushpinLayerExample = () => {
  const htmlContentTemplate = '<div style="color:red;background-color:white;width:100px;padding:2px;text-align:center;">{text}</div>';

  const map = React.useContext(Microsoft.Maps.MapContext);

  const locs = Microsoft.Maps.TestDataGenerator.useGetLocations(3, map ? map.getBounds() : undefined);

  return (
    <HtmlPushpinLayer>
      {
        Array.isArray(locs) ? (
          <>
            <HtmlPushpin location={locs[0]} htmlContent={htmlContentTemplate.replace('{text}', 'Hello World!')} anchor={{ x: 50, y: 12, }} />
            <HtmlPushpin location={locs[1]} htmlContent={htmlContentTemplate.replace('{text}', 'My Pushpin')} anchor={{ x: 50, y: 12, }} />
            <HtmlPushpin location={locs[2]} htmlContent={htmlContentTemplate.replace('{text}', 'HTML Rules!')} anchor={{ x: 50, y: 12, }} />
          </>
        ) : null
      }
    </HtmlPushpinLayer>
  );
}

HtmlPushpinLayerExample.propTypes = {}

HtmlPushpinLayerExample.defaultProps = {}

const HtmlPushpinOverlayExample = ({
  width,
  height,
  ...props
}) => {
  return (
    <div style={{ width, height, }}>
      <Microsoft.Maps.Map {...props}>
        <HtmlPushpinLayerExample />
      </Microsoft.Maps.Map>
    </div>
  );
}

HtmlPushpinOverlayExample.propTypes = {
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
}

HtmlPushpinOverlayExample.defaultProps = {
  width: 600,
  height: 400,
}

export default React.memo(HtmlPushpinOverlayExample)
