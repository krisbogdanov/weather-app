import { Component } from 'react';
// import axios from 'axios';
import { withStyles } from '@mui/styles';
import { Autocomplete, TextField } from '@mui/material';
import Helmet from 'react-helmet'
import axios from 'axios';
const styles = (theme) => ({
  root: {

  },
  hero: {
    height: '350px',
    position: 'relative',
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    '& .search': {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      margin: 'auto',
      width: '500px',
      height: '100px',
      '& .MuiAutocomplete-root': {
        background: 'white',
        borderRadius: '4px'
      },
      '& .label': {
        fontSize: '20px',
        marginBottom: '10px',
        textAlign: 'center',
      }
    }
  },

  weatherResults: {
    '& .heading': {
      fontSize: '30px',
      display: 'flex',
      width: '200px',
      margin: 'auto',
      justifyContent: 'center',
      '& img': {
        marginRight: '10px'
      }
    }
  },
  weatherCardsSection: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 250px)',
    gap: '30px',
    placeContent: 'center',
    '& .card': {
      height: '350px',
      width: '100%',
      borderRadius: 20,
      background: '#e0e0e0'
    }
  }
})

class Home extends Component {
  searchTimerInterval = null
  state = {
    weather: null,
    error: null,
    loading: false,
    searchResults: []
  }
  async componentDidMount() {
    try {
      // this.setState({ loading: true })
      // const { geo } = this.props
      // if (geo && geo.city) {
      //   const { REACT_APP_WEATHER_ENDPOINT, REACT_APP_WEATHER_KEY } = process.env
      //   const response = await axios.get(`${REACT_APP_WEATHER_ENDPOINT}?q=${geo.city}&appid=${REACT_APP_WEATHER_KEY}&units=metric`)
      //   console.log(response.data)
      //   this.setState({ loading: false, weather: response.data })
      // } else {
      //   this.setState({ loading: false, error: 'We could not detect your location automatically. Please, use the search functionality to check the weather at your desired location.' })
      // }
    } catch (err) {
      this.setState({ error: err.message, loading: false })

    }
  }
  search = async (value) => {
    if (value && value.length > 3) {
      // const searchResults = await axios.get(`${REACT_APP_WEATHER_ENDPOINT}?q=${geo.city}&appid=${REACT_APP_WEATHER_KEY}&units=metric`)
      this.setState({ searchResults: [] })
    }
  }
  searchForLocation = (value) => {
    clearTimeout(this.searchTimerInterval)
    this.searchTimerInterval = setTimeout(() => this.search(value), 500)
  }
  render() {
    const { classes, geo } = this.props
    const { searchResults } = this.state
    return (
      <div className={classes.root}>
        <Helmet>
          <title>Weather App</title>
        </Helmet>
        <section className={classes.hero}>
          <picture>
            <source srcSet='/hero.webp' type='image/webp' />
            <img src='/hero.jpg' loading={'eager'} alt={'Hero section'} />
          </picture>
          <div className='search'>
            <div className='label'>Check the weather for other locations</div>
            <Autocomplete
              fullWidth
              size='small'
              getOptionLabel={(location) => location.city}
              options={searchResults}
              autoComplete
              includeInputInList
              filterSelectedOptions
              onKeyUp={(e) => this.searchForLocation(e.target.value)}
              onKeyDown={() => clearTimeout(this.searchTimerInterval)}
              className={classes.searchInput}
              renderInput={(params) => (
                <TextField {...params} label={'Search for location'} variant="outlined" fullWidth />
              )}
              renderOption={(city) => city}
            />
          </div>
        </section>

        <section className={classes.weatherResults}>
          {geo && geo.city &&
            <div className='heading'><img src='/loc.png' width='40px' height='40px' alt='Location icon'/> {geo.city}</div>
          }
          <div className={classes.weatherCardsSection}>
            <div className='card'>1</div>
            <div className='card'>2</div>
            <div className='card'>3</div>
            <div className='card'>4</div>
            <div className='card'>5</div>
          </div>
        </section>
      </div>
    )
  }
}

export default withStyles(styles)(Home);