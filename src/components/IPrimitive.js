import React from 'react'
import PropTypes from 'prop-types'

import Microsoft from '../hooks-custom/Microsoft'

import {
  ApiContext,
} from './Api'
import DrawingManager, {
  DrawingManagerContext,
} from './DrawingTools/DrawingManager'
import {
  DrawingToolsContext,
} from './DrawingTools/DrawingTools'
import {
  LayerContext,
} from './Layer'
import {
  MapContext,
} from './Map'

export function useEntityCollection(shape, editable) {
  const drawingManager = React.useContext(DrawingManagerContext);

  const drawingTools = React.useContext(DrawingToolsContext);

  const layer = React.useContext(LayerContext);

  const map = React.useContext(MapContext);

  React.useEffect(() => {
    if (shape) {
      if (drawingTools) {
        if (editable) {
          drawingTools.edit(shape);

          return () => {
            drawingTools.finish();
          };
        } else if (drawingManager) {
          drawingManager.add(shape);

          return () => {
            drawingManager.remove(shape);
          };
        }
      } else if (layer) {
        layer.add(shape);

        return () => {
          layer.remove(shape);
        };
      } else if (map) {
        map.entities.push(shape);

        return () => {
          map.entities.remove(shape);
        };
      }
    }
  }, [
    shape,
    editable,
    drawingManager,
    drawingTools,
    layer,
    map,
  ]);

  return null;
}

const Polygon_ = React.forwardRef(({
  rings,
  cursor,
  editable,
  generalizable,
  fillColor,
  strokeColor,
  strokeDashArray,
  strokeThickness,
  visible,
  onChanged,
  onChangedThrottleInterval,
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
  metadata,
}, ref) => {
  const polygon = Microsoft.Maps.Polygon.useConstructor(rings, {
    cursor,
    generalizable,
    fillColor,
    strokeColor,
    strokeDashArray,
    strokeThickness,
    visible,
  }, metadata);

  React.useImperativeHandle(ref, () => polygon, [
    polygon,
  ]);

  Microsoft.Maps.Events.useAddHandler(polygon, 'changed', onChanged, onChangedThrottleInterval);
  Microsoft.Maps.Events.useAddHandler(polygon, 'click', onClick, onClickThrottleInterval);
  Microsoft.Maps.Events.useAddHandler(polygon, 'dblclick', onDoubleClick, onDoubleClickThrottleInterval);
  Microsoft.Maps.Events.useAddHandler(polygon, 'mousedown', onMouseDown, onMouseDownThrottleInterval);
  Microsoft.Maps.Events.useAddHandler(polygon, 'mouseout', onMouseOut, onMouseOutThrottleInterval);
  Microsoft.Maps.Events.useAddHandler(polygon, 'mouseover', onMouseOver, onMouseOverThrottleInterval);
  Microsoft.Maps.Events.useAddHandler(polygon, 'mouseup', onMouseUp, onMouseUpThrottleInterval);

  useEntityCollection(polygon, editable);

  return null;
})

Polygon_.displayName = 'Polygon'

Polygon_.propTypes = {
  rings: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    }))),
    PropTypes.arrayOf(PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    })),
  ]).isRequired,
  cursor: PropTypes.string,
  editable: PropTypes.bool.isRequired,
  generalizable: PropTypes.bool,
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
  strokeDashArray: PropTypes.arrayOf(PropTypes.number),
  strokeThickness: PropTypes.number,
  visible: PropTypes.bool.isRequired,
  onChanged: PropTypes.func,
  onChangedThrottleInterval: PropTypes.number,
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
  metadata: PropTypes.any,
}

Polygon_.defaultProps = {
  rings: [],
  cursor: undefined,
  editable: false,
  generalizable: undefined,
  fillColor: undefined,
  strokeColor: undefined,
  strokeDashArray: undefined,
  strokeThickness: undefined,
  visible: true,
  onChanged: undefined,
  onChangedThrottleInterval: undefined,
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
  metadata: undefined,
}

