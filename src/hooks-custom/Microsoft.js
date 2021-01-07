import React from 'react'

import {
  ApiContext,
} from '../components/Api'

function useApiTypes(object, ...args) {
  const api = React.useContext(ApiContext);

  const callback = React.useMemo(() => {
    return (object && object.apiTypes) ? object.apiTypes(api) : undefined;
  }, [
    object,
    api,
  ]);

  return React.useMemo(() => {
    return callback ? callback(...args) : undefined;
  }, [
    args,
    callback,
  ]);
}

const ApiTypes = (() => {
  const $IDENTITY_FUNCTION = (value) => {
    return value;
  };

  return {
    apiTypesOf: (object) => {
      return (api) => {
        return (object && object.apiTypes) ? object.apiTypes(api) : undefined;
      };
    },
    arrayOf: (callback) => {
      return (api) => {
        const _callback = callback(api);

        if (_callback) {
          return (arr) => {
            return Array.isArray(arr) ? arr.map(_callback) : undefined;
          };
        } else {
          return undefined;
        }
      };
    },
    enum: (callback) => {
      return (api) => {
        const object = callback(api);

        if (object) {
          return (key) => {
            switch (typeof key) {
              case 'number':
                return key;
              case 'string':
                if (object.hasOwnProperty(key)) {
                  return object[key];
                } else {
                  return undefined;
                }
              default:
                return undefined;
            }
          }
        } else {
          return undefined;
        }
      };
    },
    shape: (callbacks) => {
      return (api) => {
        const [_callbacks, _isLoaded] = Object.entries(callbacks).reduce(([object, isLoaded], [key, callback]) => {
          object[key] = callback ? callback(api) : $IDENTITY_FUNCTION;

          return [object, isLoaded && (typeof object[key] === 'function')];
        }, [{}, true]);

        if (_isLoaded) {
          return (props) => {
            if (props) {
              return Object.entries(_callbacks).reduce((object, [key, callback]) => {
                object[key] = callback(props.hasOwnProperty(key) ? props[key] : undefined);

                return object;
              }, {});
            } else {
              return undefined
            }
          };
        } else {
          return undefined
        }
      };
    },
  };
})()

