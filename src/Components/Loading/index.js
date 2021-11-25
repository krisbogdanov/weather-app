import React from 'react';
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    zIndex: 9,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    transform: 'translateZ(0)',
    willChange: 'transform',
    fontSize: '18px'
  },
  image: {
    width: '150px',
    transform: 'scale(1)',
    animationName: '$pulse',
    animationDuration: '1s',
    animationDelay: '0s',
    animationIterationCount: 'infinite',

  },
  '@keyframes pulse': {
    '0%': {
      transform: 'scale(0.9)',
    },
    '70%': {
      transform: 'scale(1)',
    },
    '100%': {
      transform: 'scale(0.9)',
    }
  }
}));

export default function Loading() {
  const classes = useStyles()
  return (
    <div className={classes.loading}>
      <img src='/logo.png' className={classes.image} height='150' width='150' alt={'Loading logo'} />
      <div>Loading ...</div>
    </div>
  );
}
