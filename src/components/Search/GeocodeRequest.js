import React from 'react'
import PropTypes from 'prop-types'

import Microsoft from '../../hooks-custom/Microsoft'

import {
  SearchManagerContext,
} from './SearchManager'

export const GeocodeResultContext = React.createContext(null)

const GeocodeRequest = ({
  result,
  bounds,
  count,
  includeCountryIso2,
  includeNeighborhood,
  timeout,
  userData,
  where,
  onLoad,
  onError,
  children,
}) => {
  const options = Microsoft.Maps.Search.GeocodeRequestOptions.useConstructor({
    bounds,
    count,
    includeCountryIso2,
    includeNeighborhood,
    timeout,
    userData,
    where,
    callback: onLoad,
    errorCallback: onError,
  });

  const searchManager = React.useContext(SearchManagerContext);

  React.useEffect(() => {
    if (result) {
      return;
    }

    if (searchManager && options.where && options.callback) {
      searchManager.geocode(options);
    }
  }, [
    result,
    searchManager,
    options,
  ]);

  return (
    <GeocodeResultContext.Provider value={result}>{children}</GeocodeResultContext.Provider>
  );
}

GeocodeRequest.propTypes = {
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
  bounds: PropTypes.shape({
    center: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    }).isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  }),
  count: PropTypes.number,
  includeCountryIso2: PropTypes.bool,
  includeNeighborhood: PropTypes.bool,
  timeout: PropTypes.number,
  userData: PropTypes.any,
  where: PropTypes.string,
  onLoad: PropTypes.func.isRequired,
  onError: PropTypes.func,
}

GeocodeRequest.defaultProps = {
  result: undefined,
  bounds: undefined,
  count: undefined,
  includeCountryIso2: undefined,
  includeNeighborhood: undefined,
  timeout: undefined,
  userData: undefined,
  where: undefined,
  onLoad: undefined,
  onError: undefined,
}

export default React.memo(GeocodeRequest)
