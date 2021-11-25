import React from 'react';
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
  noData: {
    fontSize: '18px',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '500px',
    margin: 'auto',
    alignItems: 'center',
    textAlign: 'center',
    '& img': {
      margin: '20px'
    }
  },
}));

export default function NoDataView() {
  const classes = useStyles()
  return (
    <div className={classes.noData}>
      <img src='/no-data.png' height='300' width='300' alt={'No Data'} />
      <div>
        <div>We couldn't find the locaiton you are looking for.</div>
        <div>Please refine your search and try again.</div>
      </div>
    </div>
  );
}
