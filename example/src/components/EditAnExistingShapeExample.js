// https://docs.microsoft.com/en-us/bingmaps/v8-web-control/map-control-concepts/drawing-tools-module-examples/edit-an-existing-shape

import React from 'react'
import PropTypes from 'prop-types'

import Microsoft from '@pnnl/react-bingmaps'

const ExistingShape = ({
  ...props
}) => {
  const map = React.useContext(Microsoft.Maps.MapContext);

  const polygon = Microsoft.Maps.TestDataGenerator.useGetPolygons(1, map ? map.getBounds() : undefined);

  return (
    <Microsoft.Maps.IPrimitive shape={polygon} {...props} />
  );
}

ExistingShape.propTypes = {}

ExistingShape.defaultProps = {}

const EditAnExistingShapeExample = ({
  width,
  height,
  ...props
}) => {
  return (
    <div style={{ width, height, }}>
      <Microsoft.Maps.Map {...props}>
        <Microsoft.Maps.DrawingTools.DrawingTools>
          <Microsoft.Maps.DrawingTools.DrawingManager drawingBarVisible={false}>
            <ExistingShape editable={true} />
          </Microsoft.Maps.DrawingTools.DrawingManager>
        </Microsoft.Maps.DrawingTools.DrawingTools>
      </Microsoft.Maps.Map>
    </div>
  );
}

EditAnExistingShapeExample.propTypes = {
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
}

EditAnExistingShapeExample.defaultProps = {
  width: 600,
  height: 400,
}

export default React.memo(EditAnExistingShapeExample)
