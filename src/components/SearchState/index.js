import {Link} from 'react-router-dom'
import {BiChevronRightSquare} from 'react-icons/bi'
import './index.css'

const SearchState = props => {
  const {stateName, stateCode} = props

  return (
    <Link to={`/state/${stateCode}`}>
      <li className="search-list-container">
        <p className="stateName">{stateName}</p>
        <div className="code-icon-container">
          <h1 className="stateCode">{stateCode}</h1>

          <BiChevronRightSquare className="arrow-icon" />
        </div>
      </li>
    </Link>
  )
}

export default SearchState
