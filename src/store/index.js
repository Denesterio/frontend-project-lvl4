import { combineReducers, configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice.js';

const rootReducer = combineReducers({
  channels: channelsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
