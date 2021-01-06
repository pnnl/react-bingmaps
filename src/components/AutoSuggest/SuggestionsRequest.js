import React from 'react'
import PropTypes from 'prop-types'

import Microsoft from '../../hooks-custom/Microsoft'

import {
  AutosuggestManagerContext,
} from './AutosuggestManager'

export const SuggestionsResultContext = React.createContext(null)

const SuggestionsRequest = ({
  suggestions,
  query,
  onLoad,
  children,
}) => {
  const autosuggestManager = React.useContext(AutosuggestManagerContext);

  React.useEffect(() => {
    if (suggestions) {
      return;
    }

    if (autosuggestManager && query && onLoad) {
      autosuggestManager.getSuggestions(query, onLoad);
    }
  }, [
    suggestions,
    query,
    onLoad,
    autosuggestManager,
  ]);

  return (
    <SuggestionsResultContext.Provider value={suggestions}>{children}</SuggestionsResultContext.Provider>
  );
}

SuggestionsRequest.propTypes = {
  suggestions: PropTypes.arrayOf(PropTypes.shape({
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
    }),
    entityId: PropTypes.string.isRequired,
    entityType: PropTypes.string.isRequired,
    entitySubType: PropTypes.string,
    subtitle: PropTypes.string.isRequired,
    formattedSuggestion: PropTypes.string.isRequired,
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    }),
    title: PropTypes.string.isRequired,
  })),
  query: PropTypes.string.isRequired,
  onLoad: PropTypes.func.isRequired,
}

SuggestionsRequest.defaultProps = {
  suggestions: undefined,
  query: '',
  onLoad: undefined,
}

export default React.memo(SuggestionsRequest)
