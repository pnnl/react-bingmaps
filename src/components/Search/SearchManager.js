import React from 'react'

import Microsoft from '../../hooks-custom/Microsoft'

import {
  MapContext,
} from '../Map'

export const SearchManagerContext = React.createContext(null)

const SearchManager = React.forwardRef(({
  children,
}, ref) => {
  const map = React.useContext(MapContext);

  const searchManager = Microsoft.Maps.Search.SearchManager.useConstructor(map);

  React.useImperativeHandle(ref, () => searchManager, [
    searchManager,
  ]);

  return (
    <SearchManagerContext.Provider value={searchManager}>{children}</SearchManagerContext.Provider>
  );
})

SearchManager.propTypes = {}

SearchManager.defaultProps = {}

export default React.memo(SearchManager)