const Microsoft = {
  Maps: {
    useGetIsBirdseyeAvailable: (loc, heading, callback) => {
      return useApiTypes(Microsoft.Maps.useGetIsBirdseyeAvailable, loc, heading, callback);
    },
    Address: {
      useConstructor: (address) => {
        return useApiTypes(Microsoft.Maps.Address, address);
      },
    },
    AnimatedTileLayer: {
      useConstructor: (options) => {
        const animatedTileLayer = useApiTypes(Microsoft.Maps.AnimatedTileLayer, options);

        const ref = React.useCallback((node) => {
          if (animatedTileLayer && animatedTileLayer.loadingScreen) {
            animatedTileLayer.loadingScreen.setHtmlElement(node);
          }
        }, [
          animatedTileLayer,
        ]);

        return [animatedTileLayer, ref];
      },
    },
    AnimatedTileLayerOptions: {
      useConstructor: (options) => {
        return useApiTypes(Microsoft.Maps.AnimatedTileLayerOptions, options);
      },
    },
    AutosuggestManager: {
      useConstructor: (options) => {
        return useApiTypes(Microsoft.Maps.AutosuggestManager, options);
      },
    },
    AutosuggestOptions: {
      useConstructor: (options) => {
        return useApiTypes(Microsoft.Maps.AutosuggestOptions, options);
      },
    },
    Color: {
      useConstructor: (color) => {
        return useApiTypes(Microsoft.Maps.Color, color);
      },
      useClone: (color) => {
        return useApiTypes(Microsoft.Maps.Color.useClone, color);
      },
      useFromHex: (hex) => {
        return useApiTypes(Microsoft.Maps.Color.useFromHex, hex);
      },
    },
    ConfigurableMap: {
      useCreateFromConfig: (configFileUrl, withCredentials, requestHeaders, callback, errorCallback) => {
        const api = React.useContext(ApiContext);

        const [map, setMap] = React.useState(null);

        const [errorMsg, setErrorMsg] = React.useState(null);

        const ref = React.useCallback((node) => {
          if (map) {
            return;
          }

          if (node && api && api.Maps && api.Maps.ConfigurableMap) {
            api.Maps.ConfigurableMap.createFromConfig(node, configFileUrl, withCredentials, requestHeaders, (_map) => {
              setMap(_map);

              callback && callback(_map);
            }, (errorMsg) => {
              setErrorMsg(errorMsg);

              errorCallback && errorCallback(errorMsg);
            });
          }
        }, [
          configFileUrl,
          withCredentials,
          requestHeaders,
          callback,
          errorCallback,
          api,
        ]);

        return [map, errorMsg, ref];
      },
    },
    CustomOverlay: {
      useConstructor: (options) => {
        const customOverlay = useApiTypes(Microsoft.Maps.CustomOverlay, options);

        const ref = React.useCallback((node) => {
          if (customOverlay) {
            customOverlay.setHtmlElement(node);
          }
        }, [
          customOverlay,
        ]);

        return [customOverlay, ref];
      },
    },
    CustomOverlayOptions: {
      useConstructor: (options) => {
        return useApiTypes(Microsoft.Maps.CustomOverlayOptions, options);
      },
    },
    DrawingTools: {
      useConstructor: (map) => {
        return useApiTypes(Microsoft.Maps.DrawingTools, map);
      },
      DrawingBarAction: {
        useConstructor: (drawingBarAction) => {
          return useApiTypes(Microsoft.Maps.DrawingTools.DrawingBarAction, drawingBarAction);
        },
      },
      DrawingManager: {
        useConstructor: (drawingTools, options, drawingMode, drawingBarVisible) => {
          const [drawingManager, setDrawingManager] = React.useState(null);

          React.useEffect(() => {
            if (drawingManager) {
              return;
            }

            if (drawingTools) {
              drawingTools.showDrawingManager(setDrawingManager);
            }
          }, [
            drawingTools,
            drawingManager,
          ]);

          const _options = Microsoft.Maps.DrawingTools.DrawingManagerOptions.useConstructor(options);

          React.useEffect(() => {
            if (drawingManager) {
              drawingManager.setOptions(_options);
            }
          }, [
            drawingManager,
            _options,
          ]);

          const _drawingMode = Microsoft.Maps.DrawingTools.DrawingMode.useConstructor(drawingMode);

          React.useEffect(() => {
            if (drawingManager) {
              const drawingModeBeforeEffect = drawingManager.getDrawingMode();

              drawingManager.setDrawingMode(_drawingMode);

              return () => {
                drawingManager.setDrawingMode(drawingModeBeforeEffect);
              };
            }
          }, [
            drawingManager,
            _drawingMode,
          ]);

          React.useEffect(() => {
            if (drawingManager && drawingManager._drawingBar) {
              const drawingBarVisibleBeforeEffect = drawingManager._drawingBar._visible;

              drawingManager._drawingBar.setVisible(drawingBarVisible);

              return () => {
                drawingManager._drawingBar.setVisible(drawingBarVisibleBeforeEffect);
              };
            }
          }, [
            drawingManager,
            drawingBarVisible,
          ]);

          return drawingManager;
        },
      },
      DrawingManagerOptions: {
        useConstructor: (options) => {
          return useApiTypes(Microsoft.Maps.DrawingTools.DrawingManagerOptions, options);
        },
      },
      DrawingMode: {
        useConstructor: (drawingMode) => {
          return useApiTypes(Microsoft.Maps.DrawingTools.DrawingMode, drawingMode);
        },
      },
      ShapeType: {
        useConstructor: (shapeType) => {
          return useApiTypes(Microsoft.Maps.DrawingTools.ShapeType, shapeType);
        },
      },
    },
    Events: {
      useAddHandler: (target, eventName, handler, throttleInterval) => {
        const api = React.useContext(ApiContext);

        React.useEffect(() => {
          if (api && api.Maps && api.Maps.Events && target && eventName && handler) {
            const handlerId = throttleInterval ? api.Maps.Events.addThrottledHandler(target, eventName, handler, throttleInterval) : api.Maps.Events.addHandler(target, eventName, handler);

            return () => {
              api.Maps.Events.removeHandler(handlerId);
            };
          }
        }, [
          target,
          eventName,
          handler,
          throttleInterval,
          api,
        ]);

        return null;
      },
      useAddOne: (target, eventName, handler) => {
        const api = React.useContext(ApiContext);

        React.useEffect(() => {
          if (api && api.Maps && api.Maps.Events && target && eventName && handler) {
            api.Maps.Events.addOne(target, eventName, handler);
          }
        }, [
          target,
          eventName,
          handler,
          api,
        ]);

        return null;
      },
      useHasHandler: (target, eventName) => {
        const api = React.useContext(ApiContext);

        return React.useMemo(() => {
          if (api && api.Maps && api.Maps.Events && target && eventName) {
            api.Maps.Events.hasHandler(target, eventName);
          } else {
            return undefined;
          }
        }, [
          target,
          eventName,
          api,
        ]);
      },
      useInvoke: (target, eventName, ...args) => {
        const api = React.useContext(ApiContext);

        React.useEffect(() => {
          if (api && api.Maps && api.Maps.Events && target && eventName) {
            api.Maps.Events.invoke(target, eventName, ...args);
          }
        }, [
          target,
          eventName,
          args,
          api,
        ]);

        return null;
      },
    },
    GroundOverlay: {
      useConstructor: (options) => {
        return useApiTypes(Microsoft.Maps.GroundOverlay, options);
      },
    },
    GroundOverlayOptions: {
      useConstructor: (options) => {
        return useApiTypes(Microsoft.Maps.GroundOverlayOptions, options);
      },
    },
    Heading: {
      useConstructor: (heading) => {
        return useApiTypes(Microsoft.Maps.Heading, heading);
      },
    },
    IPrimitive: {},
    Infobox: {
      useConstructor: (location, options, map) => {
        const infobox = useApiTypes(Microsoft.Maps.Infobox, location, {});

        const _options = Microsoft.Maps.InfoboxOptions.useConstructor(options);

        React.useEffect(() => {
          if (infobox && _options) {
            const optionsBeforeEffect = infobox.getOptions();

            infobox.setOptions(_options);

            return () => {
              infobox.setOptions(optionsBeforeEffect);
            };
          }
        }, [
          infobox,
          _options,
        ]);

        React.useEffect(() => {
          if (infobox && map) {
            infobox.setMap(map);

            return () => {
              infobox.setMap(null);
            };
          }
        }, [
          infobox,
          map,
        ]);

        return infobox;
      },
    },
    InfoboxOptions: {
      useConstructor: (options) => {
        return useApiTypes(Microsoft.Maps.InfoboxOptions, options);
      },
    },
    LabelOverlay: {
      useConstructor: (options) => {
        return useApiTypes(Microsoft.Maps.LabelOverlay, options);
      },
    },
    Layer: {
      useConstructor: (id, visible, zIndex, metadata) => {
        const layer = useApiTypes(Microsoft.Maps.Layer, id);

        React.useEffect(() => {
          if (layer) {
            const visibleBeforeEffect = layer.getVisible();

            layer.setVisible(visible);

            return () => {
              layer.setVisible(visibleBeforeEffect);
            }
          }
        }, [
          visible,
          layer,
        ]);

        React.useEffect(() => {
          if (layer) {
            const zIndexBeforeEffect = layer.getZIndex();

            layer.setZIndex(zIndex);

            return () => {
              layer.setZIndex(zIndexBeforeEffect);
            };
          }
        }, [
          zIndex,
          layer,
        ]);

        React.useEffect(() => {
          if (layer) {
            const metadataBeforeEffect = layer.metadata;

            layer.metadata = metadata;

            return () => {
              layer.metadata = metadataBeforeEffect;
            };
          }
        }, [
          metadata,
          layer,
        ]);

        return layer;
      },
    },
    Location: {
      useConstructor: (location) => {
        return useApiTypes(Microsoft.Maps.Location, location);
      },
      useAreEqual: (loc1, loc2) => {
        return useApiTypes(Microsoft.Maps.Location.useAreEqual, loc1, loc2);
      },
      useNormalizeLongitude: (longitude) => {
        return useApiTypes(Microsoft.Maps.Location.useNormalizeLongitude, longitude);
      },
      useParseLatLong: (str) => {
        return useApiTypes(Microsoft.Maps.Location.useParseLatLong, str);
      },
    },
    LocationRect: {
      useConstructor: (locationRect) => {
        return useApiTypes(Microsoft.Maps.LocationRect, locationRect);
      },
      useFromCorners: (northwest, southeast) => {
        return useApiTypes(Microsoft.Maps.LocationRect.useFromCorners, northwest, southeast);
      },
      useFromEdges: (north, west, south, east) => {
        return useApiTypes(Microsoft.Maps.LocationRect.useFromEdges, north, west, south, east);
      },
      useFromLocations: (locations) => {
        return useApiTypes(Microsoft.Maps.LocationRect.useFromLocations, locations);
      },
      useFromShapes: (shapes) => {
        return useApiTypes(Microsoft.Maps.LocationRect.useFromShapes, shapes);
      },
      useFromString: (str) => {
        return useApiTypes(Microsoft.Maps.LocationRect.useFromString, str);
      },
    },
    Map: {
      useConstructor: ({
        allowHidingLabelsOfRoad,
        allowInfoboxOverflow,
        backgroundColor,
        bounds,
        center,
        centerOffset,
        credentials,
        customMapStyle,
        disableBirdseye,
        disableKeyboardInput,
        disableMapTypeSelectorMouseOver,
        disablePanning,
        disableScrollWheelZoom,
        disableStreetside,
        disableStreetsideAutoCoverage,
        disableZooming,
        enableClickableLogo,
        enableCORS,
        enableHighDpi,
        enableInertia,
        heading,
        labelOverlay,
        liteMode,
        mapTypeId,
        maxBounds,
        maxZoom,
        minZoom,
        navigationBarMode,
        navigationBarOrientation,
        padding,
        pitch,
        showBreadcrumb,
        showDashboard,
        showLocateMeButton,
        showMapTypeSelector,
        showScalebar,
        showTrafficButton,
        showTermsLink,
        showZoomButtons,
        streetsideOptions,
        supportedMapTypes,
        zoom,
      }) => {
        const api = React.useContext(ApiContext);

        const [map, setMap] = React.useState(null);

        const _options = Microsoft.Maps.MapOptions.useConstructor({
          allowHidingLabelsOfRoad,
          backgroundColor,
          credentials,
          customMapStyle,
          disableBirdseye,
          disableStreetside,
          disableStreetsideAutoCoverage,
          enableClickableLogo,
          enableCORS,
          enableHighDpi,
          enableInertia,
          liteMode,
          showDashboard,
          showLocateMeButton,
          showMapTypeSelector,
          showScalebar,
          showTermsLink,
          showZoomButtons,
        });

        const mapOptions = Microsoft.Maps.MapOptions.useConstructor({
          allowInfoboxOverflow,
          disableKeyboardInput,
          disableMapTypeSelectorMouseOver,
          disablePanning,
          disableScrollWheelZoom,
          disableZooming,
          maxBounds,
          maxZoom,
          minZoom,
          navigationBarMode,
          navigationBarOrientation,
          showBreadcrumb,
          showTrafficButton,
          streetsideOptions,
          supportedMapTypes,
        });

        const viewOptions = Microsoft.Maps.ViewOptions.useConstructor({
          bounds,
          center,
          centerOffset,
          heading,
          labelOverlay,
          mapTypeId,
          padding,
          pitch,
          zoom,
        });

        const ref = React.useCallback((node) => {
          if (map) {
            return;
          }

          if (node && api && api.Maps && api.Maps.Map) {
            const _map = new api.Maps.Map(node, _options);

            _map.awaitInit = new Promise((resolve) => {
              _map._mapLoaded._handlers.push(() => {
                const div = node.querySelector('.MicrosoftMap');

                if (div) {
                  Object.entries(div).forEach(([
                    key,
                    handler,
                  ]) => {
                    if (key.startsWith('jsEvent')) {
                      const eventName = key.replace(/^jsEvent([a-z]+)___\$gimme\$_guid__[0-9]+$/, '$1');

                      div.removeEventListener(eventName, handler);

                      div.addEventListener(eventName, (event) => {
                        if (!event._IGNORE) {
                          handler(event);
                        }
                      });
                    }
                  });

                  resolve(_map);
                }
              });
            }).then(setMap);
          }
        }, [
          api,
          map,
          _options,
        ]);

        React.useEffect(() => {
          if (map && mapOptions) {
            const mapOptionsBeforeEffect = map.getOptions();

            map.setOptions(mapOptions);

            return () => {
              map.setOptions(mapOptionsBeforeEffect);
            };
          }
        }, [
          map,
          mapOptions,
        ]);

        React.useEffect(() => {
          if (map && viewOptions) {
            const viewOptionsBeforeEffect = {
              bounds: map.getBounds(),
              center: map.getCenter(),
              centerOffset: undefined,
              heading: map.getHeading(),
              labelOverlay: undefined,
              mapTypeId: map.getMapTypeId(),
              padding: undefined,
              pitch: map.getPitch(),
              zoom: map.getZoom(),
            };

            map.setView(viewOptions);

            return () => {
              map.setView(viewOptionsBeforeEffect);
            };
          }
        }, [
          map,
          viewOptions,
        ]);

        return [map, ref];
      },
      useGetClosestPanorama: (bounds, success, missingCoverage) => {
        return useApiTypes(Microsoft.Maps.Map.useGetClosestPanorama, bounds, success, missingCoverage);
      },
      useGetVersion: () => {
        return useApiTypes(Microsoft.Maps.Map.useGetVersion);
      },
    },
    MapOptions: {
      useConstructor: (options) => {
        return useApiTypes(Microsoft.Maps.MapOptions, options);
      },
    },
    MapTypeId: {
      useConstructor: (mapTypeId) => {
        return useApiTypes(Microsoft.Maps.MapTypeId, mapTypeId);
      },
    },
    NavigationBarMode: {
      useConstructor: (navigationBarMode) => {
        return useApiTypes(Microsoft.Maps.NavigationBarMode, navigationBarMode);
      },
    },
    NavigationBarOrientation: {
      useConstructor: (navigationBarOrientation) => {
        return useApiTypes(Microsoft.Maps.NavigationBarOrientation, navigationBarOrientation);
      },
    },
    OverviewMapMode: {
      useConstructor: (overviewMapMode) => {
        return useApiTypes(Microsoft.Maps.OverviewMapMode, overviewMapMode);
      },
    },
    PanoramaInfo: {
      useConstructor: (panoramaInfo) => {
        return useApiTypes(Microsoft.Maps.PanoramaInfo, panoramaInfo);
      },
    },
    PixelReference: {
      useConstructor: (pixelReference) => {
        return useApiTypes(Microsoft.Maps.PixelReference, pixelReference);
      },
    },
    Point: {
      useConstructor: (point) => {
        return useApiTypes(Microsoft.Maps.Point, point);
      },
    },
    PointCompression: {
      useDecode: (value) => {
        return useApiTypes(Microsoft.Maps.PointCompression.useDecode, value);
      },
      useEncode: (points) => {
        return useApiTypes(Microsoft.Maps.PointCompression.useEncode, points);
      },
    },
    Polygon: {
      useConstructor: (rings, options, metadata) => {
        const polygon = useApiTypes(Microsoft.Maps.Polygon, rings, {});

        const _options = Microsoft.Maps.PolygonOptions.useConstructor(options);

        React.useEffect(() => {
          if (polygon) {
            // const optionsBeforeEffect = {};

            polygon.setOptions(_options);

            // return () => {
            //   polygon.setOptions(optionsBeforeEffect);
            // };
          }
        }, [
          polygon,
          _options,
        ]);

        React.useEffect(() => {
          if (polygon) {
            const metadataBeforeEffect = polygon.metadata;

            polygon.metadata = metadata;

            return () => {
              polygon.metadata = metadataBeforeEffect;
            };
          }
        }, [
          polygon,
          metadata,
        ]);

        return polygon;
      },
    },
    PolygonOptions: {
      useConstructor: (options) => {
        return useApiTypes(Microsoft.Maps.PolygonOptions, options);
      },
    },
    Polyline: {
      useConstructor: (locations, options, metadata) => {
        const polyline = useApiTypes(Microsoft.Maps.Polyline, locations, {});

        const _options = Microsoft.Maps.PolylineOptions.useConstructor(options);

        React.useEffect(() => {
          if (polyline) {
            // const optionsBeforeEffect = {};

            polyline.setOptions(_options);

            // return () => {
            //   polyline.setOptions(optionsBeforeEffect);
            // };
          }
        }, [
          polyline,
          _options,
        ]);

        React.useEffect(() => {
          if (polyline) {
            const metadataBeforeEffect = polyline.metadata;

            polyline.metadata = metadata;

            return () => {
              polyline.metadata = metadataBeforeEffect;
            };
          }
        }, [
          polyline,
          metadata,
        ]);

        return polyline;
      },
    },
    PolylineOptions: {
      useConstructor: (options) => {
        return useApiTypes(Microsoft.Maps.PolylineOptions, options);
      },
    },
    Pushpin: {
      useConstructor: (location, options, metadata) => {
        const pushpin = useApiTypes(Microsoft.Maps.Pushpin, location, options);

        const _options = Microsoft.Maps.PushpinOptions.useConstructor(options);

        React.useEffect(() => {
          if (pushpin) {
            // const optionsBeforeEffect = {};

            pushpin.setOptions(_options);

            // return () => {
            //   pushpin.setOptions(optionsBeforeEffect);
            // };
          }
        }, [
          pushpin,
          _options,
        ]);

        React.useEffect(() => {
          if (pushpin) {
            const metadataBeforeEffect = pushpin.metadata;

            pushpin.metadata = metadata;

            return () => {
              pushpin.metadata = metadataBeforeEffect;
            };
          }
        }, [
          pushpin,
          metadata,
        ]);

        return pushpin;
      },
    },
    PushpinOptions: {
      useConstructor: (options) => {
        return useApiTypes(Microsoft.Maps.PushpinOptions, options);
      },
    },
    Range: {
      useConstructor: (range) => {
        return useApiTypes(Microsoft.Maps.Range, range);
      },
    },
    Search: {
      GeocodeLocation: {
        useConstructor: (geocodeLocation) => {
          return useApiTypes(Microsoft.Maps.Search.GeocodeLocation, geocodeLocation);
        },
      },
      GeocodeRequestOptions: {
        useConstructor: (options) => {
          return useApiTypes(Microsoft.Maps.Search.GeocodeRequestOptions, options);
        },
      },
      GeocodeResult: {
        useConstructor: (geocodeResult) => {
          return useApiTypes(Microsoft.Maps.Search.GeocodeResult, geocodeResult);
        },
      },
      MatchCode: {
        useConstructor: (matchCode) => {
          return useApiTypes(Microsoft.Maps.Search.MatchCode, matchCode);
        },
      },
      MatchConfidence: {
        useConstructor: (matchConfidence) => {
          return useApiTypes(Microsoft.Maps.Search.MatchConfidence, matchConfidence);
        },
      },
      PlaceResult: {
        useConstructor: (placeResult) => {
          return useApiTypes(Microsoft.Maps.Search.PlaceResult, placeResult);
        },
      },
      ReverseGeocodeRequestOptions: {
        useConstructor: (options) => {
          return useApiTypes(Microsoft.Maps.Search.ReverseGeocodeRequestOptions, options);
        },
      },
      SearchManager: {
        useConstructor: (map) => {
          return useApiTypes(Microsoft.Maps.Search.SearchManager, map);
        },
      },
    },
    SpatialMath: {
      AreaUnits: {
        useConstructor: (areaUnits) => {
          return useApiTypes(Microsoft.Maps.SpatialMath.AreaUnits, areaUnits);
        },
      },
      BufferEndCap: {
        useConstructor: (bufferEndCap) => {
          return useApiTypes(Microsoft.Maps.SpatialMath.BufferEndCap, bufferEndCap);
        },
      },
      DistanceUnits: {
        useConstructor: (distanceUnits) => {
          return useApiTypes(Microsoft.Maps.SpatialMath.DistanceUnits, distanceUnits);
        },
      },
      Geometry: {
        useArea: (shape, units) => {
          return useApiTypes(Microsoft.Maps.SpatialMath.Geometry.useArea, shape, units);
        },
        useBounds: (shapes) => {
          return useApiTypes(Microsoft.Maps.SpatialMath.Geometry.useBounds, shapes);
        },
        useCentroid: (shape) => {
          return useApiTypes(Microsoft.Maps.SpatialMath.Geometry.useCentroid, shape);
        },
        useDistance: (shapeA, shapeB, units) => {
          return useApiTypes(Microsoft.Maps.SpatialMath.Geometry.useCentroid, shapeA, shapeB, units);
        },
      },
      useLocationRectToPolygon: (locationRect) => {
        return useApiTypes(Microsoft.Maps.SpatialMath.useLocationRectToPolygon, locationRect);
      },
    },
    StreetsideOptions: {
      useConstructor: (options) => {
        return useApiTypes(Microsoft.Maps.StreetsideOptions, options);
      },
    },
    StylesOptions: {
      useConstructor: (options) => {
        return useApiTypes(Microsoft.Maps.StylesOptions, options);
      },
    },
    SuggestionResult: {
      useConstructor: (suggestionResult) => {
        return useApiTypes(Microsoft.Maps.SuggestionResult, suggestionResult);
      },
    },
    TestDataGenerator: {
      useGetColor: (withAlpha) => {
        return useApiTypes(Microsoft.Maps.TestDataGenerator.useGetColor, withAlpha);
      },
      useGetLocations: (num, bounds) => {
        return useApiTypes(Microsoft.Maps.TestDataGenerator.useGetLocations, num, bounds);
      },
      useGetPolygons: (num, bounds, size, scaleFactor, options, addHole) => {
        return useApiTypes(Microsoft.Maps.TestDataGenerator.useGetPolygons, num, bounds, size, scaleFactor, options, addHole);
      },
      useGetPolylines: (num, bounds, size, scaleFactor, options) => {
        return useApiTypes(Microsoft.Maps.TestDataGenerator.useGetPolylines, num, bounds, size, scaleFactor, options);
      },
      useGetPushpins: (num, bounds, options) => {
        return useApiTypes(Microsoft.Maps.TestDataGenerator.useGetPushpins, num, bounds, options);
      },
    },
    TileLayer: {
      useConstructor: (options) => {
        return useApiTypes(Microsoft.Maps.TileLayer, options);
      },
    },
    TileLayerOptions: {
      useConstructor: (options) => {
        return useApiTypes(Microsoft.Maps.TileLayerOptions, options);
      },
    },
    TileSource: {
      useConstructor: (options) => {
        return useApiTypes(Microsoft.Maps.TileSource, options);
      },
    },
    TileSourceOptions: {
      useConstructor: (options) => {
        return useApiTypes(Microsoft.Maps.TileSourceOptions, options);
      },
    },
    ViewOptions: {
      useConstructor: (options) => {
        return useApiTypes(Microsoft.Maps.ViewOptions, options);
      },
    },
    WellKnownText: {
      useRead: (wkt, styles) => {
        return useApiTypes(Microsoft.Maps.WellKnownText.useRead, wkt, styles);
      },
      useWrite: (data) => {
        return useApiTypes(Microsoft.Maps.WellKnownText.useWrite, data);
      },
    },
  },
}

