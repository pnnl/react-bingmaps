import React from 'react'
import PropTypes from 'prop-types'

import {
  $ApiContext,
} from '../Api'

import SuggestionsRequest from './SuggestionsRequest'

function getSuggestionImgClassName(n, t, i, r, u) {
  if (n && (((n.entityType === 's:BusinessEntityType') && (n.entitySubType === 'BusinessCategory')) || (n.entityType === 'SearchAction'))) {
    return r ? 'as_img maps_searchsvg' : 'as_img maps_search';
  } else if (n && (n.entityType === 's:LocalBusiness') && n.entitySubType) {
    return r ? 'as_img maps_businesssvg' : (u ? 'as_img maps_address' : 'as_img maps_business');
  } else if (n && n.entityType && ((n.entityType.indexOf('Place') >= 0) || (n.entityType.indexOf('PostalAddress') >= 0))) {
    return r ? 'as_img maps_addresssvg' : 'as_img maps_address';
  } else if (n && ((i && (n.title === i.L_Work)) || (n.entitySubType === 'Work'))) {
    return r ? 'as_img maps_worksvg' : 'as_img maps_work';
  } else if (n && ((i && (n.title === i.L_Home)) || (n.entitySubType === 'Home'))) {
    return r ? 'as_img maps_homesvg' : 'as_img maps_home';
  } else if (n && (n.entityType === 'Favorite')) {
    return r ? 'as_img maps_favsvg' : 'as_img maps_favorite';
  } else if (n && (n.entityType === 'History') || (t && (n.entityType === t.HistorySuggestionType))) {
    return 'as_img maps_history';
  } else if (n && (i && (n.title === i.L_MyLocation))) {
    return 'as_img maps_mylocation';
  } else if (n && n.entityId && (n.entityId.indexOf('local_geoid') < 0)) {
    return r ? 'as_img maps_businesssvg' : (u ? 'as_img maps_address' : 'as_img maps_business');
  } else {
    return r ? 'as_img maps_searchsvg' : 'as_img maps_search';
  }
}