const Polyline_ = React.forwardRef(({
  locations,
  cursor,
  editable,
  generalizable,
  fillColor,
  strokeColor,
  strokeDashArray,
  strokeThickness,
  visible,
  onChanged,
  onChangedThrottleInterval,
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
  metadata,
}, ref) => {
  const polyline = Microsoft.Maps.Polyline.useConstructor(locations, {
    cursor,
    generalizable,
    fillColor,
    strokeColor,
    strokeDashArray,
    strokeThickness,
    visible,
  }, metadata);

  React.useImperativeHandle(ref, () => polyline, [
    polyline,
  ]);

  Microsoft.Maps.Events.useAddHandler(polyline, 'changed', onChanged, onChangedThrottleInterval);
  Microsoft.Maps.Events.useAddHandler(polyline, 'click', onClick, onClickThrottleInterval);
  Microsoft.Maps.Events.useAddHandler(polyline, 'dblclick', onDoubleClick, onDoubleClickThrottleInterval);
  Microsoft.Maps.Events.useAddHandler(polyline, 'mousedown', onMouseDown, onMouseDownThrottleInterval);
  Microsoft.Maps.Events.useAddHandler(polyline, 'mouseout', onMouseOut, onMouseOutThrottleInterval);
  Microsoft.Maps.Events.useAddHandler(polyline, 'mouseover', onMouseOver, onMouseOverThrottleInterval);
  Microsoft.Maps.Events.useAddHandler(polyline, 'mouseup', onMouseUp, onMouseUpThrottleInterval);

  useEntityCollection(polyline, editable);

  return null;
})

Polyline_.displayName = 'Polyline'

Polyline_.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  })).isRequired,
  cursor: PropTypes.string,
  editable: PropTypes.bool.isRequired,
  generalizable: PropTypes.bool,
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
  strokeDashArray: PropTypes.arrayOf(PropTypes.number),
  strokeThickness: PropTypes.number,
  visible: PropTypes.bool.isRequired,
  onChanged: PropTypes.func,
  onChangedThrottleInterval: PropTypes.number,
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
  metadata: PropTypes.any,
}

Polyline_.defaultProps = {
  locations: [],
  cursor: undefined,
  editable: false,
  generalizable: undefined,
  fillColor: undefined,
  strokeColor: undefined,
  strokeDashArray: undefined,
  strokeThickness: undefined,
  visible: true,
  onChanged: undefined,
  onChangedThrottleInterval: undefined,
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
  metadata: undefined,
}

