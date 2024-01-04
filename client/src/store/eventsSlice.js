import { createSlice } from '@reduxjs/toolkit';


export const LOCAL_STORAGE_EVENTS = 'events';


const initialCategoryEvents = {
  arzttermin: [],
  therapie: [],
  untersuchung: [],
  sonstiges: []
}

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    nextEvents: [],
    categorySortedEvents: initialCategoryEvents,
  },
  reducers: {
    saveEvent(state, action) {
      state.events.push(action.payload.event);
      localStorage.setItem(LOCAL_STORAGE_EVENTS, JSON.stringify(state.events));
    },
    saveEvents(state, action) {
      state.events = action.payload.events;
      localStorage.setItem(LOCAL_STORAGE_EVENTS, JSON.stringify(action.payload.events));
    },
    removeEvent(state, action) {
      state.events = state.events.filter(event => event.id !== action.payload.id);
      localStorage.setItem(LOCAL_STORAGE_EVENTS, JSON.stringify(state.events));
    },
    removeAllEvents(state, action) {
      state.events = [];
      localStorage.setItem(LOCAL_STORAGE_EVENTS, JSON.stringify(state.events));
    },
    saveNextEvents(state, action) {
      state.nextEvents = action.payload.events;
    },
    saveCategorySortedEvents(state, action) {
      state.categorySortedEvents = action.payload.events;
    },
    clearCategorySortedEvents(state, action) {
      state.categorySortedEvents = initialCategoryEvents;
    },
    
  }
});

export const eventsActions = eventsSlice.actions;

export default eventsSlice;