
import { createSlice } from '@reduxjs/toolkit';

const registrationText = [
  "Du hast Dich erfolgreich registriert und kannst Dich jetzt anmelden.",
  'Ein Konto mit dieser E-Mail existiert bereits.\nPasswort vergessen?',
  'Fehler'
];

export const LOCAL_STORAGE_KEY = 'access token';




const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userData: {
      name: '',
      id: '',
      diaryId: ''
    }, 
    token: '',
    diaryIdIsSaved: false,
    registrationMessage: {
      flag: 999,
      message: ''
    },
    currentLocation: '',
    loginStatus: false
  },
  reducers: {
    defineRegistrationMessage(state, action) {
      state.registrationMessage = {
        flag: action.payload.index,
        message: action.payload.index === 999 ? '' : registrationText[action.payload.index]
      };
    },
    saveToken(state, action) {
      state.token = action.payload.token;
    },

    saveUserData(state, action) {
      state.userData = {
        name: action.payload.name,
        id: action.payload.id,
        diaryId: action.payload.diaryId
      }
    },
    diaryIdSaved(state, action) {
      state.diaryIdIsSaved = action.payload.saved;
    },
    saveCurrentLocation(state, action) {
      state.currentLocation = action.payload.location;
    },
    changeLoginStatus(state, action) {
      state.loginStatus = action.payload.loginStatus;
    }
  }

});

export const authActions = authSlice.actions;

export default authSlice;