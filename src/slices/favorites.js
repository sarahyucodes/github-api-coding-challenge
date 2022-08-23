import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
//
import { getFavorites } from '../api/favorites'

const initialState = {
  data: [],
  status: 'idle', // 'loading' | 'success' | 'failed'
  error: null
}

export const fetchFavorites = createAsyncThunk('favorites/fetchFavorites', async (query) => {
  const response = await getFavorites()
  return response
})

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchFavorites.pending, (state, action) => {
          state.status = 'loading'
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
          state.status = 'success'
          state.data = action.payload.repos
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
      }) 
  }
})

export const selectAllFavorites = state => state.favorites.data

export default favoritesSlice.reducer
