import {Component} from 'react'
import './index.css'

class NotFound extends Component {
  clickHome = () => {
    const {history} = this.props
    history.replace('/')
  }

  render() {
    return (
      <div className="not-found-container">
        <img src="" alt="not-found-pic" className="not-found-image" />
        <h1 className="not-found-heading">PAGE NOT FOUND</h1>
        <p className="not-found-description">
          we are sorry, the page you requested could not be found
        </p>
        <button type="button" onClick={this.clickHome} className="button">
          Home
        </button>
      </div>
    )
  }
}

export default NotFound
