import React from 'react'
import PropTypes from 'prop-types'

import Microsoft from '../hooks-custom/Microsoft'

import {
  useLayerCollection,
} from './Layer'

const CustomOverlay = React.forwardRef(({
  beneathLabels,
  drawOrder,
  onAdd,
  onLoad,
  onRemove,
  children,
  ...props
}, ref) => {
  const [customOverlay, divRef] = Microsoft.Maps.CustomOverlay.useConstructor({
    beneathLabels,
    drawOrder,
    onAdd,
    onLoad,
    onRemove,
  });

  React.useImperativeHandle(ref, () => customOverlay, [
    customOverlay,
  ]);

  useLayerCollection(customOverlay);

  return (
    <div ref={divRef} {...props}>{children}</div>
  );
})

CustomOverlay.propTypes = {
  beneathLabels: PropTypes.bool.isRequired,
  drawOrder: PropTypes.number,
  onAdd: PropTypes.func,
  onLoad: PropTypes.func,
  onRemove: PropTypes.func,
}

CustomOverlay.defaultProps = {
  beneathLabels: true,
  drawOrder: undefined,
  onAdd: undefined,
  onLoad: undefined,
  onRemove: undefined,
}

export default React.memo(CustomOverlay)
