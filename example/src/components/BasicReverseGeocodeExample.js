// https://docs.microsoft.com/en-us/bingmaps/v8-web-control/map-control-concepts/search-module-examples/basic-reverse-geocode-example

import React from 'react'
import PropTypes from 'prop-types'

import Microsoft from '@pnnl/react-bingmaps'

const BasicReverseGeocodeExample = ({
  width,
  height,
  location,
  ...props
}) => {
  const [result, setResult] = React.useState(null);

  const handlePlaceResultError = () => {
    alert('Unable to reverse geocode location.');
  };

  const handlePlaceResultLoad = (_result) => {
    alert(_result.name);

    setResult(_result);
  };

  return (
    <div style={{ width, height, }}>
      <Microsoft.Maps.Map center={location} {...props}>
        <Microsoft.Maps.Search.SearchManager>
          <Microsoft.Maps.Search.ReverseGeocodeRequest onError={handlePlaceResultError} onLoad={handlePlaceResultLoad} location={location} result={result} />
        </Microsoft.Maps.Search.SearchManager>
      </Microsoft.Maps.Map>
    </div>
  );
}

BasicReverseGeocodeExample.propTypes = {
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  location: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }).isRequired,
}

BasicReverseGeocodeExample.defaultProps = {
  width: 600,
  height: 400,
  location: {
    latitude: 47.678,
    longitude: -122.133,
  },
}

export default React.memo(BasicReverseGeocodeExample)