function createHeadingOrNumber(api) {
  const _createHeading = Microsoft.Maps.Heading.apiTypes(api);

  if (_createHeading) {
    return (heading) => {
      if (typeof heading === 'number') {
        return heading;
      } else {
        return _createHeading(heading);
      }
    };
  } else {
    return undefined;
  }
}

function createLocations(api) {
  const _createLocation = Microsoft.Maps.Location.apiTypes(api);

  if (_createLocation) {
    return (arr) => {
      return Array.isArray(arr) ? arr.map(_createLocation) : undefined;
    };
  } else {
    return undefined;
  }
}

function createShape(api) {
  if (api && api.Maps && api.Maps.Polygon && api.Maps.Polyline && api.Maps.Pushpin) {
    return (shape) => {
      if (shape) {
        switch (typeof shape) {
          case 'object':
            if ((shape instanceof api.Maps.Polygon) || (shape instanceof api.Maps.Polyline) || (shape instanceof api.Maps.Pushpin)) {
              return shape;
            } else {
              return undefined;
            }
          default:
            return undefined;
        }
      } else {
        return undefined;
      }
    };
  } else {
    return undefined;
  }
}

function createShapes(api) {
  const _createShape = createShape(api);

  if (_createShape) {
    return (arr) => {
      return Array.isArray(arr) ? arr.map((shape) => Array.isArray(shape) ? shape.map(_createShape) : _createShape(shape)) : _createShape(arr);
    };
  } else {
    return undefined;
  }
}