const Pushpin_ = React.forwardRef(({
  location,
  anchor,
  color,
  cursor,
  draggable,
  editable,
  enableClickedStyle,
  enableHoverStyle,
  icon,
  roundClickableArea,
  subTitle,
  title,
  text,
  textOffset,
  visible,
  onChanged,
  onChangedThrottleInterval,
  onClick,
  onClickThrottleInterval,
  onDoubleClick,
  onDoubleClickThrottleInterval,
  onDrag,
  onDragThrottleInterval,
  onDragEnd,
  onDragEndThrottleInterval,
  onDragStart,
  onDragStartThrottleInterval,
  onMouseDown,
  onMouseDownThrottleInterval,
  onMouseOut,
  onMouseOutThrottleInterval,
  onMouseOver,
  onMouseOverThrottleInterval,
  onMouseUp,
  onMouseUpThrottleInterval,
  metadata,
}, ref) => {
  const pushpin = Microsoft.Maps.Pushpin.useConstructor(location, {
    anchor,
    color,
    cursor,
    draggable,
    enableClickedStyle,
    enableHoverStyle,
    icon,
    roundClickableArea,
    subTitle,
    title,
    text,
    textOffset,
    visible,
  }, metadata);

  React.useImperativeHandle(ref, () => pushpin, [
    pushpin,
  ]);

  Microsoft.Maps.Events.useAddHandler(pushpin, 'changed', onChanged, onChangedThrottleInterval);
  Microsoft.Maps.Events.useAddHandler(pushpin, 'click', onClick, onClickThrottleInterval);
  Microsoft.Maps.Events.useAddHandler(pushpin, 'dblclick', onDoubleClick, onDoubleClickThrottleInterval);
  Microsoft.Maps.Events.useAddHandler(pushpin, 'drag', onDrag, onDragThrottleInterval);
  Microsoft.Maps.Events.useAddHandler(pushpin, 'dragend', onDragEnd, onDragEndThrottleInterval);
  Microsoft.Maps.Events.useAddHandler(pushpin, 'dragstart', onDragStart, onDragStartThrottleInterval);
  Microsoft.Maps.Events.useAddHandler(pushpin, 'mousedown', onMouseDown, onMouseDownThrottleInterval);
  Microsoft.Maps.Events.useAddHandler(pushpin, 'mouseout', onMouseOut, onMouseOutThrottleInterval);
  Microsoft.Maps.Events.useAddHandler(pushpin, 'mouseover', onMouseOver, onMouseOverThrottleInterval);
  Microsoft.Maps.Events.useAddHandler(pushpin, 'mouseup', onMouseUp, onMouseUpThrottleInterval);

  useEntityCollection(pushpin, editable);

  return null;
})

Pushpin_.displayName = 'Pushpin'

Pushpin_.propTypes = {
  location: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }).isRequired,
  anchor: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
  color: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      a: PropTypes.number.isRequired,
      r: PropTypes.number.isRequired,
      g: PropTypes.number.isRequired,
      b: PropTypes.number.isRequired,
    }),
  ]),
  cursor: PropTypes.string,
  draggable: PropTypes.bool,
  editable: PropTypes.bool.isRequired,
  enableClickedStyle: PropTypes.bool,
  enableHoverStyle: PropTypes.bool,
  icon: PropTypes.string,
  roundClickableArea: PropTypes.bool,
  subTitle: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
  textOffset: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
  visible: PropTypes.bool.isRequired,
  onChanged: PropTypes.func,
  onChangedThrottleInterval: PropTypes.number,
  onClick: PropTypes.func,
  onClickThrottleInterval: PropTypes.number,
  onDoubleClick: PropTypes.func,
  onDoubleClickThrottleInterval: PropTypes.number,
  onDrag: PropTypes.func,
  onDragThrottleInterval: PropTypes.number,
  onDragEnd: PropTypes.func,
  onDragEndThrottleInterval: PropTypes.number,
  onDragStart: PropTypes.func,
  onDragStartThrottleInterval: PropTypes.number,
  onMouseDown: PropTypes.func,
  onMouseDownThrottleInterval: PropTypes.number,
  onMouseOut: PropTypes.func,
  onMouseOutThrottleInterval: PropTypes.number,
  onMouseOver: PropTypes.func,
  onMouseOverThrottleInterval: PropTypes.number,
  onMouseUp: PropTypes.func,
  onMouseUpThrottleInterval: PropTypes.number,
  metadata: PropTypes.any,
}

Pushpin_.defaultProps = {
  location: {
    latitude: undefined,
    longitude: undefined,
  },
  anchor: undefined,
  color: undefined,
  cursor: undefined,
  draggable: undefined,
  editable: false,
  enableClickedStyle: undefined,
  enableHoverStyle: undefined,
  icon: undefined,
  roundClickableArea: undefined,
  subTitle: undefined,
  title: undefined,
  text: undefined,
  textOffset: undefined,
  visible: true,
  onChanged: undefined,
  onChangedThrottleInterval: undefined,
  onClick: undefined,
  onClickThrottleInterval: undefined,
  onDoubleClick: undefined,
  onDoubleClickThrottleInterval: undefined,
  onDrag: undefined,
  onDragThrottleInterval: undefined,
  onDragEnd: undefined,
  onDragEndThrottleInterval: undefined,
  onDragStart: undefined,
  onDragStartThrottleInterval: undefined,
  onMouseDown: undefined,
  onMouseDownThrottleInterval: undefined,
  onMouseOut: undefined,
  onMouseOutThrottleInterval: undefined,
  onMouseOver: undefined,
  onMouseOverThrottleInterval: undefined,
  onMouseUp: undefined,
  onMouseUpThrottleInterval: undefined,
  metadata: undefined,
}

