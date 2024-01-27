import {Component} from 'react'
import Loader from 'react-loader-spinner'

import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import {BsSearch} from 'react-icons/bs'
import SearchState from '../SearchState'
import ListOfState from '../ListOfState'

// import SearchState from '../SearchState'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

class HomeRoute extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
    listOfSearchStates: [],
    listOfCovidStates: [],
    totalConfirmed: 0,
    totalRecovered: 0,
    totalDeceased: 0,
    totalActive: 0,
  }

  componentDidMount() {
    this.listOfCovidIndia()
  }

  listOfCovidIndia = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()

      let confirmedCase = 0
      let recoveredCase = 0
      let deceasedCase = 0
      let activeCase = 0

      statesList.forEach(stateCode => {
        if (data[stateCode.state_code]) {
          const {total} = data[stateCode.state_code]
          confirmedCase += total.confirmed ? total.confirmed : 0
          recoveredCase += total.recovered ? total.recovered : 0
          deceasedCase += total.deceased ? total.deceased : 0
        }
      })

      activeCase += confirmedCase - (recoveredCase + deceasedCase)

      const listOfCovidTableStates = statesList.map(eachItem => ({
        stateName: eachItem.state_name,
        stateCode: eachItem.state_code,
        listOfConfirmed: Object.keys(data)
          .filter(stateItem => stateItem === eachItem.state_code)
          .map(each => data[each].total.confirmed),
        listOfRecovered: Object.keys(data)
          .filter(stateItem => stateItem === eachItem.state_code)
          .map(each => data[each].total.recovered),
        listOfDeceased: Object.keys(data)
          .filter(stateItem => stateItem === eachItem.state_code)
          .map(each => data[each].total.deceased),
        listOfOther: Object.keys(data)
          .filter(stateItem => stateItem === eachItem.state_code)
          .map(each => data[each].total.other),
        listOfPopulation: Object.keys(data)
          .filter(stateItem => stateItem === eachItem.state_code)
          .map(each => data[each].meta.population),
      }))

      this.setState({
        totalConfirmed: confirmedCase,
        totalRecovered: recoveredCase,
        totalDeceased: deceasedCase,
        totalActive: activeCase,
        apiStatus: apiStatusConstants.success,

        listOfCovidStates: listOfCovidTableStates,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  searchInputList = event => {
    const search = event.target.value
    const searchList = statesList.filter(eachItem =>
      eachItem.state_name.toLowerCase().includes(search.toLowerCase()),
    )

    this.setState({
      searchInput: event.target.value,
      listOfSearchStates: searchList,
    })
  }

  searchInputRemove = () => {
    this.setState({listOfSearchStates: []})
  }

  ascSortClicked = () => {
    const {listOfCovidStates} = this.state
    const sort = listOfCovidStates.sort((sortA, sortB) => {
      const a = sortA.stateName.toUpperCase()
      const b = sortB.stateName.toUpperCase()
      return a > b ? 1 : -1
    })

    this.setState({listOfCovidStates: sort})
  }

  decSortClicked = () => {
    const {listOfCovidStates} = this.state
    const sort = listOfCovidStates.sort((sortA, sortB) => {
      const a = sortA.stateName.toUpperCase()
      const b = sortB.stateName.toUpperCase()
      return a < b ? 1 : -1
    })

    this.setState({listOfCovidStates: sort})
  }

  listOfStateTable = () => {
    const {listOfCovidStates} = this.state

    return (
      <div className="state-table" data-testid="stateWiseCovidDataTable">
        <ul className="state-result-table">
          <li className="state-result-heading ">
            <div className="state-ul-holder">
              <p className="home-table-state-paragraph">States/UT</p>
              {/* eslint-disable-next-line */}
              <button
                type="button"
                className="icon-button"
                onClick={this.ascSortClicked}
                data-testid="ascendingSort"
              >
                <FcGenericSortingAsc className="ascending-icon" />
              </button>
              {/* eslint-disable-next-line */}
              <button
                type="button"
                className="icon-button"
                onClick={this.decSortClicked}
                data-testid="descendingSort"
              >
                <FcGenericSortingDesc className="ascending-icon" />
              </button>
            </div>

            <p className="general-column-title">Confirmed </p>
            <p className="general-column-title">Active </p>
            <p className="general-column-title">Recovered </p>
            <p className="general-column-title">Deceased </p>
            <p className="general-column-title">Population</p>
          </li>
        </ul>
        <hr width="100%" color="#475569" />
        <ul className="state-result-table">
          {listOfCovidStates.map(eachItem => (
            <ListOfState key={eachItem.stateCode} stateList={eachItem} />
          ))}
        </ul>
      </div>
    )
  }

  listOfSearch = () => {
    const {listOfSearchStates} = this.state

    return (
      <ul data-testid="searchResultsUnorderedList" className="search-container">
        {listOfSearchStates.map(eachItem => (
          <SearchState
            stateName={eachItem.state_name}
            stateCode={eachItem.state_code}
            key={eachItem.state_code}
            id={eachItem.state_code}
          />
        ))}
      </ul>
    )
  }

  listOfCovidCards = () => {
    const {
      totalConfirmed,
      totalDeceased,
      totalRecovered,
      totalActive,
    } = this.state

    return (
      <>
        <div className="card-container-row">
          <div className="card-list" data-testid="countryWideConfirmedCases">
            <p className="home-paragraph-heading-red">Confirmed</p>
            <img
              src="https://res.cloudinary.com/dyjmh036b/image/upload/v1700643751/check-mark_1confirmed_n8cslh.svg"
              alt="country wide confirmed cases pic"
              className="home-cards-logo"
            />
            <p className="home-paragraph-heading-red">{totalConfirmed}</p>
          </div>
          <div className="card-list" data-testid="countryWideActiveCases">
            <p className="home-paragraph-heading-blue">Active</p>
            <img
              src="https://res.cloudinary.com/dyjmh036b/image/upload/v1700643849/protection_1s_zldqg9.svg"
              alt="country wide active cases pic"
              className="home-cards-logo"
            />
            <p className="home-paragraph-heading-blue">{totalActive}</p>
          </div>
          <div className="card-list" data-testid="countryWideRecoveredCases">
            <p className="home-paragraph-heading-green">Recovered</p>
            <img
              src="https://res.cloudinary.com/dyjmh036b/image/upload/v1700643942/recovered_11_zqftl7.svg"
              alt="country wide recovered cases pic"
              className="home-cards-logo"
            />
            <p className="home-paragraph-heading-green">{totalRecovered}</p>
          </div>
          <div className="card-list" data-testid="countryWideDeceasedCases">
            <p className="home-paragraph-heading-grey">Deceased</p>
            <img
              src="https://res.cloudinary.com/dyjmh036b/image/upload/v1700644048/breathing_11_vgd8y1.svg"
              alt="country wide deceased cases pic"
              className="home-cards-logo"
            />
            <p className="home-paragraph-heading-grey">{totalDeceased}</p>
          </div>
        </div>
      </>
    )
  }

  renderLoadingView = () => (
    <div className="homeRouteLoader" data-testid="homeRouteLoader">
      <Loader type="Oval" color="#007BFF" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {
    const {listOfSearchStates, searchInput} = this.state
    const searchResult =
      listOfSearchStates.length === 0 ? '' : this.listOfSearch()
    return (
      <>
        <div className="home-search">
          <div className="home-search-container">
            {this.loadingFalse}

            <div className="icon-container">
              <BsSearch className="search-icon" />
            </div>

            <input
              type="search"
              className="search-input"
              placeholder="Enter the State"
              onChange={this.searchInputList}
            />
          </div>
          <div className="listOfStatesContainer">
            {searchInput.length > 0 ? searchResult : ''}
          </div>
        </div>

        {searchInput.length > 0 ? (
          ''
        ) : (
          <div className="covid-lists">
            {this.listOfCovidCards()}
            {this.listOfStateTable()}
          </div>
        )}
      </>
    )
  }

  renderFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="all-products-error"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

  renderView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <div className="covid-home-container">{this.renderView()}</div>
  }
}

export default HomeRoute
