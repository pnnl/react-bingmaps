# @pnnl/react-bingmaps

> React components for Microsoft Maps v8 map control

[![NPM](https://img.shields.io/npm/v/@pnnl/react-bingmaps.svg)](https://www.npmjs.com/package/@pnnl/react-bingmaps) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @pnnl/react-bingmaps
```

## Usage

```js
import React from 'react'
import PropTypes from 'prop-types'

import Microsoft from '@pnnl/react-bingmaps'
import '@pnnl/react-bingmaps/dist/index.css'

const Example = ({
  width,
  height,
  location,
}) => {
  return (
    <div style={{ width, height, }}>
      <Microsoft.Maps.Map center={location}>
        <Microsoft.Maps.Layer>
          <Microsoft.Maps.Pushpin location={location} />
        </Microsoft.Maps.Layer>
      </Microsoft.Maps.Map>
    </div>
  )
}

Example.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  location: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }).isRequired,
}

Example.defaultProps = {
  width: 600,
  height: 400,
  location: {
    latitude: 47.60995,
    longitude: -122.34009
  },
}

const App = () => {
  return (
    <Microsoft.Maps.Api apiKey={process.env.REACT_APP_BING_MAPS_API_KEY}>
      <Example />
    </Microsoft.Maps.Api>
  )
}
```

## Coverage

### Map Control API

* `Microsoft`
  * `Maps`
    * [x] `getIsBirdseyeAvailable` Static Method
    * [x] `loadModule` Static Method
    * [ ] `moduleLoaded` Static Method
    * [x] `registerModule` Static Method
    * [x] `AnimatedTileLayer` Class
    * [x] `AnimatedTileLayerOptions` Object
    * [ ] `AnimatedFrameEventArgs` Object
    * [x] `Color` Class
      * [x] `clone` Static Method
      * [x] `fromHex` Static Method
    * [x] `CustomOverlay` Class
    * [x] `CustomOverlayOptions` Object
    * [x] `EntityCollection` Class
    * [x] `Events` Class
      * [x] `addHandler` Static Method
      * [x] `addOne` Static Method
      * [x] `addThrottledHandler` Static Method
      * [x] `hasHandler` Static Method
      * [x] `invoke` Static Method
      * [x] `removeHandler` Static Method
    * [x] `GroundOverlay` Class
    * [x] `GroundOverlayOptions` Object
    * [x] `Heading` Enumeration
    * [x] `Infobox` Class
    * [ ] `InfoboxActions` Object
    * [ ] `InfoboxEventArgs` Object
    * [x] `InfoboxOptions` Object
    * [x] `IPrimitive` Class
    * [ ] `IPrimitiveChangedEventArgs` Object
    * [x] `LabelOverlay` Enumeration
    * [x] `Layer` Class
    * [x] `LayerCollection` Class
    * [x] `Location` Class
      * [x] `areEqual` Static Method
      * [x] `normalizeLongitude` Static Method
      * [x] `parseLatLong` Static Method
    * [x] `LocationRect` Class
      * [x] `fromCorners` Static Method
      * [x] `fromEdges` Static Method
      * [x] `fromLocations` Static Method
      * [x] `fromShapes` Static Method
      * [x] `fromString` Static Method
    * [x] `Map` Class
      * [x] `getClosestPanorama` Static Method
      * [x] `getVersion` Static Method
    * [x] `MapOptions` Object
    * [ ] `MapTypeEventArgs` Object
    * [x] `MapTypeId` Enumeration
    * [ ] `ModuleOptions` Object
    * [ ] `MouseEventArgs` Object
    * [x] `NavigationBarMode` Enumeration
    * [x] `NavigationBarOrientation` Enumeration
    * [x] `OverviewMapMode` Enumeration
    * [x] `PanoramaInfo` Object
    * [x] `PixelReference` Enumeration
    * [x] `Point` Object
    * [x] `PointCompression` Class
      * [x] `decode` Static Method
      * [x] `encode` Static Method
    * [x] `Polygon` Class
    * [x] `PolygonOptions` Object
    * [x] `Polyline` Class
    * [x] `PolylineOptions` Object
    * [x] `Pushpin` Class
    * [x] `PushpinOptions` Object
    * [ ] `PyramidTileId` Class
    * [x] `Range` Object
    * [x] `StreetsideOptions` Object
    * [x] `StylesOptions` Object
    * [x] `TestDataGenerator` Class
      * [x] `getColor` Static Method
      * [x] `getLocations` Static Method
      * [x] `getPushpins` Static Method
      * [x] `getPolylines` Static Method
      * [x] `getPolygons` Static Method
    * [x] `TileLayer` Class
    * [x] `TileLayerOptions` Object
    * [x] `TileSource` Class
    * [x] `TileSourceOptions` Object
    * [x] `ViewOptions` Object

### Modules

#### Autosuggest

* `Microsoft`
  * `Maps`
    * [x] `Address` Object
    * [x] `AutosuggestManager` Class
    * [x] `AutosuggestOptions` Object
    * [x] `SuggestionResult` Object

#### ~~Clustering~~

#### ~~Contour~~

#### ~~DataBinning~~

#### ~~Directions~~

#### DrawingTools

* `Microsoft`
  * `Maps`
    * [x] `DrawingTools` Class
      * [x] `DrawingBarAction` Enumeration
      * [x] `DrawingManager` Class
      * [x] `DrawingManagerOptions` Object
      * [x] `DrawingMode` Enumeration
      * [ ] `DrawingModeChangedData` Object
      * [x] `ShapeType` Enumeration

#### ~~GeoJson~~

#### ~~GeoXml~~

#### ~~HeatMap~~

#### Search

* `Microsoft`
  * `Maps`
    * [x] `Address` Object
    * `Search`
      * [x] `GeocodeLocation` Object
      * [x] `GeocodeRequestOptions` Object
      * [x] `GeocodeResult` Object
      * [x] `MatchCode` Enumeration
      * [x] `MatchConfidence` Enumeration
      * [x] `PlaceResult` Object
      * [x] `ReverseGeocodeRequestOptions` Object
      * [x] `SearchManager` Class

#### ~~SpatialDataService~~

#### SpatialMath

* `Microsoft`
  * `Maps`
    * `SpatialMath`
      * [ ] `convertArea` Static Method
      * [ ] `convertDistance` Static Method
      * [ ] `getCardinalSpline` Static Method
      * [ ] `getDestination` Static Method
      * [ ] `getDistanceTo` Static Method
      * [ ] `getEarthRadius` Static Method
      * [ ] `getGeodesicPath` Static Method
      * [ ] `getHeading` Static Method
      * [ ] `getLengthOfPath` Static Method
      * [ ] `getLocationAlongPath` Static Method
      * [ ] `getRegularPolygon` Static Method
      * [ ] `interpolate` Static Method
      * [x] `locationRectToPolygon` Static Method
      * [ ] `toDegMinSec` Static Method
      * [ ] `tryParseDegMinSec` Static Method
      * [x] `AreaUnits` Enumeration
      * [x] `BufferEndCap` Enumeration
      * [x] `DistanceUnits` Enumeration
      * `Geometry`
        * [x] `area` Static Method
        * [x] `bounds` Static Method
        * [ ] `buffer` Static Method
        * [ ] `calculateLength` Static Method
        * [x] `centroid` Static Method
        * [ ] `concaveHull` Static Method
        * [ ] `contains` Static Method
        * [ ] `convexHull` Static Method
        * [ ] `delaunayTriangles` Static Method
        * [ ] `difference` Static Method
        * [x] `distance` Static Method
        * [ ] `intersection` Static Method
        * [ ] `intersects` Static Method
        * [ ] `isValid` Static Method
        * [ ] `makeValid` Static Method
        * [ ] `nearestLocations` Static Method
        * [ ] `reduce` Static Method
        * [ ] `rotate` Static Method
        * [ ] `shortestLineTo` Static Method
        * [ ] `snapLocationsToShape` Static Method
        * [ ] `snapShapeToShape` Static Method
        * [ ] `symDifference` Static Method
        * [ ] `union` Static Method
        * [ ] `unionAggregate` Static Method
        * [ ] `voronoiDiagram` Static Method
      * `Tiles`
        * [ ] `getTilesInBounds` Static Method
        * [ ] `globalPixelToLocation` Static Method
        * [ ] `globalPixelToTile` Static Method
        * [ ] `groundResolution` Static Method
        * [ ] `locationToGlobalPixel` Static Method
        * [ ] `mapSize` Static Method
        * [ ] `tileToGlobalPixel` Static Method
        * [ ] `tileToLocationRect` Static Method

#### ~~Traffic~~

#### WellKnownText

* `Microsoft`
  * `Maps`
    * `WellKnownText`
      * [x] `read` Static Method
      * [x] `write` Static Method

#### ~~VenueMaps~~

## License

Copyright © 2021, Battelle Memorial Institute

See LICENSE in [LICENSE.txt](https://github.com/pnnl/react-bingmaps/blob/master/LICENSE.txt)
