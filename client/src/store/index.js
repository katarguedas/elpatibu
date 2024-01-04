import { configureStore } from '@reduxjs/toolkit';

import authSlice from './authSlice';
import eventsSlice from './eventsSlice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    events: eventsSlice.reducer
  }
});


export default store;