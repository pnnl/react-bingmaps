import React from 'react'
import PropTypes from 'prop-types'

import Microsoft from '../hooks-custom/Microsoft'

import {
  MapContext,
} from './Map'

const Infobox = React.forwardRef(({
  actions,
  closeDelayTime,
  description,
  htmlContent,
  location,
  maxHeight,
  maxWidth,
  offset,
  showCloseButton,
  showPointer,
  title,
  visible,
  zIndex,
  onClick,
  onClickThrottleInterval,
  onInfoboxChanged,
  onInfoboxChangedThrottleInterval,
  onMouseEnter,
  onMouseEnterThrottleInterval,
  onMouseLeave,
  onMouseLeaveThrottleInterval,
}, ref) => {
  const map = React.useContext(MapContext);

  const infobox = Microsoft.Maps.Infobox.useConstructor(location, {
    actions,
    closeDelayTime,
    description,
    htmlContent,
    location,
    maxHeight,
    maxWidth,
    offset,
    showCloseButton,
    showPointer,
    title,
    visible,
    zIndex,
  }, map);

  React.useImperativeHandle(ref, () => infobox, [
    infobox,
  ]);

  Microsoft.Maps.Events.useAddHandler(infobox, 'click', onClick, onClickThrottleInterval);
  Microsoft.Maps.Events.useAddHandler(infobox, 'infoboxChanged', onInfoboxChanged, onInfoboxChangedThrottleInterval);
  Microsoft.Maps.Events.useAddHandler(infobox, 'mouseenter', onMouseEnter, onMouseEnterThrottleInterval);
  Microsoft.Maps.Events.useAddHandler(infobox, 'mouseleave', onMouseLeave, onMouseLeaveThrottleInterval);

  return null;
})

Infobox.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.exact({
    label: PropTypes.string.isRequired,
    eventHandler: PropTypes.func.isRequired,
  })).isRequired,
  closeDelayTime: PropTypes.number,
  description: PropTypes.string,
  htmlContent: PropTypes.string,
  location: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }).isRequired,
  maxHeight: PropTypes.number,
  maxWidth: PropTypes.number,
  offset: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
  showCloseButton: PropTypes.bool,
  showPointer: PropTypes.bool,
  title: PropTypes.string,
  visible: PropTypes.bool.isRequired,
  zIndex: PropTypes.number,
  onClick: PropTypes.func,
  onClickThrottleInterval: PropTypes.number,
  onInfoboxChanged: PropTypes.func,
  onInfoboxChangedThrottleInterval: PropTypes.number,
  onMouseEnter: PropTypes.func,
  onMouseEnterThrottleInterval: PropTypes.number,
  onMouseLeave: PropTypes.func,
  onMouseLeaveThrottleInterval: PropTypes.number,
}

Infobox.defaultProps = {
  actions: [],
  closeDelayTime: undefined,
  description: undefined,
  htmlContent: undefined,
  location: undefined,
  maxHeight: undefined,
  maxWidth: undefined,
  offset: undefined,
  showCloseButton: undefined,
  showPointer: undefined,
  title: undefined,
  visible: true,
  zIndex: undefined,
  onClick: undefined,
  onClickThrottleInterval: undefined,
  onInfoboxChanged: undefined,
  onInfoboxChangedThrottleInterval: undefined,
  onMouseEnter: undefined,
  onMouseEnterThrottleInterval: undefined,
  onMouseLeave: undefined,
  onMouseLeaveThrottleInterval: undefined,
}

export default React.memo(Infobox)
