import React from 'react'
import PropTypes from 'prop-types'

import Microsoft from '../../hooks-custom/Microsoft'

import {
  MapContext,
} from '../Map'

export const DrawingToolsContext = React.createContext(null)

const DrawingTools = React.forwardRef(({
  onDrawingChanged,
  onDrawingChangedThrottleInterval,
  onDrawingChanging,
  onDrawingChangingThrottleInterval,
  onDrawingEnded,
  onDrawingEndedThrottleInterval,
  onDrawingModeChanged,
  onDrawingModeChangedThrottleInterval,
  onDrawingStarted,
  onDrawingStartedThrottleInterval,
  children,
}, ref) => {
  const map = React.useContext(MapContext);

  const drawingTools = Microsoft.Maps.DrawingTools.useConstructor(map);

  React.useImperativeHandle(ref, () => drawingTools, [
    drawingTools,
  ]);

  Microsoft.Maps.Events.useAddHandler(drawingTools, 'drawingChanged', onDrawingChanged, onDrawingChangedThrottleInterval);
  Microsoft.Maps.Events.useAddHandler(drawingTools, 'drawingChanging', onDrawingChanging, onDrawingChangingThrottleInterval);
  Microsoft.Maps.Events.useAddHandler(drawingTools, 'drawingEnded', onDrawingEnded, onDrawingEndedThrottleInterval);
  Microsoft.Maps.Events.useAddHandler(drawingTools, 'drawingModeChanged', onDrawingModeChanged, onDrawingModeChangedThrottleInterval);
  Microsoft.Maps.Events.useAddHandler(drawingTools, 'drawingStarted', onDrawingStarted, onDrawingStartedThrottleInterval);

  return (
    <DrawingToolsContext.Provider value={drawingTools}>{children}</DrawingToolsContext.Provider>
  );
})

DrawingTools.propTypes = {
  onDrawingChanged: PropTypes.func,
  onDrawingChangedThrottleInterval: PropTypes.number,
  onDrawingChanging: PropTypes.func,
  onDrawingChangingThrottleInterval: PropTypes.number,
  onDrawingEnded: PropTypes.func,
  onDrawingEndedThrottleInterval: PropTypes.number,
  onDrawingModeChanged: PropTypes.func,
  onDrawingModeChangedThrottleInterval: PropTypes.number,
  onDrawingStarted: PropTypes.func,
  onDrawingStartedThrottleInterval: PropTypes.number,
}

DrawingTools.defaultProps = {
  onDrawingChanged: undefined,
  onDrawingChangedThrottleInterval: undefined,
  onDrawingChanging: undefined,
  onDrawingChangingThrottleInterval: undefined,
  onDrawingEnded: undefined,
  onDrawingEndedThrottleInterval: undefined,
  onDrawingModeChanged: undefined,
  onDrawingModeChangedThrottleInterval: undefined,
  onDrawingStarted: undefined,
  onDrawingStartedThrottleInterval: undefined,
}

export default React.memo(DrawingTools)
