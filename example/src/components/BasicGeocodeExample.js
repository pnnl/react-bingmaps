// https://docs.microsoft.com/en-us/bingmaps/v8-web-control/map-control-concepts/search-module-examples/basic-geocode-example

import React from 'react'
import PropTypes from 'prop-types'

import Microsoft from '@pnnl/react-bingmaps'

const BasicGeocodeExample = ({
  width,
  height,
  where,
  ...props
}) => {
  const [result, setResult] = React.useState(null);

  const handleGeocodeResultError = () => {
    alert('No results found.');
  };

  return (
    <div style={{ width, height, }}>
      <Microsoft.Maps.Map bounds={(result && result.results && (result.results.length > 0)) ? result.results[0].bestView : null} {...props}>
        <Microsoft.Maps.Search.SearchManager>
          <Microsoft.Maps.Search.GeocodeRequest onError={handleGeocodeResultError} onLoad={setResult} result={result} where={where} />
        </Microsoft.Maps.Search.SearchManager>
        {
          (result && result.results && (result.results.length > 0)) ? (
            <Microsoft.Maps.Pushpin location={result.results[0].location} />
          ) : null
        }
      </Microsoft.Maps.Map>
    </div>
  );
}

BasicGeocodeExample.propTypes = {
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  where: PropTypes.string.isRequired,
}

BasicGeocodeExample.defaultProps = {
  width: 600,
  height: 400,
  where: 'New York, NY',
}

export default React.memo(BasicGeocodeExample)
