import React from 'react'
import PropTypes from 'prop-types'

import Microsoft from '../../hooks-custom/Microsoft'

import {
  MapContext,
} from '../Map'

export const AutosuggestManagerContext = React.createContext(null)

const AutosuggestManager = React.forwardRef(({
  addressSuggestions,
  autoDetectLocation,
  bounds,
  countryCode,
  maxResults,
  placeSuggestions,
  useMapView,
  userLocation,
  children,
}, ref) => {
  const map = React.useContext(MapContext);

  const autosuggestManager = Microsoft.Maps.AutosuggestManager.useConstructor({
    addressSuggestions,
    autoDetectLocation,
    bounds,
    countryCode,
    map,
    maxResults,
    placeSuggestions,
    useMapView,
    userLocation,
  });

  React.useImperativeHandle(ref, () => autosuggestManager, [
    autosuggestManager,
  ]);

  return (
    <AutosuggestManagerContext.Provider value={autosuggestManager}>{children}</AutosuggestManagerContext.Provider>
  );
})

AutosuggestManager.propTypes = {
  addressSuggestions: PropTypes.bool,
  autoDetectLocation: PropTypes.bool,
  bounds: PropTypes.shape({
    center: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    }).isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  }),
  countryCode: PropTypes.string,
  maxResults: PropTypes.number,
  placeSuggestions: PropTypes.bool,
  useMapView: PropTypes.bool,
  userLocation: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }),
}

AutosuggestManager.defaultProps = {
  addressSuggestions: undefined,
  autoDetectLocation: undefined,
  bounds: undefined,
  countryCode: undefined,
  maxResults: undefined,
  placeSuggestions: undefined,
  useMapView: undefined,
  userLocation: undefined,
}

export default React.memo(AutosuggestManager)