export const Polygon = React.memo(Polygon_)

export const Polyline = React.memo(Polyline_)

export const Pushpin = React.memo(Pushpin_)

const IPrimitive = React.forwardRef(({
  shape,
  ...props
}, ref) => {
  const api = React.useContext(ApiContext);

  return React.useMemo(() => {
    if (api && api.Maps) {
      const componentForShape = (currentShape, index) => {
        switch (typeof currentShape) {
          case 'object':
            if (api.Maps.Polygon && (currentShape instanceof api.Maps.Polygon)) {
              return (
                <Polygon
                  ref={ref}
                  key={index}
                  rings={currentShape.getRings()}
                  cursor={currentShape.getCursor()}
                  generalizable={currentShape.getGeneralizable()}
                  fillColor={currentShape.getFillColor()}
                  strokeColor={currentShape.getStrokeColor()}
                  strokeDashArray={currentShape.getStrokeDashArray()}
                  strokeThickness={currentShape.getStrokeThickness()}
                  visible={currentShape.getVisible()}
                  metadata={currentShape.metadata}
                  {...props}
                />
              );
            } else if (api.Maps.Polyline && (currentShape instanceof api.Maps.Polyline)) {
              return (
                <Polyline
                  ref={ref}
                  key={index}
                  locations={currentShape.getLocations()}
                  cursor={currentShape.getCursor()}
                  generalizable={currentShape.getGeneralizable()}
                  fillColor={currentShape.getFillColor()}
                  strokeColor={currentShape.getStrokeColor()}
                  strokeDashArray={currentShape.getStrokeDashArray()}
                  strokeThickness={currentShape.getStrokeThickness()}
                  visible={currentShape.getVisible()}
                  metadata={currentShape.metadata}
                  {...props}
                />
              );
            } else if (api.Maps.Pushpin && (currentShape instanceof api.Maps.Pushpin)) {
              return (
                <Pushpin
                  ref={ref}
                  key={index}
                  location={currentShape.getLocation()}
                  anchor={currentShape.getAnchor()}
                  color={currentShape.getColor()}
                  cursor={currentShape.getCursor()}
                  draggable={currentShape.getDraggable()}
                  enableClickedStyle={currentShape.getClickedStyleEnabled()}
                  enableHoverStyle={currentShape.getHoverStyleEnabled()}
                  icon={currentShape.getIcon()}
                  roundClickableArea={currentShape.getRoundClickableArea()}
                  subTitle={currentShape.getSubTitle()}
                  title={currentShape.getTitle()}
                  text={currentShape.getText()}
                  textOffset={currentShape.getTextOffset()}
                  visible={currentShape.getVisible()}
                  metadata={currentShape.metadata}
                  {...props}
                />
              );
            } else {
              return null;
            }
          default:
            return null;
        }
      }

      return Array.isArray(shape) ? shape.map(componentForShape) : componentForShape(shape);
    } else {
      return null;
    }
  }, [
    shape,
    props,
    api,
  ]);
})

IPrimitive.propTypes = {
  shape: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({
      metadata: PropTypes.any,
    })),
    PropTypes.shape({
      metadata: PropTypes.any,
    }),
  ]).isRequired,
}

IPrimitive.defaultProps = {
  shape: [],
}

export default React.memo(IPrimitive)