function createShapeOrLocation(api) {
  const _createShape = createShape(api);
  const _createLocation = Microsoft.Maps.Location.apiTypes(api);

  if (_createShape && _createLocation) {
    return (shape) => {
      const _shape = _createShape(shape);

      return _shape ? _shape : _createLocation(shape);
    };
  } else {
    return undefined
  }
}

function createShapesOrLocations(api) {
  const _createShapeOrLocation = createShapeOrLocation(api);

  if (_createShapeOrLocation) {
    return (arr) => {
      return Array.isArray(arr) ? arr.map((shape) => Array.isArray(shape) ? shape.map(_createShapeOrLocation) : _createShapeOrLocation(shape)) : _createShapeOrLocation(arr);
    };
  } else {
    return undefined;
  }
}

Microsoft.Maps.useGetIsBirdseyeAvailable.apiTypes = function getIsBirdseyeAvailable(api) {
  const _createLocation = Microsoft.Maps.Location.apiTypes(api);
  const _createHeadingOrNumber = createHeadingOrNumber(api);

  if (_createLocation && _createHeadingOrNumber && api && api.Maps && api.Maps.getIsBirdseyeAvailable) {
    return (loc, heading, callback) => {
      const _loc = _createLocation(loc);
      const _heading = _createHeadingOrNumber(heading);

      if (_loc && _heading && callback) {
        return api.Maps.getIsBirdseyeAvailable(loc, heading, callback);
      } else {
        return undefined;
      }
    };
  } else {
    return undefined;
  }
}

Microsoft.Maps.Address.apiTypes = ApiTypes.shape({
  addressLine: undefined,
  adminDistrict: undefined,
  countryRegion: undefined,
  countryRegionISO2: undefined,
  district: undefined,
  formattedAddress: undefined,
  locality: undefined,
  postalCode: undefined,
})

Microsoft.Maps.AnimatedTileLayer.apiTypes = function createAnimatedTileLayer(api) {
  const _createAnimatedTileLayerOptions = Microsoft.Maps.AnimatedTileLayerOptions.apiTypes(api);

  if (_createAnimatedTileLayerOptions && api && api.Maps && api.Maps.AnimatedTileLayer) {
    return (options) => {
      const _options = _createAnimatedTileLayerOptions(options);

      if (_options) {
        return new api.Maps.AnimatedTileLayer(_options);
      } else {
        return undefined;
      }
    };
  } else {
    return undefined;
  }
}

Microsoft.Maps.AnimatedTileLayerOptions.apiTypes = ApiTypes.shape({
  autoPlay: undefined,
  frameRate: undefined,
  loadingScreen: ApiTypes.apiTypesOf(Microsoft.Maps.CustomOverlay),
  maxTotalLoadTime: undefined,
  mercator: ApiTypes.arrayOf(ApiTypes.apiTypesOf(Microsoft.Maps.TileSource)),
  visible: undefined,
})

Microsoft.Maps.AutosuggestManager.apiTypes = function createAutosuggestManager(api) {
  const _createAutosuggestOptions = Microsoft.Maps.AutosuggestOptions.apiTypes(api);

  if (_createAutosuggestOptions && api && api.Maps && api.Maps.AutosuggestManager) {
    return (options) => {
      const _options = _createAutosuggestOptions(options);

      if (_options) {
        return new api.Maps.AutosuggestManager(_options);
      } else {
        return undefined;
      }
    };
  } else {
    return undefined;
  }
}

Microsoft.Maps.AutosuggestOptions.apiTypes = ApiTypes.shape({
  addressSuggestions: undefined,
  autoDetectLocation: undefined,
  bounds: ApiTypes.apiTypesOf(Microsoft.Maps.LocationRect),
  countryCode: undefined,
  map: undefined,
  maxResults: undefined,
  placeSuggestions: undefined,
  useMapView: undefined,
  userLocation: ApiTypes.apiTypesOf(Microsoft.Maps.Location),
})

Microsoft.Maps.Color.apiTypes = function createColor(api) {
  if (api && api.Maps && api.Maps.Color) {
    return (color) => {
      if (color) {
        switch (typeof color) {
          case 'object':
            if (color instanceof api.Maps.Color) {
              return color;
            } else {
              const {
                a,
                r,
                g,
                b,
              } = color;

              return new api.Maps.Color({
                a,
                r,
                g,
                b,
              });
            }
          case 'string':
            return color;
          default:
            return undefined;
        }
      } else {
        return undefined;
      }
    };
  } else {
    return undefined;
  }
}

Microsoft.Maps.Color.useClone.apiTypes = function clone(api) {
  const _createColor = Microsoft.Maps.Color.apiTypes(api);

  if (_createColor && api && api.Maps && api.Maps.Color && api.Maps.Color.clone) {
    return (color) => {
      const _color = _createColor(color);

      if (_color) {
        return api.Maps.Color.clone(color);
      } else {
        return undefined;
      }
    };
  } else {
    return undefined;
  }
}

Microsoft.Maps.Color.useFromHex.apiTypes = function fromHex(api) {
  if (api && api.Maps && api.Maps.Color && api.Maps.Color.fromHex) {
    return (hex) => {
      if (hex) {
        return api.Maps.Color.fromHex(hex);
      } else {
        return undefined;
      }
    };
  } else {
    return undefined;
  }
}

Microsoft.Maps.ConfigurableMap.apiTypes = undefined

Microsoft.Maps.CustomOverlay.apiTypes = function createCustomOverlay(api) {
  const _createCustomOverlayOptions = Microsoft.Maps.CustomOverlayOptions.apiTypes(api);

  if (_createCustomOverlayOptions && api && api.Maps && api.Maps.CustomOverlay) {
    return (options) => {
      const _options = _createCustomOverlayOptions(options);

      if (_options) {
        function constructor() {};

        constructor.prototype = new api.Maps.CustomOverlay(_options);

        if (options) {
          [
            'onAdd',
            'onLoad',
            'onRemove',
          ].forEach((key) => {
            const callback = options[key];

            if (callback) {
              constructor.prototype[key] = callback;
            }
          })
        }

        return new constructor();
      } else {
        return undefined;
      }
    };
  } else {
    return undefined;
  }
}

