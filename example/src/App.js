import React from 'react'

import Microsoft from '@pnnl/react-bingmaps'
import '@pnnl/react-bingmaps/dist/index.css'

import AnimatedWeatherRadarMapExample from './components/AnimatedWeatherRadarMapExample'
import BasicGeocodeExample from './components/BasicGeocodeExample'
import BasicReverseGeocodeExample from './components/BasicReverseGeocodeExample'
import BasicTileLayerExample from './components/BasicTileLayerExample'
import ControllingAnAnimatedTileLayerExample from './components/ControllingAnAnimatedTileLayerExample'
import ConfigurableMapExample from './components/ConfigurableMapExample'
import EditAnExistingShapeExample from './components/EditAnExistingShapeExample'
import FillingInAnAddressFormExample from './components/FillingInAnAddressFormExample'
import HtmlPushpinOverlayExample from './components/HtmlPushpinOverlayExample'
import InfoboxWhenPushpinClickedExample from './components/InfoboxWhenPushpinClickedExample'
import PolygonsWithHolesExample from './components/PolygonsWithHolesExample'
import SimpleGroundOverlayExample from './components/SimpleGroundOverlayExample'
import TopographyOverlayExample from './components/TopographyOverlayExample'
import UserInputGeocodeExample from './components/UserInputGeocodeExample'
import WellKnownTextReadExample from './components/WellKnownTextReadExample'

const App = () => {
  const props = {
    width: 600,
    height: 400,
  };

  return (
    <Microsoft.Maps.Api apiKey={process.env.REACT_APP_BING_MAPS_API_KEY} loadModule={['Microsoft.Maps.AutoSuggest', 'Microsoft.Maps.DrawingTools', 'Microsoft.Maps.Search', 'Microsoft.Maps.SpatialMath', 'Microsoft.Maps.WellKnownText']}>
      <AnimatedWeatherRadarMapExample {...props} />
      <br />
      <BasicGeocodeExample {...props} />
      <br />
      <BasicReverseGeocodeExample {...props} />
      <br />
      <BasicTileLayerExample {...props} />
      <br />
      <ControllingAnAnimatedTileLayerExample {...props} />
      <br />
      <ConfigurableMapExample {...props} />
      <br />
      <EditAnExistingShapeExample {...props} />
      <br />
      <FillingInAnAddressFormExample />
      <br />
      <HtmlPushpinOverlayExample {...props} />
      <br />
      <InfoboxWhenPushpinClickedExample {...props} />
      <br />
      <PolygonsWithHolesExample {...props} />
      <br />
      <SimpleGroundOverlayExample {...props} />
      <br />
      <TopographyOverlayExample {...props} />
      <br />
      <UserInputGeocodeExample {...props} />
      <br />
      <WellKnownTextReadExample {...props} />
    </Microsoft.Maps.Api>
  );
}

export default App
