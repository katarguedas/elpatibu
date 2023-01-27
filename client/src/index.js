import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { UserContextProvider } from './providers/userContext';
import { DataContextProvider } from './providers/dataContext';
import { ThemeProvider } from 'styled-components';
import { theme } from './themes/theme'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <ThemeProvider theme={theme} >
        <DataContextProvider>
          <App />
        </DataContextProvider>
      </ThemeProvider>
    </UserContextProvider>
  </React.StrictMode>
);

