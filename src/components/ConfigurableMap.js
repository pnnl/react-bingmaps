import React from 'react'
import PropTypes from 'prop-types'

import Microsoft from '../hooks-custom/Microsoft'

import {
  MapContext,
} from './Map'

const ConfigurableMap = React.forwardRef(({
  configFileUrl,
  withCredentials,
  requestHeaders,
  onLoad,
  onLoadError,
  children,
}, ref) => {
  const [map, errorMsg, divRef] = Microsoft.Maps.ConfigurableMap.useCreateFromConfig(configFileUrl, withCredentials, requestHeaders, onLoad, onLoadError);

  React.useImperativeHandle(ref, () => map, [
    map,
  ]);

  return (
    <div ref={divRef}>
      <MapContext.Provider value={map}>{children}</MapContext.Provider>
    </div>
  );
})

ConfigurableMap.propTypes = {
  configFileUrl: PropTypes.string.isRequired,
  withCredentials: PropTypes.bool.isRequired,
  requestHeaders: PropTypes.object.isRequired,
  onLoad: PropTypes.func,
  onLoadError: PropTypes.func,
}

ConfigurableMap.defaultProps = {
  configFileUrl: undefined,
  withCredentials: false,
  requestHeaders: {},
  onLoad: undefined,
  onLoadError: undefined,
}

export default React.memo(ConfigurableMap)