Microsoft.Maps.CustomOverlayOptions.apiTypes = ApiTypes.shape({
  beneathLabels: undefined,
  drawOrder: undefined,
})

Microsoft.Maps.DrawingTools.apiTypes = function createDrawingTools(api) {
  if (api && api.Maps && api.Maps.DrawingTools) {
    return (map) => {
      if (map) {
        return new api.Maps.DrawingTools(map);
      } else {
        return undefined;
      }
    };
  } else {
    return undefined;
  }
}

Microsoft.Maps.DrawingTools.DrawingBarAction.apiTypes = ApiTypes.enum((api) => {
  if (api && api.Maps && api.Maps.DrawingTools) {
    return api.Maps.DrawingTools.DrawingBarAction;
  } else {
    return undefined;
  }
})

Microsoft.Maps.DrawingTools.DrawingManager.apiTypes = undefined

Microsoft.Maps.DrawingTools.DrawingManagerOptions.apiTypes = ApiTypes.shape({
  drawingBarActions: (api) => {
    if (api && api.Maps && api.Maps.DrawingTools && api.Maps.DrawingTools.DrawingBarAction) {
      return (keys) => {
        if (keys) {
          switch (typeof keys) {
            case 'object':
              if (Array.isArray(keys)) {
                return keys.reduce((accumulator, key) => {
                  switch (typeof key) {
                    case 'number':
                      return accumulator | key;
                    case 'string':
                      if (api.Maps.DrawingTools.DrawingBarAction.hasOwnProperty(key)) {
                        return accumulator | api.Maps.DrawingTools.DrawingBarAction[key];
                      } else {
                        return accumulator;
                      }
                    default:
                      return accumulator;
                  }
                }, 0);
              } else {
                return undefined;
              }
            case 'number':
              return keys;
            default:
              return undefined;
          }
        } else {
          return undefined;
        }
      };
    } else {
      return undefined;
    }
  },
  fillColor: ApiTypes.apiTypesOf(Microsoft.Maps.Color),
  strokeColor: ApiTypes.apiTypesOf(Microsoft.Maps.Color),
})

Microsoft.Maps.DrawingTools.DrawingMode.apiTypes = ApiTypes.enum((api) => {
  if (api && api.Maps && api.Maps.DrawingTools) {
    return api.Maps.DrawingTools.DrawingMode;
  } else {
    return undefined;
  }
})

Microsoft.Maps.DrawingTools.ShapeType.apiTypes = ApiTypes.enum((api) => {
  if (api && api.Maps && api.Maps.DrawingTools) {
    return api.Maps.DrawingTools.ShapeType;
  } else {
    return undefined;
  }
})

Microsoft.Maps.Events.apiTypes = undefined

Microsoft.Maps.GroundOverlay.apiTypes = function createGroundOverlay(api) {
  const _createGroundOverlayOptions = Microsoft.Maps.GroundOverlayOptions.apiTypes(api);

  if (_createGroundOverlayOptions && api && api.Maps && api.Maps.GroundOverlay) {
    return (options) => {
      const _options = _createGroundOverlayOptions(options);

      if (_options) {
        return new api.Maps.GroundOverlay(_options);
      } else {
        return undefined;
      }
    };
  } else {
    return undefined;
  }
}

Microsoft.Maps.GroundOverlayOptions.apiTypes = ApiTypes.shape({
  backgroundColor: ApiTypes.apiTypesOf(Microsoft.Maps.Color),
  beneathLabels: undefined,
  bounds: ApiTypes.apiTypesOf(Microsoft.Maps.LocationRect),
  imageUrl: undefined,
  opacity: undefined,
  rotation: undefined,
  visible: undefined,
})

Microsoft.Maps.Heading.apiTypes = ApiTypes.enum((api) => {
  if (api && api.Maps) {
    return api.Maps.Heading;
  } else {
    return undefined;
  }
})

Microsoft.Maps.IPrimitive.apiTypes = undefined

Microsoft.Maps.Infobox.apiTypes = function createInfobox(api) {
  const _createLocation = Microsoft.Maps.Location.apiTypes(api);
  const _createInfoboxOptions = Microsoft.Maps.InfoboxOptions.apiTypes(api);

  if (_createLocation && _createInfoboxOptions && api && api.Maps && api.Maps.Infobox) {
    return (location, options) => {
      const _location = _createLocation(location);

      const _options = _createInfoboxOptions(options);

      if (_location && _options) {
        return new api.Maps.Infobox(_location, _options);
      } else {
        return undefined;
      }
    };
  } else {
    return undefined;
  }
}

Microsoft.Maps.InfoboxOptions.apiTypes = ApiTypes.shape({
  actions: undefined,
  closeDelayTime: undefined,
  description: undefined,
  htmlContent: undefined,
  location: ApiTypes.apiTypesOf(Microsoft.Maps.Location),
  maxHeight: undefined,
  maxWidth: undefined,
  offset: ApiTypes.apiTypesOf(Microsoft.Maps.Point),
  showCloseButton: undefined,
  showPointer: undefined,
  title: undefined,
  visible: undefined,
  zIndex: undefined,
})

Microsoft.Maps.LabelOverlay.apiTypes = ApiTypes.enum((api) => {
  if (api && api.Maps) {
    return api.Maps.LabelOverlay;
  } else {
    return undefined;
  }
})

Microsoft.Maps.Layer.apiTypes = function createLayer(api) {
  if (api && api.Maps && api.Maps.Layer) {
    return (id) => {
      return new api.Maps.Layer(id);
    };
  } else {
    return undefined;
  }
}

Microsoft.Maps.Location.apiTypes = function createLocation(api) {
  if (api && api.Maps && api.Maps.Location) {
    return (location) => {
      if (location) {
        switch (typeof location) {
          case 'object':
            if (location instanceof api.Maps.Location) {
              return location;
            } else {
              const {
                latitude,
                longitude,
              } = location;

              return new api.Maps.Location(latitude, longitude);
            }
          default:
            return undefined;
        }
      } else {
        return undefined;
      }
    };
  } else {
    return undefined;
  }
}

Microsoft.Maps.Location.useAreEqual.apiTypes = function areEqual(api) {
  const _createLocation = Microsoft.Maps.Location.apiTypes(api);

  if (_createLocation && api && api.Maps && api.Maps.Location && api.Maps.Location.areEqual) {
    return (loc1, loc2) => {
      const _loc1 = _createLocation(loc1);
      const _loc2 = _createLocation(loc2);

      if (loc1 && loc2) {
        return api.Maps.Location.areEqual(_loc1, _loc2);
      } else {
        return undefined;
      }
    };
  } else {
    return undefined;
  }
}

Microsoft.Maps.Location.useNormalizeLongitude.apiTypes = function normalizeLongitude(api) {
  if (api && api.Maps && api.Maps.Location && api.Maps.Location.normalizeLongitude) {
    return (longitude) => {
      if (longitude) {
        return api.Maps.Location.normalizeLongitude(longitude);
      } else {
        return undefined;
      }
    };
  } else {
    return undefined;
  }
}

Microsoft.Maps.Location.useParseLatLong.apiTypes = function parseLatLong(api) {
  if (api && api.Maps && api.Maps.Location && api.Maps.Location.parseLatLong) {
    return (str) => {
      if (str) {
        return api.Maps.Location.parseLatLong(str);
      } else {
        return undefined;
      }
    };
  } else {
    return undefined;
  }
}

Microsoft.Maps.LocationRect.apiTypes = function createLocationRect(api) {
  const _createLocation = Microsoft.Maps.Location.apiTypes(api)

  if (_createLocation && api && api.Maps && api.Maps.LocationRect) {
    return (locationRect) => {
      if (locationRect) {
        switch (typeof locationRect) {
          case 'object':
            if (locationRect instanceof api.Maps.LocationRect) {
              return locationRect;
            } else {
              const {
                center,
                width,
                height,
              } = locationRect;

              const _center = _createLocation(center);

              return new api.Maps.LocationRect(_center, width, height);
            }
          default:
            return undefined;
        }
      } else {
        return undefined;
      }
    };
  } else {
    return undefined;
  }
}

Microsoft.Maps.LocationRect.useFromCorners.apiTypes = function fromCorners(api) {
  const _createLocation = Microsoft.Maps.Location.apiTypes(api);

  if (_createLocation && api && api.Maps && api.Maps.LocationRect && api.Maps.LocationRect.fromCorners) {
    return (northwest, southeast) => {
      const _northwest = _createLocation(northwest);
      const _southeast = _createLocation(southeast);

      if (_northwest && _southeast) {
        return api.Maps.LocationRect.fromCorners(_northwest, _southeast);
      } else {
        return undefined;
      }
    };
  } else {
    return undefined;
  }
}

