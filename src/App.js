import { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'
// import axios from 'axios'
import Home from './Pages/Home'
import Footer from './Components/Footer'
import TopNavigation from './Components/TopNavigation'

class App extends Component {
  state = {
    geoLocation: {
      IPv4: "31.211.142.128",
      city: "Pleven",
      country_code: "BG",
      country_name: "Bulgaria",
      latitude: 43.4167,
      longitude: 24.6167,
      postal: "5800",
      state: "Oblast Pleven"
    },
    geoError: false,
    loading: false
  }
  async componentDidMount() {
    try {
      // this.setState({ loading: true })
      // const { REACT_APP_GEO_ENDPOINT } = process.env
      // const response = await axios.get(REACT_APP_GEO_ENDPOINT)
      // console.log(response)
      // this.setState({ loading: false, geoLocation: response.data })
    } catch (err) {
      this.setState({ geoError: err.message, loading: false })

    }
  }
  render() {
    const { geoLocation } = this.state
    return (
      <div>
        <TopNavigation />
        <Switch>
          <Route exact path='/'>
            <Home geo={geoLocation} />
          </Route>
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(props => <App {...props} />);
