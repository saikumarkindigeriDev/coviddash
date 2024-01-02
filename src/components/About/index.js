import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Footer from '../Footer'
import Header from '../Header'
import './index.css'

class About extends Component {
  state = {
    isLoading: true,
    aboutData: [],
  }

  componentDidMount() {
    this.getAboutData()
  }

  getAboutData = async () => {
    const url = 'https://apis.ccbp.in/covid19-faqs'
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      const aboutDataa = data.faq
      this.setState({isLoading: false, aboutData: aboutDataa})
    }
  }

  renderAboutData = () => {
    const {aboutData} = this.state

    return (
      <div>
        <h1>About</h1>
        <p> {`Last Update on `}</p>
        <p>COVID-19 vaccines be ready for distribution</p>
        <ul className="questions-container">
          {aboutData.map(eachData => (
            <li className="question">
              <h1>{eachData.question}</h1>
              <h3>{eachData.answer}</h3>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div>
        <Header />

        {isLoading ? (
          <div className="loading-class" data-testid="timelinesDataLoader">
            <Loader type="Oval" color="#0A4FA0" height={50} width={50} />
          </div>
        ) : (
          <>{this.renderAboutData()}</>
        )}
        <Footer />
      </div>
    )
  }
}

export default About
