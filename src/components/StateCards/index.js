import {Component} from 'react'

import './index.css'

class StateCards extends Component {
  state = {
    confirmedCard: {},
    recoveredCard: {},
    deceasedCard: {},
    activeCard: {},
  }

  componentDidMount() {
    this.totalDistrict()
  }

  totalDistrict = async () => {
    const {totalStateCards} = this.props
    const districtConfirmed = totalStateCards.confirmed
    const districtRecovered = totalStateCards.recovered
    const districtDeceased = totalStateCards.deceased
    const districtActive =
      districtConfirmed - (districtRecovered + districtDeceased)
    const confirmedCard = {
      name: 'Confirmed',
      logo:
        'https://res.cloudinary.com/dyjmh036b/image/upload/v1700643751/check-mark_1confirmed_n8cslh.svg',
      value: districtConfirmed,
    }

    const activeCard = {
      name: 'Active',
      logo:
        'https://res.cloudinary.com/dyjmh036b/image/upload/v1700643849/protection_1s_zldqg9.svg',
      value: districtActive,
    }

    const recoveredCard = {
      name: 'Recovered',
      logo:
        'https://res.cloudinary.com/dyjmh036b/image/upload/v1700643942/recovered_11_zqftl7.svg',
      value: districtDeceased,
    }

    const deceasedCard = {
      name: 'Deceased',
      logo:
        'https://res.cloudinary.com/dyjmh036b/image/upload/v1700644048/breathing_11_vgd8y1.svg',
      value: districtDeceased,
    }

    this.setState({
      confirmedCard,
      activeCard,
      recoveredCard,
      deceasedCard,
    })
  }

  cardClick = value => {
    const {stateListCards} = this.props
    stateListCards(value)
  }

  render() {
    const {confirmedCard, activeCard, recoveredCard, deceasedCard} = this.state
    const {isStateCard, category} = this.props
    const highlightc =
      category === 'Confirmed' ? 'background-color-confirmed' : ''
    const highlighta = category === 'Active' ? 'background-color-active' : ''
    const highlightr =
      category === 'Recovered' ? 'background-color-recovered' : ''
    const highlightd =
      category === 'Deceased' ? 'background-color-deceased' : ''

    return (
      <>
        <ul className="stateCards-container">
          <li
            className={`StateCard-background ${confirmedCard.name} ${highlightc}`}
            tabIndex="-1"
            key={confirmedCard.name}
            value={confirmedCard.name}
            onClick={() => this.cardClick(confirmedCard.name)}
          >
            <div data-testid="stateSpecificConfirmedCasesContainer">
              <p className="home-paragraph-heading">{confirmedCard.name}</p>
              <img
                src={confirmedCard.logo}
                alt="state specific confirmed cases pic"
                className="home-cards-logo"
              />
              <p className="home-paragraph-heading">{confirmedCard.value}</p>
            </div>
          </li>
          <li
            className={`StateCard-background ${activeCard.name} ${highlighta}`}
            tabIndex="-1"
            key={activeCard.name}
            value={activeCard.name}
            onClick={() => this.cardClick(activeCard.name)}
          >
            <div data-testid="stateSpecificActiveCasesContainer">
              <p className="home-paragraph-heading">{activeCard.name}</p>
              <img
                src={activeCard.logo}
                alt="states specific active cases pic"
                className="home-cards-logo"
              />
              <p className="home-paragraph-heading">{activeCard.value}</p>
            </div>
          </li>

          <li
            className={`StateCard-background ${recoveredCard.name} ${highlightr}  `}
            tabIndex="-1"
            key={recoveredCard.name}
            value={recoveredCard.name}
            onClick={() => this.cardClick(recoveredCard.name)}
          >
            <div data-testid="stateSpecificRecoveredCasesContainer">
              <p className="home-paragraph-heading">{recoveredCard.value}</p>
              <img
                src={recoveredCard.logo}
                alt="state specific recovered cases pic"
                className="home-cards-logo"
              />
              <p className="home-paragraph-heading green">
                {recoveredCard.value}
              </p>
            </div>
          </li>

          <li
            className={`StateCard-background ${deceasedCard.name}  ${highlightd}`}
            tabIndex="-1"
            key={deceasedCard.name}
            value={deceasedCard.name}
            onClick={() => this.cardClick(deceasedCard.name)}
          >
            <div data-testid="stateSpecificDeceasedCasesContainer">
              <p className="home-paragraph-heading">{deceasedCard.name}</p>
              <img
                src={deceasedCard.logo}
                alt="state specific deceased cases pic"
                className="home-cards-logo"
              />
              <p className="home-paragraph-heading">{deceasedCard.value}</p>
            </div>
          </li>
        </ul>
      </>
    )
  }
}

export default StateCards
