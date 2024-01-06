import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Footer from '../Footer'
import Header from '../Header'
import './index.css'

class About extends Component {
  state = {
    isLoading: true,
    aboutData: [],
    facts: [],
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
      const factoidss = data.factoids
      console.log(data)
      this.setState({isLoading: false, aboutData: aboutDataa, facts: factoidss})
    }
  }

  renderAboutData = () => {
    const {aboutData} = this.state

    return (
      <div>
        <div className="about-container">
          <h1 className="heading">About</h1>
          <p className="update-description"> {`Last Update on `}</p>
          <p className="vaccines-description">
            COVID-19 vaccines be ready for distribution
          </p>
        </div>
        <ul className="questions-container">
          {aboutData.map(eachData => (
            <li className="question">
              <h1 className="question-heading">{eachData.question}</h1>
              <h3 className="question-answer">{eachData.answer}</h3>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderFacts = () => {
    const {facts} = this.state
    return (
      <div className="facts-container">
        <h1 className="facts-heading">Facts</h1>
        <ul className="facts-list">
          {facts.map(each => (
            <li className="fact">
              <p>{each.banner}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className="container">
        <Header />

        <div className="loader-container">
          {isLoading ? (
            <div className="loading-class" data-testid="timelinesDataLoader">
              <Loader type="Oval" color="#0A4FA0" height={50} width={50} />
            </div>
          ) : (
            <>
              <div className="background-container">
                {this.renderAboutData()}
                {this.renderFacts()}
              </div>
            </>
          )}
        </div>

        <Footer />
      </div>
    )
  }
}

export default About
