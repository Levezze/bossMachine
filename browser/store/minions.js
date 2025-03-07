import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Actions
export const fetchMinions = createAsyncThunk('minions/fetchMinions', async () => {
  const response = await axios.get('http://localhost:4001/api/minions');
  return response.data;
});

export const createMinion = createAsyncThunk('minions/createMinion', async ({ minion, navigate }) => {
  const response = await axios.post('http://localhost:4001/api/minions', minion);
  navigate(`/minions/${response.data.id}`);
  return response.data;
});

export const updateMinion = createAsyncThunk('minions/updateMinion', async (minion) => {
  const response = await axios.put(`http://localhost:4001/api/minions/${minion.id}`, minion);
  return response.data;
});

export const deleteMinion = createAsyncThunk('minions/deleteMinion', async (minionId) => {
  await axios.delete(`http://localhost:4001/api/minions/${minionId}`);
  const response = await axios.get(`http://localhost:4001/api/minions`);
  return response.data;
});

// Slice
const minionsSlice = createSlice({
  name: 'minions',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMinions.fulfilled, (state, action) => action.payload)
      .addCase(createMinion.fulfilled, (state, action) => [...state, action.payload])
      .addCase(updateMinion.fulfilled, (state, action) => {
        const index = state.findIndex((minion) => minion.id === action.payload.id);
        if (index !== -1) state[index] = action.payload;
      })
      .addCase(deleteMinion.fulfilled, (state, action) => action.payload);
  },
});

export default minionsSlice.reducer;
