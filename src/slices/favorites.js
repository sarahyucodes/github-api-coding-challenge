import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
//
import { getFavorites, postFavorite } from '../api/favorites'

const initialState = {
  data: [],
  fetchStatus: 'idle', // 'loading' | 'success' | 'failed'
  fetchError: null,
  saveStatus: 'idle', // 'loading' | 'success' | 'failed'
  saveError: null
}

export const fetchFavorites = createAsyncThunk('favorites/fetchFavorites', async () => {
  const response = await getFavorites()
  return response
})

export const saveFavorite = createAsyncThunk('favorites/saveFavorite', async (repo, { dispatch }) => {
  const response = await postFavorite(repo)
  dispatch(fetchFavorites())

  return response
})

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchFavorites.pending, (state, action) => {
          state.fetchStatus = 'loading'
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
          state.fetchStatus = 'success'
          state.data = action.payload.repos
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
          state.fetchStatus = 'failed'
          state.fetchError = action.error.message
      }) 
      .addCase(saveFavorite.pending, (state, action) => {
        state.saveStatus = 'loading'
      })
      .addCase(saveFavorite.fulfilled, (state, action) => {
        state.saveStatus = 'success'
        fetchFavorites()
      })
      .addCase(saveFavorite.rejected, (state, action) => {
        state.saveStatus = 'failed'
        state.saveError = action.error.message
      })
  }
})

export const selectAllFavorites = state => state.favorites.data

export default favoritesSlice.reducer
