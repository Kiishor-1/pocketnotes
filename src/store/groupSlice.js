import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { GROUP_ENDPOINTS } from '../services/api';
import toast from 'react-hot-toast';

const { FETCH_GROUP, JOIN_GROUP } = GROUP_ENDPOINTS;

// Thunk to fetch the list of communities
export const fetchGroups = createAsyncThunk('group/fetchGroups', async () => {
  const response = await axios.get(FETCH_GROUP);
  return response.data;
});

// Thunk to fetch a single group
export const fetchGroup = createAsyncThunk('group/fetchGroup', async (groupId) => {
  const response = await axios.get(`${FETCH_GROUP}/${groupId}`);
  return response.data;
});

// Thunk to join a group
export const joinGroup = createAsyncThunk(
  'group/joinGroup',
  async ({ groupId, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(JOIN_GROUP(groupId), {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue('Server error');
    }
  }
);

// Thunk to create a new group
export const createGroup = createAsyncThunk(
  'group/createGroup',
  async (groupData, { rejectWithValue }) => {
    try {
      const response = await axios.post(FETCH_GROUP, groupData, {
        headers: {
          Authorization: `Bearer ${groupData.token}`,
        },
      });
      toast.success(response.data.message);
      return response.data.group;
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error('Please enter all the required fields');
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue('Server error');
    }
  }
);

const groupSlice = createSlice({
  name: 'group',
  initialState: {
    list: [],
    group: null,
    metrics: {},
    status: 'idle',
    error: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroups.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(fetchGroup.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(fetchGroup.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.group = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchGroup.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(joinGroup.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(joinGroup.fulfilled, (state) => {
        state.status = 'succeeded';
        state.isLoading = false;
      })
      .addCase(joinGroup.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(createGroup.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(createGroup.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list.push(action.payload);
        state.isLoading = false;
      })
      .addCase(createGroup.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export default groupSlice.reducer;
