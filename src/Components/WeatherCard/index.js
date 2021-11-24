import { makeStyles } from '@mui/styles';
import React from 'react';
import { format } from 'date-fns'
const useStyles = makeStyles(theme => ({
  card: {
    height: '350px',
    width: '100%',
    borderRadius: 20,
    background: '#f5f5f5',
    display: 'grid',
    placeContent: 'center',
    gridTemplateRows: '25px 25px 100px 40px 40px 40px',
    '&:hover': {
      cursor: 'pointer',
      boxShadow: '0px 5px 20px #0000001a'
    }
  },
}));

export default function WeatherCard({ info = false, onClick = () => { } }) {
  const classes = useStyles()
  if (!info) return null
  const { dt_txt, weather, main, wind } = info
  return (
    <div className={classes.card} onClick={onClick}>
      <div className='day'>{format(new Date(dt_txt), 'cccc')}</div>
      <div className='date'>{dt_txt.split(' ')[0]}</div>
      <div className='image'>{weather && weather[0] ? weather[0].main : null}</div>
      <div className='temp'>
        <span className='min'>{parseFloat(main.temp_min).toFixed(0)}</span>
        /
        <span className='max'>{parseFloat(main.temp_max).toFixed(0)}</span>
      </div>
      <div className='wind'>{wind ? wind.speed : null}</div>
      <div className='condition'>{weather && weather[0] ? weather[0].description : null}</div>
    </div>
  )
}