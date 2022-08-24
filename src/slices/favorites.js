import { 
  createSlice, 
  createAsyncThunk, 
  createEntityAdapter
} from '@reduxjs/toolkit'
//
import { 
  getFavorites, 
  postFavorite,
  deleteFavorite
} from '../services/favorites'

const favoritesAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.stargazersCount - a.stargazersCount // default sort by stars
})

const initialState = favoritesAdapter.getInitialState({
  fetchStatus: 'idle', // 'loading' | 'success' | 'failed'
  fetchError: null,
  saveStatus: 'idle', // 'loading' | 'success' | 'failed'
  saveError: null,
  removeStatus: 'idle', // 'loading' | 'success' | 'failed'
  removeError: null
})

export const fetchFavorites = createAsyncThunk('favorites/fetchFavorites', async () => {
  const response = await getFavorites()
  return response
})

export const saveFavorite = createAsyncThunk('favorites/saveFavorite', async (repo, { dispatch }) => {
  const response = await postFavorite(repo)
  dispatch(fetchFavorites())
  return response
})

export const removeFavorite = createAsyncThunk('favorites/removeFavorite', async (id, { dispatch }) => {
  const response = await deleteFavorite(id)
  dispatch(fetchFavorites())
  return response
})

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: initialState,
  reducers: {
    setFetchError: (state, action) => { state.fetchError = action.payload },
    setSaveError: (state, action) => { state.saveError = action.payload}
  },
  extraReducers: builder => {
    builder
      .addCase(fetchFavorites.pending, (state) => { state.fetchStatus = 'loading' })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
          state.fetchStatus = 'success'
          state.fetchError = null
          favoritesAdapter.setAll(state, action.payload.repos)
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
          state.fetchStatus = 'failed'
          state.fetchError = action.error.message
      }) 
      .addCase(saveFavorite.pending, (state) => { state.saveStatus = 'loading' })
      .addCase(saveFavorite.fulfilled, (state, action) => { 
        state.saveStatus = 'success' 
        state.saveError = null
      })
      .addCase(saveFavorite.rejected, (state, action) => {
        state.saveStatus = 'failed'
        state.saveError = action.error.message
      })
      .addCase(removeFavorite.pending, (state) => { state.removeStatus = 'loading' })
      .addCase(removeFavorite.fulfilled, (state, action) => { 
        state.removeStatus = 'success' 
        state.removeError = null
        state.saveError = null
      })
      .addCase(removeFavorite.rejected, (state, action) => {
        state.removeStatus = 'failed'
        state.removeError = action.error.message
      })
  }
})

export const {
  selectAll,
  selectIds,
  selectById
} = favoritesAdapter.getSelectors(state => state.favorites)

export const { setFetchError, setSaveError } = favoritesSlice.actions

export default favoritesSlice.reducer