Microsoft.Maps.LocationRect.useFromEdges.apiTypes = function fromEdges(api) {
  if (api && api.Maps && api.Maps.LocationRect && api.Maps.LocationRect.fromEdges) {
    return (north, west, south, east) => {
      if (north && west && south && east) {
        return api.Maps.LocationRect.fromEdges(north, west, south, east);
      } else {
        return undefined;
      }
    };
  } else {
    return undefined;
  }
}

Microsoft.Maps.LocationRect.useFromLocations.apiTypes = function fromLocations(api) {
  const _createLocations = createLocations(api);

  if (_createLocations && api && api.Maps && api.Maps.LocationRect && api.Maps.LocationRect.fromLocations) {
    return (locations) => {
      const _locations = _createLocations(locations);

      if (_locations) {
        return api.Maps.LocationRect.fromLocations(_locations);
      } else {
        return undefined;
      }
    };
  } else {
    return undefined;
  }
}

Microsoft.Maps.LocationRect.useFromShapes.apiTypes = function fromShapes(api) {
  const _createShapes = createShapes(api);

  if (_createShapes && api && api.Maps && api.Maps.LocationRect && api.Maps.LocationRect.fromShapes) {
    return (shapes) => {
      const _shapes = _createShapes(shapes);

      if (_shapes) {
        return api.Maps.LocationRect.fromShapes(_shapes);
      } else {
        return undefined;
      }
    };
  } else {
    return undefined;
  }
}

Microsoft.Maps.Map.apiTypes = undefined

Microsoft.Maps.Map.useGetClosestPanorama.apiTypes = function getClosestPanorama(api) {
  const _createLocationRect = Microsoft.Maps.LocationRect.apiTypes(api);

  if (_createLocationRect && api && api.Maps && api.Maps.Map && api.Maps.Map.getClosestPanorama) {
    return (bounds, success, missingCoverage) => {
      const _bounds = _createLocationRect(bounds);

      if (bounds && success && missingCoverage) {
        return api.Maps.Map.getClosestPanorama(_bounds, success, missingCoverage);
      } else {
        return undefined;
      }
    };
  } else {
    return undefined;
  }
}

Microsoft.Maps.Map.useGetVersion.apiTypes = function getVersion(api) {
  if (api && api.Maps && api.Maps.Map && api.Maps.Map.getVersion) {
    return () => {
      return api.Maps.Map.getVersion();
    };
  } else {
    return undefined;
  }
}

Microsoft.Maps.MapOptions.apiTypes = ApiTypes.shape({
  allowHidingLabelsOfRoad: undefined,
  allowInfoboxOverflow: undefined,
  backgroundColor: ApiTypes.apiTypesOf(Microsoft.Maps.Color),
  credentials: undefined,
  customMapStyle: undefined,
  disableBirdseye: undefined,
  disableKeyboardInput: undefined,
  disableMapTypeSelectorMouseOver: undefined,
  disablePanning: undefined,
  disableScrollWheelZoom: undefined,
  disableStreetside: undefined,
  disableStreetsideAutoCoverage: undefined,
  disableZooming: undefined,
  enableClickableLogo: undefined,
  enableCORS: undefined,
  enableHighDpi: undefined,
  enableInertia: undefined,
  liteMode: undefined,
  maxBounds: ApiTypes.apiTypesOf(Microsoft.Maps.LocationRect),
  maxZoom: undefined,
  minZoom: undefined,
  navigationBarMode: ApiTypes.apiTypesOf(Microsoft.Maps.NavigationBarMode),
  navigationBarOrientation: ApiTypes.apiTypesOf(Microsoft.Maps.NavigationBarOrientation),
  showBreadcrumb: undefined,
  showDashboard: undefined,
  showLocateMeButton: undefined,
  showMapTypeSelector: undefined,
  showScalebar: undefined,
  showTrafficButton: undefined,
  showTermsLink: undefined,
  showZoomButtons: undefined,
  streetsideOptions: ApiTypes.apiTypesOf(Microsoft.Maps.StreetsideOptions),
  supportedMapTypes: ApiTypes.arrayOf(ApiTypes.apiTypesOf(Microsoft.Maps.MapTypeId)),
})

Microsoft.Maps.MapTypeId.apiTypes = ApiTypes.enum((api) => {
  if (api && api.Maps) {
    return api.Maps.MapTypeId;
  } else {
    return undefined;
  }
})

Microsoft.Maps.NavigationBarMode.apiTypes = ApiTypes.enum((api) => {
  if (api && api.Maps) {
    return api.Maps.NavigationBarMode;
  } else {
    return undefined;
  }
})

Microsoft.Maps.NavigationBarOrientation.apiTypes = ApiTypes.enum((api) => {
  if (api && api.Maps) {
    return api.Maps.NavigationBarOrientation;
  } else {
    return undefined;
  }
})

Microsoft.Maps.OverviewMapMode.apiTypes = ApiTypes.enum((api) => {
  if (api && api.Maps) {
    return api.Maps.OverviewMapMode;
  } else {
    return undefined;
  }
})

Microsoft.Maps.PanoramaInfo.apiTypes = ApiTypes.shape({
  cd: undefined,
})

Microsoft.Maps.PixelReference.apiTypes = ApiTypes.enum((api) => {
  if (api && api.Maps) {
    return api.Maps.PixelReference;
  } else {
    return undefined;
  }
})

Microsoft.Maps.Point.apiTypes = function createPoint(api) {
  if (api && api.Maps && api.Maps.Point) {
    return (point) => {
      if (point) {
        switch (typeof point) {
          case 'object':
            if (point instanceof api.Maps.Point) {
              return point;
            } else {
              const {
                x,
                y,
              } = point;

              return new api.Maps.Point(x, y);
            }
          default:
            return undefined;
        }
      } else {
        return undefined;
      }
    };
  } else {
    return undefined;
  }
}

Microsoft.Maps.PointCompression.apiTypes = undefined

Microsoft.Maps.PointCompression.useDecode.apiTypes = function decode(api) {
  if (api && api.Maps && api.Maps.PointCompression && api.Maps.PointCompression.decode) {
    return (str) => {
      if (str) {
        return api.Maps.PointCompression.decode(str);
      } else {
        return undefined;
      }
    };
  } else {
    return undefined;
  }
}

Microsoft.Maps.PointCompression.useEncode.apiTypes = function encode(api) {
  const _createLocations = createLocations(api);

  if (_createLocations && api && api.Maps && api.Maps.PointCompression && api.Maps.PointCompression.encode) {
    return (locations) => {
      const _locations = _createLocations(locations);

      if (_locations) {
        return api.Maps.PointCompression.encode(_locations);
      } else {
        return undefined;
      }
    };
  } else {
    return undefined;
  }
}

Microsoft.Maps.Polygon.apiTypes = function createPolygon(api) {
  const _createLocation = Microsoft.Maps.Location.apiTypes(api);
  const _createPolygonOptions = Microsoft.Maps.PolygonOptions.apiTypes(api);

  if (_createLocation && _createPolygonOptions && api && api.Maps && api.Maps.Polygon) {
    return (rings, options) => {
      const _rings = Array.isArray(rings) ? rings.map((ring) => Array.isArray(ring) ? ring.map(_createLocation) : _createLocation(ring)) : undefined;
      const _options = _createPolygonOptions(options);

      if (_rings && _options) {
        return new api.Maps.Polygon(_rings, _options);
      } else {
        return undefined;
      }
    };
  } else {
    return undefined;
  }
}

Microsoft.Maps.PolygonOptions.apiTypes = ApiTypes.shape({
  cursor: undefined,
  generalizable: undefined,
  fillColor: ApiTypes.apiTypesOf(Microsoft.Maps.Color),
  strokeColor: ApiTypes.apiTypesOf(Microsoft.Maps.Color),
  strokeDashArray: undefined,
  strokeThickness: undefined,
  visible: undefined,
})

Microsoft.Maps.Polyline.apiTypes = function createPolyline(api) {
  const _createLocation = Microsoft.Maps.Location.apiTypes(api);
  const _createPolylineOptions = Microsoft.Maps.PolylineOptions.apiTypes(api);

  if (_createLocation && _createPolylineOptions && api && api.Maps && api.Maps.Polyline) {
    return (locations, options) => {
      const _locations = Array.isArray(locations) ? locations.map(_createLocation) : undefined;
      const _options = _createPolylineOptions(options);

      if (_locations && _options) {
        return new api.Maps.Polyline(_locations, _options);
      } else {
        return undefined;
      }
    };
  } else {
    return undefined;
  }
}

