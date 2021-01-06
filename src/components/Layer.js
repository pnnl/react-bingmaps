import React from 'react'
import PropTypes from 'prop-types'

import Microsoft from '../hooks-custom/Microsoft'

import {
  MapContext,
} from './Map'

export function useLayerCollection(layer) {
  const map = React.useContext(MapContext);

  React.useEffect(() => {
    if (layer && map) {
      map.layers.insert(layer);

      return () => {
        map.layers.remove(layer);
      };
    }
  }, [
    layer,
    map,
  ]);

  return null;
}

export const LayerContext = React.createContext(null)

const Layer = React.forwardRef(({
  id,
  visible,
  zIndex,
  onClick,
  onClickThrottleInterval,
  onDoubleClick,
  onDoubleClickThrottleInterval,
  onMouseDown,
  onMouseDownThrottleInterval,
  onMouseOut,
  onMouseOutThrottleInterval,
  onMouseOver,
  onMouseOverThrottleInterval,
  onMouseUp,
  onMouseUpThrottleInterval,
  onRightClick,
  onRightClickThrottleInterval,
  metadata,
  children,
}, ref) => {
  const layer = Microsoft.Maps.Layer.useConstructor(id, visible, zIndex, metadata);

  React.useImperativeHandle(ref, () => layer, [
    layer,
  ]);

  Microsoft.Maps.Events.useAddHandler(layer, 'click', onClick, onClickThrottleInterval);
  Microsoft.Maps.Events.useAddHandler(layer, 'dblclick', onDoubleClick, onDoubleClickThrottleInterval);
  Microsoft.Maps.Events.useAddHandler(layer, 'mousedown', onMouseDown, onMouseDownThrottleInterval);
  Microsoft.Maps.Events.useAddHandler(layer, 'mouseout', onMouseOut, onMouseOutThrottleInterval);
  Microsoft.Maps.Events.useAddHandler(layer, 'mouseover', onMouseOver, onMouseOverThrottleInterval);
  Microsoft.Maps.Events.useAddHandler(layer, 'mouseup', onMouseUp, onMouseUpThrottleInterval);
  Microsoft.Maps.Events.useAddHandler(layer, 'rightclick', onRightClick, onRightClickThrottleInterval);

  useLayerCollection(layer);

  return (
    <LayerContext.Provider value={layer}>{children}</LayerContext.Provider>
  );
})

Layer.propTypes = {
  id: PropTypes.string,
  visible: PropTypes.bool.isRequired,
  zIndex: PropTypes.number,
  onClick: PropTypes.func,
  onClickThrottleInterval: PropTypes.number,
  onDoubleClick: PropTypes.func,
  onDoubleClickThrottleInterval: PropTypes.number,
  onMouseDown: PropTypes.func,
  onMouseDownThrottleInterval: PropTypes.number,
  onMouseOut: PropTypes.func,
  onMouseOutThrottleInterval: PropTypes.number,
  onMouseOver: PropTypes.func,
  onMouseOverThrottleInterval: PropTypes.number,
  onMouseUp: PropTypes.func,
  onMouseUpThrottleInterval: PropTypes.number,
  onRightClick: PropTypes.func,
  onRightClickThrottleInterval: PropTypes.number,
  metadata: PropTypes.any,
}

Layer.defaultProps = {
  id: undefined,
  visible: true,
  zIndex: undefined,
  onClick: undefined,
  onClickThrottleInterval: undefined,
  onDoubleClick: undefined,
  onDoubleClickThrottleInterval: undefined,
  onMouseDown: undefined,
  onMouseDownThrottleInterval: undefined,
  onMouseOut: undefined,
  onMouseOutThrottleInterval: undefined,
  onMouseOver: undefined,
  onMouseOverThrottleInterval: undefined,
  onMouseUp: undefined,
  onMouseUpThrottleInterval: undefined,
  onRightClick: undefined,
  onRightClickThrottleInterval: undefined,
  metadata: undefined,
}

export default React.memo(Layer)
