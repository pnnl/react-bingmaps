import React from 'react'
import PropTypes from 'prop-types'

import Microsoft from '../../hooks-custom/Microsoft'

import {
  SearchManagerContext,
} from './SearchManager'

export const PlaceResultContext = React.createContext(null)

const ReverseGeocodeRequest = ({
  result,
  includeCountryIso2,
  includeEntityTypes,
  includeNeighborhood,
  timeout,
  userData,
  location,
  onLoad,
  onError,
  children,
}) => {
  const options = Microsoft.Maps.Search.ReverseGeocodeRequestOptions.useConstructor({
    includeCountryIso2,
    includeEntityTypes,
    includeNeighborhood,
    timeout,
    userData,
    location,
    callback: onLoad,
    errorCallback: onError,
  });

  const searchManager = React.useContext(SearchManagerContext);

  React.useEffect(() => {
    if (result) {
      return
    }

    if (searchManager && options.location && options.callback) {
      searchManager.reverseGeocode(options)
    }
  }, [
    result,
    searchManager,
    options,
  ]);

  return (
    <PlaceResultContext.Provider value={result}>{children}</PlaceResultContext.Provider>
  );
}

ReverseGeocodeRequest.propTypes = {
  result: PropTypes.shape({
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
  }),
  includeCountryIso2: PropTypes.bool,
  includeEntityTypes: PropTypes.arrayOf(PropTypes.oneOf(['Address', 'Neighborhood', 'PopulatedPlace', 'Postcode1', 'AdminDivision1', 'AdminDivision2', 'CountryRegion'])),
  includeNeighborhood: PropTypes.bool,
  timeout: PropTypes.number,
  userData: PropTypes.any,
  location: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }),
  onLoad: PropTypes.func.isRequired,
  onError: PropTypes.func,
}

ReverseGeocodeRequest.defaultProps = {
  result: undefined,
  includeCountryIso2: undefined,
  includeEntityTypes: undefined,
  includeNeighborhood: undefined,
  timeout: undefined,
  userData: undefined,
  location: undefined,
  onLoad: undefined,
  onError: undefined,
}

export default React.memo(ReverseGeocodeRequest)
