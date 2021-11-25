import { Component } from 'react';
import { withStyles } from '@mui/styles';
import { Autocomplete, TextField } from '@mui/material';
import Helmet from 'react-helmet'
import axios from 'axios';
import _ from 'lodash';
import { format } from 'date-fns'
import WeatherCard from '../../Components/WeatherCard';
import OneDayWeatherModal from '../../Components/OneDayWeatherModal';
import Loading from '../../Components/Loading';
import NoDataView from '../../Components/NoDataView';
const styles = () => ({
  root: {
    height: 'calc(100vh - 233px)',
    background: '#f5f5f5',
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
      textTransform: 'capitalize',
      margin: '20px auto',
      justifyContent: 'center',
      '& img': {
        marginRight: '10px'
      }
    }
  },
  weatherCardsSection: {
    display: 'grid',
    gridTemplateColumns: 'repeat(var(--columns), 250px)',
    gap: '30px',
    placeContent: 'center',

  }
})

class Home extends Component {
  searchTimerInterval = null
  state = {
    weather: null,
    error: null,
    loading: false,
    modalData: false,
    searchedCity: null
  }
  async componentDidMount() {
    await this.getForecast()
  }
  async componentDidUpdate(prevProps) {
    const { geo } = this.props
    if (geo && !prevProps.geo) {
      await this.getForecast()
    }
  }
  getForecast = async (city = false) => {
    try {
      this.setState({ loading: true })
      const { geo } = this.props
      if ((geo && geo.city) || city) {
        const { REACT_APP_WEATHER_ENDPOINT, REACT_APP_WEATHER_KEY } = process.env
        const payload = await axios.get(`${REACT_APP_WEATHER_ENDPOINT}?q=${city || geo.city}&appid=${REACT_APP_WEATHER_KEY}&units=metric`)
        const response = _.groupBy(payload.data.list, i => format(new Date(i.dt_txt), 'dd.MM.yyyy'))
        this.setState({ loading: false, weather: response })
      } else {
        this.setState({ loading: false, error: 'We could not detect your location automatically. Please, use the search functionality to check the weather at your desired location.' })
      }
    } catch (err) {
      this.setState({ error: err.message, loading: false })
    }
  }
  search = async (value) => {
    if (value && value.length > 3) {
      await this.getForecast(value)
      this.setState({ searchedCity: value })
    }
  }
  searchForLocation = (value) => {
    clearTimeout(this.searchTimerInterval)
    this.searchTimerInterval = setTimeout(() => this.search(value), 500)
  }
  openModal = (data) => {
    this.setState({ modalData: data })
  }
  render() {
    const { classes, geo } = this.props
    const { weather, modalData, searchedCity, loading } = this.state
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
              id='search-box'
              size='small'
              // getOptionLabel={(location) => location.city}
              options={[]}
              autoComplete={false}
              includeInputInList
              filterSelectedOptions
              renderInput={(params) => (
                <TextField {...params} onKeyUp={(e) => this.searchForLocation(e.target.value)} onKeyDown={() => clearTimeout(this.searchTimerInterval)} label={'Search for location'} variant="outlined" fullWidth />
              )}
            />
          </div>
        </section>
        {weather ?
          <section className={classes.weatherResults}>
            {loading ? <Loading /> :
              <>
                {searchedCity || (geo && geo.city) ?
                  <div className='heading'><img src='/loc.png' width='40px' height='40px' alt='Location icon' /> {searchedCity || geo.city}</div>
                  : null
                }
                <div className={classes.weatherCardsSection} style={{ '--columns': weather ? Object.keys(weather).length : 5 }}>
                  {Object.keys(weather).map(date => {
                    const current = weather[date][0]
                    return <WeatherCard key={date} info={current} onClick={() => this.openModal(weather[date])} />

                  })}
                </div>
              </>
            }
          </section>
          :
          <NoDataView />
        }
        {modalData ? <OneDayWeatherModal modalData={modalData} close={() => this.setState({ modalData: null })} /> : null}
      </div>
    )
  }
}

export default withStyles(styles)(Home);