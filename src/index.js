import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './Store';
import { createTheme, ThemeProvider } from '@mui/material';

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#212121',
    },
    secondary: {
      main: '#357a38',
      contrastText: '#fff'
    },
    success: {
      main: '#6fbf73',
      contrastText: '#fff',
    },
    error: {
      main: '#f44336',
      contrastText: '#fff'
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'capitalize',
          borderRadius: 5,
          backgroundColor: '#728996',
          color: 'white'
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          textAlign: 'center',
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 5,
          backgroundColor: '#fff',
          marginRight: 10,
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 5,
          backgroundColor: '#fff',
          marginRight: 10,
        }
      }
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          padding: 20,
        }
      }
    },
  }
})



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <ThemeProvider theme={defaultTheme}>
        <App />
      </ThemeProvider>
    </React.StrictMode>
  </Provider>
);