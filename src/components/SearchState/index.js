import {Link} from 'react-router-dom'
import './index.css'

const SearchState = props => {
  const {stateName, stateCode} = props

  return (
    <Link to={`/state/${stateCode}`}>
      <li>
        <p>{stateName}</p>
        <h1>{stateCode}</h1>
      </li>
    </Link>
  )
}

export default SearchState
