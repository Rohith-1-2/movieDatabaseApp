import {Link, withRouter} from 'react-router-dom'

import SearchMoviesContext from '../../context/SearchMoviesContext'

import './index.css'

const Navbar = props => {
  const renderSearchBar = () => (
    <SearchMoviesContext.Consumer>
      {value => {
        const {
          onTriggerSearchingQuery,
          onChangeSearchInput,
          searchInput,
        } = value

        const onChangeHandler = event => onChangeSearchInput(event.target.value)

        const onSearchHandler = event => {
          event.preventDefault()
          const {history} = props
          onTriggerSearchingQuery()
          history.push(`/search`)
        }

        return (
          <div className="header-bottom-section">
            <input
              type="text"
              className="search-input"
              onChange={onChangeHandler}
              value={searchInput}
              placeholder="Search"
            />
            <button
              className="search-button"
              type="button"
              onClick={onSearchHandler}
            >
              Search
            </button>
          </div>
        )
      }}
    </SearchMoviesContext.Consumer>
  )

  return (
    <nav className="navbar-container">
      <div className="header-top-section">
        <h1 className="page-logo">movieDB</h1>
        <ul className="nav-unordered-list">
          <Link className="link-styling" to="/">
            <li className="nav-item">Popular</li>
          </Link>
          <Link className="link-styling" to="/top-rated">
            <li className="nav-item">Top Rated</li>
          </Link>
          <Link className="link-styling" to="/upcoming">
            <li className="nav-item">Upcoming</li>
          </Link>
        </ul>
      </div>
      <div className="ms-auto d-flex align-items-center">
        {renderSearchBar()}
      </div>
    </nav>
  )
}

export default withRouter(Navbar)
