import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        a: {
          textDecoration: 'none',
          color: '#0000EE'
        },
        html: {
          scrollBehavior: 'smooth',
        },
        body: {
          backgroundColor: '#F6F8F9'
        },
      }
    }
  }
});

export default theme;