import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { format } from 'date-fns';
import _ from 'lodash';
import { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import DisplayWeatherSection from '../../Components/DisplayWeatherSection';
import Search from '../../Components/Search';
const useStyles = makeStyles(theme => ({
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
  },
}));
const callAPI = async city => {
  try {
    const { REACT_APP_WEATHER_ENDPOINT, REACT_APP_WEATHER_KEY } = process.env
    const payload = await axios.get(`${REACT_APP_WEATHER_ENDPOINT}?q=${city}&appid=${REACT_APP_WEATHER_KEY}&units=metric`)
    const response = _.groupBy(payload.data.list, i => format(new Date(i.dt_txt), 'dd.MM.yyyy'))
    return response
  } catch (err) {
    return null
  }
}
export default function Home({ geo }) {
  const classes = useStyles()
  const [loading, setLoading] = useState(true)
  const [searchedCity, setSearchedCity] = useState(null)
  const [weather, setWeather] = useState(null)
  const getForecast = async (city = false) => {
    try {
      setLoading(true)
      if ((geo && geo.city) || city) {
        const response = await callAPI(city || geo.city)
        setLoading(false)
        setWeather(response)
      } else {
        setLoading(false)
      }
    } catch (err) {
      setLoading(false)
      setWeather(null)
    }
  }
  useEffect(() => {
    (async () => {
      if (geo && geo.city) {
        setLoading(true)
        const response = await callAPI(geo.city)
        setLoading(false)
        setWeather(response)
      }
    })()
  }, [geo])

  console.log('Home re-render')

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
        <Search setSearchedCity={(searchedCity) => setSearchedCity(searchedCity)} getForecast={getForecast} />
      </section>
      <DisplayWeatherSection weather={weather} loading={loading} searchedCity={searchedCity || (geo && geo.city)} />
    </div>
  )
}