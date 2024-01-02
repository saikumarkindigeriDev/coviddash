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
      <img
        className="logo"
        src="https://res.cloudinary.com/dyjmh036b/image/upload/v1704003879/Vectora_coaenl.svg"
        alt="github"
      />
      <img
        className="logo"
        src="https://res.cloudinary.com/dyjmh036b/image/upload/v1704004102/instagraminsta_klrbfo.svg"
        alt="instagram"
      />
      <img
        className="logo"
        src="https://res.cloudinary.com/dyjmh036b/image/upload/v1704004092/Twitter_bird_logo_2012_1twitter_wxnlof.svg"
        alt="twitter"
      />
    </div>
  </div>
)

export default Footer