Microsoft.Maps.PolylineOptions.apiTypes = ApiTypes.shape({
  cursor: undefined,
  generalizable: undefined,
  fillColor: ApiTypes.apiTypesOf(Microsoft.Maps.Color),
  strokeColor: ApiTypes.apiTypesOf(Microsoft.Maps.Color),
  strokeDashArray: undefined,
  strokeThickness: undefined,
  visible: undefined,
})

Microsoft.Maps.Pushpin.apiTypes = function createPushpin(api) {
  const _createLocation = Microsoft.Maps.Location.apiTypes(api);
  const _createPushpinOptions = Microsoft.Maps.PushpinOptions.apiTypes(api);

  if (_createLocation && _createPushpinOptions && api && api.Maps && api.Maps.Pushpin) {
    return (location, options) => {
      const _location = _createLocation(location);
      const _options = _createPushpinOptions(options);

      if (_location && _options) {
        return new api.Maps.Pushpin(_location, _options);
      } else {
        return undefined;
      }
    };
  } else {
    return undefined;
  }
}

Microsoft.Maps.PushpinOptions.apiTypes = ApiTypes.shape({
  anchor: ApiTypes.apiTypesOf(Microsoft.Maps.Point),
  color: ApiTypes.apiTypesOf(Microsoft.Maps.Color),
  cursor: undefined,
  draggable: undefined,
  enableClickedStyle: undefined,
  enableHoverStyle: undefined,
  icon: undefined,
  roundClickableArea: undefined,
  subTitle: undefined,
  title: undefined,
  text: undefined,
  textOffset: ApiTypes.apiTypesOf(Microsoft.Maps.Point),
  visible: undefined,
})

Microsoft.Maps.Range.apiTypes = ApiTypes.shape({
  min: undefined,
  max: undefined,
})

Microsoft.Maps.Search.GeocodeLocation.apiTypes = ApiTypes.shape({
  latitude: undefined,
  longitude: undefined,
  name: undefined,
  precision: undefined,
})

Microsoft.Maps.Search.GeocodeRequestOptions.apiTypes = ApiTypes.shape({
  bounds: ApiTypes.apiTypesOf(Microsoft.Maps.LocationRect),
  count: undefined,
  includeCountryIso2: undefined,
  includeNeighborhood: undefined,
  timeout: undefined,
  userData: undefined,
  where: undefined,
  callback: undefined,
  errorCallback: undefined,
})

Microsoft.Maps.Search.GeocodeResult.apiTypes = ApiTypes.shape({
  results: ApiTypes.arrayOf(ApiTypes.shape({
    address: ApiTypes.apiTypesOf(Microsoft.Maps.Address),
    bestView: ApiTypes.apiTypesOf(Microsoft.Maps.LocationRect),
    entityType: undefined,
    location: ApiTypes.apiTypesOf(Microsoft.Maps.Location),
    locations: ApiTypes.arrayOf(ApiTypes.apiTypesOf(Microsoft.Maps.GeocodeLocation)),
    matchCode: undefined,
    matchConfidence: undefined,
    name: undefined,
  })),
})

Microsoft.Maps.Search.MatchCode.apiTypes = ApiTypes.enum((api) => {
  if (api && api.Maps && api.Maps.Search) {
    return api.Maps.Search.MatchCode;
  } else {
    return undefined;
  }
})

Microsoft.Maps.Search.MatchConfidence.apiTypes = ApiTypes.enum((api) => {
  if (api && api.Maps && api.Maps.Search) {
    return api.Maps.Search.MatchConfidence;
  } else {
    return undefined;
  }
})

Microsoft.Maps.Search.PlaceResult.apiTypes = ApiTypes.shape({
  address: ApiTypes.apiTypesOf(Microsoft.Maps.Address),
  bestView: ApiTypes.apiTypesOf(Microsoft.Maps.LocationRect),
  entityType: undefined,
  location: ApiTypes.apiTypesOf(Microsoft.Maps.Location),
  locations: ApiTypes.arrayOf(ApiTypes.apiTypesOf(Microsoft.Maps.GeocodeLocation)),
  matchCode: undefined,
  matchConfidence: undefined,
  name: undefined,
})

Microsoft.Maps.Search.ReverseGeocodeRequestOptions.apiTypes = ApiTypes.shape({
  includeCountryIso2: undefined,
  includeEntityTypes: undefined,
  includeNeighborhood: undefined,
  location: ApiTypes.apiTypesOf(Microsoft.Maps.Location),
  timeout: undefined,
  userData: undefined,
  callback: undefined,
  errorCallback: undefined,
})

Microsoft.Maps.Search.SearchManager.apiTypes = function createSearchManager(api) {
  if (api && api.Maps && api.Maps.Search && api.Maps.Search.SearchManager) {
    return (map) => {
      if (map) {
        return new api.Maps.Search.SearchManager(map);
      } else {
        return undefined;
      }
    };
  } else {
    return undefined;
  }
}

Microsoft.Maps.SpatialMath.apiTypes = undefined

Microsoft.Maps.SpatialMath.useLocationRectToPolygon.apiTypes = function locationRectToPolygon(api) {
  const _createLocation = Microsoft.Maps.Location.apiTypes(api);

  if (_createLocation && api && api.Maps && api.maps.SpatialMath && api.Maps.SpatialMath.locationRectToPolygon) {
    return (location) => {
      const _location = _createLocation(location);

      if (_location) {
        return api.Maps.SpatialMath.locationRectToPolygon(_location);
      } else {
        return undefined;
      }
    };
  } else {
    return undefined;
  }
}

Microsoft.Maps.SpatialMath.AreaUnits.apiTypes = ApiTypes.enum((api) => {
  if (api && api.Maps && api.Maps.SpatialMath) {
    return api.Maps.SpatialMath.AreaUnits;
  } else {
    return undefined;
  }
})

Microsoft.Maps.SpatialMath.BufferEndCap.apiTypes = ApiTypes.enum((api) => {
  if (api && api.Maps && api.Maps.SpatialMath) {
    return api.Maps.SpatialMath.BufferEndCap;
  } else {
    return undefined;
  }
})

Microsoft.Maps.SpatialMath.DistanceUnits.apiTypes = ApiTypes.enum((api) => {
  if (api && api.Maps && api.Maps.SpatialMath) {
    return api.Maps.SpatialMath.DistanceUnits;
  } else {
    return undefined;
  }
})

Microsoft.Maps.SpatialMath.Geometry.apiTypes = undefined

Microsoft.Maps.SpatialMath.Geometry.useArea.apiTypes = function area(api) {
  const _createShape = createShape(api);
  const _createAreaUnits = Microsoft.Maps.SpatialMath.AreaUnits.apiTypes(api);

  if (_createShape && _createAreaUnits && api && api.Maps && api.Maps.SpatialMath && api.Maps.SpatialMath.Geometry && api.Maps.SpatialMath.Geometry.area) {
    return (shape, units) => {
      const _shape = _createShape(shape);
      const _units = _createAreaUnits(units);

      if (_shape) {
        return api.Maps.SpatialMath.Geometry.area(_shape, _units);
      } else {
        return undefined;
      }
    };
  } else {
    return undefined;
  }
}

Microsoft.Maps.SpatialMath.Geometry.useBounds.apiTypes = function bounds(api) {
  const _createShapesOrLocations = createShapesOrLocations(api);

  if (_createShapesOrLocations && api && api.Maps && api.Maps.SpatialMath && api.Maps.SpatialMath.Geometry && api.Maps.SpatialMath.Geometry.bounds) {
    return (shapes) => {
      const _shapes = _createShapesOrLocations(shapes);

      if (_shapes) {
        return api.Maps.SpatialMath.Geometry.bounds(_shapes);
      } else {
        return undefined;
      }
    };
  } else {
    return undefined;
  }
}

Microsoft.Maps.SpatialMath.Geometry.useCentroid.apiTypes = function centroid(api) {
  const _createShapes = createShapes(api);

  if (_createShapes && api && api.Maps && api.Maps.SpatialMath && api.Maps.SpatialMath.Geometry && api.Maps.SpatialMath.Geometry.centroid) {
    return (shapes) => {
      const _shapes = _createShapes(shapes);

      if (_shapes) {
        return api.Maps.SpatialMath.Geometry.centroid(_shapes);
      } else {
        return undefined;
      }
    };
  } else {
    return undefined;
  }
}

