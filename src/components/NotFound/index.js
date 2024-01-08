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
        <img
          src="https://res.cloudinary.com/dyjmh036b/image/upload/v1704557035/d8b3d729-4cb7-4646-9117-ded8bb7235c1_vpu7p4.jpg"
          alt="not-found-pic"
          className="not-found-image"
        />
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
