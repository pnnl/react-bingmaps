// https://docs.microsoft.com/en-us/bingmaps/v8-web-control/map-control-concepts/infoboxes/infobox-when-pushpin-clicked

import React from 'react'
import PropTypes from 'prop-types'

import Microsoft from '@pnnl/react-bingmaps'

const InfoboxWhenPushpinClicked = (props) => {
  const [isInfoboxVisible, setInfoboxVisible] = React.useState(false);

  const handleInfoboxChanged = (event) => {
    const newInfoboxVisible = event.target.getVisible();

    if (newInfoboxVisible !== isInfoboxVisible) {
      setInfoboxVisible(newInfoboxVisible);
    }
  };

  const handlePushpinClicked = (event) => {
    setInfoboxVisible(true);
  };

  const map = React.useContext(Microsoft.Maps.MapContext);

  if (map) {
    return (
      <>
        <Microsoft.Maps.Infobox onInfoboxChanged={handleInfoboxChanged} location={map.getCenter()} visible={isInfoboxVisible} {...props} />
        <Microsoft.Maps.Pushpin onClick={handlePushpinClicked} location={map.getCenter()} />
      </>
    );
  } else {
    return null;
  }
}

InfoboxWhenPushpinClicked.propTypes = {}

InfoboxWhenPushpinClicked.defaultProps = {}

const InfoboxWhenPushpinClickedExample = ({
  width,
  height,
  ...props
}) => {
  return (
    <div style={{ width, height, }}>
      <Microsoft.Maps.Map {...props}>
        <InfoboxWhenPushpinClicked title="Pin Title" description="Pin description" />
      </Microsoft.Maps.Map>
    </div>
  );
}

InfoboxWhenPushpinClickedExample.propTypes = {
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
}

InfoboxWhenPushpinClickedExample.defaultProps = {
  width: 600,
  height: 400,
}

export default React.memo(InfoboxWhenPushpinClickedExample)
