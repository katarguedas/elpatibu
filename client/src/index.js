import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import store from '../src/store/index';

import { DataContextProvider } from './providers/dataContext';
import { ThemeProvider } from 'styled-components';
import { theme } from './themes/theme'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
        <ThemeProvider theme={theme} >
          <DataContextProvider>
            <App />
          </DataContextProvider>
        </ThemeProvider>
    </Provider>
  </React.StrictMode >
);

