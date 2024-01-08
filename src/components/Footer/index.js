import {VscGithubAlt} from 'react-icons/vsc'
import {FiInstagram} from 'react-icons/fi'
import {FaTwitter} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="footer-container">
    <h1>
      <span className="app-name">COVID19</span>
      <span className="app-name blue-text">INDIA</span>
    </h1>
    <p className="description">
      we stand with everyone fighting on the front lines
    </p>
    <div className="logos-container">
      <VscGithubAlt size={40} color="#ffffff" className="logo" />

      <FiInstagram size={40} color="#ffffff" className="logo" />
      <FaTwitter size={40} color="#ffffff" className="logo" />
    </div>
  </div>
)

export default Footer
