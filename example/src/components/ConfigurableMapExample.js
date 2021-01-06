// https://docs.microsoft.com/en-us/bingmaps/v8-web-control/map-control-concepts/configuration-driven-maps-framework/load-a-configurable-map-with-code-example

import React from 'react'
import PropTypes from 'prop-types'

import Microsoft from '@pnnl/react-bingmaps'

const ConfigurableMapExample = ({
  width,
  height,
  ...props
}) => {
  const handleConfigurableMapLoad = (map) => {
    setTimeout(() => {
      map.setView({
        zoom: 5,
      });
    }, 5000);
  };

  return (
    <div style={{ width, height, }}>
      <Microsoft.Maps.ConfigurableMap onLoad={handleConfigurableMapLoad} configFileUrl="https://bingmapsisdk.blob.core.windows.net/isdksamples/configmap2.json" withCredentials={false} />
    </div>
  );
}

ConfigurableMapExample.propTypes = {
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
}

ConfigurableMapExample.defaultProps = {
  width: 800,
  height: 600,
}

export default React.memo(ConfigurableMapExample)
