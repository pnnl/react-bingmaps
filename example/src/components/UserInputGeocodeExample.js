// https://docs.microsoft.com/en-us/bingmaps/v8-web-control/map-control-concepts/search-module-examples/basic-geocode-example

import React from 'react'
import PropTypes from 'prop-types'

import Microsoft from '@pnnl/react-bingmaps'

const GeocodeResultPushpinLayer = ({
  ...props
}) => {
  const result = React.useContext(Microsoft.Maps.Search.GeocodeResultContext);

  return (
    <Microsoft.Maps.Layer {...props}>
      {
        (result && result.results) ? result.results.map((_result, index) => {
          return (
            <Microsoft.Maps.Pushpin key={index} location={_result.location} title={_result.name} />
          )
        }) : null
      }
    </Microsoft.Maps.Layer>
  );
}

GeocodeResultPushpinLayer.propTypes = {}

GeocodeResultPushpinLayer.defaultProps = {}

const GeocodeResultMap = ({
  width,
  height,
  where,
  result,
  onLoad,
  onError,
  ...props
}) => {
  const api = React.useContext(Microsoft.Maps.ApiContext);

  const bounds = React.useMemo(() => {
    if (api && api.Maps && api.Maps.LocationRect && result && result.results && (result.results.length > 0)) {
      const locations = result.results.map((_result) => _result.location);

      return api.Maps.LocationRect.fromLocations(locations);
    } else {
      return undefined;
    }
  }, [api, result]);

  return (
    <div>
      <div style={{ width, height, float: 'left', position: 'relative', }}>
        <Microsoft.Maps.Map bounds={bounds} {...props}>
          <Microsoft.Maps.Search.SearchManager>
            <Microsoft.Maps.Search.GeocodeRequest onError={onError} onLoad={onLoad} result={result} where={(result === undefined) ? where : undefined}>
              <GeocodeResultPushpinLayer />
            </Microsoft.Maps.Search.GeocodeRequest>
          </Microsoft.Maps.Search.SearchManager>
        </Microsoft.Maps.Map>
      </div>
      {
        (result && result.results && (result.results.length > 0)) ? (
          <div style={{ float: 'left', marginLeft: 10, }}>
            <p style={{ margin: 0, }}>Results:</p>
            {
              result.results.map((_result, index) => {
                return (
                  <p key={index} style={{ margin: 0, }}>{index}) {_result.name}</p>
                )
              })
            }
          </div>
        ) : null
      }
      <div style={{ clear: 'both', content: '', display: 'table', }}></div>
    </div>
  );
}

GeocodeResultMap.propTypes = {
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  where: PropTypes.string.isRequired,
  result: PropTypes.shape({
    results: PropTypes.arrayOf(PropTypes.shape({
      address: PropTypes.shape({
        addressLine: PropTypes.string,
        adminDistrict: PropTypes.string,
        countryRegion: PropTypes.string,
        countryRegionISO2: PropTypes.string,
        district: PropTypes.string,
        formattedAddress: PropTypes.string,
        locality: PropTypes.string,
        postalCode: PropTypes.string,
      }).isRequired,
      bestView: PropTypes.shape({
        center: PropTypes.shape({
          latitude: PropTypes.number.isRequired,
          longitude: PropTypes.number.isRequired,
        }).isRequired,
        height: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
      }).isRequired,
      entityType: PropTypes.string.isRequired,
      location: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
      }).isRequired,
      locations: PropTypes.arrayOf(PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
        name: PropTypes.string,
        precision: PropTypes.oneOf(['Interpolation', 'InterpolationOffset', 'Parcel', 'Rooftop']).isRequired,
      })).isRequired,
      matchCode: PropTypes.oneOf(['Good', 'Ambiguous', 'UpHierarchy']).isRequired,
      matchConfidence: PropTypes.oneOf(['High', 'Medium', 'Low']).isRequired,
      name: PropTypes.string.isRequired,
    })).isRequired,
  }),
  onLoad: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
}

GeocodeResultMap.defaultProps = {
  width: 600,
  height: 400,
  where: '',
  result: undefined,
  onLoad: undefined,
  onError: undefined,
}

const UserInput = ({
  value,
  onChange,
}) => {
  const [_value, setValue] = React.useState(value);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    onChange && onChange(_value);

    return false;
  };

  const handleInputChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input onChange={handleInputChange} type="text" value={_value} />
      <input type="submit" value="Search" />
    </form>
  );
}

UserInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

UserInput.defaultProps = {
  value: '',
  onChange: undefined,
}

const UserInputGeocodeExample = ({
  width,
  height,
  value,
  ...props
}) => {
  const [result, setResult] = React.useState(null);

  const [where, setWhere] = React.useState('');

  const handleGeocodeResultMapError = () => {
    alert('No results found.');

    setResult(null);
  };

  const handleUserInputChange = (_where) => {
    setResult(undefined);

    setWhere(_where);
  };

  return (
    <>
      <UserInput onChange={handleUserInputChange} value={where} />
      <GeocodeResultMap onError={handleGeocodeResultMapError} onLoad={setResult} width={width} height={height} result={result} where={where} {...props} />
    </>
  );
}

UserInputGeocodeExample.propTypes = {
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  value: PropTypes.string.isRequired,
}

UserInputGeocodeExample.defaultProps = {
  width: 600,
  height: 400,
  value: '',
}

export default React.memo(UserInputGeocodeExample)
