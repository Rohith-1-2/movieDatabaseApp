import {Link} from 'react-router-dom'
import './index.css'

const MovieCard = props => {
  const {movieDetails} = props
  const {id, title, posterPath, voteAverage} = movieDetails

  return (
    <li className="movie-card-container">
      <img className="movie-card-image" alt={title} src={posterPath} />
      <div className="movie-details">
        <h2 className="movie-title">{title}</h2>
        <p className="rating-styling">Rating: {voteAverage}</p>
      </div>
      <Link to={`/movie/${id}`} className="link-styling">
        <button className="view-details" type="button">
          View Details
        </button>
      </Link>
    </li>
  )
}

export default MovieCard
