import { makeStyles } from '@mui/styles';
import React from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    height: '150px',
    width: '100%',
    background: '#66abee',
    display: 'grid',
    gridTemplateRows: 'repeat(2, 1fr)',
    '& .rights': {
      fontSize: '16px',
      margin: 'auto'
    },
    '& .powered': {
      display: 'flex',
      justifyContent: 'flex-end',
      margin: 'auto 20px',
      '& a': {
        textDecoration: 'none'
      }
    }
  }

}));

export default function Footer() {
  const classes = useStyles()
  return <div className={classes.root}>
    <div className='rights'>Weather App Ltd. All rights reserved 2021</div>
    <div className='powered'>Powered by: &nbsp;<a href='https://openweathermap.org/'>OpenWeather</a></div>
  </div>
}