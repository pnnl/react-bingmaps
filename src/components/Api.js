import React from 'react'
import PropTypes from 'prop-types'

export const $ApiContext = React.createContext(null)

export const ApiContext = React.createContext(null)

const Api = ({
  apiKey,
  loadModule,
  registerModule,
  uriConstructor,
  children,
}) => {
  const [$api, $setApi] = React.useState(null);

  const [api, setApi] = React.useState(null);

  React.useEffect(() => {
    if (api) {
      return;
    }

    const handleLoaded = () => {
      $setApi(window.$MicrosoftMaps8);

      setApi(window.Microsoft);
    };

    const callback = () => {
      if (Array.isArray(registerModule)) {
        registerModule.forEach(({
          moduleKey,
          scriptURL,
          styleURLs = [],
        }) => {
          window.Microsoft.Maps.registerModule(moduleKey, scriptURL, { styleURLs, });
        });
      }

      if ((typeof loadModule === 'string') || (Array.isArray(loadModule) && (loadModule.length > 0))) {
        window.Microsoft.Maps.loadModule(loadModule, {
          callback: handleLoaded,
          credentials: apiKey,
        });
      } else {
        handleLoaded();
      }
    };

    if (window.Microsoft && window.Microsoft.Maps) {
      callback();
    } else {
      const callbackName = `${Date.now()}${Math.random()}`.replace('.', '');

      window[callbackName] = () => {
        delete window[callbackName];

        callback();
      };

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.defer = true;
      script.src = (typeof uriConstructor === 'string') ? uriConstructor.replace('{callback}', callbackName).replace('{key}', apiKey) : uriConstructor({
        callback: callbackName,
        key: apiKey,
      });
      document.body.appendChild(script);
    }
  }, [
    apiKey,
    loadModule,
    registerModule,
    uriConstructor,
    api,
  ]);

  return (
    <$ApiContext.Provider value={$api}><ApiContext.Provider value={api}>{children}</ApiContext.Provider></$ApiContext.Provider>
  );
}

Api.propTypes = {
  apiKey: PropTypes.string.isRequired,
  loadModule: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  registerModule: PropTypes.arrayOf(PropTypes.exact({
    moduleKey: PropTypes.string.isRequired,
    scriptURL: PropTypes.string.isRequired,
    styleURLs: PropTypes.arrayOf(PropTypes.string),
  })).isRequired,
  uriConstructor: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]).isRequired,
}

Api.defaultProps = {
  apiKey: '[YOUR_BING_MAPS_KEY]',
  loadModule: [],
  registerModule: [],
  uriConstructor: 'https://www.bing.com/api/maps/mapcontrol?callback={callback}&key={key}',
}

export default React.memo(Api)
