import React from 'react'

const SearchMoviesContext = React.createContext({
  searchResponse: {},
  onTriggerSearchingQuery: () => {},
})

export default SearchMoviesContext
