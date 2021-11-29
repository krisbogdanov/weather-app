import { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'
import axios from 'axios'
import Home from './Pages/Home'
import Footer from './Components/Footer'
import TopNavigation from './Components/TopNavigation'

class App extends Component {
  state = {
    geoLocation: null,
    geoError: false,
    loading: false
  }
  async componentDidMount() {
    try {
      this.setState({ loading: true })
      const { REACT_APP_GEO_ENDPOINT } = process.env
      const response = await axios.get(REACT_APP_GEO_ENDPOINT)
      this.setState({ loading: false, geoLocation: response.data })
    } catch (err) {
      this.setState({ geoError: err.message, loading: false })

    }
  }
  render() {
    const { geoLocation } = this.state
    console.log('App re-render')
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
