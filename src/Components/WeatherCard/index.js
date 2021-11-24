import { makeStyles } from '@mui/styles';
import React from 'react';
import { format } from 'date-fns'
const useStyles = makeStyles(theme => ({
  card: {
    height: '350px',
    width: '250px',
    borderRadius: 20,
    background: '#fff',
    padding: '10px',
    textAlign: 'center',
    placeContent: 'center',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '25px 25px 100px 40px 40px 40px',
    '&:hover': {
      cursor: 'pointer',
      boxShadow: '0px 5px 20px #0000001a'
    },
    '& > *': {
      fontWeight: '500',
      fontSize: '18px',
    },
    '& .image': {
      justifySelf: 'center'
    },
    '& .date': {
      color: 'grey',
      fontSize: '14px',
      fontWeight: '400'
    },
    '& .wind': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '& img': {
        marginRight: 5
      }
    },
    '& .condition': {
      textTransform: 'capitalize'
    }
  },
}));

export default function WeatherCard({ info = false, onClick = () => { } }) {
  const classes = useStyles()
  if (!info) return null
  const { dt_txt = '', weather = [], main = {}, wind = {} } = info
  return (
    <div className={classes.card} onClick={onClick}>
      <div className='day'>{format(new Date(dt_txt), 'cccc')}</div>
      <div className='date'>{format(new Date(dt_txt), 'dd.MM.yyyy HH:mm')}</div>
      <div className='image'>{weather[0] ? <img src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} width='100' height='100' alt={weather[0].description} /> : null}</div>
      <div className='temp'>
        <span className='min'>{parseFloat(main.temp).toFixed(0)} &#8451;</span>
      </div>
      <div className='wind'><img src='/wind.jpg' width='20' height='15' alt='wind' />{wind ? wind.speed : null} m/s</div>
      <div className='condition'>{weather[0] ? weather[0].description : null}</div>
    </div>
  )
}