export default function attachAutosuggest(Control) {
  const ControlWithAutosuggest = ({
    value,
    onChange,
    onSuggestionItemSelected,
    ...props
  }) => {
    const $api = React.useContext($ApiContext);

    const _getSuggestionImgClassName = React.useMemo(() => {
      if ($api) {
        const t = $api;
        const i = t.ResourceManager.CommonControls;
        const r = t.GlobalConfig.features.autosuggest.showXSRColors && (t.GlobalConfig.isMapsVertical || t.GlobalConfig.features.autosuggest.isMobileShellAutosuggest);
        const u = !t.GlobalConfig.features.autosuggest.showXSRIcons && t.GlobalConfig.isMapsVertical;

        return (n) => {
          return getSuggestionImgClassName(n, t, i, r, u);
        };
      } else {
        return undefined;
      }
    }, [
      $api,
    ]);

    const ref = React.useRef(null);

    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = React.useState(-1);

    const [autoSuggestContainerVisible, setSuggestionContainerVisible] = React.useState(false);

    const [suggestions, setSuggestions] = React.useState(null);

    const inPrivateLinkVisible = false

    const handleInPrivateLinkClick = (event) => {
      event.preventDefault();

      // window.location.href = undefined;

      return false;
    }

    const handleSuggestLinkMouseDownFor = (suggestion, index) => {
      return (event) => {
        event.preventDefault();

        // setSelectedSuggestionIndex(index);
        setSelectedSuggestionIndex(-1);

        setSuggestionContainerVisible(false);
        setSuggestions(null);

        if (ref.current) {
          ref.current.blur();
        }

        onChange && onChange(suggestion.formattedSuggestion);
        onSuggestionItemSelected && onSuggestionItemSelected(suggestion);

        return false;
      };
    };

    const handleControlBlur = () => {
      setSuggestionContainerVisible(false);
    };

    const handleControlChange = (event) => {
      const _value = event.target.value;

      setSelectedSuggestionIndex(-1);

      setSuggestionContainerVisible(_value.trim().length > 0);
      setSuggestions(null);

      onChange && onChange(_value);
    };

    const handleControlFocus = () => {
      setSelectedSuggestionIndex(-1);

      setSuggestionContainerVisible(true);
    }

    const handleControlKeyDown = (event) => {
      if (suggestions) {
        switch (event.keyCode) {
        case 13: // Enter
          if (selectedSuggestionIndex === -1) {
            setSuggestionContainerVisible(true);
          } else {
            const selectedSuggestion = suggestions[selectedSuggestionIndex];

            if (selectedSuggestion) {
              handleSuggestLinkMouseDownFor(selectedSuggestion, selectedSuggestionIndex)(event);
            }
          }

          break;
        // case 27: // Escape
        //   setSuggestionContainerVisible(false);
        //
        //   break;
        case 38: // ArrowUp
          if (selectedSuggestionIndex >= 0) {
            setSelectedSuggestionIndex(selectedSuggestionIndex - 1);
          }

          break;
        case 40: // ArrowDown
          if (selectedSuggestionIndex === -1) {
            if (suggestions.length > 0) {
              setSelectedSuggestionIndex(0);

              setSuggestionContainerVisible(true);
            }
          } else if (selectedSuggestionIndex < (suggestions.length - 1)) {
            setSelectedSuggestionIndex(selectedSuggestionIndex + 1);
          }

          break;
        default:
          break;
        }
      };

      return true;
    };

    const uniqueDomId = `${Date.now()}${Math.random()}`.replace('.', '');

    const autoSuggestContainerDomId = `as_containerSearch_${uniqueDomId}a`;

    const suggestionDomIds = suggestions ? suggestions.map((suggestion, index) => `${uniqueDomId}a-as-${index}`) : [];

    return (
      <React.Fragment>
        <Control
          ref={ref}
          onBlur={handleControlBlur}
          onChange={handleControlChange}
          onFocus={handleControlFocus}
          onKeyDown={handleControlKeyDown}
          aria-activedescendant={suggestionDomIds[selectedSuggestionIndex]}
          aria-autocomplete="both"
          aria-controls={autoSuggestContainerDomId}
          aria-expanded={autoSuggestContainerVisible}
          aria-owns={autoSuggestContainerDomId}
          value={value}
          {...props}
        />
        <SuggestionsRequest
          onLoad={setSuggestions}
          query={value}
          suggestions={suggestions}
        />
        <div className="MicrosoftMap">
          <div id={autoSuggestContainerDomId} className="as_container_search as_container" style={{ display: (autoSuggestContainerVisible ? 'block' : 'none'), }}>
            {
              (suggestions === null) ? (
                null
              ) : (suggestions.length === 0) ? (
                null
              ) : (
                <React.Fragment>
                  <div className="b_cards asOuterContainer">
                    <div style={{ display: 'none', }}>
                      <p className="b_secondaryText nearBySearchText">{null}</p>
                    </div>
                    <ul>
                      {
                        suggestions.map((suggestion, index) => {
                          return (
                            <li key={index} id={suggestionDomIds[index]} aria-selected={index === selectedSuggestionIndex} role="option">
                              <a onMouseDown={handleSuggestLinkMouseDownFor(suggestion, index)} className={`suggestLink ${(index === selectedSuggestionIndex) ? 'selected' : null}`} href="/">
                                <div className="as_suggestion_root_inside">
                                  <div className={_getSuggestionImgClassName(suggestion)} style={{ height: 35, }}></div>
                                  <div className="as_lines_root">
                                    <p className="line1">{suggestion.title}</p>
                                    <p className="line2">{suggestion.subtitle}</p>
                                  </div>
                                </div>
                              </a>
                            </li>
                          )
                        })
                      }
                      <li className="as_bpr" role="option" style={{ display: (inPrivateLinkVisible ? 'block' : 'none'), }}>
                        <div className="as_bprtxt">
                          <div className="as_bprtxt_line1">Your search history and site cookies aren't saved.</div>
                          <a onClick={handleInPrivateLinkClick} className="as_bprlink" href="/">Learn more about InPrivate Search</a>
                        </div>
                      </li>
                    </ul>
                    <div className="bingLogoContainer" style={{ display: 'inline', }}>
                      <span className="bingLogoLight"></span>
                    </div>
                  </div>
                  <div class="clear"></div>
                </React.Fragment>
              )
            }
          </div>
        </div>
      </React.Fragment>
    );
  };

  ControlWithAutosuggest.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onSuggestionItemSelected: PropTypes.func.isRequired,
  };

  ControlWithAutosuggest.defaultProps = {
    value: '',
    onChange: undefined,
    onSuggestionItemSelected: undefined,
  };

  ControlWithAutosuggest.displayName = `attachAutosuggest(${Control.displayName || Control.name})`;

  return React.memo(ControlWithAutosuggest);
}
