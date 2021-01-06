import React from 'react'
import PropTypes from 'prop-types'

import Microsoft from '../../hooks-custom/Microsoft'

import {
  DrawingToolsContext,
} from './DrawingTools'

export const DrawingManagerContext = React.createContext(null)

const DrawingManager = React.forwardRef(({
  drawingBarActions,
  drawingBarVisible,
  drawingMode,
  fillColor,
  strokeColor,
  onDisposed,
  onDisposedThrottleInterval,
  onDrawingChanged,
  onDrawingChangedThrottleInterval,
  onDrawingChanging,
  onDrawingChangingThrottleInterval,
  onDrawingEnded,
  onDrawingEndedThrottleInterval,
  onDrawingErased,
  onDrawingErasedThrottleInterval,
  onDrawingModeChanged,
  onDrawingModeChangedThrottleInterval,
  onDrawingStarted,
  onDrawingStartedThrottleInterval,
  children,
}, ref) => {
  const drawingTools = React.useContext(DrawingToolsContext);

  const drawingManager = Microsoft.Maps.DrawingTools.DrawingManager.useConstructor(drawingTools, {
    drawingBarActions,
    fillColor,
    strokeColor,
  }, drawingMode, drawingBarVisible);

  React.useImperativeHandle(ref, () => drawingManager, [
    drawingManager,
  ]);

  Microsoft.Maps.Events.useAddHandler(drawingManager, 'disposed', onDisposed, onDisposedThrottleInterval);
  Microsoft.Maps.Events.useAddHandler(drawingManager, 'drawingChanged', onDrawingChanged, onDrawingChangedThrottleInterval);
  Microsoft.Maps.Events.useAddHandler(drawingManager, 'drawingChanging', onDrawingChanging, onDrawingChangingThrottleInterval);
  Microsoft.Maps.Events.useAddHandler(drawingManager, 'drawingEnded', onDrawingEnded, onDrawingEndedThrottleInterval);
  Microsoft.Maps.Events.useAddHandler(drawingManager, 'drawingErased', onDrawingErased, onDrawingErasedThrottleInterval);
  Microsoft.Maps.Events.useAddHandler(drawingManager, 'drawingModeChanged', onDrawingModeChanged, onDrawingModeChangedThrottleInterval);
  Microsoft.Maps.Events.useAddHandler(drawingManager, 'drawingStarted', onDrawingStarted, onDrawingStartedThrottleInterval);

  return (
    <DrawingManagerContext.Provider value={drawingManager}>{children}</DrawingManagerContext.Provider>
  );
})

DrawingManager.propTypes = {
  drawingBarActions: PropTypes.arrayOf(PropTypes.oneOf(['all', 'createShapes', 'edit', 'editShapes', 'erase', 'fillStyle', 'point', 'polygon', 'polyline', 'strokeStyle', 'styleShapes'])).isRequired,
  drawingBarVisible: PropTypes.bool.isRequired,
  drawingMode: PropTypes.oneOf(['edit', 'erase', 'none', 'polygon', 'polyline', 'pushpin']).isRequired,
  fillColor: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      a: PropTypes.number.isRequired,
      r: PropTypes.number.isRequired,
      g: PropTypes.number.isRequired,
      b: PropTypes.number.isRequired,
    }),
  ]),
  strokeColor: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      a: PropTypes.number.isRequired,
      r: PropTypes.number.isRequired,
      g: PropTypes.number.isRequired,
      b: PropTypes.number.isRequired,
    }),
  ]),
  onDisposed: PropTypes.func,
  onDisposedThrottleInterval: PropTypes.number,
  onDrawingChanged: PropTypes.func,
  onDrawingChangedThrottleInterval: PropTypes.number,
  onDrawingChanging: PropTypes.func,
  onDrawingChangingThrottleInterval: PropTypes.number,
  onDrawingEnded: PropTypes.func,
  onDrawingEndedThrottleInterval: PropTypes.number,
  onDrawingErased: PropTypes.func,
  onDrawingErasedThrottleInterval: PropTypes.number,
  onDrawingModeChanged: PropTypes.func,
  onDrawingModeChangedThrottleInterval: PropTypes.number,
  onDrawingStarted: PropTypes.func,
  onDrawingStartedThrottleInterval: PropTypes.number,
}

DrawingManager.defaultProps = {
  drawingBarActions: ['all'],
  drawingBarVisible: true,
  drawingMode: 'none',
  fillColor: undefined,
  strokeColor: undefined,
  onDisposed: undefined,
  onDisposedThrottleInterval: undefined,
  onDrawingChanged: undefined,
  onDrawingChangedThrottleInterval: undefined,
  onDrawingChanging: undefined,
  onDrawingChangingThrottleInterval: undefined,
  onDrawingEnded: undefined,
  onDrawingEndedThrottleInterval: undefined,
  onDrawingErased: undefined,
  onDrawingErasedThrottleInterval: undefined,
  onDrawingModeChanged: undefined,
  onDrawingModeChangedThrottleInterval: undefined,
  onDrawingStarted: undefined,
  onDrawingStartedThrottleInterval: undefined,
}

export default React.memo(DrawingManager)
