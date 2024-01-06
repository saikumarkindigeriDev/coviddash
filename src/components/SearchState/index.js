import {Link} from 'react-router-dom'
import './index.css'

const SearchState = props => {
  const {stateName, stateCode} = props

  return (
    <Link to={`/state/${stateCode}`}>
      <li className="search-list-container">
        <p className="stateName">{stateName}</p>
        <div className="code-icon-container">
          <h1 className="stateCode">{stateCode}</h1>
          <img
            src="https://res.cloudinary.com/dyjmh036b/image/upload/v1704361023/Line_jwidjb.svg"
            alt="arrow-icon"
            className="arrow-icon"
          />
        </div>
      </li>
    </Link>
  )
}

export default SearchState
