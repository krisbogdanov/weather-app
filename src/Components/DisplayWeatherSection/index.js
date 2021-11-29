import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import NoDataView from '../NoDataView';
import Loading from '../Loading';
import WeatherCard from '../WeatherCard';
import OneDayWeatherModal from '../OneDayWeatherModal';
const useStyles = makeStyles(theme => ({
  weatherCardsSection: {
    display: 'grid',
    gridTemplateColumns: 'repeat(var(--columns), 250px)',
    gap: '30px',
    placeContent: 'center',

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
}));

export default function DisplayWeatherSection({ loading = true, weather, searchedCity }) {
  const classes = useStyles()
  const [modalData, setModalData] = useState(null)

  console.log('display weather re-render')
  if (loading) return <Loading />
  if (!weather) return <NoDataView />
  return (
    <section className={classes.weatherResults}>
      {searchedCity ? <div className='heading'><img src='/loc.png' width='40px' height='40px' alt='Location icon' /> {searchedCity}</div> : null}
      <div className={classes.weatherCardsSection} style={{ '--columns': weather ? Object.keys(weather).length : 5 }}>
        {Object.keys(weather).map(date => {
          const current = weather[date][0]
          return <WeatherCard key={date} info={current} onClick={() => setModalData(weather[date])} />
        })}
      </div>
      <OneDayWeatherModal modalData={modalData} close={() => setModalData(null)} />
    </section>
  )
}