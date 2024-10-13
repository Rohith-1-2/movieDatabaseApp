import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Navbar from '../Navbar'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class MovieDetails extends Component {
  state = {
    apistatus: apiConstants.initial,
    data: {},
  }

  componentDidMount() {
    this.renderMovieDetails()
  }

  renderMovieDetails = async () => {
    this.setState({apistatus: apiConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiKey = '6574285a220431575155f6aa77ce0eea'
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`

    const response = await fetch(url)

    const data = await response.json()
    console.log(data)

    if (response.ok) {
      this.setState({apistatus: apiConstants.success, data})
    } else {
      this.setState({apistatus: apiConstants.failure})
    }
  }

  renderLoader = () => (
    <div>
      <Loader type="ThreeDots" height="50" width="50" color="#000000" />
    </div>
  )

  renderFailure = () => (
    <div>
      <h1>Something went wrong</h1>
    </div>
  )

  renderFormat = data => ({
    backdropPath: `https://image.tmdb.org/t/p/w500${data.backdrop_path}`,
    budget: data.budget,
    homepage: data.homepage,
    originalTitle: data.original_title,
    tagline: data.tagline,
    overview: data.overview,
    releaseDate: data.release_date,
    revenue: data.revenue,
    runtime: data.runtime,
    title: data.title,
  })

  renderSuccess = () => {
    const {data} = this.state
    const formattedData = this.renderFormat(data)
    const {
      backdropPath,
      budget,
      homepage,
      originalTitle,
      tagline,
      overview,
      releaseDate,
      revenue,
      runtime,
      title,
    } = formattedData

    return (
      <div className="movie-detail-container">
        <img src={backdropPath} alt={title} className="movie-poster" />
        <h1>{originalTitle}</h1>
        <h2>{tagline}</h2>
        <p>{overview}</p>
        <p>Runtime : {runtime} minutes</p>
        <p>Release Date : {releaseDate}</p>
        <p>Budget: ${budget} </p>
        <p>Revenue : ${revenue}</p>
        <button type="button" className="navigation-button">
          <a
            href={homepage}
            target="_blank"
            className="anchor-styling"
            rel="noreferrer"
          >
            Visit Website
          </a>
        </button>
      </div>
    )
  }

  renderMoviesRoute = () => {
    const {apistatus} = this.state

    switch (apistatus) {
      case apiConstants.inProgress:
        return this.renderLoader()
      case apiConstants.success:
        return this.renderSuccess()
      case apiConstants.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    const {apistatus, data} = this.state
    console.log(apistatus)
    console.log(data)

    return (
      <div>
        <Navbar />
        {this.renderMoviesRoute()}
      </div>
    )
  }
}

export default MovieDetails
