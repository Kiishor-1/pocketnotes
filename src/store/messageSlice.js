import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { MESSAGE_ENDPOINTS } from '../services/api';

const { SEND_MESSAGE, FETCH_MESSAGES } = MESSAGE_ENDPOINTS;

// Thunk to fetch messages for a group
export const fetchMessages = createAsyncThunk('messages/fetchMessages', async (groupId) => {
  const response = await axios.get(`${FETCH_MESSAGES}/${groupId}`);
  return response.data;
});

// Thunk to send a message
export const sendMessage = createAsyncThunk('messages/sendMessage', async ({ groupId, userId, content }) => {
  const response = await axios.post(`${SEND_MESSAGE}/${groupId}`, { userId, content });
  return response.data;
});

const messageSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.messages = action.payload || []; // Ensure an array is assigned
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(sendMessage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.messages.push(action.payload);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default messageSlice.reducer;
