/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getChannels } from '../api/get.js';

// prettier-ignore
export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  () => getChannels()
    .then((response) => new Promise((resolve) => resolve(response.data))),
);

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    loading: true,
    channels: [],
    messages: [],
    currentChannelId: 1,
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    changeChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },
  },
  extraReducers: {
    [fetchChannels.pending]: (state) => {
      state.loading = true;
    },
    // Add reducers for additional action types here, and handle loading state as needed
    [fetchChannels.fulfilled]: (state, action) => {
      state.channels = action.payload.channels;
      state.messages = action.payload.messages;
      state.currentChannelId = action.payload.currentChannelId;
      state.loading = false;
    },
  },
});

export const { addMessage, changeChannel } = channelsSlice.actions;
export default channelsSlice.reducer;
