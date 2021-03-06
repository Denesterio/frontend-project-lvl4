/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getChannels } from '../api/get.js';
import LSHandler from '../utils/LSHandler.js';

// prettier-ignore
export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  () => getChannels()
    .then((response) => new Promise((resolve) => resolve(response.data))),
);

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    loadingStatus: 'loading',
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
    addChannel: (state, action) => {
      state.channels.push(action.payload);
    },
    removeChannel: (state, action) => {
      state.currentChannelId = 1;
      state.channels = state.channels.filter((channel) => channel.id !== action.payload.id);
      state.messages = state.messages.filter((message) => message.channelId !== action.payload.id);
    },
    renameChannel: (state, action) => {
      const channelRenamed = state.channels.find((channel) => channel.id === action.payload.id);
      channelRenamed.name = action.payload.name;
    },
  },
  extraReducers: {
    [fetchChannels.pending]: (state) => {
      state.loadingStatus = 'loading';
    },
    [fetchChannels.fulfilled]: (state, action) => {
      state.channels = action.payload.channels;
      state.messages = action.payload.messages;
      state.currentChannelId = action.payload.currentChannelId;
      state.loadingStatus = 'loaded';
    },
    [fetchChannels.rejected]: (state) => {
      state.loadingStatus = 'failed';
      const lshandler = new LSHandler();
      if (lshandler.hasToken()) {
        lshandler.remove('token');
        lshandler.remove('user');
      }
    },
  },
});

// prettier-ignore
export const {
  addMessage,
  changeChannel,
  addChannel,
  removeChannel,
  renameChannel,
} = channelsSlice.actions;
export default channelsSlice.reducer;
