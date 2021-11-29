import { Autocomplete, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

const useStyles = makeStyles(theme => ({
  search: {
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

}));

export default function Search({ getForecast = () => { }, setSearchedCity = () => { } }) {
  let searchTimerInterval = null
  const classes = useStyles()
  const search = async (value) => {
    if (value && value.length > 3) {
      await getForecast(value)
      setSearchedCity(value)
    }
  }
  const searchForLocation = (value) => {
    clearTimeout(searchTimerInterval)
    searchTimerInterval = setTimeout(() => search(value), 500)
  }
  return <div className={classes.search}>
    <div className='label'>Check the weather for other locations</div>
    <Autocomplete
      fullWidth
      id='search-box'
      size='small'
      options={[]}
      autoComplete={false}
      includeInputInList
      filterSelectedOptions
      renderInput={(params) => (
        <TextField
          {...params}
          onKeyUp={(e) => searchForLocation(e.target.value)}
          onKeyDown={() => clearTimeout(searchTimerInterval)}
          label={'Search for location'}
          variant="outlined"
          fullWidth
        />
      )}
    />
  </div>
}