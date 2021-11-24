import { AppBar, Toolbar } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: '1002',
    position: 'sticky',
    // marginBottom: '-143px',
    '& .MuiAppBar-root': {
      top: 0,
      zIndex: 999,
    },
    boxShadow: 'unset'
  },
  toolbar: {
    height: '83px',
    background: '#66abee',
  },
  maxWidth: {
    maxWidth: '1698px',
    margin: 'auto',
    '& .logo-container': {
      display: 'flex',
      alignItems: 'center',
      '& a': {
        textDecoration: 'none',
        color: 'white'
      },
    },
    [theme.breakpoints.down('lg')]: {
      margin: 'auto 67px',
    },
    [theme.breakpoints.down('md')]: {
      margin: 'auto 45px',
      '& .drawerWrapper': {
        '& .MuiSvgIcon-fontSizeLarge': {
          fontSize: '2.6rem',
          color: 'white',
        },
        marginLeft: '3.4%',
        cursor: 'pointer',
        display: 'flex'
      },
    },
    [theme.breakpoints.down('xs')]: {
      margin: 0
    },
    display: 'flex',
    position: 'relative',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },

  logo: {
    margin: 'auto 10px auto auto',
    height: '70px',
    width: 'auto',
    [theme.breakpoints.down('md')]: {
      height: '35px',
    },
    [theme.breakpoints.down('xs')]: {
      height: '28px',
    },
  },

}));

export default function TopNavigation() {
  const classes = useStyles()
  return <Fragment>
    <AppBar className={`${classes.appBar} appNavigation`}>
      <Toolbar className={classes.toolbar} disableGutters>
        <div className={`${classes.maxWidth}`}>
          <div className='logo-container'>
            <Link style={{ display: 'flex' }} to={'/'}>
              <img src='/logo.png' width='70' height='70' alt='Weather logo' className={classes.logo} /> <span>Weather App</span>
            </Link>
          </div>
        </div>
      </Toolbar>
    </AppBar >
    <Toolbar style={{ background: 'transparent' }} className={classes.toolbar} disableGutters />
  </Fragment >
}