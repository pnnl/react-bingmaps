import AnimatedTileLayer from './components/AnimatedTileLayer'
import Api, {
  $ApiContext,
  ApiContext,
} from './components/Api'
import AutoSuggest from './components/AutoSuggest'
import ConfigurableMap from './components/ConfigurableMap'
import CustomOverlay from './components/CustomOverlay'
import DrawingTools from './components/DrawingTools'
import GroundOverlay from './components/GroundOverlay'
import Infobox from './components/Infobox'
import IPrimitive, {
  Polygon,
  Polyline,
  Pushpin,
  useEntityCollection,
} from './components/IPrimitive'
import Layer, {
  LayerContext,
  useLayerCollection,
} from './components/Layer'
import Map, {
  MapContext,
} from './components/Map'
import Search from './components/Search'
import TileLayer from './components/TileLayer'

import _Microsoft from './hooks-custom/Microsoft'

const Microsoft = {
  Maps: {
    $ApiContext,
    AnimatedTileLayer,
    Api,
    ApiContext,
    AutoSuggest: {
      ...AutoSuggest,
      useAutosuggestManager: _Microsoft.Maps.AutosuggestManager.useConstructor,
      useAutosuggestOptions: _Microsoft.Maps.AutosuggestOptions.useConstructor,
      useSuggestionResult: _Microsoft.Maps.SuggestionResult.useConstructor,
    },
    Color: {
      useClone: _Microsoft.Maps.Color.useClone,
      useFromHex: _Microsoft.Maps.Color.useFromHex,
    },
    ConfigurableMap,
    CustomOverlay,
    DrawingTools: {
      ...DrawingTools,
      useDrawingBarAction: _Microsoft.Maps.DrawingTools.DrawingBarAction.useConstructor,
      useDrawingManager: _Microsoft.Maps.DrawingTools.DrawingManager.useConstructor,
      useDrawingManagerOptions: _Microsoft.Maps.DrawingTools.DrawingManagerOptions.useConstructor,
      useDrawingMode: _Microsoft.Maps.DrawingTools.DrawingMode.useConstructor,
      useDrawingTools: _Microsoft.Maps.DrawingTools.useConstructor,
      useShapeType: _Microsoft.Maps.DrawingTools.ShapeType.useConstructor,
    },
    Events: {
      useAddHandler: _Microsoft.Maps.Events.useAddHandler,
      useAddOne: _Microsoft.Maps.Events.useAddOne,
      useHasHandler: _Microsoft.Maps.Events.useHasHandler,
      useInvoke: _Microsoft.Maps.Events.useInvoke,
    },
    GroundOverlay,
    Infobox,
    IPrimitive,
    Layer,
    LayerContext,
    Location: {
      useAreEqual: _Microsoft.Maps.Location.useAreEqual,
      useNormalizeLongitude: _Microsoft.Maps.Location.useNormalizeLongitude,
      useParseLatLong: _Microsoft.Maps.Location.useParseLatLong,
    },
    LocationRect: {
      useFromCorners: _Microsoft.Maps.LocationRect.useFromCorners,
      useFromEdges: _Microsoft.Maps.LocationRect.useFromEdges,
      useFromLocations: _Microsoft.Maps.LocationRect.useFromLocations,
      useFromShapes: _Microsoft.Maps.LocationRect.useFromShapes,
      useFromString: _Microsoft.Maps.LocationRect.useFromString,
    },
    Map,
    MapContext,
    PointCompression: {
      useDecode: _Microsoft.Maps.PointCompression.useDecode,
      useEncode: _Microsoft.Maps.PointCompression.useEncode,
    },
    Polygon,
    Polyline,
    Pushpin,
    Search: {
      ...Search,
      useGeocodeLocation: _Microsoft.Maps.Search.GeocodeLocation.useConstructor,
      useGeocodeRequestOptions: _Microsoft.Maps.Search.GeocodeRequestOptions.useConstructor,
      useGeocodeResult: _Microsoft.Maps.Search.GeocodeResult.useConstructor,
      useMatchCode: _Microsoft.Maps.Search.MatchCode.useConstructor,
      useMatchConfidence: _Microsoft.Maps.Search.MatchConfidence.useConstructor,
      usePlaceResult: _Microsoft.Maps.Search.PlaceResult.useConstructor,
      useReverseGeocodeRequestOptions: _Microsoft.Maps.Search.ReverseGeocodeRequestOptions.useConstructor,
      useSearchManager: _Microsoft.Maps.Search.SearchManager.useConstructor,
    },
    SpatialMath: {
      useAreaUnits: _Microsoft.Maps.SpatialMath.AreaUnits.useConstructor,
      useBufferEndCap: _Microsoft.Maps.SpatialMath.BufferEndCap.useConstructor,
      useDistanceUnits: _Microsoft.Maps.SpatialMath.DistanceUnits.useConstructor,
      Geometry: {
        useArea: _Microsoft.Maps.SpatialMath.Geometry.useArea,
        useBounds: _Microsoft.Maps.SpatialMath.Geometry.useBounds,
        useCentroid: _Microsoft.Maps.SpatialMath.Geometry.useCentroid,
        useDistance: _Microsoft.Maps.SpatialMath.Geometry.useDistance,
      },
      useLocationRectToPolygon: _Microsoft.Maps.SpatialMath.useLocationRectToPolygon,
    },
    TestDataGenerator: {
      useGetColor: _Microsoft.Maps.TestDataGenerator.useGetColor,
      useGetLocations: _Microsoft.Maps.TestDataGenerator.useGetLocations,
      useGetPolygons: _Microsoft.Maps.TestDataGenerator.useGetPolygons,
      useGetPolylines: _Microsoft.Maps.TestDataGenerator.useGetPolylines,
      useGetPushpins: _Microsoft.Maps.TestDataGenerator.useGetPushpins,
    },
    TileLayer,
    WellKnownText: {
      useRead: _Microsoft.Maps.WellKnownText.useRead,
      useWrite: _Microsoft.Maps.WellKnownText.useWrite,
    },
    useAddress: _Microsoft.Maps.Address.useConstructor,
    useAnimatedTileLayer: _Microsoft.Maps.AnimatedTileLayer.useConstructor,
    useAnimatedTileLayerOptions: _Microsoft.Maps.AnimatedTileLayerOptions.useConstructor,
    useColor: _Microsoft.Maps.Color.useConstructor,
    useCustomOverlay: _Microsoft.Maps.CustomOverlay.useConstructor,
    useCustomOverlayOptions: _Microsoft.Maps.CustomOverlayOptions.useConstructor,
    useEntityCollection,
    useGetIsBirdseyeAvailable: _Microsoft.Maps.useGetIsBirdseyeAvailable,
    useGroundOverlay: _Microsoft.Maps.GroundOverlay.useConstructor,
    useGroundOverlayOptions: _Microsoft.Maps.GroundOverlayOptions.useConstructor,
    useHeading: _Microsoft.Maps.Heading.useConstructor,
    useInfobox: _Microsoft.Maps.Infobox.useConstructor,
    useInfoboxOptions: _Microsoft.Maps.InfoboxOptions.useConstructor,
    useLabelOverlay: _Microsoft.Maps.LabelOverlay.useConstructor,
    useLayer: _Microsoft.Maps.Layer.useConstructor,
    useLayerCollection,
    useLocation: _Microsoft.Maps.Location.useConstructor,
    useLocationRect: _Microsoft.Maps.LocationRect.useConstructor,
    useMap: _Microsoft.Maps.Map.useConstructor,
    useMapOptions: _Microsoft.Maps.MapOptions.useConstructor,
    useMapTypeId: _Microsoft.Maps.MapTypeId.useConstructor,
    useNavigationBarMode: _Microsoft.Maps.NavigationBarMode.useConstructor,
    useNavigationBarOrientation: _Microsoft.Maps.NavigationBarOrientation.useConstructor,
    useOverviewMapMode: _Microsoft.Maps.OverviewMapMode.useConstructor,
    usePanoramaInfo: _Microsoft.Maps.PanoramaInfo.useConstructor,
    usePixelReference: _Microsoft.Maps.PixelReference.useConstructor,
    usePoint: _Microsoft.Maps.Point.useConstructor,
    usePolygon: _Microsoft.Maps.Polygon.useConstructor,
    usePolygonOptions: _Microsoft.Maps.PolygonOptions.useConstructor,
    usePolyline: _Microsoft.Maps.Polyline.useConstructor,
    usePolylineOptions: _Microsoft.Maps.PolylineOptions.useConstructor,
    usePushpin: _Microsoft.Maps.Pushpin.useConstructor,
    usePushpinOptions: _Microsoft.Maps.PushpinOptions.useConstructor,
    useRange: _Microsoft.Maps.Range.useConstructor,
    useStreetsideOptions: _Microsoft.Maps.StreetsideOptions.useConstructor,
    useStylesOptions: _Microsoft.Maps.StylesOptions.useConstructor,
    useTileLayer: _Microsoft.Maps.TileLayer.useConstructor,
    useTileLayerOptions: _Microsoft.Maps.TileLayerOptions.useConstructor,
    useTileSource: _Microsoft.Maps.TileSource.useConstructor,
    useTileSourceOptions: _Microsoft.Maps.TileSourceOptions.useConstructor,
    useViewOptions: _Microsoft.Maps.ViewOptions.useConstructor,
  },
}

Microsoft.Maps.ConfigurableMap.useCreateFromConfig = _Microsoft.Maps.ConfigurableMap.useCreateFromConfig
Microsoft.Maps.Map.useGetClosestPanorama = _Microsoft.Maps.Map.useGetClosestPanorama
Microsoft.Maps.Map.useGetVersion = _Microsoft.Maps.Map.useGetVersion

export default Microsoft