Microsoft.Maps.SpatialMath.Geometry.useDistance.apiTypes = function distance(api) {
  const _createShapesOrLocations = createShapesOrLocations(api);
  const _createDistanceUnits = Microsoft.Maps.SpatialMath.DistanceUnits.apiTypes(api);

  if (_createShapesOrLocations && _createDistanceUnits && api && api.Maps && api.Maps.SpatialMath && api.Maps.SpatialMath.Geometry && api.Maps.SpatialMath.Geometry.distance) {
    return (shapeA, shapeB, units) => {
      const _shapeA = _createShapesOrLocations(shapeA);
      const _shapeB = _createShapesOrLocations(shapeB);
      const _units = _createDistanceUnits(units);

      if (_shapeA && _shapeB) {
        return api.Maps.SpatialMath.Geometry.distance(_shapeA, _shapeB, _units);
      } else {
        return undefined;
      }
    };
  } else {
    return undefined;
  }
}

Microsoft.Maps.StreetsideOptions.apiTypes = ApiTypes.shape({
  disablePanoramaNavigation: undefined,
  locationToLookAt: ApiTypes.apiTypesOf(Microsoft.Maps.Location),
  onErrorLoading: undefined,
  onSuccessLoading: undefined,
  overviewMapMode: ApiTypes.apiTypesOf(Microsoft.Maps.OverviewMapMode),
  panoramaInfo: ApiTypes.apiTypesOf(Microsoft.Maps.PanoramaInfo),
  panoramaLookupRadius: undefined,
  showCurrentAddress: undefined,
  showExitButton: undefined,
  showHeadingCompass: undefined,
  showProblemReporting: undefined,
  showZoomButtons: undefined,
})

Microsoft.Maps.StylesOptions.apiTypes = ApiTypes.shape({
  pushpinOptions: ApiTypes.apiTypesOf(Microsoft.Maps.PushpinOptions),
  polylineOptions: ApiTypes.apiTypesOf(Microsoft.Maps.PolylineOptions),
  polygonOptions: ApiTypes.apiTypesOf(Microsoft.Maps.PolygonOptions),
})

Microsoft.Maps.SuggestionResult.apiTypes = ApiTypes.shape({
  address: ApiTypes.apiTypesOf(Microsoft.Maps.Address),
  bestView: ApiTypes.apiTypesOf(Microsoft.Maps.LocationRect),
  entityId: undefined,
  entityType: undefined,
  entitySubType: undefined,
  subtitle: undefined,
  formattedSuggestion: undefined,
  location: ApiTypes.apiTypesOf(Microsoft.Maps.Location),
  title: undefined,
})

Microsoft.Maps.TestDataGenerator.apiTypes = undefined

Microsoft.Maps.TestDataGenerator.useGetColor.apiTypes = function getColor(api) {
  if (api && api.Maps && api.Maps.TestDataGenerator && api.Maps.TestDataGenerator.getColor) {
    return (withAlpha) => {
      return api.Maps.TestDataGenerator.getColor(withAlpha);
    };
  } else {
    return undefined;
  }
}

Microsoft.Maps.TestDataGenerator.useGetLocations.apiTypes = function getLocations(api) {
  const _createLocationRect = Microsoft.Maps.LocationRect.apiTypes(api);

  if (_createLocationRect && api && api.Maps && api.Maps.TestDataGenerator && api.Maps.TestDataGenerator.getLocations) {
    return (num, bounds) => {
      const _bounds = _createLocationRect(bounds);

      return api.Maps.TestDataGenerator.getLocations(num, _bounds);
    };
  } else {
    return undefined;
  }
}

Microsoft.Maps.TestDataGenerator.useGetPolygons.apiTypes = function getPolygons(api) {
  const _createLocationRect = Microsoft.Maps.LocationRect.apiTypes(api);
  const _createPolygonOptions = Microsoft.Maps.PolygonOptions.apiTypes(api);

  if (_createLocationRect && _createPolygonOptions && api && api.Maps && api.Maps.TestDataGenerator && api.Maps.TestDataGenerator.getPolygons) {
    return (num, bounds, size, scaleFactor, options, addHole) => {
      const _bounds = _createLocationRect(bounds);
      const _options = _createPolygonOptions(options);

      return api.Maps.TestDataGenerator.getPolygons(num, _bounds, size, scaleFactor, _options, addHole);
    };
  } else {
    return undefined;
  }
}

Microsoft.Maps.TestDataGenerator.useGetPolylines.apiTypes = function getPolylines(api) {
  const _createLocationRect = Microsoft.Maps.LocationRect.apiTypes(api);
  const _createPolylineOptions = Microsoft.Maps.PolylineOptions.apiTypes(api);

  if (_createLocationRect && _createPolylineOptions && api && api.Maps && api.Maps.TestDataGenerator && api.Maps.TestDataGenerator.getPolylines) {
    return (num, bounds, size, scaleFactor, options) => {
      const _bounds = _createLocationRect(bounds);
      const _options = _createPolylineOptions(options);

      return api.Maps.TestDataGenerator.getPolylines(num, _bounds, size, scaleFactor, _options);
    };
  } else {
    return undefined;
  }
}

Microsoft.Maps.TestDataGenerator.useGetPushpins.apiTypes = function getPushpins(api) {
  const _createLocationRect = Microsoft.Maps.LocationRect.apiTypes(api);
  const _createPushpinOptions = Microsoft.Maps.PushpinOptions.apiTypes(api);

  if (_createLocationRect && _createPushpinOptions && api && api.Maps && api.Maps.TestDataGenerator && api.Maps.TestDataGenerator.getPushpins) {
    return (num, bounds, options) => {
      const _bounds = _createLocationRect(bounds);
      const _options = _createPolylineOptions(options);

      return api.Maps.TestDataGenerator.getPushpins(num, _bounds, _options);
    };
  } else {
    return undefined;
  }
}

Microsoft.Maps.TileLayer.apiTypes = function createTileLayer(api) {
  const _createTileLayerOptions = Microsoft.Maps.TileLayerOptions.apiTypes(api);

  if (_createTileLayerOptions && api && api.Maps && api.Maps.TileLayer) {
    return (options) => {
      const _options = _createTileLayerOptions(options);

      if (_options) {
        return new api.Maps.TileLayer(_options);
      } else {
        return undefined;
      }
    };
  } else {
    return undefined;
  }
}

Microsoft.Maps.TileLayerOptions.apiTypes = ApiTypes.shape({
  downloadTimeout: undefined,
  enableCors: undefined,
  mercator: ApiTypes.apiTypesOf(Microsoft.Maps.TileSource),
  opacity: undefined,
  useCredentialsForCORS: undefined,
  visible: undefined,
  zIndex: undefined,
})

Microsoft.Maps.TileSource.apiTypes = function createTileSource(api) {
  const _createTileSourceOptions = Microsoft.Maps.TileSourceOptions.apiTypes(api);

  if (_createTileSourceOptions && api && api.Maps && api.Maps.TileSource) {
    return (options) => {
      const _options = _createTileSourceOptions(options);

      if (_options) {
        return new api.Maps.TileSource(_options);
      } else {
        return undefined;
      }
    };
  } else {
    return undefined;
  }
}

Microsoft.Maps.TileSourceOptions.apiTypes = ApiTypes.shape({
  bounds: ApiTypes.apiTypesOf(Microsoft.Maps.LocationRect),
  maxZoom: undefined,
  minZoom: undefined,
  uriConstructor: undefined,
})

Microsoft.Maps.ViewOptions.apiTypes = ApiTypes.shape({
  bounds: ApiTypes.apiTypesOf(Microsoft.Maps.LocationRect),
  center: ApiTypes.apiTypesOf(Microsoft.Maps.Location),
  centerOffset: ApiTypes.apiTypesOf(Microsoft.Maps.Point),
  heading: undefined,
  labelOverlay: ApiTypes.apiTypesOf(Microsoft.Maps.LabelOverlay),
  mapTypeId: ApiTypes.apiTypesOf(Microsoft.Maps.MapTypeId),
  padding: undefined,
  pitch: undefined,
  zoom: undefined,
})

Microsoft.Maps.WellKnownText.apiTypes = undefined

Microsoft.Maps.WellKnownText.useRead.apiTypes = function read(api) {
  const _createStylesOptions = Microsoft.Maps.StylesOptions.apiTypes(api);

  if (_createStylesOptions && api && api.Maps && api.Maps.WellKnownText && api.Maps.WellKnownText.read) {
    return (wkt, styles) => {
      const _styles = _createStylesOptions(styles);

      if (wkt) {
        return api.Maps.WellKnownText.read(wkt, _styles);
      } else {
        return undefined;
      }
    };
  } else {
    return undefined;
  }
}

Microsoft.Maps.WellKnownText.useWrite.apiTypes = function write(api) {
  const _createShapes = createShapes(api);

  if (_createShapes && api && api.Maps && api.Maps.WellKnownText && api.Maps.WellKnownText.write) {
    return (data) => {
      const _data = _createShapes(data);

      if (_data) {
        return api.Maps.WellKnownText.write(_data);
      } else {
        return undefined;
      }
    };
  } else {
    return undefined;
  }
}

export default Microsoft
