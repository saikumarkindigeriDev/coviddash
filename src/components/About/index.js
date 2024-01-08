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

      this.setState({isLoading: false, aboutData: aboutDataa, facts: factoidss})
    }
  }

  renderAboutData = () => {
    const {aboutData} = this.state

    return (
      <ul className="questions-container" data-testid="faqsUnorderedList">
        {aboutData.map(eachData => (
          <li className="question" key={`${eachData.question}`}>
            <h1 className="question-heading">{eachData.question}</h1>
            <h3 className="question-answer">{eachData.answer}</h3>
          </li>
        ))}
      </ul>
    )
  }

  renderFacts = () => {
    const {facts} = this.state
    return (
      <div className="facts-container">
        <h1 className="facts-heading">Facts</h1>
        <ul className="facts-list">
          {facts.map(each => (
            <li className="fact" key={`${each.banner}`}>
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
            <div className="loading-class" data-testid="aboutRouteLoader">
              <Loader type="Oval" color="#0A4FA0" height={50} width={50} />
            </div>
          ) : (
            <>
              <div className="background-container">
                <div>
                  <div className="about-container">
                    <h1 className="heading">About</h1>
                    <p className="update-description">
                      {' '}
                      Last update on march 28th 2021.
                    </p>
                    <p className="vaccines-description">
                      COVID-19 vaccines be ready for distribution
                    </p>
                  </div>
                </div>
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
